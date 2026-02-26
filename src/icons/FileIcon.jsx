const FileIcon = ({ width, height, colorFirst, colorSecond, uniqueId }) => {
    return (
        <svg 
            width={width}
            height={height}
            viewBox="0 0 13 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12.8523 6.85714H7.68182C7.21166 6.85714 6.76076 6.67653 6.42831 6.35504C6.09586 6.03355 5.90909 5.59751 5.90909 5.14286V0.142857C5.90909 0.104969 5.89353 0.0686328 5.86582 0.0418419C5.83812 0.015051 5.80054 0 5.76136 0H2.36364C1.73676 0 1.13556 0.240816 0.692293 0.66947C0.249025 1.09812 0 1.67951 0 2.28571V13.7143C0 14.3205 0.249025 14.9019 0.692293 15.3305C1.13556 15.7592 1.73676 16 2.36364 16H10.6364C11.2632 16 11.8644 15.7592 12.3077 15.3305C12.751 14.9019 13 14.3205 13 13.7143V7C13 6.96211 12.9844 6.92578 12.9567 6.89898C12.929 6.87219 12.8915 6.85714 12.8523 6.85714Z" fill={`url(#paint0_radial_${uniqueId})`} />
            <path d="M11.9803 5.86157L7.11536 0.0236101C7.1059 0.0123241 7.09387 0.00464621 7.08078 0.00154155C7.06769 -0.00156311 7.05413 4.41205e-05 7.0418 0.0061611C7.02948 0.0122781 7.01893 0.0226319 7.01149 0.0359208C7.00405 0.0492098 7.00006 0.0648408 7 0.080849V5.35048C7 5.52274 7.05703 5.68795 7.15853 5.80976C7.26004 5.93157 7.39771 6 7.54127 6H11.9326C11.946 5.99993 11.959 5.99513 11.9701 5.98621C11.9811 5.97728 11.9898 5.96463 11.9949 5.94983C12 5.93504 12.0013 5.91877 11.9987 5.90306C11.9961 5.88736 11.9897 5.87292 11.9803 5.86157Z" fill={`url(#paint1_radial_${uniqueId})`} />
            <defs>
                <radialGradient id={`paint0_radial_${uniqueId}`} cx="0" cy="0" r="1" gradientTransform="matrix(-6.5 16 -13 -8 13 0)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
                <radialGradient id={`paint1_radial_${uniqueId}`} cx="0" cy="0" r="1" gradientTransform="matrix(-2.5 6 -5 -3 12 0)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
            </defs>
        </svg>

    )
}

export default FileIcon
