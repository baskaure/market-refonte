// Scroll fluide avec prise en compte de la nav fixe
const fixedNav = document.querySelector("nav");

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLAnchorElement)) return;

  const href = target.getAttribute("href");
  if (!href || !href.startsWith("#")) return;

  const section = document.querySelector(href);
  if (!section) return;

  event.preventDefault();

  const navHeight = fixedNav ? fixedNav.getBoundingClientRect().height : 0;
  const top =
    section.getBoundingClientRect().top + window.scrollY - navHeight - 12;

  window.scrollTo({ top, behavior: "smooth" });
});

// Animations au scroll (IntersectionObserver)
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback si IntersectionObserver n'est pas supporté
  revealElements.forEach((el) => el.classList.add("reveal-visible"));
}

// Gestion des étapes du processus interactif
let currentProcessStep = 1;
const totalProcessSteps = 3;

function updateProcessStep(step) {
  currentProcessStep = step;

  // Mettre à jour les indicateurs
  document.querySelectorAll('.process-indicator').forEach((indicator, index) => {
    if (index + 1 === step) {
      indicator.classList.remove('inactive');
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
      indicator.classList.add('inactive');
    }
  });

  // Mettre à jour le contenu
  document.querySelectorAll('.process-step-content').forEach(content => {
    content.classList.remove('active');
  });
  const activeContent = document.querySelector(`[data-content="${step}"]`);
  if (activeContent) {
    activeContent.classList.add('active');
  }
}

// Event listeners pour les indicateurs d'étapes
document.addEventListener('DOMContentLoaded', () => {
  const indicators = document.querySelectorAll('.process-indicator');
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const step = parseInt(indicator.dataset.step);
      if (step) {
        updateProcessStep(step);
      }
    });
  });
  
  // Initialiser avec l'étape 1
  if (indicators.length > 0) {
    updateProcessStep(1);
  }
});

// Navigation au clavier pour les étapes
document.addEventListener('keydown', (e) => {
  const processSection = document.getElementById('process');
  if (!processSection) return;
  
  const rect = processSection.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;
  
  if (!isInView) return;
  
  if (e.key === 'ArrowRight' && currentProcessStep < totalProcessSteps) {
    updateProcessStep(currentProcessStep + 1);
  } else if (e.key === 'ArrowLeft' && currentProcessStep > 1) {
    updateProcessStep(currentProcessStep - 1);
  }
});

// Modal vidéo Google Drive – l’ID se met sur chaque .video-preview en data-drive-id
function playVideoFromCard(el) {
  const fileId = el && el.getAttribute('data-drive-id');
  if (!fileId || fileId.startsWith('REMPLACER')) return;
  const iframe = document.getElementById('video-modal-iframe');
  const modal = document.getElementById('video-modal');
  iframe.src = 'https://drive.google.com/file/d/' + fileId + '/preview';
  modal.classList.add('video-modal-open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-modal-iframe');
  modal.classList.remove('video-modal-open');
  iframe.src = '';
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeVideoModal();
});
