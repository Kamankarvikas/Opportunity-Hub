import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiRequest } from "../utils";

export default function Application() {
   const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      education: '',
      skill: '',
      experiance: '',
      coverLetter: ''
   });
   
   const { user } = useSelector((state) => state.user);
   const [errMsg, setErrMsg] = useState("");
   const [successMsg, setSuccessMsg] = useState("");
   const { id } = useParams();
   const navigate = useNavigate();

   const onCancel = () => {
      navigate(`/job-detail/${id}`);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
         ...prevState,
         [name]: value
      }));
   };

  //  const submitApplication = async (e) => {
  //     e.preventDefault();
  //     try {
  //        const res = await apiRequest({
  //           url: "/applications/application",
  //           token: user?.token,
  //           data: formData,
  //           method: "POST",
  //        });
  //        if (res.status === "failed") {
  //           setErrMsg(res.message);
  //        } else {
  //           setSuccessMsg("Application submitted successfully");
  //           setTimeout(() => {
  //              navigate(`/applyapplication/:id`);
  //           }, 2000);
  //        }
  //     } catch (error) {
  //        console.log(error);
  //     }
  //  };
  const submitApplication = async (e) => {
    e.preventDefault();
    try {
      // Add the applyDate to formData
      const applicationData = {
        ...formData,
        applyDate: new Date().toLocaleDateString()
      };

      const res = await apiRequest({
        url: "/applications/application",
        token: user?.token,
        data: applicationData,
        method: "POST",
      });
      if (res.status === "failed") {
        setErrMsg(res.message);
      } else {
        setSuccessMsg("Application submitted successfully");
        setTimeout(() => {
          navigate(`/applyapplication/${id}`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrMsg("An error occurred while submitting your application.");
    }
  };
   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
            <button
               className="float-right text-gray-400 hover:text-gray-600"
               onClick={onCancel}
            >
               &times;
            </button>
            {successMsg ? (
               <div>
                  <h2 className="mb-6 text-2xl font-bold text-green-600">{successMsg}</h2>
               </div>
            ) : (
               <>
                  <h2 className="mb-6 text-2xl font-bold">Apply for this Job</h2>
                  <form className="space-y-4" onSubmit={submitApplication}>
                     <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                           type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-gray-700">Phone No</label>
                        <input
                           type="number"
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                           type="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-gray-700">Education</label>
                        <input
                           type="text"
                           name="education"
                           value={formData.education}
                           onChange={handleChange}
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-gray-700">Skill</label>
                        <input
                           type="text"
                           name="skill"
                           value={formData.skill}
                           onChange={handleChange}
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-gray-700">Experience</label>
                        <input
                           type="number"
                           name="experiance"
                           value={formData.experiance}
                           onChange={handleChange}
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        />
                     </div>
                     <div>
                        <label className="block text-gray-700">Cover Letter</label>
                        <textarea
                           name="coverLetter"
                           value={formData.coverLetter}
                           onChange={handleChange}
                           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                           required
                        ></textarea>
                     </div>
                     <div className="flex justify-between">
                        <button
                           type="button"
                           onClick={onCancel}
                           className="w-1/2 px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                           Cancel
                        </button>
                        <button
                           type="submit"
                           className="w-1/2 px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                           Submit
                        </button>
                     </div>
                  </form>
               </>
            )}
            {errMsg && <p className="mt-4 text-red-500">{errMsg}</p>}
         </div>
      </div>
   );
}
