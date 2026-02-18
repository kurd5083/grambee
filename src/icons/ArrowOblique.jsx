const ArrowOblique = ({ width = 18, height = 18, colorFirst = "#FFD26D", colorSecond = "#FFB81A" }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17 1L1 17" stroke="url(#paint0_radial_572_544)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 1H17V11" stroke="url(#paint1_radial_572_544)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
                <radialGradient id="paint0_radial_572_544" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17 1) rotate(116.565) scale(17.8885)">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
                <radialGradient id="paint1_radial_572_544" cx="0" cy="0" r="1" gradientTransform="matrix(-4.5 10 -9 -5 17 1)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
            </defs>
        </svg>
    )
}

export default ArrowOblique
