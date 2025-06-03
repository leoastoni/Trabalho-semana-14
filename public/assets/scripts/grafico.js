fetch('http://localhost:3000/filmes')
  .then(res => res.json())
  .then(filmes => {
    const categorias = {};
    filmes.forEach(filme => {
      const cat = filme.categoria;
      categorias[cat] = (categorias[cat] || 0) + 1;
    });

    const labels = Object.keys(categorias);
    const data = Object.values(categorias);

    new Chart(document.getElementById('graficoCategorias'), {
      type: 'pie', // <-- tipo pizza
      data: {
        labels: labels,
        datasets: [{
          label: 'Quantidade de Filmes',
          data: data,
          backgroundColor: [
            '#c41d07', 
            '#198754', 
            '#0dcaf0', 
            '#ffc107', 
            '#6610f2', 
            '#fd7e14', 
            '#e83e8c', 
            '#007bff', 
            '#00bcd4'  
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Filmes por Categoria' }
        }
      }
    });
  });