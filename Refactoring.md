# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

Firstly, Ive taken the constants out of the function. This is standard practice.
Next, I have taken out the createHash function so that it can be reused. This allows us to change the hashing logic at one place instead of doing it over two places in our code. 
Thirdly, I've tried to take out the candidate extraction part from event. Reassignment of variables could be avoided for better readability and debugging scenarios. Also, this makes it a bit legible to understand the process flow.
To finish off, adding some comments to the functions.