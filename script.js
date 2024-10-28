let sliderElement = document.querySelector("#slider");
let buttonElement = document.querySelector("#button");
let sizePassword = document.querySelector("#valor");
let password = document.querySelector("#password");
let containerPassword = document.querySelector("#container-password");
let historyList = document.querySelector("#history-list");
let passwordHistory = document.querySelector("#password-history");
let strengthIndicator = document.querySelector("#password-strength");

let charsetMinus = "abcdefghijklmnopqrstuvwxyz";
let charsetMaius = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let charsetNum = "1234567890";
let charsetSymbol = "!#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
let novasenha = "";

sizePassword.innerHTML = sliderElement.value;
sliderElement.oninput = function() {
  sizePassword.innerHTML = this.value;
}

function calculateStrength(password) {
  let strength = 0;

  // Verificação de comprimento da senha
  if (password.length >= 10) strength++;
  if (password.length >= 15) strength++;
  if (password.length >= 24) strength++;  // Incremento extra para senhas muito longas

  // Verificação de tipos de caracteres
  if (/[A-Z]/.test(password)) strength++;           // Letras maiúsculas
  if (/[0-9]/.test(password)) strength++;           // Números
  if (/[^A-Za-z0-9]/.test(password)) strength++;    // Caracteres especiais

  // Classificação da força da senha
  switch (strength) {
    case 0:
    case 1:
      return { color: "very-weak", label: "Muito Fraca" };
    case 2:
      return { color: "weak", label: "Fraca" };
    case 3:
      return { color: "medium", label: "Média" };
    case 4:
      return { color: "strong", label: "Forte" };
    case 5:
    case 6:
      return { color: "very-strong", label: "Muito Forte" };
    default:
      return { color: "very-strong", label: "Muito Forte" };
  }
}



function gerarsenha() {
  let pass = "";
  let charset = charsetMinus;

  if (document.querySelector("#uppercase").checked) charset += charsetMaius;
  if (document.querySelector("#numbers").checked) charset += charsetNum;
  if (document.querySelector("#symbols").checked) charset += charsetSymbol;

  for (let i = 0, n = charset.length; i < sliderElement.value; ++i) {
    pass += charset.charAt(Math.floor(Math.random() * n));
  }

  containerPassword.classList.remove("hide");
  password.innerHTML = pass;
  novasenha = pass;

  let strength = calculateStrength(pass);
  strengthIndicator.textContent = `Força da Senha: ${strength.label}`;
  strengthIndicator.className = `strength-indicator ${strength.color}`;
  addPasswordToHistory(pass, strength);
}

function addPasswordToHistory(pass, strength) {
  const listItem = document.createElement("li");
  listItem.textContent = `${pass} - ${strength.label}`;
  listItem.className = strength.color;
  historyList.appendChild(listItem);
  passwordHistory.classList.remove("hide");
  passwordHistory.scrollTop = passwordHistory.scrollHeight;
}

function copyPassword() {
  alert("Senha copiada com sucesso");
  navigator.clipboard.writeText(novasenha);
}
