import styled from "styled-components";
import ArrowIcon from "@/icons/ArrowIcon";

const BlockWithArrow = ({ img, type, title, text, onClick }) => {
    return (
        <BlockContainer $type={type}>
            <ItemHead>
                <ImgContainer $type={type}>
                    {img}
                </ImgContainer>
                <ItemBody>
                    <BodyTitle>{title}</BodyTitle>
                    <BodyText>{text}</BodyText>
                </ItemBody>
                <ArrowContainer onClick={onClick} $type={type}>
                    <ArrowIcon width={6} height={10} color="#D6DCEC" />
                </ArrowContainer>
            </ItemHead>
        </BlockContainer>
    )
}

const BlockContainer = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 100%;
    flex: 1;
    background-color: #272A330D;
    backdrop-filter: blur(16px);
    border: 1px solid #272A33;
    padding: 16px;
    border-radius: 16px;
    margin-top: 24px;

    ${({$type}) => $type == "select" && `
        max-width: 320px;
    `};
`
const ItemHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
`;
const ImgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 37px;
    height: 37px;
    border-radius: 10px;
    overflow: hidden;

    ${({$type}) => $type == "select" && `
        background-color: #17322D;
    `}
   
    img {
        width: 100%;
        height: 100%;
    }
`
const ArrowContainer = styled.button`
    width: 24px;
    height: 24px;
    background-color: #383D4C;
    border-radius: 50%;

    ${({$type}) => $type == "select" && `
       transform: rotate(90deg);
    `}
`;
const ItemBody = styled.div`
  position: relative;
  z-index: 1;
  flex-grow: 1;
`
const BodyTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
`
const BodyText = styled.p`
  font-size: 12px;
  color: #6A7080CC;
  font-weight: 600;
`

export default BlockWithArrow