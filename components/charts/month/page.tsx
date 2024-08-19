"use client";
import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import * as echarts from 'echarts';
import './month.css';
import { text } from "stream/consumers";

export default function ChartMonth() {
    const [consumoMes, setConsumoMes] = useState<any[]>([]);
    const [user, setUser] = useState<any | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [authError, setAuthError] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();
    const chartContainerRef = useRef(null);

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
        const fetchConsumoMes = async () => {
            if (!userId) return;

            const fechaInicio = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            const fechaFin = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

            const semanas = [];
            let inicio = new Date(fechaInicio);
            while (inicio < fechaFin) {
                let fin = new Date(inicio);
                fin.setDate(fin.getDate() + 6);
                if (fin > fechaFin) fin = fechaFin;
                semanas.push({ inicio, fin });
                inicio = new Date(fin);
                inicio.setDate(inicio.getDate() + 1);
            }

            const resultados = [];
            for (const { inicio, fin } of semanas) {
                const { data: medidas, error } = await supabase
                    .from('medidas')
                    .select('potencia, created_at')
                    .gte('created_at', inicio.toISOString())
                    .lte('created_at', fin.toISOString());

                if (error) {
                    setError(error.message);
                    return;
                }

                const consumoSemana = medidas.reduce((acc, curr) => acc + curr.potencia, 0);
                resultados.push({ semana: `${inicio.toLocaleDateString()} - ${fin.toLocaleDateString()}`, consumo: consumoSemana });
            }

            setConsumoMes(resultados);
        };

        fetchConsumoMes();
    }, [userId, supabase]);

    useEffect(() => {
        if (consumoMes.length === 0) return;

        const chart = echarts.init(chartContainerRef.current);

        const maxConsumo = Math.max(...consumoMes.map(semana => semana.consumo));
        const minConsumo = Math.min(...consumoMes.map(semana => semana.consumo));

        const getColor = (consumo: number) => {
            const intensity = (consumo - minConsumo) / (maxConsumo - minConsumo);
            // Interpolación de colores entre un color claro y uno oscuro
            const startColor = [135, 206, 250]; // Color claro (LightSkyBlue)
            const endColor = [0, 0, 139]; // Color oscuro (DarkBlue)
            const color = startColor.map((start, i) => Math.round(start + (endColor[i] - start) * intensity));
            return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        };

        const option = {
            title: {
                text: 'Consumo de Energía por Semana',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
                
            },
            xAxis: {
                type: 'category',
                data: consumoMes.map(semana => semana.semana),
                axisLabel: {
                    rotate: 45,
                    interval: 0
                },
                textStyle: {
                    color: '#fff'
                }
            },
            yAxis: {
                type: 'value',
                name: 'Energía (kWh)',
                textStyle: {
                    color: '#fff'
                }
            },
            series: [
                {
                    data: consumoMes.map(semana => ({
                        value: semana.consumo/1000,
                        itemStyle: {
                            color: getColor(semana.consumo)
                        }
                    })),
                    type: 'bar',
                    barWidth: '60%',
                    itemStyle: {
                        borderRadius: [5, 5, 0, 0],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    
                }
            ]
        };

        chart.setOption(option);

        return () => chart.dispose();
    }, [consumoMes]);

    return (
        <div className="chartContainer">
            <div ref={chartContainerRef} style={{width: '1000px', height: '500px' }} />
            {error && <p>Error: {error}</p>}
        </div>
    );
}
