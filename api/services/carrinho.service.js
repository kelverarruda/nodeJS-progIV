const TotalCarrinho = require('../models/totalCarrinho.model.js');
const { listarProdutos } = require('./produto.service.js');

const mapCarrinhos = new Map() // utilizem um map de (idCarrinho, ItemCarrinho[])

function validarDados(itemCarrinho) {
    if (itemCarrinho.codigoProduto == "") {
        return "codigoProduto"
    } else if (itemCarrinho.quantidade <= 0) {
        return "quantiade"
    } else {
        return true
    }
}

async function incluirItemCarrinho(idCarrinho, itemCarrinho) {

    if (validarDados(itemCarrinho)) {
        let carrinho = mapCarrinhos.get(idCarrinho);

        // TODO se carrinho nao existe, entao incluir novo carrinho no mapCarrinhos
        if (!carrinho) {
            mapCarrinhos.set(idCarrinho, [itemCarrinho]);
            return itemCarrinho
        }
        else {
            var item = carrinho.find(function (item) {
                return item.codigoProduto == itemCarrinho.codigoProduto;
            })

            // Se carrinho ja contem o item, entao adicionar a quantidade
            if (item) {
                item.quantidade += itemCarrinho.quantidade;
                var posicao = itens.findIndex(function (item) {
                    return item.codigoProduto == itemCarrinho.codigoProduto;
                })
                carrinho[posicao] = item;
                mapCarrinhos.set(idCarrinho, carrinho);
            }
            // caso contrario, inserir item no carrinho
            else {
                carrinho.push(itemCarrinho);
                mapCarrinhos.set(idCarrinho, carrinho);
            }
        }
        return carrinho;
    }
    // caso nao tenha sido informado algum dos campos, entao retornar a exececao abaixo
    else {
        throw new Error(`Nenhum valor informado para o campo ${validarDados(itemCarrinho)}`);
    }
}

async function removerItemCarrinho(idCarrinho, itemCarrinho) {

    const carrinho = mapCarrinhos.get(idCarrinho);

    if (carrinho) {
        var item = carrinho.find(function (item) {
            return item.codigoProduto == itemCarrinho.codigoProduto;
        });
        // Diminuir a quantidade informada da quantidade do item adicionada ao carrinho
        item.quantidade -= itemCarrinho.quantidade;
        var posicao = carrinho.findIndex(function (item) {
            return item.codigoProduto == itemCarrinho.codigoProduto
        });

        carrinho[posicao] = item;

        // Caso a quantidade ficar zerada, entao remover item do carrinho
        if (item.quantidade <= 0) {
            carrinho.splice(posicao, 1);
        }

        return carrinho;
    }
    // TODO se carrinho nao existe, entao retornar o erro abaixo
    else {
        throw new Error(`Não existe nenhum carrinho com o id ${idCarrinho}`);
    }

    // Dica: para facilitar a implementação quando precisar altera um item no mapa,
    // você pode optar por remover o item e reinseri-lo com as mudanças
}

async function totalizarCarrinho(idCarrinho, formaPagamento) {

    const carrinho = mapCarrinhos.get(idCarrinho)
    let vlrbru = 0, vlrdes = 0, vlrliq = 0;

    // TODO Totalizar os itens do carrinho e aplicar desconto se forma de pagamento for Boleto
    if (carrinho) {
        var produtos = listarProdutos();

        for (let i = 0; i < carrinho.length; i++) {
            produtos.forEach(item => {
                if (item.codigo == carrinho[i].codigoProduto) {
                    vlrbru += item.preco * carrinho[i].quantidade;
                }
            });
        }

        if (formaPagamento == "BOLETO") {
            vlrdes = vlrbru * 0.05;
        }

        vlrliq = vlrbru - vlrdes;

    }
    // TODO se carrinho nao existe, entao retornar o erro abaixo
    else {
        throw new Error(`Não existe nenhum carrinho com o id ${idCarrinho}`);
    }

    // Dica, ao totalizar o carrinho você deve pesquisar pelo preço na produto.service.js
    return new TotalCarrinho({
        valorBruto: vlrbru,
        desconto: vlrdes,
        valorLiquido: vlrliq
    });
}

module.exports = { incluirItemCarrinho, removerItemCarrinho, totalizarCarrinho }
