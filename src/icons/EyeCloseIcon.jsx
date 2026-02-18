const EyeCloseIcon = ({ width="18", height="18", color="#6A7080" }) => {
    return (
        <svg
            width={width}
			height={height}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.49229 7.4939C5.15894 7.82736 4.97172 8.27959 4.9718 8.7511C4.97189 9.22261 5.15927 9.67477 5.49274 10.0081C5.8262 10.3415 6.27843 10.5287 6.74994 10.5286C7.22145 10.5285 7.67361 10.3411 8.00696 10.0077"
                stroke={color} 
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M12.9109 12.9038C11.6643 13.6847 10.2209 14.0939 8.75 14.0833C5.55 14.0833 2.88333 12.3056 0.75 8.75C1.88067 6.86556 3.16067 5.48067 4.59 4.59533M7.13222 3.57667C7.66465 3.46854 8.20671 3.41493 8.75 3.41667C11.95 3.41667 14.6167 5.19444 16.75 8.75C16.1574 9.73667 15.5239 10.587 14.8496 11.3011M0.75 0.75L16.75 16.75"
                stroke={color} 
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>

    )
}

export default EyeCloseIcon
