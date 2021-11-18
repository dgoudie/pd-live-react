const rules = require('./webpack.rules');
const path = require('path');

rules.push({
    test: /\.s?[ac]ss$/i,
    use: [
        // Creates `style` nodes from JS strings
        'style-loader',
        // Translates CSS into CommonJS
        'css-loader',
        // Compiles Sass to CSS
        {
            loader: 'sass-loader',
            options: {
                sassOptions: {
                    includePaths: [path.resolve(__dirname, 'node_modules')],
                },
            },
        },
    ],
});

rules.push({
    test: /\.svg$/,
    type: 'asset/resource',
});

module.exports = {
    // Put your normal webpack config below here
    module: {
        rules,
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    devtool: 'source-map',
};
