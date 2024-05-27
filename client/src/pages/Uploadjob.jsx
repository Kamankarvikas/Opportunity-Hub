import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Custombutton, JobCard, JobTypes, Textinput } from "../components";
import { jobs } from "../utils/Data";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import {Loading} from "../components";
const Uploadjob = () => {
  const {user} = useSelector((state)=>state.user);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const [errMsg, setErrMsg] = useState("");
  // const [jobTitle, setJobTitle] = useState("Full-Time");
  const [jobType,setJobType]=useState("Full-Time");
  const [recentPost,setRecentPost]=useState([]);
  const [isLoading,setIsLoading]=useState(false);

  const onSubmit = async (data) => {
      setIsLoading(true);
      setErrMsg(null);
      const newData={...data,jobType:jobType};
      try{
        const res=await apiRequest({
          url:"/jobs/upload-job",
          token:user?.token,
          data:newData,
          method:"POST",
        });
        if(res.status === "failed")
          {
            setErrMsg({...res});
          }else{
            setErrMsg({status:"success",message:res.message});
            setTimeout(()=>{
              window.location.reload();
            },200);
          }
          setIsLoading(false);

      }catch(error){
        console.log(error);
        setIsLoading(false);
      }
      // const newData={...data,jobType:jobType};
  };
  const getRecentPost=async()=>{
    try{
     const id=user?._id;
     const res=await apiRequest({
      url:"/companies/get-company/"+id,
      method:"GET",
     });
     setRecentPost(res?.data?.jobPosts);
  }catch(error){
    console.log(error);
  }
  }
  useEffect(()=>{
       getRecentPost();
  },[])
  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5'>
      <div className='w-full px-5 py-10 bg-white shadow-md h-fit md:w-2/3 2xl:2/4 md:px-10'>
        <div>
          <p className='text-2xl font-semibold text-gray-500'>Job Post</p>

          <form
            className='flex flex-col w-full gap-8 mt-2'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Textinput
              name='jobTitle'
              label='Job Title'
              placeholder='eg. Software Engineer'
              type='text'
              required={true}
              register={register("jobTitle", {
                required: "Job Title is required",
              })}
              error={errors.jobTitle ? errors.jobTitle?.message : ""}
            />

            <div className='flex w-full gap-4'>
              <div className={`w-1/2 mt-2`}>
                <label className='mb-1 text-sm text-gray-600'>Job Type</label>
                <JobTypes jobTitle={jobType} setJobTitle={setJobType} />
              </div>

              <div className='w-1/2'>
                <Textinput
                  name='salary'
                  label='Salary (USD)'
                  placeholder='eg. 1500'
                  type='number'
                  register={register("salary", {
                    required: "Salary is required",
                  })}
                  error={errors.salary ? errors.salary?.message : ""}
                />
              </div>
            </div>

            <div className='flex w-full gap-4'>
              <div className='w-1/2'>
                <Textinput
                  name='vacancies'
                  label='No. of Vacancies'
                  placeholder='vacancies'
                  type='number'
                  register={register("vacancies", {
                    required: "Vacancies is required!",
                  })}
                  error={errors.vacancies ? errors.vacancies?.message : ""}
                />
              </div>

              <div className='w-1/2'>
                <Textinput
                  name='experience'
                  label='Years of Experience'
                  placeholder='experience'
                  type='number'
                  register={register("experience", {
                    required: "Experience is required",
                  })}
                  error={errors.experience ? errors.experience?.message : ""}
                />
              </div>
            </div>

            <Textinput
              name='location'
              label='Job Location'
              placeholder='eg. New York'
              type='text'
              register={register("location", {
                required: "Job Location is required",
              })}
              error={errors.location ? errors.location?.message : ""}
            />
            <div className='flex flex-col'>
              <label className='mb-1 text-sm text-gray-600'>
                Job Description
              </label>
              <textarea
                className='px-4 py-2 text-base border border-gray-400 rounded resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                rows={4}
                cols={6}
                {...register("desc", {
                  required: "Job Description is required!",
                })}
                aria-invalid={errors.desc ? "true" : "false"}
              ></textarea>
              {errors.desc && (
                <span role='alert' className='text-xs text-red-500 mt-0.5'>
                  {errors.desc?.message}
                </span>
              )}
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 text-sm text-gray-600'>
                Core Responsibilities
              </label>
              <textarea
                className='px-4 py-2 text-base border border-gray-400 rounded resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                rows={4}
                cols={6}
                {...register("requirements")}
              ></textarea>
            </div>

            {errMsg && (
              <span role='alert' className='text-sm text-red-500 mt-0.5'>
                {errMsg}
              </span>
            )}
            <div className='mt-2'>
              {isLoading ?(

              <Loading/>
              ):(
              
              <Custombutton
                type='submit'
                containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                title='Sumbit'
              />)}
            </div>
          </form>
        </div>
      </div>
      <div className='w-full p-5 mt-20 md:w-1/3 2xl:2/4 md:mt-0'>
        <p className='font-semibold text-gray-500'>Recent Job Post</p>

        <div className='flex flex-wrap w-full gap-6'>
          {recentPost.slice(0, 4).map((job, index) => {
            const data={
              name:user?.name,
              email:user?.email,
              ...job
            };
            return <JobCard job={data} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Uploadjob;
