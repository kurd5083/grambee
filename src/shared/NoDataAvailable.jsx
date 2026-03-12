import styled from "styled-components";

const NoDataAvailable = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  border: 1px dotted #272A33;
  min-height: 160px;
  border-radius: 20px;
  padding: 20px;

  h3 {
    text-align: center;
    color: #D6DCEC;
  }

  p {
    color: #6A7080CC;
    text-align: center;
    line-height: 24px;
  }
`

export default NoDataAvailable