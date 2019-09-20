const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require("path");
const I18nPlugin = require("i18n-webpack-plugin");
const languages = {
    en: require("./locales/en/translation.json"),
    ru: require("./locales/ru/translation.json")
};
require("babel-core/register");
require("babel-polyfill");
const webpack = require('webpack');
const extractSass = new ExtractTextPlugin({
    filename: '[name].[hash].css',
    disable: process.env.NODE_ENV === 'development',
});

module.exports = Object.keys(languages).map(function (language) {
    return {
        name: language,
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            path: path.join(__dirname, "dist"),
            filename: language + '[name].[hash].js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name]-[hash:8].[ext]',
                            },
                        },
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65,
                                },
                                optipng: {
                                    enabled: false,
                                },
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4,
                                },
                                gifsicle: {
                                    interlaced: false,
                                },
                                webp: {
                                    quality: 75,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {minimize: true},
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: extractSass.extract({
                        use: [
                            {
                                loader: 'css-loader',
                            },
                            {
                                loader: 'sass-loader',
                            },
                        ],
                        // use style-loader in development
                        fallback: 'style-loader',
                    }),
                },
                {
                    test: /\.css$/,
                    use: extractSass.extract({
                        fallback: 'style-loader',
                        use: 'css-loader',
                    }),
                },
            ],
        },
        devServer: {
            contentBase: './dist',
            compress: true,
            port: 9000,
            disableHostCheck: false,
            open: true,
            hot: true,
            historyApiFallback: true
        },
        externals: {
            config: JSON.stringify({
                apiUrl: 'http://localhost:9000',
                serverUrl: 'http://localhost:8080/'
            })
        },
        node: {
            fs: "empty"
        },
        plugins: [
            extractSass,
            new HtmlWebPackPlugin({
                template: './src/index.html',
                filename: './index.html',
            }),
            new CleanWebpackPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new I18nPlugin(languages[language])
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    },
                },
            },
        }
    };
});
