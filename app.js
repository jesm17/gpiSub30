// ===== NAVIGATION =====
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'app') setModule(currentModule || 'dashboard');
  }
  
  function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
  }
  
  function scrollServices() {
    document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' });
  }
  
  function setModule(mod) {
    currentModule = mod;
    // Update sidebar active
    document.querySelectorAll('.snav').forEach(n => n.classList.remove('active'));
    const map = { dashboard:'Inicio',health:'Salud',beauty:'Estética',nutrition:'Nutrición',daycare:'Guardería',funeral:'Funerarios',catalog:'Catálogo',schedule:'Agenda',checkout:'Facturación' };
    document.getElementById('module-title').textContent = map[mod] || mod;
    document.querySelectorAll('.snav').forEach(n => {
      if (n.getAttribute('onclick')?.includes(mod)) n.classList.add('active');
    });
    const el = document.getElementById('module-content');
    el.innerHTML = '';
    switch(mod) {
      case 'dashboard': el.innerHTML = renderDashboard(); break;
      case 'health': el.innerHTML = renderHealth(); break;
      case 'beauty': el.innerHTML = renderCatalog('estetica','Estética','✂️','Baño, corte y tratamientos de spa para mantener a tu mascota impecable.'); break;
      case 'nutrition': el.innerHTML = renderCatalog('nutricion','Nutrición','🥗','Planes alimenticios y asesoría nutricional especializada.'); break;
      case 'daycare': el.innerHTML = renderCatalog('guarderia','Guardería','🏡','Cuidado diurno y nocturno con todas las comodidades.'); break;
      case 'funeral': el.innerHTML = renderCatalog('funerarios','Servicios Funerarios','🌿','Acompañamiento digno y respetuoso en el último momento.'); break;
      case 'catalog': el.innerHTML = renderFullCatalog(); break;
      case 'schedule': el.innerHTML = renderSchedule(); break;
      case 'checkout': el.innerHTML = renderCheckout(); break;
    }
    // Close sidebar on mobile
    document.getElementById('sidebar').classList.remove('open');
  }
  
  // ===== DASHBOARD =====
  function renderDashboard() {
    const alerts = [
      { icon: '💉', title: 'Vacuna antirrábica', msg: 'Vence en 3 días' },
      { icon: '🦟', title: 'Desparasitación', msg: 'En 10 días' },
      { icon: '📋', title: 'Control anual', msg: 'En 30 días' }
    ];
    const upcoming = CITAS.filter(c => c.estado !== 'finalizada').slice(0,3);
    const statusLabel = { agendada: 'Agendada', 'en-curso': 'En curso', finalizada: 'Finalizada' };
    const statusClass = { agendada: 'status-agendada', 'en-curso': 'status-en-curso', finalizada: 'status-finalizada' };
  
    return `
    <div class="dash-greeting">
      <h2>¡Hola, María! 👋</h2>
      <p>¿Cómo está Luna hoy? Aquí tienes un resumen rápido.</p>
    </div>
  
    <div class="dash-grid">
      <div class="dash-stat-card">
        <div class="dsc-icon">🩺</div>
        <div class="dsc-num">12</div>
        <div class="dsc-label">Consultas realizadas</div>
      </div>
      <div class="dash-stat-card">
        <div class="dsc-icon">💉</div>
        <div class="dsc-num">8</div>
        <div class="dsc-label">Vacunas aplicadas</div>
      </div>
      <div class="dash-stat-card">
        <div class="dsc-icon">🗓️</div>
        <div class="dsc-num">${upcoming.length}</div>
        <div class="dsc-label">Citas próximas</div>
      </div>
      <div class="dash-stat-card">
        <div class="dsc-icon">⭐</div>
        <div class="dsc-num">4.9</div>
        <div class="dsc-label">Calificación clínica</div>
      </div>
    </div>
  
    <div style="margin-bottom:20px">
      <div class="card-title">Acceso rápido</div>
      <div class="module-shortcut-grid">
        <div class="module-shortcut" onclick="setModule('health')"><div class="ms-icon">🏥</div><div class="ms-label">Salud</div></div>
        <div class="module-shortcut" onclick="setModule('beauty')"><div class="ms-icon">✂️</div><div class="ms-label">Estética</div></div>
        <div class="module-shortcut" onclick="setModule('nutrition')"><div class="ms-icon">🥗</div><div class="ms-label">Nutrición</div></div>
        <div class="module-shortcut" onclick="setModule('daycare')"><div class="ms-icon">🏡</div><div class="ms-label">Guardería</div></div>
        <div class="module-shortcut" onclick="setModule('funeral')"><div class="ms-icon">🌿</div><div class="ms-label">Funerarios</div></div>
      </div>
    </div>
  
    <div class="dash-two-col">
      <div class="card">
        <div class="card-title">📅 Próximas citas</div>
        ${upcoming.map(c => {
          const d = new Date(c.fecha);
          const days = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
          const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
          return `<div class="appointment-item">
            <div class="appt-date"><strong>${d.getDate()}</strong><span>${months[d.getMonth()]}</span></div>
            <div class="appt-info"><strong>${c.servicio}</strong><p>${c.hora} · ${c.medico} · ${c.clinica}</p></div>
            <div>
              <span class="status-badge ${statusClass[c.estado]}">${statusLabel[c.estado]}</span><br>
              ${c.estado === 'agendada' ? `<button onclick="cambiarEstado(${c.id})" style="font-size:11px;margin-top:6px;background:var(--green-pale);color:var(--green-dark);border:none;padding:3px 8px;border-radius:6px;cursor:pointer">Iniciar</button>` : ''}
            </div>
          </div>`;
        }).join('')}
        <button class="btn-primary" style="margin-top:16px;font-size:13px;padding:10px 20px" onclick="setModule('schedule')">+ Agendar cita</button>
      </div>
      <div class="card">
        <div class="card-title">🔔 Alertas</div>
        ${alerts.map(a => `
          <div class="alert-item">
            <div class="alert-icon">${a.icon}</div>
            <div class="alert-info"><strong>${a.title}</strong><p>${a.msg}</p></div>
          </div>
        `).join('')}
      </div>
    </div>`;
  }
  
  function cambiarEstado(id) {
    const cita = CITAS.find(c => c.id === id);
    if (!cita) return;
    const estados = ['agendada','en-curso','finalizada'];
    const idx = estados.indexOf(cita.estado);
    cita.estado = estados[Math.min(idx+1, 2)];
    showToast(`✅ Cita "${cita.servicio}" → ${cita.estado.replace('-',' ')}`);
    setModule('dashboard');
  }
  
  // ===== HEALTH =====
  function renderHealth() {
    const tipos = ['todo','consulta','vacuna','cirugia','laboratorio'];
    const labels = { consulta:'Consulta', vacuna:'Vacuna', cirugia:'Cirugía', laboratorio:'Lab' };
    const typeClass = { consulta:'type-consulta', vacuna:'type-vacuna', cirugia:'type-cirugia', laboratorio:'type-laboratorio' };
    const filter = window._healthFilter || 'todo';
  
    const filtered = filter === 'todo' ? HISTORIAL_MEDICO : HISTORIAL_MEDICO.filter(h => h.tipo === filter);
  
    return `
    <div class="module-hero" data-emoji="🏥">
      <h2>Historial Médico</h2>
      <p>Registro cronológico completo de la salud de Luna.</p>
    </div>
    <div class="health-header">
      <div class="filter-tabs">
        ${tipos.map(t => `<button class="filter-tab ${filter===t?'active':''}" onclick="window._healthFilter='${t}';setModule('health')">${t==='todo'?'Todo':labels[t]||t}</button>`).join('')}
      </div>
      <div style="display:flex;gap:10px">
        <div style="background:white;border-radius:10px;padding:12px 16px;border:1px solid var(--border);font-size:13px;color:var(--mid)">🩺 <strong style="color:var(--dark)">${HISTORIAL_MEDICO.length}</strong> registros</div>
      </div>
    </div>
    <div class="timeline">
      ${filtered.map(h => {
        const d = new Date(h.fecha);
        const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
        return `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="tc-header">
              <span class="tc-date">${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}</span>
              <span class="tc-type ${typeClass[h.tipo]}">${labels[h.tipo]||h.tipo}</span>
            </div>
            <div class="tc-title">${h.titulo}</div>
            <div class="tc-desc">${h.diagnostico}</div>
            <div class="tc-doctor">👨‍⚕️ ${h.medico} · ${h.clinica}</div>
            <div class="tc-tags">
              ${h.tags.map(t=>`<span class="tc-tag">${t}</span>`).join('')}
              ${h.adjuntos.map(a=>`<span class="tc-tag" style="color:var(--blue);border-color:#BFDBFE">📎 ${a}</span>`).join('')}
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }
  
  // ===== CATALOG (generic for a category) =====
  function renderCatalog(cat, title, emoji, desc) {
    const items = SERVICIOS.filter(s => s.categoria === cat);
    return `
    <div class="module-hero" data-emoji="${emoji}">
      <h2>${title}</h2>
      <p>${desc}</p>
    </div>
    <div class="catalog-grid">
      ${items.map(s => catalogCard(s)).join('')}
    </div>`;
  }
  
  function renderFullCatalog() {
    const cats = [
      { key:'salud', label:'Salud 🏥' },
      { key:'estetica', label:'Estética ✂️' },
      { key:'nutricion', label:'Nutrición 🥗' },
      { key:'guarderia', label:'Guardería 🏡' },
      { key:'funerarios', label:'Funerarios 🌿' }
    ];
    const filter = window._catalogFilter || 'all';
    const items = filter === 'all' ? SERVICIOS : SERVICIOS.filter(s => s.categoria === filter);
  
    return `
    <div class="module-hero" data-emoji="🛒">
      <h2>Catálogo de Servicios</h2>
      <p>Todos nuestros servicios disponibles. Agrega al carrito y procede al pago.</p>
    </div>
    <div class="filter-tabs" style="margin-bottom:24px">
      <button class="filter-tab ${filter==='all'?'active':''}" onclick="window._catalogFilter='all';setModule('catalog')">Todos</button>
      ${cats.map(c=>`<button class="filter-tab ${filter===c.key?'active':''}" onclick="window._catalogFilter='${c.key}';setModule('catalog')">${c.label}</button>`).join('')}
    </div>
    <div class="catalog-grid">
      ${items.map(s => catalogCard(s)).join('')}
    </div>`;
  }
  
  function catalogCard(s) {
    const inCart = cart.find(c => c.id === s.id);
    const bgColors = { salud:'#E8F7F1', estetica:'#F3E8FF', nutricion:'#FEF9C3', guarderia:'#DBEAFE', funerarios:'#F1F5F9' };
    return `
    <div class="catalog-card">
      <div class="cc-img" style="background:${bgColors[s.categoria]||'#F9FAFB'}">${s.icono}</div>
      <div class="cc-body">
        <div class="cc-category">${s.categoria} · ${s.duracion}</div>
        <div class="cc-name">${s.nombre}</div>
        <div class="cc-desc">${s.descripcion}</div>
        <div class="cc-footer">
          <div class="cc-price">$${s.precio.toLocaleString('es-CO')}<span>/COP</span></div>
          <button class="btn-add ${inCart?'added':''}" onclick="toggleCart(${s.id})" id="btn-${s.id}">
            ${inCart ? '✓ Agregado' : '+ Agregar'}
          </button>
        </div>
      </div>
    </div>`;
  }
  
  function toggleCart(id) {
    const s = SERVICIOS.find(x => x.id === id);
    if (!s) return;
    const idx = cart.findIndex(c => c.id === id);
    if (idx > -1) {
      cart.splice(idx, 1);
      showToast(`🗑️ "${s.nombre}" eliminado del carrito`);
    } else {
      cart.push({ ...s });
      showToast(`✅ "${s.nombre}" agregado al carrito`);
    }
    updateCartBadge();
    // Refresh current catalog view
    const btn = document.getElementById(`btn-${id}`);
    if (btn) {
      const inCart = cart.find(c => c.id === id);
      btn.textContent = inCart ? '✓ Agregado' : '+ Agregar';
      btn.classList.toggle('added', !!inCart);
    }
  }
  
  function updateCartBadge() {
    document.getElementById('cart-count').textContent = cart.length;
  }
  
  // ===== SCHEDULE =====
  function renderSchedule() {
    const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const dayNames = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  
    // Build calendar
    const firstDay = new Date(calYear, calMonth - 1, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth, 0).getDate();
    const daysInPrev = new Date(calYear, calMonth - 1, 0).getDate();
    const today = new Date();
  
    const apptDays = CITAS.map(c => {
      const d = new Date(c.fecha);
      if (d.getFullYear() === calYear && d.getMonth()+1 === calMonth) return d.getDate();
      return null;
    }).filter(Boolean);
  
    let dayCells = '';
    // Prev month days
    for (let i = firstDay - 1; i >= 0; i--) {
      dayCells += `<div class="cal-day other-month">${daysInPrev - i}</div>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = today.getDate() === d && today.getMonth()+1 === calMonth && today.getFullYear() === calYear;
      const hasAppt = apptDays.includes(d);
      const selDate = selectedDate ? new Date(selectedDate) : null;
      const isSel = selDate && selDate.getDate() === d && selDate.getMonth()+1 === calMonth && selDate.getFullYear() === calYear;
      dayCells += `<div class="cal-day ${isToday?'today':''} ${hasAppt?'has-appt':''} ${isSel?'selected':''}" onclick="selectDate(${calYear},${calMonth},${d})">${d}</div>`;
    }
    // Next month fill
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    for (let d = 1; d <= totalCells - firstDay - daysInMonth; d++) {
      dayCells += `<div class="cal-day other-month">${d}</div>`;
    }
  
    const times = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
    const unavailable = ['11:00 AM','2:00 PM'];
  
    const citasMes = CITAS.filter(c => {
      const d = new Date(c.fecha);
      return d.getFullYear() === calYear && d.getMonth()+1 === calMonth;
    });
  
    const statusLabel = { agendada:'Agendada', 'en-curso':'En curso', finalizada:'Finalizada' };
    const statusClass = { agendada:'status-agendada', 'en-curso':'status-en-curso', finalizada:'status-finalizada' };
  
    return `
    <div class="module-hero" data-emoji="📅">
      <h2>Agenda de Citas</h2>
      <p>Gestiona todas las citas de Luna de manera fácil y rápida.</p>
    </div>
  
    <div style="display:grid;grid-template-columns:1fr 340px;gap:24px" class="schedule-layout">
      <div class="card">
        <div class="calendar-header">
          <button class="cal-nav-btn" onclick="changeMonth(-1)">‹</button>
          <span class="cal-month">${monthNames[calMonth-1]} ${calYear}</span>
          <button class="cal-nav-btn" onclick="changeMonth(1)">›</button>
        </div>
        <div class="calendar-grid">
          ${dayNames.map(d=>`<div class="cal-day-name">${d}</div>`).join('')}
          ${dayCells}
        </div>
  
        ${selectedDate ? `
        <div style="margin-top:24px">
          <div style="font-size:14px;font-weight:600;color:var(--dark);margin-bottom:12px">⏰ Selecciona una hora</div>
          <div class="time-slots">
            ${times.map(t => {
              const isUnavail = unavailable.includes(t);
              const isSel = selectedTime === t;
              return `<div class="time-slot ${isUnavail?'unavailable':''} ${isSel?'selected':''}" onclick="${isUnavail?'':'selectTime(\''+t+'\')'}">
                ${isUnavail ? '🔒 ' : ''}${t}
              </div>`;
            }).join('')}
          </div>
        </div>` : `<div style="text-align:center;padding:24px;color:var(--soft);font-size:14px">Selecciona un día para ver horarios disponibles</div>`}
  
        ${selectedDate && selectedTime ? `
        <div style="margin-top:20px;background:var(--green-pale);border-radius:var(--radius-sm);padding:18px">
          <div style="font-size:14px;font-weight:600;color:var(--dark);margin-bottom:14px">📋 Confirmar cita</div>
          <select style="width:100%;padding:10px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-size:14px;margin-bottom:10px;background:white">
            ${SERVICIOS.filter(s=>s.categoria!=='funerarios').map(s=>`<option>${s.nombre}</option>`).join('')}
          </select>
          <textarea placeholder="Notas adicionales..." style="width:100%;padding:10px;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-size:14px;resize:vertical;min-height:70px"></textarea>
          <button class="btn-primary" style="width:100%;margin-top:10px" onclick="confirmarCita()">✓ Confirmar cita</button>
        </div>` : ''}
      </div>
  
      <div>
        <div class="card">
          <div class="card-title">🗓️ Citas del mes</div>
          ${citasMes.length === 0 ? `<p style="color:var(--soft);font-size:14px">No hay citas este mes.</p>` : citasMes.map(c => {
            const d = new Date(c.fecha);
            const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
            return `<div class="appointment-item">
              <div class="appt-date"><strong>${d.getDate()}</strong><span>${months[d.getMonth()]}</span></div>
              <div class="appt-info">
                <strong>${c.servicio}</strong>
                <p>${c.hora} · ${c.medico}</p>
              </div>
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
                <span class="status-badge ${statusClass[c.estado]}">${statusLabel[c.estado]}</span>
                ${c.estado === 'agendada' ? `
                  <button onclick="cambiarEstadoCita(${c.id},'en-curso')" style="font-size:10px;background:#FEF3C7;color:#92400E;border:none;padding:2px 7px;border-radius:6px;cursor:pointer">En curso</button>
                  <button onclick="cancelarCita(${c.id})" style="font-size:10px;background:#FEE2E2;color:#991B1B;border:none;padding:2px 7px;border-radius:6px;cursor:pointer">Cancelar</button>
                ` : ''}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  }
  
  function changeMonth(delta) {
    calMonth += delta;
    if (calMonth > 12) { calMonth = 1; calYear++; }
    if (calMonth < 1) { calMonth = 12; calYear--; }
    setModule('schedule');
  }
  
  function selectDate(y, m, d) {
    selectedDate = `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    selectedTime = null;
    setModule('schedule');
  }
  
  function selectTime(t) {
    selectedTime = t;
    setModule('schedule');
  }
  
  function confirmarCita() {
    if (!selectedDate || !selectedTime) return;
    const d = new Date(selectedDate);
    const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    CITAS.push({
      id: Date.now(), fecha: selectedDate, hora: selectedTime,
      servicio: 'Consulta veterinaria', medico: 'Dr. Carlos Ruiz',
      clinica: 'VetSalud', estado: 'agendada'
    });
    selectedDate = null; selectedTime = null;
    showToast(`✅ Cita agendada para ${d.getDate()} ${months[d.getMonth()]}`);
    setModule('schedule');
  }
  
  function cambiarEstadoCita(id, estado) {
    const c = CITAS.find(x => x.id === id);
    if (c) { c.estado = estado; showToast(`✅ Estado actualizado`); setModule('schedule'); }
  }
  
  function cancelarCita(id) {
    const idx = CITAS.findIndex(x => x.id === id);
    if (idx > -1) { CITAS.splice(idx, 1); showToast(`🗑️ Cita cancelada`); setModule('schedule'); }
  }
  
  // ===== CHECKOUT =====
  function renderCheckout() {
    const subtotal = cart.reduce((s, c) => s + c.precio, 0);
    const iva = subtotal * IVA;
    const total = subtotal + iva;
  
    return `
    <div class="module-hero" data-emoji="💳">
      <h2>Facturación</h2>
      <p>Resumen de servicios seleccionados con IVA del 19% incluido.</p>
    </div>
  
    <div class="checkout-layout">
      <div class="card">
        <div class="card-title">🛒 Servicios seleccionados</div>
        ${cart.length === 0 ? `
          <div class="empty-cart">
            <div class="ec-icon">🛒</div>
            <h3>Carrito vacío</h3>
            <p>Agrega servicios desde el catálogo para continuar.</p>
            <button class="btn-primary" style="margin-top:16px" onclick="setModule('catalog')">Ver catálogo</button>
          </div>
        ` : `
          ${cart.map(s => `
            <div class="cart-item">
              <div class="ci-icon">${s.icono}</div>
              <div class="ci-info">
                <div class="ci-name">${s.nombre}</div>
                <div class="ci-cat">${s.categoria} · ${s.duracion}</div>
              </div>
              <div class="ci-price">$${s.precio.toLocaleString('es-CO')}</div>
              <button class="ci-remove" onclick="removeFromCart(${s.id})" title="Eliminar">✕</button>
            </div>
          `).join('')}
          <button onclick="setModule('catalog')" style="font-size:13px;color:var(--green);background:none;border:none;cursor:pointer;margin-top:8px">+ Agregar más servicios</button>
        `}
      </div>
  
      <div style="display:flex;flex-direction:column;gap:18px">
        <div class="card">
          <div class="card-title">📄 Resumen de factura</div>
          <div class="summary-row"><span>Subtotal</span><span>$${subtotal.toLocaleString('es-CO')}</span></div>
          <div class="summary-row iva"><span>IVA (19%)</span><span>+$${Math.round(iva).toLocaleString('es-CO')}</span></div>
          <div class="summary-row total"><span>Total</span><span>$${Math.round(total).toLocaleString('es-CO')}</span></div>
        </div>
  
        <div class="card">
          <div class="card-title">💳 Método de pago</div>
          <div class="payment-methods">
            <div class="pm active" onclick="selectPM(this)"><span class="pm-icon">💳</span>Tarjeta</div>
            <div class="pm" onclick="selectPM(this)"><span class="pm-icon">🏦</span>Transferencia</div>
            <div class="pm" onclick="selectPM(this)"><span class="pm-icon">💵</span>Efectivo</div>
          </div>
          <div style="background:var(--sand);border-radius:var(--radius-sm);padding:14px;font-size:13px;color:var(--mid)">
            <strong style="color:var(--dark);display:block;margin-bottom:4px">📋 Datos de facturación</strong>
            María García · NIT: 123456789 · Medellín, Colombia
          </div>
          <button class="btn-checkout" onclick="procesarPago()" ${cart.length===0?'disabled style="opacity:0.5;cursor:not-allowed"':''}>
            Pagar $${Math.round(total).toLocaleString('es-CO')} COP
          </button>
        </div>
      </div>
    </div>`;
  }
  
  function removeFromCart(id) {
    const idx = cart.findIndex(c => c.id === id);
    if (idx > -1) { cart.splice(idx, 1); updateCartBadge(); setModule('checkout'); }
  }
  
  function selectPM(el) {
    document.querySelectorAll('.pm').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
  }
  
  function procesarPago() {
    if (cart.length === 0) return;
    const subtotal = cart.reduce((s, c) => s + c.precio, 0);
    const total = Math.round(subtotal * (1 + IVA));
    const numFactura = 'SF-' + Date.now().toString().slice(-6);
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
      <div class="success-card">
        <div class="sc-big">🎉</div>
        <h2>¡Pago exitoso!</h2>
        <p>Factura <strong>${numFactura}</strong><br>Total pagado: <strong>$${total.toLocaleString('es-CO')} COP</strong></p>
        <button class="btn-primary" onclick="document.querySelector('.success-overlay').remove();cart=[];updateCartBadge();setModule('dashboard')">Volver al inicio</button>
      </div>`;
    document.body.appendChild(overlay);
  }
  
  // ===== TOAST =====
  function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { if (t.parentNode) t.remove(); }, 3000);
  }
  
  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', () => {
    // Show landing first
    document.getElementById('landing').classList.add('active');
    updateCartBadge();
  });