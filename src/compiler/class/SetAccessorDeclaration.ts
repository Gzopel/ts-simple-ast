﻿import * as ts from "typescript";
import * as errors from "./../../errors";
import {Node} from "./../common";
import {PropertyNamedNode, StaticableNode} from "./../base";
import {FunctionLikeDeclaration} from "./../function";
import {AbstractableNode, ScopedNode} from "./base";
import {GetAccessorDeclaration} from "./GetAccessorDeclaration";
import {ClassDeclaration} from "./ClassDeclaration";

export const SetAccessorDeclarationBase = AbstractableNode(ScopedNode(StaticableNode(FunctionLikeDeclaration(PropertyNamedNode(Node)))));
export class SetAccessorDeclaration extends SetAccessorDeclarationBase<ts.SetAccessorDeclaration> {
    /**
     * Gets the corresponding get accessor if one exists.
     */
    getGetAccessor(): GetAccessorDeclaration | undefined {
        const parent = this.getRequiredParent() as ClassDeclaration;
        errors.throwIfNotSyntaxKind(parent, ts.SyntaxKind.ClassDeclaration, "Expected the parent to be a class declaration");

        const thisName = this.getName();
        for (let prop of parent.getInstanceProperties()) {
            if (prop.getName() === thisName && prop.getKind() === ts.SyntaxKind.GetAccessor)
                return prop as GetAccessorDeclaration;
        }

        return undefined;
    }
}