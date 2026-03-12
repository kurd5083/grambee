import styled from "styled-components";
import ArrowIcon from "@/icons/ArrowIcon";

const BlockWithArrow = ({ img, type, title, text, state, value, options, onClick, onChange }) => {
    const selectedOption = type === "select" && value?.currency 
        ? options?.find(opt => opt.currency === value.currency) 
        : null;
    return (
        <BlockContainer $type={type}>
            <ItemHead>
                <ImgContainer $type={type} $bg={selectedOption?.bg}>
                    {type === "select" 
                        ? selectedOption?.img || img  // Добавлен fallback
                        : img
                    }
                </ImgContainer>

                <ItemBody>
                    <BodyTitle>
                        {type == "select" ? 'Отправить на' : title}
                    </BodyTitle>
                    <BodyText>
                        {type == "select" ? 'BEP20 Address' : text}
                    </BodyText>
                </ItemBody>
                <ArrowContainer onClick={onClick} $type={type}>
                    <ArrowIcon width={6} height={10} color="#D6DCEC" />
                </ArrowContainer>
            </ItemHead>
            {state && (
                <SelectList>
                    {options?.map((opt) => (
                        <SelectItem key={opt.currency} onClick={() => onChange({state: false, currency: opt})}>
                            <ImgContainer $type={type} $bg={opt.bg}>
                                {opt.img}
                            </ImgContainer>
                            <ItemBody>
                                <BodyTitle>{opt.title}</BodyTitle>
                                <BodyText>{opt.text}</BodyText>
                            </ItemBody>
                        </SelectItem>
                    ))}
                </SelectList>
            )}
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
    z-index: 10;

    ${({ $type }) => $type == "select" && `
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
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 37px;
    height: 37px;
    padding: 6px;
    border-radius: 10px;
    overflow: hidden;
   
    ${({ $type, $bg }) => $type == "select" && `
        background-color: ${$bg};
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

    ${({ $type }) => $type == "select" && `
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
const SelectList = styled.ul`
  box-sizing: border-box;
  position: absolute;
  top: calc(100% + 4px);
  min-width: fit-content;
  left: 0;
  width: 100%;
  background: #272A33;
  border-radius: 16px;
  max-height: 150px;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
const SelectItem = styled.li`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    cursor: pointer;
    color: #d6dcec;
    font-size: 14px;
    border-bottom: 1px solid #30343F;

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background-color: #1F222B;
    }
`;

export default BlockWithArrow