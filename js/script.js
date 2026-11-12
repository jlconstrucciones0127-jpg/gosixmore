/* ═══════════════════════════════════════════════════════════
   GO SIX MORE — Script principal
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------
     1) SONIDO DE BIENVENIDA
     -------------------------------------------------------- */
  const overlay   = document.getElementById('overlay-bienvenida');
  const btnEntrar = document.getElementById('btn-entrar');
  const audio     = document.getElementById('sonido-entrada');

  if (overlay && btnEntrar && audio) {
    audio.volume = 0.5;

    // Si ya entró en esta sesión, quitar el overlay sin sonido
    const yaEntro = sessionStorage.getItem('gosixmore-entrado') === 'true';

    if (yaEntro) {
      overlay.remove();
    } else {
      btnEntrar.addEventListener('click', () => {
        audio.play()
          .then(() => {
            sessionStorage.setItem('gosixmore-entrado', 'true');
          })
          .catch(err => console.warn('No se pudo reproducir el audio:', err));

        overlay.classList.add('oculto');
        setTimeout(() => overlay.remove(), 600);
      });

      // Bonus: también entrar con Enter / Espacio
      document.addEventListener('keydown', function entrarConTecla(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          btnEntrar.click();
          document.removeEventListener('keydown', entrarConTecla);
        }
      });
    }
  }

  /* --------------------------------------------------------
     2) PESTAÑAS DE SERVICIOS
     -------------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Quitar "active" de todos
      tabContents.forEach(c => c.classList.remove('active'));
      tabButtons.forEach(b => b.classList.remove('active'));

      // Activar el seleccionado
      const target = document.getElementById(targetId);
      if (target) target.classList.add('active');
      btn.classList.add('active');
    });
  });

});