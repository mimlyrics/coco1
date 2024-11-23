import { useState, useEffect, useContext } from "react";
import {
  FaLanguage, FaList, FaX, FaUser, 
  FaMessage, FaAlignJustify, FaHouse, 
  FaMusic, FaVideo, FaExclamation, FaRegistered} from "react-icons/fa6";
import { logout } from "../slices/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../slices/auth/usersApiSlice";
import { IoIosHelp, IoMdAlbums, IoMdLogOut, IoMdHelp, IoMdLogIn, IoMdSave, IoMdSettings } from "react-icons/io";
import { Outlet } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import { useMimlyrics } from "./context/AppProvider";
const IMAGE_URL = "/api/v1/upload/avatar";
import axios from "./api/axios";
import AudioLogo from "../assets/audiologo.png"
import { selectCurrentUser } from "../slices/auth/authSlice";
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const location = useLocation();
  const {pathname} = location;
  const {isActiveModalNavbar, setIsActiveModalNavbar} = useMimlyrics();

  const handleModalNavbar = async () => {
    setShowModal(!showModal); 
    setIsActiveModalNavbar(!showModal);        
  }

   return (    
      <div className=" z-50 md:w-[75%] lg:w-[65%]   ">
       <nav className=" w-[100vw] md:py-1 z-50 shadow shadow-amber-900 border 
       bg-[rgba(119,85,84)] h-16 relative md:flex-row md:justify-between">
        <div className=" mx-16 md:mx-32 mt-4 md:mt-3 text-[17px] flex md:text-lg">
          <FaMusic className=" mr-[2px] text-cyan-100 w-5 h-5"/>
          <h1 className=" text-cyan-200 mt-1 font-serif font-semibold shadow-sky-100 ">COCO</h1>
        </div>
         {showModal ? (
           <div className=" absolute top-5 left-2 md:invisible">
             <button className="" onClick={() => handleModalNavbar()}>
               <FaX />
             </button>
           </div>
         ) : (
           <div className="absolute top-5 left-2 md:invisible">
             <button className="" onClick={() => handleModalNavbar()}>
               <FaAlignJustify />
             </button>
           </div>
         )}
        
            
         <div className=" invisible md:visible">
           <ul className=" mx-1 mt-1 px-3 absolute top-16
               flex-col lg:text-lg bg-zinc-100 shadow-lg shadow-zinc-500">              
             <Link className="flex py-2 hover:bg-slate-200 " to="/">
               <FaHouse className=" ml-2 mr-3  "/>Home 
             </Link> <p className=""></p>
             { pathname === "/" ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null}



             <Link className="flex py-2 hover:bg-slate-200" to="/producer">
               <FaUser className=" ml-2 mr-3  "/>Producers
             </Link><span className="border-b-2"></span>
             {pathname.includes("/producer") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/cooperative">
               <IoMdAlbums className=" ml-2 mr-3  "/>Cooperative
             </Link><span className="border-b-2"></span>
             {pathname.includes("/cooperative") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/exporter">
               <FaVideo className=" ml-2 mr-3 "/>Exporter
             </Link><span className="border-b-2"></span>
              {pathname.includes("/exporter") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/sales">
              <FaMessage className=" ml-2 mr-3 "/>Sales
           </Link><span className="border-b-2"></span>
            {pathname.includes("sales") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/assistance">
               <IoMdHelp className="ml-2 mr-3"/> Assistance
             </Link><span className="border-b-2"></span>
             {pathname.startsWith("/assistance") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/settings">
                <IoMdSettings className="ml-2 mr-3"/> Settings
             </Link><span className="border-b-2"></span>
            {pathname.startsWith("/settings") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/help">
              <FaExclamation className="  "/> Help
             </Link><span className="border-b-2"></span>
             {pathname.startsWith("/help") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/language">
             <FaLanguage className="w-5 h-5"/>Language</Link>
             <span className="border-b-2"></span>
             {pathname.startsWith("/language") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }
           </ul>          
         </div>

        </nav>

       <section className="md:hidden ">
         {/** Hero section */}
         {showModal ? (
           <ul onClick={() => setShowModal(false)} className="absolute h-screen flex w-80 text-white font-medium text-lg flex-col shadow bg-blue-700 ">
            
            <div className=" py-3 hover:bg-blue-800">
             <Link className=" ml-20 " to="/">
               <FaHouse className="absolute left-14 "/>Home
             </Link> 
            </div>
            <p className=" w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className="ml-20 " to="/plot">
              <FaMessage className="absolute left-14  "/>Plot
             </Link><span className="border-b-2"></span>
           </div>
           <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className="ml-20  " to="/users">
               <FaMusic className="absolute left-14  "/>Producteur
             </Link><span className="border-b-2"></span>
             </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className="ml-20  " to="/cooperative">
               <IoMdAlbums className="absolute left-14  "/>Cooperative
             </Link><span className="border-b-2"></span>
             </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className=" ml-20 " to="/exporter">
               <FaVideo className="absolute left-14 "/>Exporter
             </Link><span className="border-b-2"></span>
             </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3  hover:bg-blue-800">
             <Link className="ml-20" to="/assistance">
               <IoMdHelp className="absolute left-14"/> Assistance
             </Link><span className="border-b-2"></span>
            </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className="ml-20" to="/settings">
               <IoMdSettings className="absolute left-14"/> Settings
             </Link><span className="border-b-2"></span>
            </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className="ml-20" to="/help">
              <FaExclamation className="absolute left-14  "/> Help
             </Link><span className="border-b-2"></span>
            </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link to="/language" className=" ml-20  py-3">
             <FaLanguage className=" absolute left-14"/>Language</Link>
             <span className="border-b-2"></span>
             </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>
           </ul>
          
         ) : null}
        </section>
        <Outlet/>
      </div>    
   );
}

export default Navbar