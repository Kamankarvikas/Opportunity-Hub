import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiEdit3, FiUpload } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { companies, jobs } from "../utils/Data";
import { Custombutton, JobCard, Loading, Textinput } from "../components";
// import { apiRequest, handleFileUpload } from "../utils";
import { apiRequest } from "../utils";
import { Login } from "../redux/userSlice";

const CompnayForm = ({ open, setOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });

  const dispatch = useDispatch();
  // const [profileImage, setProfileImage] = useState("");
  const [uploadCv, setUploadCv] = useState("");
  
  const [errMsg,setErrMsg]=useState({staus:false,message:""});
  // const onSubmit = async(data) => {
  //         setIsLoading(true);
  //         setErrMsg(null);
  //         // const uri = profileImage && (await handleFileUpload(profileImage));
  //         // const newData = uri ? {...data,profileUrl : uri}:data;
  //         const newData= uri?{...data}:data;
  //         try{
  //           const res=await apiRequest({
  //             url:"/companies/update-company",
  //             token:user?.token,
  //             data:newData,
  //             method:"PUT"
  //           });
  //           setIsLoading(false);
  //           if(res.status === "failed")
  //             {
  //               setErrMsg({...res});
  //             }
  //             else{
  //               setErrMsg({status:"success",message:res.message});
  //               dispatch(Login(data));
  //               localStorage.setItem("userInfo",JSON.stringify(data));
  //               setTimeout(()=>{
  //                 window.location.reload();
  //               },1500);
  //             }
  //           }catch(error){
  //             console.log(error);
  //             setIsLoading(false);
  //           }
  // };
  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrMsg(null);
  
    // Directly use the form data as newData
    const newData = { ...data };
  
    try {
      const res = await apiRequest({
        url: "/companies/update-company",
        token: user?.token,
        data: newData,
        method: "PUT",
      });
  
      setIsLoading(false);
  
      if (res.status === "failed") {
        setErrMsg({ ...res });
      } else {
        setErrMsg({ status: "success", message: res.message });
        const newData={token:res?.token,...res?.user};
        dispatch(Login(newData));
        localStorage.setItem("userInfo", JSON.stringify(data));
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  

  const closeModal = () => setOpen(false);

  return (
    <>
      <Transition appear show={open ?? false} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-full p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-semibold leading-6 text-gray-900'
                  >
                    Edit Company Profile
                  </Dialog.Title>

                  <form
                    className='flex flex-col w-full gap-5 mt-2'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Textinput
                      name='name'
                      label='Company Name'
                      type='text'
                      register={register("name", {
                        required: "Compnay Name is required",
                      })}
                      error={errors.name ? errors.name?.message : ""}
                    />

                    <Textinput
                      name='location'
                      label='Location/Address'
                      placeholder='eg. Califonia'
                      type='text'
                      register={register("location", {
                        required: "Address is required",
                      })}
                      error={errors.location ? errors.location?.message : ""}
                    />

                    <div className='flex w-full gap-2'>
                      <div className='w-1/2'>
                        <Textinput
                          name='contact'
                          label='Contact'
                          placeholder='Phone Number'
                          type='text'
                          register={register("contact", {
                            required: "Contact is required!",
                          })}
                          error={errors.contact ? errors.contact?.message : ""}
                        />
                      </div>

                      {/* <div className='w-1/2 mt-2'>
                        <label className='mb-1 text-sm text-gray-600'>
                          Company Logo
                        </label>
                        <input
                          type='file'
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div> */}
                    </div>

                    <div className='flex flex-col'>
                      <label className='mb-1 text-sm text-gray-600'>
                        About Company
                      </label>
                      <textarea
                        className='px-4 py-2 text-base border border-gray-400 resize-none ounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required: "Write a little bit about your company.",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span
                          role='alert'
                          className='text-xs text-red-500 mt-0.5'
                        >
                          {errors.about?.message}
                        </span>
                      )}
                    </div>

                    <div className='mt-4'>
                    {
                      isLoading ? (
                        <Loading/>
                      ):(
                      <Custombutton
                        type='submit'
                        containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                        title={"Submit"}
                      />
                    )}
                     
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const Companyprofile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const fetchCompany=async()=>{
      setIsLoading(true);
      let id=null;
      if(params.id && params.id !==undefined)
        {
          id=params?.id;
        }else{
          id=user?._id;
        }
        try{
          const res=await apiRequest({
            url:"/companies/get-company/"+id,
            method:"GET",
          });
          setInfo(res?.data);
          setIsLoading(false);
        }catch(error){
          console.log(error);
          setIsLoading(false);
        }
  };
  useEffect(() => {
    fetchCompany();
    // setInfo(companies[parseInt(params?.id) - 1 ?? 0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container p-5 mx-auto'>
      <div className=''>
        <div className='flex flex-col justify-between w-full gap-3 md:flex-row'>
          <h2 className='text-xl font-semibold text-gray-600'>
            Welcome, {info?.name}
          </h2>

          {user?.user?.accountType === undefined &&
            info?._id === user?._id && (
              <div className='flex items-center gap-4 py-5 justifu-center md:py-0'>
                <Custombutton
                  onClick={() => setOpenForm(true)}
                  iconRight={<FiEdit3 />}
                  containerStyles={`py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600  hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600`}
                />

                <Link to='/upload-job'>
                  <Custombutton
                    title='Upload Job'
                    iconRight={<FiUpload />}
                    containerStyles={`text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none  rounded text-sm md:text-base border border-blue-600`}
                  />
                </Link>
              </div>
            )}
        </div>

        <div className='flex flex-col justify-start w-full mt-4 text-sm md:flex-row md:justify-between md:mt-8'>
          <p className='flex items-center gap-1 px-3 py-1 rounded-full text-slate-600'>
            <HiLocationMarker /> {info?.location ?? "No Location"}
          </p>
          <p className='flex items-center gap-1 px-3 py-1 rounded-full text-slate-600'>
            <AiOutlineMail /> {info?.email ?? "No Email"}
          </p>
          <p className='flex items-center gap-1 px-3 py-1 rounded-full text-slate-600'>
            <FiPhoneCall /> {info?.contact ?? "No Contact"}
          </p>

          <div className='flex flex-col items-center mt-10 md:mt-0'>
            <span className='text-xl'>{info?.jobPosts?.length}</span>
            <p className='text-blue-600 '>Job Post</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full gap-2 mt-20'>
        <p>Jobs Posted</p>

        <div className='flex flex-wrap gap-3'>
          {info?.jobPosts?.map((job, index) => {
            const data = {
              name: info?.name,
              email: info?.email,
              ...job,
            };
            return <JobCard job={data} key={index} />;
          })}
        </div>
      </div>

      <CompnayForm open={openForm} setOpen={setOpenForm} />
    </div>
  );
};

export default Companyprofile;