// Toggle sidebar on mobile
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Init Swiper if present
if (document.querySelector('.capsule-swiper')) {
  const swiper = new Swiper('.capsule-swiper', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: false,
  });
}

// Modal logic (present if lesson2)
const modal = document.getElementById('confirmModal');
if (modal) {
  const openButtons = document.querySelectorAll('.open-modal');
  const cancelBtn = document.getElementById('cancelModal');
  openButtons.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
  }));
  cancelBtn?.addEventListener('click', () => modal.classList.remove('active'));
}