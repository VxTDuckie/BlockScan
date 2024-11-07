"use client";

import {Hero, YTRefSection, FAQ, OnScrollTutorial, MeetTheTeam, Footer } from '@/components/index';

export default function Page() {
    return (
        <main className=''>         
            <Hero/>
            <OnScrollTutorial/>
            <FAQ/>
            <MeetTheTeam/>
            <YTRefSection/>
            <Footer/>
        </main>
    )
}