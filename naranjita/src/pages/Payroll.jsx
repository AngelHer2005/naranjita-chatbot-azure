import { useState } from "react";
import { Plus, Edit, Trash } from "../components/Icons"; // ✅ Iconos importados
import "../styles/App.css";

export default function Payroll() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Juan Pérez", role: "Desarrollador Sr", salary: 3500, days: 30 },
    { id: 2, name: "Maria Garcia", role: "Contadora", salary: 2800, days: 30 },
    { id: 3, name: "Carlos Lopez", role: "Soporte TI", salary: 1800, days: 28 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", salary: "", days: 30 });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ name: "", role: "", salary: "", days: 30 });
    setShowModal(true);
  };

  const handleOpenEdit = (emp) => {
    setEditingId(emp.id);
    setFormData({ name: emp.name, role: emp.role, salary: emp.salary, days: emp.days });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Confirma eliminar este registro?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.role || !formData.salary) return alert("Complete los campos obligatorios");
    
    const newEmp = { ...formData, salary: Number(formData.salary), days: Number(formData.days) };

    if (editingId) {
      setEmployees(employees.map(emp => emp.id === editingId ? { ...emp, id: editingId, ...newEmp } : emp));
    } else {
      setEmployees([...employees, { id: Date.now(), ...newEmp }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      {/* ✅ Header limpio usando clases de App.css */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestión de Planillas</h1>
          <p className="page-subtitle">Registro y cálculo automático compatible PLAME</p>
        </div>
        <button className="btn-primary" onClick={handleOpenCreate}>
          <Plus /> Nuevo Colaborador
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ border: 'none' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Colaborador</th>
                <th>Cargo</th>
                <th>Sueldo Base</th>
                <th>Días</th>
                <th>AFP (10%)</th>
                <th>Neto Pagar</th>
                <th>Estado</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td style={{ fontWeight: 600 }}>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>S/ {emp.salary.toFixed(2)}</td>
                  <td>{emp.days}</td>
                  <td style={{ color: '#EF4444' }}>- S/ {(emp.salary * 0.1).toFixed(2)}</td>
                  <td style={{ color: '#10B981', fontWeight: 'bold' }}>S/ {(emp.salary * 0.9).toFixed(2)}</td>
                  <td><span className="status-badge status-active">ACTIVO</span></td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="btn-action btn-edit" onClick={() => handleOpenEdit(emp)}><Edit /></button>
                    <button className="btn-action btn-delete" onClick={() => handleDelete(emp.id)}><Trash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>{editingId ? 'Editar Colaborador' : 'Registrar Colaborador'}</h3>
            <input className="form-input" placeholder="Nombre Completo" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input className="form-input" style={{ marginTop: '10px' }} placeholder="Cargo / Puesto" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <input className="form-input" type="number" placeholder="Sueldo Base" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
              <input className="form-input" type="number" placeholder="Días Lab." value={formData.days} onChange={e => setFormData({...formData, days: e.target.value})} />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={handleSave}>Guardar Registro</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}