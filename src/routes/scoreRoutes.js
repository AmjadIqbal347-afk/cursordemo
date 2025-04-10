const express = require('express');
const router = express.Router();
const { checkArrayForPrimes } = require('../utils/common');

/**
 * @route POST /api/scores/check-primes
 * @description Check if scores are prime numbers
 * @access Public
 * 
 * @example
 * Request body:
 * {
 *   "scores": [
 *     { "userId": "user1", "score": 2 },
 *     { "userId": "user2", "score": 4 },
 *     { "userId": "user3", "score": 7 }
 *   ]
 * }
 * 
 * Response:
 * {
 *   "results": [
 *     { "userId": "user1", "score": 2, "isPrime": true },
 *     { "userId": "user2", "score": 4, "isPrime": false },
 *     { "userId": "user3", "score": 7, "isPrime": true }
 *   ]
 * }
 */
router.post('/check-primes', (req, res) => {
    try {
        const { scores } = req.body;

        // Validate input
        if (!Array.isArray(scores)) {
            return res.status(400).json({
                error: 'Input must be an array of scores'
            });
        }

        // Extract scores and check if they're prime
        const scoreValues = scores.map(item => item.score);
        const primeResults = checkArrayForPrimessss(scoreValues);

        // Combine results with original data
        const results = scores.map((item, index) => ({
            ...item,
            isPrime: primeResults[index]
        }));

        res.json({ results });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

module.exports = router; 