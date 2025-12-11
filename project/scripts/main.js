// --- Utilities ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// --- Header: hamburger toggle ---
function initNavToggle(){
  const btn = $('#menu-toggle');
  const nav = $('#main-nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    btn.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
    nav.style.display = expanded ? 'none' : 'block';
  });
}

// --- Footer: year & last modified ---
function initFooterDates(){
  const yearEl = $('#year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const lm = $('#last-modified');
  if(lm) lm.textContent = document.lastModified;
}

// --- Testimonials: store in localStorage, render and manage ---
function testimonialsModule(){
  const container = $('#testimonials-container');
  const form = $('#testimonial-form');
  const clearBtn = $('#clear-feedback');
  const STORAGE_KEY = 'prima_testimonials_v1';

  function load(){ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  function save(arr){ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

  function escapeHtml(str){
    const ESC_MAP = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
    return str.replace(/[&<>"']/g, m => ESC_MAP[m]);
  }

  function render(){
    if(!container) return;
    const items = load();
    container.innerHTML = items.length === 0
      ? `
        <p>No feedback yet. Be the first to leave feedback!</p>
      `
      : items.map(t => `<div class="testimonial"><strong>${escapeHtml(t.name)}</strong><p>${escapeHtml(t.text)}</p><small>${new Date(t.date).toLocaleString()}</small></div>`).join('');
  }

  function addTestimonial(name, text){
    const items = load();
    items.unshift({ name: name.trim(), text: text.trim(), date: new Date().toISOString() });
    save(items);
    render();
  }

  function clearAll(){
    localStorage.removeItem(STORAGE_KEY);
    render();
  }

  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.patientName.value;
      const text = form.testimonialText.value;
      if(!name || !text){ alert('Please provide name and feedback'); return; }
      addTestimonial(name, text);
      form.reset();
    });
  }

  if(clearBtn){
    clearBtn.addEventListener('click', () => {
      if(confirm('Clear all saved feedback?')) clearAll();
    });
  }

  render();
  return { load, save, render, addTestimonial, clearAll };
}

// --- Contact form handling (basic client-side validation + status message) ---
function contactFormModule(){
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if(!form || !status) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullname = form.fullname?.value?.trim() || '';
    const email = form.email?.value?.trim() || '';
    const phone = form.phone?.value?.trim() || '';
    const reason = form.reason?.value || '';
    // basic validation
    if(!fullname || !email || !phone || !reason){
      status.textContent = `Please complete all required fields before submitting.`;
      status.classList.add('error');
      return;
    }
    status.textContent = `Thanks ${fullname.split(' ')[0]} — your request was received. We will contact you shortly.`;
    status.classList.remove('error');
    form.reset();
  });
}

// --- Lazy loading helper ---
function initLazyLoading(){
  const lazyImages = $$('img[loading="lazy"]');
  if('loading' in HTMLImageElement.prototype) return; // native supported
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const img = entry.target;
          if(img.dataset.src) img.src = img.dataset.src;
          obs.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => {
      if(!img.dataset.src) img.dataset.src = img.src;
      io.observe(img);
    });
  } else {
    lazyImages.forEach(img => { if(!img.dataset.src) img.dataset.src = img.src; img.src = img.dataset.src; });
  }
}

// --- Init on DOM ready ---
function init(){
  initNavToggle();
  initFooterDates();
  testimonialsModule();
  initLazyLoading();
  contactFormModule();
}
document.addEventListener('DOMContentLoaded', init);
