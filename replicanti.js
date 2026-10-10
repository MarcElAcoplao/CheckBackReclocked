const replicantiButtons = [
    { name: "replicantiButton0", multi: [2, 0], cooldown: 900, unlock: 35 }, //x2, 15min
    { name: "replicantiButton1", multi: [5, 0], cooldown: 1500, unlock: 36 }, //x5, 25min
    { name: "replicantiButton2", multi: [1.2, 1], cooldown: 3000, unlock: 37 }, //x12, 50min
    { name: "replicantiButton3", multi: [3, 1], cooldown: 6600, unlock: 40 }, //x30, 1h 50min
    { name: "replicantiButton4", multi: [1, 2], cooldown: 14400, unlock: 45 }, //x100, 4
]

function replicantiButton(x) {
    if (game.replicanti.buttonCooldowns[x] >= replicantiButtons[x].cooldown / game.replicanti.cooldown) {
        let times = roundRNG(game.replicanti.buttonCooldowns[x] / (replicantiButtons[x].cooldown / game.replicanti.cooldown))
        game.replicanti.buttonCooldowns[x] = 0 //Default cooldown state
        let multi = calculateReplicantiGain(x)
        let expo = calculateReplicantiExpo(x)
        for (let i = 0; i < times; i++) {
            game.replicanti.amount = multiplyBig(game.replicanti.amount, multi)
            game.replicanti.amount = exponentBig(game.replicanti.amount, expo)
        }
        if (compareBig(game.replicanti.amount, [1, 10 ** 300])) { game.replicanti.amount = [1, 10 ** 300] }
        game.player.buttonClicks += times
    }
}

function calculateReplicantiGain(x) {
    let result = multiplyBig(replicantiButtons[x].multi, game.replicanti.multi)
    return result
}

function calculateReplicantiExpo(x) {
    let result = exponentBig(calculateReplicantiGain(x), game.replicanti.expo)
    return result
}

function calculateReplicantiStats() {
    let baseMulti = [1, 0]
    baseMulti = multiplyBig(baseMulti, game.tokenBonuses.replicantiMulti)
    baseMulti = multiplyBig(baseMulti, game.researchBonuses.replicantiMulti)
    baseMulti = multiplyBig(baseMulti, game.ticketBonuses.replicantiMulti)
    baseMulti = multiplyBig(baseMulti, game.dailyBonuses.replicantiMulti)
    game.replicanti.multi = baseMulti
    let baseExpo = 0
    game.replicanti.expo = baseExpo
    let baseCooldown = 1
    baseCooldown *= game.tokenBonuses.replicantiCooldown
    baseCooldown *= game.researchBonuses.replicantiCooldown
    baseCooldown *= game.ticketBonuses.replicantiCooldown
    game.replicanti.cooldown = baseCooldown
}
setInterval(calculateReplicantiStats, 50)

function calculateReplicantiBonuses() {
    let baseXP = [1, 0] //Base xp multi
    baseXP = addBig(baseXP, logBig(game.replicanti.amount))
    game.replicantiBonuses.xpMulti = baseXP
    let baseRP = 1 //base rp multi
    if (game.research.upgrades[44] >= 1) { baseRP *= ((1 + convertToNormal(logBig(logBig(addBig(game.replicanti.amount, [9, 0])))) / 3) ** 2) }
    game.replicantiBonuses.rpMulti = baseRP
}
setInterval(calculateReplicantiBonuses, 50)

function replicantiEffects() {
    let result = ""
    result += "Replicanti multi: x" + displayBig(game.replicanti.multi)
    if (game.replicanti.cooldown != 1) { result += "<br>Cooldowns: /" + numberShort(game.replicanti.cooldown) }
    if (game.replicanti.expo > 0) { result += "<br>Expo: ^(gain^" + numberShort(game.replicanti.expo) + ")" }
    result += "<br><br>XP bonus: x" + displayBig(game.replicantiBonuses.xpMulti)
    if (game.replicantiBonuses.rpMulti > 1) {result += "<br>RP bonus: x" + numberShort(game.replicantiBonuses.rpMulti)}
    return result
}

function collectAllReplicanti() {
    for (let i = 0; i < replicantiButtons.length; i++) {
        if ((game.replicanti.buttonCooldowns[i] >= replicantiButtons[i].cooldown / game.replicanti.cooldown) && game.player.unlocks >= replicantiButtons[i].unlock) {
            replicantiButton(i)
        }
    }
}