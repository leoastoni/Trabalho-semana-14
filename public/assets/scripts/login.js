const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showLoginBtn = document.getElementById('show-login');
const showRegisterBtn = document.getElementById('show-register');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

const urlParams = new URLSearchParams(window.location.search);
const tab = urlParams.get('tab');
if (tab === 'cadastro') {
  showRegisterBtn.click();
} else {
  showLoginBtn.click();
}



const API_URL = "http://localhost:3000/usuarios";

// Alternar formulários
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

// LOGIN
loginForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  clearErrors();

  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    const res = await fetch(`${API_URL}?login=${username}&senha=${password}`);
    const users = await res.json();

    if (users.length > 0) {
      alert('Login realizado com sucesso!');
      localStorage.setItem('usuarioLogado', JSON.stringify(users[0]));
      window.location.href = 'index.html';
    } else {
      loginError.textContent = 'Usuário ou senha incorretos.';
    }
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    loginError.textContent = 'Erro na requisição.';
  }
});

// CADASTRO
registerForm.addEventListener('submit', async function(e) {
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

  try {
    const res = await fetch(`${API_URL}`);
    const users = await res.json();

    if (users.find(u => u.login === username)) {
      registerError.textContent = 'Usuário já existe.';
      return;
    }

    if (users.find(u => u.email === email)) {
      registerError.textContent = 'Email já cadastrado.';
      return;
    }

    // POST para cadastrar novo usuário
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: username,
        nome: username,
        email: email,
        senha: password
      })
    });

    alert('Cadastro realizado com sucesso! Agora faça login.');
    registerForm.reset();
    showLoginBtn.click();
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    registerError.textContent = 'Erro ao tentar cadastrar.';
  }
});

