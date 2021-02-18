const express = require('express');
const shipping = require('./shipping');
const storage = require('./storage');
const cors = require('cors');

const app = express();
app.use(cors());

/**
 * Retorna a lista de produtos da loja via StorageService
 */
app.get('/products', (req, res, next) => {
    storage.Products(null, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'something failed :(' });
        } else {
            res.json(data.products);
        }
    });
});

/**
 * Consulta o frete de envio no ShippingService
 */
app.get('/shipping/:cep', (req, res, next) => {
    shipping.Get(
        {
            cep: req.params.cep,
        },
        (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'something failed :(' });
            } else {
                res.json({
                    cep: req.params.cep,
                    value: data.value,
                });
            }
        }
    );
});

/**
 * Inicia o router
 */
app.listen(3000, () => {
    console.log('API Service running on http://localhost:3000');
});