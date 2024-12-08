export type ChannelInfo = ChannelInfoBySlug | ChannelInfoByConst;
type ChannelBase = {
  ignoreList?: boolean;
  name: string;
  topic: string;
  description: string;
  since: string;
  refs: {
    name: string;
    href: string;
  }[];
};

type ChannelInfoBySlug = ChannelBase & {
  md?: `_channels/${string}.md`;
};

type ChannelInfoByConst = ChannelBase & {
  notes: string[];
};
