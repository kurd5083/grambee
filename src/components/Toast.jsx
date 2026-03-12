import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useToastStore } from "@/store/toastStore"; // 👈 импортируем store

// Иконки
const SuccessIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" fill="#4CAF50" />
        <path d="M6 10L9 13L14 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const ErrorIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" fill="#F44336" />
        <path d="M7 7L13 13M7 13L13 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const Toast = () => {
    const { toasts, hideToast } = useToastStore(); // 👈 получаем тосты из store
    const [exitingToasts, setExitingToasts] = useState(new Set());

    const handleClose = (id) => {
        setExitingToasts(prev => new Set(prev).add(id));
        setTimeout(() => {
            hideToast(id);
            setExitingToasts(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }, 300);
    };

    if (toasts.length === 0) return null;

    return (
        <>
            {toasts.map((toast) => (
                <ToastContainer
                    key={toast.id}
                    $type={toast.type}
                    $isExiting={exitingToasts.has(toast.id)}
                >
                    <IconContainer>
                        {toast.type === "success" && <SuccessIcon />}
                        {toast.type === "error" && <ErrorIcon />}
                    </IconContainer>
                    <MessageText>{toast.message}</MessageText>
                    <CloseButton onClick={() => handleClose(toast.id)}>✕</CloseButton>
                </ToastContainer>
            ))}
        </>
    );
};

// Анимации
const slideIn = keyframes`
    from {
        transform: translateX(-50%) translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
    to {
        transform: translateX(-50%) translateY(-100%);
        opacity: 0;
    }
`;

const ToastContainer = styled.div`
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 300px;
    max-width: 400px;
    padding: 16px 20px;
    background-color: ${({ $type }) => 
        $type === "success" ? "#1E3A2E" : "#3A2A2A"};
    border: 1px solid ${({ $type }) => 
        $type === "success" ? "#4CAF50" : "#F44336"};
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 9999;
    animation: ${({ $isExiting }) => $isExiting ? slideOut : slideIn} 0.3s ease forwards;
    margin-bottom: 10px;
`;

const IconContainer = styled.div`
    flex-shrink: 0;
`;

const MessageText = styled.p`
    flex-grow: 1;
    font-size: 14px;
    font-weight: 500;
    color: #FFFFFF;
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: #6A7080;
    font-size: 18px;
    cursor: pointer;
    padding: 0 4px;
    
    &:hover {
        color: #FFFFFF;
    }
`;

export default Toast;