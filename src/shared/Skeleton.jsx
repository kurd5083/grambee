import styled from 'styled-components';

const shimmer = `
  background: linear-gradient(
    90deg,
    #2a2d36 25%,
    #3a3d47 37%,
    #2a2d36 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;

  @keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: -100% 0; }
  }
`

export const SkeletonAvaHeader = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  ${shimmer}
`
export const SkeletonAvaChat = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  ${shimmer}
`
export const SkeletonAvaWallet = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  ${shimmer}
`
export const SkeletonName = styled.div`
  width: 120px;
  height: 14px;
  margin-bottom: 6px;
  border-radius: 6px;
  ${shimmer}
`

export const SkeletonLevel = styled.div`
  width: 80px;
  height: 10px;
  border-radius: 4px;
  ${shimmer}
`