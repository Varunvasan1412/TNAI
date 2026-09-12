const KEY = 'products_categories';

const defaults = [
  { id: 1, name: 'Electronics',  description: 'Electronic components, modules and development boards used in Ahattrickz tech projects.', status: 'Active',   image: null, createdAt: '2024-01-15T08:00:00.000Z' },
  { id: 2, name: 'Hardware',     description: 'Physical hardware tools, enclosures, fasteners and mechanical parts.', status: 'Active',   image: null, createdAt: '2024-01-20T09:00:00.000Z' },
  { id: 3, name: 'Accessories',  description: 'Product accessories including cables, connectors, breadboards and add-ons.', status: 'Active',   image: null, createdAt: '2024-02-05T10:00:00.000Z' },
  { id: 4, name: 'Software',     description: 'Software licenses, development tools, libraries and firmware packages.', status: 'Active',   image: null, createdAt: '2024-02-10T11:00:00.000Z' },
  { id: 5, name: 'Kits',         description: 'Complete starter, learning and professional kits bundled for specific use cases.', status: 'Active',   image: null, createdAt: '2024-03-01T08:00:00.000Z' },
  { id: 6, name: 'Spare Parts',  description: 'Replacement boards, spare cables and consumable spare components.', status: 'Inactive', image: null, createdAt: '2024-03-15T14:00:00.000Z' },
];

export const getCategories = () => {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : defaults;
  } catch {
    return defaults;
  }
};

export const saveCategories = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const getCategoryById = (id) =>
  getCategories().find(c => String(c.id) === String(id));

export const createCategory = (data) => {
  const list = getCategories();
  const newItem = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
  saveCategories([...list, newItem]);
  return newItem;
};

export const updateCategory = (id, data) => {
  const list = getCategories().map(c =>
    String(c.id) === String(id) ? { ...c, ...data } : c
  );
  saveCategories(list);
};

export const deleteCategory = (id) => {
  saveCategories(getCategories().filter(c => String(c.id) !== String(id)));
};
