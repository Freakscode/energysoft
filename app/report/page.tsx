import { createClient } from "@/utils/supabase/server";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/sidebar/navbar";
import AuthButton from "@/components/AuthButton";
import { redirect } from "next/navigation";
import generatePDF from './report';
import './report.css';
import buttonReport from "@/components/Buttons/Report";
import ButtonReport from "@/components/Buttons/Report";

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
                <div className="downloadReport">
                    <ButtonReport />
                </div>
            </div>
        </main>
    );
}