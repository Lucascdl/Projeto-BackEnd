class ProductManager {
  constructor() {
      this.products = [];
      this.currentId = 1;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
      
      if (!title || !description || !price || !thumbnail || !code || stock == null) {
          console.error("Todos os campos são obrigatórios!");
          return;
      }

      if (this.products.some(product => product.code === code)) {
          console.error(`Código duplicado: ${code}`);
          return;
      }

      const newProduct = {
          id: this.currentId++,
          title,
          description,
          price,
          thumbnail,
          code,
          stock
      };

      this.products.push(newProduct);
      console.log("Produto adicionado com sucesso:", newProduct);
  }

  getProductById(id) {
      const product = this.products.find(p => p.id === id);
      if (!product) {
          console.error("Produto não encontrado!");
          return null;
      }
      return product;
  }
}

const productManager = new ProductManager();

productManager.addProduct({
  title: "Camisa",
  description: "Camisa de algodão",
  price: 50.0,
  thumbnail: "caminho/para/imagem.jpg",
  code: "C001",
  stock: 100
});

productManager.addProduct({
  title: "Calça",
  description: "Calça jeans",
  price: 120.0,
  thumbnail: "caminho/para/imagem2.jpg",
  code: "C002",
  stock: 50
});

productManager.addProduct({
  title: "Jaqueta",
  description: "Jaqueta de couro",
  price: 250.0,
  thumbnail: "caminho/para/imagem3.jpg",
  code: "C001",
  stock: 30
});

console.log(productManager.getProductById(1));
console.log(productManager.getProductById(99));

  