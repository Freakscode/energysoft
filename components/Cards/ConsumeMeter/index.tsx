"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";
import './ConsumeMeter.css';
import Plug from "@/public/icons/plug/icon";

export default function ConsumeMeter() {
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
                .order('created_at', { ascending: false });

            if (fetchError) {
                setError("Error al obtener datos: " + fetchError.message);
                return;
            }

            setMedidasActuales(data);
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
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'medidas', filter: `user_id=eq.${userId}` },
                (payload) => {
                    setMedidasActuales((medidas) => [...medidas, payload.new]);
                }
            ).subscribe();

        // Limpia la suscripción cuando el componente se desmonte
        return () => {
            supabase.removeChannel(channels);
        };
    }, [supabase]);

    useEffect(() => {
        const fetchPromedioTotal = async () => {
            if (!userId) return;
            const { data: promedio, error } = await supabase
                .rpc('avg_custom', {
                    p_case: 'total',
                    p_column_name: 'potencia',
                    p_end_date: null,
                    p_start_date: null,
                    p_user_id: userId
                });

            setPromedio(promedio);

            if (error) {
                setError("Error al obtener promedio: " + error.message);
                return;
            }
        };

        const intervalId = setInterval(fetchPromedioTotal, 5000);

        // Limpia el intervalo cuando el componente se desmonte
        return () => clearInterval(intervalId);
    }, [userId, supabase]);

    return (
        <div id="ConsumeMeter" className="divConsumeMeter">
            <div className="svg-meter">
                <Plug />
            </div>
            <div className="info">
                <h1 className="title">TIEMPO REAL</h1>
                {error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <div className="potenciaContainer">
                            <h2 className="Potencia">Consumo Actual de Energía: {medidasActuales.slice(-1).map((medida) => (
                                <p key={medida.id}>{medida.potencia} W</p>
                            ))}</h2>
                        </div>
                        <div className="promedioContainer">
                            <h2 className="promedio">Promedio total de Consumo: {promedio !== null ? <p>{promedio.toFixed(2)} W</p> : <p>Cargando...</p>}</h2>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
