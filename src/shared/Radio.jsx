import styled, { css } from "styled-components";

const Radio = ({ checked, onChange, text, view, children }) => {
    return (
        <CheckboxContainer onClick={onChange}>
            <HiddenCheckbox type="radio" $checked={checked} readOnly />
            <StyledCheckbox $checked={checked} $view={view}>
                <CheckboxTitle $view={view}>{children}</CheckboxTitle>
                {text && (<span>{text}</span>)}
            </StyledCheckbox>
        </CheckboxContainer>
    );
};

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const HiddenCheckbox = styled.input`
    display: none;
    pointer-events: none;
`;

const StyledCheckbox = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 16px;
    transition: all 0.2s;
    flex: 1;
    gap: 7px;

    ${({ $checked, $view }) => css`
        border: 1px solid ${({ $checked, $view }) => $checked && $view !== "circleBG" ? "#FFB81A" : "#272A33"};
        background-color: ${({ $checked }) => $checked ? "#21242B" : "#272A33"};

        ${$view === "circle" && css`
            height: 48px;
            padding: 16px;
            flex-direction: row;
            align-items: center;
        `}

        ${$view === "circleBG" && css`
            height: 48px;
            padding: 16px;
            flex-direction: row;
            align-items: center;
            background: ${$checked ? "#272A33" : "transparent"};
        `}

        ${$view === "circleText" && css`
            height: 70px;
            padding: 16px;
            flex-direction: column;
            align-items: flex-start;
        `}

        ${$view === "circleTextMore" && css`
            min-height: 136px;
            padding: 16px;
            flex-direction: column;
            justify-content: flex-start;
        `}

        ${$view === "noCircleText" && css`
            height: 54px;
            padding: 11px 32px;
            flex-direction: column;
            align-items: center;
        `}
        ${$view === "noCircleIcon" && css`
            height: 64px;
            padding: 11px 24px;
            flex-direction: column;
        `}

        ${["circle", "circleText", "circleTextMore", "circleBG"].includes($view) && css`
            &:after {
            content: "";
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            background: ${$checked
                ? "radial-gradient(circle at center, #FFD26D, #FFB81A)"
                : "transparent"};
            border: 1px solid ${$checked ? "#FFB81A" : "#6A7080"};
            border-radius: 50%;
            ${$view === "circleTextMore" && css`
                top: 16px;
                transform: translateY(0);
            `}
            }
        `}
    `}
    
    
    span {
        font-size: 14px;
        color: #6A7080CC;
    }
`;

const CheckboxTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-right: 30px;

    ${({ $view }) => css`
        ${$view === "noCircleIcon" && css`
            padding-right: 0;
        `}
    `}
`;


export default Radio;
