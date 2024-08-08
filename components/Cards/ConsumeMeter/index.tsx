"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";

export function ConsumeMeter() {
    const [measures, setMeasures] = useState([]);
    const [error, setError] = useState(null);
    const supabase = createClient();
    const [potenciaTotalArray, setPotenciaTotalArray] = useState<string[]>([]);
    const [fechaArray, setFechaArray] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const supabase = createClient();

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                return redirect("/login");
            }
            const {data: medidas, error} = await supabase.from('medidas').select('id ,Irms, potencia, created_at').gt('Irms', 0)
            const potenciaTotalArray = medidas?.map((medida) => medida.potencia);
            const fechaArray = medidas?.map((medida) => medida.created_at);
            setPotenciaTotalArray(potenciaTotalArray ||[]);
            setFechaArray(fechaArray || []);
            console.log('Potencia total array: ', potenciaTotalArray, 'Fecha array: ', fechaArray, 'Medidas: ', medidas);
        };

        fetchData();
        
    }, []);
    
    

    const channels = supabase.channel('custom-insert-channel')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'medidas' },
            (payload) => {
                console.log('Cambio detectado: ', payload);
                potenciaTotalArray.push(payload.new.potencia);
                fechaArray.push(payload.new.created_at);
                console.log('Potencia total array: ', potenciaTotalArray, 'Fecha array: ', fechaArray);
            }
        ).subscribe();
    

    function ConsumoPromedioTotal(potenciaTotalArray: string[]) {
        let sum = 0;
        try {
            potenciaTotalArray.forEach((element) => {
                sum += parseFloat(element);
            });
            return sum / potenciaTotalArray.length;
        }
        catch (error) {
            console.log('Error calculating average: ', error);
            return undefined;
        }
    }

    class ConsumoPromedioSemana {
        potenciaTotalArray: string[];
        fechaArray: string[];
        constructor(potenciaTotalArray: string[], fechaArray: string[]) {
            this.potenciaTotalArray = potenciaTotalArray;
            this.fechaArray = fechaArray;
        }

        ConsumoPromedioSemana() {
            let sum = 0;
            let count = 0;
            let today = new Date();
            let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            try {
                this.potenciaTotalArray.forEach((element, index) => {
                    let fecha = new Date(this.fechaArray[index]);
                    if (fecha >= lastWeek) {
                        sum += parseFloat(element);
                        count += 1;
                    }
                });
                return sum / count;
            }
            catch (error) {
                console.log('Error calculating average: ', error);
                return undefined;
            }
        }

        maxConsumoSemana() {
            let max = 0;
            let maxDate = new Date();
            let today = new Date();
            let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            try {
                this.potenciaTotalArray.forEach((element, index) => {
                    let fecha = new Date(this.fechaArray[index]);
                    if (fecha >= lastWeek) {
                        if (parseFloat(element) > max) {
                            max = parseFloat(element);
                            maxDate = fecha;
                        }
                    }
                });
                return { max, maxDate };
            } catch (error) {
                console.log('Error calculating max: ', error);
                return undefined;
            }
        }
    }

    return (
        <main>
            <div>
                <h1>Últimas 10 mediciones</h1>
                <div>
                    <h2>Irms</h2>
                    <ul>
                        
                    </ul>
                </div>
                <div>
                    <h2>Potencia</h2>
                    <ul>
                        
                    </ul>
                </div>
                <div>
                    <h2>Promedio de consumo en la última semana</h2>
                </div>
            </div>
        </main>
    );
}
