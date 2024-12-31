import { GetStaticProps } from "next";

import markdownToHtml from "zenn-markdown-html";
import { ChannelInfo } from "@/model/Channel";

import { getAllChannels, getChannelByName } from "src/presenters/Channel";
import ChannelsIndex from "src/pages/ChannelsInSlums/ChannelsIndex";

type Props = {
  channels: ChannelInfo[];
  channel: ChannelInfo;
  content: string;
};

export default function ChannelsInSlumsIndex(props: Props) {
  return <ChannelsIndex {...props} />;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const channels = getAllChannels();
  const name = "_index";
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
