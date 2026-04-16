"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CpfValidator = void 0;
class CpfValidator {
    static isValid(cpf) {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove pontos e traços
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
            return false;
        const cpfDigits = cpf.split('').map(el => +el);
        const rest = (count) => {
            return (((cpfDigits.slice(0, count - 12).reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11) % 10);
        };
        return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
    }
}
exports.CpfValidator = CpfValidator;
