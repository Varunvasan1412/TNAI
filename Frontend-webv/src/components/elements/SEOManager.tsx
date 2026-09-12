import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

interface RouteSEO {
  title: string;
  description: string;
}

const SEO_MAP: Record<string, RouteSEO> = {
  '/': {
    title: 'The Wall Project | Premium Wallpapers, Customized Murals & Textured Wall Decor',
    description: 'Transform your living and commercial spaces with high-quality custom wallpapers, luxury 3D wall murals, textured vinyls, and metallic foil finishes from The Wall Project, Coimbatore.',
  },
  '/about': {
    title: 'About Us | The Wall Project - Wallpaper Store',
    description: 'Learn about The Wall Project — Coimbatore’s premier custom wallpaper studio specializing in bespoke wall coverings, tactile interior finishes, and professional installation.',
  },
  '/gallery': {
    title: 'Wallpaper Gallery & Collections | The Wall Project',
    description: 'Explore our exquisite range of botanical, geometric, damask, luxury gold foil, and 3D textured wallpapers crafted for homes and commercial interiors.',
  },
  '/contact': {
    title: 'Contact Us | The Wall Project - Customized Wallpaper Studio',
    description: 'Get in touch with our wallpaper design experts. Book a free consultation, request custom size quotes, or visit our showroom in Coimbatore.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | The Wall Project',
    description: 'Read our privacy policy regarding data collection, protection, and usage at The Wall Project.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | The Wall Project',
    description: 'Review our terms of service, ordering process, custom sizing guidelines, and warranty policies.',
  },
};

const DEFAULT_SEO: RouteSEO = {
  title: 'The Wall Project - Premium Custom Wallpaper Store',
  description: 'Handcrafted luxury wallpapers, customized wall murals, and textured wall coverings for residential and commercial spaces.',
};

const SEOManager: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const currentSEO = SEO_MAP[location.pathname] || DEFAULT_SEO;
    document.title = currentSEO.title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', currentSEO.description);

    // Update Open Graph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSEO.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentSEO.description);

  }, [location.pathname]);

  return null;
};

export default SEOManager;
