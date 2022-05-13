const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); //плагин для работы с html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //плагин для очистки папки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  //плагин для работы с css


module.exports = {
  entry:  { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[hash].js',
    clean: true,
        publicPath: ''
  },

  mode: 'development', // добавили режим разработчика

  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,
    open: true
  },
  devtool: 'inline-source-map',

  module: {
    rules: [
      { //правило для обработки js файлов
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },

      { //правило для обработки картинок и шрифтов
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
          'postcss-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin()
  ]
}
