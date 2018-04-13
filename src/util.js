/// @ts-check

import * as Babel from "babel-standalone";
import BabelTemplate from "babel-template";
import * as BabelPlugins from "fable-utils/babel-plugins";



function babelOptions(extraPlugin) {
    var commonPlugins = [
        BabelPlugins.getTransformMacroExpressions(BabelTemplate),
        BabelPlugins.getRemoveUnneededNulls(),
    ];

    return {
        plugins: extraPlugin != null ?
            commonPlugins.concat(extraPlugin) : commonPlugins,
        filename: 'repl',
        babelrc: false,
    };
}

export function runAst(jsonAst) {
    try {
        var ast = JSON.parse(jsonAst);

        var optionsES2015 = babelOptions("transform-es2015-modules-commonjs");
        var optionsAMD = babelOptions("transform-es2015-modules-amd");

        var codeES2015 = Babel.transformFromAst(ast, null, optionsES2015).code;

        return codeES2015;
    } catch (err) {
        console.error(err.message + "\n" + err.stack);
    }
}