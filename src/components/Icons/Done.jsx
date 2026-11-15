import * as React from "react";

const Done = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <circle cx={256} cy={256} r={233} fill="#2bb673" />
    <path
      d="M154 266l70 70 146-148"
      fill="none"
      stroke="#fff"
      strokeWidth={30}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Done;
