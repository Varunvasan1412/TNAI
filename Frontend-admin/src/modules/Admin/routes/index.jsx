import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import CRMDashboard from '../pages/Dashboard';
import Calendar from '../pages/Calendar';
import Chat from '../pages/Chat';
import EmailInbox from '../pages/EmailInbox';
import EmailRead from '../pages/EmailRead';
import InvoiceList from '../pages/InvoiceList';
import InvoiceDetail from '../pages/InvoiceDetail';
import ContactsGrid from '../pages/ContactsGrid';
import ContactsList from '../pages/ContactsList';
import ContactsProfile from '../pages/ContactsProfile';
import ManageUsers from '../pages/ManageUsers';
import Deals from '../pages/Deals';
import Leads from '../pages/Leads';
import Blog from '../pages/Blog';
import BlogForm from '../pages/BlogForm';
import ExecutiveMembers from '../pages/ExecutiveMembers';
import ExecutiveMemberForm from '../pages/ExecutiveMemberForm';
import ExecutiveMemberView from '../pages/ExecutiveMemberView';

import Events from '../pages/Events';
import EventForm from '../pages/EventForm';
import EventView from '../pages/EventView';

import Institutions from '../pages/Institutions';
import InstitutionForm from '../pages/InstitutionForm';
import InstitutionView from '../pages/InstitutionView';

import NewsCirculars from '../pages/NewsCirculars';
import NewsCircularForm from '../pages/NewsCircularForm';
import NewsCircularView from '../pages/NewsCircularView';

import Newsletters from '../pages/Newsletters';
import NewsletterForm from '../pages/NewsletterForm';
import NewsletterView from '../pages/NewsletterView';

import SnaiArticles from '../pages/SnaiArticles';
import SnaiArticleForm from '../pages/SnaiArticleForm';
import SnaiArticleView from '../pages/SnaiArticleView';

import Statistics from '../pages/Statistics';
import StatisticForm from '../pages/StatisticForm';
import StatisticView from '../pages/StatisticView';

// Phase 3 Imports
import GalleryAlbums from '../pages/GalleryAlbums';
import GalleryAlbumForm from '../pages/GalleryAlbumForm';
import GalleryAlbumView from '../pages/GalleryAlbumView';
import GalleryImages from '../pages/GalleryImages';
import GalleryImageForm from '../pages/GalleryImageForm';
import GalleryImageView from '../pages/GalleryImageView';
import Downloads from '../pages/Downloads';
import DownloadForm from '../pages/DownloadForm';
import DownloadView from '../pages/DownloadView';
import VoiceConcerns from '../pages/VoiceConcerns';
import VoiceConcernForm from '../pages/VoiceConcernForm';
import VoiceConcernView from '../pages/VoiceConcernView';
import Activities from '../pages/Activities';
import ActivityForm from '../pages/ActivityForm';
import ActivityView from '../pages/ActivityView';
import SnaUnits from '../pages/SnaUnits';
import SnaUnitForm from '../pages/SnaUnitForm';
import SnaUnitView from '../pages/SnaUnitView';
import TnaiUnits from '../pages/TnaiUnits';
import TnaiUnitForm from '../pages/TnaiUnitForm';
import TnaiUnitView from '../pages/TnaiUnitView';
import Impacts from '../pages/Impacts';
import ImpactForm from '../pages/ImpactForm';
import ImpactView from '../pages/ImpactView';
import StudentDetails from '../pages/StudentDetails';
import StudentDetailForm from '../pages/StudentDetailForm';
import StudentDetailView from '../pages/StudentDetailView';
import SnaOfficeBearers from '../pages/SnaOfficeBearers';
import SnaOfficeBearerForm from '../pages/SnaOfficeBearerForm';
import SnaOfficeBearerView from '../pages/SnaOfficeBearerView';
import InstitutionProfiles from '../pages/InstitutionProfiles';
import InstitutionProfileForm from '../pages/InstitutionProfileForm';
import InstitutionProfileView from '../pages/InstitutionProfileView';

// UI Components
import Alerts from '../pages/UI/Alerts';
import Buttons from '../pages/UI/Buttons';
import Cards from '../pages/UI/Cards';
import Carousel from '../pages/UI/Carousel';
import Colors from '../pages/UI/Colors';
import Dropdowns from '../pages/UI/Dropdowns';
import General from '../pages/UI/General';
import Grid from '../pages/UI/Grid';
import Images from '../pages/UI/Images';
import Modals from '../pages/UI/Modals';
import Offcanvas from '../pages/UI/Offcanvas';
import Placeholders from '../pages/UI/Placeholders';
import ProgressBars from '../pages/UI/ProgressBars';
import TabsAccordions from '../pages/UI/TabsAccordions';
import Typography from '../pages/UI/Typography';
import { UIToasts, UIVideo, UIUtilities } from '../pages/UI/UIExtra';

// Forms
import FormElements from '../pages/Forms/FormElements';
import FormValidation from '../pages/Forms/FormValidation';
import FormAdvanced from '../pages/Forms/FormAdvanced';
import FormEditors from '../pages/Forms/FormEditors';
import FormUploads from '../pages/Forms/FormUploads';
import FormWizard from '../pages/Forms/FormWizard';
import FormMask from '../pages/Forms/FormMask';

// Tables
import TablesBasic from '../pages/Tables/TablesBasic';
import TablesDataTable from '../pages/Tables/TablesDataTable';
import TablesResponsive from '../pages/Tables/TablesResponsive';
import TablesEditable from '../pages/Tables/TablesEditable';

// Pages
import { PagesStarter, PagesTimeline, PagesFAQs, PagesPricing, PagesMaintenance, PagesComingSoon } from '../pages/Pages/PagesAll';

// Extended
import { ExtendedLightbox, ExtendedRangeSlider, ExtendedSweetAlert, ExtendedRating, ExtendedNotifications, ExtendedSessionTimeout } from '../pages/Extended/ExtendedAll';

// Charts
import { ChartsApex, ChartsEChart, ChartsChartjs, ChartsKnob, ChartsSparkline } from '../pages/Charts/ChartsAll';

// Icons
import { IconsBoxicons, IconsMaterialDesign, IconsDripicons, IconsFontAwesome } from '../pages/Icons/IconsAll';

// Custom Pages
import CustomList from '../pages/Custom/CustomList';
import CustomCreate from '../pages/Custom/CustomCreate';
import CustomEdit from '../pages/Custom/CustomEdit';

// Maps
import { MapsGoogle, MapsVector, MapsLeaflet } from '../pages/Maps/MapsAll';
import Enquiry from '../pages/Enquiry';
import EnquiryForm from '../pages/EnquiryForm';
import EnquiryView from '../pages/EnquiryView';
import BlogView from '../pages/BlogView';
import ProductEnquiry from '../pages/ProductEnquiry';
import ProductEnquiryView from '../pages/ProductEnquiryView';


const W = ({ children }) => <MainLayout>{children}</MainLayout>;

const CRMRoutes = [
  <Route key="admin-dashboard" path="/admin/dashboard" element={<W><CRMDashboard /></W>} />,
  <Route key="admin-executive-members" path="/admin/executive-members" element={<W><ExecutiveMembers /></W>} />,
  <Route key="admin-executive-members-add" path="/admin/executive-members/add" element={<W><ExecutiveMemberForm /></W>} />,
  <Route key="admin-executive-members-edit" path="/admin/executive-members/edit/:id" element={<W><ExecutiveMemberForm /></W>} />,
  <Route key="admin-executive-members-view" path="/admin/executive-members/view/:id" element={<W><ExecutiveMemberView /></W>} />,
  <Route key="admin-events" path="/admin/events" element={<W><Events /></W>} />,<Route key="admin-events-add" path="/admin/events/add" element={<W><EventForm /></W>} />,<Route key="admin-events-edit" path="/admin/events/edit/:id" element={<W><EventForm /></W>} />,<Route key="admin-events-view" path="/admin/events/view/:id" element={<W><EventView /></W>} />,
  <Route key="admin-institutions" path="/admin/institutions" element={<W><Institutions /></W>} />,<Route key="admin-institutions-add" path="/admin/institutions/add" element={<W><InstitutionForm /></W>} />,<Route key="admin-institutions-edit" path="/admin/institutions/edit/:id" element={<W><InstitutionForm /></W>} />,<Route key="admin-institutions-view" path="/admin/institutions/view/:id" element={<W><InstitutionView /></W>} />,
  <Route key="admin-news-circulars" path="/admin/news-circulars" element={<W><NewsCirculars /></W>} />,<Route key="admin-news-circulars-add" path="/admin/news-circulars/add" element={<W><NewsCircularForm /></W>} />,<Route key="admin-news-circulars-edit" path="/admin/news-circulars/edit/:id" element={<W><NewsCircularForm /></W>} />,<Route key="admin-news-circulars-view" path="/admin/news-circulars/view/:id" element={<W><NewsCircularView /></W>} />,
  <Route key="admin-newsletter" path="/admin/newsletter" element={<W><Newsletters /></W>} />,<Route key="admin-newsletter-add" path="/admin/newsletter/add" element={<W><NewsletterForm /></W>} />,<Route key="admin-newsletter-edit" path="/admin/newsletter/edit/:id" element={<W><NewsletterForm /></W>} />,<Route key="admin-newsletter-view" path="/admin/newsletter/view/:id" element={<W><NewsletterView /></W>} />,
  <Route key="admin-snai-articles" path="/admin/snai-articles" element={<W><SnaiArticles /></W>} />,<Route key="admin-snai-articles-add" path="/admin/snai-articles/add" element={<W><SnaiArticleForm /></W>} />,<Route key="admin-snai-articles-edit" path="/admin/snai-articles/edit/:id" element={<W><SnaiArticleForm /></W>} />,<Route key="admin-snai-articles-view" path="/admin/snai-articles/view/:id" element={<W><SnaiArticleView /></W>} />,
  <Route key="admin-statistics" path="/admin/statistics" element={<W><Statistics /></W>} />,<Route key="admin-statistics-add" path="/admin/statistics/add" element={<W><StatisticForm /></W>} />,<Route key="admin-statistics-edit" path="/admin/statistics/edit/:id" element={<W><StatisticForm /></W>} />,<Route key="admin-statistics-view" path="/admin/statistics/view/:id" element={<W><StatisticView /></W>} />,
  <Route key="admin-gallery-albums" path="/admin/gallery/albums" element={<W><GalleryAlbums /></W>} />,
  <Route key="admin-gallery-albums-add" path="/admin/gallery/albums/add" element={<W><GalleryAlbumForm /></W>} />,
  <Route key="admin-gallery-albums-edit" path="/admin/gallery/albums/edit/:id" element={<W><GalleryAlbumForm /></W>} />,
  <Route key="admin-gallery-albums-view" path="/admin/gallery/albums/view/:id" element={<W><GalleryAlbumView /></W>} />,
  
  <Route key="admin-gallery-images" path="/admin/gallery/images" element={<W><GalleryImages /></W>} />,
  <Route key="admin-gallery-images-add" path="/admin/gallery/images/add" element={<W><GalleryImageForm /></W>} />,
  <Route key="admin-gallery-images-edit" path="/admin/gallery/images/edit/:id" element={<W><GalleryImageForm /></W>} />,
  <Route key="admin-gallery-images-view" path="/admin/gallery/images/view/:id" element={<W><GalleryImageView /></W>} />,
  
  <Route key="admin-downloads" path="/admin/downloads" element={<W><Downloads /></W>} />,
  <Route key="admin-downloads-add" path="/admin/downloads/add" element={<W><DownloadForm /></W>} />,
  <Route key="admin-downloads-edit" path="/admin/downloads/edit/:id" element={<W><DownloadForm /></W>} />,
  <Route key="admin-downloads-view" path="/admin/downloads/view/:id" element={<W><DownloadView /></W>} />,
  
  <Route key="admin-voice-concern" path="/admin/voice-concern" element={<W><VoiceConcerns /></W>} />,
  <Route key="admin-voice-concern-add" path="/admin/voice-concern/add" element={<W><VoiceConcernForm /></W>} />,
  <Route key="admin-voice-concern-edit" path="/admin/voice-concern/edit/:id" element={<W><VoiceConcernForm /></W>} />,
  <Route key="admin-voice-concern-view" path="/admin/voice-concern/view/:id" element={<W><VoiceConcernView /></W>} />,
  
  <Route key="admin-activities" path="/admin/activities" element={<W><Activities /></W>} />,
  <Route key="admin-activities-add" path="/admin/activities/add" element={<W><ActivityForm /></W>} />,
  <Route key="admin-activities-edit" path="/admin/activities/edit/:id" element={<W><ActivityForm /></W>} />,
  <Route key="admin-activities-view" path="/admin/activities/view/:id" element={<W><ActivityView /></W>} />,
  
  <Route key="admin-sna-units" path="/admin/sna-units" element={<W><SnaUnits /></W>} />,
  <Route key="admin-sna-units-add" path="/admin/sna-units/add" element={<W><SnaUnitForm /></W>} />,
  <Route key="admin-sna-units-edit" path="/admin/sna-units/edit/:id" element={<W><SnaUnitForm /></W>} />,
  <Route key="admin-sna-units-view" path="/admin/sna-units/view/:id" element={<W><SnaUnitView /></W>} />,
  
  <Route key="admin-tnai-units" path="/admin/tnai-units" element={<W><TnaiUnits /></W>} />,
  <Route key="admin-tnai-units-add" path="/admin/tnai-units/add" element={<W><TnaiUnitForm /></W>} />,
  <Route key="admin-tnai-units-edit" path="/admin/tnai-units/edit/:id" element={<W><TnaiUnitForm /></W>} />,
  <Route key="admin-tnai-units-view" path="/admin/tnai-units/view/:id" element={<W><TnaiUnitView /></W>} />,
  
  <Route key="admin-impacts" path="/admin/impacts" element={<W><Impacts /></W>} />,
  <Route key="admin-impacts-add" path="/admin/impacts/add" element={<W><ImpactForm /></W>} />,
  <Route key="admin-impacts-edit" path="/admin/impacts/edit/:id" element={<W><ImpactForm /></W>} />,
  <Route key="admin-impacts-view" path="/admin/impacts/view/:id" element={<W><ImpactView /></W>} />,
  
  <Route key="admin-students" path="/admin/students" element={<W><StudentDetails /></W>} />,
  <Route key="admin-students-add" path="/admin/students/add" element={<W><StudentDetailForm /></W>} />,
  <Route key="admin-students-edit" path="/admin/students/edit/:id" element={<W><StudentDetailForm /></W>} />,
  <Route key="admin-students-view" path="/admin/students/view/:id" element={<W><StudentDetailView /></W>} />,
  
  <Route key="admin-sna-office-bearers" path="/admin/sna-office-bearers" element={<W><SnaOfficeBearers /></W>} />,
  <Route key="admin-sna-office-bearers-add" path="/admin/sna-office-bearers/add" element={<W><SnaOfficeBearerForm /></W>} />,
  <Route key="admin-sna-office-bearers-edit" path="/admin/sna-office-bearers/edit/:id" element={<W><SnaOfficeBearerForm /></W>} />,
  <Route key="admin-sna-office-bearers-view" path="/admin/sna-office-bearers/view/:id" element={<W><SnaOfficeBearerView /></W>} />,
  
  <Route key="admin-institution-profile" path="/admin/institution-profile" element={<W><InstitutionProfiles /></W>} />,
  <Route key="admin-institution-profile-add" path="/admin/institution-profile/add" element={<W><InstitutionProfileForm /></W>} />,
  <Route key="admin-institution-profile-edit" path="/admin/institution-profile/edit/:id" element={<W><InstitutionProfileForm /></W>} />,
  <Route key="admin-institution-profile-view" path="/admin/institution-profile/view/:id" element={<W><InstitutionProfileView /></W>} />,
  <Route key="admin-users" path="/admin/manage-users" element={<W><ManageUsers /></W>} />,
  <Route key="admin-deals" path="/admin/deals" element={<W><Deals /></W>} />,
  <Route key="admin-leads" path="/admin/leads" element={<W><Leads /></W>} />,
  <Route key="admin-blog"      path="/admin/blog"          element={<W><Blog /></W>} />,
  <Route key="admin-blog-add"  path="/admin/blog/add"       element={<W><BlogForm /></W>} />,
  <Route key="admin-blog-edit" path="/admin/blog/edit/:id"  element={<W><BlogForm /></W>} />,
  <Route key="admin-blog-view" path="/admin/blog/view/:id"  element={<W><BlogView /></W>} />,

  <Route key="admin-enquiry"      path="/admin/enquiry"          element={<W><Enquiry /></W>} />,
  <Route key="admin-enquiry-add"  path="/admin/enquiry/add"       element={<W><EnquiryForm /></W>} />,
  <Route key="admin-enquiry-edit" path="/admin/enquiry/edit/:id"  element={<W><EnquiryForm /></W>} />,
  <Route key="admin-enquiry-view" path="/admin/enquiry/view/:id"  element={<W><EnquiryView /></W>} />,

  <Route key="admin-product-enquiry"      path="/admin/product-enquiry"           element={<W><ProductEnquiry /></W>} />,
  <Route key="admin-product-enquiry-view" path="/admin/product-enquiry/view/:id"  element={<W><ProductEnquiryView /></W>} />,

  <Route key="admin-calendar" path="/apps-calendar" element={<W><Calendar /></W>} />,
  <Route key="admin-chat" path="/apps-chat" element={<W><Chat /></W>} />,
  <Route key="admin-email-inbox" path="/apps-email-inbox" element={<W><EmailInbox /></W>} />,
  <Route key="admin-email-read" path="/apps-email-read" element={<W><EmailRead /></W>} />,
  <Route key="admin-invoices-list" path="/apps-invoices-list" element={<W><InvoiceList /></W>} />,
  <Route key="admin-invoices-detail" path="/apps-invoices-detail" element={<W><InvoiceDetail /></W>} />,
  <Route key="admin-contacts-grid" path="/apps-contacts-grid" element={<W><ContactsGrid /></W>} />,
  <Route key="admin-contacts-list" path="/apps-contacts-list" element={<W><ContactsList /></W>} />,
  <Route key="admin-contacts-profile" path="/apps-contacts-profile" element={<W><ContactsProfile /></W>} />,
      // UI Components
      <Route key="ui-alerts"          path="/ui-alerts"          element={<W><Alerts /></W>} />,
      <Route key="ui-buttons"         path="/ui-buttons"         element={<W><Buttons /></W>} />,
      <Route key="ui-cards"           path="/ui-cards"           element={<W><Cards /></W>} />,
      <Route key="ui-carousel"        path="/ui-carousel"        element={<W><Carousel /></W>} />,
      <Route key="ui-colors"          path="/ui-colors"          element={<W><Colors /></W>} />,
      <Route key="ui-dropdowns"       path="/ui-dropdowns"       element={<W><Dropdowns /></W>} />,
      <Route key="ui-general"         path="/ui-general"         element={<W><General /></W>} />,
      <Route key="ui-grid"            path="/ui-grid"            element={<W><Grid /></W>} />,
      <Route key="ui-images"          path="/ui-images"          element={<W><Images /></W>} />,
      <Route key="ui-modals"          path="/ui-modals"          element={<W><Modals /></W>} />,
      <Route key="ui-offcanvas"       path="/ui-offcanvas"       element={<W><Offcanvas /></W>} />,
      <Route key="ui-placeholders"    path="/ui-placeholders"    element={<W><Placeholders /></W>} />,
      <Route key="ui-progressbars"    path="/ui-progressbars"    element={<W><ProgressBars /></W>} />,
      <Route key="ui-tabs-accordions" path="/ui-tabs-accordions" element={<W><TabsAccordions /></W>} />,
      <Route key="ui-typography"      path="/ui-typography"      element={<W><Typography /></W>} />,
      <Route key="ui-toasts"          path="/ui-toasts"          element={<W><UIToasts /></W>} />,
      <Route key="ui-video"           path="/ui-video"           element={<W><UIVideo /></W>} />,
      <Route key="ui-utilities"       path="/ui-utilities"       element={<W><UIUtilities /></W>} />,

      // Forms
      <Route key="form-elements"   path="/form-elements"   element={<W><FormElements /></W>} />,
      <Route key="form-validation" path="/form-validation" element={<W><FormValidation /></W>} />,
      <Route key="form-advanced"   path="/form-advanced"   element={<W><FormAdvanced /></W>} />,
      <Route key="form-editors"    path="/form-editors"    element={<W><FormEditors /></W>} />,
      <Route key="form-uploads"    path="/form-uploads"    element={<W><FormUploads /></W>} />,
      <Route key="form-wizard"     path="/form-wizard"     element={<W><FormWizard /></W>} />,
      <Route key="form-mask"       path="/form-mask"       element={<W><FormMask /></W>} />,

      // Tables
      <Route key="tables-basic"      path="/tables-basic"      element={<W><TablesBasic /></W>} />,
      <Route key="tables-datatable"  path="/tables-datatable"  element={<W><TablesDataTable /></W>} />,
      <Route key="tables-responsive" path="/tables-responsive" element={<W><TablesResponsive /></W>} />,
      <Route key="tables-editable"   path="/tables-editable"   element={<W><TablesEditable /></W>} />,

      // Pages
      <Route key="pages-starter"    path="/pages-starter"    element={<W><PagesStarter /></W>} />,
      <Route key="pages-timeline"   path="/pages-timeline"   element={<W><PagesTimeline /></W>} />,
      <Route key="pages-faqs"       path="/pages-faqs"       element={<W><PagesFAQs /></W>} />,
      <Route key="pages-pricing"    path="/pages-pricing"    element={<W><PagesPricing /></W>} />,
      <Route key="pages-comingsoon" path="/pages-comingsoon" element={<PagesComingSoon />} />,
      <Route key="pages-maintenance" path="/pages-maintenance" element={<PagesMaintenance />} />,

      // Extended
      <Route key="ext-lightbox"        path="/extended-lightbox"         element={<W><ExtendedLightbox /></W>} />,
      <Route key="ext-rangeslider"     path="/extended-rangeslider"      element={<W><ExtendedRangeSlider /></W>} />,
      <Route key="ext-sweet-alert"     path="/extended-sweet-alert"      element={<W><ExtendedSweetAlert /></W>} />,
      <Route key="ext-rating"          path="/extended-rating"           element={<W><ExtendedRating /></W>} />,
      <Route key="ext-notifications"   path="/extended-notifications"    element={<W><ExtendedNotifications /></W>} />,
      <Route key="ext-session-timeout" path="/extended-session-timeout"  element={<W><ExtendedSessionTimeout /></W>} />,

      // Charts
      <Route key="charts-apex"      path="/charts-apex"      element={<W><ChartsApex /></W>} />,
      <Route key="charts-echart"    path="/charts-echart"    element={<W><ChartsEChart /></W>} />,
      <Route key="charts-chartjs"   path="/charts-chartjs"   element={<W><ChartsChartjs /></W>} />,
      <Route key="charts-knob"      path="/charts-knob"      element={<W><ChartsKnob /></W>} />,
      <Route key="charts-sparkline" path="/charts-sparkline" element={<W><ChartsSparkline /></W>} />,

      // Icons
      <Route key="icons-boxicons"      path="/icons-boxicons"      element={<W><IconsBoxicons /></W>} />,
      <Route key="icons-materialdesign" path="/icons-materialdesign" element={<W><IconsMaterialDesign /></W>} />,
      <Route key="icons-dripicons"     path="/icons-dripicons"     element={<W><IconsDripicons /></W>} />,
      <Route key="icons-fontawesome"   path="/icons-fontawesome"   element={<W><IconsFontAwesome /></W>} />,

      // Custom Pages 
      <Route key="custom-list" path="/custom-list" element={<W><CustomList /></W>} />,
      <Route key="custom-create" path="/custom-create" element={<W><CustomCreate /></W>} />,
      <Route key="custom-edit" path="/custom-edit" element={<W><CustomEdit /></W>} />,

      // Maps 
      <Route key="maps-google" path="/maps-google" element={<W><MapsGoogle /></W>} />,
      <Route key="maps-vector" path="/maps-vector" element={<W><MapsVector /></W>} />,
      <Route key="maps-leaflet" path="/maps-leaflet" element={<W><MapsLeaflet /></W>} />,
];

export default CRMRoutes;
