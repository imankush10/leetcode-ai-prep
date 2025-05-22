export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface LanguageConfig {
  boilerplate: string;
  driverCode: string;
  judgeLanguageId: number;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  testCases: TestCase[];
  languages: {
    [key: string]: LanguageConfig;
  };
}

// ----- Problems -----

export const PROBLEMS_DB: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    testCases: [
      { input: "[2,7,11,15],9", expectedOutput: "[0,1]" },
      { input: "[3,2,4],6", expectedOutput: "[1,2]" },
      { input: "[3,3],6", expectedOutput: "[0,1]" },
      { input: "[1,2,3,4,5],9", expectedOutput: "[3,4]" },
      { input: "[-1,-2,-3,-4,-5],-8", expectedOutput: "[2,4]" },
    ],
    languages: {
      cpp: {
        boilerplate: `/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *
 * Example:
 * ----------
 * Given nums = [2, 7, 11, 15], target = 9,
 * Because nums[0] + nums[1] = 2 + 7 = 9,
 * return [0, 1].
 *
 * Args:
 *     nums (vector<int>&): A reference to a vector of integers.
 *     target (int): The target sum.
 *
 * Returns:
 *     vector<int>: A vector containing two indices.
 */
vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
}`,
        driverCode: `#include <bits/stdc++.h>
using namespace std;

{{USER_CODE}}

int main() {
    vector<vector<int>> inputs = {
        {2, 7, 11, 15},
        {3, 2, 4},
        {3, 3},
        {1, 2, 3, 4, 5},
        {-1, -2, -3, -4, -5}
    };
    vector<int> targets = {9, 6, 6, 9, -8};
    
    cout << "[";
    for (int i = 0; i < inputs.size(); ++i) {
        vector<int> res = twoSum(inputs[i], targets[i]);
        cout << "[" << res[0] << "," << res[1] << "]";
        if (i < inputs.size() - 1) {
            cout << ",";
        }
    }
    cout << "]"; // Removed endl - this was causing JSON parsing issues
    
    return 0;
}`,
        judgeLanguageId: 54,
      },
      python: {
        boilerplate: `def twoSum(nums, target):
    """
    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

    Example:
    ----------
    Given nums = [2, 7, 11, 15], target = 9,
    Because nums[0] + nums[1] = 2 + 7 = 9,
    return [0, 1].

    Args:
        nums (List[int]): A list of integers.
        target (int): The target sum.

    Returns:
        List[int]: A list containing two indices.
    """
    # Your code here
    pass`,
        driverCode: `import json

{{USER_CODE}}

test_cases = [
    ([2,7,11,15], 9),
    ([3,2,4], 6),
    ([3,3], 6),
    ([1,2,3,4,5], 9),
    ([-1,-2,-3,-4,-5], -8)
]
results = []
for nums, target in test_cases:
    results.append(twoSum(nums, target))
print(json.dumps(results))`,
        judgeLanguageId: 71,
      },
      javascript: {
        boilerplate: `/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *
 * Example:
 * ----------
 * Given nums = [2, 7, 11, 15], target = 9,
 * Because nums[0] + nums[1] = 2 + 7 = 9,
 * return [0, 1].
 *
 * @param {number[]} nums - An array of integers.
 * @param {number} target - The target sum.
 * @returns {number[]} An array containing two indices.
 */
function twoSum(nums, target) {
  // Your code here
}`,
        driverCode: `{{USER_CODE}}

const testCases = [
  [[2,7,11,15], 9],
  [[3,2,4], 6],
  [[3,3], 6],
  [[1,2,3,4,5], 9],
  [[-1,-2,-3,-4,-5], -8]
];
const results = testCases.map(([nums, target]) => {
    return twoSum(nums, target);
});
console.log(JSON.stringify(results));`,
        judgeLanguageId: 63,
      },
      java: {
        boilerplate: `/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
 *
 * Example:
 * ----------
 * Given nums = [2, 7, 11, 15], target = 9,
 * Because nums[0] + nums[1] = 2 + 7 = 9,
 * return [0, 1].
 *
 * Args:
 *     nums (int[]): An array of integers.
 *     target (int): The target sum.
 *
 * Returns:
 *     int[]: An array of two indices.
 */
public int[] twoSum(int[] nums, int target) {
    // Your code here
}`,
        driverCode: `import java.util.*;

class Main {  // Changed from Solution to Main
{{USER_CODE}}
    
    public static void main(String[] args) {
        Main solution = new Main();  // Changed from Solution to Main
        int[][] inputs = {
            {2, 7, 11, 15},
            {3, 2, 4},
            {3, 3},
            {1, 2, 3, 4, 5},
            {-1, -2, -3, -4, -5}
        };
        int[] targets = {9, 6, 6, 9, -8};
        
        System.out.print("[");
        for (int i = 0; i < inputs.length; ++i) {
            int[] res = solution.twoSum(inputs[i], targets[i]);
            System.out.print("[" + res[0] + "," + res[1] + "]");
            if (i < inputs.length - 1) {
                System.out.print(",");
            }
        }
        System.out.print("]");  // Changed from println to print to avoid extra newline
    }
}`,
        judgeLanguageId: 62,
      },
    },
  },
];

export function getRandomProblem(): Problem {
  const randomIndex = Math.floor(Math.random() * PROBLEMS_DB.length);
  return PROBLEMS_DB[randomIndex];
}

export function getProblemById(id: string): Problem | undefined {
  return PROBLEMS_DB.find((problem) => problem.id === id);
}

export function getAllProblems(): Problem[] {
  return PROBLEMS_DB;
}
