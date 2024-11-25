import {useState, useEffect} from "react"
import "./css/index.css";
import { FaExclamation, FaUser, FaUpload, FaFacebook, FaSnapchat, FaWhatsapp } from "react-icons/fa6";
import { FaInstagram, FaTiktok, FaYoutube, FaGithub, FaTwitter } from "react-icons/fa6";;
import { useMimlyrics } from "./context/AppProvider";

import { logout } from "../slices/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../slices/auth/usersApiSlice";
import { IoIosHelp, IoMdAlbums, IoMdLogOut, IoMdHelp, IoMdLogIn, IoMdSave, IoMdSettings } from "react-icons/io";
import AppProvider from "./context/AppProvider";
const IMAGE_URL = "/api/v1/upload/avatar";
import axios from "./api/axios";
import AudioLogo from "../assets/audiologo.png"
import { selectCurrentUser } from "../slices/auth/authSlice";
import coco1 from "../../assets/cocoa-1529746_1920.jpg";

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo ,setUserInfo] = useState(null);
  var user = null;

  if(localStorage.getItem('userInfo')) {
    console.log('userinfo');
    var {user} = useSelector(selectCurrentUser);
    console.log(user);
  }

  useEffect(() => {
      setUserInfo(user);
      console.log(userInfo);
  }, [userInfo])

  const [isRun, setIsRun] = useState(true);  
  const [logOutApiCall, {isLoading}] = useLogoutMutation();
  const [errMsg, setErrMsg] = useState("");
  const location = useLocation();
  const {pathname} = location;
  //console.log(location);


  //console.log("IS: ", isActiveModalNavbar);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOutApiCall().unwrap();
      dispatch(logout());      
      navigate("/");
    }catch(err) {
      //console.log("huumm");
      console.log(err?.data?.message);
      setErrMsg(err?.data?.message);
    }
  }

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  }

  console.log(showProfile, userInfo);

  const {isActiveModalNavbar, setIsActiveModalNavbar} = useMimlyrics();

  return ( 
    <div className="">

        <div className="h-[60vh] relative">
          {/* <img className="w-[100%] h-[100%]" src={coco1} alt="x"/> */}
          <div className="w-[100%] h-[100%]" 
            style={{ backgroundImage: `url(${coco1})`, backgroundSize: `cover`, backgroundAttachment: `fixed`, backgroundPosition: `center` }}>
            <div className="text-white font-bold text-center font-mono text-4xl">
              <h1>COCOC Cameroun</h1>
            </div>
          </div>
          <div className="  bg-[rgba(119,85,84)] absolute top-0 left-0 bottom-0 right-0 opacity-20">

          </div>
        </div>
        
      <nav className=" ml-[90%]">
        {isLoading ? <h1 className=" items-center font-mono mt-40 text-center h-36 ">LOADING...</h1> : null}

        {userInfo ? 
        null : 
        <div className=" relative text-gray-700 font-medium ">      
         
          <div className=" flex absolute -top-[50px] z-50 right-[135px] md:right-[100%] ">
          <Link className=" flex hover:bg-slate-300 hover:border hover:rounded-full hover:text-indigo-800 w-24 hover:text-center " to="/register "> 
              <IoMdLogIn className=" mx-1 w-5 h-5 md:w-6 md:h-7"/>
              <p className=" ">Sign Up</p>
            </Link>
        </div>
        {pathname.startsWith("/register") ? <p className=" absolute right-[37%] top-12 md:right-[30%] md:top-[85%] w-20 h-1 bg-blue-400  "></p> : null }

          <div className=" flex absolute z-50 -top-[50px] right-[40px] md:right-[20%] ">
          <Link className=" flex hover:bg-slate-300 hover:border hover:rounded-full hover:text-indigo-800 w-24 hover:text-center" to="/login "> 
              <IoMdLogIn className=" mx-1 w-5 h-5 md:w-6 md:h-7"/>
              <p className="  ">Sign In</p>
            </Link>
        </div>
          {pathname.startsWith("/login") ? <p className=" absolute right-[18%] top-12 md:right-[21%] md:top-[85%] w-20 h-1 bg-blue-400  "></p> : null }
        </div>  
        }

        {showProfile && userInfo ? 
        <div className=" cursor-pointer absolute z-50 top-3 right-[25px] " onClick={handleShowProfile}>
          <FaUser className=" h-6 w-6 md:h-8 md:w-8 text-blue-500 "/>
        </div> 
        : 
        <div className=" ">
        {userInfo ?  <div className="absolute top-0">
          <FaUser className=" absolute top-3 z-50 w-6 h-6 md:h-8 md:w-8 cursor-pointer text-blue-500 "
          onClick={handleShowProfile}/>
        <div  
          className=" absolute z-50 top-[65px] -right-[50px] cursor-pointer bg-slate-300 rounded-md w-[55vw] md:w-[25vw] "
        >
        <div className=" py-1 mx-2 ">
              <div className="my-3">
            <button className=" px-5 py-2 shadow rounded w-[50%] bg-green-200 hover:bg-green-400"><Link to="/profile" className="text-large text-center">
              Update Info
            </Link></button>
          </div>

          <div className=" my-2 relative" onClick={handleLogout}>
            <button className=" py-2 shadow rounded w-[50%] bg-red-200 hover:bg-red-300">
              <p className="text-large text-center">
              <IoMdLogOut className=" w-5 h-5"/> <p className=" absolute top-1 left-9 ">Logout</p>
            </p></button>
          </div>
        </div> 

        </div>
        </div> : null}
        </div>}         
      </nav>

      <section className={ isActiveModalNavbar ? " relative opacity-60 -z-50 " :  "  z-50 font-medium space-x-1 mx-1 mt-1 md:ml-[17%] lg:ml-[14%] xl:ml-[12%]" }>
        <div className=' mt-2 md:mt-2 pl-2 pr-14 md:pr-20 py-1'>
          <div className=" ">
            <p className="text-gray-900 ">
              Welcome to coco ! a web app where you can watch and get lyrics video in four languages (english, french, spanish, german)
              for entertainment or post .
            </p>

          <p className=" pt-2 ">
            This web app is subdivided into categories 
          </p>
        </div>
        </div>



        <div className=" flex flex-col md:text-lg md:py-1 ">
          <div className=" text-sky-950 font-mono w-[40%] flex flex-col mx-2 mb-1">
            <p className=''> _______</p>
            <Link to="/producer" className="">
              Producer
            </Link>
            <Link to="/cooperative" className="text-lg">
            Cooperative
            </Link>
            <Link to="/exporter" className="">
              Exporter
            </Link>
            <Link to="/purchase" className="">Purchase</Link>
            <Link to="/sales" className="" >Sales</Link>
            <Link className="text-gray-700" to="/admin/dashboard" >Admin DashBoard</Link>
          </div>

          <div className=" text-gray-800 w-[100%] px-3 bg-gradient-to-r from-[rgba(30,30,30,0.1)] to-[rgba(20,50,50,0.2)] md:flex md:space-x-28">
            <div className="flex flex-col mb-3 py-1">
              <p>About Us</p>
              <Link to="/location" className="ml-3">
                Location
              </Link>
              <Link to="/why" className="ml-3">
                Why ?
              </Link>

              <div className=" my-2 ">
                <Link to="/">Contact</Link>
                <div className="flex">
                  <FaWhatsapp className=" w-5 h-5 md:w-7 md:h-7 "/>+237 6245401
                </div>
                <div className="flex">
                  <FaExclamation className=" w-5 h-5 md:w-7 md:h-7"/> Geographic Location
                </div>
              </div>
            </div>

            <div className="flex flex-col mx-3 mb-3">
              <p className="text-lg">Follow Us on</p>
              <div className="flex space-x-2 py-1">
                <FaYoutube className="w-6 h-6 md:w-7 md:h-7 text-red-600"/>
                <Link  to="https://www.youtube.com/@mimlyrics" >Youtube</Link>
              </div>
              <div className="flex space-x-2 py-1">
                <FaFacebook className="w-6 h-6 md:w-7 md:h-7 text-blue-600"/>
                <Link to="https://www.facebook.com/@mimlyrics">Facebook</Link>
              </div>
              <div className="flex space-x-2 py-1">
                <FaInstagram className="w-6 h-6 md:w-7 md:h-7 text-purple-800"/>
                <Link to="https://www.instagram.com/@mimlyrics15">Instagram</Link>
              </div>
              <div className="flex space-x-2 py-1">
                <FaTiktok className="w-6 h-6 md:w-7 md:h-7 text-gray-800"/>
                <Link to="https://www.tiktok.com/@mimlyrics2">Tiktok</Link>
              </div>
              <div className="flex space-x-2 py-1">
                <FaTwitter className="w-6 h-6 md:w-7 md:h-7 text-blue-500"/>
                <Link to="/twitter">Twitter</Link>
              </div>
              <div className="flex space-x-2 py-1">
                <FaGithub className="w-6 h-6 md:w-7 md:h-7"/>
                <Link>Github</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}

export default Home