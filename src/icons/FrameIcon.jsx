const FrameIcon = ({ width, height, colorFirst, colorSecond }) => {
    return (
        <svg 
            width={width}
            height={height}
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M2.28571 10.2857H0V16H5.71429V13.7143H2.28571V10.2857ZM0 5.71429H2.28571V2.28571H5.71429V0H0V5.71429ZM13.7143 13.7143H10.2857V16H16V10.2857H13.7143V13.7143ZM10.2857 0V2.28571H13.7143V5.71429H16V0H10.2857Z" fill="url(#paint0_radial_641_17991)" />
            <defs>
                <radialGradient id="paint0_radial_641_17991" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16) rotate(116.565) scale(17.8885)">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
            </defs>
        </svg>
    )
}

export default FrameIcon
