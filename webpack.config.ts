// @ts-ignore Cannot find moudule
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
// @ts-ignore Cannot find module
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
// @ts-ignore Cannot find module
import CopyPlugin from 'copy-webpack-plugin'
// @ts-ignore Cannot find module
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'
// @ts-ignore Cannot find module
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
// @ts-ignore Cannot find module
import webpack from 'webpack'

export default {
  mode: 'development',
  devtool: 'inline-source-map',

  context: path.join(__dirname, 'src'),
  entry: {
    // common
    'chrome/script': './common/app/script.ts',
    'chrome/content': './common/app/content.ts',
    'chrome/root': './common/app/ui/rootPopup.tsx',
    'firefox/script': './common/app/script.ts',
    'firefox/content': './common/app/content.ts',
    'firefox/root': './common/app/ui/rootPopup.tsx',

    // chrome
    'chrome/background': './chrome/app/background.ts',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new CaseSensitivePathsPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: './common',
        to: './chrome',
        ignore: ['**/app/**'],
      },
      {
        from: './common',
        to: './firefox',
        ignore: ['**/app/**'],
      },
      {
        from: './chrome',
        to: './chrome',
        ignore: ['**/app/**'],
      },
      {
        from: './firefox',
        to: './firefox',
        ignore: ['**/app/**'],
      },
    ]),
  ],
}
