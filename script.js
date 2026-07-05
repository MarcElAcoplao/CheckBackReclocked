var autosaveStarted = false
//Sets all variables to their base values
function reset() {
    game = {
        xp: {
            amount: [0, 0], //Big
            level: [1, 0], //Big
            multiplier: [1, 0], //Big
            expo: [1, 0], //Big
            cooldown: 1, //Normal
            buttonCooldowns: [600, 1200, 1800, 3000, 10000, 100000, 100000, 1000000, 1000000, 11111110, 11111110, 11111110], //List of normals
            levelCap: [1, 5], //Big
            lostXP: [0, 0], //Big
            pseudoLevel: [1, 0], //Big
            autoTicks: 0 //Normal
        },
        pets: {
            amount: [0, 0, 0], //List of normals with many entries
            multiplier: 1, //Normal
            cooldown: 1, //Normal
            buttonCooldowns: [0, 0, 0, 0], //List of normals
            discoveredTotal: 0, //Normal
            individualDiscovered: [0, 0, 0], //List of normals with many entries
            equipped: 0, //Normal
            unboxString: [[0, 0]], //List of lists of normals
            luck: 1, //Normal
            rollRNG: 1, //Normal
            autoTicks: 0, //Normal
            oddsDisplay: -1, //Normal
            masteryPoints: 0, //Normal
            masteredPetsList: [0, 0, 0, 0], //List of normals
            masteredPets: 0, //Normal
        },
        xpBoost: {
            amount: [1, 0], //Big
            multiplier: [1, 0], //Big
            expo: [1, 0], //Big
            cooldown: 1, //Normal
            buttonCooldowns: [0, 0, 0, 0, 0], //List of normals
            effectExpo: [1, 0], //Big, could work as normal
            effectiveBoost: [1, 0],
            autoTicks: 0, //Normal
        },
        tokens: {
            amount: 0, //Normal
            bankAmount: 1, //Normal
            gain: 0.1, //Normal, 0.1 base gain
            ticks: 10, //Normal
            cooldown: 1, //Normal
            upgrades: [0, 0, 0], //List of normals
            autoTicks: 0, //Normal
            softcapExpo: 1, //Normal
        },
        tokenBonuses: {
            xp: [1, 0], //Big
            xpCooldown: 1, //Normal
            xpBoost: [1, 0], //Big
            tokens: 1, //Normal
            luck: 1, //Normal
            xpBEffect: [1, 0], //Big
            rpMulti: 1, //Normal
        },
        player: {
            highestLevel: [1, 0], //Big
            ranks: 0, //Normal
            unlocks: 0, //Normal
            highestUnlocks: 0, //Normal
            currentTheme: 3, //Normal
            timeOfLastUpdate: Date.now(), //Normal
            sessionStart: Date.now(), //Normal
            speed: 1, //Normal
            currentTab: [2, 1], //Dropdown
            tabDropdown: 2, //Normal
            timePlayed: 0, //Normal
            buttonClicks: 0, //Normal
            cratesOpened: 0, //Normal
            online: false, //If this is false, whenever it updates cooldowns it won't count for playtime
            crateEmoji: true, //Bool
            versionNumber: 4, //Normal
            cratesComplete: 0, //Normal
        },
        daily: { //This is entirely remade
            days: 1, //Normal
            tokens: 0, //Normal
            cooldown: 86400, //Normal
            upgrades: [0, 0, 0, 0], //List of normals
            cooldownCap: 604800 //Normal
        },
        dailyBonuses: {
            luckCharges: 0, //Normal
            xp: [1, 0], //Big
            xpBoost: [1, 0], //Big
            crateLuck: 1, //Normal
            tokenBonus: 1, //Normal
            rp: 1, //Normal
        },
        dailyEffects: {
            timeSkip: 900000, //Normal
            xpBase: [5, -2], //Big
            xpBoostBase: [5, -2], //Big
            crateLuckBase: 0.05, //Normal
            tokenBonusBase: 0.05, //Normal
            ticks: 60, //Normal
            dataTime: 3600, //Normal
            rpBase: 0.1, //Normal
        },
        prestige: {
            reset: false, //Bool
            xpNerf: [6, -1], //Big
            luckNerf: 0.3, //Normal
            xpBoostNerf: [7, -1], //Big
            tokenNerf: 0.3 //Normal
        },
        research: {
            upgrades: [0, 0, 0, 0, 0], //List of normals
            active: 0, //Normal
            power: 0, //Normal
            data: 0, //Normal
            multi: 1, //Normal
            cooldown: 1, //Normal
            buttonCooldowns: [0, 0, 0, 0] //List of normals
        },
        researchBonuses: {
            xpMulti: [1, 0], //Big
            xpExpo: [1, 0], //Big
            xpCooldown: 1, //Normal
            crateLuck: 1, //Normal
            rpMulti: 1, //Normal
            xpBEffect: [1, 0], //Big
            xpBMulti: [1, 0], //Big
            petCooldown: 1, //Normal
            xpBCooldown: 1, //Normal
            tokenMulti: 1, //Normal
        },
        mining: { //This is a test
            depth: [0, 0], //Big
            oreInv: [[0, 0], [0, 0], [0, 0]], //List of bigs
            grid: [[0, 0], [0, 0]], //List of lists of random data
            amtGain: [1, 0], //Big
            depthMulti: [1, 0], //Big
            spawnSpeed: 1, //Normal
            gridSize: 1, //Normal
        },
        tycoon: {
            money: [0, 0], //Big
            tier: 0, //Normal
            upgrades: [0, 0, 0, 0, 0], //List of normals
            autoTicks: 0, //Normal
        }
    }
}
reset()

//If the user confirms the hard reset, resets all variables, saves and refreshes the page
function hardReset() {
    if (confirm("Are you sure you want to reset? You will lose everything!")) {
        reset()
        save()
        location.reload()
    }
}

function save() {
    //console.log("saving")
    game.lastSave = Date.now();
    localStorage.setItem("checkBackReclockedSave", JSON.stringify(game)); //change to "checkBackRelockedSave" when release coming up
}

function setAutoSave() {
    setInterval(save, 5000);
    autosaveStarted = true;
}
//setInterval(save, 5000)

function load() {
    reset()
    let loadgame = JSON.parse(localStorage.getItem("checkBackReclockedSave")) //change to "checkBackRelockedSave" when release coming up
    if (loadgame != null) { loadGame(loadgame) }

    updateSmall()
}

load()

function exportGame() {
    save()
    navigator.clipboard.writeText(btoa(JSON.stringify(game))).then(function () {
        alert("Copied to clipboard!")
    }, function () {
        alert("Error copying to clipboard, try again...")
    });
}

function importGame() {
    loadgame = JSON.parse(atob(prompt("Input your save here:")))
    if (loadgame && loadgame != null && loadgame != "") {
        reset()
        loadGame(loadgame)
        updateStuffOnLoad()
        save()
        location.reload()
    }
    else {
        alert("Invalid input.")
    }
}

function loadGame(loadgame) {
    //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
    let dataBackup = localStorage.getItem("checkBackReclockedSave"); //change to "checkBackRelockedSave" when release coming up
    try {
        let loadKeys = Object.keys(loadgame);
        if (loadKeys.length > 1000) loadKeys = Object.keys(fixFile(loadgame));
        for (let i = 0; i < loadKeys.length; i++) {
            if (loadgame[loadKeys[i]] != "undefined") {
                let thisKey = loadKeys[i];
                if (Array.isArray(loadgame[thisKey])) {
                    game[loadKeys[i]] = loadgame[thisKey].map((x) => { return x })
                }
                //else {game[Object.keys(game)[i]] = loadgame[loadKeys[i]]}
                else { game[loadKeys[i]] = loadgame[loadKeys[i]] }
            }
        }
    } catch (err) {
        //catch will prevent the data loading from continuing whenever a save file is incorrectly uploaded
        if (dataBackup !== null) localStorage.setItem("checkBackReclockedSave", dataBackup); //change to "checkBackRelockedSave" when release coming up
        window.alert(`Save Data Issues!\n${err}`); //whatever you want to say here
    }
}

function updateStuffOnLoad() {
    //Updates arrays of things like pets so that any new existing slot is 0 instead of undefined [where undefined + 1 = NaN]
    if (!game.pets.individualDiscovered) { game.pets.individualDiscovered = [0] }
    for (let i = 0; i < pets.length; i++) {
        if (!game.pets.amount[i]) { game.pets.amount[i] = 0 }
        if (!game.pets.individualDiscovered[i]) { game.pets.individualDiscovered[i] = 0 }
        if (game.pets.amount[i] >= 1 && game.pets.individualDiscovered[i] == 0) { game.pets.individualDiscovered[i] = 1 }
    }
    for (let i = 0; i < tokenUpgrades.length; i++) {
        if (!game.tokens.upgrades[i]) { game.tokens.upgrades[i] = 0 }
    }
    if (!game.daily.upgrades) { game.daily.upgrades = [0, 0, 0] }
    for (let i = 0; i < dailyUpgrades.length; i++) {
        if (!game.daily.upgrades[i]) { game.daily.upgrades[i] = 0 }
    }
    for (let i = 0; i < researches.length; i++) {
        if (!game.research.upgrades[i]) { game.research.upgrades[i] = 0 }
    }
    if (!game.mining.oreCooldowns) {game.mining.oreCooldowns = [0]}
    if (!game.mining.oreInv) {game.mining.oreInv = [[0, 0], [0, 0]]}
    if (!game.mining.grid) {game.mining.grid = [[0, 0], [0, 0]]}
    for (let i = 0; i < game.mining.gridSize; i++) {
        if (!game.mining.grid[i]) {game.mining.grid[i] = [0, 0]}
    }
    if (!game.pets.masteredPetsList) {game.pets.masteredPetsList = [0, 0, 0]}
    for (let i = 0; i < mastery.length; i++) {
        if (!game.pets.masteredPetsList[i]) {game.pets.masteredPetsList[i] = 0}
    }
    if (!game.player.versionNumber) {
        game.player.versionNumber = 2
        game.daily.tokens = 0
        game.dailyBonuses.luckCharges = 0
        game.dailyBonuses.timeSkip = 900000
        game.dailyBonuses.ticks = 60
    }
    if (game.player.versionNumber == 2) {
        game.player.versionNumber = 3
        game.daily.cooldown = 86400
    }
    if (game.player.versionNumber == 3) {
        game.player.versionNumber = 4
        game.prestige.reset = false
        game.prestige.xpNerf = [6, -1]
        game.prestige.luckNerf = 0.3
        game.prestige.xpBoostNerf = [5, -1]
        game.prestige.tokenNerf = 0.3
    }
    if (game.player.versionNumber == 4) {
        game.player.versionNumber = 5
        game.research.upgrades = [0, 0, 0, 0, 0]
        game.research.active = 0
        game.research.power = 0
        game.research.data = 0
        game.research.cooldown = 1
        game.daily.cooldownCap = 604800
        game.xp.autoTicks = 0
        game.pets.autoTicks = 0
        game.xpBoost.autoTicks = 0
        game.prestige.xpNerf = [6, -1] //This is because I made it first 0.4 on version 4 and then switched it
        game.pets.oddsDisplay = -1
        game.pets.masteryPoints = 0
        game.daily.dataTime = 3600
        resetXPCooldowns()
        resetPetCooldowns()
        resetXPBoostCooldowns()
    }
    changeTheme(game.player.currentTheme)
}
updateStuffOnLoad()

function updateSmall() { //This part checks if buttons are available or not, adds the flickering for tabs (to show a button is ready to use) and does a lot of number updates
    if (game.pets.equipped == 0) {
        document.getElementById("selectedPet").innerHTML = "None"
        document.getElementById("selectedPetImg").style.display = "none"
    }
    else {
        document.getElementById("selectedPet").innerHTML = pets[game.pets.equipped].name
        document.getElementById("selectedPetImg").style.display = "inline-block"
        document.getElementById("selectedPetImg").src = "img/pets/" + game.pets.equipped + ".png"
    }
    if (JSON.stringify(game.player.currentTab) == JSON.stringify([2, 1])) {
        for (let i = 0; i < XPButtons.length; i++) { //Displays whenever a button is ready to be clicked for x xp or whenever you have to wait y time to click it again
            if (game.xp.buttonCooldowns[i] < XPButtons[i].cooldown / game.xp.cooldown) {
                document.getElementById(XPButtons[i].name).disabled = true
                document.getElementById(XPButtons[i].name).innerHTML = "Check back in " + numberToTime(XPButtons[i].cooldown / game.xp.cooldown - game.xp.buttonCooldowns[i])
            }
            else {
                document.getElementById(XPButtons[i].name).disabled = false
                document.getElementById(XPButtons[i].name).innerHTML = "Gain " + displayBig(calculateXPGain(i)) + " XP"
                if (game.research.upgrades[11] >= 1) {document.getElementById(XPButtons[i].name).innerHTML += " (Auto claims: " + numberShort(game.xp.buttonCooldowns[i] / (XPButtons[i].cooldown / game.xp.cooldown)) + ")"}
            }
        }
    }
    if (JSON.stringify(game.player.currentTab) == JSON.stringify([2, 2])) {
        for (let i = 0; i < petButtons.length; i++) { //Displays whenever a button is ready to be clicked to open a crate or whenever you have to wait y time "WARNING: WILL NEED BULK ADDITION"
            if (game.pets.buttonCooldowns[i] < petButtons[i].cooldown / game.pets.cooldown) {
                document.getElementById(petButtons[i].name).disabled = true
                document.getElementById(petButtons[i].name).innerHTML = "Check back in " + numberToTime(petButtons[i].cooldown / game.pets.cooldown - game.pets.buttonCooldowns[i])
            }
            else {
                document.getElementById(petButtons[i].name).disabled = false
                document.getElementById(petButtons[i].name).innerHTML = ""
                if (game.player.crateEmoji == true) { document.getElementById(petButtons[i].name).innerHTML += petButtons[i].emoji}
                document.getElementById(petButtons[i].name).innerHTML += " Open a " + petButtons[i].crateName + " crate"
                if (game.research.upgrades[25] >= 1) {document.getElementById(petButtons[i].name).innerHTML += " (Auto claims: " + numberShort(game.pets.buttonCooldowns[i] / (petButtons[i].cooldown / game.pets.cooldown)) + ") "}
                if (game.player.crateEmoji == true) { document.getElementById(petButtons[i].name).innerHTML += petButtons[i].emoji}
            }
        }
    }
    if (JSON.stringify(game.player.currentTab) == JSON.stringify([2, 3])) {
        for (let i = 0; i < XPBoostButtons.length; i++) { //Displays whenever a button is ready to be clicked for x xpboost or whenever you have to wait y time to click it again
            if (game.xpBoost.buttonCooldowns[i] < XPBoostButtons[i].cooldown / game.xpBoost.cooldown) {
                document.getElementById(XPBoostButtons[i].name).disabled = true
                document.getElementById(XPBoostButtons[i].name).innerHTML = "Check back in " + numberToTime(XPBoostButtons[i].cooldown / game.xpBoost.cooldown - game.xpBoost.buttonCooldowns[i])
            }
            else {
                document.getElementById(XPBoostButtons[i].name).disabled = false
                document.getElementById(XPBoostButtons[i].name).innerHTML = "Gain " + displayBig(calculateXPBGain(i)) + " XPBoost"
                if (game.research.upgrades[33] >= 1) {document.getElementById(XPBoostButtons[i].name).innerHTML += "(Auto claims: " + numberShort(game.xpBoost.buttonCooldowns[i] / (XPBoostButtons[i].cooldown / game.xpBoost.cooldown)) + ")"}
            }
        }
    }
    if (JSON.stringify(game.player.currentTab) == JSON.stringify([2, 4])) {
        if (game.tokens.bankAmount >= 1) { document.getElementById("tokenButton0").disabled = false }
        else { document.getElementById("tokenButton0").disabled = true }
        document.getElementById("tokenButton0").innerHTML = "Tokens: " + numberShort(game.tokens.amount) + "<br>Ticks: " + numberShort(game.tokens.ticks) + "; Next gain: " + numberShort(game.tokens.gain) + "<br>Bank amount: " + numberShort(game.tokens.bankAmount) + " (Click to collect)<br>Average gain: " + numberShort(game.tokens.bankAmount / Math.max(1, game.tokens.ticks)) + "<br>Next auto tick: " + numberToTime((1200 - game.tokens.autoTicks) / 20)
        for (let i = 1; i < tokenUpgrades.length; i++) {
            document.getElementById(tokenUpgrades[i].name).innerHTML = "Level " + wholeNumberShort(game.tokens.upgrades[i]) + "/" + wholeNumberShort(tokenUpgrades[i].levels) + ". Effect: " + tokenUpgrades[i].effect + "<br>Cost: " + showTokenCost(i)
            if (game.tokens.amount >= (tokenUpgrades[i].baseCost * (tokenUpgrades[i].costScaling ** game.tokens.upgrades[i]))) { document.getElementById(tokenUpgrades[i].name).disabled = false }
            else { document.getElementById(tokenUpgrades[i].name).disabled = true }
        }
    }
    if (JSON.stringify(game.player.currentTab) == JSON.stringify([3, 1])) {
        for (let i = 0; i < researchButtons.length; i++) { //Displays whenever a button is ready to be clicked for x xpboost or whenever you have to wait y time to click it again
            if (game.research.buttonCooldowns[i] < researchButtons[i].cooldown / game.research.cooldown) {
                document.getElementById(researchButtons[i].name).disabled = true
                document.getElementById(researchButtons[i].name).innerHTML = "Check back in " + numberToTime(researchButtons[i].cooldown / game.research.cooldown - game.research.buttonCooldowns[i])
            }
            else {
                document.getElementById(researchButtons[i].name).disabled = false
                document.getElementById(researchButtons[i].name).innerHTML = "Gain " + displayBig(calculateRPgain(i)) + " RP"
            }
        }
    }
    let mainFlicker = false
    if (game.research.upgrades[11] == 0 && XPTab()) {
        document.getElementById("XPTab").classList.add("flickering")
        mainFlicker = true
    }
    else {
        document.getElementById("XPTab").classList.remove("flickering")
    }
    //Do this for the other 4 tabs
    if (game.research.upgrades[25] == 0 && CrateTab()) {
        document.getElementById("CratesTab").classList.add("flickering")
        mainFlicker = true
    }
    else {
        document.getElementById("CratesTab").classList.remove("flickering")
    }
    if (game.research.upgrades[33] == 0 && XPBoostTab()) {
        document.getElementById("XPBTab").classList.add("flickering")
        mainFlicker = true
    }
    else {
        document.getElementById("XPBTab").classList.remove("flickering")
    }
    if (TokenTab()) {
        document.getElementById("TokenTab").classList.add("flickering")
        mainFlicker = true
    }
    else {
        document.getElementById("TokenTab").classList.remove("flickering")
    }

    if (mainFlicker == true) {
        document.getElementById("MainTab").classList.add("flickering")
    }
    else {
        document.getElementById("MainTab").classList.remove("flickering")
    }
    if (game.daily.cooldown >= 86400) {
        document.getElementById("dailyButton").classList.add("flickering")
    }
    else {
        document.getElementById("dailyButton").classList.remove("flickering")
    }
    let researchFlicker = false
    let prestigeFlicker = false
    if (areResearchesAvailable()) {
        document.getElementById("ResearchMenu").classList.add("flickering")
        researchFlicker = true
    }
    else {
        document.getElementById("ResearchMenu").classList.remove("flickering")
    }
    if (researchFlicker == false && ResearchTab()) {
        researchFlicker = true
    }
    if (researchFlicker == true) {
        prestigeFlicker = true
        document.getElementById("ResearchTab").classList.add("flickering")
    }
    else {
        document.getElementById("ResearchTab").classList.remove("flickering")
    }
    if (game.player.unlocks >= 26 && MasteryTab()) {
        document.getElementById("MasteryTab").classList.add("flickering")
        prestigeFlicker = true
    }
    else {
        document.getElementById("MasteryTab").classList.remove("flickering")
    }
    if (prestigeFlicker == true) {
        document.getElementById("PrestigeTab").classList.add("flickering")
    }
    else {
        document.getElementById("PrestigeTab").classList.remove("flickering")
    }
    if (game.prestige.reset == true) {
        game.xp.levelCap = [1, 100]
    }
    else {
        game.xp.levelCap = [1, 5]
    }//If you edit this you're a real cheater
    if (compareBigEqual(game.xp.amount, levelToXP(game.xp.levelCap))) {
        game.xp.lostXP = addBig(game.xp.lostXP, substractBig(game.xp.amount, levelToXP(game.xp.levelCap)))
        game.xp.amount = levelToXP(game.xp.levelCap)
    } //If the xp you have is higher than whatever xp is needed for cap, then your xp gets set to the corresponding xp to the cap
    game.xp.level = XPToLevel([Math.max(game.xp.amount[0], 0), game.xp.amount[1]])
    game.xp.pseudoLevel = XPToLevel(addBig(game.xp.amount, game.xp.lostXP))
    if (compareBig(game.xp.level, game.player.highestLevel)) { game.player.highestLevel = game.xp.level } //If your current level is set to something higher than your recorded highest level, your highest level gets set to that level
    if (game.player.unlocks < unlockLevelsSmall.length) { document.getElementById("nextUnlockLevel").innerHTML = "You will unlock something new at level " + wholeNumberShort(unlockLevelsSmall[game.player.unlocks]) } //If player unlocks are still "inside" the small level unlocks, it displays that
    else { document.getElementById("nextUnlockLevel").innerHTML = "All unlocks achieved. Check back later for more content" }
    //else { document.getElementById("nextUnlockLevel").innerHTML = "You will unlock something new at level " + displayBig([1, unlockLevelsBig[game.player.unlocks - unlockLevelsSmall.length]]) } //Else if the player has gotten past that, it displays the level for the big level unlocks
    i = 0
    while (compareBigEqual(game.xp.level, levelBarColours[i + 1][0])) i++
    document.getElementById("levelBar").style.backgroundColor = levelBarColours[i][1]
    if (game.xp.level >= levelBarTextures[0]) {
        i = 0
        while (compareBigEqual(game.xp.level, levelBarTextures[i])) i++
        document.getElementById("levelBar").style.backgroundImage = "url('img/texture" + i + ".png')"
        document.getElementById("levelBarText").style.textShadow = "0.3vh 0.3vh rgba(0,0,0,0.6)"
        document.getElementById("levelBarRankText").style.textShadow = "0.3vh 0.3vh rgba(0,0,0,0.6)"
    }
    i = 0
    while (compareBigEqual(game.xp.level, ranks[i + 1].level)) { i++ }
    game.player.ranks = i
    document.getElementById("rank").innerHTML = ranks[game.player.ranks].name + " Clicker"
    const bar = document.getElementById("XPBarBack")
    if (JSON.stringify(game.player.currentTab) != JSON.stringify([3, 1])) {
        document.getElementById("level").innerHTML = "Level " + displayRoundBig(game.xp.level)
        if (JSON.stringify(game.xp.level) == JSON.stringify(game.xp.levelCap)) { document.getElementById("level").innerHTML += " (Capped, pseudo: " + displayRoundBig(game.xp.pseudoLevel) + " )" }
        //This bit is weird and gross
        //Sets the colour of the level bar, the texture of the level bar (if you're a high enough level), and your rank name
        //Sets the "XP to next level" text
        if (compareBig([5, 2], game.xp.level)) { //Single "XP to next level" in xp bar, up to level 500
            XPToNextLevel = substractBig(levelToXP(addBig(game.xp.level, 1)), levelToXP(game.xp.level)) //XP to next level = levelToXP(level + 1) - levelToXP(level) //substractBig(levelToXP(addBig(game.xp.level, 1)), levelToXP(game.xp.level))
            ProgressToNextLevel = substractBig(game.xp.amount, levelToXP(game.xp.level))
            document.getElementById("XPBarText").innerHTML = "XP to next level: " + numberShort(convertToNormal(ProgressToNextLevel)) + "/" + numberShort(convertToNormal(XPToNextLevel))
            document.getElementById("XPBarBack").style.width = (convertToNormal(ProgressToNextLevel) / convertToNormal(XPToNextLevel) * 100) + "%"
        }
        else if (game.player.unlocks < unlockLevelsSmall.length) {
            XPToNextUnlock = substractBig(levelToXP(unlockLevelsSmall[game.player.unlocks]), levelToXP(unlockLevelsSmall[game.player.unlocks - 1])) //XP to next level = levelToXP(level + 1) - levelToXP(level) //substractBig(levelToXP(addBig(game.xp.level, 1)), levelToXP(game.xp.level))
            ProgressToNextUnlock = substractBig(game.xp.amount, levelToXP(unlockLevelsSmall[game.player.unlocks - 1]))
            document.getElementById("XPBarText").innerHTML = "XP to next unlock: " + numberShort(convertToNormal(ProgressToNextUnlock)) + "/" + numberShort(convertToNormal(XPToNextUnlock))
            document.getElementById("XPBarBack").style.width = (convertToNormal(ProgressToNextUnlock) / convertToNormal(XPToNextUnlock) * 100) + "%"
        } //xp to next unlock
        else { //xp to next x10
            levelExpo = game.xp.pseudoLevel[1]
            XPToNextOoM = substractBig(levelToXP([1, levelExpo + 1]), levelToXP([1, levelExpo]))
            if (JSON.stringify(game.xp.level) == JSON.stringify(game.xp.levelCap)) { ProgressToNextOoM = substractBig(levelToXP(game.xp.pseudoLevel), levelToXP([1, levelExpo])) }
            else { ProgressToNextOoM = substractBig(game.xp.amount, levelToXP([1, levelExpo])) }

            document.getElementById("XPBarText").innerHTML = "XP to next x10 levels: " + displayBig(ProgressToNextOoM) + "/" + displayBig(XPToNextOoM)
            document.getElementById("XPBarBack").style.width = (convertToNormal(divideBig(ProgressToNextOoM, XPToNextOoM)) * 100) + "%"
        }
        bar.style.setProperty("--color1", "rgb(0, 187, 0)");
        bar.style.setProperty("--color2", "rgb(176, 251, 176)");
        /*
  else if (game.player.unlocks < unlockLevels.length) { //Displays "XP to next unlock" in xp bar, after unlocks space out significantly
  XPToNextUnlock = levelToXP(unlockLevels[game.player.unlocks])
  ProgressToNextUnlock = game.xp.amount
  document.getElementById("XPBarText").innerHTML = "XP to next unlock: " + numberShort(ProgressToNextUnlock) + "/" + numberShort(XPToNextUnlock)
  document.getElementById("XPBarBack").style.width = (ProgressToNextUnlock / XPToNextUnlock * 100) + "%"
  }
  else { //Displays "XP to next rank message" for when all unlocks are obtained
  XPToNextRank = levelToXP(ranks[game.player.ranks + 1][0])
  ProgressToNextUnlock = game.xp.amount
  document.getElementById("XPBarText").innerHTML = "XP to next rank: " + numberShort(game.XP) + "/" + numberShort(XPToNextRank)
  document.getElementById("XPBarBack").style.width = (ProgressToNextUnlock / XPToNextRank * 100) + "%"
  } */
    }
    else {
        document.getElementById("level").innerHTML = "Research Power: " + numberShort(game.research.power)
        if (game.research.active == 0) {
            document.getElementById("XPBarText").innerHTML = "No research active, select one in \"View Researches\""
            document.getElementById("XPBarBack").style.width = "0%"
        }
        else {
            document.getElementById("XPBarText").innerHTML = "Data: " + numberShort(game.research.data) + "/" + numberShort(researches[game.research.active].data)
            document.getElementById("XPBarBack").style.width = game.research.data / researches[game.research.active].data * 100 + "%"
        }
        bar.style.setProperty("--color1", "rgb(7, 228, 248)");
        bar.style.setProperty("--color2", "rgb(113, 97, 237)");
    }
}
setInterval(updateSmall, 50)

game.player.online = false

function updateLarge() {
    let size = XPButtons.length
    for (let i = 0; i < size; i++) { //Updates every xp cooldown based on the difference between current time and last time they have been updated. NOTE: This has to be copied for every set of button cooldowns
        if (game.xp.buttonCooldowns[i] >= 0) { game.xp.buttonCooldowns[i] += ((Date.now() - game.player.timeOfLastUpdate) / (1000 / game.player.speed)) }
        if (game.xp.buttonCooldowns[i] < 0 || !game.xp.buttonCooldowns[i]) { game.xp.buttonCooldowns[i] = 0 }
        if (!(game.research.upgrades[11] == 0 && game.player.unlocks < XPButtons[i].unlock)) {
            game.xp.buttonCooldowns[i] = Math.min(game.xp.buttonCooldowns[i], XPButtons[i].cooldown / game.xp.cooldown)
        }
    }
    size = petButtons.length
    for (let i = 0; i < size; i++) { //Updates every pet cooldown based on the difference between current time and last time they have been updated.
        if (game.pets.buttonCooldowns[i] >= 0) { game.pets.buttonCooldowns[i] += ((Date.now() - game.player.timeOfLastUpdate) / (1000 / game.player.speed)) }
        if (game.pets.buttonCooldowns[i] < 0 || !game.pets.buttonCooldowns[i]) { game.pets.buttonCooldowns[i] = 0 }
        if (!(game.research.upgrades[25] == 0 && game.player.unlocks < petButtons[i].cooldown)) {
            game.pets.buttonCooldowns[i] = Math.min(game.pets.buttonCooldowns[i], petButtons[i].cooldown / game.pets.cooldown)
        }
    }
    size = XPBoostButtons.length
    for (let i = 0; i < size; i++) { //Updates every xp cooldown based on the difference between current time and last time they have been updated. NOTE: This has to be copied for every set of button cooldowns
        if (game.xpBoost.buttonCooldowns[i] >= 0) { game.xpBoost.buttonCooldowns[i] += ((Date.now() - game.player.timeOfLastUpdate) / (1000 / game.player.speed)) }
        if (game.xpBoost.buttonCooldowns[i] < 0 || !game.xpBoost.buttonCooldowns[i]) { game.xpBoost.buttonCooldowns[i] = 0 }
        if (!(game.research.upgrades[33] == 0 && game.player.unlocks < XPBoostButtons[i].unlock)) { 
            game.xpBoost.buttonCooldowns[i] = Math.min(game.xpBoost.buttonCooldowns[i], XPBoostButtons[i].cooldown / game.xpBoost.cooldown)
        }
    }
    size = researchButtons.length
    for (let i = 0; i < size; i++) {
        if (game.research.buttonCooldowns[i] >= 0) { game.research.buttonCooldowns[i] += ((Date.now() - game.player.timeOfLastUpdate) / (1000 / game.player.speed)) }
        if (game.research.buttonCooldowns[i] < 0 || !game.research.buttonCooldowns[i]) { game.research.buttonCooldowns[i] = 0 }
        if (!(1 > 0 && game.player.unlocks < researchButtons[i].unlock)) { //Change when research automation is added
            game.research.buttonCooldowns[i] = Math.min(game.research.buttonCooldowns[i], researchButtons[i].cooldown / game.research.cooldown)
        }
    }
    if (game.daily.cooldown >= 0) { game.daily.cooldown += ((Date.now() - game.player.timeOfLastUpdate) / (1000 / game.player.speed)) }
    if (game.daily.cooldown < 0 || !game.daily.cooldown) { game.daily.cooldown = 0 }
    game.daily.cooldown = Math.min(game.daily.cooldown, 86400 * 7)
    if (game.research.active != 0) {
        game.research.data += game.research.power * ((Date.now() - game.player.timeOfLastUpdate) / (1000 / game.player.speed))
        checkResearchProgress(game.research.active)
    }
    if (game.player.online == true) {
        game.player.timePlayed += (Date.now() - game.player.timeOfLastUpdate) / 1000
    } //When you load, the "online" tag gets set to false. If it's false, on the first loop of update large it'll get set to true. Then, when true, updates playtime
    else {
        game.player.online = true
    }
    automationStuff(Math.round((Date.now() - game.player.timeOfLastUpdate) * game.player.speed / 50))
    game.player.timeOfLastUpdate = Date.now()
}
setInterval(updateLarge, 50) //Everything will update at ~20fps 

function numberToTime(x) { //Converts a number from seconds (example: 346) into an expression with days, hours, minutes and seconds (example: 5 minutes 46 seconds)
    if (typeof x === 'number' && !isNaN(x)) { //This first line makes sure that you've entered a number, that is not NaN
        xCeil = Math.ceil(x)
        result = ""
        if (xCeil >= 31536000) result += Math.floor(xCeil / 31536000) + "y "
        if (Math.floor(xCeil / 86400) % 365 != 0) result += Math.floor((xCeil / 86400) % 365) + "d "
        if (Math.floor(xCeil / 3600) % 24 != 0) result += (Math.floor(xCeil / 3600) % 24) + "h "
        if (Math.floor(xCeil / 60) % 60 != 0) result += (Math.floor(xCeil / 60) % 60) + "m "
        if (xCeil % 60 != 0) result += Math.floor(xCeil % 60) + "s "
        if (xCeil == 0) result = "0s"
        return result
    }
    else return "ERROR: Wrong time imput"
}

function numberShort(x) { //Abreviates a number into thousand, million, billion or then scientific. Also has more decimal precision between 0 and 1
    if (typeof x === 'number' && !isNaN(x)) {
        xCeil = Math.ceil(x)
        exponent = Math.floor(Math.log10(Math.abs(xCeil))) //Makes sure the number is positive
        result = ""
        if (exponent >= 12) result = (xCeil / 10 ** exponent).toFixed(2) + "e" + exponent //For over 1t, scientific notation is used
        else if (exponent >= 9) result = (xCeil / 10 ** 9).toFixed(1) + "&nbsp;B" //Billion (e9)
        else if (exponent >= 6) result = (xCeil / 10 ** 6).toFixed(1) + "&nbsp;M" //Million (e6)
        else if (exponent >= 3) result = (xCeil / 10 ** 3).toFixed(1) + "&nbsp;K" //Thousand (e3)
        else if (x < 1 && x > -1) result = (x).toFixed(3) //Uses 3 decimal places for -1 < x < 1
        else result = (x).toFixed(2) //2 Decimal places between 1 and 1k
        return result
    }
    else {
        return "Wrong number imput"
    }
}

function wholeNumberShort(x) { //What is different about the newspaper zombie, you may ask. Shortens whole numbers without decimals (No 8.00). Also, thousand starts at 10k and million+ use 2 digits
    if (typeof x === 'number' && !isNaN(x)) {
        xCeil = Math.ceil(x)
        exponent = Math.floor(Math.log10(Math.abs(xCeil))) //Makes sure the number is positive
        result = ""
        if (exponent >= 12) result = (xCeil / 10 ** exponent).toFixed(2) + "e" + exponent //For over 1t, scientific notation is used
        else if (exponent >= 9) result = (xCeil / 10 ** 9).toFixed(2) + "&nbsp;B" //Billion (e9)
        else if (exponent >= 6) result = (xCeil / 10 ** 6).toFixed(2) + "&nbsp;M" //Million (e6)
        else if (exponent >= 4) result = (xCeil / 10 ** 3).toFixed(1) + "&nbsp;K" //Thousand (e3)
        else result = (x).toFixed(0) //0 Decimal places from 0 to 10k
        return result
    }
    else {
        return "Wrong number imput"
    }
}

function xpUnlocks() { //Pending to remake this to the whole big number system, to do later, will probably scrap this into a just "level check for individual"
    if (game.player.unlocks < unlockLevelsSmall.length) {
        for (let i = 0; i < unlockLevelsSmall.length; i++) {
            if (convertToNormal(game.xp.level) >= unlockLevelsSmall[i] && game.player.unlocks < i + 1) { game.player.unlocks = i + 1 }
        }
    }
    if (game.player.unlocks > game.player.highestUnlocks || !game.player.highestUnlocks) {
        game.player.highestUnlocks = game.player.unlocks
    }
    /*else { //Enable this after update ig
        for (let i = 0; i < unlockLevelsBig.length; i++) {
            if (game.xp.level[1] >= unlockLevelsBig[i] && game.player.unlocks < i + 1 + unlockLevelsSmall.length) { game.player.unlocks = i + 1 + unlockLevelsSmall.length }
        }
    }*/
}
setInterval(xpUnlocks, 50)

function gridInitializer() { //Ignore this, it was a test, you might not see this in action until 2027, idk
    if (!(game.mining.grid.length == game.mining.gridSize)) {
        let oreInfo = [0, 0, 0, 0]
        let rows = [0]
        for (let i = 0; i < game.mining.gridSize; i++) { rows[i] = oreInfo }
        let table = [0]
        for (let i = 0; i < game.mining.gridSize; i++) { table[i] = rows }
        game.mining.grid = table
    }
}

function automationStuff(x) { //In charge of running through automation contents
    if (game.player.unlocks >= 18) { game.tokens.autoTicks += x }
    if (game.player.unlocks >= 18 && game.tokens.autoTicks >= 1200) {
        addTicks(1 + Math.floor(game.tokens.autoTicks / (1200 / game.tokens.cooldown) - 1))
        game.tokens.autoTicks = 0
    }
    if (game.research.upgrades[11] >= 1) {game.xp.autoTicks += x}
    if (game.xp.autoTicks >= 1200) {
        collectAllXP()
        game.xp.autoTicks = 0
    }
    if (game.research.upgrades[25] >= 1) {game.pets.autoTicks += x}
    if (game.pets.autoTicks >= 1200) {
        collectAllPets()
        game.pets.autoTicks = 0
    }
    if (game.research.upgrades[33] >= 1) {game.xpBoost.autoTicks += x}
    if (game.xpBoost.autoTicks >= 1200) {
        collectAllXPBoost()
        game.xpBoost.autoTicks = 0
    }
}

function changeTheme(x) {
    game.player.currentTheme = x
    if (x == 1) { document.getElementById("themeLink").href = "themes/themeLight.css" }
    else if (x == 2) { document.getElementById("themeLink").href = "themes/themeDark.css" }
    else if (x == 3) { document.getElementById("themeLink").href = "themes/themeNeon.css" }
    else if (x == 4) { document.getElementById("themeLink").href = "themes/themeGreen.css" }
    else if (x == 5) { document.getElementById("themeLink").href = "themes/themePurple.css" }
    else if (x == 6) { document.getElementById("themeLink").href = "themes/themeRed.css" }
    else if (x == 7) { document.getElementById("themeLink").href = "themes/themeAlternate.css" }
    else if (x == 8) { document.getElementById("themeLink").href = "themes/themeInverted.css" }
    else if (x == 9) { document.getElementById("themeLink").href = "themes/themeVolcano.css" }
    else if (x == 10) { document.getElementById("themeLink").href = "themes/themeMidnight.css" }
    //document.getElementById("themeLink").href = "themes/petButtons.css"
}

// Meta function guaranteed to run after the DOM is ready
function onDomReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

onDomReady(function () {
    document.addEventListener("keydown", function (event) {
        const key = event.key; // Or const {key} = event; in ES6+
        if (key === "Escape") {
            if (document.getElementById("petsDiv").style.display == "block") { openClosePetsTab() }
            if (document.getElementById("unboxDiv").style.display == "block") { openCloseUnboxTab() }
            if (document.getElementById("statsDiv").style.display == "block") { openCloseStatsTab() }
            if (document.getElementById("dailyDiv").style.display == "block") { openCloseDailyTab() }
            if (document.getElementById("researchDiv").style.display == "block") { openCloseResearchTab() }
            if (document.getElementById("masteryDiv").style.display == "block") { openCloseMasteryTab() }
        }
    });
});

// Syncing animations
document.addEventListener("animationstart", (event) => {
    if (event.animationName === "flickering") {
        let animationCurrentTime;
        let anims = document.getAnimations();
        for (let i = 0; i < anims.length; i++) {
            if (anims[i].animationName === event.animationName) {
                animationCurrentTime = anims[i].currentTime;
                break;
            }
        }

        for (let i = 0; i < anims.length; i++) {
            if (anims[i].animationName === event.animationName) {
                if (animationCurrentTime) anims[i].currentTime = animationCurrentTime;
            }
        }
    }
});

function unlockToLevel(x) {
    let result = 0
    if (x < unlockLevelsSmall.length) {
        result = convertToBig(unlockLevelsSmall[x - 1])
    }
    return result
}

function roundRNG(x) { //Rounds a number based on rng, 1.3 has a 30% chance to round to 2 and 70% to round to 1
    let result = 0
    if (Math.random() < x % 1) {result = Math.ceil(x)}
    else {result = Math.floor(x)}
    return result
}

function help() {
    alert("You're stuck? There's a Discord server to ask questions. One technical detail. Once you unlock automations, buttons will be able to clicked, let's say, 1.73 times. To avoid decimal odd-ities, and for commodity, that thing gets rounded rng-wise. AKA 73% chance of 2, 27% chance of 1. This approach averages the decimal number without opening a button a decimal amount of times. (If this isn't clear enough, ask in the discord)")
}

function collectAll() {
    let currentTab = JSON.stringify(game.player.currentTab)
    if (currentTab == JSON.stringify([2, 1])) {collectAllXP()}
    if (currentTab == JSON.stringify([2, 2])) {collectAllPets()}
    if (currentTab == JSON.stringify([2, 3])) {collectAllXPBoost()}
    if (currentTab == JSON.stringify([2, 4])) {buyAllTokens()}
    if (currentTab == JSON.stringify([3, 1]) && game.prestige.reset == true) {collectAllRP()}
    //call a different function based on tab, like a collect all xp function for xp
}