document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        generateTable();
        saveFormData();
    });

    function generateTable() {

        const days = document.getElementById('days').value;
        const maxClasses = document.getElementById('maxClasses').value;
        const language = document.getElementById('language').value;

        const table = document.createElement('table');
        table.classList.add('schedule-table');
        const topCorner = document.createElement('th');
        topCorner.setAttribute('rowspan', '1');
        topCorner.textContent = (language === 'ru') ? 'Занятия' : 'Classes';

        const headerRow = document.createElement('tr');
        headerRow.appendChild(topCorner);
        for (let i = 1; i <= days; i++) {
            const dayHeader = document.createElement('th');
            dayHeader.textContent = (language === 'ru') ? `День ${i}` : `Day ${i}`;
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
                cell.textContent = ''; // Содержимое ячеек оставляем пустыми
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        tableContainer.appendChild(table);
    }

    function saveFormData() {
        const formData = {
            days: document.getElementById('days').value,
            maxClasses: document.getElementById('maxClasses').value,
            language: document.getElementById('language').value
        };
        localStorage.setItem('scheduleFormData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('scheduleFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            document.getElementById('days').value = formData.days;
            document.getElementById('maxClasses').value = formData.maxClasses;
            document.getElementById('language').value = formData.language;
        }
    }

    loadFormData();
});
