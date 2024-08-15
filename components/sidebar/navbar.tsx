import { createClient } from '@/utils/supabase/server';
import { useState } from 'react';
import AppLogo from '@/public/icons/appLogo';
import DocumentsIcon from '@/public/icons/documents';
import './navbar.css';
import AuthButton from '../AuthButton';
import EngLogo from '@/public/icons/engLogo';

export default async function Navbar() {
    const supabase = createClient();

    const {data: { user },} = await supabase.auth.getUser();

    return (
        <div className='icons'>
            <div className="engLogo">
                <EngLogo/>
            </div>
            <div>
                <a href="/"><AppLogo /></a>
            </div>
            <div>
                <a href='/report'><DocumentsIcon /></a>
            </div>
            <div>
                <AuthButton />
            </div>
            
        </div>
    );
}


