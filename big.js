function addBig(a, b, c, d) { //[a, b] is the initial number and [c, d] is the added number
    let finalMantissa = 0
    let finalExponent = 0
    let expoDifference = b - d
    if (expoDifference >= 15) { //example: 1e20 + 1e5 = 1e20
        finalMantissa = a
        finalExponent = b
    } 
    else if (expoDifference <= -15) { //example: 1e5 + 1e20 = 1e20
        finalMantissa = c
        finalExponent = d
    }
    else {
        finalMantissa = a + c/(10**expoDifference)
        finalExponent = b
    }
    let finalNumber = adjustMantissa(finalMantissa, finalExponent)
    return finalNumber
}

function substractBig(a, b, c, d) { //[a, b] is the initial number and [c, d] is the substracted number
    let finalMantissa = 0
    let finalExponent = 0
    let expoDifference = b - d
    if (expoDifference >= 15) { //example: 1e20 - 1e5 = 1e20
        finalMantissa = a
        finalExponent = b
    }
    else if (expoDifference <= -15) { //example: 1e5 - 1e20 = -1e20
        finalMantissa = -c
        finalExponent = d
    }
    else {
        finalMantissa = a - c/(10**expoDifference)
        finalExponent = b
    }
    let finalNumber = adjustMantissa(finalMantissa, finalExponent)
    return finalNumber
}

function multiplyBig(a, b, c, d) { //[a, b] is the initial number and [c, d] is the multiplied number
    let finalMantissa = a * c
    let finalExponent = b + d
    let finalNumber = adjustMantissa(finalMantissa, finalExponent)
    return finalNumber
}

function divideBig(a, b, c, d) { //[a, b] is the initial number and [c, d] is the divided number
    let finalMantissa = a / c
    let finalExponent = b - d
    let finalNumber = adjustMantissa(finalMantissa, finalExponent)
    return finalNumber
}

function exponentBig(a, b, c, d) { //x^y where x = [a, b] and y = [c, d]
    let expo = (c * 10**d) * (Math.log10(a) + b) //x^y = 10^(y * logx) and log(x) = log(a) + b
    let finalExponent = Math.floor(expo)
    let finalMantissa = 10**(expo % 1) //If the expo is 32.5, the number would be 10^32 * 10^0.5, or about 3.1e32
    let finalNumber = [finalMantissa, finalExponent]
    return finalNumber
}

function displayBig(a, b) { //Basically will format [a, b] into proper number formatting
    let expoExpo = Math.floor(Math.log10(b))
    let expoMantissa = b/(10**expoExpo)
    if (b < 12) {return numberShort(a * 10**b)}
    else if (b < 10000) {return (a.toFixed(2) + "e" + wholeNumberShort(b))}
    else if (b < 10**12) {return (Math.floor(a) + "e" + wholeNumberShort(b))}
    else return (Math.floor(a) + "e" + expoMantissa.toFixed(1) + "e" + expoExpo.toFixed(0))
}

function compareBig(a, b, c, d) { //Checks if a number [a, b] is bigger than [c, d]
    if (b > d) {return true} //exponent b is bigger than exponent d, like 1e10 > 1e8
    else if (a > c && b == d) {return true} //in case of same exponent, a is bigger than c, so like 2e10 > 1.5e10
    else return false //it's false
}

function adjustMantissa(a, b) { //Makes sure the mantissa is between 1 and 10, adjust the expo accordingly
    let mantissa = a
    let absoluteMantissa = Math.abs(a)
    let exponent = b
    if (absoluteMantissa >= 1 && absoluteMantissa < 10) {} //If the mantissa is between 1 and 10, no need to fix anything
    else {
        let offsetExponent = Math.floor(Math.log10(absoluteMantissa))
        exponent += offsetExponent
        mantissa /= 10**offsetExponent
    }
    let finalNumber = [mantissa, exponent]
    return finalNumber
}

function convertToBig(a) { //Converts a number a = 1.2e21 to format [1.2, 21]
    let exponent = Math.floor(Math.log10(Math.abs(a)))
    let mantissa = a/(10**exponent)
    return [mantissa, exponent]
}

function convertToNormal(a, b) { //Converts a number [a, b] to normal format
    if (b < 308) {return (a * 10**b)}
    else return "Error: Number too big to be converted back"
}