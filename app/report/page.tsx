import { createClient } from "@/utils/supabase/server";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/sidebar/navbar";
import AuthButton from "@/components/AuthButton";
import { redirect } from "next/navigation";
import { text, image, barcodes } from "@pdfme/schemas";
import { generate } from "@pdfme/generator";

import './report.css';


export default async function Report() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const userId = user?['id'] : null;

    if (!user) {
        return redirect("/login");
    }

    if (user.user_metadata['type'] === 'onHold') {
        return redirect("/onHold");
    }

    const handleGenerateReport = async () => {
                const { data: promedioYear } = await supabase
                .rpc('avg_custom', {
                    p_case: 'current_week',
                    p_column_name: 'potencia',
                    p_end_date: null,
                    p_start_date: null,
                    p_user_id: userId
                });
                const { data: promedioMes } = await supabase
                .rpc('avg_custom', {
                    p_case: 'current_week',
                    p_column_name: 'potencia',
                    p_end_date: null,
                    p_start_date: null,
                    p_user_id: userId
                });
                const { data: promedioSemana} = await supabase
                .rpc('avg_custom', {
                    p_case: 'current_week',
                    p_column_name: 'potencia',
                    p_end_date: null,
                    p_start_date: null,
                    p_user_id: userId
                });
                const { data: promedioUltimoDia } = await supabase
                .rpc('avg_custom', {
                    p_case: 'current_week',
                    p_column_name: 'potencia',
                    p_end_date: null,
                    p_start_date: null,
                    p_user_id: userId
                });
        
        
    };

    return (
        <main className="container">
                <div className="nav">
                <Navbar />
                </div>
            <div className="content">
            </div>
        </main>
    )
}