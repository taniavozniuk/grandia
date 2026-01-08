import { Tablets } from "./Table/Table";
import { Group } from "./Group/Group";
import { Filters } from "./Filters/Filters";
import "./App.css";
import { useProductsHooks } from "./hooks/useProductsHook";

function App() {
  const products = useProductsHooks();
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Каталог продуктів</h1>
        <p className="app-subtitle">
          Керування групуванням, фільтрами та переглядом товарів
        </p>
      </header>

      <main className="app-main">
        <section className="controls-section">
          <div className="controls-row">
            <div className="control-block">
              <h2 className="section-title">Групування</h2>
              <Group {...products} />
            </div>

            <div className="control-block">
              <h2 className="section-title">Фільтри</h2>
              <Filters {...products} />
            </div>
          </div>
        </section>

        <section className="app-section">
          <h2 className="section-title">Продукти</h2>
          <Tablets {...products} />
        </section>
      </main>
    </div>
  );
}

export default App;
