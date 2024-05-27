import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { Custombutton, Loading, Textinput } from "../components";
import { NoProfile } from "../assets";
import { apiRequest } from "../utils";
import { Login } from "../redux/userSlice";
const UserForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user},
  });
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [uploadCv, setUploadCv] = useState("");
  const [isSubmitting,setIsSubmitting]=useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try{
       const uri =profileImage && (await handleFileUpload(profileImage));
       const newData=uri ? {...data,profileUrl:uri}:data;
       const res=await apiRequest({
        url:"/users/update-user",
        token:user?.token,
        data:newData,
        method:"PUT",
       });
       if(res)
        {
          const newData={token:res?.token,...res?.user};
          dispatch(Login(newData));
          localStorage.setItem("userInfo",JSON.stringify(res));
          window.location.reload();
        }
        setIsSubmitting(false);
    }catch(e)
    {
      
      setIsSubmitting(false);
      console.log(e);
     
    }
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <Transition appear show={open ?? false} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
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
                    Edit Profile
                  </Dialog.Title>
                  <form
                    className='flex flex-col w-full gap-5 mt-2'
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className='flex w-full gap-2'>
                      <div className='w-1/2'>
                        <Textinput
                          name='firstname'
                          label='First Name'
                          placeholder='James'
                          type='text'
                          register={register("firstname", {
                            required: "First Name is required",
                          })}
                          error={
                            errors.firstname ? errors.firstname?.message : ""
                          }
                        />
                      </div>
                      <div className='w-1/2'>
                        <Textinput
                          name='lastname'
                          label='Last Name'
                          placeholder='Wagonner'
                          type='text'
                          register={register("lastname", {
                            required: "Last Name is required",
                          })}
                          error={
                            errors.lastname ? errors.lastname?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <div className='flex w-full gap-2'>
                      <div className='w-1/2'>
                        <Textinput
                          name='contact'
                          label='Contact'
                          placeholder='Phone Number'
                          type='text'
                          register={register("contact", {
                            required: "Coontact is required!",
                          })}
                          error={errors.contact ? errors.contact?.message : ""}
                        />
                      </div>

                      <div className='w-1/2'>
                        <Textinput
                          name='location'
                          label='Location'
                          placeholder='Location'
                          type='text'
                          register={register("location", {
                            required: "Location is required",
                          })}
                          error={
                            errors.location ? errors.location?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <Textinput
                      name='jobTitle'
                      label='Job Title'
                      placeholder='Software Engineer'
                      type='text'
                      register={register("jobTitle", {
                        required: "Job Title is required",
                      })}
                      error={errors.jobTitle ? errors.jobTitle?.message : ""}
                    />
                    <div className='flex w-full gap-2 text-sm'>
                      <div className='w-1/2'>
                        <label className='mb-1 text-sm text-gray-600'>
                          Profile Picture
                        </label>
                        <input
                          type='file'
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div>

                      <div className='w-1/2'>
                        <label className='mb-1 text-sm text-gray-600'>
                          Resume
                        </label>
                        <input
                          type='file'
                          onChange={(e) => setUploadCv(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className='flex flex-col'>
                      <label className='mb-1 text-sm text-gray-600'>
                        About
                      </label>
                      <textarea
                        className='px-4 py-2 text-base border border-gray-400 resize-none ounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required:
                            "Write a little bit about yourself and your projects",
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
                     { isSubmitting ? (<Loading/> ):(
                     <Custombutton
                        type='submit'
                        containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                        title={"Submit"}
                      />)}
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

const Userprofile = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const userInfo = user;

  return (
    <div className='container flex items-center justify-center py-10 mx-auto'>
      <div className='w-full p-10 pb-20 bg-white rounded-lg shadow-lg md:w-2/3 2xl:w-2/4'>
        <div className='flex flex-col items-center justify-center mb-4'>
          <h1 className='text-4xl font-semibold text-slate-600'>
            {userInfo?.firstname + " " + userInfo?.lastname}
          </h1>

          <h5 className='text-base font-bold text-blue-700'>
            {userInfo?.jobTitle || "Add Job Title"}
          </h5>

          <div className='flex flex-wrap justify-between w-full mt-8 text-sm lg:flex-row'>
            <p className='flex items-center justify-center gap-1 px-3 py-1 rounded-full text-slate-600'>
              <HiLocationMarker /> {userInfo?.location ?? "No Location"}
            </p>
            <p className='flex items-center justify-center gap-1 px-3 py-1 rounded-full text-slate-600'>
              <AiOutlineMail /> {userInfo?.email ?? "No Email"}
            </p>
            <p className='flex items-center justify-center gap-1 px-3 py-1 rounded-full text-slate-600'>
              <FiPhoneCall /> {userInfo?.contact ?? "No Contact"}
            </p>
          </div>
        </div>

        <hr />

        <div className='w-full py-10'>
          <div className='flex flex-col-reverse w-full gap-8 py-6 md:flex-row'>
            <div className='flex flex-col w-full gap-4 mt-20 text-lg md:w-2/3 text-slate-600 md:mt-0'>
              <p className='text-[#0536e7]  font-semibold text-2xl'>ABOUT</p>
              <span className='text-base leading-7 text-justify'>
                {userInfo?.about ?? "No About Found"}
              </span>
            </div>

            <div className='w-full md:w-1/3 h-44'>
              <img
                src={userInfo?.profileUrl || NoProfile}
                alt={userInfo?.firstname}
                className='object-contain w-full h-48 rounded-lg'
              />
              <button
                className='w-full py-2 mt-4 text-white bg-blue-600 rounded md:w-64'
                onClick={() => setOpen(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default Userprofile;
