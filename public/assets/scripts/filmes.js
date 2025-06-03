const API_URL = 'http://localhost:3000/filmes';
const form = document.getElementById('filme-form');
const filmesTbody = document.getElementById('filmes-tbody');

// Função para buscar e exibir os filmes
function carregarFilmes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(filmes => {
      filmesTbody.innerHTML = '';
      filmes.forEach(filme => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${filme.titulo}</td>
          <td>${filme.categoria}</td>
          <td>${filme.diretor}</td>
          <td>${filme.ano}</td>
          <td>
            <img src="${filme.imagem}" alt="${filme.titulo}" class="filme-imagem">
          </td>
          <td>${filme.descricao}</td>
          <td>${filme.conteudo}</td>
        `;
        filmesTbody.appendChild(tr);
      });
    });
}

window.onload = carregarFilmes;

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const novoFilme = {
    titulo: form.titulo.value,
    descricao: form.descricao.value,
    categoria: form.categoria.value,
    diretor: form.diretor.value,
    ano: form.ano.value,
    imagem: form.imagem.value,
    conteudo: form.conteudo.value
  };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novoFilme)
  });
  form.reset();
  carregarFilmes();
});

function carregarFilmes() {
  fetch(API_URL)
    .then(res => res.json())
    .then(filmes => {
      filmesTbody.innerHTML = '';
      filmes.forEach(filme => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${filme.titulo}</td>
          <td>${filme.categoria}</td>
          <td>${filme.diretor}</td>
          <td>${filme.ano}</td>
          <td>
            <img src="${filme.imagem}" alt="${filme.titulo}" class="filme-imagem">
          </td>
          <td>${filme.descricao}</td>
          <td>${filme.conteudo}</td>
          <td>
            <button class="btn-editar" data-id="${filme.id}">Editar</button>
            <button class="btn-excluir" data-id="${filme.id}">Excluir</button>
          </td>
        `;
        filmesTbody.appendChild(tr);
      });

      // Adiciona eventos aos botões de excluir
      document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.onclick = async function() {
          const id = this.getAttribute('data-id');
          if (confirm('Tem certeza que deseja excluir este filme?')) {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            carregarFilmes();
          }
        };
      });

      // Adiciona eventos aos botões de editar
      document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.onclick = async function() {
          const id = this.getAttribute('data-id');
          const res = await fetch(`${API_URL}/${id}`);
          const filme = await res.json();
          // Preenche o formulário com os dados do filme
          form.titulo.value = filme.titulo;
          form.descricao.value = filme.descricao;
          form.categoria.value = filme.categoria;
          form.diretor.value = filme.diretor;
          form.ano.value = filme.ano;
          form.imagem.value = filme.imagem;
          form.conteudo.value = filme.conteudo;
          form.setAttribute('data-edit-id', id);
        };
      });
    });
}

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const novoFilme = {
    titulo: form.titulo.value,
    descricao: form.descricao.value,
    categoria: form.categoria.value,
    diretor: form.diretor.value,
    ano: form.ano.value,
    imagem: form.imagem.value,
    conteudo: form.conteudo.value
  };
  const editId = form.getAttribute('data-edit-id');
  if (editId) {
    await fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoFilme)
    });
    form.removeAttribute('data-edit-id');
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoFilme)
    });
  }
  form.reset();
  carregarFilmes();
});