import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Header from "../components/Header";
import { experience, jobTypes, jobs } from "../utils/Data";
import { Custombutton, JobCard, ListBox } from "../components";
import { apiRequest } from "../utils";
import {Loading} from '../components'
const Findjobs = () => {
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);
  const [expVal,setExpVal]=useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchJobs = async() =>{
    setIsFetching(true);
    const newURL = updateURL({
      pageNum:page,
      query:searchQuery,
      cmpLoc:jobLocation,
      sort:sort,
      navigate:navigate,
      location:location,
      jType:filterJobTypes,
      exp:filterExp,
    });
    try{
        const res=await apiRequest({
          url:"/jobs" + newURL,
          // url: "/find-jobs" + newURL,
          method:"GET",
        });
        setNumPage(res?.numOfPage);
        setRecordCount(res?.totalJobs);
        setData(res?.data);
        setIsFetching(false);
    }catch(error){

    }
  };
  const updateURL = ({
    pageNum,
    query,
    cmpLoc,
    sort,
    navigate,
    location,
    jType,
    exp,
  }) => {
    const params = new URLSearchParams();
  
    if (pageNum) params.append("page", pageNum);
    if (query) params.append("search", query);
    if (cmpLoc) params.append("location", cmpLoc);
    if (sort) params.append("sort", sort);
    if (jType && jType.length > 0) params.append("jtype", jType.join(","));
    if (exp) params.append("exp", exp);
  
    const newURL = `?${params.toString()}`;
  
    // Update the browser's URL without reloading the page
    navigate(`${location.pathname}${newURL}`, { replace: true });
  
    return newURL;
  };
  
  const filterJobs = (val) => {
    if (filterJobTypes?.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el != val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };
  const handleSearchSubmit= async(e)=>{
          e.preventDefault();
          await fetchJobs();
  };
 const handleShowMore =async(e)=>{
       e.preventDefault();
       setPage((prev)=>prev+1);
 };

  const filterExperience = async (e) => {
    if(expVal?.includes(e)){
      setExpVal(expVal?.filter((el)=> el != e));
    }else{
      setExpVal([...expVal,e]);
    }
  };
 useEffect(()=>{
     if(expVal.length>0){
      let newExpVal=[];
      expVal?.map((el)=>{
        const newEl=el?.split("-");
        newExpVal.push(Number(newEl[0]),Number(newEl[1]))
      });
      newExpVal?.sort((a,b)=>a-b);
      setFilterExp(`${newExpVal[0]}-${newExpVal[newExpVal]}`)
     }
 },[expVal]);
 useEffect(()=>{
    fetchJobs();

 },[sort,filterJobTypes,filterExp,page]);
  return (
    <div>
      <Header
        title='Find Your Dream Job with Ease'
        type='home'
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className='container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]'>
        <div className='flex-col hidden w-1/6 bg-white shadow-sm md:flex h-fit'>
          <p className='text-lg font-semibold text-slate-600'>Filter Search</p>

          <div className='py-2'>
            <div className='flex justify-between mb-3'>
              <p className='flex items-center gap-2 font-semibold'>
                <BiBriefcaseAlt2 />
                Job Type
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className='flex flex-col gap-2'>
              {jobTypes.map((jtype, index) => (
                <div key={index} className='flex gap-2 text-sm md:text-base '>
                  <input
                    type='checkbox'
                    value={jtype}
                    className='w-4 h-4'
                    onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{jtype}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='py-2 mt-4'>
            <div className='flex justify-between mb-3'>
              <p className='flex items-center gap-2 font-semibold'>
                <BsStars />
                Experience
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className='flex flex-col gap-2'>
              {experience.map((exp) => (
                <div key={exp.title} className='flex gap-3'>
                  <input
                    type='checkbox'
                    value={exp?.value}
                    className='w-4 h-4'
                    onChange={(e) => filterExperience(e.target.value)}
                  />
                  <span>{exp.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='w-full px-5 md:w-5/6 md:px-0'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-sm md:text-base'>
              Shwoing: <span className='font-semibold'>{recordCount}</span> Jobs
              Available
            </p>

            <div className='flex flex-col gap-0 md:flex-row md:gap-2 md:items-center'>
              <p className='text-sm md:text-base'>Sort By:</p>

              <ListBox sort={sort} setSort={setSort} />
            </div>
          </div>

          <div className='flex flex-wrap w-full gap-4'>
            {data?.map((job, index) => {
              const newJob={
                name:job?.company?.name,
                ...job,
              };
            return <JobCard job={newJob} key={index} />;
            })}
          </div>
             {
              isFetching && (
                <div className="py-10">
                    <Loading/>
                </div>
              )
             }
          {numPage > page && !isFetching && (
            <div className='flex items-center justify-center w-full pt-16'>
              <Custombutton
              onClick={handleShowMore}
                title='Load More'
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Findjobs;

