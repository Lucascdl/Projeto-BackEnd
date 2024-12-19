class ProductManager {
    constructor() {
      this.products = [];
      this.lastId = 0;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos os campos são obrigatórios");
        return;
      }
  
      const exists = this.products.some(product => product.code === code);
      if (exists) {
        console.error("Código de produto já existe");
        return;
      }
  
      const newProduct = {
        id: ++this.lastId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(newProduct);
      return newProduct;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
        console.error("Produto não encontrado");
        return null;
      }
      return product;
    }
  }
  
  export default ProductManager;
  