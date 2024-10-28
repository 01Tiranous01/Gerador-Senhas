"use strict";

var sliderElement = document.querySelector("#slider");
var buttonElement = document.querySelector("#button");
var sizePassword = document.querySelector("#valor");
var password = document.querySelector("#password");
var containerPassword = document.querySelector("#container-password");
var historyList = document.querySelector("#history-list");
var passwordHistory = document.querySelector("#password-history");
var strengthIndicator = document.querySelector("#password-strength");
var charsetMinus = "abcdefghijklmnopqrstuvwxyz";
var charsetMaius = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var charsetNum = "1234567890";
var charsetSymbol = "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var novasenha = "";
sizePassword.innerHTML = sliderElement.value;

sliderElement.oninput = function () {
  sizePassword.innerHTML = this.value;
};

function calculateStrength(password) {
  var strength = 0; // Verificação de comprimento da senha

  if (password.length >= 10) strength++;
  if (password.length >= 15) strength++;
  if (password.length >= 24) strength++; // Incremento extra para senhas muito longas
  // Verificação de tipos de caracteres

  if (/[A-Z]/.test(password)) strength++; // Letras maiúsculas

  if (/[0-9]/.test(password)) strength++; // Números

  if (/[^A-Za-z0-9]/.test(password)) strength++; // Caracteres especiais
  // Classificação da força da senha

  switch (strength) {
    case 0:
    case 1:
      return {
        color: "very-weak",
        label: "Muito Fraca"
      };

    case 2:
      return {
        color: "weak",
        label: "Fraca"
      };

    case 3:
      return {
        color: "medium",
        label: "Média"
      };

    case 4:
      return {
        color: "strong",
        label: "Forte"
      };

    case 5:
    case 6:
      return {
        color: "very-strong",
        label: "Muito Forte"
      };

    default:
      return {
        color: "very-strong",
        label: "Muito Forte"
      };
  }
}

function gerarsenha() {
  var pass = "";
  var charset = charsetMinus;
  if (document.querySelector("#uppercase").checked) charset += charsetMaius;
  if (document.querySelector("#numbers").checked) charset += charsetNum;
  if (document.querySelector("#symbols").checked) charset += charsetSymbol;

  for (var i = 0, n = charset.length; i < sliderElement.value; ++i) {
    pass += charset.charAt(Math.floor(Math.random() * n));
  }

  containerPassword.classList.remove("hide");
  password.innerHTML = pass;
  novasenha = pass;
  var strength = calculateStrength(pass);
  strengthIndicator.textContent = "For\xE7a da Senha: ".concat(strength.label);
  strengthIndicator.className = "strength-indicator ".concat(strength.color);
  addPasswordToHistory(pass, strength);
}

function addPasswordToHistory(pass, strength) {
  var listItem = document.createElement("li");
  listItem.textContent = "".concat(pass, " - ").concat(strength.label);
  listItem.className = strength.color;
  historyList.appendChild(listItem);
  passwordHistory.classList.remove("hide");
  passwordHistory.scrollTop = passwordHistory.scrollHeight;
}

function copyPassword() {
  alert("Senha copiada com sucesso");
  navigator.clipboard.writeText(novasenha);
}
//# sourceMappingURL=script.dev.js.map
