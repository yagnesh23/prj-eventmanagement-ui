"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const Lint = require("tslint");
const tslint_1 = require("tslint");
const tslint = require("../../tslint.json");
class Rule extends Lint.Rules.AbstractRule {
    static metadata = {
        ruleName: 'run-rules-based-on-file-type',
        description: 'Runs rules based on the file type configured (some rules need not run for testing files! )',
        hasFix: false,
        options: {
            type: "array",
            items: { type: "any" },
        },
        optionExamples: [true],
        optionsDescription: 'Configure project based run that need to run based on the either its angular file or spec file.',
        rationale: Lint.Utils.dedent `TODO`,
        type: "functionality",
        typescriptOnly: true,
    };
    apply(sourceFile) {
        return this.applyWithFunction(sourceFile, walk, this.ruleArguments);
    }
}
exports.Rule = Rule;
function walk(ctx) {
    const linterArray = [];
    const [ruleArguments] = ctx.options;
    for (const key in ruleArguments) {
        if (Object.prototype.hasOwnProperty.call(ruleArguments, key)) {
            const rules = ruleArguments[key];
            tslint.rules = rules;
            tslint.rulesDirectory = __dirname;
            const configFile = tslint_1.Configuration.parseConfigFile(tslint);
            const re = new RegExp(key);
            linterArray.push({ pattern: key, regex: re, configFile });
        }
    }
    const filePath = ctx.sourceFile.fileName;
    const parts = filePath && filePath.split('/');
    const fileName = filePath && parts.pop();
    const linter = new tslint_1.Linter({ fix: false });
    const correctRuleByFile = linterArray.find(x => x.regex.test(fileName)) || null;
    if(correctRuleByFile){
        linter.lint("", ctx.sourceFile.getText(), correctRuleByFile.configFile);
        const failures = linter.getResult().failures;
        if(failures && failures.length){
            failures.forEach((failure) => {
                const startPosition = failure.getStartPosition().getPosition();
                const endPosition = failure.getEndPosition().getPosition();
                const message = `Actual Rule Failing: ${failure.getRuleName()} - ${failure.getFailure()}`;
                ctx.addFailure(startPosition, endPosition, message);
            })
        }
    }
}