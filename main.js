/* Phurba Geljen Sherpa — Main JS */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWorkTabs();
  initReveal();
  initLightbox();
  initContactForm();
});

/* ---- Navbar scroll & mobile toggle ---- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ---- Work page tabs ---- */
function initWorkTabs() {
  const tabs = document.querySelectorAll('.work-tab');
  const panels = document.querySelectorAll('.work-panel');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.panel;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // Open tab from URL hash
  const hash = window.location.hash.replace('#', '');
  if (hash === 'filmmaking' || hash === 'trekking') {
    const tab = document.querySelector(`[data-panel="${hash}"]`);
    tab?.click();
  }
}

/* ---- Scroll reveal ---- */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}

/* ---- Photo lightbox ---- */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', close);
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

/* ---- Contact form → WhatsApp ---- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const phone = '9779803716195';

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !message) {
      alert('Please fill in your name and message.');
      return;
    }

    const text = encodeURIComponent(
      `Hello Phurba,\n\nMy name is ${name}.${email ? `\nEmail: ${email}` : ''}\n\n${message}`
    );

    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  });
}
