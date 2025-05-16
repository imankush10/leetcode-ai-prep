export const sampleProblem = {
  id: "two-sum",
  title: "Two Sum",
  description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]"
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]"
    }
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists."
  ],
  difficulty: "Easy",
  testCases: [
    {
      id: 1,
      input: "[2,7,11,15], 9",
      expectedOutput: "[0,1]"
    },
    {
      id: 2,
      input: "[3,2,4], 6",
      expectedOutput: "[1,2]"
    },
    {
      id: 3,
      input: "[3,3], 6",
      expectedOutput: "[0,1]"
    },
    {
      id: 4,
      input: "[1,2,3,4,5], 9",
      expectedOutput: "[3,4]"
    },
    {
      id: 5,
      input: "[-1,-2,-3,-4,-5], -8",
      expectedOutput: "[2,4]"
    }
  ]
};
