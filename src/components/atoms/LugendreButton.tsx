import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

type Props = Omit<
  PropsWithChildren<JSX.IntrinsicElements["button"]>,
  "children"
>;

export default function LugendreButton(props: Props) {
  return (
    <>
      <Button {...props} />
      {/* ボタン押下時に読み込むのではボタンが真っ白になるので防止のためにキャッシュに乗せる */}
      <img
        height={0}
        src="/lugendrebuttonbattle/LugendreButton_Press.png"
        alt="こころがるじゃんどるときに押すボタンが押されこころがるじゃんどる"
      />
    </>
  );
}

const Button = styled.button`
  border: none;
  background: transparent;
  min-width: 326px;
  min-height: 120px;
  background-image: url("/lugendrebuttonbattle/LugendreButton_Normal.png");

  &:active {
    background-image: url("/lugendrebuttonbattle/LugendreButton_Press.png");
  }
`;
