module.exports = (app) => {
    const ecommerce = require('../controllers/ecommerce.controller.js');

    app.route('/produtos')
        .get(ecommerce.listarProdutos)
        .post(ecommerce.criarProduto)

    app.get('/produtos/:codigo', ecommerce.buscarProdutoPorCodigo);

    app.post('/carrinhos/:idCarrinho/adicionaritem', ecommerce.incluirItemCarrinho);
    app.post('/carrinhos/:idCarrinho/removeritem', ecommerce.removerItemCarrinho);
    app.get('/carrinhos/:idCarrinho/totalizar/:formaPagamento', ecommerce.totalizarCarrinho);
}