### AMNE Challenge

#### Set Up

1. Install Dependencies

  ```npm i
  ```
2. Run tests

  ```npm test
  ```
3. Execute program

  *** (program will try to find a `input.txt` file in the home directory.)***

  ```node app.js
  ```


#### Explanation of Solution

Reading over the problem and the requirements for the time and space complexity I saw that the problem could be solved in linear time. I separated the task into 4 different functions that I chained to the result of my promisified `fs.readFile()` function.

1. **parseTxtIntoObject()**:

  This function is in charge of parsing the input read from the `input.txt` file into an object. I decided that the only necessary information that was needed to solve this problem was the list of `N` positive integers of average home sale prices and the `K` window size. I also take care of checking to see if the information read is valid in this file by doing some simple error checking.

  Runtime: O( N )

2. **calculateTrendByTwo()**:

  In order to make the given input a little easier to reason about, I wrote this function to reduce the list of N positive integers of average home sale prices, to a list of N-1 of the trends between two consecutive average home sale prices. This step was to simplify the input into a meaningful representation which is weather or not the next day the average home sale prices increased ( `1`), decreased(`-1`) or stayed the same(`0`).

  ex.
  ```
  [ 188930, 194123, 201345, 154243, 154243 ] => [ 1, 1, -1, 0 ]
  ```

  Runtime: O( N )

3. **calulateResultsPerWindowSize()**:

  This is function, along with its helper function `calculateWindowTrend()`, take care of the heavy lifting. I set up an hash to be used as a memo to cache the input with its result anytime we calculate the trend for any given window size `K`. This lets us look up the previous calculations we have already made, saving a decent amount of time. Also, since the array now only contains the values 1, -1, 0 the amount of permutations within the array as a whole – based on window size – are reduced significantly.

  ex.
  ```
    K = 3
    [ 1, 2, 3, 4, 5, 6 ] => [ 1, 1, 1, 1, 1]
  ```

    Without reduced of array done on step 2 we would make 4 calculations.
  ```
    foundCalculationsMemo ={
      [1, 2, 3] : 3,
      [2, 3, 4] : 3,
      [3, 4, 5] : 3
      [4, 5, 6] : 3
    }
  ```
    With the reducing the array, which was done in step 2, we only need do it once and we cache it.
  ```
    foundCalculationsMemo = { [1,1] : 3 }
  ```

  Runtime: O( N )

4. **printWindowResultsByLine()**:

  This function iterates through the array of window calculations and prints each value to the console.
