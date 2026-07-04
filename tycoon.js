/*function polynomial(x, a) {
    let result = 0
    let length = a.length
    for (let i = 0; i < length; i++) {
        if (typeof a[i] === 'number' && !isNaN(a[i])) {result += a[i] * x**(length - i - 1)}
        else if (a[i].length == 2 && x > a[i][1]) {result += a[i][0] * (x - a[i][1])**(length - i - 1)}
    }
    return result
}

function calculateUpgradeCost() {
    return displayBig(exponentBig([1, 1], polynomial(5, [1.5, 0.4, 0.4, 0.37, 1])))
}

function openCloseTycoonTab() {
    if (document.getElementById("tycoonDiv").style.display == "block") {
        document.getElementById("tycoonDiv").style.display = "none"
        document.getElementById("tycoonListInner").innerHTML = ""
    }
    else {
        document.getElementById("tycoonDiv").style.display = "block"
        displayTycoon()
    }
}
//This might be completely scrapped tbh
function displayTycoon() {
    document.getElementById("tycoonListInner").innerHTML = ""
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
    for (let i = 1; i < tycoonUpgrades.length; i++) {
        document.getElementById("tycoonListInner").appendChild(dailyBox.cloneNode(true))
        dailyBoxes[i - 1].setAttribute("id", i)
        dailyBoxes[i - 1].addEventListener('mouseout', function () { showTycoonInfo(0) })
        if (game.tycoon.tier >= tycoonUpgrades[i].tier) { //1st value is red, 2nd green and 3rd blue
            dailyBoxes[i - 1].addEventListener('click', function () { buyDailyUpgrade(parseInt(this.id)) })
            dailyBoxes[i - 1].innerHTML = "<img src='img/tycoon/" + i + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            dailyBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'></p>"
            dailyBoxes[i - 1].style.border = "8px outset #149304"
            dailyBoxes[i - 1].addEventListener('mouseover', function () { showTycoonInfo(parseInt(this.id)) })
        }
        else {
            dailyBoxes[i - 1].innerHTML = "<img src='img/tycoon/" + i + ".png' style='width: 128px; filter: brightness(0)' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            dailyBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'></p>"
            dailyBoxes[i - 1].addEventListener('mouseover', function () { showTycoonLockedInfo(parseInt(this.id)) })
        }
    }
}

function showTycoonInfo(x) {
    if (x == 0) {document.getElementById("tycoonInfo").innerHTML = ""}
    else {
        document.getElementById("tycoonInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + tycoonUpgrades[x].name + "</span><br>You have " + wholeNumberShort(game.tycoon.upgrades[x]) + "<br><br></p><br><img src='img/tycoon/" + x + ".png' style='width: 50%'onerror=\"this.onerror=null;this.src='img/pets/0.png';\"><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Effects:</span><br>" + showTycoonExtraInfo(x) + "</p></center>"
    }
}

function showTycoonExtraInfo(x) {
    let result = ""
    if (x == 1) {result += "You have " + displayBig(game.tycoon.money) + " money<br>Produces (money) money per second"}
    else if (x == 2) {result += "Tier " + wholeNumberShort(game.tycoon.tier) + "<br>Get " + displayBig([1, tierCostExpo[game.tycoon.tier]]) + " money to tier up<br>Resets all other tycoon progress"}
    else {result += "Upgrade x, level y/z"}
    return result
}

function showTycoonLockedInfo(x) {
    document.getElementById("tycoonInfo").innerHTML = "<center><p style='color: white'><span style='font-size: 32px; font-weight: bold'><br>Reach tier " + wholeNumberShort(tycoonUpgrades[x].tier) + " to unlock</span><br></p>"
}

function calculateTycoonStats() {
    let baseProdMulti = [1, 0]
    game.tycoon.multi = baseProdMulti
    let baseExpo = [1, 0]
    game.tycoon.expo = [1, 0]
}
setInterval(calculateTycoonStats, 50)
*/