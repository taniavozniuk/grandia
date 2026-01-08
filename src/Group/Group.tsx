import { Switch } from "antd";
import "./Group.css";
import type React from "react";

interface GroupProps {
  groupByType: boolean;
  setGroupByType: (value: boolean) => void;
  groupByBrand: boolean;
  setGroupByBrand: (value: boolean) => void;
  groupByCategory: boolean;
  setGroupByCategory: (value: boolean) => void;
}

export const Group: React.FC<GroupProps> = ({
  groupByType,
  setGroupByType,
  groupByBrand,
  setGroupByBrand,
  groupByCategory,
  setGroupByCategory,
}) => {
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
