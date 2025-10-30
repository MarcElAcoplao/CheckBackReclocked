/*TAB MAP: game.player.currentTab[main, sub] (Formatted at main.sub, for example 2.1 is [2, 1])
1.0: Collections (Each button opens a popup-menu)
    Pet inventory button
2.0: Main buttons (Each button opens a sub-group)
    2.1: XP Buttons
    2.2: Pet Crates
*/

const mainTabs = [ //Represents the names and unlocks for each main tab
    { name: "InventoryTab", unlock: 5 },
    { name: "MainTab", unlock: 5 },
]

const inventorySubTab = [ //Represents the names and unlocks for each subtab inside the "Inventory" content
    { name: "petsInventory", unlock: 5 },
]

const mainSubTab = [ //Represents the names and unlocks for each subtab inside the "Main" content
    { name: "XPTab", unlock: 5 },
    { name: "CratesTab", unlock: 5 },
]

const otherFunniesDisplay = [
    { name: "selectedPetText", unlock: 5 },
]

function tab(x) {
    game.player.currentTab = [x, 0]
    console.log(x)
}

function subtab(x) {
    game.player.currentTab[1] = x
}

function displayTabContent() {
    for (i = 0; i < XPButtons.length; i++) { //If the player has the unlock requirement for an xp button AND is inside the specific tab, the button will show, either it will hide
        if (game.player.unlocks >= XPButtons[i].unlock && JSON.stringify(game.player.currentTab) == JSON.stringify([2, 1])) { document.getElementById(XPButtons[i].name).style.display = "block" }
        else { document.getElementById(XPButtons[i].name).style.display = "none" }
    }
    for (i = 0; i < petButtons.length; i++) { //If the player has the unlock requirement for a crate button AND is inside the specific tab, the button will show, either it will hide
        if (game.player.unlocks >= petButtons[i].unlock && JSON.stringify(game.player.currentTab) == JSON.stringify([2, 2])) { document.getElementById(petButtons[i].name).style.display = "block" }
        else { document.getElementById(petButtons[i].name).style.display = "none" }
    }
}
setInterval(displayTabContent, 50)

function displayTabButtons() {
    for (i = 0; i < mainTabs.length; i++) {
        if (game.player.unlocks >= mainTabs[i].unlock) { document.getElementById(mainTabs[i].name).style.display = "block" }
        else { document.getElementById(mainTabs[i].name).style.display = "none" }
    }
}
setInterval(displayTabButtons, 50)

function displayInventoryButtons() {
    for (i = 0; i < inventorySubTab.length; i++) {
        if (game.player.unlocks >= inventorySubTab[i].unlock && JSON.stringify(game.player.currentTab) == JSON.stringify([1, 0])) { document.getElementById(inventorySubTab[i].name).style.display = "block" }
        else { document.getElementById(inventorySubTab[i].name).style.display = "none" }
    }
}
setInterval(displayInventoryButtons, 50)

function displayMainButtons() {
    for (i = 0; i < mainSubTab.length; i++) {
        if (game.player.unlocks >= mainSubTab[i].unlock && JSON.stringify(game.player.currentTab) == JSON.stringify([2, 0])) { document.getElementById(mainSubTab[i].name).style.display = "block" }
        else { document.getElementById(mainSubTab[i].name).style.display = "none" }
    }
    if (game.player.permanentUnlocks >= 1) { document.getElementById("dailyButton").style.display = "block" }
    else { document.getElementById("dailyButton").style.display = "none" }
}
setInterval(displayMainButtons, 50)

function displayFunnies() {
    for (i = 0; i < otherFunniesDisplay.length; i++) {
        if (game.player.unlocks >= otherFunniesDisplay[i].unlock) { document.getElementById(otherFunniesDisplay[i].name).style.display = "block" }
        else { document.getElementById(otherFunniesDisplay[i].name).style.display = "none" }
    }
}
setInterval(displayFunnies, 50)
