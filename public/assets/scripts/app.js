let filmes = [];

function carregarFilmes() {
  fetch("http://localhost:3000/filmes")
    .then(response => response.json())
    .then(dados => {
      filmes = dados.filmes || dados;
      if (Array.isArray(filmes)) {
        mostrarFilmes(filmes);
      } else {
        console.error('Filmes não é um array:', filmes);
      }
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

function filtrarFilmesPorPesquisa(texto) {
  const banner = document.getElementById('banner-principal');
  const termo = texto.trim().toLowerCase();
  if (!termo) {
    if (banner) banner.style.display = '';
    mostrarFilmes(filmes);
    return;
  }
  if (banner) banner.style.display = 'none';
  const filtrados = filmes.filter(filme =>
    (filme.titulo && filme.titulo.toLowerCase().includes(termo)) ||
    (filme.descricao && filme.descricao.toLowerCase().includes(termo)) ||
    (filme.categoria && filme.categoria.toLowerCase().includes(termo)) ||
    (filme.diretor && filme.diretor.toLowerCase().includes(termo))
  );
  mostrarFilmes(filtrados);
}

const bannersPrincipais = [
  {
    imagem: "img/banner1.jpg",
    titulo: "De Volta Para o Futuro"
  },
  {
    imagem: "img/filme1.jpg",
    titulo: "Django Livre"
  },
  {
    imagem: "img/filme5.webp",
    titulo: "Liga da Justiça"
  },
  {
    imagem: "img/filme6.jpg",
    titulo: "Star Wars"
  }
  // Adicione mais banners se quiser
];

function iniciarBannerRotativo() {
  const bannerImg = document.getElementById('banner-img');
  const bannerTitulo = document.getElementById('banner-titulo');
  let idx = 0;

  function trocarBanner() {
    const banner = bannersPrincipais[idx];
    if (bannerImg) bannerImg.src = banner.imagem;
    if (bannerTitulo) bannerTitulo.textContent = banner.titulo;
    idx = (idx + 1) % bannersPrincipais.length;
  }

  trocarBanner(); // Mostra o primeiro ao carregar
  setInterval(trocarBanner, 3500); // Troca a cada 3,5 segundos
}

window.onload = () => {
  carregarFilmes();

  // Exibir nome do usuário logado
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  if (usuarioLogado) {
    const usuario = JSON.parse(usuarioLogado);
    const usuarioDiv = document.getElementById('usuario-logado');
    if (usuarioDiv) {
      usuarioDiv.textContent = `Bem-vindo, ${usuario.nome || usuario.login}!`;
    }
  }

  // Pesquisa funcional
  const barraPesquisa = document.querySelector('.texto-pesquisa');
  if (barraPesquisa) {
    barraPesquisa.addEventListener('input', function () {
      filtrarFilmesPorPesquisa(this.value);
    });
  }

  // Filtro de categoria
  const selectCategoria = document.querySelector('#categoriaSelect');
  if (selectCategoria) {
    selectCategoria.addEventListener('change', () => {
      const categoriaSelecionada = selectCategoria.value.toLowerCase();
      const banner = document.getElementById('banner-principal');
      if (categoriaSelecionada === 'todos') {
        if (banner) banner.style.display = '';
        mostrarFilmes(filmes);
      } else {
        if (banner) banner.style.display = 'none';
        const filmesFiltrados = filmes.filter(f => f.categoria && f.categoria.toLowerCase() === categoriaSelecionada);
        mostrarFilmes(filmesFiltrados);
      }
    });
  }

  // Botões de login/cadastro
  const btnLogin = document.getElementById('btn-login');
  if (btnLogin) {
    btnLogin.onclick = function() {
      window.location.href = 'login.html?tab=login';
    };
  }
  const btnCadastro = document.getElementById('btn-cadastro');
  if (btnCadastro) {
    btnCadastro.onclick = function() {
      window.location.href = 'login.html?tab=cadastro';
    };
  }

  // Banner rotativo
  iniciarBannerRotativo();
};