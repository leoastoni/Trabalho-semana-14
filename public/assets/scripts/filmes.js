const API_URL = 'http://localhost:3000/filmes'; // JSON Server URL

const form = document.getElementById('filme-form');
const filmesTbody = document.getElementById('filmes-tbody');
const cancelEditBtn = document.getElementById('cancel-edit');

let editId = null;

// Função para listar todos os filmes
async function listarFilmes() {
  try {
    const res = await fetch(API_URL);
    const filmes = await res.json();

    filmesTbody.innerHTML = '';

    filmes.forEach(filme => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${filme.id}</td>
        <td>${filme.titulo}</td>
        <td>${filme.categoria}</td>
        <td>${filme.diretor}</td>
        <td>${filme.ano}</td>
        <td>
          <button onclick="editarFilme(${filme.id})">Editar</button>
          <button onclick="excluirFilme(${filme.id})">Excluir</button>
        </td>
      `;
      filmesTbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Erro ao listar filmes:', error);
  }
}

// Função para salvar filme (criar ou editar)
async function salvarFilme(filme) {
  try {
    if (editId) {
      // Editar
      await fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filme),
      });
      editId = null;
      cancelEditBtn.style.display = 'none';
    } else {
      // Criar
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filme),
      });
    }
    listarFilmes();
    form.reset();
  } catch (error) {
    console.error('Erro ao salvar filme:', error);
  }
}

// Função para carregar filme no formulário para edição
async function editarFilme(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const filme = await res.json();

    editId = id;
    cancelEditBtn.style.display = 'inline';

    document.getElementById('filme-id').value = filme.id;
    document.getElementById('titulo').value = filme.titulo;
    document.getElementById('descricao').value = filme.descricao;
    document.getElementById('categoria').value = filme.categoria;
    document.getElementById('diretor').value = filme.diretor;
    document.getElementById('ano').value = filme.ano;
    document.getElementById('imagem').value = filme.imagem;
    document.getElementById('conteudo').value = filme.conteudo;
  } catch (error) {
    console.error('Erro ao carregar filme:', error);
  }
}

// Função para excluir filme
async function excluirFilme(id) {
  if (confirm('Tem certeza que deseja excluir este filme?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      listarFilmes();
    } catch (error) {
      console.error('Erro ao excluir filme:', error);
    }
  }
}

// Cancelar edição
cancelEditBtn.addEventListener('click', () => {
  editId = null;
  cancelEditBtn.style.display = 'none';
  form.reset();
});

// Evento submit do formulário
form.addEventListener('submit', e => {
  e.preventDefault();

  const filme = {
    titulo: document.getElementById('titulo').value.trim(),
    descricao: document.getElementById('descricao').value.trim(),
    categoria: document.getElementById('categoria').value.trim(),
    diretor: document.getElementById('diretor').value.trim(),
    ano: Number(document.getElementById('ano').value),
    imagem: document.getElementById('imagem').value.trim(),
    conteudo: document.getElementById('conteudo').value.trim(),
  };

  salvarFilme(filme);
});

// Inicializa lista
listarFilmes();

// Deixe as funções editarFilme e excluirFilme globais para serem chamadas pelos botões inline:
window.editarFilme = editarFilme;
window.excluirFilme = excluirFilme;