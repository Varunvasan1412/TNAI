import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

interface RouteSEO {
  title: string;
  description: string;
}

const SEO_MAP: Record<string, RouteSEO> = {
  '/': {
    title: "THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH",
    description: "Welcome to THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH. Advancing nursing and building a healthier society.",
  },
  '/about': {
    title: "About Us | THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH",
    description: "Learn about THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH and our mission to support nursing professionals.",
  },
  '/membership': {
    title: "Membership | THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH",
    description: "Become a member of THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH. Join online today.",
  },
  '/contact': {
    title: "Contact Us | THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH",
    description: "Get in touch with THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH for any inquiries or support.",
  },
  '/privacy-policy': {
    title: "Privacy Policy | THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH",
    description: "Read our privacy policy regarding data collection, protection, and usage at THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH.",
  },
  '/terms-and-conditions': {
    title: "Terms & Conditions | THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH",
    description: "Review our terms of service and conditions for THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH.",
  },
};

const DEFAULT_SEO: RouteSEO = {
  title: "THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH",
  description: "THE TRAINED NURSES' ASSOCIATION OF INDIA TAMIL NADU STATE BRANCH - Empowering nurses and advancing healthcare.",
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
