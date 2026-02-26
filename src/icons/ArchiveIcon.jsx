const ArchiveIcon = ({ width, height, colorFirst, colorSecond, uniqueId }) => {
    return (
        <svg
            width={width}
			height={height}
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20 7H2V15.8C2 16.3835 2.23705 16.9431 2.65901 17.3556C3.08097 17.7682 3.65326 18 4.25 18H17.75C18.3467 18 18.919 17.7682 19.341 17.3556C19.7629 16.9431 20 16.3835 20 15.8V7ZM7.625 10.3V9.2H14.375V10.3C14.375 10.5917 14.2565 10.8715 14.0455 11.0778C13.8345 11.2841 13.5484 11.4 13.25 11.4H8.75C8.45163 11.4 8.16548 11.2841 7.9545 11.0778C7.74353 10.8715 7.625 10.5917 7.625 10.3Z" fill={`url(#paint0_radial_${uniqueId}`} />
            <path d="M0 2C0 1.46957 0.231785 0.960859 0.644365 0.585786C1.05694 0.210714 1.61652 0 2.2 0H19.8C20.3835 0 20.9431 0.210714 21.3556 0.585786C21.7682 0.960859 22 1.46957 22 2C22 2.53043 21.7682 3.03914 21.3556 3.41421C20.9431 3.78929 20.3835 4 19.8 4H2.2C1.61652 4 1.05694 3.78929 0.644365 3.41421C0.231785 3.03914 0 2.53043 0 2Z" fill={`url(#paint1_radial_${uniqueId}`} />
            <defs>
                <radialGradient id={`paint0_radial_${uniqueId}`} cx="0" cy="0" r="1" gradientTransform="matrix(-9 11 -18 -5.5 20 7)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
                <radialGradient id={`paint1_radial_${uniqueId}`} cx="0" cy="0" r="1" gradientTransform="matrix(-11 4 -22 -2 22 0)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
            </defs>
        </svg>

    )
}

export default ArchiveIcon
