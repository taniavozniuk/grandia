import { Select } from "antd";
import { useProductsHooks } from "../hooks/useProductsHook";
import "./Filters.css";

const { Option } = Select;

export const Filters = () => {
  const {
    selectedBrands,
    setSelectedBrands,
    allBrands,

    selectedTags,
    setSelectedTags,
    allTags,
  } = useProductsHooks();

  return (
    <div className="filters-container">
      <div className="filters-group">
        <label className="filters-label">Бренди</label>
        <Select
          mode="multiple"
          allowClear
          showSearch
          placeholder="Оберіть бренди"
          value={selectedBrands}
          onChange={setSelectedBrands}
          className="filters-select"
          optionFilterProp="children"
        >
          {allBrands.map((brand) => (
            <Option key={brand} value={brand}>
              {brand}
            </Option>
          ))}
        </Select>
      </div>

      <div className="filters-group">
        <label className="filters-label">Теги</label>
        <Select
          mode="multiple"
          allowClear
          showSearch
          placeholder="Оберіть теги"
          value={selectedTags}
          onChange={setSelectedTags}
          className="filters-select"
        >
          {allTags.map((tag) => (
            <Option key={tag} value={tag}>
              {tag}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};