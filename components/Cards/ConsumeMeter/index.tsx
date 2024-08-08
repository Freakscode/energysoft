"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function ConsumeMeter() {
    const [medidas, setMedidas] = useState<any[]>([]); // Ajusta el tipo según tus datos
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        const fetchData = async () => {
            const { data: user, error: authError } = await supabase.auth.getUser();

            if (!user) {
                return redirect("/login");
            }

            if (authError) {
                setError("Error de autenticación: " + authError.message);
                return;
            }

            const { data, error: fetchError } = await supabase
                .from("medidas")
                .select("id, Irms, potencia, created_at")
                .gt("Irms", 0)
                .order("created_at", { ascending: false }) // Ordenar por fecha descendente

            if (data) {
                setMedidas(data);
            } else {
                setError("Error al obtener datos: " + fetchError?.message);
            }
        };

        fetchData(); // Llamada inicial

        const channel = supabase
            .channel("custom-insert-channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "medidas" },
                (payload) => {
                    setMedidas((prevMedidas) => [payload.new, ...prevMedidas].slice(0, 10)); // Actualizar y mantener las últimas 10
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const consumoPromedioSemana = medidas
        .filter((medida) => {
            const fechaMedida = new Date(medida.created_at);
            const hoy = new Date();
            const haceUnaSemana = new Date(hoy);
            haceUnaSemana.setDate(hoy.getDate() - 7);
            return fechaMedida >= haceUnaSemana;
        })
        .reduce((acc, medida) => acc + parseFloat(medida.potencia), 0) / (medidas.length > 0 ? medidas.length : 1);


    return (
        <main>
            <div>
                <h1>Últimas 10 mediciones</h1>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <div>
                            <h2>Irms</h2>
                            <ul>
                                {medidas.slice(-10).map((medida) => (
                                    <li key={medida.id}>{medida.Irms}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2>Potencia</h2>
                            <ul>
                                {medidas.slice(-10).map((medida) => (
                                    <li key={medida.id}>{medida.potencia}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h2>Promedio de consumo en la última semana:</h2>
                            <p>{consumoPromedioSemana.toFixed(2)}</p>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
