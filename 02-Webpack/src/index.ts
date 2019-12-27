import "./styles.scss";
import "./other.js";
import "./images/smiling-boxer-dog-14.jpg";

const time: string = new Date().toLocaleString();
document.querySelector(".time").textContent = `Present time is ${time}`;
document.querySelector(".name").textContent = "Serhii";
