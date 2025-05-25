// Elementos
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showLoginBtn = document.getElementById('show-login');
const showRegisterBtn = document.getElementById('show-register');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

// Alternar entre formulários
showLoginBtn.addEventListener('click', () => {
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
  showLoginBtn.classList.add('active');
  showRegisterBtn.classList.remove('active');
  clearErrors();
});

showRegisterBtn.addEventListener('click', () => {
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
  showRegisterBtn.classList.add('active');
  showLoginBtn.classList.remove('active');
  clearErrors();
});

function clearErrors() {
  loginError.textContent = '';
  registerError.textContent = '';
}

// Salvar usuário no localStorage
function saveUser(user) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

// Buscar usuários no localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Login
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  clearErrors();

  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    alert('Login realizado com sucesso!');
    // Redirecionar para outra página se quiser:
    // window.location.href = 'index.html';
  } else {
    loginError.textContent = 'Usuário ou senha incorretos.';
  }
});

// Cadastro
registerForm.addEventListener('submit', function(e) {
  e.preventDefault();
  clearErrors();

  const username = document.getElementById('register-username').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const password2 = document.getElementById('register-password2').value;

  if (password !== password2) {
    registerError.textContent = 'As senhas não conferem.';
    return;
  }

  const users = getUsers();

  if (users.find(u => u.username === username)) {
    registerError.textContent = 'Usuário já existe.';
    return;
  }

  if (users.find(u => u.email === email)) {
    registerError.textContent = 'Email já cadastrado.';
    return;
  }

  saveUser({ username, email, password });
  alert('Cadastro realizado com sucesso! Agora faça login.');

  registerForm.reset();
  showLoginBtn.click();
});