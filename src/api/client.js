const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function get(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    const error = new Error(`Errore durante il caricamento di ${path}`);
    error.status = res.status;
    throw error;
  }
  return res.json();
}

function toQuery(params) {
  const entries = Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '');
  if (entries.length === 0) return '';
  return `?${new URLSearchParams(entries).toString()}`;
}

export function getProjects(params = {}) {
  return get(`/api/projects${toQuery(params)}`);
}

export function getProject(slug) {
  return get(`/api/projects/${encodeURIComponent(slug)}`);
}

export function getServices() {
  return get('/api/services');
}

export function getTechnologies(params = {}) {
  return get(`/api/technologies${toQuery(params)}`);
}

export function getExperiences() {
  return get('/api/experiences');
}

export function getTestimonials() {
  return get('/api/testimonials');
}

export function getSiteSettings() {
  return get('/api/site-settings');
}

export async function submitContactForm(payload) {
  const res = await fetch(`${API_URL}/contatti`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(json.message || "Errore durante l'invio del messaggio.");
    error.errors = json.errors;
    throw error;
  }

  return json;
}

export { API_URL };

export async function submitTestimonial(payload) {
  const res = await fetch(`${API_URL}/api/testimonials`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(
      res.status === 429
        ? 'Hai inviato troppe richieste, riprova tra qualche minuto.'
        : json.message || "Errore durante l'invio della testimonianza."
    );
    error.errors = json.errors;
    throw error;
  }

  return json;
}
