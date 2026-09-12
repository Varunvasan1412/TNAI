import React from 'react';
import { Link } from 'react-router';
 
import teamImg1 from '../../assets/images/team/team-2-1.jpg';
import teamImg2 from '../../assets/images/team/team-2-2.jpg';
import teamImg3 from '../../assets/images/team/team-2-3.jpg';
import teamImg4 from '../../assets/images/team/team-2-4.jpg';
import type { AnimationVariant } from '../../components/elements/FadeInAdvanced';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import TextAnimation from '../../components/elements/TextAnimation';
import SectionWrapper from '../../components/elements/SectionWrapper';

interface SocialLink {
    iconClass: string;
    href: string;
}

interface TeamMember {
    id: number;
    image: string;
    name: string;
    subTitle: string;
    to: string;
    animationClass: AnimationVariant;
    animationDelay: number;
    socials: SocialLink[];
}

const defaultSocials: SocialLink[] = [
    { iconClass: 'icon-facebook', href: '#' },
    { iconClass: 'icon-instagram', href: '#' },
    { iconClass: 'icon-link-in', href: '#' },
    { iconClass: 'icon-xpa', href: '#' },
];

const teamMembers: TeamMember[] = [
    {
        id: 1,
        image: teamImg1,
        name: 'Wade Warren',
        subTitle: 'A/C Technicians',
        to: '/about',
        animationClass: 'fadeInLeft',
        animationDelay: 100,
        socials: defaultSocials,
    },
    {
        id: 2,
        image: teamImg2,
        name: 'Adam Smith',
        subTitle: 'Senior Electrician',
        to: '/about',
        animationClass: 'fadeInLeft',
        animationDelay: 300,
        socials: defaultSocials,
    },
    {
        id: 3,
        image: teamImg3,
        name: 'Harbert Spin',
        subTitle: 'Support Specialist',
        to: '/about',
        animationClass: 'fadeInRight',
        animationDelay: 500,
        socials: defaultSocials,
    },
    {
        id: 4,
        image: teamImg4,
        name: 'Darrell Steward',
        subTitle: 'A/C Specialist',
        to: '/about',
        animationClass: 'fadeInRight',
        animationDelay: 700,
        socials: defaultSocials,
    },
];

const TeamTwo: React.FC = () => {
    return (
        <SectionWrapper id='team' className="team-two">
            <div className="team-two__bg-shape" ></div>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Our Technicians
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation>Meet Our Skilled Technicians for <br /> Your Tech Needs</TextAnimation>
                    </h3>
                </div>
                <div className="row">
                    {teamMembers.map((member) => (
                        <FadeInAdvanced
                            key={member.id}
                            className={`col-xl-3 col-lg-6 col-md-6 `}
                            delay={member.animationDelay}
                            variant={member?.animationClass}
                        >
                            <div className="team-two__single">
                                <div className="team-two__img-box">
                                    <div className="team-two__img">
                                        <img src={member.image} alt="" />
                                    </div>
                                </div>
                                <div className="team-two__content">
                                    <div className="team-two__social">
                                        {member.socials.map((social, index) => (
                                            <a key={index} href={social.href}>
                                                <span className={social.iconClass}></span>
                                            </a>
                                        ))}
                                    </div>
                                    <h3 className="team-two__title">
                                        <Link to={member.to}>{member.name}</Link>
                                    </h3>
                                    <p className="team-two__sub-title">{member.subTitle}</p>
                                </div>
                            </div>
                        </FadeInAdvanced>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default TeamTwo;