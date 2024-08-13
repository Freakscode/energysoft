import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ConsumeMeter from "@/components/Cards/ConsumeMeter";
import CardsPackage from "@/components/Cards/threeCards/page";
import './main.css';

export default async function MainComponent() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <div className="w-full">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                        <AuthButton />
                    </div>
                </nav>
                <main className="body">
                    <div className="rtViewer">
                        <ConsumeMeter/>
                    </div>
                    <div className="cardsViewer">
                        <CardsPackage/>
                    </div>
                </main>
            </div>
        </div>
    );
}
