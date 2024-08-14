"use client";
import { createClient } from "@/utils/supabase/client";
import React, {useEffect, useState} from "react";
import { redirect } from "next/navigation";
import Navbar from "@/components/sidebar/navbar";
import AuthButton from "@/components/AuthButton";
import Image from "next/image";
import './onHold.css';


export default function OnHold(){
    const [user, setUser] = useState<any | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null> (null);
    const [userStatus, setUserStatus] = useState<any | null>(null);
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
            setUserName(userResponse.user.user_metadata['username']);

        };

        fetchUser();
    }, [supabase]);

    useEffect(() => {
        const fetchUserStatus = async () => {
            const { data: userStatus, error } = await supabase.from('users').select('rol').eq('id', userId);
            if (error) {
                setError("Error al obtener status: " + error.message);
                return;
            }
            setUserStatus(userStatus);
            console.log(userStatus);
        };



    }, [userId]);

    
return(
    <main className="container">
        <div className="body">
            <div className="imgLogo">
                <Image src="/Logo.svg" alt="Logo App" width={720} height={480}/>
            </div>
            <div className="infoOnHold">
            <h1>On Hold</h1>
            <p>Bienvenido a Energysoft, {userName}! Sí estás viendo está página es porque tu cuenta fue creada exitosamente, sin embargo no cuentas con algún dispositivo <br/>
            activo en este momento, porfavor configura tu dispositivo de medición de consumo eléctrico de acuerdo a las instrucciones para acceder al dashboard!</p>
            </div>
        </div>
    </main>
)




}