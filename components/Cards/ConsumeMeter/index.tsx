import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function ConsumeMeter() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    
    const {data: measures, error } = await supabase.from('medidas').select('id, Irms, potencia').gt('Irms', 0)
    .order('id', {ascending: false})
    .limit(10);

    if (error){
        console.log('Error fetching measures: ', error.message);
    }
        
    else {
        console.log("Últimas 10 mediciones: ", measures)
    }

    const irmsArray = measures?.map(measures => measures.Irms);
    const potenciaArray = measures?.map(measures => measures.potencia*10);


    return (
        <div>
            <h1>Últimas 10 mediciones</h1>
            <div>
                <h2>Irms</h2>
                <ul>
                    {irmsArray?.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Potencia</h2>
                <ul>
                    {potenciaArray?.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}