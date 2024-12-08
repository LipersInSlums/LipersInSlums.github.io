import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ChannelInfo } from "@/model/Channel";
import { getAllChannelInfos, getAllChannelNames } from "src/presenters/Channel";
import Channel from "src/pages/ChannelsInSlums/Channel";

type Props = {
  readonly channel: ChannelInfo;
};

const ChannelPage: NextPage<Props> = ({ channel }: Props) => {
  return <Channel channel={channel} />;
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
  const name = params.channel;
  const channelInfos = getAllChannelInfos();
  const channel = channelInfos.filter((info) => info.name === name)[0];

  return {
    props: {
      channel: {
        ...channel,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const channelNames = getAllChannelNames();

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
