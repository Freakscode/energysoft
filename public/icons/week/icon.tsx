import React from "react";
import './week.css';


function WeekIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={75} height={80} fill="none">
            <path
                stroke="#9A5ED7"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M51.563 45v10h7.03"
            />
            <path
                stroke="#51C3A3"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M51.563 72.5c9.06 0 16.406-7.835 16.406-17.5s-7.346-17.5-16.406-17.5c-9.061 0-16.407 7.835-16.407 17.5s7.346 17.5 16.407 17.5Z"
            />
            <path
                stroke="#51C3A3"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M56.5 38.5 56.25 15H7.031v52.5c7.5-6.75 18.75-12.75 28.125-15"
            />
            <path
                stroke="#9A5ED7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M21.094 30h14.062M21.094 40h7.031"
            />
        </svg>
    );
}

export default WeekIcon;