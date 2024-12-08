import { NextPage } from "next";
import styled from "@emotion/styled";
import { ChannelInfo } from "@/model/Channel";
import Channel from "src/pages/ChannelsInSlums/Channel";
import ChannelList from "src/pages/ChannelsInSlums/ChannelList";

type Props = {
  channels: ChannelInfo[];
  channel: ChannelInfo;
  content: string;
};

const ChannelPage: NextPage<Props> = ({
  channel,
  channels,
  content,
}: Props) => {
  return (
    <Wrap>
      <ListWrap>
        <ChannelList channels={channels} />
      </ListWrap>
      <ChannelWrap>
        <Channel
          content={content}
          description={channel.description}
          name={channel.name}
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
  text-align: center;
`;

const ListWrap = styled.div`
  position: sticky;
  top: 30px;

  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  max-height: 75vh;
  overflow-y: scroll;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const ChannelWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
`;
