import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ConsumeMeter } from "@/components/Cards/ConsumeMeter";

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
                        <div className="flex-1"></div>
                        <AuthButton />
                    </div>
                </nav>
                <main>
                    <h2 className="font-bold text-4xl mb-4">Next steps</h2>
                    <div className="flex-1 flex flex-col gap-6 max-w-4xl px-3">
                        <p>
                            This is a protected page that you can only see as an authenticated
                            user
                        </p>
                    </div>
                    <ConsumeMeter/>
                </main>
            </div>
        </div>
    );
}
