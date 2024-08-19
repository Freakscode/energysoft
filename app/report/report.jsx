import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
        .rpc('calculate_energy_consumption', {
            p_case: 'total',
            p_column_name: 'potencia',
            p_end_date: null,
            p_start_date: null,
            p_user_id: userId
        });

    const { data: promedioMes } = await supabase
        .rpc('calculate_energy_consumption', {
            p_case: 'current_month',
            p_column_name: 'potencia',
            p_end_date: null,
            p_start_date: null,
            p_user_id: userId
        });

    const { data: promedioSemana } = await supabase
        .rpc('calculate_energy_consumption', {
            p_case: 'current_week',
            p_column_name: 'potencia',
            p_end_date: null,
            p_start_date: null,
            p_user_id: userId
        });

    const { data: promedioUltimoDia } = await supabase
        .rpc('calculate_energy_consumption', {
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
    const userText = `Usuario: ${user.email}`;
    const dateText = `Fecha: ${new Date().toLocaleString()}`;
    
    doc.setFontSize(10);
    doc.text(headerText, 400, 60, 'justify');
    doc.text(userText, 400, 75, 'justify');
    doc.text(dateText, 400, 90, 'justify');
    const logo = '/enrgLogo.jpg';
    doc.addImage(logo, 'JPG', 50, 40, 319.6, 75);

    // Watermark
    const watermarkWidth = 400;
    const watermarkHeight = 520;
    const watermark = '/watermark.jpg';
    doc.addImage(watermark, 'JPG', pageWidth / 2 - watermarkWidth / 2, pageHeight / 2 - watermarkHeight / 2, watermarkWidth, watermarkHeight);
    

    // Body Content
    const icon1 = '/reportIcons/imgEstd.jpg';
    const icon2 = '/reportIcons/imgMes.jpg';
    const icon3 = '/reportIcons/imgSem.jpg';
    const icon4 = '/reportIcons/imgDia.jpg';
    const textIcon1 = 'TOTAL DE ENERGÍA CONSUMIDA';
    const textIcon2 =  'ENERGÍA CONSUMIDA EN EL MES EN CURSO';
    const textIcon3 = 'ENERGÍA CONSUMIDA EN LA SEMANA EN CURSO';
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const textIcon4 = `ENERGÍA CONSUMIDA AYER: ${formattedDate}`; ;
    const text = `${totalData.toFixed(2)} kW/h`;
    const text2 = `${promedioMes.toFixed(2)} kW/h`;
    const text3 = `${promedioSemana.toFixed(2)} kW/h`;
    const text4 = `${promedioUltimoDia.toFixed(2)} kW/h`;
    doc.setFontSize(14);
    doc.text(textIcon1, 120, 220, 'left');
    doc.text(textIcon2, 120, 345, 'left');
    doc.text(textIcon3, 120, 470, 'left');
    doc.text(textIcon4, 120, 595, 'left');
    doc.setFontSize(16);
    doc.text(text, 125, 250, 'left');
    doc.text(text2, 125, 375, 'left');
    doc.text(text3, 125, 500, 'left');
    doc.text(text4, 125, 625, 'left');
    doc.addImage(icon1, 'JPG', 50, 200, 50, 50);
    doc.addImage(icon2, 'JPG', 50, 325, 50, 50);
    doc.addImage(icon3, 'JPG', 50, 450, 50, 50);
    doc.addImage(icon4, 'JPG', 50, 575, 50, 50);
    // Footer
    doc.setFontSize(10)
    const footerText = 'Desarrollado por:';
    doc.text(footerText, 40, pageHeight - 80);
    doc.setFontSize(8);
    doc.text('- JOSÉ LUIS LÓPEZ PRADO', 50, pageHeight - 60);
    doc.text('- JAVIER SIERRA CARRILLO', 50, pageHeight - 40);
    doc.text('- ALEJANDRO GUERRERO HERNÁNDEZ', 50, pageHeight - 20);
    const logoFooter = '/NEXT.jpg';
    doc.addImage(logoFooter, 'JPG', pageWidth - 100, pageHeight - 110, 80, 100.5);
    doc
    // Save the PDF
    doc.save('Reporte.pdf');
};

export default generatePDF;
