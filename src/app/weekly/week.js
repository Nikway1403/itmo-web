document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const days = form.get('days');
        const maxClasses = form.get('maxClasses');
        const lang = form.get('language');
        generateTable(days, maxClasses, lang);
        saveFormData(days, maxClasses, lang);
    });

    function generateTable(days, maxClasses, lang) {
        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('schedule-table');
        const topCorner = document.createElement('th');
        topCorner.setAttribute('rowspan', '1');
        topCorner.textContent = (lang === 'ru') ? 'Занятия' : 'Classes';

        const headerRow = document.createElement('tr');
        headerRow.appendChild(topCorner);
        for (let i = 1; i <= days; i++) {
            const dayHeader = document.createElement('th');
            dayHeader.textContent = (lang === 'ru') ? `День ${i}` : `Day ${i}`;
            headerRow.appendChild(dayHeader);
        }
        table.appendChild(headerRow);

        for (let i = 1; i <= maxClasses; i++) {
            const row = document.createElement('tr');
            const classNumberCell = document.createElement('td');
            classNumberCell.textContent = i;
            row.appendChild(classNumberCell);

            for (let j = 0; j < days; j++) {
                const cell = document.createElement('td');
                cell.textContent = '';
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        tableContainer.appendChild(table);
    }

    function saveFormData(days, maxClasses, lang) {
        const formData = { days, maxClasses, lang };
        localStorage.setItem('scheduleFormData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('scheduleFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            generateTable(formData.days, formData.maxClasses, formData.lang);

            document.getElementById('days').value = formData.days;
            document.getElementById('maxClasses').value = formData.maxClasses;
            document.getElementById('language').value = formData.language;
        }
    }

    loadFormData();
});
