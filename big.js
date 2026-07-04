function addBig(a, b) { //a is an array [mantissa, exponent] and b is another array [mantissa, exponent]
    if (a.length == 2 && b.length == 2) {
        let finalMantissa = 0
        let finalExponent = 0
        let finalNumber = 0
        let expoDifference = a[1] - b[1]
        if (expoDifference >= 15) { //example: 1e20 + 1e5 = 1e20
            finalNumber = a //final number becomes the array a
        }
        else if (expoDifference <= -15) { //example: 1e5 + 1e20 = 1e20
            finalNumber = b //final number becomes the array b
        }
        else {
            finalMantissa = a[0] + b[0] / (10 ** expoDifference)
            finalExponent = a[1]
            finalNumber = adjustMantissa([finalMantissa, finalExponent])
        }
        return finalNumber
    }
    else {
        let firstNumber = 0
        let secondNumber = 0
        if (typeof a === 'number' && !isNaN(a)) { firstNumber = convertToBig(a) }
        else if (a.length == 2) firstNumber = a
        if (typeof b === 'number' && !isNaN(b)) { secondNumber = convertToBig(b) }
        else if (b.length == 2) secondNumber = b
        return addBig(firstNumber, secondNumber)
    }
}

function substractBig(a, b) { //a is an array [mantissa, exponent] and b is another array [mantissa, exponent]
    if (a.length == 2 && b.length == 2) {
        let firstNumber = a
        let secondNumber = negateBig(b)
        return addBig(firstNumber, secondNumber)
    }
    else {
        let firstNumber = 0
        let secondNumber = 0
        if (typeof a === 'number' && !isNaN(a)) { firstNumber = convertToBig(a) }
        else if (a.length == 2) firstNumber = a
        if (typeof b === 'number' && !isNaN(b)) { secondNumber = convertToBig(b) }
        else if (b.length == 2) secondNumber = b
        return substractBig(firstNumber, secondNumber)
    }
}

function multiplyBig(a, b) { //a is an array [mantissa, exponent] and b is another array [mantissa, exponent]
    if (a.length == 2 && b.length == 2) {
        let finalMantissa = a[0] * b[0]
        let finalExponent = a[1] + b[1]
        let finalNumber = adjustMantissa([finalMantissa, finalExponent])
        return finalNumber
    }
    else {
        let firstNumber = 1
        let secondNumber = 1
        if (typeof a === 'number' && !isNaN(a)) { firstNumber = convertToBig(a) }
        else if (a.length == 2) firstNumber = a
        if (typeof b === 'number' && !isNaN(b)) { secondNumber = convertToBig(b) }
        else if (b.length == 2) secondNumber = b
        return multiplyBig(firstNumber, secondNumber)
    }
}

function divideBig(a, b) { //a is an array [mantissa, exponent] and b is another array [mantissa, exponent]
    if (a.length == 2 && b.length == 2) {
        let finalMantissa = a[0] / b[0]
        let finalExponent = a[1] - b[1]
        let finalNumber = adjustMantissa([finalMantissa, finalExponent])
        return finalNumber
    }
    else {
        let firstNumber = 1
        let secondNumber = 1
        if (typeof a === 'number' && !isNaN(a)) { firstNumber = convertToBig(a) }
        else if (a.length == 2) firstNumber = a
        if (typeof b === 'number' && !isNaN(b)) { secondNumber = convertToBig(b) }
        else if (b.length == 2) secondNumber = b
        return divideBig(firstNumber, secondNumber)
    }
}

function exponentBig(a, b) { //x^y where x = [a0, a1] and y = [b0, b1], and [a, b] = a * 10^b
    if (a.length == 2 && b.length == 2) {
        let expo = 0
        let finalExponent = 0
        let finalMantissa = 0
        let finalNumber = 0
        if (compareBig(a, [1, 0])) {
            expo = (b[0] * 10 ** b[1]) * (Math.log10(a[0]) + a[1]) //x^y = 10^(y * logx) and log(x) = log(a) + b
            finalExponent = Math.floor(expo)
            finalMantissa = 10 ** (expo % 1) //If the expo is 32.5, the number would be 10^32 * 10^0.5, or about 3.1e32
            finalNumber = adjustMantissa([finalMantissa, finalExponent])
        }
        else if (compareBig([1, 0], a)) {
            finalNumber = exponentBig(divideBig([1, 0], a), b)
            finalNumber = divideBig([1, 0], finalNumber)
        }
        else {
            finalNumber = [1, 0]
        }
        return finalNumber
    }
    else {
        let firstNumber = 1
        let secondNumber = 1
        if (typeof a === 'number' && !isNaN(a)) { firstNumber = convertToBig(a) }
        else if (a.length == 2) firstNumber = a
        if (typeof b === 'number' && !isNaN(b)) { secondNumber = convertToBig(b) }
        else if (b.length == 2) secondNumber = b
        return exponentBig(firstNumber, secondNumber)
    }
}

function logBig(a) { //Implements the log base 10 of a function
    if (a.length == 2) {return convertToBig(a[1] + Math.log10(a[0]))}
    else if (typeof a === 'number' && !isNaN(a)) {return convertToBig(Math.log10(a))}
    else return [1, 0]
}

function displayBig(a) { //Basically will format an array a that represents a number [x, y] where the number is x * 10^y
    if (a.length == 2) {
        let expoExpo = Math.floor(Math.log10(a[1]))
        let expoMantissa = a[1] / (10 ** expoExpo)
        if (a[1] <= -3) { return ("1/" + displayBig(divideBig([1, 0], a))) }
        else if (a[1] < 12) { return numberShort(a[0] * 10 ** a[1]) }
        else if (a[1] < 10000) { return (a[0].toFixed(2) + "e" + wholeNumberShort(a[1])) }
        else if (a[1] < 10 ** 12) { return (Math.floor(a[0]) + "e" + wholeNumberShort(a[1])) }
        else return (Math.floor(a[0]) + "e" + expoMantissa.toFixed(1) + "e" + expoExpo.toFixed(0))
    }
    else {
        let number = 0
        if (typeof a === 'number' && !isNaN(a)) { number = convertToBig(a) }
        return displayBig(number)
    }
}

function displayRoundBig(a) { //Basically will format a = [m, n] into proper number formatting but with no decimal places [like 2, 3, 123]
    if (a.length == 2) {
        let expoExpo = Math.floor(Math.log10(a[1]))
        let expoMantissa = a[1] / (10 ** expoExpo)
        if (a[1] < 12) { return wholeNumberShort(a[0] * 10 ** a[1]) }
        else if (a[1] < 10000) { return (a[0].toFixed(2) + "e" + wholeNumberShort(a[1])) }
        else if (a[1] < 10 ** 12) { return (Math.floor(a[0]) + "e" + wholeNumberShort(a[1])) }
        else return (Math.floor(a[0]) + "e" + expoMantissa.toFixed(1) + "e" + expoExpo.toFixed(0))
    }
    else {
        let number = 0
        if (typeof a === 'number' && !isNaN(a)) { number = convertToBig(a) }
        return displayRoundBig(number)
    }
}

function compareBig(a, b) { //Checks if a number [a0, a1] is bigger than [b0, b1], == returns false
    if (a.length == 2 && b.length == 2) {
        if (a[1] > b[1]) { return true } //exponent b is bigger than exponent d, like 1e10 > 1e8
        else if (a[0] > b[0] && a[1] == b[1]) { return true } //in case of same exponent, a is bigger than c, so like 2e10 > 1.5e10
        else return false //it's false
    }
    else {
        let firstNumber = 0
        let secondNumber = 0
        if (typeof a === 'number' && !isNaN(a)) { firstNumber = convertToBig(a) }
        else if (a.length == 2) firstNumber = a
        if (typeof b === 'number' && !isNaN(b)) { secondNumber = convertToBig(b) }
        else if (b.length == 2) secondNumber = b
        return compareBig(firstNumber, secondNumber)
    }
}

function compareBigEqual(a, b) { //Checks if a number [a0, a1] is bigger than [b0, b1], == returns true
    if (a.length == 2 && b.length == 2) {
        if (a[1] > b[1]) { return true } //exponent b is bigger than exponent d, like 1e10 > 1e8
        else if (a[0] >= b[0] && a[1] == b[1]) { return true } //in case of same exponent, a is bigger than c, so like 2e10 > 1.5e10
        else return false //it's false
    }
    else {
        let firstNumber = 0
        let secondNumber = 0
        if (typeof a === 'number' && !isNaN(a)) { firstNumber = convertToBig(a) }
        else if (a.length == 2) firstNumber = a
        if (typeof b === 'number' && !isNaN(b)) { secondNumber = convertToBig(b) }
        else if (b.length == 2) secondNumber = b
        return compareBigEqual(firstNumber, secondNumber)
    }
}

function adjustMantissa(a) { //Makes sure the mantissa is between 1 and 10, adjust the expo accordingly
    if (a[0] == 0) { return [0, 0] }
    else {
        let mantissa = a[0]
        let absoluteMantissa = Math.abs(a[0])
        let exponent = a[1]
        if (absoluteMantissa < 1 || absoluteMantissa >= 10) {
            let offsetExponent = Math.floor(Math.log10(absoluteMantissa))
            exponent += offsetExponent
            mantissa /= 10 ** offsetExponent
        } //If the mantissa is outside of [1, 10), it gets fixed
        let finalNumber = [mantissa, exponent]
        return finalNumber
    }
}

function convertToBig(a) { //Converts a number a = 1.2e21 to format [1.2, 21]
    if (a == 0) { return [0, 0] }
    else {
        let exponent = Math.floor(Math.log10(Math.abs(a)))
        let mantissa = a / (10 ** exponent)
        return [mantissa, exponent]
    }
}

function convertToNormal(a) { //Converts an array that represents a big number to a normal one
    if (a[1] < 308) { return (a[0] * 10 ** a[1]) }
    else return "Error: Number too big to be converted back"
}

function negateBig(a) { //From [1.23, 1] being 12.3, returns -12.3
    if (a.length == 2) {return [-a[0], a[1]]}
    else if (typeof a === 'number' && !isNaN(a)) {return convertToBig(-a)}
    else return 1
}

function areEqual(a, b) {
    if (a.length == 2 && b.length == 2) {
        let result = false
        if (a[0] == b[0] && a[1] == b[1]) {result = true}
        return result
    }
    else {
        let firstNumber = 0
        let secondNumber = 0
        if (typeof a === 'number' && !isNaN(a)) { firstNumber = convertToBig(a) }
        else if (a.length == 2) firstNumber = a
        if (typeof b === 'number' && !isNaN(b)) { secondNumber = convertToBig(b) }
        else if (b.length == 2) secondNumber = b
        return areEqual(firstNumber, secondNumber)
    }
}