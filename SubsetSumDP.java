class SubsetSumDP {
    public static boolean isSubsetSum(int[] arr, int sum) {
        int n = arr.length;
        boolean[][] dp = new boolean[n + 1][sum + 1];
        for (int i = 0; i <= n; i++) dp[i][0] = true;

        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= sum; s++) {
                if (arr[i - 1] <= s)
                    dp[i][s] = dp[i - 1][s - arr[i - 1]] || dp[i - 1][s];
                else
                    dp[i][s] = dp[i - 1][s];
            }
        }
        return dp[n][sum];
    }

    public static void main(String[] args) {
        System.out.println(isSubsetSum(new int[]{3, 34, 4, 12, 5, 2}, 9)); // true
    }
}
