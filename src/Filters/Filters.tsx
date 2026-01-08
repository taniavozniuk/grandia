import { Select } from "antd";
import "./Filters.css";
import type React from "react";

const { Option } = Select;

interface FiltersProps {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  allBrands: string[];

  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  allTags: string[];
}

export const Filters: React.FC<FiltersProps> = ({
  selectedBrands,
  setSelectedBrands,
  allBrands,

  selectedTags,
  setSelectedTags,
  allTags,
}) => {
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
