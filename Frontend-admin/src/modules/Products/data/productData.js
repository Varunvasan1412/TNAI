const KEY = 'products_items';

const defaults = [
  {
    id: 1,
    name: 'Arduino Uno R3 Development Board',
    description: 'The Arduino Uno R3 is the most used and documented board in the whole Arduino family. It has 14 digital I/O pins, 6 analog inputs, a USB connection, a power jack, an ICSP header, and a reset button — everything needed to support the microcontroller.',
    categoryId: 1, categoryName: 'Electronics',
    subcategoryId: 1, subcategoryName: 'Microcontrollers',
    status: 'Active',
    keyFeaturesTitle: 'Technical Specifications',
    keyFeatures: [
      { id: 1, name: 'Microcontroller',    value: 'ATmega328P'    },
      { id: 2, name: 'Operating Voltage',  value: '5V'            },
      { id: 3, name: 'Digital I/O Pins',   value: '14 (6 PWM)'   },
      { id: 4, name: 'Analog Input Pins',  value: '6'             },
      { id: 5, name: 'Clock Speed',        value: '16 MHz'        },
      { id: 6, name: 'Flash Memory',       value: '32 KB'         },
    ],
    sectionEnabled: { introduction: true, application: true, orderInformation: false, customization: false, kitContents: true, keyFeatures: false, resources: false },
    sectionContent: {
      introduction: 'The Arduino Uno is a microcontroller board based on the ATmega328P. It is ideal for beginners and professionals alike for building digital devices and interactive objects that can sense and control physical world objects.',
      application: '<p><strong>Robotics:</strong> Motor control, sensor reading, and actuation.</p><p><strong>IoT:</strong> Connect to internet-enabled peripherals via shields.</p><p><strong>Education:</strong> The most popular board for learning embedded systems.</p>',
      orderInformation: '', orderInformationTable: { headers: [], rows: [] },
      customization: '', kitContents: '<ul><li>1× Arduino Uno R3 Board</li><li>1× USB Type-B Cable (1m)</li><li>Quick-start documentation</li></ul>',
      keyFeatures: '', resources: { dataSheet: null, safetySheet: null, applicationNote: null },
    },
    imageCount: 3, images: [], createdAt: '2024-01-16T08:00:00.000Z',
  },
  {
    id: 2,
    name: 'ESP32 WiFi & Bluetooth SoC Module',
    description: 'ESP32 is a low-cost, low-power system on a chip microcontroller with integrated 2.4 GHz Wi-Fi and dual-mode Bluetooth. Perfect for IoT and connected device applications.',
    categoryId: 1, categoryName: 'Electronics',
    subcategoryId: 1, subcategoryName: 'Microcontrollers',
    status: 'Active',
    keyFeaturesTitle: 'Technical Specifications',
    keyFeatures: [
      { id: 1, name: 'CPU',          value: 'Xtensa dual-core 32-bit LX6' },
      { id: 2, name: 'Clock Speed',  value: 'up to 240 MHz'               },
      { id: 3, name: 'SRAM',         value: '520 KB'                       },
      { id: 4, name: 'Flash',        value: '4 MB'                         },
    ],
    sectionEnabled: { introduction: false, application: true, orderInformation: false, customization: false, kitContents: false, keyFeatures: true, resources: false },
    sectionContent: {
      introduction: '', application: '<p>Smart home devices, industrial automation, wearable electronics, and IoT sensor networks.</p>',
      orderInformation: '', orderInformationTable: { headers: [], rows: [] },
      customization: '', kitContents: '',
      keyFeatures: '<p>Integrated WiFi 802.11 b/g/n, Bluetooth Classic + BLE, 34 GPIO pins, multiple hardware interfaces (SPI, I2C, UART, ADC, DAC).</p>',
      resources: { dataSheet: null, safetySheet: null, applicationNote: null },
    },
    imageCount: 1, images: [], createdAt: '2024-01-20T08:00:00.000Z',
  },
  {
    id: 3,
    name: 'DHT22 Temperature & Humidity Sensor',
    description: 'The DHT22 is a digital temperature and humidity sensor with a calibrated digital signal output. It features high reliability and long-term stability ideal for environmental monitoring.',
    categoryId: 1, categoryName: 'Electronics',
    subcategoryId: 2, subcategoryName: 'Sensors',
    status: 'Active',
    keyFeaturesTitle: 'Specifications',
    keyFeatures: [
      { id: 1, name: 'Humidity Range',        value: '0~100% RH'   },
      { id: 2, name: 'Humidity Accuracy',     value: '±2% RH'      },
      { id: 3, name: 'Temperature Range',     value: '-40~80°C'    },
      { id: 4, name: 'Temperature Accuracy',  value: '±0.5°C'      },
    ],
    sectionEnabled: { introduction: true, application: false, orderInformation: true, customization: false, kitContents: false, keyFeatures: false, resources: true },
    sectionContent: {
      introduction: 'The DHT22 sensor uses a capacitive humidity sensor and a thermistor to measure the surrounding air, outputting a digital signal on the data pin.',
      application: '',
      orderInformation: 'Available as individual sensor or in packs.',
      orderInformationTable: {
        headers: ['Item', 'Model No.', 'Qty', 'Unit Price'],
        rows: [
          ['DHT22 Sensor',      'DHT22-AM2302',  '1', '₹120'],
          ['DHT22 Sensor Pack', 'DHT22-5PK',     '5', '₹550'],
        ],
      },
      customization: '', kitContents: '', keyFeatures: '',
      resources: { dataSheet: { name: 'DHT22-Datasheet.pdf' }, safetySheet: null, applicationNote: { name: 'DHT22-AppNote.pdf' } },
    },
    imageCount: 1, images: [], createdAt: '2024-02-05T08:00:00.000Z',
  },
];

export const getProducts = () => {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : defaults;
  } catch { return defaults; }
};

export const saveProducts = (list) => localStorage.setItem(KEY, JSON.stringify(list));

export const getProductById = (id) =>
  getProducts().find(p => String(p.id) === String(id));

export const createProduct = (data) => {
  const list    = getProducts();
  const newItem = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
  saveProducts([...list, newItem]);
  return newItem;
};

export const updateProduct = (id, data) => {
  saveProducts(getProducts().map(p => String(p.id) === String(id) ? { ...p, ...data } : p));
};

export const deleteProduct = (id) => {
  saveProducts(getProducts().filter(p => String(p.id) !== String(id)));
};
