import React from "react";
import { JobImg } from "../assets";

const About = () => {
  return (
    <div className='container flex flex-col gap-8 py-6 mx-auto 2xl:gap-14 '>
      <div className='flex flex-col-reverse items-center w-full gap-10 p-5 md:flex-row'>
        <div className='w-full md:2/3 2xl:w-2/4'>
          <h1 className='mb-5 text-3xl font-bold text-blue-600'>About Us</h1>
          <p className='leading-7 text-justify'>
          Shaping a happy career is a priority for all budding professionals. However, the stakes to get there never seemed to be this high.

It's though undeniable that countless job portals claim to be the best when it comes to providing the right careers, however, we recommend the best website for job search.

Indeed we have reasons to state this tall claim.

In this blog, we shall state the reasons why the Naukri portal & naukri blog should be your go-to guide for a successful career.
          </p>
        </div>
        <img src={JobImg} alt='About' className='w-auto h-[300px]' />
      </div>

      <div className='px-5 leading-8 text-justify'>
        <p>
        The site enjoys a traffic share of over 70% as per a similar web.

          Naukri is a recruitment platform that provides hiring-related services to corporates/recruiters, placement agencies, and job seekers in India and overseas.

          It offers multiple products like Resume Database Access, Job Listings, and Response Management Tools.

          Opporctunity Hub Blog is an independent publication launched in May 2024 by vikas kamankar. If you subscribe today, you'll get full access to the website as well as email newsletters about new content when it's available. Your subscription makes this site possible, and allows Opporctunity Hub Blog to continue to exist.

        </p>
      </div>
    </div>
  );
};

export default About;
