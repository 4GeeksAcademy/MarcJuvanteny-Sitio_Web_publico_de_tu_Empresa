(function () {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');

  const fields = {
    fullName: {
      el: document.getElementById('fullName'),
      validate: (v) => {
        if (!v.trim()) return 'El nombre completo es obligatorio.';
        if (v.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
        return '';
      }
    },
    company: {
      el: document.getElementById('company'),
      validate: (v) => {
        if (!v) return '';
        if (v.trim().length < 2) return 'El nombre de empresa es demasiado corto.';
        return '';
      }
    },
    email: {
      el: document.getElementById('email'),
      validate: (v) => {
        if (!v.trim()) return 'El email es obligatorio.';
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        return ok ? '' : 'Introduce un email valido, por ejemplo nombre@dominio.com.';
      }
    },
    phone: {
      el: document.getElementById('phone'),
      validate: (v) => {
        if (!v.trim()) return 'El telefono es obligatorio.';
        const digits = v.replace(/[^\d+]/g, '');
        if (digits.length < 9) return 'El telefono debe tener al menos 9 digitos.';
        return '';
      }
    },
    shipmentType: {
      el: document.getElementById('shipmentType'),
      validate: (v) => (v ? '' : 'Selecciona el tipo de servicio.')
    },
    origin: {
      el: document.getElementById('origin'),
      validate: (v) => (v.trim() ? '' : 'Indica el origen del envio.')
    },
    destination: {
      el: document.getElementById('destination'),
      validate: (v) => (v.trim() ? '' : 'Indica el destino del envio.')
    },
    pickupDate: {
      el: document.getElementById('pickupDate'),
      validate: (v) => {
        if (!v) return 'Selecciona la fecha de recogida.';
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(v + 'T00:00:00');
        return selected < today ? 'La fecha de recogida no puede ser anterior a hoy.' : '';
      }
    },
    weight: {
      el: document.getElementById('weight'),
      validate: (v) => {
        if (!v) return 'El peso es obligatorio.';
        const n = Number(v);
        if (!Number.isFinite(n) || n <= 0) return 'El peso debe ser mayor que 0.';
        if (n > 1000) return 'Para mas de 1000 kg, solicita gestion especializada.';
        return '';
      }
    },
    packages: {
      el: document.getElementById('packages'),
      validate: (v) => {
        if (!v) return 'Indica la cantidad de paquetes.';
        const n = Number(v);
        if (!Number.isInteger(n) || n < 1) return 'La cantidad minima es 1 paquete.';
        return '';
      }
    },
    fragile: {
      el: document.getElementById('fragile'),
      validate: (v) => (v ? '' : 'Indica si la mercancia es fragil.')
    },
    insurance: {
      el: document.getElementById('insurance'),
      validate: (v) => (v ? '' : 'Selecciona una opcion de seguro.')
    },
    notes: {
      el: document.getElementById('notes'),
      validate: (v) => (v.length > 500 ? 'El maximo permitido es 500 caracteres.' : '')
    },
    privacy: {
      el: document.getElementById('privacy'),
      validate: (_, el) => (el.checked ? '' : 'Debes aceptar la politica de privacidad.')
    }
  };

  function setFieldState(fieldName, message) {
    const field = fields[fieldName];
    if (!field || !field.el) return;

    const errorEl = document.getElementById('error-' + fieldName);
    if (!errorEl) return;

    errorEl.textContent = message;

    if (message) {
      field.el.classList.add('border-red-400', 'ring-2', 'ring-red-400/30');
      field.el.classList.remove('border-sky/30');
      field.el.setAttribute('aria-invalid', 'true');
    } else {
      field.el.classList.remove('border-red-400', 'ring-2', 'ring-red-400/30');
      field.el.classList.add('border-sky/30');
      field.el.setAttribute('aria-invalid', 'false');
    }
  }

  function validateField(fieldName) {
    const field = fields[fieldName];
    if (!field || !field.el) return true;

    const value = field.el.type === 'checkbox' ? field.el.checked : field.el.value;
    const message = field.validate(value, field.el);
    setFieldState(fieldName, message);
    return message === '';
  }

  function validateForm() {
    let ok = true;
    Object.keys(fields).forEach((name) => {
      if (!validateField(name)) ok = false;
    });
    return ok;
  }

  Object.keys(fields).forEach((name) => {
    const field = fields[name];
    if (!field || !field.el) return;

    const handler = () => validateField(name);
    field.el.addEventListener('input', handler);
    field.el.addEventListener('blur', handler);
    field.el.addEventListener('change', handler);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      statusEl.textContent = 'No se puede enviar: revisa los campos marcados en rojo.';
      statusEl.classList.remove('border-sky/30', 'text-sky');
      statusEl.classList.add('border-red-400/40', 'text-red-200', 'bg-red-900/30');

      const firstError = form.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.focus();
      return;
    }

    statusEl.textContent = 'Solicitud enviada correctamente. En breve recibiras tu presupuesto estimado por email.';
    statusEl.classList.remove('border-red-400/40', 'text-red-200', 'bg-red-900/30');
    statusEl.classList.add('border-emerald-400/40', 'text-emerald-200', 'bg-emerald-900/20');
  });

  form.addEventListener('reset', () => {
    window.setTimeout(() => {
      Object.keys(fields).forEach((name) => setFieldState(name, ''));
      statusEl.textContent = 'Completa los campos para validar y generar tu solicitud.';
      statusEl.classList.remove('border-red-400/40', 'text-red-200', 'bg-red-900/30', 'border-emerald-400/40', 'text-emerald-200', 'bg-emerald-900/20');
      statusEl.classList.add('border-sky/30', 'text-sky', 'bg-navy/60');
    }, 0);
  });
})();
