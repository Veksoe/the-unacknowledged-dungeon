const monsterNameContent = ["shadow", "dark", "flower", "pillar", "axe"];
const monsterFighterEl = document.querySelector(".monsterFighterEl");
const monsterContainerEl = document.querySelector(".monsterContainerEl");
const battleAreaEl = document.querySelector(".battleArea");
const playerContainerEl = document.querySelector(".playerContainerEl");
const playerFighterEl = document.querySelector(".playerFighterEl");
const formEl = document.querySelector("form");
const navEl = document.querySelector("nav");

let monsters = [];
let skillPointsLeft = 70;
let player = {
    name: "",
    attack: 0,
    health: 0,
    defence: 0,
    description: "",
    exp: 0,
    lvl: 1
}

function generateMonsterHTML(monster) {
    return `<article class="monsterCard card">
    <h3 class="monsterNameEl">${monster.name}</h3>
    <h4>Level: <span class="monsterLvLEl">${monster.lvl}</span></h4>
    <div class="stats justifyCenter">
        <p>Health: <span class="monsterHealthEl">${monster.health}</span></p>
        <p>Attack: <span class="monsterAttackEl">${monster.attack}</span></p>
        <p>Defence: <span class="monsterAttackEl">${monster.defence}</span></p>
        </div>
    <p class="monsterDescriptionEl">This is a placeholder description for monsters, that just allow for some content to the card, 
    so it doesn't seem so empty. It also gives an idea of the card's design. This should most diffently be removed later!</p>
    <p>Exp: <span class="monsterAttackEl">${monster.exp}</span></p>
    </article>`;
}

function generatePlayerHTML() {
    return ` <div class="playerCard card">
    <h3 class="playerNameEl">${player.name}</h3>
   <h4>Level: <span class="playerLvLEl">${player.lvl}</span></h4>
    <div class="stats justifyCenter">
        <p>Health: <span class="playerHealthEl">${player.health}</span></p>
        <p>Attack: <span class="playerAttackEl">${player.attack}</span></p>
        <p>Defence: <span class="playerDefenceEl">${player.defence}</span></p>
    </div>
    <p class="playerDescriptionEl">${player.description}</p>
</div>`;
}

function countSkills(e) {
    if (!player) {
        player = {
            name: "",
            attack: 0,
            health: 0,
            defence: 0,
            description: "",
            exp: 0,
            lvl: 1
        }
    }

    const name = e.srcElement.id.replace("player", "").toLowerCase();
    const currentValue = e.srcElement.value;

    const delta = currentValue - player[name];

    if (currentValue < 0) {
        e.preventDefault();
        e.srcElement.value = player[name]
        return
    }

    if (skillPointsLeft - delta < 0) {
        e.preventDefault();
        e.srcElement.value = player[name]
        return
    }

    skillPointsLeft -= delta;
    player[name] = currentValue;

    document.querySelector("#skillLeft").innerHTML = skillPointsLeft;

    // console.log("Name: " + name + " value: " + e.srcElement.value + " left: " + skillPointsLeft)
}

function buildMonster() {
    let monster = {
        name: null,
        lvl: null,
        health: null,
        attack: null,
        defence: null,
        description: null,
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
    battleAreaEl.style.display = "grid";
    playerContainerEl.style.display = "none";
    formEl.addEventListener("submit", createPlayer)


}

function fight() {
    if (localStorage.getItem("monster")) {
        monsters = JSON.parse(localStorage.getItem("monster"));
    }
    buildMonster();
    // console.table([monsters]);
    localStorage.setItem("monster", JSON.stringify(monsters))
    navEl.style.display = "block";
}

function reset() {
    localStorage.clear();
    window.location.reload();
}

function createPlayer(event) {
    event.preventDefault();
    const name = formEl.playerName.value;
    const health = formEl.playerHealth.value;
    const attack = formEl.playerAttack.value;
    const defence = formEl.playerDefence.value;
    const description = formEl.playerDescription.value;

    player = {
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

    playerFighterEl.innerHTML += generatePlayerHTML(player);

}


if (battleAreaEl) {
    // Only runs on page load
    const currentMonster = JSON.parse(localStorage.getItem("currentMonster"));;
    player = JSON.parse(localStorage.getItem("player"));

    if (player) {
        playerFighterEl.innerHTML += generatePlayerHTML(player);
        playerContainerEl.style.display = "none";
    }

    if (currentMonster) {
        monsters = JSON.parse(localStorage.getItem("currentMonster"));
        monsterFighterEl.innerHTML += generateMonsterHTML(currentMonster);
    }

    if (!player) {
        battleAreaEl.style.display = "none";
    }

    if (currentMonster) {
        monsterFighterEl.style.display = "block";
    }

    if (monsters && monsters.length > 0) {
        navEl.style.display = "block";
    }
    else {
        navEl.style.display = "none";

    }
}



if (monsterContainerEl) {
    // Only runs on page load
    if (localStorage.getItem("monster")) {
        monsters = JSON.parse(localStorage.getItem("monster"));
    }
    monsters.forEach(monster => {
        monsterContainerEl.innerHTML += generateMonsterHTML(monster);
    })
}