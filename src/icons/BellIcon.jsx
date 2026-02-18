const BellIcon = ({ width = 18, height = 20, colorFirst = "#FFD26D", colorSecond = "#FFB81A" }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M11.6069 15.2384V15.9307C11.6069 16.6652 11.3006 17.3695 10.7555 17.8889C10.2104 18.4082 9.47114 18.7 8.70025 18.7C7.92936 18.7 7.19005 18.4082 6.64495 17.8889C6.09986 17.3695 5.79362 16.6652 5.79362 15.9307V15.2384M16.4973 13.8291C15.331 12.4692 14.5076 11.7769 14.5076 8.0276C14.5076 4.59418 12.6673 3.37096 11.1527 2.77687C10.9515 2.69812 10.7621 2.51726 10.7008 2.32038C10.4351 1.45889 9.69032 0.699951 8.70025 0.699951C7.71018 0.699951 6.9649 1.45933 6.70194 2.32125C6.64063 2.52029 6.45125 2.69812 6.25005 2.77687C4.73361 3.37183 2.89517 4.59072 2.89517 8.0276C2.8929 11.7769 2.06951 12.4692 0.903225 13.8291C0.419998 14.3925 0.843276 15.2384 1.68847 15.2384H15.7166C16.5572 15.2384 16.9778 14.3899 16.4973 13.8291Z" stroke="url(#paint0_radial_641_10776)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
                <radialGradient id="paint0_radial_641_10776" cx="0" cy="0" r="1" gradientTransform="matrix(-8 18 -16 -9 16.6997 0.699951)" gradientUnits="userSpaceOnUse">
                    <stop stop-color={colorFirst} />
                    <stop offset="1" stop-color={colorSecond} />
                </radialGradient>
            </defs>
        </svg>
    )
}

export default BellIcon
