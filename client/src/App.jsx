import React from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Application from './components/Application';
import { Navigate, Route, Routes, useLocation, Outlet } from 'react-router-dom';
import {
  About,
  Auth,
  Companiess,
  Companyprofile,
  Findjobs,
  Jobdetail,
  Uploadjob,
  Userprofile,
} from "./pages";

import { useSelector } from "react-redux";
import Applyapplication from './components/Applyapplication';

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/user-auth' state={{ from: location }} replace />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <main className='bg-[#f7fdfd]'>
      <Navbar />

      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Navigate to='/find-jobs' replace={true} />}
          />
          <Route path='/find-jobs' element={<Findjobs />} />
          <Route path='/companies' element={<Companiess />} />
          <Route
            path={
              user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<Userprofile />}
          />

          <Route path={"/company-profile"} element={<Companyprofile />} />
          <Route path={"/company-profile/:id"} element={<Companyprofile />} />
          <Route path={"/upload-job"} element={<Uploadjob />} />
          <Route path={"/job-detail/:id"} element={<Jobdetail />} />
          <Route path={"/application/:id"} element={<Application/>}/>
          <Route path={"/applyapplication/:id"} element={<Applyapplication/>}/>
        </Route>

        <Route path='/about-us' element={<About />} />
        <Route path='/user-auth' element={<Auth />} />
      </Routes>
      {user && <Footer />}
    </main>
  );
}

export default App;