import styled from "styled-components";

export const GapBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap = "8px" }) => gap};
`;