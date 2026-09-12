
import team1 from "../../assets/images/team/team-2-1.jpg";
import team2 from "../../assets/images/team/team-2-2.jpg";
import team3 from "../../assets/images/team/team-2-3.jpg";
import team4 from "../../assets/images/team/team-2-4.jpg";
import team5 from "../../assets/images/team/team-2-5.jpg";
import team6 from "../../assets/images/team/team-2-6.jpg";
import team7 from "../../assets/images/team/team-2-7.jpg";
import team8 from "../../assets/images/team/team-2-8.jpg";

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
    animationDelay: number;
    animationDirection: "fadeInLeft" | "fadeInRight";
}

export const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: "Wade Warren",
        role: "A/C Technicians",
        image: team1,
        animationDelay: 100,
        animationDirection: "fadeInLeft",
    },
    {
        id: 2,
        name: "Adam Smith",
        role: "Senior Electrician",
        image: team2,
        animationDelay: 200,
        animationDirection: "fadeInLeft",
    },
    {
        id: 3,
        name: "Harbert Spin",
        role: "Support Specialist",
        image: team3,
        animationDelay: 300,
        animationDirection: "fadeInRight",
    },
    {
        id: 4,
        name: "Darrell Steward",
        role: "A/C Specialist",
        image: team4,
        animationDelay: 400,
        animationDirection: "fadeInRight",
    },
    {
        id: 5,
        name: "Wade Barent",
        role: "P/C Specialist",
        image: team5,
        animationDelay: 500,
        animationDirection: "fadeInLeft",
    },
    {
        id: 6,
        name: "Adam Milne",
        role: "Mobile Specialist",
        image: team6,
        animationDelay: 600,
        animationDirection: "fadeInLeft",
    },
    {
        id: 7,
        name: "Harbert Spancer",
        role: "Laptop Specialist",
        image: team7,
        animationDelay: 700,
        animationDirection: "fadeInRight",
    },
    {
        id: 8,
        name: "Alisa Smith",
        role: "Circuit Specialist",
        image: team8,
        animationDelay: 800,
        animationDirection: "fadeInRight",
    },
];
