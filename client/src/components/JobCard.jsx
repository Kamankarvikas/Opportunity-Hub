// import { GoLocation } from "react-icons/go";
// import moment from "moment";
// import { Link } from "react-router-dom";

// const JobCard = ({ job }) => {
//   return (
//     <Link to={`/job-detail/${job?.id}`}>
//       <div
//         className='w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-lg 
//                 rounded-md px-3 py-5 '
//       >
//         <div className='flex gap-3'>
//           <img
//             src={job?.company?.profileUrl}
//             alt={job?.company?.name}
//             className='w-14 h-14'
//           />

//           <div className=''>
//             <p className='text-lg font-semibold truncate'>{job?.jobTitle}</p>
//             <span className='flex items-center gap-2'>
//               <GoLocation className='text-sm text-slate-900' />
//               {job?.location}
//             </span>
//           </div>
//         </div>

//         <div className='py-3'>
//           <p className='text-sm'>
//             {job?.detail[0]?.desc?.slice(0, 150) + "..."}
//           </p>
//         </div>

//         <div className='flex items-center justify-between'>
//           <p className='bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm'>
//             {job?.jobType}
//           </p>
//           <span className='text-sm text-gray-500'>
//             {moment(job?.createdAt).fromNow()}
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default JobCard;
import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    // <Link to={`/job-detail/${job?.id}`}>
    <Link to={`/job-detail/${job?._id}`}>
      <div
        className='w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-lg 
                rounded-md px-3 py-5 '
      >
        <div className='flex flex-col gap-2'>
          <p className='text-lg font-semibold truncate'>{job?.jobTitle}</p>
          <span className='flex items-center gap-2'>
            <GoLocation className='text-sm text-slate-900' />
            {job?.location}
          </span>
        </div>

        <div className='py-3'>
          <p className='text-sm whitespace-pre-wrap'>
            {job?.detail[0]?.desc?.slice(0, 150) + "..."}
          </p>
        </div>

        <div className='flex items-center justify-between'>
          <p className='bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm'>
            {job?.jobType}
          </p>
          <span className='text-sm text-gray-500'>
            {moment(job?.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
