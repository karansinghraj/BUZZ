"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fullname = void 0;
function fullname(firstname, lastname) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!firstname && !lastname) {
            return null;
        }
        if (!firstname || !lastname) {
            if (!lastname) {
                return firstname;
            }
            if (!firstname) {
                return lastname;
            }
        }
        return firstname + " " + lastname;
    });
}
exports.fullname = fullname;
const getname = (firstname, lastname) => {
    return firstname && lastname
        ? firstname + " " + lastname
        : firstname
            ? firstname
            : lastname;
};
