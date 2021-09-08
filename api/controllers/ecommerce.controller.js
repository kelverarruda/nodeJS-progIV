const Produto = require('../models/produto.model.js');
const ItemCarrinho = require('../models/itemCarrinho.model.js');
const ProdutoService = require('../services/produto.service.js');
const CarrinhoService = require('../services/carrinho.service.js');

/**
 * @swagger
 * /produtos:
 *  post:
 *    description: API para cadastrar novo produdo no e-commerce
 *    parameters:
 *      - in: body
 *        name: produto
 *        description: produto.
 *        schema:
 *          type: object
 *          properties:
 *            codigo:
 *              type: string
 *            nome:
 *              type: string
 *            departamento:
 *              type: string
 *            preco:
 *              type: number
 *              format: double
 *    responses:
 *      '201':
 *         description: Produto cadastrado com sucesso
 *      '400':
 *         description: Bad Request
 */
exports.criarProduto = (req, res) => {
    let produto = new Produto(req.body);
    ProdutoService.cadastrarProduto(produto)
        .then(() => {
            res.status(201).json({ produto })
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
};

/**
 * @swagger
 * /produtos:
 *  get:
 *    description: API para listar os produdos cadastrados no e-commerce
 *    responses:
 *      '200':
 *         description: Produto cadastrado com sucesso
 *         schema:
 *           type: array
 *           items:
 *             properties:
 *               codigo:
 *                 type: string
 *               nome:
 *                 type: string
 *               departamento:
 *                 type: string
 *               preco:
 *                 type: number
 *                 format: double
 *      '400':
 *         description: Bad Request
 */
exports.listarProdutos = (req, res) => {
    ProdutoService.listarProdutos()
        .then((data) => {
            res.status(200).json({ data })
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
};


/**
 * @swagger
 * /produtos/{codigo}:
 *  get:
 *    description: buscar produto
 *    parameters:
 *      - in: body
 *        name: produto
 *        description: Item para ser buscado
 *        schema:
 *          type: object
 *          properties:
 *            codigo:
 *              type: string
 *    responses:
 *      '200':
 *         description: Item ou quantidade removido com sucesso
 *      '400':
 *         description: Bad Request
 */
exports.buscarProdutoPorCodigo = (req, res) => {
    ProdutoService.buscarProdutoPorCodigo(req.body)
        .then((data)=>{
            res.status(200).json({data})
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
};


/**
 * @swagger
 * /carrinhos/{idCarrinho}/adicionaritem:
 *  post:
 *    description: Inserir novo item no carrinho
 *    parameters:
 *      - in: path
 *        name: idCarrinho
 *        type: string
 *      - in: body
 *        name: itemCarrinho
 *        description: Item para ser adicionado no carrinho.
 *        schema:
 *          type: object
 *          properties:
 *            codigoProduto:
 *              type: string
 *            quantidade:
 *              type: integer
 *    responses:
 *      '200':
 *         description: Item ou quantidade adicionado com sucesso
 *      '400':
 *         description: Bad Request
 */
exports.incluirItemCarrinho = (req, res) => {
    let itemCarrinho = new ItemCarrinho(req.body);
    CarrinhoService.incluirItemCarrinho(req.params.idCarrinho, itemCarrinho)
        .then((data) => {
            res.status(200).json({ data })
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        });

};

/**
 * @swagger
 * /carrinhos/{idCarrinho}/removeritem:
 *  post:
 *    description: Remover item no carrinho
 *    parameters:
 *      - in: path
 *        name: idCarrinho
 *        type: string
 *      - in: body
 *        name: itemCarrinho
 *        description: Item para ser adicionado no carrinho.
 *        schema:
 *          type: object
 *          properties:
 *            codigoProduto:
 *              type: string
 *            quantidade:
 *              type: integer
 *    responses:
 *      '200':
 *         description: Item ou quantidade removido com sucesso
 *      '400':
 *         description: Bad Request
 */
exports.removerItemCarrinho = (req, res) => {
    let itemCarrinho = new ItemCarrinho(req.body);
    CarrinhoService.removerItemCarrinho(req.params.idCarrinho, itemCarrinho)
        .then((data) => {
            res.status(200).json({ data })
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
};

/**
 * @swagger
 * /carrinhos/{idCarrinho}/totalizar/{formaPagamento}:
 *  get:
 *    description: Totalizar os itens do carrinho
 *    parameters:
 *      - name: idCarrinho
 *        type: string
 *        in: path
 *      - name: formaPagamento
 *        type: string
 *        in: path
 *        enum: [CARTAO, BOLETO]
 *    responses:
 *      '200':
 *         description: Ok. Valor total do carrinho.
 *         schema:
 *           type: object
 *           properties:
 *             valorBruto:
 *               type: number
 *               format: double
 *             desconto:
 *               type: number
 *               format: double
 *             valorLiquido:
 *               type: number
 *               format: double
 *      '400':
 *         description: Bad Request
 *      '404':
 *         description: Nenhum carrinho encontrado para o id fornecido
 */
exports.totalizarCarrinho = (req, res) => {
    CarrinhoService.totalizarCarrinho(req.params.idCarrinho, req.params.formaPagamento)
        .then((data) => {
            res.status(200).json({ data })
        })
        .catch((err) => {
            res.status(400).json({ message: err.message })
        })
};