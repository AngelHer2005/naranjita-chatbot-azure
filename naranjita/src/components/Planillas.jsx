import { useState } from "react";
import "../styles/App.css";

export default function Planillas() {
  // Datos simulados basados en la estructura requerida por la tesis
  const [employees] = useState([
    { id: 1, name: "Juan Pérez", cargo: "Desarrollador Junior", sueldo: 2500, bonos: 200, neto: 2350, estado: "Procesado" },
    { id: 2, name: "Maria Gómez", cargo: "Analista Contable", sueldo: 3200, bonos: 0, neto: 2816, estado: "Procesado" },
    { id: 3, name: "Carlos Ruiz", cargo: "Soporte Técnico", sueldo: 1800, bonos: 150, neto: 1720, estado: "Pendiente" },
  ]);

  return (
    <div>
      <h2 className="section-title">Gestión de Planillas</h2>
      <p style={{ color: '#666', marginBottom: 20 }}>
        Sistema automatizado para cálculo de remuneraciones y generación de PLAME/T-Registro.
      </p>

      {/* Panel de Control */}
      <div className="glass-card" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <button style={{ 
          background: 'var(--primary-dark)', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer' 
        }}>
          + Nuevo Trabajador
        </button>
        <button style={{ 
          background: 'var(--accent)', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer' 
        }}>
          📊 Generar PLAME
        </button>
        <button style={{ 
          background: 'white', color: '#333', border: '1px solid #ccc', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer' 
        }}>
          📥 Exportar T-Registro
        </button>
      </div>

      {/* Tabla de Empleados */}
      <div className="glass-card">
        <h3>Nómina Actual - Periodo 2025-11</h3>
        <table className="table-container">
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>Cargo</th>
              <th>Sueldo Base</th>
              <th>Bonificaciones</th>
              <th>Neto a Pagar</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td><b>{emp.name}</b></td>
                <td>{emp.cargo}</td>
                <td>S/ {emp.sueldo.toFixed(2)}</td>
                <td>S/ {emp.bonos.toFixed(2)}</td>
                <td style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>S/ {emp.neto.toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${emp.estado === 'Procesado' ? 'status-ok' : 'status-pending'}`}>
                    {emp.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}