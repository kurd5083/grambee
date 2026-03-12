const WarningIcon = ({ width, height, color }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3L1.8 20.4C1.5 21 1.9 22 2.6 22H21.4C22.1 22 22.5 21 22.2 20.4L12 3Z"
      fill={color}
    />
    <rect x="11" y="9" width="2" height="6" rx="1" fill="#FFFFFF" />
    <rect x="11" y="16.5" width="2" height="2" rx="1" fill="#FFFFFF" />
  </svg>
);

export default WarningIcon