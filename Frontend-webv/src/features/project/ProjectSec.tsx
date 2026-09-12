import React, { useState } from "react";
import { Link } from "react-router";

import project1 from "../../assets/images/project/project-1-1.jpg";
import project2 from "../../assets/images/project/project-1-2.jpg";
import project3 from "../../assets/images/project/project-1-3.jpg";
import project4 from "../../assets/images/project/project-1-4.jpg";
import project5 from "../../assets/images/project/project-1-5.jpg";
import project6 from "../../assets/images/project/project-1-6.jpg";
import project7 from "../../assets/images/project/project-1-7.jpg";
import FadeInAdvanced from "../../components/elements/FadeInAdvanced";
import Lightbox from "yet-another-react-lightbox";

interface Project {
    id: number;
    image: string;
    subTitle: string;
    title: string;
    animationDirection: "fadeInLeft" | "fadeInRight";
    animationDelay: number;
}

const projects: Project[] = [
    {
        id: 1,
        image: project1,
        subTitle: "Express Electric",
        title: "Charging Issues",
        animationDirection: "fadeInLeft",
        animationDelay: 100,
    },
    {
        id: 2,
        image: project2,
        subTitle: "Computer Repair",
        title: "Hardware Update",
        animationDirection: "fadeInLeft",
        animationDelay: 200,
    },
    {
        id: 3,
        image: project3,
        subTitle: "Express Electric",
        title: "Charging Issues",
        animationDirection: "fadeInRight",
        animationDelay: 300,
    },
    {
        id: 4,
        image: project4,
        subTitle: "Recovery",
        title: "Hardware & Software",
        animationDirection: "fadeInRight",
        animationDelay: 400,
    },
    {
        id: 5,
        image: project5,
        subTitle: "Mac Repair",
        title: "Apple iPhone Repair",
        animationDirection: "fadeInLeft",
        animationDelay: 500,
    },
    {
        id: 6,
        image: project6,
        subTitle: "Camera Repair",
        title: "Microphone Faults",
        animationDirection: "fadeInLeft",
        animationDelay: 600,
    },
    {
        id: 7,
        image: project7,
        subTitle: "Express Electric",
        title: "Battery Replacement",
        animationDirection: "fadeInRight",
        animationDelay: 700,
    },
    {
        id: 8,
        image: project2,
        subTitle: "Computer Repair",
        title: "Hardware Update",
        animationDirection: "fadeInRight",
        animationDelay: 800,
    },
];

const ProjectSec: React.FC = () => {
    const [openLightBox, setOpenLightBox] = useState<boolean>(false);
        const [index, setIndex] = useState<number>(0);
        const images: string[] = projects.map(project => project.image);
    return (
        <section className="project-page">
            <div className="container">
                <div className="row">
                    {projects.map((project,idx) => (
                        <FadeInAdvanced
                            key={project.id}
                            className={`col-xl-3 col-lg-6 col-md-6`}
                            variant={project.animationDirection}
                            delay={project.animationDelay}
                        >
                            <div className="project-one__single">
                                <div className="project-one__img-box">
                                    <div className="project-one__img">
                                        <img
                                            src={project.image}
                                            alt={`${project.subTitle} - ${project.title}`}
                                        />
                                        <div className="project-one__arrow" onClick={() => { setIndex(idx); setOpenLightBox(true) }} >
                                            <Link to={"#"} className="img-popup" aria-label={`View full image of ${project.title}`} >
                                                <span className="icon-arrow-right"></span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="project-one__content">
                                        <p className="project-one__sub-title">{project.subTitle}</p>
                                        <h3 className="project-one__title">
                                            <Link to="/products">{project.title}</Link>
                                        </h3>
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
        </section>
    );
};

export default ProjectSec;