const TotalIcon = ({ width, height, color }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle 
      cx="7" 
      cy="9" 
      r="3" 
      stroke={color} 
      strokeWidth="1.5" 
      fill="none"
    />
    <path 
      d="M2 18V16C2 14.3 3.3 13 5 13H9C10.7 13 12 14.3 12 16V18" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <circle 
      cx="17" 
      cy="9" 
      r="3" 
      stroke={color} 
      strokeWidth="1.5" 
      fill="none"
    />
    <path 
      d="M12 18V16C12 14.3 13.3 13 15 13H19C20.7 13 22 14.3 22 16V18" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    <path 
      d="M12 11V15" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M10 13H14" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round"
    />
  </svg>
);

export default TotalIcon