import {useState, useEffect} from "react";
const PURCHASE_URL = "api/purchases/purchases";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { IoIosArrowDropup, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
const USERS_URL = "/api/v1/users/users";
const COOPERATIVES_URL = "/api/v1/cooperatives/cooperatives";
const AdminAddPurchase = () => {
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

    const [date, setDate] = useState("");

    const [usersCode, setUsersCode] = useState([]);
    const [cooperativesId, setCooperativesId] = useState([]);

    useEffect(() => {
      const getUsersCode = async () => {
        try {
          const res = await axios.get(USERS_URL, {});
          if(res) {
            setUsersCode(res?.data?.users);
          }
        }catch(err) {
          setErrMsg(err?.data?.message);
        }
      }

      getUsersCode();
    }, [])

    useEffect(() => {
      const getCooperativesId = async () => {
        try {
          const res = await axios.get(COOPERATIVES_URL, {});
          if(res) {
            setCooperativesId(res?.data?.cooperatives);
          }
        }catch(err) {
          setErrMsg(err?.data?.message);
        }
      }

      getCooperativesId();
    }, [])

  return (
    <>
    <section className=" md:ml-[21%] md:w-[55vw] bg-gradient-to-r from-amber-200 to-amber-300 md:bg-zinc-200
        px-1">
      <div className=" my-2 mt-1 bg-gradient-to-l from-amber-400 ">
        <h1 className="text-2xl text-center ">Admin Plot DashBoard</h1>
      </div>
            

        <div className="my-3 text-lg ">
          <label htmlFor='code'>Code</label>
          <select className="h-11 px-5 text-gray-700 font-semibold rounded-md shadow-sm border outline-none
            w-[80%] block" value={userCode} onChange={e=>setUserCode(e.target.value)}
          > 

          {usersCode ? usersCode.map(user => {
            return (
              <option key={user.id}>
                {user.code} {user.username}
              </option>
            )
          }) : null}
          
          </select>
        </div>
        <div className="my-3 text-lg ">
          <label htmlFor='region'>Region</label>
          <select className="h-11 px-5 text-gray-700 font-semibold rounded-md shadow-sm border outline-none
            w-[80%] block" value={cooperativeId} onChange={e=>setCooperativesId(e.target.value)}
          > 
            {cooperativesId ? cooperativesId.map((cooperative,i) => {
              return (<option className=" rounded-lg font-sans m-3" key={i} value={cooperative}>{cooperative}</option>)
            }) : null}
          </select>
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

        <div>
           <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>



    </section> 
    </>
  )
}

export default AdminAddPurchase
