import { useRef } from "react";
import "../styles/App.css";

// Librerías para PDF
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Librerías para Gráficos
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Registrar componentes de gráficos
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function Reports() {
  const printRef = useRef(); // Referencia al área que vamos a imprimir

  // Datos para gráfico de Pastel (Distribución de Costos)
  const pieData = {
    labels: ['Sueldo Neto', 'AFP/ONP', 'EsSalud (9%)'],
    datasets: [{
      data: [75, 13, 9],
      backgroundColor: ['#10B981', '#F59E0B', '#3B82F6'],
      borderWidth: 0,
    }],
  };

  // Datos para gráfico de Barras (Ahorro de Tiempo)
  const barData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
    datasets: [
      {
        label: 'Gestión Manual (Horas)',
        data: [12, 14, 11, 13],
        backgroundColor: '#94A3B8',
      },
      {
        label: 'Con Patrisoft ERP (Horas)',
        data: [2, 1.5, 2, 1.8],
        backgroundColor: '#0EA5E9',
      },
    ],
  };

  // Función Generar PDF
  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Reporte_Patrisoft_ERP.pdf');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reportes y Analisis</h1>
          <p className="page-subtitle">Análisis de rendimiento y costos laborales</p>
        </div>
        <button className="btn-primary" onClick={handleDownloadPDF}>
          📥 Descargar PDF
        </button>
      </div>

      {/* ÁREA IMPRIMIBLE */}
      <div ref={printRef} style={{ background: '#F8FAFC', padding: '10px' }}>
        
        {/* KPI CARDS */}
        <div className="grid-3" style={{ marginBottom: '24px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#64748B' }}>Total Pagado (Año)</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0F172A' }}>S/ 142,500</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#64748B' }}>Ahorro Generado</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10B981' }}>+ 22%</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#64748B' }}>Errores Detectados</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#EF4444' }}>0</div>
          </div>
        </div>

        <div className="grid-2">
          {/* Gráfico 1: Distribución */}
          <div className="card">
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Distribución de Costos</h3>
            <div style={{ height: '250px', display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={pieData} />
            </div>
          </div>

          {/* Gráfico 2: Comparativa */}
          <div className="card">
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Optimización de Tiempo</h3>
            <div style={{ height: '250px' }}>
              <Bar data={barData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Tabla Resumen */}
        <div className="card" style={{ marginTop: '24px' }}>
          <h3>Resumen Ejecutivo</h3>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6' }}>
            La implementación del ERP ha permitido una reducción del 85% en el tiempo dedicado al cálculo de planillas,
            eliminando completamente los errores humanos en la declaración del PLAME. La satisfacción del personal administrativo
            ha mejorado notablemente debido a la automatización de tareas repetitivas.
          </p>
        </div>
      </div>
    </div>
  );
}