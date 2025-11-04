import React from 'react'
import { Banner, PlaylistCarousel, SuggestedSongs } from './components'


const FeatureHomePage: React.FC = () => {

    return (
        <>
            <PlaylistCarousel />
            <Banner />
            <SuggestedSongs />
        </>
    )
}

export default FeatureHomePage