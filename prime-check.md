# Prime Number Check Flowchart

This diagram represents the logic of the `checkIfPrime` function.

```mermaid
flowchart TD
    A[Start] --> B{num <= 1?}
    B -->|Yes| C[Return false]
    B -->|No| D{num <= 3?}
    D -->|Yes| E[Return true]
    D -->|No| F{Divisible by 2 or 3?}
    F -->|Yes| G[Return false]
    F -->|No| H[Initialize i = 5]
    H --> I{i * i <= num?}
    I -->|No| J[Return true]
    I -->|Yes| K{Divisible by i or i+2?}
    K -->|Yes| L[Return false]
    K -->|No| M[i += 6]
    M --> I
```

## Explanation

1. First checks if the number is less than or equal to 1 (not prime)
2. Then checks if the number is 2 or 3 (prime)
3. Checks divisibility by 2 or 3
4. Main loop checks divisibility by numbers of the form 6k ± 1
5. Returns true if no divisors are found, false otherwise 