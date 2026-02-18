const TgSplashIcon = ({ width = "16", height = "13", colorFirst = "#252934", colorSecond = "#1F222B", uniqueId = "1" }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M14.6364 0.114777C14.6364 0.114777 16.1165 -0.447935 15.9926 0.918545C15.9519 1.48126 15.582 3.45093 15.294 5.58107L14.3073 11.8916C14.3073 11.8916 14.225 12.8161 13.4848 12.9769C12.745 13.1374 11.6349 12.4142 11.4292 12.2534C11.2646 12.1327 8.34571 10.3238 7.3179 9.43982C7.02989 9.1984 6.70075 8.71628 7.35904 8.15357L11.676 4.13399C12.1694 3.65113 12.6627 2.52571 10.6071 3.89256L4.85082 7.71083C4.85082 7.71083 4.19291 8.11309 2.95976 7.75132L0.286972 6.94718C0.286972 6.94718 -0.699704 6.34435 0.986026 5.74153C5.09768 3.85245 10.1553 1.92363 14.6364 0.114777Z" fill={`url(#paint0_radial_${uniqueId})`} />
            <defs>
                <radialGradient id={`paint0_radial_${uniqueId}`} cx="0" cy="0" r="1" gradientTransform="matrix(-8 13 -16 -6.5 16 0)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst}/>
                    <stop offset="1" stop-color={colorSecond}/>
                </radialGradient>
            </defs>
        </svg>

    )
}

export default TgSplashIcon
