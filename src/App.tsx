import { Divider } from "antd";
import { Tablets } from "./Table/Table";
import { Group } from "./Group/Group";
import { Filters } from "./Filters/Filters";
import "./App.css";

function App() {
  return (
    <div className="main">
      <Divider className="title">Групування</Divider>
      <Group />
      <Divider className="title">Фільтри</Divider>
      <Filters />
      <Divider className="title">Продукти</Divider>
      <Tablets />
    </div>
  );
}

export default App;
