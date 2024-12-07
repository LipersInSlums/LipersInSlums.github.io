import { ChannelInfo } from "@/model/Channel";
import { channelInfo } from "src/pages/ChannelsInSlums/channelInfo";

export function getAllChannelInfos(): ChannelInfo[] {
  return channelInfo;
}

export function getAllChannelNames(): string[] {
  return Array.from(channelInfo, (info) => info.name);
}
