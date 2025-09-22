document.addEventListener("DOMContentLoaded", function () {
  AOS.init();
});

function showTab(tabId, event) {
  // Remove todas as classes 'active' e 'aria-selected'
  document.querySelectorAll('.nav-button, .dropdown-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-button').forEach(el => el.setAttribute('aria-selected', 'false'));
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

  // Ativa a aba correspondente
  document.getElementById(tabId).classList.add('active');

  if (event && event.target) {
    event.target.classList.add('active');
    event.target.setAttribute('aria-selected', 'true');

    // Encontra o dropdown-toggle mais próximo do item clicado
    const dropdownToggle = event.target.closest('.dropdown')?.querySelector('.dropdown-toggle');
    if (dropdownToggle) {
      dropdownToggle.classList.add('active');
    }

    // Remove 'active' de outros dropdowns
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      if (toggle !== dropdownToggle) {
        toggle.classList.remove('active');
      }
    });
  }
}

// Controle de hover para dropdown
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');

  dropdown.addEventListener('mouseleave', () => {
    const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
    if (bsDropdown) {
      bsDropdown.hide();
      dropdownToggle.classList.remove('active');
    }
  });

  dropdown.addEventListener('mouseenter', () => {
    const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(dropdownToggle);
    bsDropdown.show();
  });
});
