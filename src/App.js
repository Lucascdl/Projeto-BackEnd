import './App.css';
import ProductManager from './managers/ProductManager';

function App() {
  const manager = new ProductManager('./products.json');

  async function init() {
    await manager.addProduct({
      title: "Tênis",
      description: "Tênis esportivo",
      price: 200.0,
      thumbnail: "caminho/para/imagem.jpg",
      code: "T001",
      stock: 20,
    });

    const product = await manager.getProductById(1);
    console.log("Produto carregado:", product);
  }

  init();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gerenciador de Produtos</h1>
        <p>Verifique o console para as operações de persistência.</p>
      </header>
    </div>
  );
}

export default App;
