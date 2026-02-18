import styled from 'styled-components';

const TitleHead = ({ title, icon, children }) => {
  return (
    <Title>
      {icon}
      {title}
      {children}
    </Title>
  )
}

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 20px;
  padding: 24px;
  font-weight: 600;
`;

export default TitleHead
