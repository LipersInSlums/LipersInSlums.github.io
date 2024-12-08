import { GetStaticProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import markdownToHtml from "zenn-markdown-html";
import { ChannelInfo } from "@/model/Channel";

import { getAllChannels, getChannelByName } from "src/presenters/Channel";
import Channel from "src/pages/ChannelsInSlums/Channel";

type Props = {
  channels: ChannelInfo[];
  channel: ChannelInfo;
  content: string;
};

export default function ChannelsInSlumsIndex(props: Props) {
  return <Channel name="LipersInSlums サーバーへようこそ" {...props} />;
}

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
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
