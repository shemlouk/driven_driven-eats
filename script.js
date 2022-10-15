const produtos = document.querySelectorAll("[data-section]");
const botaoFecharPedido = document.querySelector(
  '[data-button="fechar-pedido"]'
);

let produtosSelecionados = [];

botaoFecharPedido.addEventListener("click", (e) => {
  // something something
});

produtos.forEach((produto) => {
  produto.addEventListener("click", (e) => {
    const produtoSelecionado = e.currentTarget;

    atualizarProdutosSelecionados(produtoSelecionado);
    atualizarBotaoFecharPedido();
  });
});

// ========================================================

const atualizarBotaoFecharPedido = () => {
  if (produtosSelecionados.length === 3) {
    botaoFecharPedido.disabled = false;
    botaoFecharPedido.classList.add("enabled");
    botaoFecharPedido.innerHTML = "Fechar pedido";
  } else {
    botaoFecharPedido.disabled = true;
    botaoFecharPedido.classList.remove("enabled");
    botaoFecharPedido.innerHTML = "Selecione os 3 itens para fechar o pedido";
  }
};

// ========================================================

const atualizarProdutosSelecionados = (selecao) => {
  const atributoSelecao = selecao.getAttribute("data-section");

  const match = produtosSelecionados.find((produto) => {
    return produto.getAttribute("data-section") === atributoSelecao;
  });

  if (match === undefined) {
    adicionarProduto(selecao);
  } else if (match === selecao) {
    removerProduto(match);
  } else {
    removerProduto(match);
    adicionarProduto(selecao);
  }
};

// ========================================================

const adicionarProduto = (item) => {
  produtosSelecionados.push(item);
  mudarEstilizacao(item);
};

const removerProduto = (item) => {
  const index = produtosSelecionados.indexOf(item);
  produtosSelecionados.splice(index, 1);
  mudarEstilizacao(item);
};

const mudarEstilizacao = (item) => {
  item.querySelector("img").classList.toggle("hided");
  item.classList.toggle("selected");
};
