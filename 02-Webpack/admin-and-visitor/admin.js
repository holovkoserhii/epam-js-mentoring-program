/* eslint-disable no-console */
import sayHiFromCommon from "./common";

const sayHiFromAdmin = () => "Hi from admin";
console.log("I am an admin part");

console.log(sayHiFromAdmin());
console.log(sayHiFromCommon());
