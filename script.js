const produtos = [...document.querySelectorAll("[data-section]")];
const botoes = [...document.querySelectorAll("[data-button]")];
const entries = [...document.querySelectorAll("[data-entrySection]")];

let produtosSelecionados = [];
let mensagem;

// ========================================================

produtos.forEach((produto) => {
  produto.addEventListener("click", (e) => {
    const produtoSelecionado = e.currentTarget;

    atualizarProdutosSelecionados(produtoSelecionado);
    atualizarBotaoFecharPedido();
  });
});

botoes.forEach((botao) => {
  botao.addEventListener("click", (e) => {
    const atributoBotao = e.target.getAttribute("data-button");

    if (atributoBotao === "fechar-pedido") {
      toggleDialog();
      atualizaDialog();
    } else if (atributoBotao === "cancelar-pedido") {
      toggleDialog();
    } else {
      enviaMensagem();
    }
  });
});

// ========================================================

const enviaMensagem = () => {
  const nome = prompt("Qual o seu nome?");
  const endereco = prompt("Qual o seu endereço?");

  mensagem += `\n\nNome: ${nome}\nEndereço: ${endereco}`;

  const encodedMessage = encodeURIComponent(mensagem);
  const url = `https://wa.me/5511944685351?text=${encodedMessage}`;
  window.open(url, "_blank");
};

// ========================================================

const atualizaDialog = () => {
  const objetosProdutos = criaListaDeObjetos();
  const valorTotal = String(calculaTotal(objetosProdutos)).replace(".", ",");

  entries.map((entry) => {
    const atributoEntry = entry.getAttribute("data-entrySection");
    const entryName = entry.querySelector("[data-entry='nome']");
    const entryPrice = entry.querySelector("[data-entry='preco']");

    objetosProdutos.forEach((valor) => {
      if (valor.atributo === atributoEntry) {
        entryName.innerHTML = valor.name;
        entryPrice.innerHTML = valor.price;
      }
    });

    if (atributoEntry === "total") {
      entryPrice.innerHTML = `R$ ${valorTotal}`;
    }
  });

  mensagem = `Olá, gostaria de fazer o pedido:
- Prato: ${objetosProdutos.find((objeto) => objeto.atributo === "prato").name}
- Bebida: ${objetosProdutos.find((objeto) => objeto.atributo === "bebida").name}
- Sobremesa: ${
    objetosProdutos.find((objeto) => objeto.atributo === "sobremesa").name
  }
Total: R$ ${valorTotal}`;
};

// ========================================================

const calculaTotal = (valores) => {
  return (
    Math.round(
      valores.reduce((soma, elemento) => {
        return elemento.numberPrice + soma;
      }, 0) * 100
    ) / 100
  );
};

const criaListaDeObjetos = () => {
  return produtosSelecionados.map((produto) => {
    return {
      atributo: produto.getAttribute("data-section"),
      name: produto.querySelector("[data-test='food-title']").innerHTML,
      price: produto
        .querySelector("[data-test='food-price']")
        .innerHTML.replace("R$ ", ""),
      numberPrice: Number(
        produto
          .querySelector("[data-test='food-price']")
          .innerHTML.replace("R$ ", "")
          .replace(",", ".")
      ),
    };
  });
};

// ========================================================

const toggleDialog = () => {
  const dialog = document.querySelector(".dialog-background");
  dialog.classList.toggle("hided");
};

// ========================================================

const atualizarBotaoFecharPedido = () => {
  const botaoFecharPedido = botoes.find((botao) => {
    return botao.getAttribute("data-button") === "fechar-pedido";
  });

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
