const unlockLevelsSmall = [2, 3, 4, 6, 8, 12, 20, 30, 40, 60, 80, 100, 150, 200, 250, 300, 400, 500, 1000, 2000, 5000, 15000, 30000, 50000, 100000, 101000, 10**6, 5*10**6, 1.5*10**7, 5*10**7, 10**8, 4*10**8, 10**9, 5*10**9/*, 5*10**10, 2*10**11*/] //This will probably be remade completely
//const unlockLevelsBig = [1000000000]
const levelBarTextures = [50, 55, 60, 65, 70, 80, 90, 100, 200]

const levelBarColours = [
    [1, "#5cc"],
    [2, "#5ac"],
    [3, "#37c"],
    [4, "#28e"],
    [5, "#63d"],
    [6, "#82f"],
    [7, "#d3f"],
    [8, "#d3f"],
    [9, "#e4e"],
    [10, "#e4e"],
    [12, "#f3a"],
    [14, "#e33"],
    [16, "#f52"],
    [18, "#e92"],
    [20, "#dd2"],
    [22, "#ce0"],
    [24, "#9e3"],
    [26, "#3d3"],
    [28, "#2e6"],
    [30, "#2aa"],
    [32, "#158"],
    [34, "#127"],
    [36, "#006"],
    [38, "#315"],
    [40, "#516"],
    [45, "#605"],
    [50, "#666"],
    [Infinity, "#666"],
]

const ranks = [ //This will probably be remade for there to be less names but more "number like" scaling with potential even exponential step-to-step
    {level: [1, 0], name: "Apprentice"},
    {level: [5, 0], name: "Beginner"},
    {level: [1, 1], name: "Challenger"},
    {level: [1, 2], name: "Dedicated"},
    {level: [1, 3], name: "Exalted"},
    {level: [1, 4], name: "Fabled"},
    {level: [1, 5], name: "Great"},
    {level: [1, 6], name: "Heroic"},
    {level: [1, 7], name: "Insane"},
    {level: [1, 9], name: "Jambo"},
    {level: [1, 11], name: "Kappa"},
    {level: [1, 14], name: "Leader"},
    {level: [1, 17], name: "Master"},
    {level: [1, 21], name: "NaN (Not a Noob)"},
    {level: [1, 24], name: "Origin"},
    {level: [1, 27], name: "Power"},
    {level: [1, 30], name: "Quoted"},
    {level: [1, 35], name: "Robotic"},
    {level: [1.79, 308], name: "Infinite"},
    {level: [1, 10**300], name: "Endless"},
    {level: [Infinity, Infinity], name: "Infinity"},
] //space and finality, omega

const pets = [
    //Name, XP multiplier, Funny special text.
    { name: "Test", specialText: "Hey, how did you find me? (Placeholder)" , power: 0}, //0
    { name: "Slug", xpMulti: 1.2, specialText: "A snail that lost its shell and has to live underneath a bridge... for now." , power: 1}, // 1
    { name: "Rat", xpMulti: 1.4, specialText: "A rat forced to eat trash to survive. It'd love to eat a fresh slug anyday." , power: 2}, // 2
    { name: "Snake", xpMulti: 1.6, specialText: "A snake living in barren wastes, looking for any juicy rat to eat." , power: 4}, // 3
    { name: "Small Elf", xpMulti: 2, specialText: "This breed of elves is so small that they cannot harvest anything bigger than a mushroom. They love to dine on snakes." , power: 6}, // 4
    { name: "Green Butterfly", xpMulti: 1.5, specialText: "Green butterflies are known to be annoying when crossing forests." , power: 3}, // 5
    { name: "Green Lizard", xpMulti: 1.75, specialText: "Rapid reptile that cammouflages through green environments." , power: 5}, // 6
    { name: "Green Salamander", xpMulti: 2.25, specialText: "Their only danger comes from accidentally touching them." , power: 7}, // 7
    { name: "Green Spider", xpMulti: 2.75, specialText: "They live on leaves because they can't make cobwebs." , power: 8}, // 8
    { name: "Green Crocodile", xpMulti: 3.5, specialText: "It has a little button that makes it say 'See ya later, alligator'." , power: 10}, // 9
    { name: "Green Dragon", xpMulti: 5, specialText: "Myths say that this dragon is a symbol of luck. Do they drink liquid luck?" , power: 12}, // 10
    { name: "Turtle", xpMulti: 3, rpMulti: 1.1, specialText: "Not the fastest sheriff of the wild west." , power: 9}, //11
    { name: "Tarantula", xpMulti: 4, rpMulti: 1.2, specialText: "An australian nightmare if it weren't for their big green eyes." , power: 11}, //12
    { name: "1-Headed Snake", xpMulti: 5.2, xpCooldown: 1.01, rpMulti: 1.3, specialText: "Where are the other heads? They were lost in a crazy blackjack night. Maybe this snake will restore them eventually." , power: 13}, //13
    { name: "Purple Butterfly", xpMulti: 6.5, xpCooldown: 1.02, rpMulti: 1.4, specialText: "Do I know the green butterfly? I'd rather not know her." , power: 14}, //14
    { name: "Earth Snake", xpMulti: 8, xpCooldown: 1.03, rpMulti: 1.5, specialText: "Unlike other snakes, this one saw the Avatar training, and learned a thing or two about earth bending." , power: 15}, //15
    { name: "Scorpion", xpMulti: 10, xpCooldown: 1.05, rpMulti: 1.6, specialText: "People used to call me the 'Death Scorpion' but I prefer being a farmer, so I dropped the name." , power: 17}, //16
    { name: "Cat", xpMulti: 12, xpCooldown: 1.07, rpMulti: 1.7, specialText: "Maybe the fastest sheriff of the wild west, if the cat were to behave correctly." , power: 18}, //17
    { name: "Earth Dragon", xpMulti: 15, xpCooldown: 1.1, rpMulti: 1.8, specialText: "The father of the Earth, this dragon can make life out of sticks and stones." , power: 20}, //18
    { name: "Burning Eyeball", xpMulti: 10, xpCooldown: 1.05, rpMulti: 1.5, specialText: "Blinded by it's own blaze of glory." , power: 16}, //19
    { name: "Red Slime", xpMulti: 15, xpCooldown: 1.09, rpMulti: 1.7, specialText: "It was him! He stole my pizza! Stronzo amaro." , power: 19}, //20
    { name: "Red Snake", xpMulti: 22, xpCooldown: 1.13, rpMulti: 2.1, specialText: "It's hot, that's all... nevermind, it self combusted." , power: 21}, //21
    { name: "Red Butterfly", xpMulti: 30, xpCooldown: 1.18, rpMulti: 2.3, specialText: "Can survive flying through flames. If you ride it, however, you couldn't survive." , power: 22}, //22
    { name: "Fire Spirit", xpMulti: 40, xpCooldown: 1.24, rpMulti: 2.5, specialText: "This side of the wind generates a better hairline. WAIT! I cast a shadow????" , power: 23}, //23
    { name: "Fiery Fish", xpMulti: 60, xpCooldown: 1.3, rpMulti: 2.7, specialText: "Evaporates all water around it. That's why it lives on land." , power: 25}, //24
    { name: "Sleepy Fire Demon", xpMulti: 80, xpCooldown: 1.35, rpMulti: 2.9, specialText: "20 hours no sleep, 3'o clock in the morning, no fuel left to be evil." , power: 27}, //25
    { name: "Fire Dragon", xpMulti: 100, xpCooldown: 1.4, rpMulti: 3.1, specialText: "He's so powerful that has to be nerfed by leaving a path of ashes whenever he goes." , power: 28}, //26
    { name: "Small Skeleton", xpMulti: 50, xpCooldown: 1.3, tokenMulti: 1.4, rpMulti: 2.7, specialText: "Poor child." , power: 24}, //27
    { name: "Skeletal Dog", xpMulti: 75, xpCooldown: 1.4, tokenMulti: 1.7, rpMulti: 3, specialText: "Skulls are a mix of tennis balls and bones. 2 in 1." , power: 26}, //28
    { name: "Normal Skeleton", xpMulti: 110, xpCooldown: 1.5, tokenMulti: 2.1, rpMulti: 3.3, specialText: "What do you mean normal? You ra-" , power: 29}, //29
    { name: "Skeletal Snake", xpMulti: 150, xpCooldown: 1.6, tokenMulti: 2.5, rpMulti: 3.6, specialText: "Wait, snakes do not have bones. This is fake." , power: 30}, //30
    { name: "Skeletal Vulture", xpMulti: 200, xpCooldown: 1.7, tokenMulti: 3, rpMulti: 3.9, specialText: "He got an F in aerodynamics." , power: 31}, //31
    { name: "Skeletal Hound", xpMulti: 275, xpCooldown: 1.8, tokenMulti: 3.6, rpMulti: 4.2, specialText: "Don't call it a dog or you'll see the difference." , power: 32}, //32
    { name: "Skeletal Hydra", xpMulti: 350, xpCooldown: 1.9, tokenMulti: 4.3, rpMulti: 4.5, specialText: "Each head makes a different bone creak tune." , power: 33}, //33
    { name: "Skeletal Dragon", xpMulti: 500, xpCooldown: 2, tokenMulti: 5, rpMulti: 4.8, specialText: "He will come back in Avengers: Doomsday." , power: 34}, //34
    { name: "Ghost Rodent", xpMulti: 600, xpCooldown: 2.1, tokenMulti: 5.5, rpMulti: 5.5, specialText: "Looks more like a blob." , power: 35}, //35
    { name: "Ghost Fly", xpMulti: 800, xpCooldown: 2.3, tokenMulti: 6, rpMulti: 6, specialText: "Oh no! A flying shopping list." , power: 36}, //36
    { name: "Ghost Ant", xpMulti: 1200, xpCooldown: 2.5, tokenMulti: 6.5, rpMulti: 6.5, specialText: "He's been waiting 876 years for someone to finish it. Can't you see the tired eyes?" , power: 37}, //37
    { name: "Ghost Bat", xpMulti: 1600, xpCooldown: 2.8, tokenMulti: 7.25, rpMulti: 7.25, specialText: "I have a scar from being biten by Ozzy Ozbourne. Look closer, closer, closer... BOO" , power: 38}, //38
    { name: "Ghost Dog", xpMulti: 2200, xpCooldown: 3.1, tokenMulti: 8, rpMulti: 8, specialText: "Detached from the Skeleton Dog. Together, they make the ultimate pet: Dog" , power: 39}, //39
    { name: "Ghost Tarantula", xpMulti: 2600, xpCooldown: 3.4, tokenMulti: 8.75, rpMulti: 8.75, specialText: "If you make a leg crack, they glow in spooky green." , power: 40}, //40
    { name: "Ghost Hydra", xpMulti: 3100, xpCooldown: 3.7, tokenMulti: 9.5, rpMulti: 9.5, specialText: "It's me, the face looking the other way. Cut me, please, all other heads hate me ^^" , power: 41}, //41
    { name: "Ghost Dragon", xpMulti: 4000, xpCooldown: 4, tokenMulti: 11, rpMulti: 11, specialText: "He's the flying dutchman, but cooler. He will still punish your sins." , power: 42}, //42
]

const basicUnboxChances = [
    [1, 1], [2, 0.6], [3, 0.2], [4, 0.05]
]

const natureUnboxChances = [
    [5, 1], [6, 0.5], [7, 0.3], [8, 0.1], [9, 0.06], [10, 0.02]
]

const earthUnboxChances = [
    [11, 1], [12, 0.47], [13, 0.39], [14, 0.27], [15, 0.17], [16, 0.09], [17, 0.03], [18, 0.01]
]

const fireUnboxChances = [
    [19, 1], [20, 0.4], [21, 0.34], [22, 0.23], [23, 0.1], [24, 0.04], [25, 0.012], [26, 0.004]
]

const skeletonUnboxChances = [
    [27, 1], [28, 0.35], [29, 0.24], [30, 0.17], [31, 0.09], [32, 0.03], [33, 0.009], [34, 0.002],
]

const ghostUnboxChances = [
    [35, 1], [36, 1/10], [37, 1/67], [38, 1/178], [39, 1/420], [40, 1/666], [41, 1/2222], [42, 1/6767],
]

const stats = [
    //Name, unlock required
    { name: "Test", unlock: 0 },
    { name: "Player", unlock: 0 },
    { name: "Credits", unlock: 0 },
    { name: "XP Multipliers", unlock: 0 },
    { name: "Crate multipliers", unlock: 5 },
    { name: "XPBoost", unlock: 12},
    { name: "Tokens", unlock: 18},
    { name: "Research", unlock: 25},
]

const tokenUpgrades = [ //Name, base upgrade cost, cost scaling, total levels, effect text
    {name: "test", baseCost: 1, costScaling: 1, levels: 0, unlock: 18, reqs: 0, recList: [0], effect: "hello code reader"},
    {name: "tokenUpgrade1", baseCost: 1, costScaling: 1, levels: 10, unlock: 18, reqs: 0, recList: [0], effect: "+0.1x XP per level"},
    {name: "tokenUpgrade2", baseCost: 1, costScaling: 5, levels: 2, unlock: 18, reqs: 0, recList: [0], effect: "+/0.05 XP cooldowns per level"},
    {name: "tokenUpgrade3", baseCost: 2, costScaling: 2, levels: 5, unlock: 18, reqs: 0, recList: [0], effect: "+0.1x XPBoost per level"},
    {name: "tokenUpgrade4", baseCost: 5, costScaling: 5, levels: 2, unlock: 18, reqs: 0, recList: [0], effect: "+0.25x Tokens per level"},
    {name: "tokenUpgrade5", baseCost: 5, costScaling: 1, levels: 10, unlock: 19, reqs: 1, recList: [1], effect: "+0.25x XP per level"},
    {name: "tokenUpgrade6", baseCost: 5, costScaling: 2, levels: 5, unlock: 20, reqs: 1, recList: [3], effect: "+0.25x XPBoost per level"},
    {name: "tokenUpgrade7", baseCost: 10, costScaling: 5, levels: 2, unlock: 21, reqs: 0, recList: [0], effect: "+0.1x Crate luck per level"},
    {name: "tokenUpgrade8", baseCost: 50, costScaling: 1, levels: 1, unlock: 22, reqs: 1, recList: [4], effect: "If (Bank >= 5), x(1 + ln(ticks)) Tokens"},
    {name: "tokenUpgrade9", baseCost: 25, costScaling: 2, levels: 4, unlock: 23, reqs: 1, recList: [5], effect: "+1x XP per level"},
    {name: "tokenUpgrade10", baseCost: 50, costScaling: 4, levels: 2, unlock: 24, reqs: 2, recList: [6, 7], effect: "+0.75x XPBoost, +0.1x Luck per level"},
    {name: "tokenUpgrade11", baseCost: 1000000, costScaling: 1, levels: 1, unlock: 19, reqs: 0, recList: [0], effect: "Maybe you're not supposed to buy this?"},
    {name: "tokenUpgrade12", baseCost: 3, costScaling: 1.5, levels: 5, unlock: 19, reqs: 1, recList: [11], effect: "Nerfs killing you? Here's +0.1x tokens per level"},
    {name: "tokenUpgrade13", baseCost: 1, costScaling: 1, levels: 100, unlock: 19, reqs: 1, recList: [11], effect: "+0.05x XP per level. And x2 if maxed"},
    {name: "tokenUpgrade14", baseCost: 10, costScaling: 2, levels: 5, unlock: 20, reqs: 1, recList: [11], effect: "+0.5x RP per level"},
    {name: "tokenUpgrade15", baseCost: 5, costScaling: 2, levels: 3, unlock: 21, reqs: 1, recList: [11], effect: "+0.1x Crate luck per level"},
    {name: "tokenUpgrade16", baseCost: 25, costScaling: 2, levels: 4, unlock: 23, reqs: 1, recList: [11], effect: "+^0.05 XPBoost effect expo per level"},
    {name: "tokenUpgrade17", baseCost: 100, costScaling: 3, levels: 3, unlock: 27, reqs: 0, recList: [0], effect: "+0.5x Crate luck per level"},
    {name: "tokenUpgrade18", baseCost: 200, costScaling: 2, levels: 3, unlock: 28, reqs: 1, recList: [14], effect: "+1x RP per level"},
    {name: "tokenUpgrade19", baseCost: 250, costScaling: 1.1, levels: 10, unlock: 31, reqs: 0, recList: [0], effect: "+0.3x Tokens per level"},
    {name: "tokenUpgrade20", baseCost: 100, costScaling: 1, levels: 100, unlock: 32, reqs: 0, recList: [0], effect: "+0.1x XP per level. And x5 if maxed"},
    {name: "tokenUpgrade21", baseCost: 1000, costScaling: 5, levels: 3, unlock: 33, reqs: 0, recList: [0], effect: "+1x XPBoost per level, squared (1, 4, 9)"},
    {name: "tokenUpgrade22", baseCost: 10000, costScaling: 7.7, levels: 2, unlock: 34, reqs: 1, recList: [17], effect: "+5% Chance of x10 Crate Luck on open"},
]

const dailyUpgrades = [
    {name: "Test", baseCost: 1, costScaling: 1, unlock: 0, effect: "filler"},
    {name: "Claim daily rewards", baseCost: 1, costScaling: 1, unlock: 0, effect: "filler 2"},
    {name: "Timeskip", baseCost: 20, costScaling: 5, unlock: 3, effect: "Skips a certain amount of time to the future. Cost resets when claiming daily rewards"},
    {name: "Instant XP", baseCost: 25, costScaling: 5, unlock: 4, effect: "Grants XP based on 1st button amount and increases XP gain"},
    {name: "Liquid Luck", baseCost: 30, costScaling: 10, unlock: 6, effect: "+5% crate luck and +1 Luck charge (One use x1.5 luck)"},
    {name: "Instant XPBoost", baseCost: 50, costScaling: 10, unlock: 14, effect: "Grants XPBoost based on 1st button amount and increases XPBoost gain"},
    {name: "Token generator", baseCost: 50, costScaling: 10, unlock: 20, effect: "Adds many ticks into tokens and increases token gain"},
    {name: "Out-funded research", baseCost: 100, costScaling: 20, unlock: 26, effect: "Generates data and increases RP gain"},
]

const researches = [
    {name: "test", data: 0, unlock: 0, effect: "filler"},
    {name: "Baby's first research", data: 10, unlock: 0, effect: "x2 XP gain<br>(Is actually x1.51 after ^0.6)<br>(Gain RP through buttons. Then, data is passively generated)"},
    {name: "Baby's second research", data: 100, unlock: 0, effect: "x1.1 Research Power (RP) gain"},
    {name: "Reused research 1", data: 1500, unlock: 1, effect: "x2 XP gain, again"},
    {name: "Cooldown fastener", data: 5000, unlock: 2, effect: "/1.2 XP cooldowns"},
    {name: "First exponential buff", data: 15000, unlock: 3, effect: "^1.1 XP gain (any like this multiplies the expo by the amount, so x1.1 expo)"},
    {name: "Research buff 2", data: 20000, unlock: 4, effect: "x1.3 RP gain"},
    {name: "Researcher's nature guide", data: 40960, unlock: 5, effect: "x2 XP gain for each crate completed (multiplicatively, based on inv, not lifetime discovered)"},
    {name: "Badly drawn clover", data: 77700, unlock: 6, effect: "x1.2 luck"},
    {name: "Second exponential buff", data: 300000, unlock: 7, effect: "^1.1 XP gain"},
    {name: "Liquid luck 2 🍀", data: 777000, unlock: 8, effect: "x1.5 luck IF you own green dragon"},
    {name: "XP collector crane", data: 10**6, unlock: 9, effect: "Every minute, tries to claim all XP buttons unlocked<br>Cooldowns are no longer capped, so waiting x2 allows you to claim the button twice (decimal rolls adjust rng-wise, more in 'help')"},
    {name: "Reused research squared", data: 2*10**6, unlock: 10, effect: "x4 XP gain"},
    {name: "Hey, I think you need this", data: 4*10**6, unlock: 11, effect: "x1.3 luck"},
    {name: "Big baller moment", data: 6*10**6, unlock: 12, effect: "x2 XPBoost. Big win on getting here again"}, //Level 100
    {name: "R(ole) P(lay) buff", data: 8*10**6, unlock: 13, effect: "uwu give me x2 RP please uwu thanks ^^"},
    {name: "Expo buff", data: 10**7, unlock: 14, effect: "You miss positive xpboost expo? Here's ^1.2 XPBoost effect"},
    {name: "Speed up", data: 2*10**7, unlock: 15, effect: "/1.2 Crate and XPBoost cooldowns"},
    {name: "A little bit of everything", data: 4*10**7, unlock: 16, effect: "x5 XP<br>x2 XPBoost<br>x1.3 Luck"},
    {name: "The fastest sheriff", data: 6*10**7, unlock: 17, effect: "/1.4 XP, Crate, XPBoost and RP Cooldowns, IF you have a cat"},
    {name: "Tokens reunited", data: 8*10**7, unlock: 18, effect: "x1.5 Tokens"}, //Level 500
    {name: "Impossible upgrade? More like possible", data: 10**8, unlock: 19, effect: "Unlocks more token upgrades"},
    {name: "A third exponential buff", data: 3*10**8, unlock: 20, effect: "^1.1 XP, go big with this"},
    {name: "Gimme tokens", data: 6*10**8, unlock: 21, effect: "x1.5 Tokens, again"},
    {name: "Critical ticks", data: 10**9, unlock: 22, effect: "5% chance of +20 ticks in tokens (effectively, about x2 ticks gain)<br>(2nd note: Additional ticks don't count for extra ticks rolls)"},
    {name: "Green collector crane", data: 2*10**9, unlock: 23, effect: "Every minute, tries to open all crates<br>Crate popup will only show up if a better pet is rolled<br>Liquid luck will instantly open one of your best crate when bought"},
    {name: "Fan suggested upgrade", data: 5*10**9, unlock: 24, effect: "/1.3 XP and XPBoost cooldowns<br>x1.5 Crate luck<br>If you don't like this, don't blame me"},
    {name: "Mastery buff", data: 10**10, unlock: 26, effect: "x2 XP for each Mastered Pet"},
    {name: "Plain tokens", data: 2*10**10, unlock: 26, effect: "x2 Tokens"},
    {name: "Big xpboost", data: 5*10**10, unlock: 29, effect: "x3 XPBoost"},
    {name: "Big(ger) xpboost", data: 8*10**10, unlock: 29, effect: "^1.2 XPBoost effect"},
    {name: "You've been waiting for this", data: 10**11, unlock: 31, effect: "-(^0.3) Token softcap. This is so as you push tokens, gains decrease at a slower rate"},
    {name: "Mastered liquid luck", data: 1.3*10**11, unlock: 32, effect: "x3 luck IF green dragon is mastered"},
    {name: "Robotic collector crane", data: 2*10**11, unlock: 33, effect: "Automates XPBoost, the same way xp/crates are automated<br>Also, /1.4 XP, Crate, XPBoost and RP cooldowns<br>John Check Back says hi from the beach"},
    {name: "Incremental tokens", data: 3*10**11, unlock: 33, effect: "^2.5 Token upgrade 8 effect (x(1 + ln(ticks)) tokens)"},
]

const mastery = [
    {petCost: 0, masteryCost: 0, masteryGain: 0},
    {petCost: 1, masteryCost: 0, masteryGain: 1}, // Crate 1
    {petCost: 100, masteryCost: 100, masteryGain: 2},
    {petCost: 200, masteryCost: 400, masteryGain: 5},
    {petCost: 100, masteryCost: 2000, masteryGain: 20},
    {petCost: 100, masteryCost: 1000, masteryGain: 5}, // Crate 2
    {petCost: 100, masteryCost: 4000, masteryGain: 10},
    {petCost: 300, masteryCost: 6000, masteryGain: 15},
    {petCost: 300, masteryCost: 8000, masteryGain: 50},
    {petCost: 200, masteryCost: 10000, masteryGain: 100},
    {petCost: 100, masteryCost: 15000, masteryGain: 250},
    {petCost: 1000, masteryCost: 50000, masteryGain: 100}, // Crate 3
    {petCost: 1000, masteryCost: 10**5, masteryGain: 200},
    {petCost: 1500, masteryCost: 2*10**5, masteryGain: 250},
    {petCost: 2000, masteryCost: 5*10**5, masteryGain: 400},
    {petCost: 2500, masteryCost: 10**6, masteryGain: 500},
    {petCost: 2000, masteryCost: 2*10**6, masteryGain: 1000},
    {petCost: 1500, masteryCost: 7*10**6, masteryGain: 3000},
    {petCost: 1000, masteryCost: 10**7, masteryGain: 10000},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 19}, //Crate 4
    {petCost: 1000, masteryCost: 10**300, masteryGain: 20},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 21},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 22},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 23},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 24},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 25},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 26},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 27}, // Crate 5
    {petCost: 1000, masteryCost: 10**300, masteryGain: 28},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 29},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 30},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 31},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 32},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 33},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 34},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 35}, // Crate 6
    {petCost: 1000, masteryCost: 10**300, masteryGain: 36},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 37},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 38},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 39},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 40},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 41},
    {petCost: 1000, masteryCost: 10**300, masteryGain: 42},
]