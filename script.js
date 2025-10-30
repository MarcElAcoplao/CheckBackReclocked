var autosaveStarted = false
//Sets all variables to their base values
function reset() {
    game = {
        xp: {
            amount: [0, 0], //Big
            level: [1, 0], //Big
            multiplier: [1, 0], //Big
            cooldown: 1, //Normal
            buttonCooldowns: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //List of normals
            levelCap: [1, 10 ** 100], //Big
        },
        pets: {
            amount: [0, 0, 0], //List of normals with many entries
            multiplier: 1, //Normal
            cooldown: 1, //Normal
            buttonCooldowns: [0, 0, 0, 0, 0, 0, 0, 0], //List of normals
            discovered: 0, //Normal
            equipped: 0, //Normal
            unboxString: [[0, 0]], //List of lists of normals
            luck: 1, //Normal
        },
        player: {
            highestLevel: [1, 0], //Big
            ranks: 0, //Normal
            unlocks: 0, //Normal
            permanentUnlocks: 0, //Normal
            currentTheme: 2, //Normal
            timeOfLastUpdate: Date.now(), //Normal
            sessionStart: Date.now(), //Normal
            speed: 1, //Normal
            currentTab: [2, 1], //Normal
            timePlayed: 0, //Normal
            buttonClicks: 0, //Normal
            cratesOpened: 0, //Normal
        },
        daily: {
            days: 1, //Normal
            rewardLength: 2, //Normal
            rewards: [0, 1, 1, 0], //List of normals
            rewardCap: [0, 1, 1, 0], //List of normals
            dailyXP: [1, 0], //Big
            crateLuck: 1, //Normal
        },
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
    localStorage.setItem("checkBack2Save", JSON.stringify(game)); //change to "checkBackRelockedSave" when release coming up
}

function setAutoSave() {
    setInterval(save, 30000);
    autosaveStarted = true;
}
//setInterval(save, 5000)

function load() {
    reset()
    let loadgame = JSON.parse(localStorage.getItem("checkBack2Save")) //change to "checkBackRelockedSave" when release coming up
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
        save()
        location.reload()
    }
    else {
        alert("Invalid input.")
    }
}

function loadGame(loadgame) {
    //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
    let dataBackup = localStorage.getItem("checkBack2Save"); //change to "checkBackRelockedSave" when release coming up
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
        if (dataBackup !== null) localStorage.setItem("checkBack2Save", dataBackup); //change to "checkBackRelockedSave" when release coming up
        window.alert(`Save Data Issues!\n${err}`); //whatever you want to say here
    }
    //Updates arrays of things like pets so that any new existing slot is 0 instead of undefined [where undefined + 1 = NaN]
    for (i = 0; i <= pets.length; i++) { if (!game.pets.amount[i]) { game.pets.amount[i] = 0 } }
}

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

    for (let i = 0; i < XPButtons.length; i++) { //Displays whenever a button is ready to be clicked for x xp or whenever you have to wait y time to click it again
        if (game.xp.buttonCooldowns[i] > 0) {
            document.getElementById(XPButtons[i].name).disabled = true
            document.getElementById(XPButtons[i].name).innerHTML = "Check back in " + numberToTime(game.xp.buttonCooldowns[i])
        }
        else {
            document.getElementById(XPButtons[i].name).disabled = false
            document.getElementById(XPButtons[i].name).innerHTML = "Gain " + displayBig(calculateXPGain(i)) + " XP"
        }
    }
    for (let i = 0; i < petButtons.length; i++) { //Displays whenever a button is ready to be clicked to open a crate or whenever you have to wait y time "WARNING: WILL NEED BULK ADDITION"
        if (game.pets.buttonCooldowns[i] > 0) {
            document.getElementById(petButtons[i].name).disabled = true
            document.getElementById(petButtons[i].name).innerHTML = "Check back in " + numberToTime(game.pets.buttonCooldowns[i])
        }
        else {
            document.getElementById(petButtons[i].name).disabled = false
            document.getElementById(petButtons[i].name).innerHTML = "Unbox a random " + petButtons[i].crateName + " pet"
        }
    }
    if (compareBig(game.xp.amount, levelToXP(game.xp.levelCap))) { game.xp.amount = levelToXP(game.xp.levelCap) } //If the xp you have is higher than whatever xp is needed for cap, then your xp gets set to the corresponding xp to the cap
    game.xp.level = XPToLevel([Math.max(game.xp.amount[0], 0), game.xp.amount[1]])
    if (compareBig(game.xp.level, game.player.highestLevel)) { game.player.highestLevel = game.xp.level } //If your current level is set to something higher than your recorded highest level, your highest level gets set to that level
    if (game.player.unlocks < unlockLevelsSmall.length) { document.getElementById("nextUnlockLevel").innerHTML = "You will unlock something new at level " + wholeNumberShort(unlockLevelsSmall[game.player.unlocks]) } //If player unlocks are still "inside" the small level unlocks, it displays that
    else { document.getElementById("nextUnlockLevel").innerHTML = "You will unlock something new at level " + displayBig([1, unlockLevelsBig[game.player.unlocks - unlockLevelsSmall.length]]) } //Else if the player has gotten past that, it displays the level for the big level unlocks
    if (game.player.currentTab[0] <= 2) {
        document.getElementById("level").innerHTML = "Level " + displayRoundBig(game.xp.level)
        if (JSON.stringify(game.xp.level) == JSON.stringify(game.xp.levelCap)) { document.getElementById("level").innerHTML += " (Cap: " + displayRoundBig(game.xp.levelCap) + " )" }

        //This bit is weird and gross
        //Sets the colour of the level bar, the texture of the level bar (if you're a high enough level), and your rank name
        i = 0
        while (compareBig(game.xp.level, levelBarColours[i + 1][0])) i++
        document.getElementById("levelBar").style.backgroundColor = levelBarColours[i][1]
        console.log(i)
        if (game.xp.level >= levelBarTextures[0]) {
            i = 0
            while (compareBig(game.xp.level, levelBarTextures[i])) i++
            document.getElementById("levelBar").style.backgroundImage = "url('img/texture" + i + ".png')"
            document.getElementById("levelBarText").style.textShadow = "0.3vh 0.3vh rgba(0,0,0,0.6)"
            document.getElementById("levelBarRankText").style.textShadow = "0.3vh 0.3vh rgba(0,0,0,0.6)"
        }
        document.getElementById("rank").innerHTML = "Clicking to make this work (Ranks are WIP)"
        //Sets the "XP to next level" text
        if (compareBig([1, 100], game.xp.level)) { //Single "XP to next level" in xp bar, up to level 1e100
            XPToNextLevel = substractBig(levelToXP(addBig(game.xp.level, 1)), levelToXP(game.xp.level)) //XP to next level = levelToXP(level + 1) - levelToXP(level) //substractBig(levelToXP(addBig(game.xp.level, 1)), levelToXP(game.xp.level))
            ProgressToNextLevel = substractBig(game.xp.amount, levelToXP(game.xp.level))
            document.getElementById("XPBarText").innerHTML = "XP to next level: " + numberShort(convertToNormal(ProgressToNextLevel)) + "/" + numberShort(convertToNormal(XPToNextLevel))
            document.getElementById("XPBarBack").style.width = (convertToNormal(ProgressToNextLevel) / convertToNormal(XPToNextLevel) * 100) + "%"
        }
        else {
            levelExpo = game.xp.level[1]
            XPToNextOoM = substractBig(levelToXP([1, levelExpo + 1]), levelToXP([1, levelExpo]))
            ProgressToNextOoM = substractBig(game.xp.amount, levelToXP([1, levelExpo]))
            document.getElementById("XPBarText").innerHTML = "XP to next x10 levels: " + displayBig(ProgressToNextOoM) + "/" + displayBig(XPToNextOoM)
            document.getElementById("XPBarBack").style.width = (convertToNormal(divideBig(ProgressToNextOoM, XPToNextOoM)) * 100) + "%"
        }
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
}
setInterval(updateSmall, 50)

function updateLarge() {

    for (let i = 0; i < XPButtons.length; i++) { //Updates every xp cooldown based on the difference between current time and last time they have been updated. NOTE: This has to be copied for every set of button cooldowns
        if (game.xp.buttonCooldowns[i] > 0) game.xp.buttonCooldowns[i] -= ((Date.now() - game.player.timeOfLastUpdate) / (1000 / game.player.speed))
        if (game.xp.buttonCooldowns[i] < 0) game.xp.buttonCooldowns[i] = 0
        if (!game.xp.buttonCooldowns[i]) game.xp.buttonCooldowns[i] = 0
    }
    for (let i = 0; i < petButtons.length; i++) { //Updates every xp cooldown based on the difference between current time and last time they have been updated. NOTE: This has to be copied for every set of button cooldowns
        if (game.pets.buttonCooldowns[i] > 0) game.pets.buttonCooldowns[i] -= ((Date.now() - game.player.timeOfLastUpdate) / (1000 / game.player.speed))
        if (game.pets.buttonCooldowns[i] < 0) game.pets.buttonCooldowns[i] = 0
        if (!game.pets.buttonCooldowns[i]) game.pets.buttonCooldowns[i] = 0
    }

    if (Date.now() - game.player.timeOfLastUpdate <= 200) { game.player.timePlayed += (Date.now() - game.player.timeOfLastUpdate) / 1000 } //If the time since the last update is less than 200ms (50ms update + 150ms lag leeway), it assumes you're online and updates playtime accordingly
    game.player.timeOfLastUpdate = Date.now()
}
setInterval(updateLarge, 50) //Everything will update at ~20fps 

function numberToTime(x) { //Converts a number from seconds (example: 346) into an expression with days, hours, minutes and seconds (example: 5 minutes 46 seconds)
    if (typeof x === 'number' && !isNaN(x)) { //This first line makes sure that you've entered a number, that is not NaN
        xCeil = Math.ceil(x)
        result = ""
        if (xCeil >= 86400) result += Math.floor(xCeil / 86400) + "d "
        if (Math.floor(xCeil / 3600) % 24 != 0) result += (Math.floor(xCeil / 3600) % 24) + "h "
        if (Math.floor(xCeil / 60) % 60 != 0) result += (Math.floor(xCeil / 60) % 60) + "m "
        if (xCeil % 60 != 0) result += Math.floor(xCeil % 60) + "s "
        return result
    }
    else return "ERROR: Wrong time imput"
}

function numberShort(x) { //Abreviates a number into thousand, million, billion or then scientific. Also has more decimal precision between 0 and 1
    if (typeof x === 'number' && !isNaN(x)) {
        xCeil = Math.ceil(x)
        exponent = Math.floor(Math.log10(Math.abs(xCeil))) //Makes sure the number is positive
        result = ""
        if (exponent >= 12) result = (xCeil / 10 ** exponent).toFixed(2) + "&nbsp;e" + exponent //For over 1t, scientific notation is used
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
        if (exponent >= 12) result = (xCeil / 10 ** exponent).toFixed(2) + "&nbsp;e" + exponent //For over 1t, scientific notation is used
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

function xpUnlocks() { //Pending to remake this to the whole big number system, to do later
    if (game.player.unlocks < unlockLevelsSmall.length) {
        for (let i = 0; i < unlockLevelsSmall.length; i++) {
            if (convertToNormal(game.xp.level) >= unlockLevelsSmall[i] && game.player.unlocks < i + 1) { game.player.unlocks = i + 1 }
        }
    }
    else {
        for (let i = 0; i < unlockLevelsBig.length; i++) {
            if (game.xp.level[1] >= unlockLevelsBig[i] && game.player.unlocks < i + 1 + unlockLevelsSmall.length) { game.player.unlocks = i + 1 + unlockLevelsSmall.length }
        }
    }
}
setInterval(xpUnlocks, 50)