import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ConsumeMeter from "@/components/Cards/ConsumeMeter";
import CardsPackage from "@/components/Cards/threeCards/page";
import Navbar from "@/components/sidebar/navbar";
import './main.css';

export default async function MainComponent() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    

    if (!user) {
        return redirect("/login");
    }
    
    if (user.user_metadata['type'] === 'onHold'){
        return redirect("/onHold");
    }

    return (
        <main className="container">
            <nav className="Nav">
                <Navbar />
            </nav>
            <div className="body">
                <div className="rtViewer">
                    <ConsumeMeter />
                </div>
                <div className="cardsViewer">
                    <CardsPackage />
                </div>
            </div>
        </main>
    );
}