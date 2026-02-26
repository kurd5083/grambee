const DollarIcon = ({ width, height, colorFirst, colorSecond }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M13.5 0C6.04407 0 0 6.04407 0 13.5C0 20.9559 6.04407 27 13.5 27C20.9559 27 27 20.9559 27 13.5C27 6.04407 20.9559 0 13.5 0ZM14.6657 20.8194V22.7208H12.847V20.8408C9.8626 20.4321 8.5557 17.9799 8.5557 17.9799L10.4134 16.4259C10.4134 16.4259 11.5996 18.4907 13.7452 18.4907C14.9304 18.4907 15.8296 17.8563 15.8296 16.7724C15.8296 14.2384 9.00248 14.5459 9.00248 9.84495C9.00248 7.80147 10.6187 6.32923 12.8461 5.98091V4.0814H14.6648V5.98091C16.2178 6.18526 18.057 7.00265 18.057 8.76097V10.1097H15.6457V9.45576C15.6457 8.78141 14.7865 8.33184 13.8251 8.33184C12.599 8.33184 11.7008 8.94489 11.7008 9.80315C11.7008 12.3984 18.5279 11.7649 18.5279 16.6906C18.5279 18.7155 17.0157 20.4711 14.6657 20.8194Z" fill="url(#paint0_radial_572_1033)" />
            <defs>
                <radialGradient id="paint0_radial_572_1033" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(27) rotate(116.565) scale(30.1869)">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
            </defs>
        </svg>
    )
}

export default DollarIcon
