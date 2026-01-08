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
    <div className="filters">
      <Select
        className="filters__select"
        mode="multiple"
        allowClear
        placeholder="Оберіть бренди"
        value={selectedBrands}
        onChange={setSelectedBrands}
      >
        {allBrands.map((brand) => (
          <Option key={brand} value={brand}>
            {brand}
          </Option>
        ))}
      </Select>

      <Select
        className="filters__select"
        mode="multiple"
        allowClear
        placeholder="Оберіть теги"
        value={selectedTags}
        onChange={setSelectedTags}
      >
        {allTags.map((tag) => (
          <Option key={tag} value={tag}>
            {tag}
          </Option>
        ))}
      </Select>
    </div>
  );
};
