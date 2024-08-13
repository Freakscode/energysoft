"use client";
import React, {useState, useEffect} from "react";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import MonthIcon from "@/public/icons/month/icon";
import WeekIcon from "@/public/icons/week/icon";
import DayIcon from "@/public/icons/day/DayIcon";
import MoonIcon from "@/public/icons/day/MoonIcon";
import './threeCards.css';

export default function CardsPackage (){
    const [promedioMes, setPromedioMes] = useState<number | null>(null);
    const [promedioSemana, setPromedioSemana] = useState<number | null>(null);
    const [promedioDia, setPromedioDia] = useState<number | null>(null);
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
            const {id: userId} = userResponse.user;
            setUser(userResponse.user);
            setUserId(userId);

        };
    
        fetchUser();
    }, [supabase]);

    useEffect(() => {
        const fetchPromedioMes = async () =>{
            if (!userId) return;
            const { data: promedioMes, error } = await supabase
                .rpc('avg_custom', {
                    p_case: 'current_month', 
                    p_column_name: 'potencia',
                    p_end_date: null,
                    p_start_date: null,
                    p_user_id: userId
                });
    
            setPromedioMes(promedioMes);
    
            if (error) {
                setError("Error al obtener promedio: " + error.message);
                return;
            }
        }

        const fetchPromedioSemana = async () =>{
            if (!userId) return;
            const { data: promedioSemana, error } = await supabase
                .rpc('avg_custom', {
                    p_case: 'current_week', 
                    p_column_name: 'potencia',
                    p_end_date: null,
                    p_start_date: null,
                    p_user_id: userId
                });
    
            setPromedioSemana(promedioSemana);
    
            if (error) {
                setError("Error al obtener promedio: " + error.message);
                return;
            }
        }

        const fetchPromedioDia = async () =>{
            if (!userId) return;
            const { data: promedioDia, error } = await supabase
                .rpc('avg_custom', {
                    p_case: 'last_day', 
                    p_column_name: 'potencia',
                    p_end_date: null,
                    p_start_date: null,
                    p_user_id: userId
                });
    
            setPromedioDia(promedioDia);
    
            if (error) {
                setError("Error al obtener promedio: " + error.message);
                return;
            }
        }


        const intervalIdMes = setInterval(fetchPromedioMes, 5000);
        const intervalIdSemana = setInterval(fetchPromedioSemana, 5000);

        return () => {
            clearInterval(intervalIdMes);
            clearInterval(intervalIdSemana);
        };



    }, [userId, supabase]);

    return (
        <div className="cardsBody">
            <div className = "mesCard">
                <MonthIcon/>
                <div>
                <h1>Promedio del mes</h1>
                <h2>{promedioMes !== null ? <p>{(promedioMes*2).toFixed(2)} W/min</p> : <p>Cargando...</p>}</h2>
                </div>
            </div>
            <div className="semanaCard">
                <WeekIcon/>
                <div>
                <h1>Promedio de la semana</h1>
                <h2>{promedioSemana !== null ? <p>{(promedioSemana*2).toFixed(2)} W/min</p> : <p>Cargando...</p>}</h2>
                </div>
            </div>
            <div className="diaCard">
                <MoonIcon/>
                <div>
                <h1>Promedio del día anterior</h1>
                <h2>{promedioDia !== null ? <p>{(promedioDia*2).toFixed(2)} W/min</p> : <p>Cargando...</p>}</h2>
                </div>
            </div>
        </div>
    )

}