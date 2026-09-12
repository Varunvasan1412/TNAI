const fs = require('fs');

const filesToFix = [
  'src/modules/CRM/pages/Dashboard.jsx',
  'src/modules/Products/pages/CategoryForm.jsx',
  'src/modules/Products/pages/CategoryView.jsx',
  'src/modules/Products/pages/Dashboard.jsx',
  'src/modules/Products/pages/ManageCategory.jsx',
  'src/modules/Products/pages/ManageProducts.jsx',
  'src/modules/Products/pages/ProductForm.jsx',
  'src/modules/Products/pages/ProductView.jsx'
];

filesToFix.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // It was replaced by '\\' (backslash) 
  // Let's replace '`\\/' with '`${import.meta.env.VITE_API_BASE_URL}/'
  // And '\\/' with '${import.meta.env.VITE_API_BASE_URL}/' where applicable
  
  let changed = false;
  
  // Specifically for Dashboard.jsx which had 'const IMG_BASE = \'/\';' maybe?
  // Let's replace const IMG_BASE = '\/'; with const IMG_BASE = import.meta.env.VITE_API_BASE_URL + '/';
  if (file.includes('Dashboard.jsx')) {
    if (content.includes("IMG_BASE = '\\/';")) {
      content = content.replace("IMG_BASE = '\\/';", "IMG_BASE = import.meta.env.VITE_API_BASE_URL + '/';");
      changed = true;
    }
  }

  // ManageProducts.jsx
  if (file.includes('ManageProducts.jsx')) {
    if (content.includes("|| '\\').replace")) {
       content = content.replace("|| '\\').replace", "|| import.meta.env.VITE_API_BASE_URL).replace");
       changed = true;
    }
  }
  
  // the rest was `\/${...}`
  if (content.includes("`\\/")) {
    content = content.split("`\\/").join("`${import.meta.env.VITE_API_BASE_URL}/");
    changed = true;
  }
  
  // check for just string concatenation or anything else we missed
  // e.g. preview: `\/${first.file_path}`
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed:', file);
  } else {
    console.log('No fix needed or missed:', file);
  }
});
