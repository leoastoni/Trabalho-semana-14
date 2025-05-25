window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  fetch(`http://localhost:3000/filmes/${id}`)
    .then(response => response.json())
    .then(filme => {
      document.querySelector('.titulo-item').textContent = filme.titulo;
      document.querySelector('.imagem-item').src = filme.imagem;
      document.querySelector('.imagem-item').alt = filme.titulo;
      document.querySelector('.categoria-item').textContent = filme.categoria;
      document.querySelector('.diretor-item').textContent = filme.diretor;
      document.querySelector('.ano-item').textContent = filme.ano;
      document.querySelector('.descricao-item').textContent = filme.descricao || ''; 
      document.querySelector('.conteudo-item').textContent = filme.conteudo || '';
    })
    .catch(erro => console.error('Erro ao carregar detalhes:', erro));
};