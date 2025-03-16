document.addEventListener('DOMContentLoaded', () => {
    const heroTable = document.getElementById('heroTable').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('search');
    const pageSizeSelect = document.getElementById('pageSize');
    let heroes = [];
    let currentPage = 1;
    let pageSize = parseInt(pageSizeSelect.value);
    let sortColumn = 'name';
    let sortAscending = true;

    const loadData = (data) => {
        heroes = data;
        renderTable();
    };

    const fetchHeroes = () => {
        fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
            .then(response => response.json())
            .then(loadData);
    };

    const renderTable = () => {
        const filteredHeroes = heroes.filter(hero => hero.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        const sortedHeroes = filteredHeroes.sort((a, b) => {
            let aValue = a[sortColumn];
            let bValue = b[sortColumn];
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            if (sortAscending) {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        const start = (currentPage - 1) * pageSize;
        const end = pageSize === 'all' ? sortedHeroes.length : start + pageSize;
        const heroesToDisplay = sortedHeroes.slice(start, end);

        heroTable.innerHTML = '';
        heroesToDisplay.forEach(hero => {
            const row = heroTable.insertRow();
            row.insertCell().innerHTML = `<img src="${hero.images.xs}" alt="${hero.name}">`;
            row.insertCell().textContent = hero.name;
            row.insertCell().textContent = hero.biography.fullName;
            row.insertCell().textContent = hero.powerstats.intelligence;
            row.insertCell().textContent = hero.powerstats.strength;
            row.insertCell().textContent = hero.powerstats.speed;
            row.insertCell().textContent = hero.powerstats.durability;
            row.insertCell().textContent = hero.powerstats.power;
            row.insertCell().textContent = hero.powerstats.combat;
            row.insertCell().textContent = hero.appearance.race;
            row.insertCell().textContent = hero.appearance.gender;
            row.insertCell().textContent = hero.appearance.height.join(', ');
            row.insertCell().textContent = hero.appearance.weight.join(', ');
            row.insertCell().textContent = hero.biography.placeOfBirth;
            row.insertCell().textContent = hero.biography.alignment;
        });
    };

    searchInput.addEventListener('input', renderTable);
    pageSizeSelect.addEventListener('change', () => {
        pageSize = pageSizeSelect.value === 'all' ? 'all' : parseInt(pageSizeSelect.value);
        currentPage = 1;
        renderTable();
    });

    document.querySelectorAll('th').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.getAttribute('data-column');
            if (sortColumn === column) {
                sortAscending = !sortAscending;
            } else {
                sortColumn = column;
                sortAscending = true;
            }
            renderTable();
        });
    });

    fetchHeroes();
});