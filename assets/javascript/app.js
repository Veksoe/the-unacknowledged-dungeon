const monsterNameContent = ["shadow", "dark", "flower", "pillar", "axe"];
const monsterContainerEl = document.querySelector(".monsterContainerEl");
const userInput = 3; /*prompt("hvor mange monstre?")*/

let monsters = [];

function buildMonster() {
    let monster = {
        name: null,
        lvl: null,
        health: null,
        attack: null,
        defence: null,
    }

    monster.name = monsterNameContent[Math.floor(Math.random() * monsterNameContent.length)]
        + monsterNameContent[Math.floor(Math.random() * monsterNameContent.length)];
    monster.lvl = Math.floor(Math.random() * 5) + 1;
    const healthScalar = .5 * monster.lvl;
    const attackScalar = .3 * monster.lvl;
    const defenceScalar = .2 * monster.lvl;

    monster.health = Math.floor((Math.random() * 100) * healthScalar) + 10;
    monster.attack = Math.floor((Math.random() * 10) * attackScalar) + 1;
    monster.defence = Math.floor((Math.random() * 10) * defenceScalar);

    // if (monster.attack * monster.defence < .5 && monster.health < 50) {
    //     monster.lvl = 1;
    // }
    // else if (monster.attack * monster.defence < 2 && monster.health > 50) {
    //     monster.lvl = 2
    // }
    // else {
    //     monster.lvl = 3
    // }

    monsterContainerEl.innerHTML += `<article class="monsterCard">
    <h3 class="monsterNameEl">${monster.name}</h3>
    <h4>Level: <span class="monsterLvLEl">${monster.lvl}</span></h4>
    <div class="monsterStats">
        <p>Health: <span class="monsterHealthEl">${monster.health}</span></p>
        <p>Attack: <span class="monsterAttackEl">${monster.attack}</span></p>
        <p>Defence: <span class="monsterAttackEl">${monster.defence}</span></p>
    </div>
    <p class="monsterDescriptionEl">Description</p>
    </article>`;

    monsters.push(monster);
}

for (let index = 0; index < userInput; index++) {
    buildMonster();

    console.table(monsters);
}