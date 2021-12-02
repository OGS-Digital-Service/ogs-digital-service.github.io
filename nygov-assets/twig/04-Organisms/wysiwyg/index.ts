import "./wysiwyg.scss";

function checkForDoubleHeaderTable() {

  const tables = document.querySelectorAll('.o-wysiwyg table');
  if (tables.length === 0) return;

  for(let i = 0; i < tables.length; i++) {
    const table = tables[i].querySelector('tbody tr th');
    if (!table) continue;
    const firstHeader = tables[i].querySelector('thead tr th:first-child');
    if (!firstHeader) continue;
    firstHeader.classList.add('double-header-column');
  }
}

checkForDoubleHeaderTable()