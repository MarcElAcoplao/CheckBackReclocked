const petButtons = [ //The stats of every single pet button, also they are found on tab 2.2
    { name: "petButton0", id: 0, cooldown: 600, unlock: 5, crateName: "basic", emoji: "💠", odds: () => basicUnboxChances }, //Level 8
    { name: "petButton1", id: 1, cooldown: 1200, unlock: 6, crateName: "nature", emoji: "🦎", odds: () => natureUnboxChances }, //Level 12
    { name: "petButton2", id: 2, cooldown: 3000, unlock: 9, crateName: "earth", emoji: "🦂", odds: () => earthUnboxChances }, //Level 40
    { name: "petButton3", id: 3, cooldown: 7200, unlock: 14, crateName: "fire", emoji: "🔥", odds: () => fireUnboxChances }, //Level 200
    { name: "petButton4", id: 4, cooldown: 15000, unlock: 21, crateName: "skeleton", emoji: "💀", odds: () => skeletonUnboxChances }, //Level 5000
    { name: "petButton5", id: 5, cooldown: 43200, unlock: 31, crateName: "ghost", emoji: "👻", odds: () => ghostUnboxChances }, //Level 100m
]

const petBorders = [
    { upto: 4, color: "555" }, //1-4, Basic crate
    { upto: 10, color: "2c2" }, //5-10, Nature crate
    { upto: 18, color: "a42" }, //11-18, Earth
    { upto: 26, color: "e42" }, //19-26, Fire
    { upto: 34, color: "bbb" }, //27-34, Skeleton
    { upto: 42, color: "282" }, //35-42, Ghost
    { upto: 999, color: "fff" },
]

const abilities = [ //reference: () => variable
    { oddsBase: 0.05, bonusBase: 10, reference: () => game.tokens.upgrades[22] },
]

function openClosePetsTab() {
    if (document.getElementById("petsDiv").style.display == "block") {
        document.getElementById("petsDiv").style.display = "none"
        document.getElementById("petsListInner").innerHTML = ""
    }
    else {
        document.getElementById("petsDiv").style.display = "block"
        displayPets()
    }
}

//Adds the squares for all the pets to the pets tab
function displayPets() {
    document.getElementById("petsListInner").innerHTML = ""
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
    for (let i = 1; i < pets.length; i++) {
        document.getElementById("petsListInner").appendChild(petBox.cloneNode(true))
        petBoxes[i - 1].setAttribute("id", i)
        petBoxes[i - 1].addEventListener('click', function () {
            if (game.pets.amount[parseInt(this.id)] > 0) { setSelectedPet(parseInt(this.id)) }
        })
        petBoxes[i - 1].addEventListener('mouseover', function () {
            if (game.pets.amount[parseInt(this.id)] > 0) { showPetInfo(parseInt(this.id)) }
        })
        petBoxes[i - 1].addEventListener('mouseout', function () { showPetInfo(0) })
        if (i == game.pets.equipped) { petBoxes[i - 1].style.backgroundColor = "#aa2" }
        if (game.pets.amount[i] > 0) { //1st value is red, 2nd green and 3rd blue
            petBoxes[i - 1].innerHTML = "<img src='img/pets/" + i + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            petBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>" + wholeNumberShort(game.pets.amount[i]) + "</p>"
            petBoxes[i - 1].style.border = "8px outset #" + petBorderColor(i)
            if (pets[i].power > pets[game.pets.equipped].power) { petBoxes[i - 1].style.backgroundColor = "#1a2" }
        }
        else {
            petBoxes[i - 1].innerHTML = "<img src='img/pets/" + i + ".png' style='width: 128px; filter: brightness(0)' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            petBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>0</p>"
        }
    }
    j = pets.length - 1
}

function petBorderColor(x) {
    for (let i = 0; i < petBorders.length; i++) {
        if (x <= petBorders[i].upto) {
            return petBorders[i].color
        }
    }
}

function showPetInfo(x) {
    if (x == 0) { document.getElementById("petInfo").innerHTML = "" }
    else document.getElementById("petInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + pets[x].name + "</span><br>You have " + wholeNumberShort(game.pets.amount[x]) + "<br><br>" + pets[x].specialText + "</p><br><img src='img/pets/" + x + ".png' style='width: 50%'><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Effects:</span><br>" + petBonus(x) + "</p></center>"
}

function petBonus(x) {
    result = ""
    if (!!pets[x].xpMulti) result += "x" + numberShort(pets[x].xpMulti) + " XP<br>"
    if (!!pets[x].xpCooldown) result += "/" + numberShort(pets[x].xpCooldown) + " XP Cooldowns<br>"
    if (!!pets[x].tokenMulti) result += "x" + numberShort(pets[x].tokenMulti) + " Tokens<br>"
    if (!!pets[x].rpMulti && game.prestige.reset == true) result += "x" + numberShort(pets[x].rpMulti) + " RP<br>"
    return result
}

function setSelectedPet(x) {
    game.pets.equipped = x
}

function unboxPet(x) { //Can run up to about a million flawlessly, but is capped at 1k, extra applies as bonus luck
    if (game.pets.buttonCooldowns[x] >= petButtons[x].cooldown / game.pets.cooldown) {
        let petsList = 0
        let rolls = roundRNG(game.pets.buttonCooldowns[x] / (petButtons[x].cooldown / game.pets.cooldown))
        let unboxPopup = false
        let baseLuck = game.pets.luck
        let luck = 1
        if (rolls > 1000) {
            baseLuck *= rolls / 1000
            rolls = 1000
        }
        game.pets.buttonCooldowns[x] = 0
        petsList = petButtons[x].odds()
        for (let j = 0; j < rolls; j++) {
            luck = baseLuck * rollAbilities()
            for (let i = 0; i < petsList.length; i++) {
                let amount = 0
                let odds = petsList[i][1] * luck //To add luck factor in here, and also some sort of repeated rolls thing
                let minimum = Math.floor(odds)
                amount += minimum
                let roll = Math.random()
                if (roll <= odds % 1) {
                    amount++
                }
                if (amount >= 1) {
                    let petChosen = petsList[i][0]
                    if (!game.pets.amount[petChosen]) { game.pets.amount[petChosen] = amount }
                    else { game.pets.amount[petChosen] += amount }
                    if (game.pets.amount[petChosen] >= 1 && game.pets.individualDiscovered[petChosen] == 0) { game.pets.individualDiscovered[petChosen] = 1 }
                    latestDrops(petChosen, amount)
                    if (pets[petChosen].power > pets[game.pets.equipped].power) { unboxPopup = true }
                    if (game.pets.masteredPetsList[petChosen] >= 1) { game.pets.masteryPoints += calculateMasteryGain(petChosen, amount) }
                }
            }
        }
        game.player.cratesOpened += rolls
        if (game.dailyBonuses.luckCharges >= 1) { game.dailyBonuses.luckCharges -= 1 }
        if (game.research.upgrades[25] == 0 && JSON.stringify(game.pets.unboxString) != JSON.stringify([[0, 0]])) { openCloseUnboxTab() }
        else {
            if (unboxPopup == true) { openCloseUnboxTab() }
        }
    }
}

function displayPetRarities(x) {
    if (x == -1) { document.getElementById("petRarities").innerHTML = "" }
    else {
        let petsList = petButtons[x].odds()
        document.getElementById("petRarities").innerHTML = "<img src='img/crate_" + petButtons[x].crateName + ".png' style='width:6vh'><br><b>Rarities for this crate:</b><br>"
        for (let i = 0; i < petsList.length; i++) {
            let odds = petsList[i][1] * game.pets.luck
            if (odds > 1) { document.getElementById("petRarities").innerHTML += pets[petsList[i][0]].name + ": " + Math.floor(odds) + " +" + ((odds % 1) * 100).toFixed(2) + "%<br>" }
            else if (odds >= 0.001) { document.getElementById("petRarities").innerHTML += pets[petsList[i][0]].name + ": " + (odds * 100).toFixed(2) + "%<br>" }
            else { document.getElementById("petRarities").innerHTML += pets[petsList[i][0]].name + ": 1/" + numberShort(1/odds) + "<br>" }
        }
        if (game.dailyBonuses.luckCharges >= 1) {
            document.getElementById("petRarities").innerHTML += "<br>You have " + wholeNumberShort(game.dailyBonuses.luckCharges) + " luck charges<br>x1.5 Luck will be used"
        }
    }
    game.pets.oddsDisplay = x
}

function openCloseUnboxTab() {
    if (document.getElementById("unboxDiv").style.display == "block") {
        document.getElementById("unboxDiv").style.display = "none"
        document.getElementById("unboxListInner").innerHTML = ""
        game.pets.unboxString = [[0, 0]]
    }
    else {
        document.getElementById("unboxDiv").style.display = "block"
        displayUnboxPets(game.pets.unboxString.length)
    }
}

function displayUnboxPets(x) {
    document.getElementById("unboxListInner").innerHTML = ""
    let unBox = document.createElement("div")
    unBox.style.display = "inline-block"
    unBox.style.position = "relative"
    unBox.style.width = "128px"
    unBox.style.height = "128px"
    unBox.style.margin = "8px 0 0 8px"
    unBox.style.border = "8px solid black"
    unBox.style.cursor = "pointer"
    unBox.style.backgroundColor = "#888"
    unBox.style.backgroundImage = "url('img/halftoneDots.png')"
    unBox.className += "unboxBox"
    unBoxes = document.getElementsByClassName("unboxBox");
    for (let i = 1; i < x; i++) {
        document.getElementById("unboxListInner").appendChild(unBox.cloneNode(true))
        unBoxes[i - 1].setAttribute("id", i)
        unBoxes[i - 1].addEventListener('click', function () { setSelectedPet(game.pets.unboxString[parseInt(this.id)][0]) })
        unBoxes[i - 1].addEventListener('mouseover', function () { showPetUnboxInfo(game.pets.unboxString[parseInt(this.id)][0]) })
        unBoxes[i - 1].addEventListener('mouseout', function () { showPetUnboxInfo(0) })
        //1st value is red, 2nd green and 3rd blue
        unBoxes[i - 1].innerHTML = "<img src='img/pets/" + game.pets.unboxString[i][0] + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
        unBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>" + wholeNumberShort(game.pets.unboxString[i][1]) + "</p>"
        unBoxes[i - 1].style.border = "8px outset #" + petBorderColor(game.pets.unboxString[i][0])
        if (game.pets.unboxString[i][0] == game.pets.equipped) { unBoxes[i - 1].style.backgroundColor = "#aa2" }
        if (pets[game.pets.unboxString[i][0]].power > pets[game.pets.equipped].power) { unBoxes[i - 1].style.backgroundColor = "#1a2" }
    }
    j = pets.length - 1
}

function showPetUnboxInfo(x) {
    if (x == 0) { document.getElementById("unboxInfo").innerHTML = "" }
    else document.getElementById("unboxInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + pets[x].name + "</span><br>You have " + wholeNumberShort(game.pets.amount[x]) + "<br><br>" + pets[x].specialText + "</p><br><img src='img/pets/" + x + ".png' style='width: 50%'><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Effects:</span><br>" + petBonus(x) + "</p></center>"
}

function latestDrops(x, y) {
    let added = 0
    for (let i = 0; i < game.pets.unboxString.length; i++) {
        if (x == game.pets.unboxString[i][0]) { //This line checks if the id is found inside the string. In case it is, it does the following:
            game.pets.unboxString[i][1] += y //Adds the specified amount (1 unless using simulated)
            i = game.pets.unboxString.length //Stops the count (Can be done with a "while (condition) && i < amount, but then you'd have to write the 1")
            added = 1 //The pet has been added
        }
    }
    if (added == 0) { game.pets.unboxString[game.pets.unboxString.length] = [x, y] } //If after all the attempts, no pet has been added, it will create a new entry up next with the system [pet id, amount]
}

function calculatePetMultis() {
    let baseCooldown = 1
    baseCooldown *= game.researchBonuses.petCooldown
    baseCooldown *= game.tokenBonuses.petCooldown
    game.pets.cooldown = baseCooldown
    let baseLuck = 1
    baseLuck *= game.tokenBonuses.luck
    baseLuck *= game.dailyBonuses.crateLuck
    if (game.prestige.reset == true) { baseLuck *= game.prestige.luckNerf }
    baseLuck *= game.researchBonuses.crateLuck
    game.pets.luck = baseLuck
}
setInterval(calculatePetMultis, 50)

function changeEmojis() {
    game.player.crateEmoji = !game.player.crateEmoji
}

function calculatePetRNG() {
    let result = "Last roll rng: 1/" + numberShort(game.pets.rollRNG)
    return result
}

function resetPetCooldowns() {
    for (let i = 0; i < petButtons.length; i++) {
        game.pets.buttonCooldowns[i] = petButtons[i].cooldown
    }
}

function collectAllPets() {
    for (let i = 0; i < petButtons.length; i++) {
        if ((game.pets.buttonCooldowns[i] >= petButtons[i].cooldown / game.xp.cooldown) && game.player.unlocks >= petButtons[i].unlock) {
            unboxPet(i)
        }
    }
}

function calculatePetAbilities() {
    let average = 1
    let odds = 0
    let multi = 1
    let reference = 0
    for (let i = 0; i < abilities.length; i++) {
        reference = abilities[i].reference()
        odds = abilities[i].oddsBase * reference
        multi = abilities[i].bonusBase
        game.pets.abilities[i] = [odds, multi]
        average *= 1 + odds * (multi - 1)
    }
    game.pets.abilityAverage = average
}
setInterval(calculatePetAbilities, 50)

function rollAbilities() {
    let luck = 1
    for (let i = 0; i < game.pets.abilities.length; i++) {
        if (Math.random() < game.pets.abilities[i][0]) { luck *= game.pets.abilities[i][1] }
    }
    return luck
}