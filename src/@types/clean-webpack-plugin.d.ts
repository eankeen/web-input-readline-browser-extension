interface CleanWebpackPluginOptions {
  dry?: boolean
  verbose?: boolean
  cleanStatelWebpackAssets?: boolean
  protectWebpackAssets?: boolean
  cleanOnceBeforeBuildPatterns?: boolean
  cleanAfterEveryBuildPatterns?: boolean
  dangerouslyAllowCleanPatternsOutsideProject?: boolean
}

declare module 'clean-webpack-plugin' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function CleanWebpackPlugin(CleanWebpackPluginOptions?: object): object
  function CleanWebpackPlugin(): object
}
