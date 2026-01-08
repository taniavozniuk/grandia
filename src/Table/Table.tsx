import { Table } from "antd";
import { type GroupedRecord } from "../hooks/useProductsHook";
import { ProductColors } from "../ProductColor/ProductColors";
import "./Table.css";
import type { Product } from "../types/Products";
import type { ColumnsType } from "antd/es/table";
import type React from "react";
import type { GroupRecord } from "../types/GroupRecord";

interface TableProps {
  columns: ColumnsType<Product>;
  groupedData: GroupedRecord[];
  loading: boolean;
  groupByType: boolean;
  groupByBrand: boolean;
  groupByCategory: boolean;
}

export const Tablets: React.FC<TableProps> = ({
  columns,
  groupedData,
  loading,
  groupByType,
  groupByBrand,
  groupByCategory,
}) => {
  const hasGrouping = groupByType || groupByBrand || groupByCategory;

  return (
    <div className="table-container">
      <Table
        className="custom-table"
        dataSource={groupedData}
        columns={undefined}
        loading={loading}
        rowKey="key"
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              className="inner-table"
              columns={columns}
              dataSource={record.items}
              pagination={false}
              rowKey="key"
              size="small"
              expandable={{
                expandedRowRender: (product) => (
                  <ProductColors product={product} />
                ),
                rowExpandable: (product) =>
                  product.product_colors && product.product_colors.length > 0,
              }}
            />
          ),
          rowExpandable: (record) => record.items.length > 0,
          defaultExpandedRowKeys: hasGrouping ? [] : ["all"],
        }}
      >
        <Table.Column
          title="Група"
          key="groupName"
          render={(_, record: GroupRecord) => (
            <strong className="group-name">{record.groupName}</strong>
          )}
        />
        <Table.Column
          title="Кількість"
          key="count"
          render={(_, record: GroupRecord) => (
            <span className="group-count">{record.items.length} товарів</span>
          )}
        />
      </Table>
    </div>
  );
};
