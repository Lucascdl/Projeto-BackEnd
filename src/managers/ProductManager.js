const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      } else {
        throw error;
      }
    }
  }

  async saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    if (!title || !description || !price || !thumbnail || !code || stock == null) {
      console.error("Todos os campos são obrigatórios!");
      return;
    }

    const products = await this.loadProducts();

    if (products.some(product => product.code === code)) {
      console.error(`Código duplicado: ${code}`);
      return;
    }

    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    products.push(newProduct);
    await this.saveProducts(products);
    console.log("Produto adicionado com sucesso:", newProduct);
  }

  async getProductById(id) {
    const products = await this.loadProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
      console.error("Produto não encontrado!");
      return null;
    }
    return product;
  }

  async updateProduct(id, updates) {
    const products = await this.loadProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      console.error("Produto não encontrado!");
      return;
    }

    products[index] = { ...products[index], ...updates };
    await this.saveProducts(products);
    console.log("Produto atualizado com sucesso:", products[index]);
  }

  async deleteProduct(id) {
    const products = await this.loadProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    if (filteredProducts.length === products.length) {
      console.error("Produto não encontrado!");
      return;
    }

    await this.saveProducts(filteredProducts);
    console.log(`Produto com ID ${id} removido com sucesso.`);
  }
}

module.exports = ProductManager;
