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

document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos las listas donde los elementos serán arrastrados
  const sortableList = document.querySelectorAll(".sortable-list");

  sortableList.forEach(list => {
    const items = list.querySelectorAll(".item");

    // Añadir eventos para iniciar y finalizar el arrastre
    items.forEach(item => {
      item.addEventListener("dragstart", () => {
        // Después de un breve retraso, se agrega la clase 'dragging' al item que se está arrastrando
        setTimeout(() => item.classList.add("dragging"), 0);
      });

      item.addEventListener("dragend", () => {
        // Al finalizar el arrastre, se elimina la clase 'dragging'
        item.classList.remove("dragging");
      });
    });

    // Establecemos el comportamiento al arrastrar sobre la lista
    list.addEventListener("dragover", (e) => {
      e.preventDefault(); // Necesario para permitir el arrastre
      const draggingItem = document.querySelector(".dragging");
      let siblings = [...list.querySelectorAll(".item:not(.dragging)")];

      // Encuentra el hermano más cercano al item que se está arrastrando
      let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
      });

      // Inserta el item arrastrado antes del hermano encontrado
      list.insertBefore(draggingItem, nextSibling);
    });

    // Evitamos que el arrastre se detenga por algún error de compatibilidad en algunos navegadores
    list.addEventListener("dragenter", (e) => e.preventDefault());
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Asegúrate de que xp es un valor numérico válido
  const xp = parseInt("{{ xp }}"); // Convierte el valor a un número, si es necesario
  const progressBar = document.getElementById("progressBar");
  
  // Establecer el valor de la barra de progreso
  if (progressBar) {
    progressBar.value = xp;
  }
});




