import { Tablets } from "./Table/Table";
import { Group } from "./Group/Group";
import { Filters } from "./Filters/Filters";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Каталог продуктів</h1>
        <p className="app-subtitle">Керування групуванням, фільтрами та переглядом товарів</p>
      </header>

      <main className="app-main">
        <section className="app-section">
          <div className="section-header">
            <span className="section-icon">✨</span>
            <h2 className="section-title">Групування</h2>
          </div>
          <Group />
        </section>

        <section className="app-section">
          <div className="section-header">
            <span className="section-icon">🔍</span>
            <h2 className="section-title">Фільтри</h2>
          </div>
          <Filters />
        </section>

        <section className="app-section">
          <div className="section-header">
            <span className="section-icon">📦</span>
            <h2 className="section-title">Продукти</h2>
          </div>
          <Tablets />
        </section>
      </main>
    </div>
  );
}

export default App;