import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
  mode: 'development',
  devtool: 'inline-source-map',

  context: path.join(__dirname, 'src'),
  entry: {
    content: './app/content.ts',
    background: './app/background.ts',
    script: './app/script.ts',
    popup: './ui/popup.tsx',
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin([
      {
        from: './files/**/*',
        to: '.',
        transformPath: (targetPath, absolutePath) => {
          return targetPath.replace('files/', '')
        },
      },
    ]),
  ],
}
