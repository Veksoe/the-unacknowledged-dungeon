const monsterNameContent = ["shadow", "dark", "flower", "pillar", "axe"];
const monsterFighterEl = document.querySelector(".monsterFighterEl");
const monsterContainerEl = document.querySelector(".monsterContainerEl");
const battleAreaEl = document.querySelector(".battleArea");
const playerContainerEl = document.querySelector(".playerContainerEl");
const playerFighterEl = document.querySelector(".playerFighterEl");
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

function generatePlayerHTML(player) {
    return ` <div class="playerCard">
    <h3 class="playerNameEl">${player.name}</h3>
   <h4>Level: <span class="playerLvLEl">${player.lvl}</span></h4>
    <div class="playerStats">
        <p>Health: <span class="playerHealthEl">${player.health}</span></p>
        <p>Attack: <span class="playerAttackEl">${player.attack}</span></p>
    </div>
    <p class="playerDescriptionEl">${player.description}</p>
     <p>Defence: <span class="playerDefenceEl">${player.defence}</span></p>
</div>`;
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
    localStorage.setItem("currentMonster", JSON.stringify(monster))
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
    battleAreaEl.style.display = "none";
    playerContainerEl.style.display = "block";
}

function createPlayer(event) {
    event.preventDefault();
    const name = formEl.playerName.value;
    const health = formEl.playerHealth.value;
    const attack = formEl.playerAttack.value;
    const defence = formEl.playerDefence.value;
    const description = formEl.playerDescription.value;

    const player = {
        name,
        attack,
        health,
        defence,
        description,
        exp: 0,
        lvl: 1
    }

    localStorage.setItem("player", JSON.stringify(player));

    const playerFighterEl = document.querySelector(".playerFighterEl");

    playerFighterEl.innerHTML = `
    <div class="playerCard">
         <h3 class="playerNameEl">${player.name}</h3>
        <h4>Level: <span class="playerLvLEl">${player.lvl}</span></h4>
         <div class="playerStats">
             <p>Health: <span class="playerHealthEl">${player.health}</span></p>
             <p>Attack: <span class="playerAttackEl">${player.attack}</span></p>
         </div>
         <p class="playerDescriptionEl">${player.description}</p>
          <p>Defence: <span class="playerDefenceEl">${player.defence}</span></p>
    </div>`
}


if (battleAreaEl) {

    let currentMonster = JSON.parse(localStorage.getItem("currentMonster"));;

    if (localStorage.getItem("player")) {
        player = JSON.parse(localStorage.getItem("player"));
        playerFighterEl.innerHTML += generatePlayerHTML(player);

        playerContainerEl.style.display = "none";
    }

    if (localStorage.getItem("currentMonster")) {
        monsters = JSON.parse(localStorage.getItem("currentMonster"));
        monsterFighterEl.innerHTML += generateMonsterHTML(currentMonster);
    }
    if (player && player.length > 0) {
        battleAreaEl.style.display = "none";
    }

    if (monsters && monsters.length > 0) {

        monsterFighterEl.style.display = "none";

    }
    else {

        monsterFighterEl.style.display = "block";
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