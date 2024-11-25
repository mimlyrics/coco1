import {useState, useEffect} from "react";
const SALES_URL = "api/plot";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { IoIosArrowDropup, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
const PURCHASE_URL = "/api/v1/purchases/purchases";
const USERS_URL = "/api/v1/users/users";
const COOPERATIVES_URL = "/api/v1/cooperatives/cooperatives";

const AdminPurchase = () => {

  const salesJson = [
    {userCode: "1", price: 123, quantity: 3, date: "Mon 4 20234"},
    {userCode: "2", price: 9000, quantity: 3, date: "Mon 4 20234"},
  ]
    const [sales, setSales] = useState(salesJson);
    const [errMsg, setErrMsg] = useState("");

    const [searchplots, setSearchplots] = useState(null);

    const [searchId, setSearchId] = useState("");

    const [successMsg, setSuccessMsg] = useState("");
    const [showMore, setShowMore]  = useState(false);

    const [showplots, setShowplots] = useState([]);

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


    useEffect(() => {
        const getSales = async () => {
            try {
                const res = axios.get(PURCHASE_URL, {headers:{withCredentials: true}});
                setSales(res.data.plots);
            }catch(err) {
                setErrMsg(err?.data?.msg);
            }
        }

        getSales();

    }, [])

    const searchSale = async () => {

    }

    const deleteSales = async (id) => {
      try {
        const res = await axios.delete(SALES_URL, {id: id}, {});
        if(res) {
          setSuccessMsg("Plot has been deleted successfully");
        }
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }

  return (
    <>
    <section className=" md:absolute md:top-16 md:w-[90vw] mx-1 md:ml-[19%] xl:ml-[9%]">
        <div className="my-1 md:w-[90vw]">
            <h1 className=" text-lg md:text-xl text-center bg-amber-200 font-semibold">Admin Sale DashBoard</h1>
        </div>

        <div className="md:w-[100%]">
            <input 
              onKeyDown={(e)=>(e.key === "Enter" ? searchSale(e,searchId) : null)} 
              placeholder="search..." className=" w-96 text-lg p-2 h-11 bg-amber-200 text-gray-700" 
              type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
            <button 
             onClick={(e) => searchSale(e, searchId)} 
             className="h-11 py-2 px-3 md:px-10 ml-1 text-lg bg-amber-300 rounded-md text-gray-700 hover:bg-blue-500 hover:translate-y-[1px] ">
              Search
            </button>
        </div>

        <div className="my-3">
            <Link  to= "/admin/sale/add"  className=" w-11 h-4 p-2 border shadow rounded-lg bg-blue-100 hover:bg-blue-300 hover:translate-y-1" >Ajouter achats</Link>
        </div>

        <div className="font-bold text-lg ">
            <h1>Plot Info</h1>
        </div>

        <div>
          <table className=" border-4">
            <thead>
              
              <th>Code|</th>
              <th>quantity</th>
              <th>price</th>
              <th>date</th>
            </thead>
            {sales? sales.map((sale, i) => {
              return (
                <tr className="" key={sale.id}>
                  <td>{sale.price}</td>
                  <td>{sale.quantity}</td>
                  <td className="">{sale.date}</td>



                  {/*!showMore ? 
                    <div onClick={()=>ShowMore(plot)} className=" cursor-pointer items-center justify-center text-[18px] flex bg-stone-300 hover:bg-slate-300 text-white">
                      <p>More: </p>
                      <IoMdArrowDropdown className=" ml-[5px] w-8 h-8 text-slate-100 hover:text-sltate-300"/>
                    </div> :
                    <div>
                            
                      <div className=" mt-1 grid grid-cols-2 ">
                           
                      </div>
   
                    <div onClick={() => RemoveMore(plot, plot.id)} className=" mt-1 cursor-pointer items-center justify-center text-[18px] flex bg-stone-300 hover:bg-slate-300 text-white">
                        <p>--- </p>
                        <IoIosArrowDropup className=" ml-[5px] w-7 h-7 text-slate-100 hover:text-sltate-300"/>
                      </div> 
                    </div>
                  */}
                  
                  <div className=" flex mt-3">
                      <button><Link onClick={e=> !sale.id ? e.preventDefault(): null}  to= {`/admin/plot/edit?searchId=${sale.id}`}  
                        className=" p-3 border shadow rounded-lg bg-green-200 hover:bg-green-400" >Edit</Link>
                      </button>
                      <button onClick={()=>deleteSales(sale.id)} 
                        className=" ml-4 p-2 border shadow rounded-lg bg-red-200 hover:bg-red-400">Delete
                      </button>
                  </div>

                </tr>
              )
            }) : null}
          </table>
        </div>
    </section> 
    
    </>
  )
}

export default AdminPurchase
