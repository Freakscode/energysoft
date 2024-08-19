import React from "react";
import './plug.css';


function Plug() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width= "100%"
            height="100%"
            fill="none"
            viewBox="-2 -1 182 178"
        >
            <g id="plug" className="plug" stroke="#fff" strokeWidth="5">
                <path
                    id="outer_2"
                    className="outer_2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M87.43 114.3v43.58c0 9.63-7.82 17.61-17.18 15.71C30.75 165.55 1 130.35 1 88.15c0-16.02 4.29-31.04 11.77-43.94"
                ></path>
                <path
                    id="outer_1"
                    className="outer_1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M125.15 166.59c28.84-14.12 48.71-43.94 48.71-78.44C173.86 40.02 135.17 1 87.43 1c-15.74 0-30.5 4.24-43.22 11.66"
                ></path>
                <path
                    id="handler"
                    className="handler"
                    d="M61.5 85.7c0-3.82 3.1-6.91 6.91-6.91h38.03c3.82 0 6.91 3.1 6.91 6.91v1.73c0 14.32-11.61 25.93-25.93 25.93s-25.93-11.61-25.93-25.93V85.7h.01z"
                ></path>
                <g id="plug_connect" className="plug_connect" strokeLinecap="round">
                    <path id="Vector" className="Vector" d="M100.4 78.79V61.5"></path>
                    <path id="Vector_2" className="Vector_2" d="M74.47 78.79V61.5"></path>
                </g>
            </g>
        </svg>
    );
}

export default Plug;