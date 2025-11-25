import { useState, Suspense, lazy } from "react";

// 1. Componentes
import Sidebar from "./components/Sidebar"; 
import FloatingChat from "./components/FloatingChat";

// 2. Páginas
import Home from "./pages/Home"; 

// 3. Estilos
import "./styles/App.css"; //

// ⚡ LAZY LOADING
const Payroll = lazy(() => import("./pages/Payroll")); 
const Reports = lazy(() => import("./pages/Reports")); 
const Attendance = lazy(() => import("./pages/Attendance")); 

const Loading = () => (
  <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>
    Cargando módulo...
  </div>
);

export default function App() {
  const [current, setCurrent] = useState("home");

  return (
    <div className="app-layout">
      {/* Barra Lateral */}
      <Sidebar current={current} setCurrent={setCurrent} />

      {/* Contenido Principal */}
      <main className="main-content">
        {/* Pasamos setCurrent a Home para que los botones de acceso rápido funcionen */}
        {current === "home" && <Home setCurrent={setCurrent} />}
        
        <Suspense fallback={<Loading />}>
          {current === "payroll" && <Payroll />}
          {current === "reports" && <Reports />}
          {/* Nueva ruta de asistencias */}
          {current === "attendance" && <Attendance />}
        </Suspense>
      </main>

      {/* Naranjita Flotante */}
      <FloatingChat />
    </div>
  );
}