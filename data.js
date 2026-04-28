// ===== MOCK DATA =====

const CLIENTES = [
    { id: 1, nombre: "María García", email: "maria@email.com", telefono: "3001234567", ciudad: "Medellín" }
  ];
  
  const MASCOTAS = [
    { id: 1, nombre: "Luna", raza: "Golden Retriever", edad: 4, peso: 12.5, sexo: "Hembra", cliente_id: 1 }
  ];
  
  const SERVICIOS = [
    // Salud
    { id: 1, nombre: "Consulta General", categoria: "salud", precio: 65000, descripcion: "Revisión completa del estado de salud de tu mascota.", icono: "🩺", duracion: "45 min" },
    { id: 2, nombre: "Vacuna Antirrábica", categoria: "salud", precio: 45000, descripcion: "Vacunación preventiva obligatoria anual.", icono: "💉", duracion: "20 min" },
    { id: 3, nombre: "Vacuna Quíntuple", categoria: "salud", precio: 80000, descripcion: "Protección contra 5 enfermedades graves.", icono: "💉", duracion: "20 min" },
    { id: 4, nombre: "Laboratorio Clínico", categoria: "salud", precio: 120000, descripcion: "Hemograma, química sanguínea y uroanálisis.", icono: "🔬", duracion: "60 min" },
    { id: 5, nombre: "Radiografía", categoria: "salud", precio: 95000, descripcion: "Diagnóstico por imagen digital de alta resolución.", icono: "🩻", duracion: "30 min" },
    { id: 6, nombre: "Cirugía Menor", categoria: "salud", precio: 280000, descripcion: "Procedimientos quirúrgicos de baja complejidad.", icono: "🏥", duracion: "2 horas" },
    // Estética
    { id: 7, nombre: "Baño y Secado", categoria: "estetica", precio: 55000, descripcion: "Baño con shampoo premium y secado profesional.", icono: "🛁", duracion: "90 min" },
    { id: 8, nombre: "Corte y Estilismo", categoria: "estetica", precio: 75000, descripcion: "Corte especializado según la raza y tu preferencia.", icono: "✂️", duracion: "120 min" },
    { id: 9, nombre: "Spa Canino", categoria: "estetica", precio: 130000, descripcion: "Tratamiento completo: baño, corte, masaje y aromaterapia.", icono: "💆", duracion: "3 horas" },
    // Nutrición
    { id: 10, nombre: "Asesoría Nutricional", categoria: "nutricion", precio: 50000, descripcion: "Plan alimenticio personalizado según la raza y edad.", icono: "🥗", duracion: "45 min" },
    { id: 11, nombre: "Dieta Terapéutica", categoria: "nutricion", precio: 85000, descripcion: "Plan nutricional para mascotas con condiciones médicas.", icono: "🍽️", duracion: "60 min" },
    // Guardería
    { id: 12, nombre: "Guardería Diurna", categoria: "guarderia", precio: 45000, descripcion: "Cuidado profesional de 8am a 6pm con jardín y juegos.", icono: "☀️", duracion: "10 horas" },
    { id: 13, nombre: "Guardería Nocturna", categoria: "guarderia", precio: 60000, descripcion: "Hospedaje nocturno con cuidador 24h y cámaras en vivo.", icono: "🌙", duracion: "12 horas" },
    // Funerarios
    { id: 14, nombre: "Cremación Individual", categoria: "funerarios", precio: 320000, descripcion: "Proceso digno con entrega de cenizas en urna.", icono: "🌿", duracion: "—" },
    { id: 15, nombre: "Jardín de Mascotas", categoria: "funerarios", precio: 450000, descripcion: "Espacio natural para descanso eterno con placa.", icono: "🌸", duracion: "—" }
  ];
  
  const HISTORIAL_MEDICO = [
    {
      id: 1, fecha: "2024-03-15", tipo: "consulta",
      titulo: "Consulta General", medico: "Dr. Carlos Ruiz",
      clinica: "VetSalud", diagnostico: "Estado general excelente. Leve otitis externa OD.",
      tags: ["Otitis", "Rutina"], adjuntos: ["Resultados Lab", "Radiografía"]
    },
    {
      id: 2, fecha: "2024-02-10", tipo: "vacuna",
      titulo: "Vacuna Quíntuple", medico: "Dra. Ana Martínez",
      clinica: "PetClinic", diagnostico: "DA2PPC refuerzo anual aplicado. Sin reacciones adversas.",
      tags: ["Vacunación", "Preventivo"], adjuntos: []
    },
    {
      id: 3, fecha: "2024-01-05", tipo: "consulta",
      titulo: "Tratamiento Antiparasitario", medico: "Dr. Carlos Ruiz",
      clinica: "VetSalud", diagnostico: "Nexgard + Milbemax. Desparasitación completa interna y externa.",
      tags: ["Tratamiento", "Preventivo"], adjuntos: []
    },
    {
      id: 4, fecha: "2023-11-20", tipo: "laboratorio",
      titulo: "Perfil Bioquímico Completo", medico: "Dra. Ana Martínez",
      clinica: "PetClinic", diagnostico: "Resultados dentro de rangos normales. Leve elevación de ALT. Seguimiento en 3 meses.",
      tags: ["Laboratorio", "Seguimiento"], adjuntos: ["Resultados Lab"]
    },
    {
      id: 5, fecha: "2023-08-14", tipo: "cirugia",
      titulo: "Castración", medico: "Dr. Luis Moreno",
      clinica: "VetSalud", diagnostico: "Procedimiento exitoso. Recuperación sin complicaciones. Alta al día siguiente.",
      tags: ["Cirugía", "Exitoso"], adjuntos: ["Informe Quirúrgico"]
    }
  ];
  
  const CITAS = [
    { id: 1, fecha: "2025-04-29", hora: "10:00 AM", servicio: "Consulta veterinaria", medico: "Dr. Carlos Ruiz", clinica: "VetSalud", estado: "agendada" },
    { id: 2, fecha: "2025-05-05", hora: "3:00 PM", servicio: "Baño y corte", medico: "Est. Julia Torres", clinica: "Pet Glam", estado: "agendada" },
    { id: 3, fecha: "2025-04-10", hora: "11:00 AM", servicio: "Vacuna antirrábica", medico: "Dra. Ana Martínez", clinica: "PetClinic", estado: "finalizada" }
  ];
  
  const IVA = 0.19;
  
  // ===== STATE =====
  let cart = [];
  let currentModule = 'dashboard';
  let selectedDate = null;
  let selectedTime = null;
  let calYear = 2025;
  let calMonth = 4; // April (0-indexed: 3)