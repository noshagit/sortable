document.addEventListener('DOMContentLoaded', () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const heroId = urlParams.get('heroId');
    
    fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
        .then(response => response.json())
        .then(data => {
            const hero = data.find(hero => hero.id === parseInt(heroId));
            
            if (hero) {
                document.getElementById('heroImage').src = hero.images.md;
                document.getElementById('heroName').textContent = hero.name;
                document.getElementById('heroFullName').textContent = `Full Name: ${hero.biography.fullName}`;
                document.getElementById('heroAlterEgos').textContent = `Alter Egos: ${hero.biography.alterEgos}`;
                document.getElementById('heroAliases').textContent = `Aliases: ${hero.biography.aliases.join(', ')}`;
                document.getElementById('heroPlaceOfBirth').textContent = `Place of Birth: ${hero.biography.placeOfBirth}`;
                document.getElementById('heroFirstAppearance').textContent = `First Appearance: ${hero.biography.firstAppearance}`;
                document.getElementById('heroPublisher').textContent = `Publisher: ${hero.biography.publisher}`;
                document.getElementById('heroAlignment').textContent = `Alignment: ${hero.biography.alignment}`;
                document.getElementById('heroOccupation').textContent = `Occupation: ${hero.work.occupation}`;
                document.getElementById('heroBase').textContent = `Base: ${hero.work.base}`;
                document.getElementById('heroGroupAffiliation').textContent = `Group Affiliation: ${hero.connections.groupAffiliation}`;
                document.getElementById('heroRelatives').textContent = `Relatives: ${hero.connections.relatives}`;
                document.getElementById('heroIntelligence').textContent = `Intelligence: ${hero.powerstats.intelligence}`;
                document.getElementById('heroStrength').textContent = `Strength: ${hero.powerstats.strength}`;
                document.getElementById('heroSpeed').textContent = `Speed: ${hero.powerstats.speed}`;
                document.getElementById('heroDurability').textContent = `Durability: ${hero.powerstats.durability}`;
                document.getElementById('heroPower').textContent = `Power: ${hero.powerstats.power}`;
                document.getElementById('heroCombat').textContent = `Combat: ${hero.powerstats.combat}`;
                document.getElementById('heroGender').textContent = `Gender: ${hero.appearance.gender}`;
                document.getElementById('heroRace').textContent = `Race: ${hero.appearance.race}`;
                document.getElementById('heroHeight').textContent = `Height: ${hero.appearance.height.join(', ')}`;
                document.getElementById('heroWeight').textContent = `Weight: ${hero.appearance.weight.join(', ')}`;
                document.getElementById('heroEyeColor').textContent = `Eye Color: ${hero.appearance.eyeColor}`;
                document.getElementById('heroHairColor').textContent = `Hair Color: ${hero.appearance.hairColor}`;
            } else {
                document.getElementById('heroDetails').innerHTML = "<p>Hero not found!</p>";
            }
        })
        .catch(error => {
            document.getElementById('heroDetails').innerHTML = "<p>Failed to load data: " + error.message + "</p>";
        });

    document.getElementById('backButton').addEventListener('click', () => {
        window.history.back();
    });
    
    document.getElementById('superheroDetailsButton').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
