"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";
import generatePDF from "@/app/report/report";


export default function ButtonReport() {
    const [medidasActuales, setMedidasActuales] = useState<any[]>([]);
    const [promedio, setPromedio] = useState<number | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [authError, setAuthError] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: userResponse, error: authError } = await supabase.auth.getUser();
            if (authError) {
                setAuthError(authError);
                return;
            }
            if (!userResponse) {
                return redirect("/login");
            }
            const { id: userId } = userResponse.user;
            setUser(userResponse.user);
            setUserId(userId);

        };

        fetchUser();
    }, [supabase]);


    const handleGeneratePDF = async () => {
        try {
            await generatePDF();
            // Handle successful PDF generation (e.g., show a success message)
        } catch (error) {
            console.error("Error generating PDF:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <div className="buttonReport">
            <button onClick={handleGeneratePDF}>
                Generar Reporte
            </button>
        </div>
    );
}
