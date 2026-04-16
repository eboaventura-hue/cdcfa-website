/* ════════════════════════════════════════════════════════
   CDCFA / Friendship Academies — Main JavaScript
   Cloudflare Pages · /app.js
   ════════════════════════════════════════════════════════ */

/* ─────────────────────────────────
   PAGE NAVIGATION
───────────────────────────────── */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initReveals, 80);
}

function navTo(sectionId) {
  const home = document.getElementById('page-home');
  if (!home.classList.contains('active')) {
    showPage('home');
    setTimeout(() => scrollToSection(sectionId), 320);
  } else {
    scrollToSection(sectionId);
  }
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─────────────────────────────────
   APPLY PAGE — TAB SWITCHING
───────────────────────────────── */
function switchTab(name, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.apply-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
}

/* ─────────────────────────────────
   HERO CAROUSEL
───────────────────────────────── */
const CAROUSEL_TOTAL    = 9;
const CAROUSEL_INTERVAL = 5000; // ms between auto-slides
let carIdx   = 0;
let carTimer = null;

function carRender() {
  document.getElementById('carousel-track').style.transform =
    `translateX(-${carIdx * 100}%)`;

  document.querySelectorAll('.carousel__dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === carIdx);
  });
}

function carMove(dir) {
  carIdx = (carIdx + dir + CAROUSEL_TOTAL) % CAROUSEL_TOTAL;
  carRender();
  carResetTimer();
}

function carGo(idx) {
  carIdx = idx;
  carRender();
  carResetTimer();
}

function carResetTimer() {
  clearInterval(carTimer);
  carTimer = setInterval(() => carMove(1), CAROUSEL_INTERVAL);
}

/* ─────────────────────────────────
   NAVBAR SHADOW ON SCROLL
───────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 20
      ? '0 4px 24px rgba(124,58,237,.18)'
      : '0 2px 16px rgba(124,58,237,.08)';
});

/* ─────────────────────────────────
   SCROLL REVEAL
───────────────────────────────── */
function initReveals() {
  const els = document.querySelectorAll('[data-reveal]:not(.is-visible)');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}

/* ─────────────────────────────────
   ADD CHILD BLOCK (Apply form)
───────────────────────────────── */
let childCount = 1;
const childEmojis = ['👦', '👧', '🧒', '👦', '👧'];

function addChild() {
  if (childCount >= 6) return;
  childCount++;
  const el = document.createElement('div');
  el.className = 'child-block';
  el.innerHTML = `
    <div class="child-block__label">Child #${childCount} ${childEmojis[childCount - 2]}</div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-group__label">Full Name</label>
        <input class="form-group__input" type="text" placeholder="Child's full name">
      </div>
      <div class="form-group">
        <label class="form-group__label">Date of Birth</label>
        <input class="form-group__input" type="date">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-group__label">Gender</label>
        <select class="form-group__select">
          <option>Select…</option><option>Male</option>
          <option>Female</option><option>Non-binary / Other</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-group__label">Primary Language</label>
        <input class="form-group__input" type="text" placeholder="e.g. English, Spanish">
      </div>
    </div>
    <div class="form-group">
      <label class="form-group__label">Service Requested</label>
      <select class="form-group__select">
        <option value="">Select…</option>
        <option>Full Day Care</option>
        <option>Part Day — 3hr Preschool Enrichment</option>
        <option>After-School Care</option>
      </select>
    </div>
  `;
  document.getElementById('children-container').appendChild(el);
}

/* ─────────────────────────────────
   FORM SUBMISSIONS
───────────────────────────────── */
function submitContact(e) {
  e.preventDefault();
  document.querySelectorAll(
    '#contact-form-box input, #contact-form-box select, #contact-form-box textarea, #contact-form-box button'
  ).forEach(el => el.disabled = true);
  document.getElementById('contact-success').style.display = 'block';
}

function submitApply(e) {
  e.preventDefault();
  document.querySelectorAll(
    '#apply-form-wrap input, #apply-form-wrap select, #apply-form-wrap textarea, #apply-form-wrap button'
  ).forEach(el => el.disabled = true);
  const s = document.getElementById('apply-success');
  s.style.display = 'block';
  s.scrollIntoView({ behavior: 'smooth' });
}

/* ─────────────────────────────────
   INIT ON DOM READY
───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initReveals();
  carResetTimer();
});
