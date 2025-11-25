import { useState } from "react";
import "../styles/App.css";

export default function Attendance() {
  const [registros, setRegistros] = useState([
    { id: 1, nombre: "Juan Pérez", area: "Desarrollo", entrada: "07:55 AM", estado: "Puntual" },
    { id: 2, nombre: "Maria Garcia", area: "Contabilidad", entrada: "08:15 AM", estado: "Tardanza" },
    { id: 3, nombre: "Carlos Lopez", area: "Soporte TI", entrada: "--:--", estado: "Pendiente" },
    { id: 4, nombre: "Ana Torres", area: "RR.HH.", entrada: "--:--", estado: "Pendiente" },
  ]);

  const marcarAsistencia = (id) => {
    const ahora = new Date();
    const horaStr = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Regla simple: Si es después de las 8:05 AM es tardanza
    const esTarde = ahora.getHours() > 8 || (ahora.getHours() === 8 && ahora.getMinutes() > 5);
    const nuevoEstado = esTarde ? "Tardanza" : "Puntual";

    setRegistros(registros.map(reg => 
      reg.id === id ? { ...reg, entrada: horaStr, estado: nuevoEstado } : reg
    ));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Control de Asistencias</h1>
          <p className="page-subtitle">Registro diario de personal - {new Date().toLocaleDateString()}</p>
        </div>
        <div className="card" style={{ padding: '10px 20px', background: '#DCFCE7', border: '1px solid #86EFAC', color: '#166534' }}>
          🕒 Hora Servidor: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>Área</th>
              <th>Hora Ingreso</th>
              <th>Estado</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((reg) => (
              <tr key={reg.id}>
                <td style={{ fontWeight: 600 }}>{reg.nombre}</td>
                <td style={{ color: 'var(--text-light)' }}>{reg.area}</td>
                <td style={{ fontWeight: 'bold' }}>{reg.entrada}</td>
                <td>
                  <span className={`status-badge`} style={{
                    background: reg.estado === 'Puntual' ? '#DCFCE7' : 
                                reg.estado === 'Tardanza' ? '#FEF3C7' : '#F1F5F9',
                    color: reg.estado === 'Puntual' ? '#166534' : 
                           reg.estado === 'Tardanza' ? '#D97706' : '#64748B'
                  }}>
                    {reg.estado.toUpperCase()}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {reg.estado === "Pendiente" ? (
                    <button 
                      className="btn-primary" 
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      onClick={() => marcarAsistencia(reg.id)}
                    >
                      Marcar Ingreso
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Registrado ✅</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}