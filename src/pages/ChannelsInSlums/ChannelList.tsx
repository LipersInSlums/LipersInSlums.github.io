import styled from "@emotion/styled";
import Link from "next/link";
import usePageTitle from "src/hooks/usePageTitle";
import { ChannelInfo } from "@/model/Channel";

type Props = {
  readonly channels: ChannelInfo[];
};

export default function ChannelList({ channels }: Props) {
  usePageTitle("ChannelsInSlums");

  return (
    <ChannelWrap>
      {channels.map(({ description, name, realPath }) => {
        return (
          <ItemWrap key={realPath}>
            <ItemLink href={`/channels/${realPath}`}>
              <LinkDummy>{name}</LinkDummy>
              <Description>{description ?? ""}</Description>
            </ItemLink>
          </ItemWrap>
        );
      })}
    </ChannelWrap>
  );
}

const ChannelWrap = styled.ul`
  padding: 0;
  flex: 1;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const ItemWrap = styled.li`
  background-color: #f8f8f8;
  margin: 10px 0;
  padding: 5px;
  word-break: keep-all;
  &::marker {
    content: "";
  }
`;

const ItemLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  color: rgb(0, 102, 204);

  &:visited {
    color: rgb(0, 102, 204);
  }

  &::before {
    display: inline-block;
    content: "#";
    margin-right: 5px;
    color: gray;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Description = styled.div`
  font-size: 0.8em;
  text-decoration: none;
  color: #333;
  padding-left: 1em;
`;

const LinkDummy = styled.span`
  word-break: keep-all;
`;
