// подключаем path к конфигу вебпак, что бы webpack мог найти файлы
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// module.exports — это синтаксис экспорта в Node.js
module.exports = {
    entry: { main: './src/scripts/index.js' }, // Точка входа
    output: { // указали, в какой файл будет собираться весь js, и дали ему имя
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development', // добавили режим разработчика
    devServer: {
        static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true // сайт будет открываться сам при запуске npm run dev
    },
    module: {
        rules: [ // rules — это массив правил
            // добавим в него объект правил для бабеля
            {
                // регулярное выражение, которое ищет все js файлы
                test: /\.js$/,
                // при обработке этих файлов нужно использовать babel-loader
                use: 'babel-loader',
                // исключает папку node_modules, файлы в ней обрабатывать не нужно
                exclude: '/node_modules/'
            },
            {
                // регулярное выражение, которое ищет все изображения и помещает их в определенную папку
                test: /\.(png|svg|jpg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename:'images/[name].[hash][ext]'
                }
            },
            {
                // регулярное выражение, которое ищет все шрифты и помещает их в определенную папку
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename:'fonts/[name].[hash][ext]'
                }
            },
            {
                // применять это правило только к CSS-файлам
                test: /\.css$/,
                // при обработке этих файлов нужно использовать
                // MiniCssExtractPlugin.loader и css-loader
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },
                'postcss-loader']
            }
        ]
    },
    // добавьте массив плагинов
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(), // плагин удаляющий папку сборки перед сборкой
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ]
}
