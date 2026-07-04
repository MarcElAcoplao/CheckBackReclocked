function openCloseDailyTab() {
    if (document.getElementById("dailyDiv").style.display == "block") {
        document.getElementById("dailyDiv").style.display = "none"
        document.getElementById("dailyListInner").innerHTML = ""
    }
    else {
        document.getElementById("dailyDiv").style.display = "block"
        displayDaily()
    }
}
//This might be completely scrapped tbh
function displayDaily() {
    document.getElementById("dailyListInner").innerHTML = ""
    let dailyBox = document.createElement("div")
    dailyBox.style.display = "inline-block"
    dailyBox.style.position = "relative"
    dailyBox.style.width = "128px"
    dailyBox.style.height = "128px"
    dailyBox.style.margin = "8px 0 0 8px"
    dailyBox.style.border = "8px solid black"
    dailyBox.style.cursor = "pointer"
    dailyBox.style.backgroundColor = "#888"
    dailyBox.style.backgroundImage = "url('img/halftoneDots.png')"
    dailyBox.className += "dailyBox"
    dailyBoxes = document.getElementsByClassName("dailyBox");
    for (let i = 1; i < dailyUpgrades.length; i++) {
        document.getElementById("dailyListInner").appendChild(dailyBox.cloneNode(true))
        dailyBoxes[i - 1].setAttribute("id", i)
        dailyBoxes[i - 1].addEventListener('mouseout', function () { showDailyInfo(0) })
        if (game.player.unlocks >= dailyUpgrades[i].unlock) { //1st value is red, 2nd green and 3rd blue
            dailyBoxes[i - 1].addEventListener('click', function () { buyDailyUpgrade(parseInt(this.id)) })
            dailyBoxes[i - 1].innerHTML = "<img src='img/daily/" + i + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            dailyBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'></p>"
            dailyBoxes[i - 1].style.border = "8px outset #1b516d"
            dailyBoxes[i - 1].addEventListener('mouseover', function () { showDailyInfo(parseInt(this.id)) })
        }
        else {
            dailyBoxes[i - 1].innerHTML = "<img src='img/daily/" + i + ".png' style='width: 128px; filter: brightness(0)' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            dailyBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'></p>"
            dailyBoxes[i - 1].addEventListener('mouseover', function () { showDailyLockedInfo(parseInt(this.id)) })
        }
    }
    j = dailyUpgrades.length
}

function showDailyInfo(x) {
    if (x == 0) { document.getElementById("dailyInfo").innerHTML = "" }
    else if (x == 1) { document.getElementById("dailyInfo").innerHTML = "<center><p style='color: white'><span style='font-size: 32px; font-weight: bold'><br>Day " + wholeNumberShort(game.daily.days) + "</span><br></p><br><img src='img/daily/1.png' style='width: 50%'><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Gain " + wholeNumberShort(100 + 5 * (game.daily.days - 1)) + " Daily tokens</span><br>Time storage: " + numberToTime(game.daily.cooldown) + " / " + numberToTime(game.daily.cooldownCap) + "<br>Can claim " + wholeNumberShort(Math.floor(game.daily.cooldown / 86400)) + " times<br>Next claim in " + numberToTime(86400 - game.daily.cooldown % 86400) + "</p></center><br>" }
    else { document.getElementById("dailyInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + dailyUpgrades[x].name + "</span><br>You have " + wholeNumberShort(game.daily.upgrades[x]) + "<br><br><img src='img/daily/" + x + ".png' style='width: 50%'><br><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Effect:</span><br>" + dailyUpgrades[x].effect + "<br>" + showExtraDailyInfo(x) + "<br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Cost:</span><br>" + numberShort(game.daily.tokens) + " / " + numberShort(dailyUpgrades[x].baseCost + dailyUpgrades[x].costScaling * game.daily.upgrades[x]) }
}

function showExtraDailyInfo(x) {
    result = ""
    if (x == 2) {
        result = "Time skipped: " + numberToTime(game.dailyEffects.timeSkip / 1000)
    }
    if (x == 3) {
        result = "XP Gain: " + displayBig(multiplyBig(calculateXPGain(0), [1, 1])) + "<br>Multiplier: +5%/level"
    }
    if (x == 4 && game.research.upgrades[25] >= 1) {
        result = "Because of auto crates, opens one of your best crate on purchase"
    }
    if (x == 5) {
        result = "XPBoost Gain: " + displayBig(multiplyBig(calculateXPBGain(0), [1, 1])) + "<br>Multiplier: +5%/level"
    }
    if (x == 6) {
        result = "Ticks added: " + wholeNumberShort(game.dailyEffects.ticks) + "<br>Multiplier: +5%/Level"
    }
    if (x == 7) {
        result = "Data time: " + numberToTime(game.dailyEffects.dataTime) + "<br>Multiplier: +10%/Level<br>(Data added does nothing if no research is active)"
    }
    return result
}

function showDailyLockedInfo(x) {
    document.getElementById("dailyInfo").innerHTML = "<center><p style='color: white'><span style='font-size: 32px; font-weight: bold'><br>Reach level " + displayBig(unlockToLevel(dailyUpgrades[x].unlock)) + " to unlock</span><br></p>"
}

function buyDailyUpgrade(x) {
    if (x == 1) { claimDailyReward() }
    else {
        let cost = dailyUpgrades[x].baseCost + dailyUpgrades[x].costScaling * game.daily.upgrades[x]
        let amount = 0
        if (game.daily.tokens >= cost) {
            game.daily.tokens -= cost
            //Calls each individual purchase thing effect
            if (x == 2) {
                game.daily.cooldown -= game.dailyEffects.timeSkip/1000
                game.player.timeOfLastUpdate -= game.dailyEffects.timeSkip
            }
            if (x == 3) {
                amount = multiplyBig(calculateXPGain(0), [1, 1])
                game.xp.amount = addBig(game.xp.amount, amount)
            }
            if (x == 4) {
                game.dailyBonuses.luckCharges++
                if (game.research.upgrades[25] >= 1) {
                    let i = 0
                    while ( i < (petButtons.length - 1) && game.player.unlocks >= petButtons[i].unlock) {i++}
                    game.pets.buttonCooldowns[i] = petButtons[i].cooldown
                    unboxPet(i, 1)
                }
            }
            if (x == 5) {
                amount = multiplyBig(calculateXPBGain(0), [1, 1])
                game.xpBoost.amount = addBig(game.xpBoost.amount, amount)
            }
            if (x == 6) {
                addTicks(game.dailyEffects.ticks)
            }
            if (x == 7) {
                game.research.data += game.research.power * game.dailyEffects.dataTime
            }
            game.daily.upgrades[x]++
            showDailyInfo(x)
        }
    }
}

function claimDailyReward() {
    if (game.daily.cooldown >= 86400) {
        game.daily.cooldown -= 86400
        game.daily.tokens += 100 + 5 * (game.daily.days - 1)
        game.daily.days++
        game.daily.upgrades[2] = 0
    }
}

function calculateDailyBonuses() {
    game.dailyBonuses.xp = addBig(1, multiplyBig(game.dailyEffects.xpBase, game.daily.upgrades[3]))
    let baseLuck = 1
    if (game.dailyBonuses.luckCharges >= 1) { baseLuck *= 1.5 }
    baseLuck *= (1 + game.dailyEffects.crateLuckBase * game.daily.upgrades[4])
    game.dailyBonuses.crateLuck = baseLuck
    game.dailyBonuses.xpBoost = addBig(1, multiplyBig(game.dailyEffects.xpBase, game.daily.upgrades[5]))
    game.dailyBonuses.tokenBonus = (1 + game.dailyEffects.tokenBonusBase * game.daily.upgrades[6])
    game.dailyBonuses.rp = (1 + game.dailyEffects.rpBase * game.daily.upgrades[7])
}
setInterval(calculateDailyBonuses, 50)

function calculateDailyUpgradeEffects() {
    game.dailyEffects.timeSkip = 900000
    game.dailyEffects.ticks = 60
    game.dailyEffects.dataTime = 3600
    game.dailyEffects.xpBase = [5, -2]
    game.dailyEffects.xpBoostBase = [5, -2]
    game.dailyEffects.crateLuckBase = 0.05
    game.dailyEffects.tokenBonusBase = 0.05
    game.dailyEffects.rpBase = 0.1
}
setInterval(calculateDailyUpgradeEffects, 50)