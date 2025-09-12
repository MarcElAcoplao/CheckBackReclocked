const XPButtons = [ //The stats of every single xp button, also they are found on tab 2.1
    {name: "XPbutton0", xp: 10, cooldown: 60, unlock: 0},
    {name: "XPbutton1", xp: 20, cooldown: 120, unlock: 1},
    {name: "XPbutton2", xp: 30, cooldown: 300, unlock: 2},
    {name: "XPbutton3", xp: 50, cooldown: 600, unlock: 3},
    {name: "XPbutton4", xp: 100, cooldown: 1800, unlock: 4},
    {name: "XPbutton5", xp: 200, cooldown: 3600, unlock: 7},
    {name: "XPbutton6", xp: 500, cooldown: 10800, unlock: 8},
    {name: "XPbutton7", xp: 1000, cooldown: 21600, unlock: 11},
    {name: "XPbutton8", xp: 1500, cooldown: 43200, unlock: 12},
    {name: "XPbutton9", xp: 2500, cooldown: 86400, unlock: 15}, //Not planned yet after here
    {name: "XPbutton10", xp: 5000, cooldown: 259200, unlock: 17},
    {name: "XPbutton11", xp: 10000, cooldown: 604800, unlock: 18},
  ]

function xpButton(x) {
  game.xp.amount += calculateXPGain(XPButtons[x].xp) //Adds your xp
  game.xp.buttonCooldowns[x] = XPButtons[x].cooldown / game.xp.cooldown //Sets the xp button cooldown to the required time
  game.player.buttonClicks += 1
}

function calculateXPGain(x) { //You insert this command with the desired xp amount and it returns the gain after multipliers
  let xp = x * game.xp.multiplier
  return xp
}

function calculateXPStats() {
  game.xp.multiplier = 1 * pets[game.pets.equipped].xpMulti //Calculates your xp multiplier
  game.xp.cooldown = 1 //Calculates your xp cooldown divider
  game.daily.dailyXP = 1 * pets[game.pets.equipped].xpMulti
}
setInterval(calculateXPStats, 50)

function XPToLevel(x) {return Math.floor((x / 20) ** 0.5) + 1}
function levelToXP(x) {return Math.ceil((x-1) ** (1/0.5) * 20)}