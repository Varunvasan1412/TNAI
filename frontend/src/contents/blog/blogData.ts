import blogImg1 from '../../assets/images/blog/blog-1-1.jpg';
import blogImg2 from '../../assets/images/blog/blog-1-2.jpg';
import blogImg7 from '../../assets/images/blog/blog-1-4.jpg';
import blogImg8 from '../../assets/images/blog/blog-1-5.jpg';
import blogImg10 from '../../assets/images/blog/blog-1-7.jpg';
import blogImg11 from '../../assets/images/blog/blog-1-8.jpg';

import blogImg4 from '../../assets/images/blog/blog-2-1.jpg';
import blogImg5 from '../../assets/images/blog/blog-2-2.jpg';
import blogImg6 from '../../assets/images/blog/blog-2-3.jpg';

import BlogList11 from '../../assets/images/blog/blog-list-1-1.jpg';
import BlogList12 from '../../assets/images/blog/blog-list-1-2.jpg';
import BlogList13 from '../../assets/images/blog/blog-list-1-3.jpg';

import type { AnimationVariant } from '../../components/elements/FadeInAdvanced';

interface BlogPost {
    id: number;
    slug: string;
    image: string;
    dateDay: string;
    dateMonth: string;
    author: string;
    comments: string;
    title: string;
    text?: string;
    to: string;
    animation: AnimationVariant;
    animationDelay: number;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        slug: 'choosing-right-working-electrode',
        image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=410&h=240&fit=crop&q=85',
        dateDay: '14',
        dateMonth: 'May',
        author: 'By RSI Team',
        comments: '03 Comments',
        title: 'Choosing the Right Working Electrode for Electrochemical Research',
        text: 'A guide to selecting glassy carbon, gold, platinum and screen-printed electrodes for your specific electrochemical application.',
        to: '/blog/choosing-right-working-electrode',
        animation: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 2,
        slug: 'pem-vs-aem-electrolysers',
        image: 'https://images.unsplash.com/photo-1694230155228-cdde50083573?w=410&h=240&fit=crop&q=85',
        dateDay: '02',
        dateMonth: 'Apr',
        author: 'By RSI Team',
        comments: '05 Comments',
        title: 'PEM vs AEM Electrolysers: Which is Right for Your Lab?',
        text: 'An in-depth comparison of PEM and AEM electrolyser technologies, covering efficiency, cost, and suitability for hydrogen research.',
        to: '/blog/pem-vs-aem-electrolysers',
        animation: 'fadeInUp',
        animationDelay: 300,
    },
    {
        id: 3,
        slug: 'carbon-materials-battery-research',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=410&h=240&fit=crop&q=85',
        dateDay: '18',
        dateMonth: 'Mar',
        author: 'By RSI Team',
        comments: '04 Comments',
        title: 'Carbon Materials for Battery Research: From Felt to Carbon Black',
        text: 'Exploring carbon cloth, carbon felt, graphene and conductive carbon black as key electrode materials in energy storage systems.',
        to: '/blog/carbon-materials-battery-research',
        animation: 'fadeInRight',
        animationDelay: 500,
    },
    {
        id: 4,
        slug: 'cyclic-voltammetry-guide',
        image: blogImg10,
        dateDay: '12',
        dateMonth: 'Nov',
        author: 'By RSI Team',
        comments: '07 Comments',
        title: "Understanding Cyclic Voltammetry: A Beginner's Guide",
        text: 'A comprehensive introduction to cyclic voltammetry and its applications in electrochemical research.',
        to: '/blog/cyclic-voltammetry-guide',
        animation: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 5,
        slug: 'electrochemical-selection-guide',
        image: blogImg11,
        dateDay: '25',
        dateMonth: 'Dec',
        author: 'By Admin',
        comments: '06 Comments',
        title: 'The Selection Point Erase in Certain Circumstances And Owing',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/electrochemical-selection-guide',
        animation: 'fadeInUp',
        animationDelay: 300,
    },
    {
        id: 6,
        slug: 'electrochemical-reaction-kinetics',
        image: blogImg10,
        dateDay: '23',
        dateMonth: 'Aug',
        author: 'By Admin',
        comments: '08 Comments',
        title: 'Secure to Other Greater Pleasures, or The Selection Point.',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/electrochemical-reaction-kinetics',
        animation: 'fadeInRight',
        animationDelay: 500,
    },
    {
        id: 7,
        slug: 'cyclic-voltammetry-applications',
        image: blogImg1,
        dateDay: '12',
        dateMonth: 'Nov',
        author: 'By Admin',
        comments: '05 Comments',
        title: 'Elase They Endures Pains to Avoid The Worse Pains Taken',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/cyclic-voltammetry-applications',
        animation: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 8,
        slug: 'battery-analysis-methods',
        image: blogImg2,
        dateDay: '24',
        dateMonth: 'Aug',
        author: 'By Admin',
        comments: '07 Comments',
        title: 'What Is The Best Affordable Android Phone In 2023?',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/battery-analysis-methods',
        animation: 'fadeInUp',
        animationDelay: 300,
    },
    {
        id: 9,
        slug: 'drain-line-electrochemical-testing',
        image: blogImg8,
        dateDay: '09',
        dateMonth: 'Jan',
        author: 'By Admin',
        comments: '04 Comments',
        title: 'Water leakage can be due to a clogged drain line',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/drain-line-electrochemical-testing',
        animation: 'fadeInRight',
        animationDelay: 500,
    },
    {
        id: 10,
        slug: 'electrode-durability-testing',
        image: blogImg10,
        dateDay: '12',
        dateMonth: 'Nov',
        author: 'By Admin',
        comments: '07 Comments',
        title: 'Elapse They Endures Pains to Avoid Taken To Clean',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/electrode-durability-testing',
        animation: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 11,
        slug: 'cv-peak-analysis',
        image: blogImg1,
        dateDay: '12',
        dateMonth: 'Nov',
        author: 'By Admin',
        comments: '05 Comments',
        title: 'Elase They Endures Pains to Avoid The Worse Pains Taken',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/cv-peak-analysis',
        animation: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 12,
        slug: 'conductive-materials-research',
        image: blogImg2,
        dateDay: '24',
        dateMonth: 'Aug',
        author: 'By Admin',
        comments: '07 Comments',
        title: 'What Is The Best Affordable Android Phone In 2023?',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/conductive-materials-research',
        animation: 'fadeInUp',
        animationDelay: 300,
    },
    {
        id: 13,
        slug: 'water-leakage-testing',
        image: blogImg7,
        dateDay: '09',
        dateMonth: 'Jan',
        author: 'By Admin',
        comments: '04 Comments',
        title: 'Water leakage can be due to a clogged drain line',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/water-leakage-testing',
        animation: 'fadeInRight',
        animationDelay: 500,
    },
    {
        id: 14,
        slug: 'electrode-cleaning-protocols',
        image: blogImg11,
        dateDay: '12',
        dateMonth: 'Nov',
        author: 'By Admin',
        comments: '07 Comments',
        title: 'Elapse They Endures Pains to Avoid Taken To Clean',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/electrode-cleaning-protocols',
        animation: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 15,
        slug: 'electrochemical-kinetics-advanced',
        image: blogImg10,
        dateDay: '25',
        dateMonth: 'Dec',
        author: 'By Admin',
        comments: '06 Comments',
        title: 'The Selection Point Erase in Certain Circumstances And Owing',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/electrochemical-kinetics-advanced',
        animation: 'fadeInUp',
        animationDelay: 300,
    },
];


export interface BlogStandardPost {
    id: number;
    slug: string;
    image: string;
    day: string;
    month: string;
    author: string;
    commentsCount: number;
    readTime: string;
    title: string;
    text: string;
    link: string;
}

export const blogStandardData: BlogStandardPost[] = [
    {
        id: 1,
        slug: 'logistic-services-quality',
        image: BlogList11,
        day: "12",
        month: "Nov",
        author: "Admin",
        commentsCount: 5,
        readTime: "4 Min Read",
        title: "We Ensures That Best Quality Logistic Services Provides.",
        text: "Out enigma ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/blog/logistic-services-quality"
    },
    {
        id: 2,
        slug: 'digital-supply-strategy',
        image: BlogList12,
        day: "15",
        month: "Aug",
        author: "Admin",
        commentsCount: 5,
        readTime: "4 Min Read",
        title: "The Advantages of a Digital Supply Strategy",
        text: "Out enigma ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/blog/digital-supply-strategy"
    },
    {
        id: 3,
        slug: 'greenhouse-gas-logistics',
        image: BlogList13,
        day: "22",
        month: "Feb",
        author: "Admin",
        commentsCount: 5,
        readTime: "4 Min Read",
        title: "Logistics Announces Launch of The Safe Greenhouse Gas",
        text: "Out enigma ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/blog/greenhouse-gas-logistics"
    },
    {
        id: 4,
        slug: 'logistic-services-advanced',
        image: BlogList11,
        day: "12",
        month: "Nov",
        author: "Admin",
        commentsCount: 5,
        readTime: "4 Min Read",
        title: "We Ensures That Best Quality Logistic Services Provides.",
        text: "Out enigma ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/blog/logistic-services-advanced"
    },
    {
        id: 5,
        slug: 'digital-supply-management',
        image: BlogList12,
        day: "15",
        month: "Aug",
        author: "Admin",
        commentsCount: 5,
        readTime: "4 Min Read",
        title: "The Advantages of a Digital Supply Strategy",
        text: "Out enigma ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        link: "/blog/digital-supply-management"
    },
];


export const blogOnePosts = blogPosts.slice(0, 3);

export const blogTwoPosts: BlogPost[] = [
    {
        id: 101,
        slug: 'corrosion-testing-methods',
        image: blogImg4,
        dateDay: '12',
        dateMonth: 'Nov',
        author: 'By Admin',
        comments: '07 Comments',
        title: 'Elapse They Endures Pains to Avoid Taken To Clean',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/corrosion-testing-methods',
        animation: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 102,
        slug: 'sensor-development-guide',
        image: blogImg5,
        dateDay: '25',
        dateMonth: 'Dec',
        author: 'By Admin',
        comments: '06 Comments',
        title: 'The Selection Point Erase in Certain Circumstances And Owing',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/sensor-development-guide',
        animation: 'fadeInUp',
        animationDelay: 300,
    },
    {
        id: 103,
        slug: 'material-characterization-electrochemical',
        image: blogImg6,
        dateDay: '23',
        dateMonth: 'Aug',
        author: 'By Admin',
        comments: '08 Comments',
        title: 'Secure to Other Greater Pleasures, or The Selection Point.',
        text: 'Secure to other greater pleasures, or the selection point. But in certain circumstances',
        to: '/blog/material-characterization-electrochemical',
        animation: 'fadeInRight',
        animationDelay: 500,
    },
];
