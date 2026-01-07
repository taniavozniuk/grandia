import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/Products";
import { getProducts } from "../api/api";

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

  const columns = [
    {
      title: "Зображення",
      dataIndex: "image_link",
      key: "image",
      render: (url: string) => (
        <img src={url} alt="product" style={{ width: 60, height: 60, objectFit: "cover" }} />
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

  const filteredData = useMemo(() => {
    let result = rawData;

    if (selectedBrands.length > 0) {
      result = result.filter((p) => p.brand && selectedBrands.includes(p.brand));
    }

    if (selectedTags.length > 0) {
      result = result.filter((p) => p.tag_list.some((tag) => selectedTags.includes(tag)));
    }

    return result;
  }, [rawData, selectedBrands, selectedTags]);

  const allBrands = useMemo(() => {
    const brands = filteredData.map((p) => p.brand).filter(Boolean) as string[];
    return [...new Set(brands)].sort();
  }, [filteredData]);

  const allTags = useMemo(() => {
    const tags = filteredData.flatMap((p) => p.tag_list);
    return [...new Set(tags)].sort();
  }, [filteredData]);

  const groupedData = useMemo<GroupedRecord[]>(() => {
    const hasGrouping = groupByType || groupByBrand || groupByCategory;

    if (!hasGrouping) {
      return [
        {
          key: "all",
          groupName: "Усі продукти",
          items: filteredData.map((p) => ({ ...p, key: p.id.toString() })),
        },
      ];
    }

    const groups: Record<string, Product[]> = {};

    filteredData.forEach((product) => {
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
  }, [filteredData, groupByType, groupByBrand, groupByCategory]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setRawData(data);
      })
      .catch((err) => console.error("Помилка завантаження:", err))
      .finally(() => setLoading(false));
  }, []); 

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