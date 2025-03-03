import * as Lint from "tslint";
import * as ts from "typescript";

export declare class Rule extends Lint.Rules.AbstractRule {
    static metedata: Lint.IRuleMetadata;
    apply(sourceFile: ts.SourceFile): Array<Lint.RuleFailure>;
}
