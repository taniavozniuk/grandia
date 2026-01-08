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
    <>
      <div className="groupCon">
        <label>
          <Switch checked={groupByType} onChange={setGroupByType} /> За типом
          продукту
        </label>
        <label>
          <Switch checked={groupByBrand} onChange={setGroupByBrand} /> За
          брендом
        </label>
        <label>
          <Switch checked={groupByCategory} onChange={setGroupByCategory} /> За
          категорією
        </label>
      </div>
    </>
  );
};
