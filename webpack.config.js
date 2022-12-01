const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = process.env.NODE_ENV || 'development'
const devMode = mode === 'development'
const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined
console.log(mode)

module.exports = {
    mode,
    target,
    devtool,

    entry: {
        index: path.resolve(__dirname, 'src','js','index.js'),
    },

    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true,
        hot: true,
    },

    plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'html', 'index.html'),
    }),
    new miniCssExtractPlugin({
        filename: '[name].css'
    })
    ],

    output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    },

    optimization: {
        splitChunks: {
          chunks: 'all',
        },
      },

    module: {
        rules: [

            {
                test: /\.html$/,
                loader: 'html-loader',
            },

            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    },
                },
            },
            
            {
            test: /\.s[ac]ss$/,
            use: [
                devMode ? 'style-loader' : miniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ['postcss-preset-env']
                        }
                    }
                },
                'group-css-media-queries-loader',
                'sass-loader',
            ],
            },

            {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            use: [
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                          progressive: true,
                        },
                        optipng: {
                          enabled: false,
                        },
                        pngquant: {
                          quality: [0.65, 0.90],
                          speed: 4
                        },
                        gifsicle: {
                          interlaced: false,
                        },
                        webp: {
                          quality: 75
                        }
                    }
                }
            ],
            type: 'asset/resource',
            generator: {
                filename: 'img/[name][ext]',
            },
            },

            {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name][ext]',
                },
            },
        ],
    },
};




















//--------------------------------------------------------------------------------------------------
//data loaders
// const toml = require('toml');
// const yaml = require('yamljs');
// const json5 = require('json5');
// {
//     test: /\.(csv|tsv)$/i,
//     use: ['csv-loader'],
//   },

//   {
//     test: /\.xml$/i,
//     use: ['xml-loader'],
//   },

//   {
//     test: /\.toml$/i,
//     type: 'json',
//     parser: {
//       parse: toml.parse,
//     },
//   },

//   {
//     test: /\.yaml$/i,
//     type: 'json',
//     parser: {
//       parse: yaml.parse,
//     },
//   },

//   {
//     test: /\.json5$/i,
//     type: 'json',
//     parser: {
//       parse: json5.parse,
//     },
//   },