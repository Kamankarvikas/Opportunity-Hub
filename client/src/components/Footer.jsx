import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { footerLinks } from "../utils/Data";
import { Link } from "react-router-dom";
import TextInput from "./Textinput";
import CustomButton from "./Custombutton";

const Footer = () => {
  return (
    <footer className='text-white mp-20'>
      <div className='overflow-x-hidden -mb-0.5'>
        <svg
          preserveAspectRatio='none'
          viewBox='0 0 1200 120'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            fill: "#1d4ed8",
            width: "125%",
            height: 112,
            transform: "rotate(180deg)",
          }}
        >
          <path d='M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z' />
        </svg>
      </div>

      <div className='bg-[#1d4ed8] '>
        <div className='container px-5 py-20 mx-auto '>
          <div className='flex flex-wrap justify-between w-full gap-10 -mb-10 -px-4'>
            {footerLinks.map(({ id, title, links }) => (
              <div className='w-auto px-4 ' key={id + title}>
                <h2 className='mb-3 text-sm font-medium tracking-widest text-white'>
                  {title}
                </h2>

                <div className='flex flex-col gap-3 mb-10 '>
                  {links.map((link, index) => (
                    <Link
                      key={link + index}
                      to='/'
                      className='text-sm text-gray-300 hover:text-white '
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className=''>
          <p className='container px-5 mx-auto mt-2 text-white '>
            Subscribe to our Newsletter
          </p>

          <div className='container flex flex-wrap items-center justify-between px-5 pt-6 pb-8 mx-auto '>
            <div className='flex items-center justify-center w-full h-16 md:w-2/4 lg:w-1/3 md:justify-start '>
              <TextInput
                styles='w-full flex-grow md:w-40 2xl:w-64 bg-gray-100 sm:mr-4 md-2'
                type='email'
                placeholder='Email Address'
              />

              <CustomButton
                title='Subscribe'
                containerStyles={
                  "block bg-[#001a36] text-white px-5 py-2.5 text-md rounded hover:bg-blue-800 focus:potline-none flex-col items-center mt-2"
                }
              />
            </div>

            <span className='inline-flex justify-center w-full mt-6 lg:ml-auto lg:mt-0 md:justify-start md:w-auto'>
              <a className='text-xl text-white duration-300 ease-in-out hover:scale-125'>
                <FaFacebookF />
              </a>
              <a className='ml-3 text-xl text-white duration-300 ease-in-out hover:scale-125'>
                <FaTwitter />
              </a>
              <a className='ml-3 text-xl text-white duration-300 ease-in-out hover:scale-125'>
                <FiInstagram />
              </a>

              <a className='ml-3 text-xl text-white duration-300 ease-in-out hover:scale-125'>
                <FaLinkedinIn />
              </a>
            </span>
          </div>
        </div> */}

        {/* <div className='bg-[#001a36]'>
          <div className='container flex flex-col flex-wrap px-5 py-4 mx-auto sm:flex-row'>
            <p className='text-sm text-center text-gray-300 sm:text-left'>
              &copy; 2023 Job Finder —
              <a
                href='https://youtube.com/@CodeWaveWithAsante'
                className='text-[#1199e7] ml-1'
                target='_blank'
                rel='noopener noreferrer'
              >
                @CodeWave
              </a>
            </p>

            <span className='w-full mt-2 text-sm text-center text-gray-300 sm:ml-auto sm:mt-0 sm:w-auto sm:text-left'>
              Designed by CodeWave
            </span>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
