function openCloseAchievementsTab() {
    if (document.getElementById("achievementsDiv").style.display == "block") {
        document.getElementById("achievementsDiv").style.display = "none"
        document.getElementById("achievementsListInner").innerHTML = ""
    }
    else {
        document.getElementById("achievementsDiv").style.display = "block"
        displayAchievements()
    }
}

function displayAchievements() {
    document.getElementById("achievementsListInner").innerHTML = ""
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
    for (let i = 1; i < achievements.length; i++) {
        document.getElementById("achievementsListInner").appendChild(dailyBox.cloneNode(true))
        dailyBoxes[i - 1].setAttribute("id", i)
        dailyBoxes[i - 1].addEventListener('mouseout', function () { showAchievementInfo(0) })
        if (game.player.highestUnlocks >= achievements[i].unlock) { //1st value is red, 2nd green and 3rd blue
            dailyBoxes[i - 1].addEventListener('click', function () { claimAchievement(parseInt(this.id)) })
            dailyBoxes[i - 1].innerHTML = "<img src='img/achievements/" + i + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            dailyBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>" + wholeNumberShort(game.achievements.completions[i]) + "/" + wholeNumberShort(achievements[i].requirements.length) + "</p>"
            dailyBoxes[i - 1].style.border = "8px outset #0b7b34"
            dailyBoxes[i - 1].addEventListener('mouseover', function () { showAchievementInfo(parseInt(this.id)) })
            if (canClaimAchievement(i)) { dailyBoxes[i - 1].style.backgroundColor = "#aa2" }
            if (game.achievements.completions[i] >= achievements[i].requirements.length) { dailyBoxes[i - 1].style.backgroundColor = "#1a2" }
        }
        else {
            dailyBoxes[i - 1].innerHTML = "<img src='img/achievements/" + i + ".png' style='width: 128px; filter: brightness(0)' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            dailyBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'></p>"
            dailyBoxes[i - 1].addEventListener('mouseover', function () { showAchievementLockedInfo(parseInt(this.id)) })
        }
    }
    j = achievements.length
}

function showAchievementInfo(x) {
    if (x == 0) { document.getElementById("achievementsInfo").innerHTML = "" }
    else { document.getElementById("achievementsInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + achievements[x].name + "</span><br>Tiers: " + wholeNumberShort(game.achievements.completions[x]) + "/" + wholeNumberShort(achievements[x].requirements.length) + "<br>Rewards: " + sumAchievementRewards(x, 0, game.achievements.completions[x]) + "/" + sumAchievementRewards(x, 0, 9999) + " Daily tokens<br><br><img src='img/achievements/" + x + ".png' style='width: 50%'><p style='color: white'>" + showExtraAchievementInfo(x) + "<br><br><span style='font-size: 30px; font-weight: bold'>Achievement info:</span><br>" + achievements[x].description }
}

function showAchievementLockedInfo(x) {
    document.getElementById("achievementsInfo").innerHTML = "<center><p style='color: white'><span style='font-size: 32px; font-weight: bold'><br>Reach level " + displayBig(unlockToLevel(achievements[x].unlock)) + " to unlock</span><br></p>"
}

function showExtraAchievementInfo(x) {
    let result = ""
    if (game.achievements.completions[x] >= achievements[x].requirements.length) { result = "This achievement is maxed. Check Back later for more tiers" }
    else {
        if (achievements[x].type == "big") { result += "<span style='font-size: 30px; font-weight: bold'>Progress: </span><br>" + displayBig(achievements[x].reference()) + " / " + displayBig(achievements[x].requirements[game.achievements.completions[x]]) + "<br>" }
        else { result += "<span style='font-size: 30px; font-weight: bold'>Progress:</span><br>" + numberShort(achievements[x].reference()) + " / " + numberShort(achievements[x].requirements[game.achievements.completions[x]]) + "<br>" }
        result += "<span style='font-size: 30px; font-weight: bold'>Reward:</span><br>" + numberShort(achievements[x].rewards[game.achievements.completions[x]]) + " Daily tokens"
    }
    return result
}

function canClaimAchievement(x) {
    let result = false
    if (game.achievements.completions[x] < achievements[x].requirements.length && game.player.highestUnlocks >= achievements[x].unlock) {
        if (achievements[x].type == "big") {
            result = compareBigEqual(achievements[x].reference(), achievements[x].requirements[game.achievements.completions[x]])
        }
        else {
            result = (achievements[x].reference() >= achievements[x].requirements[game.achievements.completions[x]])
        }
    }
    return result
}

function claimAchievement(x) {
    while (canClaimAchievement(x)) {
        game.daily.tokens += achievements[x].rewards[game.achievements.completions[x]]
        game.achievements.completions[x]++
    }
    openCloseAchievementsTab()
    openCloseAchievementsTab()
}

function sumAchievementRewards(x, a, b) { //Calculates rewards from achievement x, from completion a to b. [a, b] is limited within x's achievement range, and is enforced
    let result = 0
    let start = Math.max(0, a) //If (a < 0), sets start to 0
    let end = Math.min(b, achievements[x].rewards.length) //If (b > achievement tiers), sets end to the total amount of achievement rewards, allows for quick "9999" reference in "up to end" cases
    for (let i = start; i < end; i++) {
        result += achievements[x].rewards[i]
    }
    return result
}

function checkAchievementsAvailable() {
    let result = false
    let i = 0
    while (i < achievements.length && !result) {
        result = canClaimAchievement(i)
        i++
    }
    game.achievements.canClaim = result
}
setInterval(checkAchievementsAvailable, 50)

function countAchievements(type) {
    let result = 0
    if (type == "owned") {
        for (let i = 1; i < achievements.length; i++) {
            result += game.achievements.completions[i]
        }
    }
    else {
        for (let i = 1; i < achievements.length; i++) {
            result += achievements[i].requirements.length
        }
    }
    return result
}

const achievements = [
    { //0 is test
        name: "test",
        requirements: [0],
        rewards: [0],
        unlock: 0,
        type: "small",
        description: "You will not see this",
        reference: () => -1,
    },
    { //1 is a tutorial module
        name: "Tutorial achievement",
        requirements: [1],
        rewards: [100],
        unlock: 0,
        type: "small",
        description: "Tutorial module! This one is absolutely free. Yellow background means achievement is ready to claim, and green means maxed out. The achievements button will flicker whenever one achievement is ready, so make sure to look at it",
        reference: () => 1,
    },
    { //2 Levels achievement
        name: "Level maker",
        requirements: [[1, 1], [4, 1], [1.5, 2], [5, 2], [5, 3], [1, 5], [1, 6], [1, 10], [1, 14], [1, 20], [1, 23]],
        rewards: [100, 200, 300, 400, 500, 600, 900, 1500, 2000, 2500, 3000],
        unlock: 0,
        type: "big",
        description: "Easy one to start out, reach the required level to claim",
        reference: () => game.player.highestLevel,
    },
    { //3 Pets discovered
        name: "The zookeeper",
        requirements: [4, 10, 18, 26, 34, 42],
        rewards: [100, 200, 350, 550, 800, 1000],
        unlock: 5,
        type: "small",
        description: "Discover the required amount of pets to claim",
        reference: () => game.pets.discoveredTotal,
    },
    { //4 XPBoost effect
        name: "Booster guide",
        requirements: [[5, 0], [3, 1], [5, 2], [5, 4], [2, 6], [4, 7], [1, 9], [1, 12]], //Is the final one possible? We'll see
        rewards: [200, 300, 450, 700, 850, 1000, 1500, 3000],
        unlock: 12,
        type: "big",
        description: "Reach this much xpboost effect multiplier (all-time)",
        reference: () => game.achievements.highestXPBoostEffect,
    },
    { //5 Tokens in bank
        name: "The deflation bank",
        requirements: [5, 100, 15000, 1000000, 10**8, 10**10],
        rewards: [500, 750, 1250, 2000, 3000, 5000],
        unlock: 18,
        type: "small",
        description: "Reach the required amount of highest tokens in the bank to claim (HARD)",
        reference: () => game.achievements.highestTokenBank,
    },
    { //6 Research Power
        name: "More power? Research it",
        requirements: [10, 500, 30000, 5*10**6, 10**9, 10**11, 10**13],
        rewards: [1000, 1500, 2000, 2500, 3000, 4000, 5000],
        unlock: 25,
        type: "small",
        description: "Obtain research power to complete this achievement",
        reference: () => game.achievements.highestRP,
    },
    { //7 Mastered pets
        name: "Master, master",
        requirements: [2, 4, 6, 10, 14, 18],
        rewards: [1000, 1250, 1500, 1750, 2000, 2500],
        unlock: 26,
        type: "small",
        description: "Master enough pets to claim",
        reference: () => game.achievements.highestRP,
    },
    { //8 Replicanti
        name: "Replicate upon me",
        requirements: [[1, 6], [1, 30], [1, 100], [1, 200], [1.8, 308], [1, 1000], [1, 10000]],
        rewards: [1000, 1500, 2000, 2500, 3000, 4000, 5000],
        unlock: 34,
        type: "big",
        description: "Obtain enough replicanti to claim",
        reference: () => game.achievements.highestReplicanti,
    },
    { //9 Tickets
        name: "Ticket maker",
        requirements: [2, 15, 100, 800, 5000],
        rewards: [1500, 2000, 2500, 3500, 4500],
        unlock: 42,
        type: "small",
        description: "Obtain enough highest tickets to claim",
        reference: () => game.achievements.highestTickets,
    },
]