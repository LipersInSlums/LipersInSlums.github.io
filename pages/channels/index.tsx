import { GetStaticProps } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { ChannelInfo } from "@/model/Channel";
import ChannelsInSlums from "src/pages/ChannelsInSlums/ChannelsInSlums";
import { getAllChannels } from "src/presenters/Channel";

type Props = {
  readonly channels: ChannelInfo[];
};

export const getStaticProps: GetStaticProps<Props, Params> = async () => {
  const channels = getAllChannels();

  return {
    props: {
      channels,
    },
  };
};

export default function ChannelsInSlumsIndex({ channels }: Props) {
  return <ChannelsInSlums channels={channels} />;
}
