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
                .from('medidas')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(10);

            if (fetchError) {
                setError("Error al obtener datos: " + fetchError.message);
                return;
            }

            setMedidas(data);
        };

        // Llama a fetchData inmediatamente
        fetchData();

        // Configura el intervalo para llamar a fetchData cada 30 minutos (1800000 milisegundos)
        const intervalId = setInterval(fetchData, 1800000);

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [supabase]);

    useEffect(() => {
        const channels = supabase.channel('custom-insert-channel')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'medidas' },
            (payload) => {
                setMedidas((medidas) => [...medidas, payload.new]);
            }
            ).subscribe();

        // Limpia la suscripción cuando el componente se desmonte
        return () => {
            supabase.removeChannel(channels);
        };
    }, [supabase]);

    const consumoPromedioSemana = medidas
        .filter((medida) => {
            const measureDate = new Date(medida.created_at);
            const today = new Date();
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
            return measureDate >= lastWeek;
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
