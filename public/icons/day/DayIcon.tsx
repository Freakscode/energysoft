import React from "react";
import './day.css';

export default function DayIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={80} height={75} fill="none">
            <path
                fill="#51C3A3"
                d="M56.667 37.5c0 8.63-7.462 15.625-16.667 15.625-9.205 0-16.667-6.996-16.667-15.625 0-8.63 7.462-15.625 16.667-15.625 9.205 0 16.667 6.996 16.667 15.625Z"
            />
            <path
                fill="#349C7F"
                fillRule="evenodd"
                d="M40 3.906c1.38 0 2.5 1.05 2.5 2.344v6.25c0 1.294-1.12 2.344-2.5 2.344s-2.5-1.05-2.5-2.344V6.25c0-1.294 1.12-2.344 2.5-2.344ZM4.167 37.5c0-1.294 1.119-2.344 2.5-2.344h6.666c1.381 0 2.5 1.05 2.5 2.344 0 1.294-1.119 2.344-2.5 2.344H6.667c-1.381 0-2.5-1.05-2.5-2.344Zm60 0c0-1.294 1.119-2.344 2.5-2.344h6.666c1.381 0 2.5 1.05 2.5 2.344 0 1.294-1.119 2.344-2.5 2.344h-6.666c-1.381 0-2.5-1.05-2.5-2.344ZM40 60.156c1.38 0 2.5 1.05 2.5 2.344v6.25c0 1.294-1.12 2.344-2.5 2.344s-2.5-1.05-2.5-2.344V62.5c0-1.294 1.12-2.344 2.5-2.344Z"
                clipRule="evenodd"
            />
            <g fill="#7FF3D3" opacity={0.5}>
                <path d="M12.23 11.611c.932-.955 2.513-1.021 3.532-.148l7.407 6.349c1.02.873 1.09 2.356.158 3.311-.931.955-2.513 1.022-3.532.148l-7.406-6.349c-1.02-.873-1.09-2.355-.159-3.31ZM67.773 11.611c.932.956.861 2.438-.158 3.311l-7.407 6.35c-1.019.873-2.6.806-3.532-.149-.932-.955-.86-2.438.158-3.311l7.407-6.349c1.019-.873 2.6-.807 3.532.148ZM56.754 53.202c.976-.915 2.559-.915 3.535 0l7.407 6.945c.976.916.976 2.4 0 3.315-.977.915-2.56.915-3.536 0l-7.407-6.945a2.242 2.242 0 0 1 0-3.315ZM23.25 53.203c.977.915.977 2.399 0 3.314l-7.407 6.945c-.976.915-2.559.915-3.535 0a2.241 2.241 0 0 1 0-3.315l7.407-6.944c.977-.916 2.56-.916 3.536 0Z" />
            </g>
        </svg>
    )
}