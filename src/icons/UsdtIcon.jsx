const UsdtIcon = ({ width, height, colorFirst, colorSecond, uniqueId }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 98 98"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M11.9927 0H86.0108V19.4205H11.9927V0ZM60.1045 55.1607V98H37.899V55.1607H60.1045Z" fill={`url(#paint0_linear_${uniqueId})`} />
            <path d="M49 30.5996C21.9094 30.5996 0 36.5563 0 43.8186C0 51.0809 21.9834 57.0376 49 57.0376C76.0166 57.0376 98 51.0809 98 43.8186C98 36.5563 76.0166 30.5996 49 30.5996ZM49 50.9993C23.9819 50.9993 3.70091 46.9193 3.70091 41.8602C3.70091 36.8011 23.9819 32.7212 49 32.7212C74.0181 32.7212 94.2991 36.8011 94.2991 41.8602C94.2991 46.9193 74.0181 50.9993 49 50.9993Z" fill={`url(#paint1_linear_${uniqueId})`} />
            <path d="M49.0041 47.981C52.853 47.981 56.5539 47.8994 60.1068 47.6546V14.2808H37.9014V47.6546C41.4542 47.8178 45.1551 47.981 49.0041 47.981Z" fill={`url(#paint2_linear_${uniqueId})`} />
            <defs>
                <linearGradient id={`paint0_linear_${uniqueId}`} x1="49.0017" y1="0" x2="49.0017" y2="98" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </linearGradient>
                <linearGradient id={`paint1_linear_${uniqueId}`} x1="49" y1="30.5996" x2="49" y2="57.0376" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </linearGradient>
                <linearGradient id={`paint2_linear_${uniqueId}`} x1="49.0041" y1="14.2808" x2="49.0041" y2="47.981" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </linearGradient>
            </defs>
        </svg>
    )
}


export default UsdtIcon
