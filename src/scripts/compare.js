document.addEventListener('DOMContentLoaded', () => {
    const heroSelect1 = document.getElementById('heroSelect1');
    const heroSelect2 = document.getElementById('heroSelect2');
    const compareButton = document.getElementById('compareButton');

    fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(hero => {
                let option1 = new Option(hero.name, hero.id);
                let option2 = new Option(hero.name, hero.id);
                heroSelect1.add(option1);
                heroSelect2.add(option2);
            });
        })
        .catch(error => console.error("Error loading superheroes:", error));

    compareButton.addEventListener('click', () => {
        const heroId1 = heroSelect1.value;
        const heroId2 = heroSelect2.value;

        fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
            .then(response => response.json())
            .then(data => {
                const hero1 = data.find(hero => hero.id == heroId1);
                const hero2 = data.find(hero => hero.id == heroId2);

                if (hero1 && hero2) {
                    document.getElementById('heroImage1').src = hero1.images.md;
                    document.getElementById('heroName1').textContent = hero1.name;
                    document.getElementById('heroFullName1').textContent = `Full Name: ${hero1.biography.fullName}`;
                    document.getElementById('heroAlterEgos1').textContent = `Alter Egos: ${hero1.biography.alterEgos}`;
                    document.getElementById('heroAliases1').textContent = `Aliases: ${hero1.biography.aliases.join(', ')}`;
                    document.getElementById('heroPlaceOfBirth1').textContent = `Place of Birth: ${hero1.biography.placeOfBirth}`;
                    document.getElementById('heroFirstAppearance1').textContent = `First Appearance: ${hero1.biography.firstAppearance}`;
                    document.getElementById('heroPublisher1').textContent = `Publisher: ${hero1.biography.publisher}`;
                    document.getElementById('heroAlignment1').textContent = `Alignment: ${hero1.biography.alignment}`;
                    document.getElementById('heroOccupation1').textContent = `Occupation: ${hero1.work.occupation}`;
                    document.getElementById('heroBase1').textContent = `Base: ${hero1.work.base}`;
                    document.getElementById('heroGroupAffiliation1').textContent = `Group Affiliation: ${hero1.connections.groupAffiliation}`;
                    document.getElementById('heroRelatives1').textContent = `Relatives: ${hero1.connections.relatives}`;
                    document.getElementById('heroIntelligence1').textContent = `Intelligence: ${hero1.powerstats.intelligence}`;
                    document.getElementById('heroStrength1').textContent = `Strength: ${hero1.powerstats.strength}`;
                    document.getElementById('heroSpeed1').textContent = `Speed: ${hero1.powerstats.speed}`;
                    document.getElementById('heroDurability1').textContent = `Durability: ${hero1.powerstats.durability}`;
                    document.getElementById('heroPower1').textContent = `Power: ${hero1.powerstats.power}`;
                    document.getElementById('heroCombat1').textContent = `Combat: ${hero1.powerstats.combat}`;
                    document.getElementById('heroGender1').textContent = `Gender: ${hero1.appearance.gender}`;
                    document.getElementById('heroRace1').textContent = `Race: ${hero1.appearance.race}`;
                    document.getElementById('heroHeight1').textContent = `Height: ${hero1.appearance.height.join(', ')}`;
                    document.getElementById('heroWeight1').textContent = `Weight: ${hero1.appearance.weight.join(', ')}`;
                    document.getElementById('heroEyeColor1').textContent = `Eye Color: ${hero1.appearance.eyeColor}`;
                    document.getElementById('heroHairColor1').textContent = `Hair Color: ${hero1.appearance.hairColor}`;

                    document.getElementById('heroImage2').src = hero2.images.md;
                    document.getElementById('heroName2').textContent = hero2.name;
                    document.getElementById('heroFullName2').textContent = `Full Name: ${hero2.biography.fullName}`;
                    document.getElementById('heroAlterEgos2').textContent = `Alter Egos: ${hero2.biography.alterEgos}`;
                    document.getElementById('heroAliases2').textContent = `Aliases: ${hero2.biography.aliases.join(', ')}`;
                    document.getElementById('heroPlaceOfBirth2').textContent = `Place of Birth: ${hero2.biography.placeOfBirth}`;
                    document.getElementById('heroFirstAppearance2').textContent = `First Appearance: ${hero2.biography.firstAppearance}`;
                    document.getElementById('heroPublisher2').textContent = `Publisher: ${hero2.biography.publisher}`;
                    document.getElementById('heroAlignment2').textContent = `Alignment: ${hero2.biography.alignment}`;
                    document.getElementById('heroOccupation2').textContent = `Occupation: ${hero2.work.occupation}`;
                    document.getElementById('heroBase2').textContent = `Base: ${hero2.work.base}`;
                    document.getElementById('heroGroupAffiliation2').textContent = `Group Affiliation: ${hero2.connections.groupAffiliation}`;
                    document.getElementById('heroRelatives2').textContent = `Relatives: ${hero2.connections.relatives}`;
                    document.getElementById('heroIntelligence2').textContent = `Intelligence: ${hero2.powerstats.intelligence}`;
                    document.getElementById('heroStrength2').textContent = `Strength: ${hero2.powerstats.strength}`;
                    document.getElementById('heroSpeed2').textContent = `Speed: ${hero2.powerstats.speed}`;
                    document.getElementById('heroDurability2').textContent = `Durability: ${hero2.powerstats.durability}`;
                    document.getElementById('heroPower2').textContent = `Power: ${hero2.powerstats.power}`;
                    document.getElementById('heroCombat2').textContent = `Combat: ${hero2.powerstats.combat}`;
                    document.getElementById('heroGender2').textContent = `Gender: ${hero2.appearance.gender}`;
                    document.getElementById('heroRace2').textContent = `Race: ${hero2.appearance.race}`;
                    document.getElementById('heroHeight2').textContent = `Height: ${hero2.appearance.height.join(', ')}`;
                    document.getElementById('heroWeight2').textContent = `Weight: ${hero2.appearance.weight.join(', ')}`;
                    document.getElementById('heroEyeColor2').textContent = `Eye Color: ${hero2.appearance.eyeColor}`;
                    document.getElementById('heroHairColor2').textContent = `Hair Color: ${hero2.appearance.hairColor}`;
                }
            })
            .catch(error => console.error("Error fetching heroes:", error));
    });

    document.getElementById('compareMenu').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});