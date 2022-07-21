import React from "react";
import { HeroSearch } from "../components/HeroSearch/";
import { Hero } from "../components/hero/";
import ForwardCard from "../components/forward-card/forwardCard";
import { Features } from "../containers/features";
import PartnerCard from "../components/partner-card/parterCard";
import SubscribeCard from "../components/subscribe-card/subscribeCard";
import { FeaturedSection } from "../containers/featured-jobs";
import bg from "../assets/hero.jpg";
export default function Home(props) {
    return (
        <div>
            {/* <Hero payload={{background: bg, sub: "Voost is the ultimate app for work that enables the best opportunities for your personal or business’s future, the visual way. ", title: "Careers, Candidates and Meetings. All through Video.", }}/> */}
            <HeroSearch />
            <FeaturedSection />
            <ForwardCard />
            <Features />
            <PartnerCard />
            <SubscribeCard />
        </div>
    );
}
