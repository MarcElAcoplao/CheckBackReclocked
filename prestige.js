const researchButtons = [
    { name: "RPbutton0", powerGain: 1, cooldown: 60, unlock: 0 }, //Level 1
    { name: "RPbutton1", powerGain: 2, cooldown: 120, unlock: 1 }, //Level 2
    { name: "RPbutton2", powerGain: 3, cooldown: 240, unlock: 2 }, //Level 3
    { name: "RPbutton3", powerGain: 5, cooldown: 360, unlock: 4 }, //Level 6
    { name: "RPbutton4", powerGain: 10, cooldown: 720, unlock: 6 }, //Level 12
    { name: "RPbutton5", powerGain: 20, cooldown: 1500, unlock: 8 }, //Level 30
    { name: "RPbutton6", powerGain: 40, cooldown: 3600, unlock: 10 }, //Level 60
    { name: "RPbutton7", powerGain: 80, cooldown: 7500, unlock: 13 }, //Level 150
    { name: "RPbutton8", powerGain: 160, cooldown: 16800, unlock: 15 }, //Level 250
    { name: "RPbutton9", powerGain: 320, cooldown: 35100, unlock: 18 }, //Level 500
    { name: "RPbutton10", powerGain: 640, cooldown: 86400, unlock: 21 }, //Level 5k
    { name: "RPbutton11", powerGain: 1250, cooldown: 176400, unlock: 27 }, //Level 1m
    { name: "RPbutton12", powerGain: 2500, cooldown: 360000, unlock: 30 }, //Level 50m
]

function prestigeReset() {
    if (game.prestige.reset == false && game.player.highestUnlocks >= 25) {
        game.xp.amount = [0, 0]
        game.pets.amount = [0, 0, 0]
        game.pets.equipped = 0
        game.pets.unboxString = [[0, 0]]
        game.xpBoost.amount = [1, 0]
        game.tokens.amount = 0
        game.tokens.bankAmount = 0
        game.tokens.ticks = 0
        game.tokens.upgrades = [0, 0, 0]
        game.tokens.autoTicks = 0
        game.player.unlocks = 0
        game.prestige.reset = true
        game.research.buttonCooldowns[0] = 60
        game.research.buttonCooldowns[1] = 120
        game.research.buttonCooldowns[2] = 240 //updates them in case you prestige instantly after update :unsmith:
        updateStuffOnLoad()
        resetXPCooldowns()
        resetPetCooldowns()
        resetXPBoostCooldowns()
    }
}

function rpButton(x) {
    if (game.research.buttonCooldowns[x] >= researchButtons[x].cooldown / game.research.cooldown) {
        let times = roundRNG(game.research.buttonCooldowns[x] / (researchButtons[x].cooldown / game.research.cooldown))
        game.research.buttonCooldowns[x] = 0
        game.research.power += calculateRPgain(x) * times
        game.player.buttonClicks += times
    }
}

function calculateRPgain(x) {
    return (researchButtons[x].powerGain * game.research.multi)
}

function calculateRPstats() {
    let baseMulti = 1
    baseMulti *= game.researchBonuses.rpMulti
    if (!!pets[game.pets.equipped].rpMulti) baseMulti *= pets[game.pets.equipped].rpMulti
    baseMulti *= game.tokenBonuses.rpMulti
    baseMulti *= game.dailyBonuses.rp
    game.research.multi = baseMulti
    let baseCooldown = 1
    baseCooldown *= game.researchBonuses.rpCooldown
    game.research.cooldown = baseCooldown
}
setInterval(calculateRPstats, 50)

function openCloseResearchTab() {
    if (document.getElementById("researchDiv").style.display == "block") {
        document.getElementById("researchDiv").style.display = "none"
        document.getElementById("researchListInner").innerHTML = ""
    }
    else {
        document.getElementById("researchDiv").style.display = "block"
        displayResearches()
    }
}

function displayResearches() {
    document.getElementById("researchListInner").innerHTML = ""
    let petBox = document.createElement("div")
    petBox.style.display = "inline-block"
    petBox.style.position = "relative"
    petBox.style.width = "128px"
    petBox.style.height = "128px"
    petBox.style.margin = "8px 0 0 8px"
    petBox.style.border = "8px solid black"
    petBox.style.cursor = "pointer"
    petBox.style.backgroundColor = "#888"
    petBox.style.backgroundImage = "url('img/halftoneDots.png')"
    petBox.className += "petBox"
    petBoxes = document.getElementsByClassName("petBox");
    for (let i = 1; i < researches.length; i++) {
        document.getElementById("researchListInner").appendChild(petBox.cloneNode(true))
        petBoxes[i - 1].setAttribute("id", i)
        petBoxes[i - 1].addEventListener('click', function () { setActiveResearch(parseInt(this.id)) })
        petBoxes[i - 1].addEventListener('mouseover', function () {
            if (game.player.unlocks >= researches[parseInt(this.id)].unlock) { showResearchInfo(parseInt(this.id)) }
            else { document.getElementById("researchBarText").innerHTML = "Unlocked at level " + displayBig(unlockToLevel(researches[parseInt(this.id)].unlock)) }
        })
        petBoxes[i - 1].addEventListener('mouseout', function () { showResearchInfo(0) })
        if (i == game.research.active) { petBoxes[i - 1].style.backgroundColor = "#aa2" }
        if (game.research.upgrades[i] >= 1) { petBoxes[i - 1].style.backgroundColor = "#1a2" }
        if (game.player.unlocks >= researches[i].unlock) { //1st value is red, 2nd green and 3rd blue
            petBoxes[i - 1].innerHTML = "<img src='img/research/" + i + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            petBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>" + wholeNumberShort(game.research.upgrades[i]) + "</p>"
            petBoxes[i - 1].style.border = "8px outset rgb(0, 243, 226)"
        }
        else {
            petBoxes[i - 1].innerHTML = "<img src='img/research/" + i + ".png' style='width: 128px; filter: brightness(0)' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            petBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>0</p>"
        }
    }
    j = pets.length - 1
}

function isResearchAvailable(x) {
    let result = false
    if (game.research.upgrades[x] == 0 && game.player.unlocks >= researches[x].unlock) { result = true }
    return result
}

function showResearchInfo(x) {
    if (x != 0) {
        let result = ""
        if (game.research.upgrades[x] >= 1) {
            result += "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + researches[x].name + "</span><br>Research completed<br><br></p><br><img src='img/research/" + x + ".png' style='width: 50%' onerror=\"this.onerror=null;this.src='img/pets/0.png';\"><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Effects:</span><br>" + researches[x].effect + "</p></center>"
            document.getElementById("researchBarText").innerHTML = "Data: " + numberShort(researches[x].data) + "/" + numberShort(researches[x].data)
            document.getElementById("researchBarBack").style.width = "100%"
        }
        else if (game.research.active == x) {
            result += "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + researches[x].name + "</span><br>Research in progress<br><br></p><br><img src='img/research/" + x + ".png' style='width: 50%' onerror=\"this.onerror=null;this.src='img/pets/0.png';\"><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Effects:</span><br>" + researches[x].effect + "</p></center>"
            document.getElementById("researchBarText").innerHTML = "Data: " + numberShort(game.research.data) + "/" + numberShort(researches[x].data) + "<br>Time left: " + numberToTime((researches[x].data - game.research.data) / Math.max(game.research.power, 0.01))
            document.getElementById("researchBarBack").style.width = (game.research.data * 100 / researches[x].data) + "%"
        }
        else {
            result += "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + researches[x].name + "</span><br>Research pending<br><br></p><br><img src='img/research/" + x + ".png' style='width: 50%' onerror=\"this.onerror=null;this.src='img/pets/0.png';\"><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Effects:</span><br>" + researches[x].effect + "</p></center>"
            document.getElementById("researchBarText").innerHTML = "Data: 0/" + numberShort(researches[x].data) + "<br>Expected time: " + numberToTime(researches[x].data / Math.max(game.research.power, 0.01))
            document.getElementById("researchBarBack").style.width = "0%"
        }
        document.getElementById("researchText").innerHTML = result
    }
    else {
        document.getElementById("researchText").innerHTML = "<br><br>"
        document.getElementById("researchBarBack").style.width = "0%"
        document.getElementById("researchBarText").innerHTML = "Hover on a research to see info about it"
    }
}

function checkResearchProgress(x) {
    if (game.research.data >= researches[x].data) {
        if (x == 21) { game.tokens.upgrades[11] = 1 }
        game.research.data = 0
        game.research.upgrades[x]++
        game.research.active = 0
        if (document.getElementById("researchDiv").style.display == "block") {
            openCloseResearchTab()
            openCloseResearchTab()
        }
    }
}

function setActiveResearch(x) {
    if (isResearchAvailable(x) && game.research.active != x) {
        game.research.data = 0
        game.research.active = x
    }
}

function calculateResearchBonuses() {
    let baseXPMulti = [1, 0] //XP Multipliers from research
    if (game.research.upgrades[1] >= 1) { baseXPMulti = multiplyBig(baseXPMulti, [2, 0]) }
    if (game.research.upgrades[3] >= 1) { baseXPMulti = multiplyBig(baseXPMulti, [2, 0]) }
    if (game.research.upgrades[7] >= 1) { baseXPMulti = multiplyBig(baseXPMulti, exponentBig([2, 0], game.player.cratesComplete)) }
    if (game.research.upgrades[12] >= 1) { baseXPMulti = multiplyBig(baseXPMulti, [4, 0]) }
    if (game.research.upgrades[18] >= 1) { baseXPMulti = multiplyBig(baseXPMulti, [5, 0]) }
    if (game.research.upgrades[27] >= 1) { baseXPMulti = multiplyBig(baseXPMulti, 2 ** game.pets.masteredPets) }
    game.researchBonuses.xpMulti = baseXPMulti
    let baseXPExpo = [1, 0] //XP Expo from research
    if (game.research.upgrades[5] >= 1) { baseXPExpo = multiplyBig(baseXPExpo, [1.1, 0]) }
    if (game.research.upgrades[9] >= 1) { baseXPExpo = multiplyBig(baseXPExpo, [1.1, 0]) }
    if (game.research.upgrades[22] >= 1) { baseXPExpo = multiplyBig(baseXPExpo, [1.1, 0]) }
    game.researchBonuses.xpExpo = baseXPExpo
    let baseLuck = 1 //Crate luck from research
    if (game.research.upgrades[8] >= 1) { baseLuck *= 1.2 }
    if (game.research.upgrades[10] >= 1 && game.pets.amount[10] >= 1) { baseLuck *= 1.5 }
    if (game.research.upgrades[13] >= 1) { baseLuck *= 1.3 }
    if (game.research.upgrades[18] >= 1) { baseLuck *= 1.3 }
    if (game.research.upgrades[26] >= 1) { baseLuck *= 1.5 }
    if (game.research.upgrades[32] >= 1 && game.pets.masteredPetsList[10] >= 1) { baseLuck *= 3 }
    game.researchBonuses.crateLuck = baseLuck
    let baseRPMulti = 1 //RP Multipliers from research
    if (game.research.upgrades[2] >= 1) { baseRPMulti *= 1.1 }
    if (game.research.upgrades[6] >= 1) { baseRPMulti *= 1.3 }
    if (game.research.upgrades[15] >= 1) { baseRPMulti *= 2 }
    game.researchBonuses.rpMulti = baseRPMulti
    let baseXPCooldown = 1 //XP Cooldowns from research
    if (game.research.upgrades[4] >= 1) { baseXPCooldown *= 1.2 }
    if (game.research.upgrades[19] >= 1 && game.pets.amount[17] >= 1) { baseXPCooldown *= 1.4 }
    if (game.research.upgrades[26] >= 1) { baseXPCooldown *= 1.3 }
    if (game.research.upgrades[33] >= 1) { baseXPCooldown *= 1.4 }
    game.researchBonuses.xpCooldown = baseXPCooldown
    let baseXPBMulti = [1, 0] //XPBoost Multipliers from research
    if (game.research.upgrades[14] >= 1) { baseXPBMulti = multiplyBig(baseXPBMulti, [2, 0]) }
    if (game.research.upgrades[18] >= 1) { baseXPBMulti = multiplyBig(baseXPBMulti, [2, 0]) }
    if (game.research.upgrades[29] >= 1) { baseXPBMulti = multiplyBig(baseXPBMulti, [3, 0]) }
    game.researchBonuses.xpBMulti = baseXPBMulti
    let baseXPBEffect = [1, 0] //XPBoost effect expo from research
    if (game.research.upgrades[16] >= 1) { baseXPBEffect = multiplyBig(baseXPBEffect, [1.2, 0]) }
    if (game.research.upgrades[30] >= 1) { baseXPBEffect = multiplyBig(baseXPBEffect, [1.2, 0]) }
    game.researchBonuses.xpBEffect = baseXPBEffect
    let basePetCooldown = 1 //Crate Cooldowns from research
    if (game.research.upgrades[17] >= 1) { basePetCooldown *= 1.2 }
    if (game.research.upgrades[19] >= 1 && game.pets.amount[17] >= 1) { basePetCooldown *= 1.4 }
    if (game.research.upgrades[33] >= 1) { basePetCooldown *= 1.4 }
    game.researchBonuses.petCooldown = basePetCooldown
    let baseXPBCooldown = 1 //XPBoost Cooldowns from research
    if (game.research.upgrades[17] >= 1) { baseXPBCooldown *= 1.2 }
    if (game.research.upgrades[19] >= 1 && game.pets.amount[17] >= 1) { baseXPBCooldown *= 1.4 }
    if (game.research.upgrades[26] >= 1) { baseXPBCooldown *= 1.3 }
    if (game.research.upgrades[33] >= 1) { baseXPBCooldown *= 1.4 }
    game.researchBonuses.xpBCooldown = baseXPBCooldown
    let baseTokenMulti = 1 //Token Multipliers from research
    if (game.research.upgrades[20] >= 1) { baseTokenMulti *= 1.5 }
    if (game.research.upgrades[23] >= 1) { baseTokenMulti *= 1.5 }
    if (game.research.upgrades[28] >= 1) { baseTokenMulti *= 2 }
    game.researchBonuses.tokenMulti = baseTokenMulti
    let baseRPCooldown = 1 //RP Cooldowns from research
    if (game.research.upgrades[19] >= 1 && game.pets.amount[17] >= 1) { baseRPCooldown *= 1.4 }
    if (game.research.upgrades[33] >= 1) { baseRPCooldown *= 1.4 }
    game.researchBonuses.rpCooldown = baseRPCooldown
}
setInterval(calculateResearchBonuses, 50)

function areResearchesAvailable() {
    let i = 1
    let found = false
    while (i < researches.length && found == false) {
        if (isResearchAvailable(i)) { found = true }
        i++
    }
    if (game.research.active != 0) { found = false }
    return found
}

function collectAllRP() {
    for (i = 0; i < researchButtons.length; i++) {
        if ((game.research.buttonCooldowns[i] >= researchButtons[i].cooldown / game.research.cooldown) && game.player.unlocks >= researchButtons[i].unlock) {
            rpButton(i)
        }
    }
}

function countResearches() {
    let count = 0
    for (let i = 1; i < researches.length; i++) {
        if (game.research.upgrades[i] >= 1) { count++ }
    }
    return count
}