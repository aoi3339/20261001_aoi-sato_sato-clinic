const yearButtons = document.querySelectorAll('.archive-year-button');
const yearSections = document.querySelectorAll('.archive-year-section');

// All years remain visible when JavaScript is unavailable.
function selectYear(year) {
  yearButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.year === year));
  });
  yearSections.forEach((section) => {
    section.hidden = section.dataset.year !== year;
  });
}

yearButtons.forEach((button) => {
  button.addEventListener('click', () => selectYear(button.dataset.year));
});
selectYear('2026');
