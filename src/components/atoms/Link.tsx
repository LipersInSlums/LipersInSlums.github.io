import styled from "@emotion/styled";
import NextLink from "next/link";

const Link = styled(NextLink)`
  color: #333;
  &:visited {
    color: #333;
  }

  font-weight: bold;
  text-decoration: none;
  display: contents;
`;

export default Link;
