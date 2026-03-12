import styled from "styled-components";
import WarningIcon from "@/icons/WarningIcon";

const WarningBox = ({text}) => {
    return (
        <WarningBoxContainer>
            <WarningIcon width={20} height={20} color="#FFB81A" />
            <WarningText>{text}</WarningText>
        </WarningBoxContainer>
    )
}

const WarningBoxContainer = styled.div`
    margin-top: 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid #FFB81A;
    border-radius: 8px;
    background: rgba(255, 184, 26, 0.1);
`;
const WarningText = styled.div`
    color: #ffffff;
    font-size: 14px;
    line-height: 1.4;
`;

export default WarningBox
