const KEY = 'products_subcategories';

const defaults = [
  { id: 1, categoryId: 1, categoryName: 'Electronics', name: 'Microcontrollers', description: 'Arduino, ESP32, STM32 and other microcontroller boards.', hasDivisions: true,  divisions: ['Arduino', 'ESP32', 'STM32'], status: 'Active',   createdAt: '2024-01-16T08:00:00.000Z' },
  { id: 2, categoryId: 1, categoryName: 'Electronics', name: 'Sensors',          description: 'Temperature, humidity, motion and other sensor modules.',   hasDivisions: false, divisions: [],                           status: 'Active',   createdAt: '2024-01-17T08:00:00.000Z' },
  { id: 3, categoryId: 2, categoryName: 'Hardware',    name: 'Enclosures',        description: 'Project boxes, cases and mechanical enclosures.',           hasDivisions: false, divisions: [],                           status: 'Active',   createdAt: '2024-01-21T08:00:00.000Z' },
  { id: 4, categoryId: 3, categoryName: 'Accessories', name: 'Cables',            description: 'USB, HDMI, jumper wires and other cables.',                 hasDivisions: true,  divisions: ['USB', 'HDMI', 'Jumper'],    status: 'Active',   createdAt: '2024-02-06T08:00:00.000Z' },
  { id: 5, categoryId: 5, categoryName: 'Kits',        name: 'Starter Kits',      description: 'Complete starter kits for beginners.',                      hasDivisions: true,  divisions: ['UG', 'PG'],                 status: 'Active',   createdAt: '2024-03-02T08:00:00.000Z' },
  { id: 6, categoryId: 4, categoryName: 'Software',    name: 'Firmware',          description: 'Pre-built firmware packages for common modules.',           hasDivisions: false, divisions: [],                           status: 'Inactive', createdAt: '2024-03-10T08:00:00.000Z' },
];

export const getSubcategories = () => {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : defaults;
  } catch {
    return defaults;
  }
};

export const saveSubcategories = (list) => {
  localStorage.setItem(KEY, JSON.stringify(list));
};

export const getSubcategoryById = (id) =>
  getSubcategories().find(s => String(s.id) === String(id));

export const createSubcategory = (data) => {
  const list    = getSubcategories();
  const newItem = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
  saveSubcategories([...list, newItem]);
  return newItem;
};

export const updateSubcategory = (id, data) => {
  const list = getSubcategories().map(s =>
    String(s.id) === String(id) ? { ...s, ...data } : s
  );
  saveSubcategories(list);
};

export const deleteSubcategory = (id) => {
  saveSubcategories(getSubcategories().filter(s => String(s.id) !== String(id)));
};
