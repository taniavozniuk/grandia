// components/Tablets.tsx
import { Divider, Select, Switch, Table } from "antd";
import { useProductsHooks } from "../hooks/useProductsHook";
import { ProductColors } from "./ProductColors";

const { Option } = Select;

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
    setGroupByType,
    groupByBrand,
    setGroupByBrand,
    groupByCategory,
    setGroupByCategory,

    selectedBrands,
    setSelectedBrands,
    allBrands,

    selectedTags,
    setSelectedTags,
    allTags,
  } = useProductsHooks();

  const hasGrouping = groupByType || groupByBrand || groupByCategory;

  return (
    <div style={{ padding: 20 }}>
      <Divider>Групування</Divider>

      <div style={{ marginBottom: 16 }}>
        <Switch checked={groupByType} onChange={setGroupByType} /> За типом
        продукту
        <br />
        <Switch checked={groupByBrand} onChange={setGroupByBrand} /> За брендом
        <br />
        <Switch checked={groupByCategory} onChange={setGroupByCategory} /> За
        категорією
      </div>

      <Divider>Фільтри</Divider>

      <div style={{ marginBottom: 16 }}>
        <Select
          mode="multiple"
          allowClear
          placeholder="Оберіть бренди"
          value={selectedBrands}
          onChange={setSelectedBrands}
          style={{ width: 300, marginRight: 16 }}
        >
          {allBrands.map((brand) => (
            <Option key={brand} value={brand}>
              {brand}
            </Option>
          ))}
        </Select>

        <Select
          mode="multiple"
          allowClear
          placeholder="Оберіть теги"
          value={selectedTags}
          onChange={setSelectedTags}
          style={{ width: 300 }}
        >
          {allTags.map((tag) => (
            <Option key={tag} value={tag}>
              {tag}
            </Option>
          ))}
        </Select>
      </div>

      <Divider>Продукти</Divider>

      <Table
        dataSource={groupedData}
        columns={undefined}
        loading={loading}
        rowKey="key"
        pagination={{ pageSize: 20 }}
        expandable={{
          expandedRowRender: (record) => (
            <Table
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
            <strong>{record.groupName}</strong>
          )}
        />
        <Table.Column
          title="Кількість"
          key="count"
          render={(_, record: GroupRecord) => `${record.items.length} товарів`}
        />
      </Table>
    </div>
  );
};
