export type ChannelInfo = {
  name: string;
  topic: string;
  description: string;
  since: string;
  notes: string[];
  refs: {
    name: string;
    href: string;
  }[];
};
