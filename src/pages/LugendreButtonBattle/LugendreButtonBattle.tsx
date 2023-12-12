import styled from "@emotion/styled";
import LugendreButton from "@/components/atoms/LugendreButton";

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
