const express = require('express');
const ProductManager = require('./managers/ProductManager');

const app = express();
const port = 3000;
const productManager = new ProductManager('./products.json');

app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.loadProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      return res.json({ success: true, data: limitedProducts });
    }

    res.json({ success: true, data: products });
  } catch (error) {
    console.error("Erro ao obter produtos:", error.message);
    res.status(500).json({ success: false, message: "Erro interno no servidor" });
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(parseInt(pid));

    if (!product) {
      return res.status(404).json({ success: false, message: "Produto não encontrado" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Erro ao obter produto:", error.message);
    res.status(500).json({ success: false, message: "Erro interno no servidor" });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
