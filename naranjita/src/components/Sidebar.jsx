import "../styles/App.css"; //
import logo from "../assets/patrisoft.png"; 
// Importamos 'File' para usarlo como icono de Asistencias por ahora
import { HomeIcon, Users, Chart, File } from "./Icons"; //

export default function Sidebar({ current, setCurrent }) {
  const menuItems = [
    { id: "home", label: "Inicio", icon: <HomeIcon /> },
    { id: "payroll", label: "Gestión de Planillas", icon: <Users /> },
    { id: "attendance", label: "Control Asistencias", icon: <File /> }, // Nuevo
    { id: "reports", label: "Reportes & KPIs", icon: <Chart /> },
  ];

  return (
    <aside className="sidebar">
      {/* HEADER CON LOGO GRANDE Y CENTRADO */}
      <div className="brand-header" style={{ 
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingBottom: '2rem',
        marginBottom: '1rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <img 
          src={logo} 
          alt="Logo Patrisoft" 
          style={{ 
            width: '120px',     // Tamaño solicitado
            height: 'auto',
            borderRadius: '16px',
            marginBottom: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)' // Sombra elegante
          }} 
        />
        <div className="brand-text" style={{ textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '1px' }}>PATRISOFT</h2>
          <span style={{ fontSize: '0.8rem', opacity: 0.7, fontWeight: 300 }}>ERP System v2.0</span>
        </div>
      </div>
      
      <nav style={{ flex: 1 }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748B', marginBottom: '12px', fontWeight: 'bold', paddingLeft: '10px' }}>Menú Principal</div>
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setCurrent(item.id)}
            className={`nav-item ${current === item.id ? "active" : ""}`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>

      <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: 'auto' }}>
        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Usuario: Admin</div>
        <div style={{ fontSize: '0.7rem', color: '#10B981' }}>● En línea</div>
      </div>
    </aside>
  );
}