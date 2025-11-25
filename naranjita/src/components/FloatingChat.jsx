import { useState, useRef, useEffect } from "react";
import OrangeAssistant from "./OrangeAssistant";
import "../styles/App.css";

export default function FloatingChat({ tableData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  
  const [messages, setMessages] = useState([
    { 
      from: "bot", 
      text: "¡Hola! Soy Naranjita 🍊. Conozco toda la información de Computer Patrisoft y los detalles técnicos de tu proyecto de tesis. ¿En qué puedo ayudarte?" 
    }
  ]);

  const [input, setInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const prevDataRef = useRef(tableData);
  const chatEndRef = useRef(null);
  const intervalRef = useRef(null);

  // --- ☁️ CONFIGURACIÓN AZURE ---
  const AZURE_RESOURCE_NAME = "naranjita-gpt"; 
  const AZURE_DEPLOYMENT_ID = "naranjita-chat"; 
  const API_VERSION = "2024-04-01-preview"; 
  const AZURE_API_KEY = "93ou1OJa4pdQ7VeXrOhIX9Q4KSL0zsujI9izEdfajDdFFHVvz1BWJQQJ99BKACHYHv6XJ3w3AAABACOGKQhp"; // ⚠️ PEGA TU CLAVE


  // --- 🧠 CEREBRO DE NARANJITA (WEB + TESIS) ---
  const SYSTEM_CONTEXT = `
    ACTÚA COMO: "Naranjita", el asistente IA oficial de Computer Patrisoft S.A.C. y experta en el Proyecto de Tesis de Patricio Arroyo.
    
    === FUENTE 1: DATOS DE LA EMPRESA (WEB) ===
    - Empresa: Computer Patrisoft S.A.C. (RUC: 20510843810).
    - Lema: "Innovamos hoy para transformar el futuro de tu empresa".
    - Ubicación: Urb. Mirador Mz A Lote 25 - Los Olivos, Lima.
    - Servicios: Desarrollo de Software, Inteligencia Artificial, Cloud & Infraestructura.
    - Misión: Democratizar tecnología transformando datos en decisiones.
    - Visión: Ser referente peruano en innovación y adopción de IA.
    - Valores: Transparencia, Innovación, Excelencia, Confianza.
    - Contacto: contacto@computerpatrisoft.pe | +51 1 000 0000.

    === FUENTE 2: DATOS DEL PROYECTO (TESIS) ===
    - Título: Desarrollo de una Aplicación Web para Optimizar la Gestión de Planilla.
    - Problema: Antes se usaba Excel manual, causando errores de cálculo, duplicidad y retrasos en pagos y PLAME.
    - Solución Técnica: Aplicación Web usando Python (Django Framework), Base de Datos MySQL y Arquitectura Cloud.
    - Beneficios Económicos: Ahorro anual estimado de S/ 648.00. Relación Beneficio/Costo de 1.30 (Por cada sol invertido, se recupera 1.30).
    - Beneficios Operativos: Reducción de tiempo en reportes SUNAT (PLAME/T-Registro), generación automática de boletas PDF y acceso remoto 24/7.
    - Autor del Proyecto: Patricio Arroyo Angel Hernan Alberto (Carrera de Ingeniería de Software con IA - SENATI).

    === INSTRUCCIONES DE COMPORTAMIENTO ===
    1. Si te preguntan "¿Quién eres?", di que eres el asistente inteligente del proyecto de tesis de Patricio Arroyo para Computer Patrisoft.
    2. Responde preguntas técnicas sobre Django/Python basándote en que es la tecnología del proyecto.
    3. Si te preguntan sobre la web, cita los servicios y la misión.
    4. Usa siempre el emoji 🍊 al final.
    5. Sé breve y profesional.
  `;

  // --- 👁️ MONITOR DE CAMBIOS EN LA TABLA ---
  useEffect(() => {
    // Detectar cambios profundos en la data
    if (JSON.stringify(tableData) !== JSON.stringify(prevDataRef.current)) {
      const alertMsg = "🔔 🍊 ¡Alerta! He detectado cambios en los registros de la tabla (Base de Datos actualizada).";
      setMessages(prev => [...prev, { from: "bot", text: alertMsg }]);
      if (!isOpen) setHasNewNotification(true);
      prevDataRef.current = tableData;
    }
  }, [tableData, isOpen]);

  // Scroll automático
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (isOpen) setHasNewNotification(false);
  }, [messages, isOpen]);

  // Limpiar intervalo al desmontar
  useEffect(() => { return () => clearInterval(intervalRef.current); }, []);

  // --- EFECTO DE ESCRITURA ---
  const typeWriter = (text) => {
    setIsSpeaking(true);
    let index = 0;
    setMessages((prev) => [...prev, { from: "bot", text: "" }]);
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setMessages((prev) => {
        const updated = [...prev];
        const lastMsg = updated[updated.length - 1];
        lastMsg.text = text.substring(0, index + 1);
        return updated;
      });
      index++;
      if (index >= text.length) {
        clearInterval(intervalRef.current);
        setIsSpeaking(false);
      }
    }, 15); // Un poco más rápido
  };

  // --- LLAMADA A AZURE ---
  const getAIResponse = async (userMessage) => {
    try {
      setIsSpeaking(false);
      const url = `https://${AZURE_RESOURCE_NAME}.openai.azure.com/openai/deployments/${AZURE_DEPLOYMENT_ID}/chat/completions?api-version=${API_VERSION}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": AZURE_API_KEY },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_CONTEXT }, // <--- AQUÍ VA TODO EL CONOCIMIENTO
            { role: "user", content: userMessage }
          ],
          temperature: 0.5, // Más preciso, menos creativo (mejor para datos de empresa)
          max_tokens: 400,
        })
      });

      if (!response.ok) throw new Error("Error de conexión con Azure");
      const data = await response.json();
      typeWriter(data.choices[0].message.content);

    } catch (error) {
      typeWriter("⚠️ Lo siento, no puedo consultar mi base de conocimientos ahora. Revisa tu conexión. 🍊");
    }
  };

  const handleSend = () => {
    if (!input.trim() || isSpeaking) return;
    setMessages(prev => [...prev, { from: "user", text: input }]);
    const msg = input;
    setInput("");
    setTimeout(() => getAIResponse(msg), 500);
  };

  return (
    <div className="floating-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div style={{display:'flex', flexDirection:'column'}}>
              <span style={{ fontWeight: "700", fontSize:'0.95rem' }}>Naranjita IA 🍊</span>
              <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>Powered by Azure OpenAI</span>
            </div>
            <button onClick={() => setIsOpen(false)} style={{background:"none", border:"none", color:"white", cursor:"pointer", fontSize:'1.2rem'}}>✕</button>
          </div>

          <div className="chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.from}`}>{m.text}</div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-area">
            <input 
              className="chat-input" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Pregunta sobre la tesis o la empresa..."
              disabled={isSpeaking}
            />
            <button className="btn-primary" onClick={handleSend} disabled={isSpeaking}>➤</button>
          </div>
        </div>
      )}

      <button className="naranjita-btn" onClick={() => setIsOpen(!isOpen)} style={{position: 'relative'}}>
        <OrangeAssistant isSpeaking={isSpeaking} />
        {hasNewNotification && (
          <span style={{
            position: 'absolute', top: '0', right: '0', width: '16px', height: '16px',
            backgroundColor: '#FF3B30', borderRadius: '50%', border: '2px solid white', zIndex: 1001
          }}></span>
        )}
      </button>
    </div>
  );
}