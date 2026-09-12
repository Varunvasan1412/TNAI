import React from 'react';
import { Link } from 'react-router';

// Professional researcher/scientist profile photos
const team1 = 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=500&fit=crop&crop=face&q=90';
const team2 = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face&q=90';
const team3 = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face&q=90';
const team4 = 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop&crop=face&q=90';
import FadeInAdvanced from '../../components/elements/FadeInAdvanced';
import TextAnimation from '../../components/elements/TextAnimation'; 
import SectionWrapper from '../../components/elements/SectionWrapper';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    animationDirection: 'fadeInLeft' | 'fadeInRight';
    animationDelay: number;
}

const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: 'Dr. Rajesh Kumar',
        role: 'Electrochemistry Lead',
        image: team1,
        animationDirection: 'fadeInLeft',
        animationDelay: 100,
    },
    {
        id: 2,
        name: 'Dr. Priya Nair',
        role: 'Hydrogen Research Specialist',
        image: team2,
        animationDirection: 'fadeInLeft',
        animationDelay: 300,
    },
    {
        id: 3,
        name: 'Arjun Mehta',
        role: 'Battery Materials Engineer',
        image: team3,
        animationDirection: 'fadeInRight',
        animationDelay: 500,
    },
    {
        id: 4,
        name: 'Dr. Anitha Sharma',
        role: 'Fuel Cell Researcher',
        image: team4,
        animationDirection: 'fadeInRight',
        animationDelay: 700,
    },
];

const TeamOne: React.FC = () => {
    return (
        <SectionWrapper className="team-one" id='team'> 
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style1">
                    <h6 className="section-title__tagline">
                        <span className="section-title__tagline-border"></span>Expert Team
                    </h6>
                    <h3 className="section-title__title title-animation">
                        <TextAnimation animationStyle='style2'>
                            Meet The Expert Team Member
                        </TextAnimation>
                    </h3>
                </div>
                <div className="row">
                    {teamMembers.map((member) => (
                        <FadeInAdvanced key={member?.id}
                            className='col-xl-3 col-lg-6 col-md-6'
                            variant={member?.animationDirection}
                            delay={member?.animationDelay}
                        >
                            <div className="team-one__single">
                                <div className="team-one__img-box">
                                    <div className="team-one__img">
                                        <img src={member.image} alt={member.name} />
                                    </div>
                                </div>
                                <div className="team-one__content">
                                    <div className="team-one__title-box">
                                        <h3 className="team-one__title">
                                            <Link to="/about">{member.name}</Link>
                                        </h3>
                                        <div className="team-one__sub-title">{member.role}</div>
                                    </div>
                                    <div className="team-one__share-and-social">
                                        <div className="team-one__share">
                                            <span className="fas fa-share-alt"></span>
                                        </div>
                                        <div className="team-one__social">
                                            <Link to="#"><span className="icon-facebook"></span></Link>
                                            <Link to="#"><span className="icon-instagram"></span></Link>
                                            <Link to="#"><span className="icon-link-in"></span></Link>
                                            <Link to="#"><span className="icon-xpa"></span></Link>
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

export default TeamOne;