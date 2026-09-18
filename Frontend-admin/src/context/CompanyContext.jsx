import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCompanyProfile } from '../api/companyApi';

const CompanyContext = createContext();

const hexToRgb = (hex) => {
  let r = 0, g = 0, b = 0;
  if (!hex || typeof hex !== 'string') return [0, 0, 0];
  if (hex.length === 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length === 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  return [+r, +g, +b];
};

const adjustColor = (hex, factor) => {
  const [r, g, b] = hexToRgb(hex);
  const adjust = (c, f) => Math.max(0, Math.min(255, Math.round(c + (f > 0 ? (255 - c) * f : c * f))));
  return `#${adjust(r, factor).toString(16).padStart(2, '0')}${adjust(g, factor).toString(16).padStart(2, '0')}${adjust(b, factor).toString(16).padStart(2, '0')}`;
};

const generateShades = (baseHex) => {
  if (!baseHex) return null;
  return {
    50: adjustColor(baseHex, 0.9),
    100: adjustColor(baseHex, 0.8),
    200: adjustColor(baseHex, 0.6),
    300: adjustColor(baseHex, 0.4),
    400: adjustColor(baseHex, 0.2),
    500: baseHex,
    600: adjustColor(baseHex, -0.15),
    700: adjustColor(baseHex, -0.3),
    800: adjustColor(baseHex, -0.45),
    900: adjustColor(baseHex, -0.6),
  };
};

const getImageUrl = (path, defaultPath) => {
  if (!path) return defaultPath;
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/assets')) {
    return path;
  }
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'https://crm.rsistore.in';
  return `${baseUrl}/${path.replace(/^\//, '')}`;
};

export const CompanyProvider = ({ children }) => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCompanyData = async () => {
    try {
      const data = await getCompanyProfile();
      const comp = data?.data || data;
      
      // Normalize URLs
      if (comp) {
        comp.logo_url = getImageUrl(comp.main_logo || comp.logo || '/assets/images/logo.jpg');
        comp.favicon_url = getImageUrl(comp.favicon || '/assets/images/favicon.png');
        setCompanyData(comp);
      }
    } catch (error) {
      console.error('Failed to fetch company profile for global context:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  // Sync settings to DOM
  useEffect(() => {
    if (!companyData) return;

    // 1. Update Document Title
    if (companyData.company_name) {
      document.title = companyData.company_name;
    }

    // 2. Update Favicon
    if (companyData.favicon_url) {
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = companyData.favicon_url;
    }

    // 3. Inject CSS Variables for Colors
    const root = document.documentElement;
    if (companyData.primary_color) {
      const primaryShades = generateShades(companyData.primary_color);
      Object.keys(primaryShades).forEach(shade => {
        root.style.setProperty(`--color-primary-${shade}`, primaryShades[shade]);
      });
      root.style.setProperty('--color-primary', companyData.primary_color);
    }

    if (companyData.secondary_color) {
      const secondaryShades = generateShades(companyData.secondary_color);
      Object.keys(secondaryShades).forEach(shade => {
        root.style.setProperty(`--color-secondary-${shade}`, secondaryShades[shade]);
      });
      root.style.setProperty('--color-secondary', companyData.secondary_color);
    }

  }, [companyData]);

  return (
    <CompanyContext.Provider value={{ companyData, loading, refetchCompanyData: fetchCompanyData }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};
