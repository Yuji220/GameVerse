document.addEventListener('DOMContentLoaded', function () {
  // Scroll-Spy untuk Navigasi
  const navLinks = document.querySelectorAll('header nav ul li a');
  const sections = document.querySelectorAll('main section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.href.includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // Smooth Scroll saat klik navigasi
  navLinks.forEach(link => {
    if (link.getAttribute('href').startsWith('#')) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
            behavior: 'smooth'
          });
        }
      });
    }
  });

  // Modal interaksi game
  const modal = document.getElementById('game-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalGenre = document.getElementById('modal-genre');
  const modalDesc = document.getElementById('modal-desc');
  const closeModals = document.querySelectorAll('.close-modal');
  document.querySelectorAll('.game-card').forEach(card => {
    card.querySelector('.btn-detail').addEventListener('click', function () {
      modalTitle.textContent = card.dataset.title;
      modalGenre.textContent = card.dataset.genre;
      modalDesc.textContent = card.dataset.desc;
      modal.style.display = 'flex';
    });
  });

  // Modal daftar member
  const memberModal = document.getElementById('member-modal');
  const openMemberBtn = document.getElementById('open-member-modal');
  openMemberBtn.addEventListener('click', function(e) {
    e.preventDefault();
    memberModal.style.display = 'flex';
    document.getElementById('member-form').reset();
    document.getElementById('member-msg').textContent = '';
  });

  // Tutup semua modal
  closeModals.forEach(btn => {
    btn.onclick = function() {
      btn.closest('.modal').style.display = 'none';
    };
  });
  window.onclick = e => {
    document.querySelectorAll('.modal').forEach(modalEl => {
      if (e.target === modalEl) modalEl.style.display = 'none';
    });
  };

  // Fade-in animasi saat scroll
  const fadeEls = document.querySelectorAll('.game-card');
  const onScroll = () => {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Validasi form member
  const memberForm = document.getElementById('member-form');
  memberForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('member-name').value.trim();
    const email = document.getElementById('member-email').value.trim();
    const pass = document.getElementById('member-pass').value;
    const msg = document.getElementById('member-msg');
    if (name.length < 3) {
      msg.textContent = "Nama minimal 3 karakter.";
      msg.style.color = "#ff4444";
      return;
    }
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      msg.textContent = "Email tidak valid.";
      msg.style.color = "#ff4444";
      return;
    }
    if (pass.length < 6) {
      msg.textContent = "Password minimal 6 karakter.";
      msg.style.color = "#ff4444";
      return;
    }
    msg.textContent = "Pendaftaran berhasil! Selamat bergabung, " + name + "!";
    msg.style.color = "#00ff88";
    setTimeout(() => {
      memberModal.style.display = 'none';
    }, 1500);
  });
});