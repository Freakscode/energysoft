import React from "react";
import Image from "next/image";
import Navbar from "@/components/sidebar/navbar";
import './about.css';


export const runtime = "edge";
export default function About() {
    return (
        <main className="container">
            <nav>
                <Navbar />
            </nav>
            <div className="content">
                <div className="names">
                    <h1>Desarrolladores</h1>
                    <ul>
                        <li>JOSÉ LUIS LÓPEZ PRADO</li>
                        <li>JAVIER SIERRA CARRILLO</li>
                        <li>ALEJANDRO GUERRERO HERNÁNDEZ</li>
                    </ul>
                </div>
                <div className="logo">
                    <Image
                        src="/NEXT.png"
                        alt="logo"
                        width={260}
                        height={80}
                    />
                </div>
            </div>
        </main>
    );
}