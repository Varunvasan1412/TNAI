import React, { useState } from 'react';
import { Link } from 'react-router';

import project3Img1 from '../../assets/images/project/project-3-1.jpg';
import project3Img3 from '../../assets/images/project/project-3-3.jpg';
import project3Img4 from '../../assets/images/project/project-3-4.jpg';
import project3Img5 from '../../assets/images/project/project-3-5.jpg';
import TextAnimation from '../../components/elements/TextAnimation';
import FadeInAdvanced, { type AnimationVariant } from '../../components/elements/FadeInAdvanced';
import Lightbox from 'yet-another-react-lightbox';
import SectionWrapper from '../../components/elements/SectionWrapper';

type FilterCategory = 'office' | 'house' | 'corporate' | 'all';

interface FilterItem {
    label: string;
    filter: FilterCategory;
}

interface ProjectItem {
    id: number;
    image: string;
    popupImage: string;
    title: string;
    location: string;
    categories: FilterCategory[];
    path: string;
    animationClass: AnimationVariant,
    animationDelay: number,
}


const filterItems: FilterItem[] = [
    { label: 'All', filter: 'all' },
    { label: 'Office', filter: 'office' },
    { label: 'House', filter: 'house' },
    { label: 'Corporate', filter: 'corporate' },
];

const projectItems: ProjectItem[] = [
    {
        id: 1,
        image: project3Img1,
        popupImage: project3Img1,
        title: 'Maintenance Service',
        location: 'Los Angeles, USA',
        categories: ['office', 'corporate'],
        path: '/products',
        animationClass: 'fadeInRight',
        animationDelay: 50,
    },
    {
        id: 2,
        image: project3Img5,
        popupImage: project3Img1,
        title: 'Lighting & Fixtures',
        location: 'Los Angeles, USA',
        categories: ['corporate', 'house'],
        path: '/products',
        animationClass: 'fadeInUp',
        animationDelay: 50,
    },
    {
        id: 3,
        image: project3Img3,
        popupImage: project3Img1,
        title: 'Electric Repair',
        location: 'Los Angeles, USA',
        categories: ['corporate', 'house', 'office'],
        path: '/products',
        animationClass: 'fadeInLeft',
        animationDelay: 50,
    },
    {
        id: 4,
        image: project3Img4,
        popupImage: project3Img1,
        title: 'Debris Stuck',
        location: 'Los Angeles, USA',
        categories: ['office', 'corporate'],
        path: '/products',
        animationClass: 'fadeInUp',
        animationDelay: 50,
    },
    {
        id: 5,
        image: project3Img5,
        popupImage: project3Img1,
        title: 'Maintenance Service',
        location: 'Los Angeles, USA',
        categories: ['house', 'corporate'],
        path: '/products',
        animationClass: 'fadeInRight',
        animationDelay: 50,
    },
    {
        id: 6,
        image: project3Img3,
        popupImage: project3Img1,
        title: 'Maintenance Service',
        location: 'Los Angeles, USA',
        categories: ['house'],
        path: '/products',
        animationClass: 'fadeInUp',
        animationDelay: 50,
    },
];

const ProjectThree: React.FC = () => {
    const [filterCatagory, setFilterCatagory] = useState<FilterCategory>("all");
    const [projects, setProject] = useState<ProjectItem[]>(projectItems);

    const handleFilter = (catagiryName: FilterCategory): void => {
        setFilterCatagory(catagiryName);
        if (catagiryName !== "all") {
            const filterProject = projectItems.filter((item: ProjectItem) => item.categories.includes(catagiryName));
            setProject(filterProject);
        }
        if (catagiryName === "all") setProject(projectItems)
    }

    const [openLightBox, setOpenLightBox] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const images: string[] = projectItems.map(project => project.image);

    return (
        <SectionWrapper id='projects' className="project-three">
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Our Gallery
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation>Your Brightest Choice in Repairs</TextAnimation>
                    </h3>
                </div>

                <div className="project-three__menu-box">
                    <ul className="project-filter clearfix post-filter has-dynamic-filters-counter list-unstyled">
                        {filterItems.map((item) => (
                            <li
                                key={item.filter}
                                onClick={() => handleFilter(item.filter)}
                                className={filterCatagory === item?.filter ? 'active' : ''}
                            >
                                <span className="filter-text">{item.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="row filter-layout masonary-layout">
                    {projects.map((project, i) => (
                        <FadeInAdvanced
                            key={`${project.id}-${filterCatagory}`}
                            className={`col-xl-4 col-lg-4 col-md-6 filter-item `}
                            variant={project.animationClass}
                            delay={project?.animationDelay}
                            duration={500}
                        >
                            <div className="project-three__single">
                                <div className="project-three__img-box">
                                    <div className="project-three__img">
                                        <img src={project.image} alt={project.title} />
                                        <div className="project-three__arrow" onClick={() => { setIndex(i); setOpenLightBox((pre: boolean) => !pre) }}>
                                            <Link className="img-popup" to={"#"}>
                                                <span className="icon-plus"></span>
                                            </Link>
                                        </div>
                                        <div className="project-three__content">
                                            <h2>
                                                <Link to={project.path}>{project.title}</Link>
                                            </h2>
                                            <p>{project.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInAdvanced>
                    ))}
                </div>
            </div>
            <Lightbox
                open={openLightBox}
                close={() => setOpenLightBox(false)}
                index={index}
                slides={images.map((src) => ({ src }))}
            />
        </SectionWrapper>
    );
};

export default ProjectThree;