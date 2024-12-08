import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import markdownToHtml from "zenn-markdown-html";
import { ChannelInfo } from "@/model/Channel";
import { getAllChannels, getChannelByName } from "src/presenters/Channel";
import Channel from "src/pages/ChannelsInSlums/Channel";

type Props = {
  channels: ChannelInfo[];
  channel: ChannelInfo;
  content: string;
};

const ChannelPage: NextPage<Props> = (props: Props) => {
  return (
    <Channel
      {...props}
      description={props.channel.description}
      name={props.channel.name}
      refs={props.channel.refs}
      since={props.channel.since}
      topic={props.channel.topic}
    />
  );
};

export default ChannelPage;

type Params = ParsedUrlQuery & {
  channel: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) {
    throw Error("getStaticPaths failed!");
  }
  const channels = getAllChannels();
  const name = params.channel;
  const channel =
    channels.find((ch) => ch.name === name) ?? getChannelByName(name);
  const content = await markdownToHtml(channel.notes.join("\n\n"));

  return {
    props: {
      channels,
      channel,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const channelNames = getAllChannels().map(
    (channel) => channel.realPath ?? channel.name,
  );

  return {
    paths: channelNames.map((channelName) => {
      return {
        params: {
          channel: channelName,
        },
      };
    }),
    fallback: false,
  };
};
