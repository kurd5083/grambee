const MinusIcon = ({ width = "13", height = "13", colorFirst, colorSecond }) => {
    return (
        <svg 
            width={width}
            height={height}
            viewBox="0 0 16 2" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M1 1H15" stroke="url(#paint0_radial_641_15235)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
                <radialGradient id="paint0_radial_641_15235" cx="0" cy="0" r="1" gradientTransform="matrix(-7 1 -14 -0.5 15 1)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
            </defs>
        </svg>

    )
}

export default MinusIcon