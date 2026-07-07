const replicantiButtons = [
    {name: "replicantiButton0", multi: [2, 0], cooldown: 900, unlock: 35},
    {name: "replicantiButton1", multi: [5, 0], cooldown: 1800, unlock: 36},
]

function replicantiButton(x) {
    /*if (game.replicanti.buttonCooldowns[x] >= replicantiButtons[x].cooldown / game.replicanti.cooldown) {
        let times = roundRNG (game.replicanti.buttonCooldowns[x] / (replicantiButtons[x].cooldown / game.replicanti.cooldown))
        game.replicanti.buttonCooldowns[x] = 0 //Default cooldown state
        let multi = calculateReplicantiGain(x)
        let expo = calculateReplicantiExpo(x)
        for (let i = 0; i < times; i++) {
            game.replicanti.amount = multiplyBig(game.replicanti.amount, multi)
            game.replicanti.amount = exponentBig(game.replicanti.amount, expo)
        }
        if (compareBig(game.replicanti.amount, [1, 10**300])) {game.replicanti.amount = [1, 10**300]}
        game.player.buttonClicks += times
    }*/
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
    game.replicanti.multi = baseMulti
    let baseExpo = [0, 0]
    game.replicanti.expo = baseExpo
    let baseCooldown = 1
    game.replicanti.cooldown = baseCooldown
}
setInterval(calculateReplicantiStats, 50)

function calculateReplicantiBonuses() {
    let baseXP = [1, 0] //Base xp cooldowns
    game.replicantiBonuses.xpMulti = baseXP
}
setInterval(calculateReplicantiBonuses, 50)