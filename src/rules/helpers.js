"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAndUpper = exports.toPascalCase = exports.toCamelCase = exports.replaceWithParams = exports.camelClassToKebabCase = exports.lowerCaseFirstLetter = void 0;
const lowerCaseFirstLetter = (input) => input.charAt(0).toLowerCase() + input.slice(1);
exports.lowerCaseFirstLetter = lowerCaseFirstLetter;
const camelClassToKebabCase = (input) => input.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
exports.camelClassToKebabCase = camelClassToKebabCase;
const replaceWithParams = (input, ...params) => {
    let output = input;
    params.forEach((param, index) => {
        output = output.replace(`{${index}}`, param);
    })
    return output;
}
exports.replaceWithParams = replaceWithParams;
const toCamelCase = (text) => {
    return text.replace(/-\w/g, exports.clearAndUpper);
}
exports.toCamelCase = toCamelCase;
const toPascalCase = (text) => {
    return text.replace(/(^\w|-\w)/g, exports.clearAndUpper);
}
exports.toPascalCase = toPascalCase;
const clearAndUpper = (text) => {
    return text.replace(/-/, '').toLowerCase();
}
exports.clearAndUpper = clearAndUpper;