function openCloseStatsTab() {
    if (document.getElementById("statsDiv").style.display == "block") {
        document.getElementById("statsDiv").style.display = "none"
        document.getElementById("statsListInner").innerHTML = ""
    }
    else {
        document.getElementById("statsDiv").style.display = "block"
        displayStats()
    }
}

//Adds the squares for all the pets to the pets tab
function displayStats() {
    document.getElementById("statsListInner").innerHTML = ""
    let statsBox = document.createElement("div")
    statsBox.style.display = "inline-block"
    statsBox.style.position = "relative"
    statsBox.style.width = "128px"
    statsBox.style.height = "128px"
    statsBox.style.margin = "8px 0 0 8px"
    statsBox.style.border = "8px solid black"
    statsBox.style.cursor = "pointer"
    statsBox.style.backgroundColor = "#888"
    statsBox.style.backgroundImage = "url('img/halftoneDots.png')"
    statsBox.className += "statsBox"
    statsBoxes = document.getElementsByClassName("statsBox");
    for (let i = 1; i < stats.length; i++) {
        document.getElementById("statsListInner").appendChild(statsBox.cloneNode(true))
        statsBoxes[i - 1].setAttribute("id", i)
        statsBoxes[i - 1].addEventListener('click', function () { if (stats[parseInt(this.id)].unlock <= game.player.unlocks) { showStatInfo(parseInt(this.id)) } })
        if (game.player.unlocks >= stats[i].unlock) { //1st value is red, 2nd green and 3rd blue
            if (i == 3) { statsBoxes[i - 1].innerHTML = "<img src='img/pets/" + game.pets.equipped + ".png' style='width: 128px'>" }
            else { statsBoxes[i - 1].innerHTML = "<img src='img/statImages/" + i + ".png' style='width: 128px'>" }
            statsBoxes[i - 1].style.border = "8px outset #D6AE01"
        }
        else {
            statsBoxes[i - 1].innerHTML = "<img src='img/pets/" + i + ".png' style='width: 128px; filter: brightness(0)'>"
        }
    }
    j = stats.length - 1
}

function showStatInfo(x) {
    if (x == 0) { document.getElementById("statsInfo").innerHTML = "Hello World" }
    if (x == 1) { document.getElementById("statsInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Player stats</span><br><br>" + playerStats() }
    if (x == 2) { document.getElementById("statsInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>XP Stats</span><br><br>" + xpStats() }
}

function playerStats() {
    let result = ""
    result += "Highest level: " + wholeNumberShort(game.player.highestLevel) + "<br>"
    result += "Unlocks: " + wholeNumberShort(game.player.unlocks) + " / " + wholeNumberShort(unlockLevels.length) + "<br>"
    result += "Time played: " + numberToTime(game.player.timePlayed) + "<br>"
    result += "Button clicks: " + wholeNumberShort(game.player.buttonClicks) + "<br>"
    if (game.player.highestLevel >= 8) {
        result += "Crates opened: " + wholeNumberShort(game.player.cratesOpened) + "<br>"
        result += "Pets owned: " + countPets() + " / " + wholeNumberShort(pets.length - 1) + "<br>"
    }
    return result
}

function xpStats() {
    let result = "XP Multipliers:<br>"
    if (pets[game.pets.equipped].xpMulti > 1) { result += "x" + numberShort(pets[game.pets.equipped].xpMulti) + " from pets<br>" }
    result += "TOTAL: x" + numberShort(game.xp.multiplier) + "<br><br>XP Cooldown modifiers:<br>"

    result += "TOTAL: /" + numberShort(game.xp.cooldown)
    return result
}

function countPets() {
    let count = 0
    for (i = 1; i <= pets.length; i++) { if (game.pets.amount[i] > 0) { count++ } }
    return count
}