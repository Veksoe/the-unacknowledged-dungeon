const monsterNameContent = ["shadow", "dark", "flower", "pillar", "axe"];
const monsterFighterEl = document.querySelector(".monsterFighterEl");
const monsterContainerEl = document.querySelector(".monsterContainerEl");
const battleAreaEl = document.querySelector(".battleArea");
const playerContainerEl = document.querySelector(".playerContainerEl");
const formEl = document.querySelector("form");

let monsters = [];

function generateMonsterHTML(monster) {
    return `<article class="monsterCard">
    <h3 class="monsterNameEl">${monster.name}</h3>
    <h4>Level: <span class="monsterLvLEl">${monster.lvl}</span></h4>
    <div class="monsterStats">
        <p>Health: <span class="monsterHealthEl">${monster.health}</span></p>
        <p>Attack: <span class="monsterAttackEl">${monster.attack}</span></p>
        </div>
    <p class="monsterDescriptionEl">Description</p>
    <p>Defence: <span class="monsterAttackEl">${monster.defence}</span></p>
    <p>Exp: <span class="monsterAttackEl">${monster.exp}</span></p>

    </article>`;

}

function buildMonster() {
    let monster = {
        name: null,
        lvl: null,
        health: null,
        attack: null,
        defence: null,
        exp: null,
    }

    monster.name = monsterNameContent[Math.floor(Math.random() * monsterNameContent.length)]
        + monsterNameContent[Math.floor(Math.random() * monsterNameContent.length)];
    monster.lvl = Math.floor(Math.random() * 5) + 1;
    const healthScalar = .5 * monster.lvl;
    const attackScalar = .3 * monster.lvl;
    const defenceScalar = .2 * monster.lvl;
    const expScalar = 2 * monster.lvl;

    monster.health = Math.floor((Math.random() * 100) * healthScalar) + 10;
    monster.attack = Math.floor((Math.random() * 10) * attackScalar) + 1;
    monster.defence = Math.floor((Math.random() * 10) * defenceScalar);
    monster.exp = Math.floor((Math.random() * 10) * expScalar) + 1;

    monsterFighterEl.innerHTML = generateMonsterHTML(monster);
    monsters.push(monster);

}

function start() {
    battleAreaEl.style.display = "block";
    playerContainerEl.style.display = "none";
    formEl.addEventListener("submit", createPlayer)

}
function fight() {
    if (localStorage.getItem("monster")) {
        monsters = JSON.parse(localStorage.getItem("monster"));
    }
    buildMonster();
    console.table([monsters]);
    localStorage.setItem("monster", JSON.stringify(monsters))
}

function reset() {
    localStorage.clear();
    console.log("Game reset");
    battleAreaEl.style.display = "none";
    playerContainerEl.style.display = "block";
}
function createPlayer(event) {
    event.preventDefault();
    const playerName = formEl.playerName.value;
    const playerHealth = formEl.playerHealth.value;
    const playerAttack = formEl.playerAttack.value;
    const playerDefence = formEl.playerDefence.value;
    const playerDescription = formEl.playerDescription.value;

    const playerNameEl = localStorage.getItem("playerName");
    const playerHealthEl = localStorage.getItem("playerHealth");
    const playerAttackEl = localStorage.getItem("playerAttack");
    const playerDefenceEl = localStorage.getItem("playerDefence");
    const playerDescriptionEl = localStorage.getItem("playerDescription");

    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerHealth", playerHealth);
    localStorage.setItem("playerAttack", playerAttack);
    localStorage.setItem("playerDefence", playerDefence);
    localStorage.setItem("playerDecription", JSON.stringify(playerDescription));

    const playerFighterEl = document.querySelector(".playerFighterEl");

    playerFighterEl.innerHTML = `
    <div class="playerCard">
    <h3 class="playerNameEl">${playerNameEl}</h3>
    <h4>Level: <span class="playerLvLEl">1</span></h4>
    <div class="playerStats">
        <p>Health: <span class="playerHealthEl">${playerHealthEl}</span></p>
        <p>Attack: <span class="playerAttackEl">${playerAttackEl}</span></p>
    </div>
    <p class="playerDescriptionEl">${playerDescriptionEl}</p>
    <p>Defence: <span class="playerDefenceEl">${JSON.parse(playerDefenceEl)}</span></p>

</div>`
}

if (monsterFighterEl) {
    if (localStorage.getItem("monster")) {
        monsters = JSON.parse(localStorage.getItem("monster"));
    }
    if (monsters && monsters.length > 0) {

        battleAreaEl.style.display = "block";
        playerContainerEl.style.display = "none";
    }
    else {
        battleAreaEl.style.display = "none";
        playerContainerEl.style.display = "block";
    }
}

if (monsterContainerEl) {
    if (localStorage.getItem("monster")) {
        monsters = JSON.parse(localStorage.getItem("monster"));
    }
    monsters.forEach(monster => {
        monsterContainerEl.innerHTML += generateMonsterHTML(monster);
    })
}




// localStorage.setItem("name", JSON.stringify(playerName));