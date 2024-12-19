import React, { useEffect, useState } from 'react';
import './App.css';
import ProductManager from './classes';

function App() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const manager = new ProductManager();

    manager.addProduct({
      title: "Tênis",
      description: "Tênis esportivo",
      price: 200.0,
      thumbnail: "caminho/para/imagem.jpg",
      code: "T001",
      stock: 20
    });

    manager.addProduct({
      title: "Camisa",
      description: "Camisa casual",
      price: 100.0,
      thumbnail: "caminho/para/imagem2.jpg",
      code: "C001",
      stock: 15
    });

    const fetchedProduct = manager.getProductById(1);
    setProduct(fetchedProduct);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gerenciador de Produtos</h1>
        {product ? (
          <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Preço: R$ {product.price}</p>
            <p>Estoque: {product.stock}</p>
          </div>
        ) : (
          <p>Produto não encontrado.</p>
        )}
      </header>
    </div>
  );
}

export default App;
