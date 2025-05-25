let filmes = [];

function carregarFilmes() {
  fetch("http://localhost:3000/filmes")
    .then(response => response.json())
    .then(dados => {
      console.log('Dados recebidos:', dados);

      // Ajuste aqui dependendo do formato do JSON recebido
      filmes = dados.filmes || dados;

      if (Array.isArray(filmes)) {
        mostrarFilmes(filmes);
      } else {
        console.error('Filmes não é um array:', filmes);
      }

      // Configurar filtro de categoria
      const selectCategoria = document.querySelector('#categoriaSelect');
      selectCategoria.addEventListener('change', () => {
        const categoriaSelecionada = selectCategoria.value.toLowerCase();

        if (categoriaSelecionada === 'todos') {
          mostrarFilmes(filmes);
        } else {
          const filmesFiltrados = filmes.filter(f => f.categoria.toLowerCase() === categoriaSelecionada);
          mostrarFilmes(filmesFiltrados);
        }
      });
    })
    .catch(erro => {
      console.error("Erro ao carregar filmes:", erro);
    });
}

function mostrarFilmes(listaFilmes) {
  const galeria = document.querySelector('.galeria-filmes');
  galeria.innerHTML = "";

  if (!listaFilmes || listaFilmes.length === 0) {
    galeria.innerHTML = "<p>Nenhum filme encontrado.</p>";
    return;
  }

  listaFilmes.forEach(item => {
    const filmeCard = document.createElement('button');
    filmeCard.classList.add('filmes');

    const img = document.createElement('img');
    img.src = item.imagem;
    img.alt = item.titulo;
    img.width = 300;
    img.height = 450;

    filmeCard.appendChild(img);
    filmeCard.addEventListener('click', () => {
      window.location.href = `detalhes.html?id=${item.id}`;
    });

    galeria.appendChild(filmeCard);
  });
}

window.onload = () => {
  carregarFilmes();
};



