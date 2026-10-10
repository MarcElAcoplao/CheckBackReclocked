function collectToken() {
    game.tokens.amount += game.tokens.bankAmount
    game.tokens.bankAmount = 0
    game.tokens.ticks = 0
}

function addTicks(x) {
    let roundAmount = roundRNG(x)
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
    baseAmount *= game.ticketBonuses.tokenMulti
    if (!!pets[game.pets.equipped].tokenMulti) { baseAmount *= pets[game.pets.equipped].tokenMulti }
    if (game.prestige.reset == true) { baseAmount *= game.prestige.tokenNerf }
    let tickExpo = 0
    if (game.tokens.bankAmount >= 5) {
        tickExpo += game.tokens.upgrades[8]
        if (game.research.upgrades[34] >= 1) {tickExpo += 1.5}
    }
    baseAmount *= (1 + Math.log(game.tokens.ticks))**tickExpo
    let divider = tokenSoftcapEffect()
    baseAmount *= 1/divider
    if (typeof baseAmount === 'number' && !isNaN(baseAmount)) {game.tokens.gain = baseAmount}
    else {game.tokens.gain = 0}
}
setInterval(calculateTokenGain, 50) //Runs 20 times a sec

function tokenSoftcapEffect() {
    let baseSoftcapExpo = 1
    let divider = 1
    if (game.research.upgrades[31] >= 1) {baseSoftcapExpo -= 0.3}
    if (game.research.upgrades[40] >= 1) {baseSoftcapExpo -= 0.2}
    game.tokens.softcapExpo = Math.max(baseSoftcapExpo, 0)
    if (game.tokens.bankAmount > 1) {divider = game.tokens.bankAmount ** game.tokens.softcapExpo}
    return divider
}

function showTokenCost(x) {
    let result = ""
    if (game.tokens.upgrades[x] == tokenUpgrades[x].levels()) { result += "Maxed" }
    else {
        result += (numberShort(game.tokens.amount) + " / " + numberShort(tokenUpgrades[x].baseCost * (tokenUpgrades[x].costScaling ** game.tokens.upgrades[x])))
        if (tokenUpgrades[x].costScaling != 1) { result += "; Cost scaling: x" + numberShort(tokenUpgrades[x].costScaling) }
    }
    return result
}

function buyTokenUpgrade(x) {
    if (game.tokens.upgrades[x] < tokenUpgrades[x].levels()) {
        let buyableLevels = 0
        if (tokenUpgrades[x].costScaling == 1) {
            buyableLevels = Math.min(Math.floor(game.tokens.amount / tokenUpgrades[x].baseCost), tokenUpgrades[x].levels() - game.tokens.upgrades[x])
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
    if (game.tokens.upgrades[x] < tokenUpgrades[x].levels()) {
        let buyableLevels = 0
        if (tokenUpgrades[x].costScaling == 1) {
            buyableLevels = Math.min(Math.floor(game.tokens.amount / tokenUpgrades[x].baseCost), tokenUpgrades[x].levels() - game.tokens.upgrades[x])
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
    k = Math.min(k, tokenUpgrades[x].levels() - game.tokens.upgrades[x])
    return k
}

function tokenUpgradeAvailable(x) {
    let result = false
    if (game.tokens.upgrades[x] < tokenUpgrades[x].levels() && game.player.unlocks >= tokenUpgrades[x].unlock) {
        if (tokenUpgrades[x].reqs == 0) { result = true }
        else {
            let completed = true
            let list = tokenUpgrades[x].recList
            for (let i = 0; i < list.length; i++) {
                if (game.tokens.upgrades[list[i]] < tokenUpgrades[list[i]].levels()) {
                    completed = false
                }
            }
            result = completed
        }
    }
    if (x == 11 && game.prestige.reset == false) {result = false}
    return result
}

function calculateTokenUpgradeBoosts() {
    let baseXP = [1, 0] //xp factors
    baseXP = multiplyBig(baseXP, 1 + 0.1 * game.tokens.upgrades[1])
    baseXP = multiplyBig(baseXP, 1 + 0.25 * game.tokens.upgrades[5])
    baseXP = multiplyBig(baseXP, 1 + game.tokens.upgrades[9])
    baseXP = multiplyBig(baseXP, 1 + 0.05 * game.tokens.upgrades[13])
    baseXP = multiplyBig(baseXP, 1 + 0.1 * game.tokens.upgrades[20])
    baseXP = multiplyBig(baseXP, 1 + 4 * game.tokens.upgrades[29])
    if (game.tokens.upgrades[13] >= tokenUpgrades[13].levels()) { baseXP = multiplyBig(baseXP, [2, 0]) }
    if (game.tokens.upgrades[20] >= tokenUpgrades[20].levels()) { baseXP = multiplyBig(baseXP, [5, 0]) }
    baseXP = multiplyBig(baseXP, 1.1 ** game.tokens.upgrades[32])
    game.tokenBonuses.xp = baseXP
    let baseXPcooldown = 1 //xp cooldowns
    baseXPcooldown *= (1 + 0.05 * game.tokens.upgrades[2])
    baseXPcooldown *= (1 + 0.3 * game.tokens.upgrades[26])
    game.tokenBonuses.xpCooldown = baseXPcooldown
    let baseXPBoost = [1, 0] //xpboost
    baseXPBoost = multiplyBig(baseXPBoost, 1 + 0.1 * game.tokens.upgrades[3])
    baseXPBoost = multiplyBig(baseXPBoost, 1 + 0.25 * game.tokens.upgrades[6])
    baseXPBoost = multiplyBig(baseXPBoost, 1 + 0.75 * game.tokens.upgrades[10])
    baseXPBoost = multiplyBig(baseXPBoost, 1 + game.tokens.upgrades[21] ** 2)
    baseXPBoost = multiplyBig(baseXPBoost, 1 + 4 * game.tokens.upgrades[29])
    game.tokenBonuses.xpBoost = baseXPBoost
    let baseXPBCooldown = 1 //xpboost cooldown
    baseXPBCooldown *= (1 + 0.3 * game.tokens.upgrades[26])
    game.tokenBonuses.xpBCooldown = baseXPBCooldown
    let baseTokens = 1 //tokens
    baseTokens *= (1 + 0.25 * game.tokens.upgrades[4])
    baseTokens *= (1 + 0.1 * game.tokens.upgrades[12])
    baseTokens *= (1 + 0.3 * game.tokens.upgrades[19])
    baseTokens *= (1 + 0.5 * game.tokens.upgrades[30])
    game.tokenBonuses.tokens = baseTokens
    let baseLuck = 1 //luck
    baseLuck *= (1 + 0.1 * game.tokens.upgrades[7])
    baseLuck *= (1 + 0.1 * game.tokens.upgrades[10])
    baseLuck *= (1 + 0.1 * game.tokens.upgrades[15])
    baseLuck *= (1 + 0.5 * game.tokens.upgrades[17])
    game.tokenBonuses.luck = baseLuck
    let basePetCooldown = 1 //pet cooldown
    basePetCooldown *= (1 + 0.3 * game.tokens.upgrades[26])
    game.tokenBonuses.petCooldown = basePetCooldown
    let baseXPBEffect = [1, 0] //xpboost effect
    baseXPBEffect = multiplyBig(baseXPBEffect, 1 + 0.05 * game.tokens.upgrades[16])
    baseXPBEffect = multiplyBig(baseXPBEffect, 1 + 0.1 * game.tokens.upgrades[28])
    game.tokenBonuses.xpBEffect = baseXPBEffect
    let baseRP = 1 //rp
    baseRP *= (1 + 0.5 * game.tokens.upgrades[14])
    baseRP *= (1 + game.tokens.upgrades[18])
    baseRP *= (1 + 0.1 * game.tokens.upgrades[24])
    baseRP *= (1 + 4 * game.tokens.upgrades[29])
    if (game.tokens.upgrades[24] >= tokenUpgrades[24].levels()) {baseRP *= 2}
    game.tokenBonuses.rpMulti = baseRP
    let baseReplicanti = [1, 0] //replicanti
    baseReplicanti = multiplyBig(baseReplicanti, 1 + game.tokens.upgrades[23])
    baseReplicanti = multiplyBig(baseReplicanti, 1 + 4 * game.tokens.upgrades[27])
    baseReplicanti = multiplyBig(baseReplicanti, 1 + 4 * game.tokens.upgrades[29])
    game.tokenBonuses.replicantiMulti = baseReplicanti
    let baseRPcooldown = 1 //rp cooldowns
    baseRPcooldown *= (1 + 0.3 * game.tokens.upgrades[25])
    game.tokenBonuses.rpCooldown = baseRPcooldown
    let baseReplicantiCooldown = 1 //replicanti cooldowns
    baseReplicantiCooldown *= (1 + 0.3 * game.tokens.upgrades[25])
    baseReplicantiCooldown *= (1 - 0.4 * game.tokens.upgrades[27])
    game.tokenBonuses.replicantiCooldown = baseReplicantiCooldown
    let baseTickets = 1 //tickets
    baseTickets *= (1 + 0.2 * game.tokens.upgrades[31])
    game.tokenBonuses.ticketMulti = baseTickets
}
setInterval(calculateTokenUpgradeBoosts, 50)

function buyAllTokens() {
    for (let i = 1; i < tokenUpgrades.length; i++) {
        if (tokenUpgradeAvailable(i) && canPurchaseTokenUpgrade(i)) {
            buyTokenUpgrade(i)
        }
    }
}

function calculateTicketStats() {
    let baseMulti = 1 //tickets Multi
    baseMulti *= game.tokenBonuses.ticketMulti
    baseMulti *= game.researchBonuses.ticketMulti
    baseMulti *= game.dailyBonuses.ticketMulti
    game.tickets.multi = baseMulti
    let gainStart = 1000000
    game.tickets.start = gainStart
    let gainExpo = 0.8
    game.tickets.expo = gainExpo
}
setInterval(calculateTicketStats, 50)

function calculateTicketGain() {
    let gain = 0
    if (game.tokens.amount >= game.tickets.start) {
        gain = ((game.tokens.amount/game.tickets.start) ** game.tickets.expo) * game.tickets.multi
    }
    return gain
}

function ticketReset() {
    if (game.tokens.amount >= game.tickets.start) {
        collectToken()
        game.tickets.amount += calculateTicketGain()
        game.tokens.amount = 0
        for (let i = 0; i < tokenUpgrades.length; i++) {
            if (tokenUpgrades[i].reset == true) {game.tokens.upgrades[i] = 0}
        }
    }
}

function showTicketCost(x) {
    let result = ""
    if (game.tickets.upgrades[x] == ticketUpgrades[x].levels()) { result += "Maxed" }
    else {
        result += (numberShort(game.tickets.amount) + " / " + numberShort(ticketUpgrades[x].baseCost * (ticketUpgrades[x].costScaling ** game.tickets.upgrades[x])))
        if (ticketUpgrades[x].costScaling != 1) { result += "; Cost scaling: x" + numberShort(ticketUpgrades[x].costScaling) }
    }
    return result
}

function buyTicketUpgrade(x) {
    if (game.tickets.upgrades[x] < ticketUpgrades[x].levels()) {
        let buyableLevels = 0
        if (ticketUpgrades[x].costScaling == 1) {
            buyableLevels = Math.min(Math.floor(game.tickets.amount / ticketUpgrades[x].baseCost), ticketUpgrades[x].levels() - game.tickets.upgrades[x])
        }
        else {
            buyableLevels = purchasableTicketTerms(x)
        }
        if (buyableLevels >= 1) {
            game.tickets.amount -= sumTicketTerms(x, game.tickets.upgrades[x], buyableLevels)
            game.tickets.upgrades[x] += buyableLevels
        }
    }
}

function canPurchaseTicketUpgrade(x) {
    let result = false
    if (game.tickets.upgrades[x] < ticketUpgrades[x].levels()) {
        let buyableLevels = 0
        if (ticketUpgrades[x].costScaling == 1) {
            buyableLevels = Math.min(Math.floor(game.tickets.amount / ticketUpgrades[x].baseCost), ticketUpgrades[x].levels() - game.ticket.upgrades[x])
        }
        else {
            buyableLevels = purchasableTicketTerms(x)
        }
        if (buyableLevels >= 1) {
            result = true
        }
    }
    return result
}

function sumTicketTerms(x, m, n) { //Takes token upgrade x base cost + base scaling and calculates the sum from m until (m+n), arreglar
    let s = 0
    if (ticketUpgrades[x].costScaling == 1) {
        s = ticketUpgrades[x].baseCost * n
    }
    else {
        s = ticketUpgrades[x].baseCost * ((ticketUpgrades[x].costScaling ** (n + m) - 1) / (ticketUpgrades[x].costScaling - 1))
        s -= ticketUpgrades[x].baseCost * ((ticketUpgrades[x].costScaling ** m - 1) / (ticketUpgrades[x].costScaling - 1))
    }
    return s
}

function purchasableTicketTerms(x) { //Takes upgrade id x, returns how many you can buy
    let k = Math.floor(Math.log(1 + (game.tickets.amount * (ticketUpgrades[x].costScaling - 1)) / (ticketUpgrades[x].baseCost * ticketUpgrades[x].costScaling ** game.tickets.upgrades[x])) / Math.log(ticketUpgrades[x].costScaling))
    k = Math.min(k, ticketUpgrades[x].levels() - game.tickets.upgrades[x])
    return k
}

function ticketUpgradeAvailable(x) {
    let result = false
    if (game.tickets.upgrades[x] < ticketUpgrades[x].levels() && game.player.unlocks >= ticketUpgrades[x].unlock) {
        if (ticketUpgrades[x].reqs == 0) { result = true }
        else {
            let completed = true
            let list = ticketUpgrades[x].recList
            for (let i = 0; i < list.length; i++) {
                if (game.tickets.upgrades[list[i]] < ticketUpgrades[list[i]].levels()) {
                    completed = false
                }
            }
            result = completed
        }
    }
    return result
}

function calculateTicketUpgradeBoosts() {
    let baseTokens = 1 //Token bonuses
    baseTokens *= (2 ** game.tickets.upgrades[1])
    baseTokens *= (1 + 4 * game.tickets.upgrades[4])
    game.ticketBonuses.tokenMulti = baseTokens
    let baseXPMulti = [1, 0] //XP multi bonuses
    baseXPMulti = multiplyBig(baseXPMulti, 1 + game.tickets.upgrades[2] ** 2)
    game.ticketBonuses.xpMulti = baseXPMulti
    let baseXPBoostMulti = [1, 0] //XPBoost multi bonuses
    baseXPBoostMulti = multiplyBig(baseXPBoostMulti, 1 + 9 * game.tickets.upgrades[3])
    game.ticketBonuses.xpBoostMulti = baseXPBoostMulti
    let baseRPMulti = 1 //rp multi
    baseRPMulti *= (1 + 9 * game.tickets.upgrades[4])
    game.ticketBonuses.rpMulti = baseRPMulti
    let baseReplicantiMulti = [1, 0] //replicanti multi
    baseReplicantiMulti = multiplyBig(baseReplicantiMulti, 1 + 9 * game.tickets.upgrades[3])
    game.ticketBonuses.replicantiMulti = baseReplicantiMulti
    let baseReplicantiCooldown = 1 //replicanti cooldown
    baseReplicantiCooldown *= (1 + game.tickets.upgrades[4])
    game.ticketBonuses.replicantiCooldown = baseReplicantiCooldown
}
setInterval(calculateTicketUpgradeBoosts, 50)