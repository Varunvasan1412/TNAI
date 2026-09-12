import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import App from '../App';
import HomeOneLayout from '../layout/HomeOneLayout';
import HomeTwoLayout from '../layout/HomeTwoLayout';
import HomeThreeLayout from '../layout/HomeThreeLayout';
import ErrorBoundary from '../components/elements/ErrorBoundary';
import SuspenseWrapper from '../components/elements/SuspenseWrapper';
import DefaultLayout from '../layout/DefaultLayout';
import ErrorPage from '../pages/error-404/ErrorPage';

const HomeThreeSonglePage = lazy(() => import('../home/HomeThreeSonglePage'));
const HomeTwoSinglePage = lazy(() => import('../home/HomeTwoSinglePage'));
const HomeOneSinglePage = lazy(() => import('../home/HomeOneSinglePage'));

const About   = lazy(() => import('../pages/about/About'));
const Contact = lazy(() => import('../pages/contact/Contact'));
const Gallery = lazy(() => import('../pages/gallery/Gallery'));
const Test3DPage = lazy(() => import('../pages/test-3d/Test3DPage'));
const Terms = lazy(() => import('../pages/terms/Terms'));
const Privacy = lazy(() => import('../pages/privacy/Privacy'));
const Events = lazy(() => import('../pages/events/Events'));

const HomeOne = lazy(() => import('../home/HomeOne'));
const HomeTwo = lazy(() => import('../home/HomeTwo'));
const HomeThree = lazy(() => import('../home/HomeThree'));

const ROUTER = createBrowserRouter([
    {
        path: "/",
        element: <ErrorBoundary name='Root component App'><App /></ErrorBoundary>,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <HomeOneLayout />,
                children: [
                    {
                        path: "/",
                        element: <ErrorBoundary name='Home One'><SuspenseWrapper><HomeOne /></SuspenseWrapper></ErrorBoundary>
                    },
                    {
                        path: "/single-page-home-one",
                        element: <ErrorBoundary name='Home One Single Page'><SuspenseWrapper><HomeOneSinglePage /></SuspenseWrapper></ErrorBoundary>
                    },
                ]
            },
            {
                element: <HomeTwoLayout />,
                children: [
                    {
                        path: "/home-two",
                        element: <ErrorBoundary name='Home Two'><SuspenseWrapper><HomeTwo /></SuspenseWrapper></ErrorBoundary>
                    },
                    {
                        path: "/single-page-home-two",
                        element: <ErrorBoundary name='Home Two Single Page'><SuspenseWrapper><HomeTwoSinglePage /></SuspenseWrapper></ErrorBoundary>
                    }
                ]
            },
            {
                element: <HomeThreeLayout />,
                children: [
                    {
                        path: "/home-three",
                        element: <ErrorBoundary name='Home Three'><SuspenseWrapper><HomeThree /></SuspenseWrapper></ErrorBoundary>
                    },
                    {
                        path: "/single-page-home-three",
                        element: <ErrorBoundary name='Home Three Single Page'><SuspenseWrapper><HomeThreeSonglePage /></SuspenseWrapper></ErrorBoundary>
                    },
                ]
            },
            {
                element: <DefaultLayout />,
                children: [
                    { path: "/about",                element: <ErrorBoundary name='About'><SuspenseWrapper><About /></SuspenseWrapper></ErrorBoundary> },
                    { path: "/gallery",              element: <ErrorBoundary name='Gallery'><SuspenseWrapper><Gallery /></SuspenseWrapper></ErrorBoundary> },
                    { path: "/events",               element: <ErrorBoundary name='Events'><SuspenseWrapper><Events /></SuspenseWrapper></ErrorBoundary> },
                    { path: "/contact",              element: <ErrorBoundary name='Contact'><SuspenseWrapper><Contact /></SuspenseWrapper></ErrorBoundary> },
                    { path: "/test-3d",              element: <ErrorBoundary name='Test 3D'><SuspenseWrapper><Test3DPage /></SuspenseWrapper></ErrorBoundary> },
                    { path: "/terms-and-conditions", element: <ErrorBoundary name='Terms'><SuspenseWrapper><Terms /></SuspenseWrapper></ErrorBoundary> },
                    { path: "/privacy-policy",       element: <ErrorBoundary name='Privacy'><SuspenseWrapper><Privacy /></SuspenseWrapper></ErrorBoundary> },
                ]
            },
        ]
    }
])

export default ROUTER;
