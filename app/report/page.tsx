import { createClient } from "@/utils/supabase/server";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/sidebar/navbar";
import AuthButton from "@/components/AuthButton";
import { redirect } from "next/navigation";
import generatePDF from './report';
import './report.css';
import ButtonReport from "@/components/Buttons/Report";
import CardsReport from "@/components/Cards/cardsReport/page";
import ChartMonth from "@/components/charts/month/page";

export const runtime = "edge";
export default async function Report() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const userId = user ? user['id'] : null;

    if (!user) {
        return redirect("/login");
    }

    if (user.user_metadata['type'] === 'onHold') {
        return redirect("/onHold");
    }


    return (
        <main className="container">
            <div className="nav">
                <Navbar />
            </div>
            <div className="content">
                <div className="reportContent">
                    <div className="title">
                        <h1>Reporte de Consumo</h1>
                    </div>
                    <ChartMonth />
                </div>
                <div className="statsContainer">
                    <CardsReport />
                    <div className="downloadButton">
                        <ButtonReport />
                    </div>
                </div>
            </div>
        </main>
    );
}