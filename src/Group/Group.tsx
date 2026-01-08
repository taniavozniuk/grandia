import { Switch } from "antd";
import { useProductsHooks } from "../hooks/useProductsHook";
import "./Group.css";

export const Group = () => {
  const {
    groupByType,
    setGroupByType,
    groupByBrand,
    setGroupByBrand,
    groupByCategory,
    setGroupByCategory,
  } = useProductsHooks();

  return (
    <div className="group-minimal">
      <div className="group-switches">
        <label className="switch-item">
          <Switch checked={groupByType} onChange={setGroupByType} />
          <span className="switch-text">За типом продукту</span>
        </label>

        <label className="switch-item">
          <Switch checked={groupByBrand} onChange={setGroupByBrand} />
          <span className="switch-text">За брендом</span>
        </label>

        <label className="switch-item">
          <Switch checked={groupByCategory} onChange={setGroupByCategory} />
          <span className="switch-text">За категорією</span>
        </label>
      </div>
    </div>
  );
};