import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
// @ts-ignore
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
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
    'chrome/main.global': './common/app/main.global.css',
    'firefox/script': './common/app/script.ts',
    'firefox/content': './common/app/content.ts',
    'firefox/root': './common/app/ui/rootPopup.tsx',
    'firefox/main.global': './common/app/main.global.css',

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
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          limit: 2048,
          fallback: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new CaseSensitivePathsPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new MiniCssExtractPlugin(),
    // @ts-ignore
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
