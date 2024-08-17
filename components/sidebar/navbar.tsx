import { createClient } from '@/utils/supabase/server';
import { useState } from 'react';
import Image from 'next/image';
import AppLogo from '@/public/icons/appLogo';
import DocumentsIcon from '@/public/icons/documents';
import './navbar.css';
import AuthButton from '../AuthButton';

export default async function Navbar() {
    const supabase = createClient();

    const {data: { user },} = await supabase.auth.getUser();

    return (
        <div className='icons'>
            <div>
            <Image src="/Logo.svg" alt="logo" width={250} height={80}/>
            </div>
            <div>
                <a href="/"><AppLogo /></a>
            </div>
            <div>
                <a href='/report'><DocumentsIcon /></a>
            </div>
            <div className='authButtonContainer'>
                <AuthButton />
            </div>
        </div>
    );
}


