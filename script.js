function redirectToLogin(){
    window.location.href = "./login.html"
}
function scrollGallery(direction) {
    const gallery = document.getElementById('gallery');
    const scrollAmount = 220; // Distância que cada clique irá mover (largura da imagem + margem)

    gallery.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
};

const form = document.getElementById('reviewForm');
    const reviewsDiv = document.getElementById('reviews');
    const selectFilme = document.getElementById('escolha');

    function salvarAvaliacao(filme, descricao, nota) {
        const todasAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {};

        if (!todasAvaliacoes[filme]) {
            todasAvaliacoes[filme] = [];
        }

        todasAvaliacoes[filme].push({
            descricao: descricao,
            nota: nota
        });

        localStorage.setItem('avaliacoes', JSON.stringify(todasAvaliacoes));
    }

    function mostrarAvaliacoes(filme) {
        reviewsDiv.innerHTML = '';

        const todasAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {};
        const avaliacoes = todasAvaliacoes[filme] || [];

        const nomeFilme = selectFilme.options[selectFilme.selectedIndex].text;

        avaliacoes.forEach(avaliacao => {
            const review = document.createElement('div');
            review.className = 'review';
            review.innerHTML = `
                <h3 style="color: #D4AF37;">${nomeFilme}</h3>
                <p>${avaliacao.descricao}</p>
                <p class="stars">${'★'.repeat(avaliacao.nota)}${'☆'.repeat(5 - avaliacao.nota)}</p>
            `;
            reviewsDiv.appendChild(review);
        });
    }

    function atualizarImagem(filme) {
        const img = document.getElementById('posterFilme');
        if (imagensFilmes[filme]) {
            img.src = imagensFilmes[filme];
            img.style.display = 'block';
        } else {
            img.style.display = 'none';
            img.src = '';
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const filmeSelecionado = selectFilme.value;
        const descricao = document.getElementById('movieDescription').value;
        const nota = document.querySelector('input[name="rating"]:checked')?.value;

        if (!filmeSelecionado) {
            alert("Selecione um filme.");
            return;
        }

        if (!nota) {
            alert("Dê uma nota.");
            return;
        }

        salvarAvaliacao(filmeSelecionado, descricao, nota);
        form.reset();
        mostrarAvaliacoes(filmeSelecionado);
    });

    selectFilme.addEventListener('change', function() {
        const filmeSelecionado = this.value;
        mostrarAvaliacoes(filmeSelecionado);
        atualizarImagem(filmeSelecionado);
    });