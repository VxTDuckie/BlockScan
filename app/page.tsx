"use client";

import {Hero, Video, YTRefSection, RiliabilitySection, FAQ } from '@/components/index';

export default function Page() {
    return (
        <main className="bg-cover overflow-hidden" >         
            <Hero/>
            <Video/>
            <RiliabilitySection/>
            <FAQ/>
            <YTRefSection/>
        </main>
    )
}