// src/components/OrangeAssistant.jsx

// Importa tus imágenes aquí (Asegúrate que los nombres sean correctos)
// Si tus archivos son .jpg o .gif, mantén esas extensiones
import idleImage from "../assets/naranjita.png"; 
import talkingGif from "../assets/naranjita2.gif";

export default function OrangeAssistant({ isSpeaking }) {
  return (
    <img
      // Muestra el GIF si isSpeaking es true, sino, la imagen estática
      src={isSpeaking ? talkingGif : idleImage}
      alt="Asistente Naranjita"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain', // Asegura que se vea completa sin cortar
        display: 'block',      // Evita espacios fantasmas de los navegadores
        transition: 'transform 0.2s ease',
      }}
    />
  );
}