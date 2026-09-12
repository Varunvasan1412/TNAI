const fs = require('fs');
const path = require('path');

const replaceInFile = (filePath, replacements) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  for (const { from, to } of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
};

const rootToDashboard = [
  { from: 'to="/"', to: 'to="/dashboard"' },
  { from: "path: '/'", to: "path: '/dashboard'" },
  { from: "navigate('/')", to: "navigate('/dashboard')" }
];

const filesToUpdate = [
  'src/routes/index.jsx',
  'src/config/menuItems.js',
  'src/pages/Dashboard/Index.jsx',
  'src/pages/Custom/CustomList.jsx',
  'src/pages/Custom/CustomEdit.jsx',
  'src/pages/Custom/CustomCreate.jsx',
  'src/components/ui/PageTitle.jsx',
  'src/components/Layout/Sidebar.jsx',
  'src/components/Layout/HeaderHorizontal.jsx',
  'src/components/Layout/AuthLayout.jsx',
  'src/pages/Auth/TwoStepVerification.jsx',
  'src/pages/Auth/ModuleSelection.jsx',
  'src/pages/Auth/EmailVerification.jsx'
];

filesToUpdate.forEach(f => replaceInFile(path.join('e:/rsistore', f), rootToDashboard));
