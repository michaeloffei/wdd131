// --- Utilities ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// --- Header: hamburger toggle ---
function initNavToggle(){
  const btn = $('#menu-toggle') || document.querySelector('.hamburger');
  const nav = document.getElementById('main-nav') || $('#main-nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'block';
  });
}

// --- Footer: year & last modified ---
function initFooterDates(){
  const yearEl = $('#year');
  const lastEl = $('#last-modified') || $('#last-modified') || $('#lastModified') || $('#last-modified');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  const lm = document.getElementById('last-modified');
  if(lm) lm.textContent = document.lastModified ? document.lastModified : '';
  // keep compatibility for different id names
  const commonIds = ['last-modified', 'lastModified', 'lastModified'];
  commonIds.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = document.lastModified;
  });
}

// --- Testimonials: store in localStorage, render and manage ---
function testimonialsModule(){
  const container = $('#testimonials-container');
  const form = document.getElementById('testimonial-form');
  const clearBtn = $('#clear-feedback');
  const STORAGE_KEY = 'prima_testimonials_v1';

  // array of testimonial objects {name, text, date}
  function load(){
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function save(arr){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }

  function render(){
    if(!container) return;
    const items = load();
    if(items.length === 0){
      container.innerHTML = '<p>No feedback yet. Be the first to leave feedback!</p>';
      return;
    }
    container.innerHTML = items.map(t => {
      // exclusively use template literals for output
      return `<div class="testimonial"><strong>${escapeHtml(t.name)}</strong><p>${escapeHtml(t.text)}</p><small>${new Date(t.date).toLocaleString()}</small></div>`;
    }).join('');
  }

  function addTestimonial(name, text){
    const items = load();
    const newItem = { name: name.trim(), text: text.trim(), date: new Date().toISOString() };
    items.unshift(newItem);
    save(items);
    render();
  }

  function clearAll(){
    localStorage.removeItem(STORAGE_KEY);
    render();
  }

  // simple html escape to avoid injection
  function escapeHtml(str){
    return str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  // form listener
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.patientName ? form.patientName.value : document.getElementById('patient-name')?.value || document.getElementById('fullname')?.value;
      const text = form.testimonialText ? form.testimonialText.value : document.getElementById('testimonial-text')?.value || document.getElementById('message')?.value;
      if(!name || !text){
        alert('Please provide name and feedback');
        return;
      }
      addTestimonial(name, text);
      form.reset();
    });
  }

  if(clearBtn){
    clearBtn.addEventListener('click', () => {
      if(confirm('Clear all saved feedback?')) clearAll();
    });
  }

  // initial render
  render();

  // expose for debugging if needed
  return { load, save, render, addTestimonial, clearAll };
}

// --- Contact form: validate and store last-submission in localStorage ---
function contactFormModule(){
  const form = $('#contact-form');
  if(!form) return;
  const STATUS = $('#form-status');

  function validateFormData(data){
    // basic branching: check required fields
    if(!data.fullname || data.fullname.trim().length < 2) return 'Please enter your full name';
    if(!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) return 'Please enter a valid email';
    if(!data.phone || data.phone.trim().length < 7) return 'Please enter a valid phone';
    return '';
  }

  function saveSubmission(data){
    localStorage.setItem('prima_last_contact', JSON.stringify({ data, savedAt: new Date().toISOString() }));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      reason: form.reason.value,
      message: form.message.value
    };
    const err = validateFormData(data);
    if(err){
      if(STATUS) STATUS.textContent = err;
      return;
    }
    // simulate send (no network) — store locally
    saveSubmission(data);
    if(STATUS) STATUS.textContent = 'Your request has been saved locally. Thank you!';
    form.reset();
  });

  // prefill if last submission exists
  const last = localStorage.getItem('prima_last_contact');
  if(last){
    try{
      const obj = JSON.parse(last);
      // prefill form fields if present
      if(form.fullname) form.fullname.value = obj.data.fullname || '';
      if(form.email) form.email.value = obj.data.email || '';
      if(form.phone) form.phone.value = obj.data.phone || '';
      if(form.reason) form.reason.value = obj.data.reason || '';
      if(form.message) form.message.value = obj.data.message || '';
    }catch(e){}
  }
}

// --- Lazy loading helper (IntersectionObserver fallback) ---
function initLazyLoading(){
  const lazyImages = Array.from(document.querySelectorAll('img[loading="lazy"]'));
  if('loading' in HTMLImageElement.prototype){
    // browser supports native lazy loading: nothing to do
    return;
  }
  // polyfill with IntersectionObserver
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          const img = entry.target;
          const src = img.dataset.src;
          if(src){
            img.src = src;
          }
          obs.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => {
      // set data-src if not present
      if(!img.dataset.src) img.dataset.src = img.src;
      img.src = ''; // blank until loaded
      io.observe(img);
    });
  } else {
    // fallback: load all images
    lazyImages.forEach(img => {
      if(!img.dataset.src) img.dataset.src = img.src;
      img.src = img.dataset.src;
    });
  }
}

// --- Init on DOM ready (deferred script will run after parse anyway) ---
function init(){
  initNavToggle();
  initFooterDates();
  testimonialsModule();
  contactFormModule();
  initLazyLoading();
}
document.addEventListener('DOMContentLoaded', init);
