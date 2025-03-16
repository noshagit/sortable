document.addEventListener('DOMContentLoaded', () => {
    const heroTable = document.getElementById('heroTable').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('search');
    const pageSizeSelect = document.getElementById('pageSize');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
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

    const updateURL = () => {
        const params = new URLSearchParams();
        params.set('search', searchInput.value);
        params.set('page', currentPage);
        params.set('pageSize', pageSize);
        params.set('sortColumn', sortColumn);
        params.set('sortAscending', sortAscending);
        history.replaceState(null, '', '?' + params.toString());
    };

    const renderTable = () => {
        const filteredHeroes = heroes.filter(hero => hero.name.toLowerCase().includes(searchInput.value.toLowerCase()));
        const sortedHeroes = filteredHeroes.sort((a, b) => {
            let aValue, bValue;
    
            switch (sortColumn) {
                case 'fullName':
                    aValue = a.biography.fullName;
                    bValue = b.biography.fullName;
                    break;
                case 'intelligence':
                    aValue = a.powerstats.intelligence;
                    bValue = b.powerstats.intelligence;
                    break;
                case 'strength':
                    aValue = a.powerstats.strength;
                    bValue = b.powerstats.strength;
                    break;
                case 'speed':
                    aValue = a.powerstats.speed;
                    bValue = b.powerstats.speed;
                    break;
                case 'durability':
                    aValue = a.powerstats.durability;
                    bValue = b.powerstats.durability;
                    break;
                case 'power':
                    aValue = a.powerstats.power;
                    bValue = b.powerstats.power;
                    break;
                case 'combat':
                    aValue = a.powerstats.combat;
                    bValue = b.powerstats.combat;
                    break;
                case 'race':
                    aValue = a.appearance.race;
                    bValue = b.appearance.race;
                    break;
                case 'gender':
                    aValue = a.appearance.gender;
                    bValue = b.appearance.gender;
                    break;
                case 'height':
                    aValue = parseFloat(a.appearance.height[0]) || 0;
                    bValue = parseFloat(b.appearance.height[0]) || 0;
                    break;
                case 'weight':
                    aValue = parseFloat(a.appearance.weight.find(w => w.includes('lb'))?.split(' ')[0]) || 0;
                    bValue = parseFloat(b.appearance.weight.find(w => w.includes('lb'))?.split(' ')[0]) || 0;
                    break;
                case 'placeOfBirth':
                    aValue = a.biography.placeOfBirth;
                    bValue = b.biography.placeOfBirth;
                    break;
                case 'alignment':
                    aValue = a.biography.alignment;
                    bValue = b.biography.alignment;
                    break;
                default:
                    aValue = a.name;
                    bValue = b.name;
            }
    
            const specialValues = ["-", "null", "- lb", "", " ", "None", "null lbs", "null cm", null];
            const aIsSpecial = specialValues.includes(aValue);
            const bIsSpecial = specialValues.includes(bValue);
    
            if (aIsSpecial && !bIsSpecial) return 1;
            if (!aIsSpecial && bIsSpecial) return -1;
    
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
            row.addEventListener('click', () => {
                window.location.href = `advanced.html?heroId=${hero.id}`;
            });
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

        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredHeroes.length / pageSize)}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === Math.ceil(filteredHeroes.length / pageSize);

        updateURL();
    };

    const loadFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        searchInput.value = params.get('search') || '';
        currentPage = parseInt(params.get('page')) || 1;
        pageSize = params.get('pageSize') === 'all' ? 'all' : parseInt(params.get('pageSize')) || 20;
        sortColumn = params.get('sortColumn') || 'name';
        sortAscending = params.get('sortAscending') === 'true' || params.get('sortAscending') === null;
        pageSizeSelect.value = pageSize;
    };

    searchInput.addEventListener('input', () => {
        currentPage = 1;
        renderTable();
    });

    pageSizeSelect.addEventListener('change', () => {
        pageSize = pageSizeSelect.value === 'all' ? 'all' : parseInt(pageSizeSelect.value);
        currentPage = 1;
        renderTable();
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(heroes.filter(hero => hero.name.toLowerCase().includes(searchInput.value.toLowerCase())).length / pageSize)) {
            currentPage++;
            renderTable();
        }
    });

    document.querySelectorAll('th').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.getAttribute('data-column');
            document.querySelectorAll('th').forEach(header => {
                header.textContent = header.textContent.replace(/ ↑| ↓/g, '');
            });
            if (sortColumn === column) {
                sortAscending = !sortAscending;
                th.textContent += sortAscending ? ' ↑' : ' ↓';
            } else {
                sortColumn = column;
                sortAscending = true;
                th.textContent += ' ↑';
            }
            renderTable();
        });
    });

    fetchHeroes();
    loadFromURL();
});