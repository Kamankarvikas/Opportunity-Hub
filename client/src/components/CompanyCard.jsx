import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ cmp }) => {
  return (
    <div className='flex items-center justify-between w-full h-16 gap-4 bg-white rounded shadow-md'>
      <div className='flex items-center w-3/4 gap-4 md:w-2/4'>
        <Link to={`/company-profile/${cmp?._id}`}>
          <img
            src={cmp?.profileUrl}
            alt={cmp?.name}
            className='w-8 h-8 rounded md:w-12 md:h-12'
          />
        </Link>
        <div className='flex flex-col h-full'>
          <Link
            to={`/company-profile/${cmp?._id}`}
            className='text-base font-semibold text-gray-600 truncate md:text-lg'
          >
            {cmp?.name}
          </Link>
          <span className='text-sm text-blue-600'>{cmp?.email}</span>
        </div>
      </div>

      <div className='items-center hidden w-1/4 h-full md:flex'>
        <p className='text-base text-start'>{cmp?.location}</p>
      </div>

      <div className='flex flex-col items-center w-1/4 h-full'>
        <p className='font-semibold text-blue-600'>{cmp?.jobPosts?.length}</p>
        <span className='text-xs font-normal text-gray-600 md:base'>
          Jobs Posted
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;