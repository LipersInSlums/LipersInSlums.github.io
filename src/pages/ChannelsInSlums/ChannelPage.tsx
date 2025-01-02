import { NextPage } from "next";
import styled from "@emotion/styled";
import { ChannelInfo } from "@/model/Channel";
import Channel from "src/pages/ChannelsInSlums/Channel";
import ChannelList from "src/pages/ChannelsInSlums/ChannelList";

type Props = {
  channels: ChannelInfo[];
  channel: ChannelInfo;
  content: string;
  name?: string;
  showChannels?: boolean;
};

const ChannelPage: NextPage<Props> = ({
  channel,
  channels,
  content,
  name = channel.name,
  showChannels = false,
}: Props) => {
  return (
    <Wrap>
      <ListWrap className={showChannels ? "show-channels" : ""}>
        <ChannelList channels={channels} />
      </ListWrap>
      <ChannelWrap>
        <Channel
          content={content}
          description={channel.description}
          name={name}
          refs={channel.refs}
          since={channel.since}
          topic={channel.topic}
        />
      </ChannelWrap>
    </Wrap>
  );
};

export default ChannelPage;

const Wrap = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

const ListWrap = styled.div`
  top: 30px;

  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  min-width: 200px;
  overflow-y: scroll;
  max-height: 75vh;
  flex-grow: 1;

  @media screen and (max-width: 900px) {
    display: none;
    width: 100%;
    max-height: 50vh;

    &.show-channels {
      display: inherit;
    }
  }
`;

const ChannelWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  flex-grow: 3;
`;
