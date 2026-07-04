const XPButtons = [ //The stats of every single xp button, also they are found on tab 2.1
    { name: "XPbutton0", xpGain: [1, 1], cooldown: 60, unlock: 0 }, //10-1m, level 1
    { name: "XPbutton1", xpGain: [2, 1], cooldown: 120, unlock: 1 }, //20-2m, level 2
    { name: "XPbutton2", xpGain: [3, 1], cooldown: 300, unlock: 2 }, //30-5m, level 3
    { name: "XPbutton3", xpGain: [5, 1], cooldown: 600, unlock: 3 }, //50-10m, level 4
    { name: "XPbutton4", xpGain: [1, 2], cooldown: 1800, unlock: 4 }, //100-30m, level 6
    { name: "XPbutton5", xpGain: [2, 2], cooldown: 3600, unlock: 7 }, //200-1h, level 20
    { name: "XPbutton6", xpGain: [5, 2], cooldown: 10800, unlock: 8 }, //500-3h, level 30
    { name: "XPbutton7", xpGain: [1, 3], cooldown: 21600, unlock: 10 }, //1000-6h, level 60
    { name: "XPbutton8", xpGain: [1.5, 3], cooldown: 43200, unlock: 11 }, //1500-12h, level 80
    { name: "XPbutton9", xpGain: [2.5, 3], cooldown: 86400, unlock: 15 }, //2500-1d, level 250
    { name: "XPbutton10", xpGain: [5, 3], cooldown: 259200, unlock: 19 }, //5000-3d, level 1000
    { name: "XPbutton11", xpGain: [1, 4], cooldown: 604800, unlock: 23 }, //10000-7d, level 30k
    { name: "XPbutton12", xpGain: [2, 4], cooldown: 1200000, unlock: 28 }, //10000-13.88d, level 30k
]

function xpButton(x) {
    if (game.xp.buttonCooldowns[x] >= XPButtons[x].cooldown / game.xp.cooldown) {
        let times = roundRNG(game.xp.buttonCooldowns[x] / (XPButtons[x].cooldown / game.xp.cooldown))
        game.xp.buttonCooldowns[x] = 0 //Sets the xp button cooldown to the default state
        game.xp.amount = addBig(game.xp.amount, multiplyBig(calculateXPGain(x), times)) //Adds your xp
        game.player.buttonClicks += times
    }
}

function calculateXPGain(x) { //You insert this command with the desired xp amount and it returns the gain after multipliers
    let result = multiplyBig(XPButtons[x].xpGain, game.xp.multiplier)
    result = exponentBig(result, game.xp.expo)
    return result
}

function calculateXPStats() {
    let baseMulti = [1, 0] //This has to be multiplied by each factor, 1 line at a time
    if (!!pets[game.pets.equipped].xpMulti) baseMulti = multiplyBig(baseMulti, pets[game.pets.equipped].xpMulti) //Although pet multiplier being "small", it can get converted to big
    baseMulti = multiplyBig(baseMulti, game.xpBoost.effectiveBoost) //xpboost effect
    baseMulti = multiplyBig(baseMulti, game.tokenBonuses.xp) //Token upgrade 1, yea this is shitty will do it better later
    baseMulti = multiplyBig(baseMulti, game.dailyBonuses.xp)
    baseMulti = multiplyBig(baseMulti, game.researchBonuses.xpMulti)
    game.xp.multiplier = baseMulti
    let baseCooldown = 1 //xp cooldown divider
    if (!!pets[game.pets.equipped].xpCooldown) { baseCooldown *= pets[game.pets.equipped].xpCooldown }
    baseCooldown *= game.tokenBonuses.xpCooldown //No need to do them 1 by 1 but I prefer doing it like this
    baseCooldown *= game.researchBonuses.xpCooldown
    game.xp.cooldown = baseCooldown //Calculates your xp cooldown divider
    let baseExpo = [1, 0]
    if (game.prestige.reset == true) { baseExpo = multiplyBig(baseExpo, game.prestige.xpNerf) }
    baseExpo = multiplyBig(baseExpo, game.researchBonuses.xpExpo)
    game.xp.expo = baseExpo
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

function resetXPCooldowns() {
    for (let i = 0; i < XPButtons.length; i++) {
        game.xp.buttonCooldowns[i] = XPButtons[i].cooldown
    }
}

function collectAllXP() {
    for (let i = 0; i < XPButtons.length; i++) {
        if ((game.xp.buttonCooldowns[i] >= XPButtons[i].cooldown / game.xp.cooldown) && game.player.unlocks >= XPButtons[i].unlock) {
            xpButton(i)
        }
    }
}