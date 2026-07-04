function collectToken() {
    game.tokens.amount += game.tokens.bankAmount
    game.tokens.bankAmount = 0
    game.tokens.ticks = 0
}

function addTicks(x) {
    let roundAmount = roundRNG(x)
    if (game.research.upgrades[24] >= 1 && Math.random() <= 0.05) {
        roundAmount += 20
    }
    let totalAmount = roundAmount
    for (let i = 1; i <= totalAmount; i++) {
        game.tokens.bankAmount += game.tokens.gain
        game.tokens.ticks++
        if (game.research.upgrades[24] >= 1 && i <= roundAmount && Math.random() <= 0.05) {
            totalAmount += 20
        }
        calculateTokenGain()
    }
}

function calculateTokenGain() {
    let baseAmount = 0.1
    baseAmount *= game.tokenBonuses.tokens
    baseAmount *= game.dailyBonuses.tokenBonus
    baseAmount *= game.researchBonuses.tokenMulti
    if (!!pets[game.pets.equipped].tokenMulti) { baseAmount *= pets[game.pets.equipped].tokenMulti }
    if (game.prestige.reset == true) { baseAmount *= game.prestige.tokenNerf }
    if (game.tokens.bankAmount >= 5 && game.tokens.upgrades[8] > 0) {
        baseAmount *= (1 + Math.log(game.tokens.ticks))
        if (game.research.upgrades[34] >= 1) {baseAmount *= (1 + Math.log(game.tokens.ticks))**1.5}
    }
    let divider = tokenSoftcapEffect()
    baseAmount *= 1/divider
    game.tokens.gain = baseAmount
}
setInterval(calculateTokenGain, 50) //Runs 20 times a sec

function tokenSoftcapEffect() {
    let baseSoftcapExpo = 1
    let divider = 1
    if (game.research.upgrades[31] >= 1) {baseSoftcapExpo -= 0.3}
    game.tokens.softcapExpo = Math.max(baseSoftcapExpo, 0)
    if (game.tokens.bankAmount > 1) {divider = game.tokens.bankAmount ** game.tokens.softcapExpo}
    return divider
}

function showTokenCost(x) {
    let result = ""
    if (game.tokens.upgrades[x] == tokenUpgrades[x].levels) { result += "Maxed" }
    else {
        result += (numberShort(game.tokens.amount) + " / " + numberShort(tokenUpgrades[x].baseCost * (tokenUpgrades[x].costScaling ** game.tokens.upgrades[x])))
        if (tokenUpgrades[x].costScaling != 1) { result += "; Cost scaling: x" + numberShort(tokenUpgrades[x].costScaling) }
    }
    return result
}

function buyTokenUpgrade(x) {
    if (game.tokens.upgrades[x] < tokenUpgrades[x].levels) {
        let buyableLevels = 0
        if (tokenUpgrades[x].costScaling == 1) {
            buyableLevels = Math.min(Math.floor(game.tokens.amount / tokenUpgrades[x].baseCost), tokenUpgrades[x].levels - game.tokens.upgrades[x])
        }
        else {
            buyableLevels = purchasableTerms(x)
        }
        if (buyableLevels >= 1) {
            game.tokens.amount -= sumTerms(x, game.tokens.upgrades[x], buyableLevels)
            game.tokens.upgrades[x] += buyableLevels
        }
    }
}

function canPurchaseTokenUpgrade(x) {
    let result = false
    if (game.tokens.upgrades[x] < tokenUpgrades[x].levels) {
        let buyableLevels = 0
        if (tokenUpgrades[x].costScaling == 1) {
            buyableLevels = Math.min(Math.floor(game.tokens.amount / tokenUpgrades[x].baseCost), tokenUpgrades[x].levels - game.tokens.upgrades[x])
        }
        else {
            buyableLevels = purchasableTerms(x)
        }
        if (buyableLevels >= 1) {
            result = true
        }
    }
    return result
}

function sumTerms(x, m, n) { //Takes token upgrade x base cost + base scaling and calculates the sum from m until (m+n), arreglar
    let s = 0
    if (tokenUpgrades[x].costScaling == 1) {
        s = tokenUpgrades[x].baseCost * n
    }
    else {
        s = tokenUpgrades[x].baseCost * ((tokenUpgrades[x].costScaling ** (n + m) - 1) / (tokenUpgrades[x].costScaling - 1))
        s -= tokenUpgrades[x].baseCost * ((tokenUpgrades[x].costScaling ** m - 1) / (tokenUpgrades[x].costScaling - 1))
    }
    return s
}

function purchasableTerms(x) { //Takes upgrade id x, returns how many you can buy
    let k = Math.floor(Math.log(1 + (game.tokens.amount * (tokenUpgrades[x].costScaling - 1)) / (tokenUpgrades[x].baseCost * tokenUpgrades[x].costScaling ** game.tokens.upgrades[x])) / Math.log(tokenUpgrades[x].costScaling))
    k = Math.min(k, tokenUpgrades[x].levels - game.tokens.upgrades[x])
    return k
}

function tokenUpgradeAvailable(x) {
    let result = false
    if (game.tokens.upgrades[x] < tokenUpgrades[x].levels && game.player.unlocks >= tokenUpgrades[x].unlock) {
        if (tokenUpgrades[x].reqs == 0) { result = true }
        else {
            let completed = true
            let list = tokenUpgrades[x].recList
            for (let i = 0; i < list.length; i++) {
                if (game.tokens.upgrades[list[i]] < tokenUpgrades[list[i]].levels) {
                    completed = false
                }
            }
            result = completed
        }
    }
    return result
}

function calculateTokenUpgradeBoosts() {
    let baseXP = [1, 0]
    baseXP = multiplyBig(baseXP, 1 + 0.1 * game.tokens.upgrades[1])
    baseXP = multiplyBig(baseXP, 1 + 0.25 * game.tokens.upgrades[5])
    baseXP = multiplyBig(baseXP, 1 + game.tokens.upgrades[9])
    baseXP = multiplyBig(baseXP, 1 + 0.05 * game.tokens.upgrades[13])
    baseXP = multiplyBig(baseXP, 1 + 0.1 * game.tokens.upgrades[20])
    if (game.tokens.upgrades[13] >= tokenUpgrades[13].levels) { baseXP = multiplyBig(baseXP, [2, 0]) }
    if (game.tokens.upgrades[20] >= tokenUpgrades[20].levels) { baseXP = multiplyBig(baseXP, [5, 0]) }
    game.tokenBonuses.xp = baseXP
    let baseXPcooldown = 1
    baseXPcooldown *= (1 + 0.05 * game.tokens.upgrades[2])
    game.tokenBonuses.xpCooldown = baseXPcooldown
    let baseXPBoost = [1, 0]
    baseXPBoost = multiplyBig(baseXPBoost, 1 + 0.1 * game.tokens.upgrades[3])
    baseXPBoost = multiplyBig(baseXPBoost, 1 + 0.25 * game.tokens.upgrades[6])
    baseXPBoost = multiplyBig(baseXPBoost, 1 + 0.75 * game.tokens.upgrades[10])
    baseXPBoost = multiplyBig(baseXPBoost, 1 + game.tokens.upgrades[21] ** 2)
    game.tokenBonuses.xpBoost = baseXPBoost
    let baseTokens = 1
    baseTokens *= (1 + 0.25 * game.tokens.upgrades[4])
    baseTokens *= (1 + 0.1 * game.tokens.upgrades[12])
    baseTokens *= (1 + 0.3 * game.tokens.upgrades[19])
    game.tokenBonuses.tokens = baseTokens
    let baseLuck = 1
    baseLuck *= (1 + 0.1 * game.tokens.upgrades[7])
    baseLuck *= (1 + 0.1 * game.tokens.upgrades[10])
    baseLuck *= (1 + 0.1 * game.tokens.upgrades[15])
    baseLuck *= (1 + 0.5 * game.tokens.upgrades[17])
    game.tokenBonuses.luck = baseLuck
    let baseXPBEffect = [1, 0]
    baseXPBEffect = multiplyBig(baseXPBEffect, 1 + 0.05 * game.tokens.upgrades[16])
    game.tokenBonuses.xpBEffect = baseXPBEffect
    let baseRP = 1
    baseRP *= (1 + 0.5 * game.tokens.upgrades[14])
    baseRP *= (1 + game.tokens.upgrades[18])
    game.tokenBonuses.rpMulti = baseRP
}
setInterval(calculateTokenUpgradeBoosts, 50)

function buyAllTokens() {
    for (let i = 1; i < tokenUpgrades.length; i++) {
        if (tokenUpgradeAvailable(i) && canPurchaseTokenUpgrade(i)) {
            buyTokenUpgrade(i)
        }
    }
}