import styled from "styled-components";

const LoadingState = ({ children = "Загрузка..." }) => {
    return (
        <Container>
            <Spinner />
            {children && <p>{children}</p>}
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border: 1px dotted #272A33;
  height: 160px;
  border-radius: 20px;
  
  p {
    color: #6A7080CC;
    margin: 0;
  }
`

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 2px solid #272A33;
  border-top-color: #6A7080CC;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`

export default LoadingState;