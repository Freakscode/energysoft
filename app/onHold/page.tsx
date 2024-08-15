"use client";
import { createClient } from "@/utils/supabase/client";
import React, {useEffect, useState} from "react";
import { redirect } from "next/navigation";
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
        };



    }, [userId]);

    
return(
    <main className="container">
        <div className="body">
            <div className="imgLogo">
                <Image src="/Logo.svg" alt="Logo App" width={720} height={480}/>
            </div>
            <div className="infoOnHold">
            <p>¡Bienvenido a Energysoft, {userName}! Tu cuenta ha sido creada y activada exitosamente, ahora solo necesitas activar tu dispositivo para acceder al dashboard de datos.</p>
            </div>
        </div>
    </main>
)




}