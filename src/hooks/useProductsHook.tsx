import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/Products";
import { getAllFilters, getProducts } from "../api/api";
import { Image } from "antd";

export type GroupedRecord = {
  key: string;
  groupName: string;
  items: Product[];
};

export const useProductsHooks = () => {
  const [rawData, setRawData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [groupByType, setGroupByType] = useState(false);
  const [groupByBrand, setGroupByBrand] = useState(false);
  const [groupByCategory, setGroupByCategory] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [allBrands, setAllBrands] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  const columns = [
    {
      title: "Зображення",
      dataIndex: "image_link",
      key: "image",
      render: (url: string) => (
        <Image
          width={60}
          height={60}
          src={url || "/image/default-product.png"}
          fallback="/image/default-product.png"
          style={{ objectFit: "cover", borderRadius: 8 }}
          preview={false}
        />
      ),
    },
    { title: "Назва", dataIndex: "name", key: "name" },
    { title: "Категорія", dataIndex: "category", key: "category" },
    { title: "Бренд", dataIndex: "brand", key: "brand" },
    {
      title: "Ціна",
      dataIndex: "price",
      key: "price",
      render: (price: string) => (price ? `$${price}` : "-"),
    },
    { title: "Тип продукту", dataIndex: "product_type", key: "type" },
  ];

  const groupedData = useMemo<GroupedRecord[]>(() => {
    const hasGrouping = groupByType || groupByBrand || groupByCategory;

    if (!hasGrouping) {
      return [
        {
          key: "all",
          groupName: "Усі продукти",
          items: rawData.map((p) => ({ ...p, key: p.id.toString() })),
        },
      ];
    }

    const groups: Record<string, Product[]> = {};

    rawData.forEach((product) => {
      const parts = [
        groupByType ? product.product_type : null,
        groupByBrand ? product.brand : null,
        groupByCategory ? product.category || "Без категорії" : null,
      ].filter(Boolean);

      const groupKey = parts.length > 0 ? parts.join(" | ") : "Інше";

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(product);
    });

    return Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([groupName, items], index) => ({
        key: `group-${index}`,
        groupName,
        items: items.map((p) => ({ ...p, key: p.id.toString() })),
      }));
  }, [rawData, groupByType, groupByBrand, groupByCategory]);

  useEffect(() => {
    getAllFilters()
      .then(({ brands, tags }) => {
        setAllBrands(brands);
        setAllTags(tags);
      })
      .catch((err) => console.error("Помилка завантаження:", err));
  }, []);

  useEffect(() => {
    getProducts({
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    })
      .then((data) => {
        setRawData(data);
      })
      .catch((err) => console.error("Помилка завантаження продуктів:", err))
      .finally(() => setLoading(false));
  }, [selectedBrands, selectedTags]);

  return {
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
  };
};
