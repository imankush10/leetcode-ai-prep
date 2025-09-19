export interface TestCase {
  input: string;
  expectedOutput: string;
  checkOrder: boolean;
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
      { input: "[2,7,11,15],9", expectedOutput: "[0,1]", checkOrder: false },
      { input: "[3,2,4],6", expectedOutput: "[1,2]", checkOrder: false },
      { input: "[3,3],6", expectedOutput: "[0,1]", checkOrder: false },
      { input: "[1,2,3,4,5],9", expectedOutput: "[3,4]", checkOrder: false },
      { input: "[-1,-2,-3,-4,-5],-8", expectedOutput: "[2,4]", checkOrder: false },
    ],
    languages: {
      cpp: {
        boilerplate: `vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n}`,
        // 🔑 FIXED: Universal placeholder
        driverCode: `#include <bits/stdc++.h>
using namespace std;

{{USER_CODE}}

int main() {
    vector<vector<int>> inputs = {
        {2, 7, 11, 15}, {3, 2, 4}, {3, 3}, {1, 2, 3, 4, 5}, {-1, -2, -3, -4, -5}
    };
    vector<int> targets = {9, 6, 6, 9, -8};
    
    cout << "[";
    for (int i = 0; i < inputs.size(); ++i) {
        vector<int> res = twoSum(inputs[i], targets[i]);
        sort(res.begin(), res.end()); // Sort for consistent output
        cout << "[" << res[0] << "," << res[1] << "]";
        if (i < inputs.size() - 1) cout << ",";
    }
    cout << "]";
    return 0;
}`,
        judgeLanguageId: 54,
      },
      python: {
        boilerplate: `def twoSum(nums, target):\n    # Your code here\n    pass`,
        // 🔑 FIXED: Universal placeholder
        driverCode: `import json

{{USER_CODE}}

def main():
    test_cases = [
        ([2,7,11,15], 9), ([3,2,4], 6), ([3,3], 6),
        ([1,2,3,4,5], 9), ([-1,-2,-3,-4,-5], -8)
    ]
    results = []
    for nums, target in test_cases:
        result = twoSum(nums, target)
        results.append(sorted(result)) # Sort for consistent output
    print(json.dumps(results))

main()`,
        judgeLanguageId: 71,
      },
      javascript: {
        boilerplate: `function twoSum(nums, target) {\n  // Your code here\n}`,
        // 🔑 FIXED: Universal placeholder
        driverCode: `{{USER_CODE}}

const testCases = [
  [[2,7,11,15], 9], [[3,2,4], 6], [[3,3], 6],
  [[1,2,3,4,5], 9], [[-1,-2,-3,-4,-5], -8]
];

const results = testCases.map(([nums, target]) => {
    const result = twoSum(nums, target);
    return result.sort((a, b) => a - b); // Sort for consistent output
});

console.log(JSON.stringify(results));`,
        judgeLanguageId: 63,
      },
      java: {
        boilerplate: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}`,
        // 🔑 FIXED: Universal placeholder and class structure
        driverCode: `import java.util.*;

// The user's code will be injected here. It should contain the Solution class.
{{USER_CODE}}

class Main {
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[][] inputs = {
            {2, 7, 11, 15}, {3, 2, 4}, {3, 3}, {1, 2, 3, 4, 5}, {-1, -2, -3, -4, -5}
        };
        int[] targets = {9, 6, 6, 9, -8};
        
        List<String> results = new ArrayList<>();
        for (int i = 0; i < inputs.length; ++i) {
            int[] res = solution.twoSum(inputs[i], targets[i]);
            Arrays.sort(res); // Sort for consistent output
            results.add("[" + res[0] + "," + res[1] + "]");
        }
        System.out.print("[" + String.join(",", results) + "]");
    }
}`,
        judgeLanguageId: 62,
      },
    },
  },
];

// Functions to get problems
export function getProblemById(id: string): Problem | undefined {
  return PROBLEMS_DB.find((problem) => problem.id === id);
}

export function getAllProblems(): Problem[] {
  return PROBLEMS_DB;
}
