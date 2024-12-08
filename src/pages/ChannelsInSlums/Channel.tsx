import styled from "@emotion/styled";
import Link from "next/link";
import { format } from "date-fns";
import { ChannelInfo } from "@/model/Channel";
import usePageTitle from "src/hooks/usePageTitle";
import ChannelList from "src/pages/ChannelsInSlums/ChannelList";

type Props = {
  channels: ChannelInfo[];
  content: string;

  description?: string;
  name?: string;
  refs?: { href: string; name: string }[];
  since?: string;
  topic?: string;
};

export default function Channel({
  channels,
  content,
  description,
  name,
  refs,
  since,
  topic,
}: Props) {
  usePageTitle(name);
  return (
    <Wrap>
      <ListWrap>
        <ChannelList channels={channels} />
      </ListWrap>
      <ContentWrap>
        <TitleWrap>
          <Title>
            {name ? <Name>{name}</Name> : ""}
            {topic ? <Topic>{topic}</Topic> : ""}
          </Title>
          {since ? (
            <>
              <i>since: </i>
              {format(new Date(since), "yyyy/MM/dd")}
            </>
          ) : (
            ""
          )}
          <br />
          {description ? `「${description}」` : ""}
        </TitleWrap>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
        <ReferenceWrap>
          {refs?.map(({ href, name }) => {
            return (
              <Reference key={name}>
                <Link target="_blank" rel="noopener noreferrer" href={href}>
                  {name}
                </Link>
              </Reference>
            );
          })}
        </ReferenceWrap>
      </ContentWrap>
    </Wrap>
  );
}

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
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 800px;
`;

const TitleWrap = styled.header`
  text-align: right;
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.83em;
  text-align: left;
  margin-left: 2em;
`;

const Name = styled.div`
  font-size: 1.5em;
  font-weight: 700;

  &:before {
    content: "#";
    color: gray;
    margin-right: 0.5em;
  }
`;

const Topic = styled.div`
  color: #444;

  &:before {
    color: gray;
    position: relative;
    bottom: 2px;

    @media screen and (min-width: 450px) {
      margin-left: 1em;
      margin-right: 1em;
      content: "|";
    }
  }
`;

const ReferenceWrap = styled.div`
  margin-block-start: 1em;
  margin-block-end: 1em;
`;

const Reference = styled.span`
  &:first-child {
    &:before {
      content: "see here:";
      margin-right: 0.3em;
    }
  }
  &:last-child {
    &:after {
      content: "";
    }
  }
  &:after {
    content: ",";
    margin-right: 0.3em;
  }
`;
