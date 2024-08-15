import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/hero");
  }
  else if (user) {
    return redirect("/main");
  }

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full max-h-screen flex flex-col gap-20 items-center">
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3 mt-20">
        <Header />
        <main className="flex-1 flex flex-col gap-6">          
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-center items-center text-sm -mt-24">
                {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>
        </main>
      </div>
    </div>
  );
}
