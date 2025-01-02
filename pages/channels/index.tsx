import { GetStaticProps } from "next";

import markdownToHtml from "zenn-markdown-html";
import { ChannelInfo } from "@/model/Channel";

import { getAllChannels, getChannelByName } from "src/presenters/Channel";
import ChannelPage from "src/pages/ChannelsInSlums/ChannelPage";

type Props = {
  channels: ChannelInfo[];
  channel: ChannelInfo;
  content: string;
};

export default function ChannelsInSlumsIndex(props: Props) {
  return (
    <ChannelPage
      showChannels={true}
      name="LipersInSlums サーバーへようこそ"
      {...props}
    />
  );
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
