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
import logo from "../assets/logo.png";


const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const location = useLocation();
  const {pathname} = location;
  const {isActiveModalNavbar, setIsActiveModalNavbar} = useMimlyrics();
  const navigate = useNavigate();

  useEffect(() => {
    const onScrollHeaderEvent = (e) => {
      const header = document.getElementById("header");
      if(window.scrollY <= 0)
      {
        header.style.backgroundColor = "transparent";
        header.classList.remove("text-white");
        header.classList.add("text-blue-600");
      } else {
        header.classList.add("text-white");
        header.classList.remove("text-blue-600");
        header.style.backgroundColor = "brown";
      }
    };
  
    window.addEventListener("scroll", (e) => {
      onScrollHeaderEvent(e);
    });

    document.getElementById("logo").addEventListener("click", (e) => {
      navigate("/");
    });
  }, []);

  const handleModalNavbar = async () => {
    setShowModal(!showModal); 
    setIsActiveModalNavbar(!showModal);        
  }


  /*(function getUserInfo () {
    if(localStorage.getItem('userInfo')) {
      let {user} = useSelector(selectCurrentUser); 
      return {token}
    }
  }

   let {user} = getUserInfo() || {};
   const userInfo = user*/
 

   return (    
      <div className="fixed top-0 left-0 right-0 text-blue-600 z-[1100]">
       <nav id="header" className=" transition-all md:py-1 bg-transparent relative md:flex-row md:justify-between flex items-center">
          <img src={logo} id="logo" className="cursor-pointer w-20 h-20 md:w-28 md:h-28 ml-5 md:ml-20"></img>

          <div className="flex flex-row flex-1 justify-end mr-5 items-center">
              <Link className="flex flex-row items-center justify-center mr-4 transition-transform hover:scale-110 hover:text-green-300" to="/register "> 
                <IoMdLogIn className="mr-2 text-xl md:text-3xl"/>
                <div>Inscription</div>
              </Link>
              <Link className="flex flex-row items-center justify-center ml-4 transition-transform hover:scale-110 hover:text-green-300" to="/login "> 
                <IoMdLogIn className="mr-2 text-xl md:text-3xl"/>
                <div>Connexion</div>
              </Link>
          </div>
         {showModal ? (
           <div className=" absolute top-1/2 -translate-y-1/2 left-3 md:invisible">
             <button className="" onClick={() => handleModalNavbar()}>
               <FaX />
             </button>
           </div>
         ) : (
           <div className="absolute top-1/2 -translate-y-1/2 left-3 md:invisible">
             <button className="" onClick={() => handleModalNavbar()}>
               <FaAlignJustify />
             </button>
           </div>
         )}
        
            
         {/* <div className=" invisible md:visible">
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
         </div> */}

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