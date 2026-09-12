import React from 'react';
import { Link } from 'react-scroll';
import { useLocation } from 'react-router';
import useRsistoreContext from '../context/useRsistoreContext';
interface SinglePageMenuItem {
    id: number;
    linkId: string;
    value: string;
    offfset?: number
}
const singlePageMenuListHomeOne: SinglePageMenuItem[] = [
    { id: 1, offfset: -170, linkId: "home", value: "Home" },
    { id: 2, offfset: -150, linkId: "aboutOne", value: "About" },
    { id: 3, offfset: -150, linkId: "servicesOne", value: "Services" },
    { id: 4, offfset: -70, linkId: "projects", value: "Projects" },
    { id: 5, offfset: -70, linkId: "contact", value: "Contact" },
    { id: 6, offfset: -60, linkId: "team", value: "Team" },
]
const singlePageMenuListHomeTwo: SinglePageMenuItem[] = [
    { id: 1, offfset: -180, linkId: "home", value: "Home" },
    { id: 2, offfset: -80, linkId: "about", value: "About" },
    { id: 3, offfset: -70, linkId: "services", value: "Services" },
    { id: 4, offfset: -75, linkId: "projects", value: "Projects" },
    { id: 5, offfset: -70, linkId: "team", value: "Team" },
    { id: 6, offfset: -70, linkId: "contact", value: "Contact" },
]
const singlePageMenuListHomeThree: SinglePageMenuItem[] = [
    { id: 1, offfset: -170, linkId: "home", value: "Home" },
    { id: 2, offfset: -55, linkId: "about", value: "About" },
    { id: 3, offfset: -55, linkId: "services", value: "Services" },
    { id: 4, offfset: -70, linkId: "contact", value: "Contact" },
    { id: 5, offfset: -55, linkId: "projects", value: "Projects" },
    { id: 6, offfset: -55, linkId: "team", value: "Team" },
]


const SinglePageManuList: React.FC = () => {
    const { activeSection, setIsMobileManu, } = useRsistoreContext();
    const currentPath = useLocation().pathname;
    return (
        <ul className="main-menu__list one-page-scroll-menu">
            {
                (
                    currentPath === "/single-page-home-one"
                        ?
                        singlePageMenuListHomeOne
                        : currentPath === "/single-page-home-two"
                            ? singlePageMenuListHomeTwo : singlePageMenuListHomeThree
                ).map((item: SinglePageMenuItem) => (
                    <li key={item?.id} style={{ cursor: "pointer" }} className={`scrollToLink ${activeSection === item?.linkId ? "current" : ""}`}>
                        <Link to={item?.linkId} spy={true} smooth={true} offset={item?.offfset} duration={500} onClick={() => setIsMobileManu(false)}>{item?.value}</Link>
                    </li>
                ))
            }
        </ul>
    );
};

export default SinglePageManuList;