function openCloseMasteryTab() {
    if (document.getElementById("masteryDiv").style.display == "block") {
        document.getElementById("masteryDiv").style.display = "none"
        document.getElementById("masteryListInner").innerHTML = ""
    }
    else {
        document.getElementById("masteryDiv").style.display = "block"
        displayMastery()
    }
}

//Adds the squares for all the pets to the pets tab
function displayMastery() {
    document.getElementById("masteryListInner").innerHTML = ""
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
        document.getElementById("masteryListInner").appendChild(petBox.cloneNode(true))
        petBoxes[i - 1].setAttribute("id", i)
        petBoxes[i - 1].addEventListener('click', function () { purchaseMastery(parseInt(this.id)) })
        petBoxes[i - 1].addEventListener('mouseover', function () {
            if (game.pets.amount[parseInt(this.id)] > 0) { showMasteryInfo(parseInt(this.id)) }
        })
        petBoxes[i - 1].addEventListener('mouseout', function () { showMasteryInfo(0) })
        if (canBuyMastery(i)) { petBoxes[i - 1].style.backgroundColor = "#aa2" }
        if (game.pets.amount[i] > 0) { //1st value is red, 2nd green and 3rd blue
            petBoxes[i - 1].innerHTML = "<img src='img/pets/" + i + ".png' style='width: 128px' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
            petBoxes[i - 1].style.border = "8px outset #" + petBorderColor(i)
            if (game.pets.masteredPetsList[i] >= 1) { petBoxes[i - 1].style.backgroundColor = "#1a2" }
        }
        else {
            petBoxes[i - 1].innerHTML = "<img src='img/pets/" + i + ".png' style='width: 128px; filter: brightness(0)' onerror=\"this.onerror=null;this.src='img/pets/0.png';\">"
        }
    }
    j = pets.length - 1
}

function showMasteryInfo(x) {
    if (x == 0) { document.getElementById("masteryInfo").innerHTML = "" }
    else document.getElementById("masteryInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + pets[x].name + "</span><br>You have " + wholeNumberShort(game.pets.amount[x]) + "<br><br>" + pets[x].specialText + "</p><br><img src='img/pets/" + x + ".png' style='width: 50%'><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Mastery Cost:</span><br>" + masteryCostDisplay(x) + "<br><br>MP gain/pet: " + wholeNumberShort(mastery[x].masteryGain) + "</p></center>"
}

function masteryCostDisplay(x) {
    let result = "Pet cost: " + wholeNumberShort(game.pets.amount[x]) + " / " + wholeNumberShort(mastery[x].petCost) + "<br>MP Cost: " + wholeNumberShort(game.pets.masteryPoints) + " / " + wholeNumberShort(mastery[x].masteryCost)
    return result
}

function countMasteryPets() {
    let count = 0
    for (let i = 1; i < mastery.length; i++) {
        if (game.pets.masteredPetsList[i] >= 1) {
            count++
        }
    }
    game.pets.masteredPets = count
}
setInterval(countMasteryPets, 50)

function canBuyMastery(x) {
    let result = false
    if (game.pets.amount[x] >= mastery[x].petCost && game.pets.masteryPoints >= mastery[x].masteryCost && game.pets.masteredPetsList[x] == 0) { result = true }
    return result
}

function calculateMasteryGain(x, y) {
    let result = mastery[x].masteryGain * y
    return result
}

function purchaseMastery(x) {
    if (canBuyMastery(x)) {
        game.pets.amount[x] -= mastery[x].petCost
        if (game.pets.amount[x] <= 0) {game.pets.amount[x] = 1}
        game.pets.masteryPoints -= mastery[x].masteryCost
        game.pets.masteredPetsList[x] = 1
    }
    openCloseMasteryTab()
    openCloseMasteryTab()
}