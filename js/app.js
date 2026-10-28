(function () {
  'use strict';

  /* ───────── Utilidades ───────── */
  var CONTACT = 'karina.rueda@biosteeldecolombia.com';
  var STORE = 'bs-tecnovigilancia-v1';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ic = function (n, cls) { return '<svg class="ic' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };
  var tip = function (t, d) { return '<span class="tip" tabindex="0" data-tip="' + d + '">' + t + '</span>'; };

  var T = {
    invima: tip('INVIMA', 'Instituto Nacional de Vigilancia de Medicamentos y Alimentos: la autoridad sanitaria de Colombia que recibe los reportes.'),
    res: tip('Resolución 4816 de 2008', 'Norma que reglamenta el Programa Nacional de Tecnovigilancia en Colombia.'),
    lote: tip('lote', 'Código que identifica un grupo de unidades fabricadas bajo las mismas condiciones. Permite rastrear cada implante.'),
    posmercado: tip('postmercado', 'Etapa posterior a la comercialización del dispositivo, cuando se vigila su desempeño real en pacientes.'),
    regsan: tip('Registro Sanitario', 'Autorización del INVIMA que permite comercializar un dispositivo médico en Colombia.'),
    recall: tip('Recall', 'Retiro del mercado, total o parcial, de un producto que supone un riesgo para la salud.'),
    cuarentena: tip('cuarentena', 'Zona física separada donde se aísla el producto sospechoso, rotulado y bloqueado para evitar su despacho.'),
    guardian: tip('guardián', 'Recipiente rígido para residuos cortopunzantes. El implante que falló NO debe ir allí.'),
    torque: tip('torque', 'Fuerza de giro aplicada al atornillar. Un torque moderado no debería dañar el destornillador.'),
    custodia: tip('bolsa de custodia', 'Bolsa rotulada donde se guarda la evidencia para que el proveedor la analice en laboratorio.'),
    trazab: tip('trazabilidad', 'Capacidad de seguir un dispositivo desde que entra a bodega hasta el paciente, mediante lote y serie.'),
    revision: tip('cirugía de revisión', 'Nueva operación para corregir o reemplazar un implante que falló.')
  };

  /* ───────── Datos de módulos ───────── */
  var FORMS = {
    1: { pre: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4misgyHWNU29GOHDDDzQcCVcvigEgVlOvh6uXTWup7dUNERYV0hIUlhIUkY0V1VYUEVPUkYzQUJOWi4u',
         post: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4misgyHWNU29GOHDDDzQcCVcvigEgVlOvh6uXTWup7dUOENYQTQ0TkRaTU41TkQxM1BKTlkxWFpCUS4u' },
    2: { pre: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4misgyHWNU29GOHDDDzQcCVcvigEgVlOvh6uXTWup7dURUZaTExLRVdJQkFOS0NZTTZMNkRPSktLNC4u',
         post: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4misgyHWNU29GOHDDDzQcCVcvigEgVlOvh6uXTWup7dUQVpFRjk5NVNSTUlIUjRVUU9ZWUpaTlNHUy4u' },
    3: { pre: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4misgyHWNU29GOHDDDzQcCVcvigEgVlOvh6uXTWup7dUMFowQUZDOVlZWTRNUzZGNTQxSjc1WDAwMC4u',
         post: 'https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=4misgyHWNU29GOHDDDzQcCVcvigEgVlOvh6uXTWup7dURVkxRkxFOUlOQTI5UFdNTUdSMEJZMzhZRi4u' }
  };

  var survey = function (kind) {
    return { kind: kind, t: kind === 'pre' ? 'Encuesta previa' : 'Encuesta final', tag: kind === 'pre' ? 'Pre' : 'Post', ic: 'clipboard', slide: 0 };
  };

  var MODS = [
    {
      n: 1, title: 'Fundamentos Legales', icon: 'scale', audience: 'Asistencial y Almacén', who: ['asistencial', 'almacen'],
      hours: '2 horas', method: 'Teórica (virtual o presencial)',
      sub: 'Programa Institucional de Tecnovigilancia. Implementación de la Resolución 4816 de 2008.',
      summary: 'Qué es la Tecnovigilancia, por qué importa en ortopedia y cuáles son los plazos legales para reportar.',
      steps: [
        survey('pre'),
        { t: 'Pilares de la Tecnovigilancia', ic: 'shield', slide: 4, html: function () { return '' +
          '<p class="prose-lg">Tres ideas resumen el programa. Pasa el cursor sobre los términos subrayados para ver su definición.</p>' +
          '<div class="grid3">' +
          tile('eye', '¿Qué es?', 'Es un sistema de vigilancia sanitaria ' + T.posmercado + ' encargado de identificar, recopilar y evaluar los problemas de seguridad que presentan los dispositivos médicos.') +
          tile('heart-pulse', 'Propósito', 'Proteger la vida y la salud de los pacientes, operadores clínicos y usuarios, mitigando la probabilidad de aparición de daños colaterales.') +
          tile('file-check', 'Obligatoriedad', 'Exige a prestadores e importadores diseñar e implementar un programa institucional permanente con canales internos de control activos.') +
          '</div>'; } },
        { t: 'Por qué es crítica en ortopedia', ic: 'target', slide: 5, html: function () { return '' +
          '<p class="prose-lg">Los implantes y el material de osteosíntesis interactúan directamente con el cuerpo humano, lo que exige un control riguroso en su fase ' + T.posmercado + '.</p>' +
          '<div class="grid2">' +
          tile('box', 'Naturaleza del dispositivo', 'El material quirúrgico implantable requiere un seguimiento minucioso desde su ingreso al almacén hasta su uso final en cirugía.') +
          tile('scale', 'Objetivo de la norma', 'Identificar, recolectar y evaluar eventos o incidentes adversos no descritos previamente para mitigar riesgos en salud pública.') +
          '</div>' +
          '<h3 style="margin-top:32px">Un trabajo en equipo</h3>' +
          '<p class="prose">La logística y lo asistencial se conectan directamente para proteger al paciente.</p>' +
          '<div class="table-wrap"><table class="bs"><thead><tr><th>Personal de Almacén</th><th>Personal Asistencial</th></tr></thead><tbody>' +
          '<tr><td>Garantiza recepción técnica, almacenamiento adecuado e integridad del empaque.</td><td>Evalúa el desempeño, la calidad y la seguridad del dispositivo previo a su uso clínico.</td></tr>' +
          '<tr><td>Custodia la ' + T.trazab + ' (lote, serie, referencia, registro sanitario) antes de que el implante llegue a cirugía.</td><td>Identifica, gestiona en campo y notifica los incidentes y reportes en el punto de atención.</td></tr>' +
          '</tbody></table></div>' +
          pull('Sin la trazabilidad del almacén, el asistencial no puede reportar de forma segura; sin el reporte del asistencial, el almacén no puede aislar un lote defectuoso.'); } },
        { t: 'Defecto de calidad y falla de funcionamiento', ic: 'wrench', slide: 7, html: function () { return '' +
          '<p class="prose-lg">Dos conceptos que suelen confundirse. La diferencia está en el momento en que se detectan.</p>' +
          '<div class="vs">' +
          '<div class="tile tile--blue"><h3>Defecto de calidad</h3><p>Cualquier característica física o química que esté en contra de las especificaciones definidas por el fabricante. Generalmente se detecta <b>antes del uso clínico</b>.</p><p class="example"><b>Ejemplo:</b> un empaque estéril roto o un tornillo de osteosíntesis que viene sin la rosca finalizada de fábrica.</p></div>' +
          '<div class="vs__mid" aria-hidden="true">VS</div>' +
          '<div class="tile tile--blue"><h3>Falla de funcionamiento</h3><p>Mal funcionamiento o deterioro en las características o el desempeño del dispositivo médico <b>durante su uso</b>.</p><p class="example"><b>Ejemplo:</b> instrumental quirúrgico de fijación que se dobla o se fractura en medio del procedimiento médico.</p></div>' +
          '</div>'; } },
        { t: 'Eventos adversos: cuando ocurre un daño real', ic: 'alert', slide: 8, html: function () { return '' +
          '<div class="callout callout--alert">' + ic('info') + '<div><h3>Definición</h3><p>Daño no intencionado al paciente, operador o medio ambiente como consecuencia de la utilización de un dispositivo médico.</p></div></div>' +
          '<div class="grid2">' +
          '<div class="tile tile--navy"><div class="tile__icon">' + ic('alert') + '</div><h3>Evento adverso serio</h3><p>Aquel que pudo haber llevado o llevó a la muerte o al deterioro serio de la salud: amenaza la vida, requiere intervención quirúrgica para prevenir un daño permanente, genera incapacidad permanente parcial o prolonga la hospitalización.</p><p class="example"><b>Ejemplo:</b> fractura de una placa de reconstrucción ya implantada bajo condiciones normales de reposo, obligando a una ' + T.revision + ' de urgencia.</p></div>' +
          '<div class="tile"><div class="tile__icon">' + ic('info') + '</div><h3>Evento adverso no serio</h3><p>Daño no intencionado al paciente u operador que ocurre como consecuencia de la utilización del dispositivo, pero que no compromete de forma grave o permanente su salud.</p></div>' +
          '</div>'; } },
        { t: 'Incidentes adversos: el casi pasó', ic: 'bell', slide: 9, html: function () { return '' +
          '<p class="prose-lg">Aquí no hubo daño, pero estuvo cerca. Reconocerlos es clave para prevenir el siguiente evento.</p>' +
          '<div class="grid2">' +
          '<div class="tile tile--navy"><div class="tile__icon">' + ic('alert') + '</div><h3>Incidente adverso serio</h3><p>Potencial daño severo o fatal que no se materializó debido al azar, la intervención oportuna del personal de salud o la activación de una barrera de seguridad.</p><p class="example"><b>Ejemplo:</b> un equipo de reanimación genera un corto circuito crítico justo antes de ser conectado al paciente; se sustituye a tiempo por otro de soporte.</p></div>' +
          '<div class="tile"><div class="tile__icon">' + ic('info') + '</div><h3>Incidente adverso no serio</h3><p>Riesgo potencial de baja gravedad que no causó perjuicio en el paciente por concurrencia de factores de seguridad o detección temprana del operador.</p><p class="example"><b>Ejemplo:</b> una sutura quirúrgica se fractura al sacarla del empaque antes de realizar el punto. Se desecha inmediatamente y se utiliza una nueva.</p></div>' +
          '</div>'; } },
        { t: 'Las barreras de seguridad', ic: 'shield-check', slide: 10, html: function () { return '' +
          '<div class="callout">' + ic('shield-check') + '<div><h3>La barrera de seguridad</h3><p>El daño no se consolidó porque el personal técnico o asistencial detectó la anomalía a tiempo, antes de implantar o usar el dispositivo.</p></div></div>' +
          '<div class="callout callout--alert">' + ic('flag') + '<div><h3>Mensaje clave</h3><p>El incidente es nuestra mayor oportunidad de mejora para retirar ' + T.lote + 's del mercado antes de que causen un daño real en el siguiente paciente.</p></div></div>'; } },
        { t: 'Tiempos de reporte legal', ic: 'clock', slide: 11, html: function () { return '' +
          '<p class="prose-lg">Según el <b>Artículo 15 de la ' + T.res + '</b>, todos los eventos e incidentes adversos serios deben ser notificados al ' + T.invima + ' dentro de las siguientes 72 horas a su ocurrencia.</p>' +
          '<div class="time-grid"><div class="clock">' + ic('clock') + '<b>72 h</b><span>Plazo máximo de notificación</span></div>' +
          '<div style="display:grid;gap:16px;align-content:center">' + pull('Reportar oportunamente un incidente es la única forma de alertar al almacén para detener un lote fallido antes de que cause daños adicionales.') + '</div></div>'; } },
        survey('post')
      ],
      closing: 'En Tecnovigilancia, el silencio es el mayor riesgo.',
      closingText: 'La seguridad de nuestros procesos y de los pacientes depende de tu capacidad de observación, trazabilidad y reporte.'
    },
    {
      n: 2, title: 'Identificación y Reporte Clínico', icon: 'heart-pulse', audience: 'Solo Asistencial', who: ['asistencial'],
      hours: '3 horas', method: 'Práctica: estudios de caso y simulación de llenado de formato',
      sub: 'Gestión de seguridad con material de osteosíntesis en el punto de atención. Dirigido a instrumentadores quirúrgicos, asesores de línea y soporte técnico en salas.',
      summary: 'Cómo vigilar el dispositivo antes, durante y después de la cirugía, qué hacer si falla y cómo redactar el reporte.',
      steps: [
        survey('pre'),
        { t: 'Vigilancia en tres tiempos', ic: 'layers', slide: 4, html: function () { return '' +
          '<p class="prose-lg">La vigilancia clínica no empieza en el quirófano ni termina al cerrar la herida. Se hace en tres momentos.</p>' +
          '<div class="grid3">' +
          tile('eye', 'Antes', 'Inspección previa: verificar de forma obligatoria la esterilidad del empaque, la fecha de vencimiento y que el ' + T.regsan + ' INVIMA esté visible en la etiqueta.') +
          tile('wrench', 'Durante', 'Desempeño clínico: monitorear el comportamiento del material durante el implante (bloqueos, flexión de placas, resistencia de brocas).') +
          tile('file-check', 'Después', 'Registro clínico: diligenciar la Ficha de Trazabilidad en la historia clínica del paciente con el ' + T.lote + ' y la serie exactos del implante utilizado.') +
          '</div>'; } },
        { t: 'Señales de alerta en osteosíntesis', ic: 'alert', slide: 5, html: function () { return '' +
          '<p class="prose-lg">¿Qué debemos detectar en salas de cirugía?</p>' +
          '<ul class="checklist">' +
          li('alert', 'Brocas o machuelos que se fracturan o pierden el filo con un solo uso.') +
          li('alert', 'Destornilladores que se barren al aplicar un ' + T.torque + ' moderado.') +
          li('alert', 'Tornillos corticales o de bloqueo cuyas cabezas se desprenden o cuyas roscas se aíslan dentro del canal óseo.') +
          li('alert', 'Placas que se microfracturan al momento del moldeado técnico en la mesa de reserva.') +
          '</ul>'; } },
        { t: 'Protocolo de acción inmediata en quirófano', ic: 'shield-check', slide: 6, html: function () { return '' +
          '<p class="prose-lg">Si el dispositivo falla, sigue estos tres pasos en este orden.</p>' +
          '<ol class="numbered">' +
          '<li><strong>Proteger al paciente</strong>Apoya al cirujano abriendo de inmediato el material de respaldo para continuar con la fijación de la fractura.</li>' +
          '<li class="warn"><strong>Preservar la evidencia: ¡no desechar!</strong>El implante o fragmento que falló NO se tira al ' + T.guardian + ' de cortopunzantes ni a la bolsa roja de residuos biológicos ordinarios.</li>' +
          '<li><strong>Custodia del dispositivo</strong>Limpia el elemento bajo normas de bioseguridad, rotúlalo con el lote y la referencia, y guárdalo en una ' + T.custodia + ' para el análisis de laboratorio del proveedor.</li>' +
          '</ol>'; } },
        { t: 'El reloj de la Tecnovigilancia', ic: 'clock', slide: 7, html: function () { return '' +
          '<p class="prose-lg">El plazo de reporte depende de la gravedad del suceso.</p>' +
          '<div class="grid2">' +
          '<div class="tile tile--navy"><div class="tile__icon">' + ic('alert') + '</div><h3>Reporte inmediato (casos serios)</h3><p>Si la falla del dispositivo causó o pudo causar la muerte, un deterioro grave de la salud del paciente o forzó una reintervención quirúrgica, la notificación oficial debe hacerse dentro de las <b>72 horas</b> siguientes a la ocurrencia del suceso (Artículo 15).</p></div>' +
          '<div class="tile"><div class="tile__icon">' + ic('calendar') + '</div><h3>Reporte periódico (casos no serios)</h3><p>Sucesos menores o defectos de calidad que no causaron daños graves se consolidan internamente de forma <b>trimestral</b> (Artículo 16).</p></div>' +
          '</div>'; } },
        { t: 'Datos obligatorios del reporte', ic: 'file-check', slide: 8, html: function () { return '' +
          '<p class="prose-lg">El Artículo 17 define la información mínima. El formato de reporte de evento adverso se organiza en cuatro bloques: <b>paciente</b>, <b>dispositivo</b>, <b>suceso</b> y <b>reportante</b>.</p>' +
          '<figure class="figure"><img src="assets/img/formato-reporte.png" alt="Formato de reporte de evento adverso de dispositivos médicos con cuatro secciones: paciente, dispositivo, suceso y reportante" loading="lazy"><figcaption>Formato de referencia. Ábrelo en grande desde “Ver diapositiva original”.</figcaption></figure>'; } },
        { t: 'Redacción técnica del suceso', ic: 'pen', slide: 9, html: function () { return '' +
          '<p class="prose-lg">Un buen reporte describe hechos verificables: qué pasó, con qué instrumento, en qué referencia y lote, y qué consecuencia tuvo.</p>' +
          '<div class="dodont">' +
          '<div class="dd dd--no">' + ic('ban') + '<div><h3>Cómo no redactar</h3><p>“El tornillo salió malo y se partió en la cirugía.”</p></div></div>' +
          '<div class="dd dd--yes">' + ic('check') + '<div><h3>Cómo sí redactar</h3><p>“Al realizar el ' + T.torque + ' manual final con el destornillador del sistema de fragmentos grandes, la cabeza del tornillo cortical de 3.5 mm (Lote XYZ123) sufrió una fractura limpia a nivel del cuello, quedando el cuerpo roscado alojado en la cortical trans del fémur sin posibilidad de extracción. Se requirió colocar una placa suplementaria…”</p></div></div>' +
          '</div>'; } },
        survey('post')
      ],
      closing: 'En BioSteel, la seguridad clínica empieza con tu reporte.',
      closingText: 'Tu reporte oportuno en salas de cirugía protege la salud de cientos de pacientes y asegura la excelencia de nuestros materiales de osteosíntesis.'
    },
    {
      n: 3, title: 'Trazabilidad, Alertas y Retiros', icon: 'box', audience: 'Solo Almacén', who: ['almacen'],
      hours: '3 horas', method: 'Práctica: talleres en bodega, simulación de cuarentena y rastreo de lotes',
      sub: 'Gestión de almacenamiento seguro, control de lotes y logística inversa.',
      summary: 'Recepción técnica, respuesta a alertas sanitarias, aislamiento en cuarentena y logística de retiro de productos.',
      steps: [
        survey('pre'),
        { t: 'La recepción técnica: la primera barrera', ic: 'search', slide: 4, html: function () { return '' +
          '<div class="figure--side figure"><div><p class="prose-lg" style="margin-bottom:16px">La Tecnovigilancia en el almacén comienza en el momento en que el material ingresa a la bodega.</p><h3 style="margin-bottom:12px">Puntos críticos de la inspección visual</h3>' +
          '<ul class="checklist">' +
          li('check', 'Integridad absoluta del empaque, sin abolladuras, perforaciones ni humedad que comprometan la esterilidad.') +
          li('check', 'Correspondencia exacta entre el producto físico y los documentos (remisión o factura).') +
          li('check', 'Presencia obligatoria en la etiqueta de: ' + T.regsan + ' INVIMA vigente, número de ' + T.lote + ' o serie, fecha de vencimiento y referencia del fabricante.') +
          '</ul></div><img src="assets/img/almacen.png" alt="Ilustración de una persona de almacén revisando un listado frente a estanterías" loading="lazy"></div>'; } },
        { t: 'Gestión de alertas sanitarias', ic: 'bell', slide: 5, html: function () { return '' +
          '<div class="callout callout--alert">' + ic('bell') + '<div><h3>Artículo 29 · ¿Qué es una alerta?</h3><p>Comunicados emitidos por agencias sanitarias (' + T.invima + ' o casas matrices internacionales) sobre problemas de seguridad o desempeño detectados en un dispositivo.</p></div></div>' +
          '<p class="prose">Cuando llega una alerta, el almacén es la primera línea de respuesta. En el siguiente paso verás el protocolo.</p>'; } },
        { t: 'Protocolo del almacén al recibir una alerta', ic: 'clipboard', slide: 6, html: function () { return '' +
          '<p class="prose-lg">Dos acciones inmediatas, en este orden.</p>' +
          '<ol class="numbered">' +
          '<li><strong>Búsqueda inmediata</strong>Rastrea de forma digital en el software de inventarios si BioSteel cuenta con existencias del ' + T.lote + ', serie o referencia afectada por la alerta.</li>' +
          '<li><strong>Identificación de destinatarios</strong>Verifica si parte de ese lote ya fue distribuido o vendido a clínicas u hospitales, detallando la cantidad de unidades (Artículo 17, Parágrafo 1).</li>' +
          '</ol>'; } },
        { t: 'Aislamiento y área de cuarentena', ic: 'lock', slide: 7, html: function () { return '' +
          '<p class="prose-lg">Ante la confirmación de una alerta o un reporte interno de defecto de calidad, se debe activar el bloqueo físico del inventario en ' + T.cuarentena + '.</p>' +
          '<h3>Pasos para el bloqueo seguro</h3>' +
          '<ol class="numbered">' +
          '<li><strong>Retiro del stock</strong>Traslada inmediatamente las unidades afectadas de las estanterías de despacho común hacia el área física de cuarentena.</li>' +
          '<li><strong>Marcación visible</strong>Rotula el material con etiquetas claras que indiquen la restricción de salida.</li>' +
          '<li><strong>Bloqueo digital</strong>Actualiza el estado en el sistema para asegurar que ninguna referencia afectada pueda ser facturada o despachada por error.</li>' +
          '</ol>'; } },
        { t: 'Logística de retiro de productos (recall)', ic: 'refresh', slide: 8, html: function () { return '' +
          '<p class="prose-lg">Artículo 19. Cuando un producto supone un riesgo para la salud, se ejecuta el retiro total o parcial del mercado (' + T.recall + ').</p>' +
          '<h3>Responsabilidades del almacén en el retiro técnico</h3>' +
          '<ul class="checklist">' +
          li('box', 'Consolidar físicamente el inventario recuperado de las instituciones y el almacenado en bodega.') +
          li('file-check', 'Mantener el soporte documental de las cantidades recibidas, referencias, lotes y fechas de vencimiento.') +
          li('shield-check', 'Coordinar el almacenamiento seguro previo a las acciones de disposición final, destrucción o devolución a la casa matriz autorizada por el ' + T.invima + '.') +
          '</ul>'; } },
        survey('post')
      ],
      closing: 'En el almacén de BioSteel, la trazabilidad es nuestra mayor responsabilidad.',
      closingText: 'El control riguroso de cada lote en el almacenamiento e inventario es la garantía de que solo entregamos seguridad a las salas de cirugía.'
    }
  ];

  function tile(icon, title, text) {
    return '<div class="tile"><div class="tile__icon">' + ic(icon) + '</div><h3>' + title + '</h3><p>' + text + '</p></div>';
  }
  function li(icon, text) { return '<li>' + ic(icon) + '<span>' + text + '</span></li>'; }
  function pull(text) { return '<div class="pull">' + ic('quote') + '<p>' + text + '</p></div>'; }

  /* ───────── Estado ───────── */
  var state = load();
  function load() {
    try { var s = JSON.parse(localStorage.getItem(STORE)); if (s && s.done) return s; } catch (e) {}
    return { profile: 'todos', done: {}, last: null };
  }
  function save() { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {} }
  var key = function (m, s) { return 'm' + m + '-' + s; };
  var isDone = function (m, s) { return !!state.done[key(m, s)]; };
  function modPct(mod) {
    var d = 0; mod.steps.forEach(function (_, i) { if (isDone(mod.n, i)) d++; });
    return Math.round(d / mod.steps.length * 100);
  }
  function relevant(mod) { return state.profile === 'todos' || mod.who.indexOf(state.profile) > -1; }
  function totalPct() {
    var d = 0, t = 0;
    MODS.forEach(function (m) { if (!relevant(m)) return; t += m.steps.length; m.steps.forEach(function (_, i) { if (isDone(m.n, i)) d++; }); });
    return t ? Math.round(d / t * 100) : 0;
  }
  function nextPending() {
    for (var a = 0; a < MODS.length; a++) {
      if (!relevant(MODS[a])) continue;
      for (var i = 0; i < MODS[a].steps.length; i++) if (!isDone(MODS[a].n, i)) return { m: MODS[a].n, s: i };
    }
    return null;
  }

  /* ───────── Vistas ───────── */
  function viewHome() {
    var np = nextPending(), started = Object.keys(state.done).length > 0, pct = totalPct();
    var ctaHref = np ? '#/modulo/' + np.m + '/' + np.s : '#/evaluaciones';
    var ctaTxt = !np ? 'Ver evaluaciones' : started ? 'Continuar capacitación' : 'Comenzar capacitación';
    return '' +
    '<section class="hero"><div class="wrap hero__grid"><div>' +
      '<p class="eyebrow">Programa Institucional de Tecnovigilancia</p>' +
      '<h1>Capacitación en Tecnovigilancia</h1>' +
      '<p class="lead">Aprende a identificar, reportar y gestionar los problemas de seguridad de los dispositivos médicos de osteosíntesis, de acuerdo con la ' + T.res + '.</p>' +
      '<div class="hero__cta"><a class="btn btn--light" href="' + ctaHref + '">' + ctaTxt + ic('arrow-right') + '</a>' +
      '<a class="btn btn--ghost-light" href="#modulos">Ver los 3 módulos</a></div>' +
      '<div class="hero__facts"><span>' + ic('layers') + '3 módulos</span><span>' + ic('clock') + '8 horas en total</span><span>' + ic('clipboard') + 'Evaluación pre y post por módulo</span></div>' +
    '</div><div class="hero__art"><img src="assets/img/lupa-tecnovigilancia.png" alt="Tecnovigilancia, lupa sobre el nombre del programa" width="560" height="300"></div></div>' +
    '<svg class="hero__wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0,40 C240,95 480,95 720,55 C960,15 1200,5 1440,45 L1440,90 L0,90 Z" fill="#fff"/></svg></section>' +

    '<section class="section"><div class="wrap">' +
      '<p class="eyebrow">Cómo funciona</p><h2 class="section-title">Tres pasos en cada módulo</h2><div class="divider"></div>' +
      '<div class="how">' +
        how('01', 'clipboard', 'Encuesta previa', 'Responde una breve encuesta antes de empezar. Nos ayuda a conocer tu punto de partida.') +
        how('02', 'book', 'Estudia el material', 'Avanza paso a paso por las diapositivas explicadas. Marca cada paso al terminarlo.') +
        how('03', 'target', 'Encuesta final', 'Al terminar, responde la encuesta posterior para medir lo que aprendiste.') +
      '</div></div></section>' +

    '<section class="section section--surface" id="modulos"><div class="wrap">' +
      '<p class="eyebrow">Tu ruta</p><h2 class="section-title">Módulos de la capacitación</h2><div class="divider"></div>' +
      '<div class="profile"><div><h3>¿Cuál es tu rol?</h3><p>Elige tu perfil y te mostramos los módulos que te corresponden. Los demás quedan disponibles como consulta.</p>' +
        '<div class="chips" role="group" aria-label="Perfil">' +
          chip('todos', 'layers', 'Ver todo') + chip('asistencial', 'heart-pulse', 'Asistencial') + chip('almacen', 'box', 'Almacén') +
        '</div></div>' +
        '<div class="ring" style="--p:' + pct + '" role="img" aria-label="Progreso total ' + pct + ' por ciento"><span>' + pct + '%<small>completado</small></span></div></div>' +
      '<div class="cards">' + MODS.map(modCard).join('') + '</div></div></section>' +

    '<section class="section"><div class="wrap">' +
      '<p class="eyebrow">Evaluaciones</p><h2 class="section-title">Encuestas pre y post</h2><div class="divider"></div>' +
      '<p class="lead">Cada módulo tiene una encuesta antes y otra después. Las encuentras dentro de cada módulo o todas juntas en un solo lugar.</p>' +
      '<a class="btn btn--secondary" href="#/evaluaciones">Ir a las evaluaciones' + ic('arrow-right') + '</a></div></section>' +
    '<div class="quote-band">' + ic('quote') + '<p>En Tecnovigilancia, el silencio es el mayor riesgo.</p></div>' +
    contactBand();
  }
  function chip(v, icon, label) {
    return '<button class="chip" data-action="profile" data-v="' + v + '" aria-pressed="' + (state.profile === v) + '">' + ic(icon) + label + '</button>';
  }
  function how(n, icon, t, p) {
    return '<div class="how__item"><span class="how__num">Paso ' + n + '</span><div class="how__icon">' + ic(icon) + '</div><h3>' + t + '</h3><p>' + p + '</p></div>';
  }
  function modCard(m) {
    var p = modPct(m), rel = relevant(m), started = p > 0;
    return '<article class="card' + (rel ? '' : ' is-muted') + '"><div class="card__head"><span>Módulo ' + m.n + '</span>' + ic(m.icon) + '</div>' +
      '<div class="card__body"><h3 class="card__title">' + m.title + '</h3><p class="card__text">' + m.summary + '</p>' +
      '<div class="meta"><span class="badge">' + ic('users') + m.audience + '</span><span class="badge">' + ic('clock') + m.hours + '</span></div>' +
      '<p class="card__text"><b>Metodología:</b> ' + m.method + '</p>' +
      '<div style="margin-top:auto"><div class="bar-label"><span>Progreso</span><span>' + p + '%</span></div><div class="bar"><span style="width:' + p + '%"></span></div></div></div>' +
      '<div class="card__foot"><a class="btn btn--' + (rel ? 'primary' : 'secondary') + ' btn--sm" href="#/modulo/' + m.n + '/0">' + (p === 100 ? 'Repasar módulo' : started ? 'Continuar' : 'Comenzar') + ic('arrow-right') + '</a></div></article>';
  }

  function viewModule(n, si) {
    var m = MODS[n - 1];
    if (!m) return viewHome();
    si = Math.max(0, Math.min(m.steps.length - 1, si));
    state.last = { m: n, s: si }; save();
    var st = m.steps[si], total = m.steps.length, p = modPct(m);
    var list = m.steps.map(function (s, i) {
      var d = isDone(n, i);
      return '<li><button class="step' + (d ? ' is-done' : '') + '" data-action="goto" data-m="' + n + '" data-s="' + i + '"' + (i === si ? ' aria-current="step"' : '') + '>' +
        '<span class="step__dot">' + (d ? ic('check') : i + 1) + '</span><span class="step__label">' + s.t + '</span>' +
        (s.tag ? '<span class="step__tag">' + s.tag + '</span>' : '') + '</button></li>';
    }).join('');

    var body, last = si === total - 1;
    if (st.kind) body = surveyBody(n, st.kind, m);
    else body = st.html();
    if (last) body += finishBlock(m);

    var doneNow = isDone(n, si);
    var nextBtn = !last
      ? '<button class="btn btn--primary" data-action="next" data-m="' + n + '" data-s="' + si + '" data-tip="Marca este paso como visto y avanza al siguiente">' + (doneNow ? 'Siguiente' : 'Marcar como visto y continuar') + ic('arrow-right') + '</button>'
      : '<a class="btn btn--primary" href="#/" data-action="finish" data-m="' + n + '" data-s="' + si + '">Terminar módulo' + ic('check') + '</a>';

    return '' +
    '<section class="mod-hero"><div class="mod-hero__num" aria-hidden="true">' + n + '</div><div class="wrap">' +
      '<nav class="crumbs" aria-label="Ruta"><a href="#/">Inicio</a>' + ic('chevron-right') + '<span>Módulo ' + n + '</span></nav>' +
      '<h1>' + m.title + '</h1><p>' + m.sub + '</p>' +
      '<div class="meta"><span class="badge">' + ic('users') + m.audience + '</span><span class="badge">' + ic('clock') + m.hours + '</span><span class="badge">' + ic('book') + m.method + '</span></div>' +
    '</div></section>' +
    '<div class="wrap"><div class="lesson">' +
      '<aside class="steps" id="steps" aria-label="Pasos del módulo"><div class="steps__head"><h2>Tu progreso</h2>' +
        '<div class="bar-label"><span>Paso ' + (si + 1) + ' de ' + total + '</span><span>' + p + '%</span></div><div class="bar"><span style="width:' + p + '%"></span></div></div>' +
        '<button class="steps__toggle" data-action="toggle-steps" aria-expanded="false">Ver todos los pasos' + ic('chevron-right') + '</button>' +
        '<ol>' + list + '</ol>' +
        '<div class="steps__foot"><button class="btn btn--secondary btn--sm" data-action="viewer-open" data-m="' + n + '" data-slide="1" data-tip="Abre las diapositivas originales de Karina Rueda">' + ic('image') + 'Ver diapositivas</button>' +
        '<a class="btn btn--ghost btn--sm" href="assets/pdf/modulo-' + n + '-tecnovigilancia.pdf" download data-tip="Descarga la presentación completa en PDF">' + ic('download') + 'Descargar PDF</a></div>' +
      '</aside>' +
      '<article class="panel"><header class="panel__head"><p class="eyebrow">' + (st.kind ? 'Evaluación' : 'Paso ' + (si + 1) + ' de ' + total) + '</p><h2>' + st.t + '</h2></header>' +
        '<div class="panel__body" id="stepBody">' + body + '</div>' +
        '<footer class="panel__nav"><div class="grow">' +
          (si > 0 ? '<a class="btn btn--ghost" href="#/modulo/' + n + '/' + (si - 1) + '">' + ic('chevron-left') + 'Anterior</a>' : '<span></span>') +
          (st.slide ? '<button class="btn btn--secondary" data-action="viewer-open" data-m="' + n + '" data-slide="' + st.slide + '" data-tip="Mira esta misma información en la diapositiva original">' + ic('image') + 'Diapositiva original</button>' : '') +
        '</div>' + nextBtn + '</footer>' +
      '</article>' +
    '</div></div>' + contactBand();
  }

  function surveyBody(n, kind, m) {
    var url = FORMS[n][kind], d = isDone(n, kind === 'pre' ? 0 : m.steps.length - 1), idx = kind === 'pre' ? 0 : m.steps.length - 1;
    var title = kind === 'pre' ? 'Encuesta previa · Módulo ' + n : 'Encuesta final · Módulo ' + n;
    var txt = kind === 'pre'
      ? 'Antes de ver el contenido, responde esta breve encuesta. No es una nota: sirve para saber con qué conocimientos llegas.'
      : 'Ya terminaste el material. Responde la encuesta final para medir lo que aprendiste en este módulo.';
    return '<div class="survey"><div class="survey__card"><h3>' + title + '</h3><p>' + txt + '</p>' +
      '<a class="btn btn--light" href="' + url + '" target="_blank" rel="noopener noreferrer" data-tip="Se abre en una pestaña nueva con Microsoft Forms">Abrir encuesta' + ic('external') + '</a></div>' +
      '<button class="check" data-action="toggle-survey" data-m="' + n + '" data-s="' + idx + '" aria-pressed="' + d + '"><span class="check__box">' + ic('check') + '</span>Ya diligencié esta encuesta</button>' +
      '<p class="hint">' + ic('help') + 'Marca la casilla cuando termines para que cuente en tu progreso.</p></div>';
  }
  function finishBlock(m) {
    return '<div class="finish"><img src="assets/img/logo-biosteel-ojo.png" alt="BioSteel de Colombia" width="220" height="131"><h3>' + m.closing + '</h3><p class="prose" style="margin:0 auto">' + m.closingText + '</p></div>';
  }

  function viewEval() {
    var rows = MODS.map(function (m) {
      var last = m.steps.length - 1;
      var cell = function (kind, idx) {
        var d = isDone(m.n, idx);
        return '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><a class="btn btn--' + (d ? 'secondary' : 'primary') + ' btn--sm" href="' + FORMS[m.n][kind] + '" target="_blank" rel="noopener noreferrer">' + (kind === 'pre' ? 'Encuesta pre' : 'Encuesta post') + ic('external') + '</a>' +
          '<button class="chip" style="height:36px" data-action="toggle-survey" data-m="' + m.n + '" data-s="' + idx + '" data-refresh="1" aria-pressed="' + d + '">' + ic('check') + (d ? 'Diligenciada' : 'Marcar') + '</button></div>';
      };
      return '<tr><td data-label="Módulo"><b>Módulo ' + m.n + '</b><br>' + m.title + '</td><td data-label="Dirigido a">' + m.audience + '</td><td data-label="Antes">' + cell('pre', 0) + '</td><td data-label="Después">' + cell('post', last) + '</td></tr>';
    }).join('');
    return '<section class="section"><div class="wrap">' +
      '<nav class="crumbs crumbs--dark" aria-label="Ruta"><a href="#/">Inicio</a>' + ic('chevron-right') + '<span>Evaluaciones</span></nav>' +
      '<p class="eyebrow">Evaluaciones</p><h1 class="section-title">Encuestas pre y post</h1><div class="divider"></div>' +
      '<p class="lead">Responde la encuesta <b>pre</b> antes de iniciar cada módulo y la <b>post</b> al terminarlo. Solo diligencia las de los módulos de tu rol.</p>' +
      '<div class="table-wrap"><table class="bs stack"><thead><tr><th scope="col">Módulo</th><th scope="col">Dirigido a</th><th scope="col">Antes</th><th scope="col">Después</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<p class="hint" style="margin-top:16px">' + ic('info') + 'Las encuestas se abren en Microsoft Forms, en una pestaña nueva.</p></div></section>' + contactBand();
  }

  function contactBand() {
    return '<section class="section section--surface" id="dudas"><div class="wrap"><div class="contact">' +
      '<div class="contact__icon">' + ic('help') + '</div>' +
      '<div><h2>¿Tienes dudas?</h2><p>Escríbele a <b>Karina Rueda</b>, Directora Técnica de Biosteel de Colombia S.A.S. Con gusto resolverá tus preguntas sobre el programa y el material.</p></div>' +
      '<a class="btn btn--light" href="mailto:' + CONTACT + '?subject=Duda%20sobre%20la%20capacitaci%C3%B3n%20en%20Tecnovigilancia">' + ic('mail') + CONTACT + '</a>' +
    '</div></div></section>';
  }

  /* ───────── Router ───────── */
  var app = $('#app');
  function route() {
    var h = location.hash.replace(/^#\/?/, '').split('/'), r = h[0] || '', html, nav = 'home', title = 'Capacitación en Tecnovigilancia';
    if (r === 'modulo') {
      var n = parseInt(h[1], 10) || 1, s = parseInt(h[2], 10) || 0;
      html = viewModule(n, s); nav = 'm' + n; title = 'Módulo ' + n + ' · ' + (MODS[n - 1] ? MODS[n - 1].title : '');
    } else if (r === 'evaluaciones') { html = viewEval(); nav = 'eval'; title = 'Evaluaciones'; }
    else if (r === 'dudas') { html = viewHome(); nav = 'dudas'; title = 'Dudas'; }
    else { html = viewHome(); }
    app.innerHTML = html;
    document.title = title + ' | Biosteel de Colombia';
    $$('.nav__links a').forEach(function (a) { a.removeAttribute('aria-current'); if (a.dataset.route === nav) a.setAttribute('aria-current', 'page'); });
    $('#navLinks').classList.remove('is-open'); $('#navToggle').setAttribute('aria-expanded', 'false');
    $('#navBar').style.width = totalPct() + '%';
    if (r === 'dudas') { var el = $('#dudas'); if (el) setTimeout(function () { el.scrollIntoView(); }, 30); }
    else if (r === 'modulo') { var b = $('.mod-hero'); window.scrollTo(0, 0); }
    else window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);

  /* ───────── Visor de diapositivas ───────── */
  var COUNTS = [12, 10, 9], vm = 1, vs = 1, dlg = $('#viewer');
  function showSlide() {
    var pad = vs < 10 ? '0' + vs : '' + vs;
    $('#viewerImg').src = 'assets/slides/m' + vm + '-' + pad + '.jpg';
    $('#viewerImg').alt = 'Diapositiva ' + vs + ' del módulo ' + vm;
    $('#viewerCount').textContent = 'Diapositiva ' + vs + ' de ' + COUNTS[vm - 1];
    $('#viewerTitle').textContent = 'Módulo ' + vm + ' · ' + MODS[vm - 1].title;
    $('#viewerPdf').href = 'assets/pdf/modulo-' + vm + '-tecnovigilancia.pdf';
  }
  function openViewer(m, s) { vm = m; vs = s || 1; showSlide(); if (!dlg.open) dlg.showModal(); }
  function step(d) { vs = Math.max(1, Math.min(COUNTS[vm - 1], vs + d)); showSlide(); }
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  document.addEventListener('keydown', function (e) {
    if (!dlg.open) return;
    if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1);
  });

  /* ───────── Eventos ───────── */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-action]'); if (!t) return;
    var a = t.dataset.action, m = +t.dataset.m, s = +t.dataset.s;
    if (a === 'profile') { state.profile = t.dataset.v; save(); route(); }
    else if (a === 'goto') { location.hash = '#/modulo/' + m + '/' + s; }
    else if (a === 'next') { state.done[key(m, s)] = true; save(); location.hash = '#/modulo/' + m + '/' + (s + 1); $('#navBar').style.width = totalPct() + '%'; }
    else if (a === 'finish') { state.done[key(m, s)] = true; save(); }
    else if (a === 'toggle-survey') {
      var k = key(m, s); if (state.done[k]) delete state.done[k]; else state.done[k] = true; save(); route();
    }
    else if (a === 'toggle-steps') { var p = $('#steps'); var o = p.classList.toggle('is-open'); t.setAttribute('aria-expanded', o); }
    else if (a === 'viewer-open') openViewer(m, +t.dataset.slide);
    else if (a === 'viewer-close') dlg.close();
    else if (a === 'viewer-prev') step(-1);
    else if (a === 'viewer-next') step(1);
    else if (a === 'reset') { if (confirm('¿Reiniciar tu progreso en este navegador?')) { state = { profile: 'todos', done: {}, last: null }; save(); route(); } }
  });
  $('#navToggle').addEventListener('click', function () {
    var o = $('#navLinks').classList.toggle('is-open'); this.setAttribute('aria-expanded', o);
  });

  route();
})();
