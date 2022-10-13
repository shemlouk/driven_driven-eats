const produtos = document.querySelectorAll("[data-section]");

let produtosSelecionados = [];

produtos.forEach((elemento) => {
  elemento.addEventListener("click", (e) => {
    const produto = e.currentTarget;
    atualizaProdutosSelecionados(produto);
    //atualiza o css
    //verifica o botao se ja pode > 3
  });
});

//conferir se ele ja existe na lista
//SE ja existir, substituir
//Se nao, adicionar

const atualizaProdutosSelecionados = (produto) => {
  const attProduto = produto.getAttribute("data-section");

  let toogle = true;

  //Se a lista estiver vazia, adicona o primeiro item selecionado direto
  if (produtosSelecionados.length === 0) {
    produtosSelecionados.push(produto);
    adicionaStyle(produto);
    return;
  }

  //Se não estiver vazia, verifica se já existe algum elemento nela com o mesmo atributo do item selecionado
  //Se VERDADEIRO, substitui o que já estava na lista pelo novo
  produtosSelecionados.forEach((elemento) => {
    const attElemento = elemento.getAttribute("data-section");
    if (attElemento === attProduto) {
      const index = produtosSelecionados.indexOf(elemento);
      removeStyle(elemento);
      produtosSelecionados.splice(index, 1);
      produtosSelecionados.push(produto);
      adicionaStyle(produto);
      toogle = false;
    }
  });

  //Se o toogle for VERDADEIRO, adiciona o produto na lista
  if (toogle) {
    produtosSelecionados.push(produto);
    adicionaStyle(produto);
  }
};

const adicionaStyle = (produto) => {
  produto.querySelector("img").style.display = "block";
  produto.classList.add("selected");
};

const removeStyle = (produto) => {
  produto.querySelector("img").style.display = "none";
  produto.classList.remove("selected");
};
