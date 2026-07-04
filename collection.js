/*function openCloseOresTab() {
    if (document.getElementById("oresDiv").style.display == "block") {
        document.getElementById("oresDiv").style.display = "none"
        document.getElementById("oresListInner").innerHTML = ""
    }
    else {
        document.getElementById("oresDiv").style.display = "block"
        displayOreInventory()
    }
}

//Adds the squares for all the pets to the pets tab
function displayOreInventory() {
    document.getElementById("oresListInner").innerHTML = ""
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
    for (let i = 1; i < ores.length; i++) {
        document.getElementById("oresListInner").appendChild(petBox.cloneNode(true))
        petBoxes[i - 1].setAttribute("id", i)
        petBoxes[i - 1].addEventListener('click', function () {
            if (game.pets.amount[parseInt(this.id)] > 0) { setSelectedPet(parseInt(this.id)) }
        })
        petBoxes[i - 1].addEventListener('mouseover', function () {
            if (game.pets.amount[parseInt(this.id)] > 0) { showOreInfo(parseInt(this.id)) }
        })
        petBoxes[i - 1].addEventListener('mouseout', function () { showOreInfo(0) })
        if (game.pets.amount[i] > 0) { //1st value is red, 2nd green and 3rd blue
            petBoxes[i - 1].innerHTML = "<img src='img/ores/" + ores[i].name + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            petBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>" + wholeNumberShort(game.pets.amount[i]) + "</p>"
            petBoxes[i - 1].style.border = "8px outset #" + petBorderColor(i)
        }
        else {
            petBoxes[i - 1].innerHTML = "<img src='img/pets/" + i + ".png' style='width: 128px; filter: brightness(0)' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            petBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>0</p>"
        }
    }
    j = pets.length - 1
}

function showOreInfo(x) {
    if (x == 0) { document.getElementById("oresInfo").innerHTML = "" }
    else document.getElementById("oresInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + ores[x].name + "</span><br>You have " + wholeNumberShort(game.pets.amount[x]) + "<br><br></p><br><img src='img/ores/" + ores[x].name + ".png' style='width: 50%'><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Depth:</span><br></p></center>"
}

function calculateCollectionStats() {
    game.mining.amtGain = [1, 0]
    game.mining.depthMulti = [1, 0]
    game.mining.spawnSpeed = 1
    game.mining.gridSize = 1
}

function openCloseCollectionTab() {
    if (document.getElementById("collectionDiv").style.display == "block") {
        document.getElementById("collectionDiv").style.display = "none"
        document.getElementById("collectionListInner").innerHTML = ""
    }
    else {
        document.getElementById("collectionDiv").style.display = "block"
        displayCollection()
    }
}

//Adds the squares for all the pets to the pets tab
function displayCollection() {
    document.getElementById("collectionListInner").innerHTML = ""
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
    for (let i = 1; i < game.mining.gridSize; i++) {
        document.getElementById("collectionListInner").appendChild(petBox.cloneNode(true))
        petBoxes[i - 1].setAttribute("id", i)
        petBoxes[i - 1].addEventListener('click', function () {
            if (game.pets.amount[parseInt(this.id)] > 0) { setSelectedPet(parseInt(this.id)) }
        })
        petBoxes[i - 1].addEventListener('mouseover', function () {
            if (game.pets.amount[parseInt(this.id)] > 0) { showOreInfo(parseInt(this.id)) }
        })
        petBoxes[i - 1].addEventListener('mouseout', function () { showOreInfo(0) })
        if (game.pets.amount[i] > 0) { //1st value is red, 2nd green and 3rd blue
            petBoxes[i - 1].innerHTML = "<img src='img/ores/" + ores[i].name + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            petBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>" + wholeNumberShort(game.pets.amount[i]) + "</p>"
            petBoxes[i - 1].style.border = "8px outset #" + petBorderColor(i)
        }
        else {
            petBoxes[i - 1].innerHTML = "<img src='img/pets/" + i + ".png' style='width: 128px; filter: brightness(0)' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            petBoxes[i - 1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>0</p>"
        }
    }
    j = pets.length - 1
}

function generateOre(x) {
    let id = 0
    let cooldown = 0
    let totalWeight = 0
    let i = 1
    let unlocked = true
    while (i < ores.length && unlocked == true) {
        if (compareBigEqual(game.mining.depth, ores[i].depth)) {
            totalWeight += ores[i].spawnOdds
        }
        else {
            unlocked = false
        }
        i++
    }
    for (let j = 1; j < i; j++) {
        if (Math.random() <= ores[j].spawnOdds / totalWeight) {
            id = j
            j = i
        }
        else {
            totalWeight -= ores[j].spawnOdds
        }
    }
    cooldown = ores[id].spawnTime
    game.mining.grid[x] = [id, cooldown]
    return id
}

function claimOre(x) {
    if (game.mining.grid[x][1] == 0) {
        let amount = calculateOreAmountGain(x)
        let depth = multiplyBig(calculateOreDepthGain(x), amount)
        game.mining.depth = addBig(game.mining.depth, depth)
        game.mining.oreInv[x] = addBig(game.mining.oreInv[x], amount)
        game.mining.grid[x] = [0, 0]
    }
}

function calculateOreAmountGain(x) { //To be made later
    return [1, 0]
}

function calculateOreDepthGain(x) { //To be made later
    return [1, 0]
}
    */