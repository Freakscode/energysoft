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
    .order('id', {ascending: false});

    if (error){
        console.log('Error fetching measures: ', error.message);
    }
        
    else {
        console.log("Últimas 10 mediciones: ", measures)
    }

    const irmsArray = measures?.map(measures => measures.Irms);
    const potenciaArray = measures?.map(measures => (measures.potencia*10).toFixed(2));

    
    function consumoPromedio(potenciaArray: string[]){
        let sum = 0;
        try {
            potenciaArray.forEach((element) => {
                sum += parseFloat(element);
            });
            return sum/potenciaArray.length;
        }
        catch (error) {
            console.log('Error calculating average: ', error);
            return undefined;
        }
    }

    return (
        <main>
            <div>
            <h1>Últimas 10 mediciones</h1>
            <div>
                <h2>Irms</h2>
                <ul>
                    {irmsArray?.slice(-10).map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Potencia</h2>
                <ul>
                    {potenciaArray?.slice(-10).map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Promedio de consumo en la última semana</h2>
                <p>{consumoPromedio(potenciaArray ?? [])?.toFixed(2)}</p>
            </div>
            </div>
        </main>
    );
}