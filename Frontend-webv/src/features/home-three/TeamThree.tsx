import React from 'react';
import { Link } from 'react-router';

import team3Img1 from '../../assets/images/team/team-3-1.jpg';
import team3Img2 from '../../assets/images/team/team-3-2.jpg';
import team3Img3 from '../../assets/images/team/team-3-3.jpg';
import TextAnimation from '../../components/elements/TextAnimation';
import FadeInAdvanced, { type AnimationVariant } from '../../components/elements/FadeInAdvanced';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface SocialLink {
    icon: string;
    href: string;
    label: string;
}

interface TeamMember {
    id: number;
    image: string;
    name: string;
    role: string;
    path: string;
    animation: AnimationVariant;
    animationDelay: number;
    socials: SocialLink[];
}

const defaultSocials: SocialLink[] = [
    { icon: 'icon-facebook', href: '#', label: 'Facebook' },
    { icon: 'icon-instagram', href: '#', label: 'Instagram' },
    { icon: 'icon-xpa', href: '#', label: 'X' },
    { icon: 'icon-link-in', href: '#', label: 'LinkedIn' },
];

const teamMembers: TeamMember[] = [
    {
        id: 1,
        image: team3Img1,
        name: 'Darlene Robertson',
        role: 'Nursing Assistant',
        path: '/about',
        animation: 'fadeInLeft',
        animationDelay: 100,
        socials: defaultSocials,
    },
    {
        id: 2,
        image: team3Img2,
        name: 'Dianne Russell',
        role: 'Dental Specialist',
        path: '/about',
        animation: 'fadeInUp',
        animationDelay: 300,
        socials: defaultSocials,
    },
    {
        id: 3,
        image: team3Img3,
        name: 'Leslie Alexander',
        role: 'Medical Assistant',
        path: '/about',
        animation: 'fadeInRight',
        animationDelay: 500,
        socials: defaultSocials,
    },
];

const TeamThree: React.FC = () => {
    return (
        <SectionWrapper id='team' className="team-three">
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Best Team
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation>Meet Our Professional <br /> Team Member</TextAnimation>
                    </h3>
                </div>

                <div className="row">
                    {teamMembers.map((member) => (
                        <FadeInAdvanced
                            key={member.id}
                            className={`col-xl-4 col-lg-4 ${member.animation}`}
                            delay={member.animationDelay}
                            variant={member.animation}
                        >
                            <div className="team-three__single">
                                <div className="team-three__img-box">
                                    <div className="team-three__img">
                                        <img src={member.image} alt={member.name} />
                                    </div>
                                </div>
                                <div className="team-three__content">
                                    <div className="team-three__title-box">
                                        <h3 className="team-three__title">
                                            <Link to={member.path}>{member.name}</Link>
                                        </h3>
                                        <p className="team-three__sub-title">{member.role}</p>
                                    </div>
                                    <div className="team-three__arrow-and-social">
                                        <div className="team-three__arrow">
                                            <span className="icon-arrow-right"></span>
                                        </div>
                                        <div className="team-three__social">
                                            {member.socials.map((social) => (
                                                <a key={social.icon} href={social.href} aria-label={social.label}>
                                                    <span className={social.icon}></span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeInAdvanced>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default TeamThree;