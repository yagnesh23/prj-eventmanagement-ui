"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const Lint = require("tslint");
const tsutils_1 = require("tsutils");
const OPTION_EXCLUDE_INTERFACE_EXPRESSION = 'exclude-interface-expressions';
class Rule extends Lint.Rules.AbstractRule {
    static metadata = {
        ruleName: 'max-interface-per-file',
        description: `${Lint.Utils.dedent}
         A file may not contain more than the specific number of interfaces`,
        hasFix: false,
        options: {
            type: 'array',
            items: [
                {
                    type: 'number',
                    minimum: 1
                },
                {
                    type: 'string',
                    enum: [OPTION_EXCLUDE_INTERFACE_EXPRESSION]
                }
            ],
            additionalItems: false,
            minLength: 1,
            maxLength: 2,
        },
        optionExamples: [
            [true, 1],
            [true, 5, OPTION_EXCLUDE_INTERFACE_EXPRESSION]
        ],
        rationale: `${Lint.Utils.dedent} 
        Ensures that file have a single responsibility so that interfaces each exists in their own files`,
        optionsDescription: `${Lint.Utils.dedent} 
        The one required argument is an integer indicating the maximum number of interfaces that can be appear in a
        file. An optional argument \`"exclude-interface-expressions"\` can be provided to exclude the interface expressions
        from the overall interface count.`,
        type: "maintainability",
        typescriptOnly: true,
    };
    static FAILURE_STRING(maxCount) {
        return `A maximum allowed number of ${maxCount} interfaces per file is allowed`;
    } 
    apply(sourceFile) {
        const argument = this.ruleArguments[0];
        const maxInterfaces = isNaN(argument) || argument > 0 ? argument : 1;
        return this.applyWithFunction(sourceFile, walk, {
            excludeInterfaceExpressions: this.ruleArguments.indexOf(OPTION_EXCLUDE_INTERFACE_EXPRESSION) !== -1,
            maxInterfaces: maxInterfaces
        });
    }
}
exports.Rule = Rule;
function walk(ctx) {
    const { sourceFile, options: { maxInterfaces, excludeInterfaceExpressions }, } = ctx;
    let interfaces = 0;
    return sourceFile.forEachChild(function cb(node) {
        if (tsutils_1.isInterfaceDeclaration(node) || tsutils_1.isClassDeclaration(node)) {
            interfaces++;
            if (interfaces > maxInterfaces) {
                ctx.addFailureAtNode(node, Rule.FAILURE_STRING(maxInterfaces));
            }
        }
        return node.forEachChild(cb);
    })
}