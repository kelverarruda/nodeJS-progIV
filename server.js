const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const ecommerceRoutes = require('./api/routes/ecommerce.routes.js');

const port = 3001
const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Atividade 1 - Programação IV",
            description: "Bem vindo ao E-commerce desenvolvido como Atividade 1, na disciplina de Programação IV do curso de Sistemas de Informação da Unoesc Chapecó!"
        },
        servers: [`http://localhost:${port}`]
    },
    apis: ['./api/controllers/ecommerce.controller.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json())
ecommerceRoutes(app);

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}. Acesse http://localhost:${port}/swagger-ui no seu navegador.`);
});