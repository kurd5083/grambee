const SendIcon = ({ width = "23", height = "21", colorFirst = "#FFD26D", colorSecond = "#FFB81A" }) => {
    return (
        <svg 
            width={width}
            height={height}
            viewBox="0 0 23 21" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M22.8793 2.40059C23.4436 0.975325 21.931 -0.405813 20.3701 0.110623L1.29289 6.41043C-0.273254 6.92806 -0.462655 8.8793 0.978096 9.64143L7.06765 12.8605L12.5054 7.89533C12.7518 7.67807 13.0817 7.55786 13.4242 7.56057C13.7667 7.56329 14.0943 7.68872 14.3365 7.90986C14.5787 8.13099 14.716 8.43014 14.719 8.74286C14.722 9.05558 14.5903 9.35685 14.3524 9.5818L8.91464 14.547L12.4414 20.1073C13.2748 21.4229 15.4117 21.2487 15.9786 19.8199L22.8793 2.40059Z" fill="url(#paint0_radial_641_18011)" />
            <defs>
                <radialGradient id="paint0_radial_641_18011" cx="0" cy="0" r="1" gradientTransform="matrix(-11.5 21 -23 -10.5 23 0)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond}/>
                </radialGradient>
            </defs>
        </svg>

    )
}

export default SendIcon
