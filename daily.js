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
    for (let i = 1; i <= game.daily.rewardLength; i++) {
        document.getElementById("dailyListInner").appendChild(dailyBox.cloneNode(true))
        dailyBoxes[i - 1].setAttribute("id", i)
        dailyBoxes[i - 1].addEventListener('click', function () { if (game.daily.rewards[parseInt(this.id)] > 0) { setSelectedPet(parseInt(this.id)) } })
        dailyBoxes[i - 1].addEventListener('mouseover', function () { showDailyInfo(parseInt(this.id)) })
        dailyBoxes[i - 1].addEventListener('mouseout', function () { showDailyInfo(0) })
        if (game.daily.rewards[i] > 0) { //1st value is red, 2nd green and 3rd blue
            dailyBoxes[i - 1].innerHTML = "<img src='img/daily/" + i + ".png' style='width: 128px'>"
            dailyBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>" + wholeNumberShort(game.daily.rewards[i]) + "</p>"
            dailyBoxes[i - 1].style.border = "8px outset #6C4675"
        }
        else {
            dailyBoxes[i - 1].innerHTML = "<img src='img/daily/" + i + ".png' style='width: 128px; filter: brightness(0)'>"
            dailyBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>0</p>"
        }
    }
    j = game.daily.rewardLength
}

function showDailyInfo(x) {
    if (x == 0) { document.getElementById("dailyInfo").innerHTML = "" }
    if (x == 1) { document.getElementById("dailyInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + dailyRewards[x].name + "</span><br>Day " + wholeNumberShort(game.daily.days) + "</p><br><img src='img/daily/" + x + ".png' style='width: 50%'><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>XP Gain: " + dailyXP() + "</span></p></center><br>Formula: (800 + 200 * days) * dailyXP" }
}

function dailyXP() {
    let amountXP = (800 + 200 * game.daily.days) * game.daily.dailyXP
    return numberShort(amountXP)
}