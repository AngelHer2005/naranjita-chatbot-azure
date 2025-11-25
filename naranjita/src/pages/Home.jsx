import { useState } from "react";
import "../styles/App.css"; //
import { Users, Dollar, Alert, File, Download, Settings } from "../components/Icons"; //

// Recibimos 'setCurrent' para poder navegar desde los botones de acceso rápido
export default function Home({ setCurrent }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // --- 1. GENERAR BOLETAS (Simulación) ---
  const handleGenerarBoletas = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("✅ ¡Boletas generadas correctamente! Se han enviado a los correos corporativos.");
    }, 2000);
  };

  // --- 2. EXPORTAR PLAME (Estructura Real .rem SUNAT) ---
  const handleExportPLAME = () => {
    const rucEmpresa = "20100200300";
    const periodo = "06012025"; // Periodo Tributario (Enero 2025)

    // Datos simulados de la BD
    const empleados = [
      { dni: "45897123", sueldo: 3500, asigFam: 102.50 },
      { dni: "10293847", sueldo: 2800, asigFam: 0 },
      { dni: "74839201", sueldo: 1800, asigFam: 102.50 },
    ];

    let contenido = "";
    
    empleados.forEach(emp => {
      // Estructura: TipoDoc|DNI|Concepto|MontoDevengado|MontoPagado|
      // Concepto 0121: Remuneración Básica
      contenido += `01|${emp.dni}|0121|${emp.sueldo.toFixed(2)}|${emp.sueldo.toFixed(2)}|\n`;
      
      // Concepto 0201: Asignación Familiar (si corresponde)
      if (emp.asigFam > 0) {
        contenido += `01|${emp.dni}|0201|${emp.asigFam.toFixed(2)}|${emp.asigFam.toFixed(2)}|\n`;
      }

      // Concepto 0804: ESSALUD (9% Aporte Empleador)
      const essalud = ((emp.sueldo + emp.asigFam) * 0.09).toFixed(2);
      contenido += `01|${emp.dni}|0804|${essalud}|${essalud}|\n`;
    });

    const blob = new Blob([contenido], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    // Nombre formato SUNAT: 0601 + AAAA + MM + RUC + .rem
    a.download = `06012025${rucEmpresa}.rem`; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard General</h1>
          <p className="page-subtitle">Resumen de actividad - Computer Patrisoft S.A.C.</p>
        </div>
      </div>

      {/* KPI WIDGETS */}
      <div className="grid-3" style={{ marginBottom: '30px' }}>
        <div className="card widget-card">
          <div className="widget-icon-wrapper widget-blue"><Users /></div>
          <div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Colaboradores</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>24</div>
          </div>
        </div>

        <div className="card widget-card">
          <div className="widget-icon-wrapper widget-green"><Dollar /></div>
          <div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Planilla Mensual</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>S/ 45,200</div>
          </div>
        </div>

        <div className="card widget-card">
          <div className="widget-icon-wrapper widget-orange"><Alert /></div>
          <div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Pendientes</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>3</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* ACCESOS RÁPIDOS FUNCIONALES */}
        <div className="card">
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', marginBottom: '20px' }}>Accesos Rápidos</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            
            <button 
              className="btn-secondary flex-center" 
              onClick={handleGenerarBoletas}
              disabled={isProcessing}
              style={{ justifyContent: 'center', opacity: isProcessing ? 0.6 : 1 }}
            >
              <File /> {isProcessing ? "Procesando..." : "Generar Boletas"}
            </button>

            <button 
              className="btn-secondary flex-center" 
              onClick={handleExportPLAME}
              style={{ justifyContent: 'center' }}
            >
              <Download /> Exportar PLAME
            </button>

            {/* Este botón ahora navega usando setCurrent */}
            <button 
              className="btn-secondary flex-center" 
              onClick={() => setCurrent('attendance')}
              style={{ justifyContent: 'center' }}
            >
              <Users /> Asistencias
            </button>

            <button 
              className="btn-secondary flex-center" 
              onClick={() => setShowConfigModal(true)}
              style={{ justifyContent: 'center' }}
            >
              <Settings /> Configuración
            </button>
          </div>
        </div>

        {/* ESTADO DEL SISTEMA */}
        <div className="card">
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', marginBottom: '20px' }}>Estado del Sistema</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '15px', paddingBottom: '15px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', marginTop: '6px' }}></div>
              <div>
                <strong style={{ fontSize: '0.95rem' }}>Sistema Operativo</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>Todos los servicios funcionan correctamente.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', marginTop: '6px' }}></div>
              <div>
                <strong style={{ fontSize: '0.95rem' }}>Mantenimiento Próximo</strong>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-light)' }}>30 de Nov, 23:00 hrs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CONFIGURACIÓN */}
      {showConfigModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <h3 style={{ marginTop: 0 }}>Configuración Rápida</h3>
            <div className="form-group">
              <label className="form-label">Periodo Activo</label>
              <select className="form-input">
                <option>Noviembre 2025</option>
                <option>Diciembre 2025</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Régimen Laboral</label>
              <select className="form-input">
                <option>General (D.L. 728)</option>
                <option>MYPE Tributario</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowConfigModal(false)}>Cerrar</button>
              <button className="btn-primary" onClick={() => setShowConfigModal(false)}>Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}