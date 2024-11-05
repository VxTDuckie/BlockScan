"use client";

import {Hero, Video, YTRefSection, RiliabilitySection, FAQ, OnScrollTutorial, MeetTheTeam } from '@/components/index';

export default function Page() {
    return (
        <main className="bg-cover" >         
            <Hero/>
            <OnScrollTutorial/>
            <FAQ/>
            <MeetTheTeam/>
            <YTRefSection/>
        </main>
    )
}