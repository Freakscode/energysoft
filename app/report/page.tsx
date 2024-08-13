import { createClient } from "@/utils/supabase/server";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/sidebar/navbar";
import AuthButton from "@/components/AuthButton";
import { redirect } from "next/navigation";
import './report.css';


export default async function Report() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

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