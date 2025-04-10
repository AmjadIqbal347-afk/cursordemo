function checkIfPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function checkArrayForPrimes(numbers) {
    // Input validation
    if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array of numbers');
    }
    
    // Map through the array and check each number
    return numbers.map(num => {
        // Validate each element is a number
        if (typeof num !== 'number' || isNaN(num)) {
            throw new Error('All elements must be valid numbers');
        }
        return checkIfPrime(num);
    });
}

module.exports = {
    checkIfPrime,
    checkArrayForPrimes
};  

            
