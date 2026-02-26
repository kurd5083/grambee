import styled, { keyframes } from 'styled-components';

import beeLamp from "@/assets/bee-lamp.png";

const Loading = () => {
  return (
    <LoadingContainer>
      <img src={beeLamp} alt="beeLamp img" />
      <h2>Grambee думает...</h2>
      <p>Пожалуйста, подождите</p>
    </LoadingContainer>
  )
}
const bounce = keyframes `
    from {
        transform: translateY(10px)
    }
    to {
    transform: translateY(-10px)
    }
`
const LoadingContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    padding: 0 24px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 16px;
    height: 800px;
    max-height: calc(100vh - 127px);

    &::before {
        content: '';
        position: absolute;
        top: -350px;
        left: -350px;
        width: 100%;
        height: 100%;
        background: url('src/assets/grid.png') no-repeat;
        transform: rotate(135deg);
        z-index: -1;
    }
    &::after {
        content: '';
        position: absolute;
        top: 400px;
        right: -200px;
        width: 100%;
        height: 100%;
        background: url('src/assets/grid.png') no-repeat;
        z-index: -1;
    }
    img {
        animation: 1s ${bounce} infinite alternate;
    }
    h2 {
        font-size: 24px;
    }
    p {
        font-size: 14px;
        color: #6A7080CC;
    }
`
export default Loading
