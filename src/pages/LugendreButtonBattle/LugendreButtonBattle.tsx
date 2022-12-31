import LugendreButton from "@/components/atoms/LugendreButton";
import styled from "@emotion/styled";

export default function LugendreButtonBattle() {
  return (
    <Wrap>
      <LugendreButton />
    </Wrap>
  );
}

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
