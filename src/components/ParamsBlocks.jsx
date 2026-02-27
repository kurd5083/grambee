import styled from "styled-components";


const ParamsBlocks = ({ options }) => {
    return (
        <ParamsContent>
            {options.map((option, index) => (
                <ParamsItem key={index}>
                    {option.title && <ItemTitle>{option.title}</ItemTitle>}
                    <Params>
                        {option.iconLeft}
                        {option.lableLeft && <LableLeft>{option.lableLeft}</LableLeft>}
                        <p>{option.placeholder || option.value}</p>
                        {option.lableRight && <LableRight>{option.lableRight}</LableRight>}
                        {option.iconRight && (
                            <IconRightContainer>
                                {option.iconRight}
                            </IconRightContainer>
                        )}
                    </Params>
                </ParamsItem>
            ))}
        </ParamsContent>
    )
}

const ParamsContent = styled.div`
    display: flex;
    gap: 8px;
`
const ParamsItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex: 1;
    min-width: 180px;
`
const ItemTitle = styled.h3`
    font-size: 14px;
    font-weight: 700;
`
const Params = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    height: 54px;
    border: 1px solid #272A33;
    border-radius: 14px;
    padding: 0 24px;
    flex-grow: 0;
    p {
        font-size: 14px;
    }
    span {
        flex-grow: 1;
    }
`
const LableLeft = styled.span`
    display: flex;
    justify-content: flex-start;
`
const LableRight = styled.span`
    display: flex;
    justify-content: flex-end;
`
const IconRightContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    mark {
        font-size: 14px;
    }
`

export default ParamsBlocks