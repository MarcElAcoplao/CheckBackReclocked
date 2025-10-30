const unlockLevelsSmall = [2, 3, 4, 6, 8, 12, 18, 25, 35, 50, 65, 80, 100, 1000000000]
const unlockLevelsBig = [12, 15, 18, 21, 24, 27, 30, 100, 1000000000]
const permanentUnlockLevels = [50, 100000000]
const permanentUnlocks = [10, 100000]
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

const ranks = [
    [1, "Beginner", 1],
    [2, "Basic", 1],
    [3, "Unremarkable", 1],
    [4, "Mediocre", 1],
    [5, "Average", 1],
    [6, "Decent", 1],
    [8, "Competent", 1],
    [10, "Proficient", 1],
    [12, "Skilled", 1],
    [14, "Talented", 1],
    [16, "Expert", 1],
    [18, "Exceptional", 1],
    [20, "Brilliant", 1],
    [25, "Extraordinary", 1],
    [30, "Renowned", 1],
    [35, "Unmatched", 1],
    [40, "Superior", 1],
    [45, "Legendary", 1],
    [50, "Mythical", 1],
    [55, "Insane", 1],
    [60, "Supreme", 1],
    [65, "Godly", 1],
    [70, "Universal", 1],
    [75, "Multiversal", 1],
    [80, "Omniversal", 1],
    [90, "Hyperdimensional", 1], //Rank 25, after this, every rank gets a number every x levels up to the number commented next to it.
    [100, "Transcendent", 10], //10
    [200, "Infinite", 10], //10
    [300, "Beyond infinite", 10], //10
    [400, "Endless", 10], //10
    [500, "Void", 80], //25
    [2500, "Extensive", 300], //25
    [10000, "Dedicated", 800], //50
    [50000, "Loot", 3000], //50
    [200000, "Magic", 16000], //50
    [1000000, "Troll", 80000], //50
    [5000000, "Insanity", 100000], //50
    [10000000, "Time", 400000], //75
    [40000000, "Space", 800000], //75
    [100000000, "Finality", 4000000], //75
    [400000000, "placeholder", 8000000] //75
    [10 ** 9, "Alpha", 9 * 10 ** 7], //100
    [10 ** 10, "Beta", 9 * 10 ** 8], //100
    [10 ** 11, "Chi", 9 * 10 ** 9], //100
    [10 ** 12, "Delta", 3.996 * 10 ** 12], //250
    [10 ** 15, "Epsilon", 3.996 * 10 ** 15], //250
    [10 ** 18, "Fabled", 3.996 * 10 ** 18], //250
    [10 ** 21, "Impossibly dedicated", 10 ** 21],
    [10 ** 100, "Impossibly dedicated squared", 10 ** 100],
    [Infinity, "Error", 1],
] //space and finality, omega

const pets = [
    //Name, XP multiplier, Funny special text.
    { name: "Test", xpMulti: 1, specialText: "Hey, how did you find me? (Placeholder)" }, //0
    { name: "Slug", xpMulti: 1.1, specialText: "A snail that lost its shell and has to live underneath a bridge... for now.<br>(Most textures like this have been taken from a project called Dungeon Crawl, check it out)" }, // 1
    { name: "Rat", xpMulti: 1.2, specialText: "A rat forced to eat trash to survive. It'd love to eat a fresh lug anyday." }, // 2
    { name: "Snake", xpMulti: 1.3, specialText: "A snake living in barren wastes, looking for any juicy rat to eat." }, // 3
    { name: "Small Elf", xpMulti: 1.5, specialText: "This breed of elves is so small that they cannot harvest anything bigger than a mushroom. They love to dine on snakes." }, // 4
    { name: "Green Butterfly", xpMulti: 1.25, specialText: "Green butterflies are known to be annoying when crossing forests." }, // 5
    { name: "Green Lizard", xpMulti: 1.4, specialText: "Rapid bug that cammouflages through green environments." }, // 6
    { name: "Green Salamander", xpMulti: 1.6, specialText: "Their only danger comes from accidentally touching them." }, // 7
    { name: "Green Spider", xpMulti: 1.8, specialText: "They live on leaves because they can't make cobwebs." }, // 8
    { name: "Green Crocodile", xpMulti: 2.1, specialText: "It has a little button that makes it say 'See ya later, alligator'." }, // 9
    { name: "Green Dragon", xpMulti: 2.5, specialText: "Myths say that this dragon is a symbol of luck. Do they drink liquid luck?" }, // 10
    { name: "Turtle", xpMulti: 2, specialText: "Not the fastest sheriff of the wild west." }, //11
    { name: "Tarantula", xpMulti: 2.2, specialText: "An australian nightmare if it weren't for their big green eyes." }, //12
    { name: "1-Headed Snake", xpMulti: 2.4, specialText: "Where are the other heads? They were lost in a crazy blackjack night. Maybe this snake will restore them eventually." }, //13
    { name: "Purple Butterfly", xpMulti: 2.7, specialText: "Do I know the green butterfly? I'd rather not know her." }, //14
    { name: "Earth Snake", xpMulti: 3, specialText: "Unlike other snakes, this one saw the Avatar training, and learned a thing or two about earth bending." }, //15
    { name: "Scorpion", xpMulti: 3.5, specialText: "People used to call me the 'Death Scorpion' but I prefer being a farmer, so I dropped the name." }, //16
    { name: "Cat", xpMulti: 4, specialText: "Maybe the fastest sheriff of the wild west, if the cat were to behave correctly." }, //17
    { name: "Earth Dragon", xpMulti: 5, specialText: "The father of the Earth, this dragon can make life out of sticks and stones." }, //18
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

const stats = [
    //Name, unlock required
    { name: "Test", unlock: 0 },
    { name: "Player", unlock: 0 },
    { name: "XP Multipliers", unlock: 0 },
    { name: "Crate multipliers", unlock: 5 },
]

const dailyRewards = [
    { name: "Test" },
    { name: "XP" },
    { name: "Skeleton Crate" },
]