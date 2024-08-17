import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '@/public/enrgLogo.png'; // Import your logo image
import watermark from '@/public/watermark.png'; // Import your watermark image
import footerImage from '@/public/NEXT.png'; // Import your footer image
import { createClient } from "@/utils/supabase/client"



const generatePDF = async () => {

    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const userId = user ? user['id'] : null;

    if (!user) {
        return redirect("/login");
    }

    if (user.user_metadata['type'] === 'onHold') {
        return redirect("/onHold");
    }

    const { data: totalData } = await supabase
        .rpc('avg_custom', {
            p_case: 'total',
            p_column_name: 'potencia',
            p_end_date: null,
            p_start_date: null,
            p_user_id: userId
        });

    const { data: promedioYear } = await supabase
        .rpc('avg_custom', {
            p_case: 'current_year',
            p_column_name: 'potencia',
            p_end_date: null,
            p_start_date: null,
            p_user_id: userId
        });

    const { data: promedioMes } = await supabase
        .rpc('avg_custom', {
            p_case: 'current_month',
            p_column_name: 'potencia',
            p_end_date: null,
            p_start_date: null,
            p_user_id: userId
        });

    const { data: promedioSemana } = await supabase
        .rpc('avg_custom', {
            p_case: 'current_week',
            p_column_name: 'potencia',
            p_end_date: null,
            p_start_date: null,
            p_user_id: userId
        });

    const { data: promedioUltimoDia } = await supabase
        .rpc('avg_custom', {
            p_case: 'last_day',
            p_column_name: 'potencia',
            p_end_date: null,
            p_start_date: null,
            p_user_id: userId
        });

    // Initialize jsPDF
    const doc = new jsPDF('p', 'pt', 'letter');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header
    const headerText = 'Reporte Generado Automáticamente';
    const logoWidth = 100;
    const logoHeight = 40;
    
    doc.setFontSize(14);
    doc.text(headerText, 200, 60);

    // Watermark
    const watermarkWidth = 400;
    const watermarkHeight = 400;
    

    // Body Content

    // Footer
    const footerText = 'Desarrollado por:';
    doc.text(footerText, 50, pageHeight - 40);
    

    // Save the PDF
    doc.save('Reporte.pdf');
};

export default generatePDF;
