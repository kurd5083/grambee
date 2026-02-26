const LoadingIcon = ({ width, height, color }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6.5 2.83333V1M6.5 12V10.7778M10.7778 6.5H12M1 6.5H2.83333M9.95706 3.04294L10.3891 2.61089M2.61089 10.3891L3.475 9.525M9.525 9.525L10.3891 10.3891M2.61089 2.61089L3.90706 3.90706" stroke="url(#paint0_radial_572_217)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
                <radialGradient id="paint0_radial_572_217" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 1) rotate(116.565) scale(12.2984)">
                    <stop stop-color={color} />
                    <stop offset="1" stop-color={color} />
                </radialGradient>
            </defs>
        </svg>
    )
}

export default LoadingIcon
