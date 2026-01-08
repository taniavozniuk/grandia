import { Table } from "antd";
import { useProductsHooks } from "../hooks/useProductsHook";
import { ProductColors } from "../ProductColor/ProductColors";
import "./Table.css";

interface GroupRecord {
  key: string;
  groupName: string;
  items: Record<string, unknown>[];
}

export const Tablets = () => {
  const {
    columns,
    groupedData,
    loading,
    groupByType,
    groupByBrand,
    groupByCategory,
  } = useProductsHooks();

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