const petButtons = [ //The stats of every single xp button, also they are found on tab 2.1
    {name: "petButton0", id: 0, cooldown: 600, unlock: 5, crateName: "basic"},
    {name: "petButton1", id: 1, cooldown: 1200, unlock: 6, crateName: "nature"},
    {name: "petButton2", id: 2, cooldown: 3000, unlock: 9, crateName: "earth"},
  ]

const petBorders = [
    {upto: 4, color: "555"}, //1-4, Basic crate
    {upto: 10, color: "2c2"}, //5-10, Common crate
    {upto: 18, color: "a42"}, //11-18
    {upto: 999, color: "fff"},
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
    for (let i=1;i<pets.length;i++) {
      document.getElementById("petsListInner").appendChild(petBox.cloneNode(true))
      petBoxes[i-1].setAttribute("id", i)
      petBoxes[i-1].addEventListener('click', function(){
        if (game.pets.amount[parseInt(this.id)] > 0) {setSelectedPet(parseInt(this.id))}
      })
      petBoxes[i-1].addEventListener('mouseover', function(){
        if (game.pets.amount[parseInt(this.id)] > 0) {showPetInfo(parseInt(this.id))}
      })
      petBoxes[i-1].addEventListener('mouseout', function(){showPetInfo(0)})
      if (game.pets.amount[i] > 0) { //1st value is red, 2nd green and 3rd blue
        petBoxes[i-1].innerHTML = "<img src='img/pets/" + i + ".png' style='width: 128px'>"
        petBoxes[i-1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>" + wholeNumberShort(game.pets.amount[i]) + "</p>"
        petBoxes[i-1].style.border = "8px outset #" + petBorderColor(i)
      }
      else {
        petBoxes[i-1].innerHTML = "<img src='img/pets/" + i + ".png' style='width: 128px; filter: brightness(0)'>"
        petBoxes[i-1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>0</p>"
      }
    }
    j=pets.length-1
  }
  
  function petBorderColor(x) {
    for(let i=0;i<petBorders.length;i++) {
      if(x<=petBorders[i].upto) {
        return petBorders[i].color
      }
    }
  }

  function showPetInfo(x) {
    if (x==0) {document.getElementById("petInfo").innerHTML = ""}
    else document.getElementById("petInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + pets[x].name + "</span><br>You have " + wholeNumberShort(game.pets.amount[x]) + "<br><br>" + pets[x].specialText + "</p><br><img src='img/pets/" + x + ".png' style='width: 50%'><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Effects:</span><br>" + petStats(x) + "</p></center>"
  }

  function petStats(x) {
    result = ""
    if (pets[x].xpMulti > 1) result += "x" + numberShort(pets[x].xpMulti) + " XP<br>"
    return result
  }

  function setSelectedPet(x) {
    game.pets.equipped = x
  }

  function unboxAmount(x, y) {
    if (typeof x === 'number' && !isNaN(x) && typeof y === 'number' && !isNaN(y)) { //Checks whenever x and y are valid numbers
    if (Math.random() <= y%1) {amount = Math.ceil(y)}
    else {amount = Math.floor(y)} //Decides whether a number like 2.35 should be rounded up to 3 or down to 2, based on the decimal (35% to 3, 65% to 2)
    if (amount == 1) {unboxPet(x, amount)}
    if (amount > 1) {unboxPet(x, amount)}
    }
    else alert("ERROR: Crate type or amount not properly defined.")
  }

  function unboxPet(x, y) { //Planned to be for only 1 pet unbox
    let petsList = 0
    if (x == 0) {petsList = basicUnboxChances}
    if (x == 1) {petsList = natureUnboxChances}
    if (x == 2) {petsList = earthUnboxChances}
    for (let i=0;i<petsList.length;i++) {
      let odds = petsList[i][1] * game.pets.luck //To add luck factor in here, and also some sort of repeated rolls thing
      let minimum = Math.floor(odds)
      let amount = minimum
      let roll = Math.random()
      if (roll <= odds % 1) {amount++}
      if (amount >= 1) {
        let petChosen = petsList[i][0]
        if (!game.pets.amount[petChosen]) {game.pets.amount[petChosen] = amount}
        else {game.pets.amount[petChosen] += amount}
        latestDrops(petChosen, amount)
       }
      }
    game.pets.buttonCooldowns[x] = petButtons[x].cooldown / game.pets.cooldown
    game.player.cratesOpened += y
    openCloseUnboxTab()
  }

  function displayPetRarities(x) {
    if (x == -1) {document.getElementById("petRarities").innerHTML = ""}
    else {
    let petsList = 0
    if (x == 0) {
    petsList = basicUnboxChances
    document.getElementById("petRarities").innerHTML = "<img src='img/crateBasic.png' style='width:6vh'><br><b>Rarities for this crate:</b><br>"
    }
    if (x == 1) {
    petsList = natureUnboxChances
    document.getElementById("petRarities").innerHTML = "<img src='img/crateNature.png' style='width:6vh'><br><b>Rarities for this crate:</b><br>"
    }
    if (x == 2) {
    petsList = earthUnboxChances
    document.getElementById("petRarities").innerHTML = "<img src='img/crateEarth.png' style='width:6vh'><br><b>Rarities for this crate:</b><br>"
    }
    for(let i=0;i<petsList.length;i++) {
    let odds = petsList[i][1] * game.pets.luck
    if (odds > 1) {document.getElementById("petRarities").innerHTML += pets[petsList[i][0]].name + ": " + Math.floor(odds) + " +" + ((odds % 1) * 100).toFixed(2) + "%<br>"}
    else {document.getElementById("petRarities").innerHTML += pets[petsList[i][0]].name + ": " + (odds * 100).toFixed(2) + "%<br>"}
    }
   }
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
    for (let i=1;i<x;i++) {
      document.getElementById("unboxListInner").appendChild(unBox.cloneNode(true))
      unBoxes[i-1].setAttribute("id", i)
      unBoxes[i-1].addEventListener('click', function(){setSelectedPet(game.pets.unboxString[parseInt(this.id)][0])})
      unBoxes[i-1].addEventListener('mouseover', function(){showPetUnboxInfo(game.pets.unboxString[parseInt(this.id)][0])})
      unBoxes[i-1].addEventListener('mouseout', function(){showPetUnboxInfo(0)})
      //1st value is red, 2nd green and 3rd blue
        unBoxes[i-1].innerHTML = "<img src='img/pets/" + game.pets.unboxString[i][0] + ".png' style='width: 128px'>"
        unBoxes[i-1].innerHTML += "<p style='position: absolute; top: 0; left: 0; margin: 2px; color: white; font-size: 24px'>" + wholeNumberShort(game.pets.unboxString[i][1]) + "</p>"
        unBoxes[i-1].style.border = "8px outset #" + petBorderColor(game.pets.unboxString[i][0])
    }
    j=pets.length-1
  }

  function showPetUnboxInfo(x) {
    if (x==0) {document.getElementById("unboxInfo").innerHTML = ""}
    else document.getElementById("unboxInfo").innerHTML = "<br><br><center><p style='color: white'><span style='font-size: 32px; font-weight: bold'>" + pets[x].name + "</span><br>You have " + wholeNumberShort(game.pets.amount[x]) + "<br><br>" + pets[x].specialText + "</p><br><img src='img/pets/" + x + ".png' style='width: 50%'><br><p style='color: white'><span style='font-size: 32px; font-weight: bold'>Effects:</span><br>" + petStats(x) + "</p></center>"
  }

  function latestDrops(x, y) {
  let added = 0
  for (let i=0;i<game.pets.unboxString.length;i++) {
    if (x == game.pets.unboxString[i][0]) { //This line checks if the id is found inside the string. In case it is, it does the following:
      game.pets.unboxString[i][1] += y //Adds the specified amount (1 unless using simulated)
      i = game.pets.unboxString.length //Stops the count
      added = 1 //The pet has been added
    }
  }
  if (added == 0) {game.pets.unboxString[game.pets.unboxString.length] = [x, y]} //If after all the attempts, no pet has been added, it will create a new entry up next with the system [pet id, amount]
}