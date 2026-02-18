import styled, { css } from "styled-components";

const Button = ({ variant = "primary", iconLeft, children = "Сохранить", width, ...props }) => {
    return (
        <ButtonContainer $variant={variant} $width={width} {...props}>
            {iconLeft}
            {children}
        </ButtonContainer>
    );
};

export default Button;

const commonStyles = css`
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 54px;
  width: 100%;
  border-radius: 14px;
  font-weight: 800;
  cursor: pointer;
  transition: 0.2s;

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const variantStyles = {
    primary: css`
        border: 1px solid #ffb81a;
        background: #2e2a22;
        color: #ffb81a;

        &:hover {
            background: #3b352b;
        }
    `,
    primaryWhiteText: css`
        border: 1px solid #ffb81a;
        background: #2e2a22;
        color: #ffffff;
        font-size: 16px;

        &:hover {
            background: #3b352b;
        }
    `,
    primaryNoBorder: css`
        background: #2e2a22;
        height: 44px;
        font-size: 16px;

        &:hover {
            background: #3b352b;
        }
    `,
    outline: css`
        border: 1px solid #272a33;
        background: transparent;
        color: #d6dcec;
        font-size: 16px;

        &:hover {
            border-color: #d6dcec;
        }
    `,

    goldButton: css`
        background: radial-gradient(circle at center, #FFD26D, #FFB81A);
        color: #000;
        font-size: 16px;

        &:hover {
            filter: brightness(0.9);
        }
    `,
    default: css`
        background: #272A33;
        color:#D6DCEC;

        &:hover {
            filter: brightness(0.9);
        }
    `,
    danger: css`
        background: #FF3C79;
        color:#FFFFFF;

        &:hover {
            filter: brightness(0.9);
        }
    `,
};

const ButtonContainer = styled.button`
  ${commonStyles}
  ${({ $variant }) => variantStyles[$variant || "primary"]}
  width: ${({ $width }) => $width || "100%"};
`;
