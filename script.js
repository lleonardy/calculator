const btnNumbers = document.querySelectorAll("[data-number]");
const btnOperators = document.querySelectorAll("[data-operator]");
const btnEquals = document.querySelector("[data-action='equals']");
const btnDelete = document.querySelector("[data-action='delete']");
const btnClear = document.querySelector("[data-action='clear']");

let currentNumber = "";
let previousNumber = "";
let operator = null;