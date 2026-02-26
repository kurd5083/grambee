const ProfileIcon = ({ width, height, colorFirst, colorSecond }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 1.59316e-10C16.4041 -8.92564e-06 18.2897 0.375037 20.0489 1.10372C21.8081 1.83241 23.4066 2.90047 24.753 4.24692C26.0995 5.59337 27.1676 7.19183 27.8962 8.95105C28.6249 10.7103 29 12.5958 29 14.5C29 22.5081 22.5081 29 14.5 29C6.49189 29 0 22.5081 0 14.5C0 6.49189 6.49189 1.59316e-10 14.5 1.59316e-10ZM15.95 15.95H13.05C9.46022 15.95 6.37832 18.1241 5.04905 21.2276C7.15228 24.1769 10.6016 26.1 14.5 26.1C18.3984 26.1 21.8477 24.1769 23.9509 21.2274C22.6217 18.1241 19.5398 15.95 15.95 15.95ZM14.5 4.35C12.0975 4.35 10.15 6.29757 10.15 8.69999C10.15 11.1024 12.0975 13.05 14.5 13.05C16.9024 13.05 18.85 11.1024 18.85 8.69999C18.85 6.29757 16.9025 4.35 14.5 4.35Z" fill="url(#paint0_radial_572_878)" />
            <defs>
                <radialGradient id="paint0_radial_572_878" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29) rotate(116.565) scale(32.423)">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
            </defs>
        </svg>
    )
}

export default ProfileIcon
