/* eslint-disable no-console */
import sayHiFromCommon from "./common";

const sayHiFromVisitor = () => "Hi from visitor";
console.log("I am a visitor part");

console.log(sayHiFromVisitor());
console.log(sayHiFromCommon());
