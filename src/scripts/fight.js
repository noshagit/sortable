document.addEventListener('DOMContentLoaded', () => {
    const hero1Select = document.getElementById('hero1');
    const hero2Select = document.getElementById('hero2');
    const fightButton = document.getElementById('fightButton');
    const combatResult = document.getElementById('combatResult');
    const combatText = document.getElementById('combatText');
    let heroes = [];

    const fetchHeroes = () => {
        fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
            .then(response => response.json())
            .then(data => {
                heroes = data;
                populateHeroSelect(hero1Select);
                populateHeroSelect(hero2Select);
            });
    };

    const populateHeroSelect = (select) => {
        heroes.forEach(hero => {
            const option = document.createElement('option');
            option.value = hero.id;
            option.textContent = hero.name;
            select.appendChild(option);
        });
    };

    const calculateAveragePowerStat = (powerStats) => {
        const stats = Object.values(powerStats).filter(stat => typeof stat === 'number' && !isNaN(stat));
        const total = stats.reduce((sum, stat) => sum + stat, 0);
        return stats.length > 0 ? total / stats.length : 0;
    };

    const determineWinner = (hero1, hero2) => {
        const power1 = calculateAveragePowerStat(hero1.powerstats);
        const power2 = calculateAveragePowerStat(hero2.powerstats);

        const totalPower = power1 + power2;
        const hero1WinChance = power1 / totalPower;
        const random = Math.random();

        return random < hero1WinChance ? hero1 : hero2;
    };

    const handleFight = () => {
        const hero1 = heroes.find(h => h.id == hero1Select.value);
        const hero2 = heroes.find(h => h.id == hero2Select.value);
        const winner = determineWinner(hero1, hero2);

        combatText.textContent = `Le vainqueur est : ${winner.name} !`;
        combatResult.classList.remove('hidden');
    };

    const checkSelection = () => {
        fightButton.disabled = hero1Select.value === "" || hero2Select.value === "" || hero1Select.value === hero2Select.value;
    };

    hero1Select.addEventListener('change', checkSelection);
    hero2Select.addEventListener('change', checkSelection);
    fightButton.addEventListener('click', handleFight);

    fetchHeroes();
});
