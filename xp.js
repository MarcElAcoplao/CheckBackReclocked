const XPButtons = [ //The stats of every single xp button, also they are found on tab 2.1
    { name: "XPbutton0", xpMantissa: 1, xpExponent: 1, cooldown: 60, unlock: 0 }, //10
    { name: "XPbutton1", xpMantissa: 2, xpExponent: 1, cooldown: 120, unlock: 1 }, //20
    { name: "XPbutton2", xpMantissa: 3, xpExponent: 1, cooldown: 300, unlock: 2 }, //30
    { name: "XPbutton3", xpMantissa: 5, xpExponent: 1, cooldown: 600, unlock: 3 }, //50
    { name: "XPbutton4", xpMantissa: 1, xpExponent: 2, cooldown: 1800, unlock: 4 }, //100
    { name: "XPbutton5", xpMantissa: 2, xpExponent: 2, cooldown: 3600, unlock: 7 }, //200
    { name: "XPbutton6", xpMantissa: 5, xpExponent: 2, cooldown: 10800, unlock: 8 }, //500
    { name: "XPbutton7", xpMantissa: 1, xpExponent: 3, cooldown: 21600, unlock: 11 }, //1000
    { name: "XPbutton8", xpMantissa: 1.5, xpExponent: 3, cooldown: 43200, unlock: 12 }, //1500
    { name: "XPbutton9", xpMantissa: 2.5, xpExponent: 3, cooldown: 86400, unlock: 15 }, //Not planned yet after here 2500
    { name: "XPbutton10", xpMantissa: 5, xpExponent: 3, cooldown: 259200, unlock: 17 }, //5000
    { name: "XPbutton11", xpMantissa: 1, xpExponent: 4, cooldown: 604800, unlock: 18 }, //10000
]

function xpButton(x) {
    game.xp.amount = addBig(game.xp.amount, calculateXPGain(x)) //Adds your xp
    game.xp.buttonCooldowns[x] = XPButtons[x].cooldown / game.xp.cooldown //Sets the xp button cooldown to the required time
    game.player.buttonClicks += 1
}

function calculateXPGain(x) { //You insert this command with the desired xp amount and it returns the gain after multipliers
    let base = [XPButtons[x].xpMantissa, XPButtons[x].xpExponent]
    let result = multiplyBig(base, game.xp.multiplier)
    return result
}

function calculateXPStats() {
    let baseMulti = [1, 0] //This has to be multiplied by each factor, 1 line at a time
    baseMulti = multiplyBig(baseMulti, pets[game.pets.equipped].xpMulti) //Although pet multiplier being "small", it can get converted to big
    game.xp.multiplier = baseMulti
    game.xp.cooldown = 1 //Calculates your xp cooldown divider
}
setInterval(calculateXPStats, 50)

function XPToLevel(x) { //x represents a number [a,b] where x = a * 10^b
    if (x.length == 2) {
        if (x[1] < 100) {
            let number = convertToNormal(x)
            let result = Math.floor((number / 20) ** 0.5) + 1
            return convertToBig(result)
        }
        else {
            let newMantissa = 2.236
            let newExpo = Math.floor(x[1] / 2 - 1)
            if (x[1] % 2 == 1) {
                newMantissa = 2.236 * (10 * x[0]) ** 0.5
            }
            else {
                newMantissa = 2.236 * x[0] ** 0.5
            }
            if (newMantissa >= 10) {
                let offsetExponent = Math.floor(Math.log10(newMantissa))
                newMantissa /= 10 ** offsetExponent
                newExpo += offsetExponent
            }
            return [newMantissa, newExpo]
        }
    }
    else if (typeof x === 'number' && !isNaN(x)) { return XPToLevel(convertToBig(x)) }
    else return "Error in XPToLevel, wrong imput"
}
function levelToXP(x) {
    if (x.length == 2) {
        if (x[1] < 100) {
            let number = convertToNormal(x)
            let result = Math.ceil((number - 1) ** (1 / 0.5) * 20)
            return convertToBig(result)
        }
        else {
            let newMantissa = 2 * x[0] ** 2
            let newExpo = 2 * x[1] + 1
            if (newMantissa >= 10) {
                let offsetExponent = Math.floor(Math.log10(newMantissa))
                newMantissa /= 10 ** offsetExponent
                newExpo += offsetExponent
            }
            return [newMantissa, newExpo]
        }
    }
    else if (typeof x === 'number' && !isNaN(x)) { return levelToXP(convertToBig(x)) }
    else return "Error in levelToXP, wrong imput"
}