"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const Lint = require("tslint");
const tsutils_1 = require("tsutils");
const helpers_1 = require("./helpers");
class Rule extends Lint.Rules.AbstractRule {
    static metadata = {
        ruleName: 'enforce-model-file-name-matches-model',
        description: 'Enforce file name matches model name declared in it',
        hasFix: false,
        options: null,
        optionExamples: [true],
        optionsDescription: 'Not Configurable',
        rationale: `${Lint.Utils.dedent}
        Example - Doing it right
        \`\`\`ts
        // does not throw error when model name matches the file name
        // file name: commodity-maintain-pannel.model.ts
        // --model inside file: export interface CommodityMaintainPannel {}
        // file name: commodity-maintain-pannel.model.ts
        // --model inside file: export interface CommodityMaintain {}
        \`\`\`
        Example - Anti Pattern
        \`\`\`ts
        // throws error when model name matches the file name
        // file name: commodity-maintain-pannel.model.ts
        // --model inside file: export interface CommodityMaintain {}
        // file name: commodity-maintain-pannel.model.ts
        // --model inside file: export interface CommodityMaintainNew {}
        \`\`\`
        `,
        type: "functionality",
        typescriptOnly: true,
    };
    static FAILURE_STRING = `As per standard, file name and model name should match, please rename file to {0} or change interface/class name as per {1}`;
    apply(sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    }
}
exports.Rule = Rule;
function walk(ctx) {
    const fileName = ctx.sourceFile.fileName;
    const parts = fileName && fileName.split('/');
    const modelFileName = parts && parts.pop();
    if (/.*\.model\.ts/.test(fileName)) {
        const callback = (node) => {
            if (tsutils_1.isInterfaceDeclaration(node) || tsutils_1.isClassDeclaration(node)) {
                const modelNode = node.getChildren() && node.getChildren().filter(tsutils_1.isIdentifier).shift();
                const expectedFileName = `${helpers_1.camelClassToKebabCase(helpers_1.lowerCaseFirstLetter(modelNode && modelNode.getText()))}.model.ts`;
                const expectedModalName = helpers_1.toPascalCase(modelFileName.replace('.model', '').replace('.ts', ''));
                if (modelFileName !== expectedFileName) {
                    ctx.addFailureAtNode(node, helpers_1.replaceWithParams(Rule.FAILURE_STRING, expectedFileName, expectedModalName));
                }
                node.forEachChild(callback);
            }
        };
        ctx.sourceFile.forEachChild(callback);
    }
}