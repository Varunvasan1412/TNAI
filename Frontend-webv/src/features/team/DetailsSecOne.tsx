import React from "react";
import { Link } from "react-router";

import teamDetailsImg1 from "../../assets/images/team/team-details-img-1.jpg";
import Progresbar from "../../components/elements/Progressbar";

interface SocialLink {
  href: string;
  iconClass: string;
  label: string;
}

interface AddressItem {
  iconClass: string;
  label: string;
  value: string;
  linkHref?: string;
  linkPrefix?: string;
}

interface PracticeAreaItem {
  label: string;
}

interface SkillItem {
  title: string;
  percent: number;
}

interface TeamMemberDetails {
  name: string;
  subTitle: string;
  image: string;
  imageAlt: string;
  bio: string;
  socialLinks: SocialLink[];
  addressItems: AddressItem[];
  practiceAreaListOne: PracticeAreaItem[];
  practiceAreaListTwo: PracticeAreaItem[];
  skills: SkillItem[];
}

const teamMemberDetails: TeamMemberDetails = {
  name: "William Barbara",
  subTitle: "Business Lawyer",
  image: teamDetailsImg1,
  imageAlt: "William Barbara - Business Lawyer",
  bio: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore ma gnam aliquam quaerat voluptatem. Ut enim ad minima veniam",
  socialLinks: [
    { href: "#", iconClass: "fab fa-twitter", label: "Twitter" },
    { href: "#", iconClass: "fab fa-facebook", label: "Facebook" },
    { href: "#", iconClass: "fab fa-pinterest-p", label: "Pinterest" },
    { href: "#", iconClass: "fab fa-instagram", label: "Instagram" },
  ],
  addressItems: [
    {
      iconClass: "icon-location",
      label: "Address",
      value: "4140 Parker Rd. Allentown, New Mexico 31134",
    },
    {
      iconClass: "icon-call",
      label: "Phone Number",
      value: "(208) 555-0112",
      linkHref: "2085550112",
      linkPrefix: "tel:",
    },
    {
      iconClass: "icon-envelope",
      label: "Email",
      value: "michael.mitc@example.com",
      linkHref: "michael.mitc@example.com",
      linkPrefix: "mailto:",
    },
  ],
  practiceAreaListOne: [
    { label: "Electric Repair" },
    { label: "Lighting & Fixture" },
    { label: "European Lard Sration" },
  ],
  practiceAreaListTwo: [
    { label: "Electric Maintenance" },
    { label: "Colling Service" },
    { label: "A/c Repair" },
  ],
  skills: [
    { title: "Repair Device", percent: 80 },
    { title: "Replace Device", percent: 95 },
    { title: "Diagnostics", percent: 65 },
  ],
};

const DetailsSecOne: React.FC = () => {
  const {
    name,
    subTitle,
    image,
    imageAlt,
    bio,
    socialLinks,
    addressItems,
    practiceAreaListOne,
    practiceAreaListTwo,
    skills,
  } = teamMemberDetails;

  return (
    <section className="team-details">
      <div className="container">
        <div className="team-details__top">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="team-details__top-left">
                <div className="team-details__img-1">
                  <img src={image} alt={imageAlt} />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="team-details__top-right">
                <div className="team-details__client-box">
                  <h3 className="team-details__client-name">{name}</h3>
                  <span className="team-details__client-sub-title">{subTitle}</span>
                  <div className="team-details__social">
                    {socialLinks.map((social) => (
                      <Link to={social.href} key={social.label} aria-label={social.label}>
                        <i className={social.iconClass}></i>
                      </Link>
                    ))}
                  </div>
                  <p className="team-details__client-text">{bio}</p>
                  <ul className="team-details__client-address list-unstyled">
                    {addressItems.map((item) => (
                      <li key={item.label}>
                        <p>
                          <span className={item.iconClass}></span>
                          {item.label}
                        </p>
                        <h5>
                          {item.linkHref && item.linkPrefix ? (
                            <a href={`${item.linkPrefix}${item.linkHref}`}>
                              {item.value}
                            </a>
                          ) : (
                            item.value
                          )}
                        </h5>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="team-details__bottom">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="team-details__bottom-left">
                <h3 className="team-details__bottom-title">Biography</h3>
                <p className="team-details__bottom-text">{bio}</p>
                <div className="team-details__practice-area">
                  <h4 className="team-details__practice-area-title">Practice Area</h4>
                  <div className="team-details__practice-area-list-box">
                    <ul className="list-unstyled team-details__practice-area-list">
                      {practiceAreaListOne.map((item) => (
                        <li key={item.label}>
                          <div className="icon"></div>
                          <div className="text">
                            <p>{item.label}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <ul className="list-unstyled team-details__practice-area-list team-details__practice-area-list--two">
                      {practiceAreaListTwo.map((item) => (
                        <li key={item.label}>
                          <div className="icon"></div>
                          <div className="text">
                            <p>{item.label}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="team-details__bottom-right">
                <h3 className="team-details__progress-title-1">Skills</h3>
                <ul className="team-details__progress-list list-unstyled">
                  {skills.map((skill) => (
                    
                    <Progresbar title={skill.title} value={skill.percent} height="10px"/>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSecOne;