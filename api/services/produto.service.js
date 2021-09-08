const Produto = require("../models/produto.model")

const produtos = []

function validarDados(produto) {
    if (produto.codigo == "") {
        console.log(produto.codigo)
        return "Código"
    }
    else if (produto.nome == "") {
        return "Nome"
    }
    else if (produto.departamento == "") {
        return "Departamento"
    }
    else if (produto.preco == 0) {
        return "Preço"
    }
    else {
        return true
    }
}

function getCodigo(produto) {
    for (var i = 0; i < produtos.length; i++) {
        if (produtos[i].codigo === produto.codigo) {
            return false;
        }
    }
    return true
}

function getProduto(produto) {
    for (var i = 0; i < produtos.length; i++) {
        if (JSON.stringify(produtos[i]) === JSON.stringify(produto)) {
            return false;
        }
    }
    return true;
}

async function cadastrarProduto(produto) {
    // TODO verificar se produto existe na lista e caso contrario inseri-lo
    if (getProduto(produto)) {
        if (validarDados(produto)) {
            if (getCodigo(produto)) {
                produtos.push(produto)
                return produto;
            }
            // TODO executar o comando abaixo, caso já exista um produto para o código informado
            else {
                throw new Error(`Já existe um produto cadastrado com o código ${produto.codigo}`);
            }
        }
        // TODO executar o comando abaixo, caso alguns dos campos(codigo, nome, departamento, preco) não foi informado
        else {
            throw new Error(`Nenhum valor informado para o campo ${validarDados(produto)}`);
        }
    }
    else {
        throw new Error(`Objeto existente`)
    }
}


async function buscarProdutoPorCodigo(codigoProduto) {
    // TODO consultar produto na lista e retornar
    if (!getCodigo(codigoProduto)) {
        var codpro = produtos.find(function (produto) {
            return produto.codigo == codigoProduto.codigo;
        });

        return (codpro);
    }
    // TODO executar o comando abaixo, caso nenhum produto seja encontrado para o código informado
    else {
        throw new Error(`Nenhum produto encontrado com o código ${codigoProduto.codigo}`);
    }
}

async function listarProdutos() {
    return produtos.slice();
}

module.exports = { cadastrarProduto, buscarProdutoPorCodigo, listarProdutos }