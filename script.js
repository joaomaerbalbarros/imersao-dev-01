let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("#campo-busca");
let botaoBusca = document.querySelector("#botao-busca");
let dados = []; // Começa vazio

// 1. Carrega os dados na memória, mas NÃO exibe nada ainda
async function carregarDados() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        iniciarBusca(); // Exibe todos os cards ao carregar a página
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
        cardContainer.innerHTML = "<p>Erro ao carregar os dados. Tente recarregar a página.</p>";
    }
}

// 2. Função acionada APENAS pelo botão (ou enter)
function iniciarBusca() {
    let termo = campoBusca.value.toLowerCase().trim(); // remove espaços extras
    let resultados;

    // Se o campo estiver vazio, não faz nada ou limpa a tela
    if (termo === "") {
        // Se a busca for vazia, os resultados são todos os dados
        resultados = [...dados]; // Usamos spread para criar uma cópia
    } else {
        // A. Filtragem: Busca no Nome, Descrição E Ano
        resultados = dados.filter(dado => {
            const ano = dado.ano || dado.data_criacao || ''; // Pega 'ano' ou 'data_criacao'

            return dado.nome.toLowerCase().includes(termo) ||
                dado.descricao.toLowerCase().includes(termo) ||
                ano.toString().includes(termo); // Converte ano para texto
        });
    }

    // B. Hierarquia de Relevância (Ordenação)
    resultados.sort((a, b) => {
        let nomeA = a.nome.toLowerCase();
        let nomeB = b.nome.toLowerCase();

        // 1º Prioridade: Nome IGUAL ao termo (Ex: "Java" ganha de "JavaScript")
        if (nomeA === termo) return -1;
        if (nomeB === termo) return 1;

        // 2º Prioridade: Nome COMEÇA com o termo
        if (nomeA.startsWith(termo) && !nomeB.startsWith(termo)) return -1;
        if (nomeB.startsWith(termo) && !nomeA.startsWith(termo)) return 1;

        return 0; // Mantém a ordem original se for empate
    });

    renderizarCards(resultados);
}

function renderizarCards(lista) {
    cardContainer.innerHTML = ""; // Limpa resultados anteriores

    if (lista.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    for (let dado of lista) {
        let article = document.createElement("article");
        article.classList.add("card");
        const ano = dado.ano || dado.data_criacao; // Pega 'ano' ou 'data_criacao' para exibir
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p class="ano">Ano: ${ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

// --- EVENTOS ---

// Carrega o JSON assim que abre (mas fica invisível)
carregarDados();

// O botão agora tem função real
botaoBusca.addEventListener("click", iniciarBusca);

// (Opcional) Permitir apertar "Enter" no teclado para buscar
campoBusca.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        iniciarBusca();
    }
});