const CopyIcon = ({ width, height, colorFirst, colorSecond, uniqueId }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.88 0H7.41867C5.85067 0 4.608 0 3.63645 0.131556C2.63556 0.266667 1.82578 0.551112 1.18756 1.192C0.548445 1.83289 0.264889 2.64622 0.130667 3.65067C6.62274e-08 4.62667 0 5.87378 0 7.448V12.6373C0 13.9778 0.817779 15.1262 1.97956 15.608C1.92 14.7991 1.92 13.6658 1.92 12.7218V8.26845C1.92 7.12978 1.92 6.14756 2.02489 5.36178C2.13778 4.51911 2.392 3.712 3.04445 3.05689C3.69689 2.40178 4.50134 2.14667 5.34045 2.03289C6.12267 1.928 7.10045 1.928 8.23556 1.928H10.9645C12.0987 1.928 13.0747 1.928 13.8578 2.03289C13.6232 1.43404 13.2136 0.919768 12.6825 0.557141C12.1513 0.194514 11.5232 0.000360732 10.88 0Z" fill={`url(#paint0_radial_${uniqueId})`} />
            <path d="M3.2002 8.35285C3.2002 5.92974 3.2002 4.71818 3.95042 3.96529C4.69975 3.2124 5.90597 3.2124 8.3202 3.2124H10.8802C13.2935 3.2124 14.5006 3.2124 15.2509 3.96529C16.0011 4.71818 16.0002 5.92974 16.0002 8.35285V12.6373C16.0002 15.0604 16.0002 16.272 15.2509 17.0249C14.5006 17.7777 13.2935 17.7777 10.8802 17.7777H8.3202C5.90686 17.7777 4.69975 17.7777 3.95042 17.0249C3.2002 16.272 3.2002 15.0604 3.2002 12.6373V8.35285Z" fill={`url(#paint1_radial_${uniqueId})`} />
            <defs>
                <radialGradient id={`paint0_radial_${uniqueId}`} cx="0" cy="0" r="1" gradientTransform="matrix(-6.92889 15.608 -13.8578 -7.80401 13.8578 0)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
                <radialGradient id={`paint1_radial_${uniqueId}`} cx="0" cy="0" r="1" gradientTransform="matrix(-6.4 14.5653 -12.8 -7.28267 16.0002 3.2124)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
            </defs>
        </svg>

    )
}

export default CopyIcon
