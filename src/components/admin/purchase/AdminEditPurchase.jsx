import {useState, useEffect} from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { IoIosArrowDropup, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../slices/auth/authSlice";
import queryString  from 'query-string';
import { COOPERATIVE_URL, PURCHASE_URL, USERS_URL, PLOT_URL } from "../../routes/serverRoutes";
import CLIENT_URL from "../../routes/clientRoutes";
const AdminEditPurchase = () => {
    const [errMsg, setErrMsg] = useState("");

    const [searchplots, setSearchplots] = useState(null);

    const [searchId, setSearchId] = useState("");

    const [successMsg, setSuccessMsg] = useState("");
    const [showMore, setShowMore]  = useState(false);

    const [showplots, setShowplots] = useState([]);
    const [startDate, setStartDate] = useState(new Date());

    const [userCode, setUserCode] = useState("");
    const [cooperativeId, setCooperativeId] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [cooperatives, setCooperatives] = useState(null);

    const [code, setCode] = useState("");

    const [date, setDate] = useState(new Date(0));
    const [success, setSuccess] = useState(false);

    const [usersCode, setUsersCode] = useState([]);
    const [cooperativesId, setCooperativesId] = useState([]);
    const token = useSelector(selectCurrentToken);

    const [idx, setIdx] = useState("");

    useEffect(() => {
      const {searchId} =  queryString.parse(location.search);
      setIdx(searchId);
      console.log(idx);
    }, [idx])
    

    useEffect(() => {
        const getSales = async () => {
            try {
                const res = await axios.get(`${PURCHASE_URL}/${idx}`, {headers:{Authorization: `Bearer ${token}`, withCredentials: true}});
                console.log(res);
                if(res) {
                  setUserCode(res?.data?.userCode);
                  setCooperativeId(res?.data?.cooperativeId);
                  setQuantity(res?.data?.quantity);
                  setPrice(res?.data?.price);
                  setDate(res?.data?.date);
                }
                
            }catch(err) {
              console.log(err);
                setErrMsg(err?.response?.data?.message);
            }
        }

        getSales();

    }, [idx])

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${PURCHASE_URL}/${idx}`, {code: code,
           userCode: userCode, cooperativeId: cooperativeId, quantity, price    
      }, {headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"}});
      console.log(res?.data?.plot);
      if(res) {
        setSuccess(res?.data?.message);
        setTimeout(()=> {
          window.location.href = `${CLIENT_URL}/#/admin/purchase`;
        }, [2000])
        
      }
    }catch(err) {
      console.log(err);
      setErrMsg(err?.response?.data?.message);
        setTimeout(()=> {
          setErrMsg(false);
        }, [3000])
      window.scrollTo(0,50);
    }
  }

  return (
    <>
    <section className=" md:ml-[21%] md:w-[55vw] bg-gradient-to-r from-amber-200 to-amber-300 md:bg-zinc-200
        px-1">
      <div className=" my-2 mt-1 bg-gradient-to-l from-amber-400 ">
        <h1 className="text-2xl text-center ">Admin Purchase DashBoard</h1>
      </div>

        {errMsg? <div className=" animate-bounce font-bold text-lg text-red-500"><h1>{errMsg}</h1></div> : null}
        {success? <div className=" animate-bounce font-bold text-lg text-green-500"><h1>{success}</h1></div> : null}            

        <div className="my-2 md:my-3 ">
            <label htmlFor="price">User Code</label>
            <input className=" rounded-md shadow-sm px-2 py-2
             md:py-3  w-[80%] block focus:outline 
             focus:outline-[0.16rem] outline-sky-300
             border-sky-300 " type="text" value={userCode} 
             onChange={e=> setUserCode(e.target.value)}  
            />
        </div>

        <div className="my-2 md:my-3 ">
            <label htmlFor="price">Cooperative Id</label>
            <input className=" rounded-md shadow-sm px-2 py-2
             md:py-3  w-[80%] block focus:outline 
             focus:outline-[0.16rem] outline-sky-300
             border-sky-300 " type="text" value={cooperativeId} 
             onChange={e=> setCooperativeId(e.target.value)}  
            />
        </div>

        <div className="my-2 md:my-3 ">
            <label htmlFor="price">Price</label>
            <input className=" rounded-md shadow-sm px-2 py-2
             md:py-3  w-[80%] block focus:outline 
             focus:outline-[0.16rem] outline-sky-300
             border-sky-300 " type="number" value={price} 
             onChange={e=> setPrice(e.target.value)}  
            />
        </div>
        <div className="my-2 md:my-3 ">
            <label htmlFor="dept">Quantity</label>
            <input className=" rounded-md shadow-sm px-2 py-2
             md:py-3  w-[80%] block focus:outline 
             focus:outline-[0.16rem] outline-sky-300
             border-sky-300 " type="number" value={quantity} 
             onChange={e=> setQuantity(e.target.value)}  
            />
        </div>

        {/*<div>
           <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>*/}

        <div onClick={(e) => handlePostSubmit(e)} className="w-48 my-2 md:my-1 ">
          <button className=" p-2 w-40 text-lg animation delay-150 duration-300 
            border rounded-md shadow-sm bg-amber-300 hover:bg-amber-400 
            hover:translate-y-[2px]" 
            type="submit">Edit
          </button>
        </div>

    </section> 
    </>
  )
}

export default AdminEditPurchase
