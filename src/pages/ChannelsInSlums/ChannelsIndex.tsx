import styled from "@emotion/styled";
import { ChannelInfo } from "@/model/Channel";
import Channel from "src/pages/ChannelsInSlums/Channel";
import ChannelList from "src/pages/ChannelsInSlums/ChannelList";

type Props = {
  channels: ChannelInfo[];
  channel: ChannelInfo;
  content: string;
};

export default function ChannelsInSlumsIndex(props: Props) {
  return (
    <Wrap>
      <ListWrap>
        <ChannelList channels={props.channels} />
      </ListWrap>
      <ChannelWrap>
        <Channel name="LipersInSlums サーバーへようこそ" {...props} />
      </ChannelWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 900px) {
    align-items: center;
    flex-direction: column-reverse;
  }
`;

const ChannelWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
`;

const ListWrap = styled.div`
  @media screen and (min-width: 899px) {
    position: sticky;
    top: 30px;

    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
    max-height: 75vh;
    overflow-y: scroll;
  }
`;
