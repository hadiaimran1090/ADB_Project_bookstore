import React from 'react'

import bannerImg from "../../assets/banner.png"

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
         <div className='md:w-1/2 w-full flex items-center md:justify-end'>
            <img src={bannerImg} alt="" />
        </div>
        
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>Top Picks for Your Weekend Reading
            </h1>
            <p className='mb-10'>Whether you're in the mood for a gripping mystery, a sweeping romance, or a thought-provoking piece of nonfiction, our top picks for the weekend are sure to keep you turning pages. Curl up with one of these standout titles and escape into a story that will stay with you long after the final chapter</p>

            <button className='btn-primary'>Subscribe</button>
        </div>

       
    </div>
  )
}

export default Banner