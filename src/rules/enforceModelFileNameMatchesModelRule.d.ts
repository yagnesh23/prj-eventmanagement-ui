import * as Lint from "tslint";
import * as ts from "typescript";

export declare class Rule extends Lint.Rules.AbstractRule {
    static metedata: Lint.IRuleMetadata;
    static FAILURE_STRING: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
