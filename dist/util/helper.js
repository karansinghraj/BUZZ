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
function generateRandomUsername(firstname, lastname) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomUsername = "";
    // Generate a random username of 5 characters
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomUsername += characters.charAt(randomIndex);
    }
    // Combine with firstname and lastname
    const result = `${firstname}${lastname}${randomUsername}`;
    return result;
}
// Example usage:
const firstname = "John";
const lastname = "Doe";
const username = generateRandomUsername(firstname, lastname);
console.log("Generated Username:", username);
