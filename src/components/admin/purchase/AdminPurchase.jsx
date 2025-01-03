import {useState, useEffect} from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { IoIosArrowDropup, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../slices/auth/authSlice";
import { FaPlus } from "react-icons/fa6";
import { PURCHASE_URL, COOPERATIVE_URL } from "../../routes/serverRoutes";
const AdminPurchase = () => {

  const salesJson = [
    {userCode: "1", price: 123, quantity: 3, date: "Mon 4 20234"},
    {userCode: "2", price: 9000, quantity: 3, date: "Mon 4 20234"},
  ]
    const [sales, setSales] = useState([]);
    const [cooperatives, setCooperatives] = useState([]);
    const [errMsg, setErrMsg] = useState("");

    const [searchId, setSearchId] = useState("");

    const [successMsg, setSuccessMsg] = useState("");
    const [showMore, setShowMore]  = useState(false);

    const [showplots, setShowplots] = useState([]);

    const [usersCode, setUsersCode] = useState([]);
    const [cooperativesId, setCooperativesId] = useState([]);

    const [searchSales, setSearchSales] = useState(null);

    const [showPopup, setShowPopup] = useState(true);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const token = useSelector(selectCurrentToken);

    const correctPassword = "makePurchase";

    useEffect(() => {
        const getSales = async () => {
            try {
                const res = await axios.get(PURCHASE_URL, {headers:{Authorization: `Bearer ${token}`, withCredentials: true}});
                console.log(res);

                const coopsDt = await axios.get(COOPERATIVE_URL, {headers:{Authorization: `Bearer ${token}`, withCredentials: true}});

                let datas = [];
                for(let i = 0; i < res.data.length; i++)
                {
                  let sale = res.data[i];

                  let finalDate = new Date(sale.createdAt);

                  // console.log({"FILTERED DATAS" : coopsDt.data.filter((elt) => elt.id == sale.cooperativeId)[0].name});

                  let cN = "";
                  if(coopsDt.data.filter((elt) => elt.id == sale.cooperativeId).length > 0) cN = coopsDt.data.filter((elt) => elt.id == sale.cooperativeId)[0].name;

                  let obj = {
                    "id": sale.id,
                    "userCode": sale.userCode,
                    "cooperativeName": cN,
                    "quantity": sale.quantity,
                    "price": sale.price,
                    "date": finalDate.toLocaleDateString()
                  };

                  datas.push(obj);
                }

                //setSales(res.data);
                setSales(datas);
            }catch(err) {
              console.log(err);
                setErrMsg(err?.response?.data?.message);
            }
        }

        getSales();

    }, [])

  const SearchPurchase = async (e, name) => {
    console.log(name);
    e.preventDefault();
    try { 
        const res = await axios.get(`${PURCHASE_URL}`, {headers: {Authorization: `Bearer ${token}`,withCredentials: true}});
        console.log(res.data);
        //setPlots(null);
        setSearchSales(res?.data.filter(el => el.userCode.toLowerCase().includes(name.toLowerCase())));
        console.log(searchSales);
    }catch(err) {
        console.log(err);
        setErrMsg(err?.response?.data?.message);
    }
  }

    const deleteSales = async (id) => {
      console.log(id);
      try {
        const res = await axios.delete(`${PURCHASE_URL}/${id}`, {headers: {Authorization: `Bearer ${token}`, withCredentials: true}});
        console.log(res.data);
        setSales(sales.filter(sal => sal.id !==id));
        if(res) {
          setSuccessMsg("purchase has been deleted successfully");
        }
      }catch(err) {
        setErrMsg(err?.response?.data?.message);
      }
    }

    const handlePasswordSubmit = (e) => {
      e.preventDefault();
  
      if (password === correctPassword) {
        setShowPopup(false);
        setError("");
      } else {
        setError("Mot de passe d'accès incorrect !");
      }
    };
  return (
    <div>
      {showPopup && (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            <h2>Confirmation requise</h2>
            <p>Veuillez entrer le mot de passe pour accéder à cette page :</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Confirmer
              </button>
            </form>
            {error && <p style={styles.error}>{error}</p>}
          </div>
        </div>
      )}

      {!showPopup && 
      <>
      <section className=" md:relative md:top-16 md:w-[90vw] mx-1 md:ml-[19%] xl:ml-[9%] mt-28">
          <div className="my-1 md:w-[90vw]">
              {/* <h1 className=" text-lg md:text-xl text-center bg-amber-200 font-semibold">Achats</h1> */}
              <h1 className="border-l text-4xl md:text-[2.5rem]"><strong>Achats</strong></h1>
          </div>
  
          {searchSales ? <h1 className="text-center font-bold py-3 text-amber-800 bg-amber-200">Achats trouves</h1> : null}
          {/* <button className=" m-1 p-3 bg-amber-300 rounded-md" onClick={()=>setSearchSales(null)}>Tout afficher</button> */}
  
          <div className="md:w-[500px] m-auto flex">
              <input 
                onKeyDown={(e)=>(e.key === "Enter" ? SearchPurchase(e,searchId) : null)} 
                placeholder="Rechercher..." className=" w-96 text-lg p-2 h-11 rounded  border px-4 text-black flex-1" 
                type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
              <button 
               onClick={(e) => SearchPurchase(e, searchId)} 
               className="h-11 py-2 px-3 md:px-10 ml-1 text-lg bg-amber-300 rounded-md text-black hover:bg-blue-500 hover:translate-y-[1px] ">
                Rechercher
              </button>
          </div>
  
          <div className="my-3 py-4 px-8 m-auto text-center">
              <Link  to= "/admin/purchase/add"  className="w-11 h-4 p-2 border shadow rounded-lg bg-blue-100 hover:bg-blue-300 hover:translate-y-1" >
                Ajouter achats
              </Link>
              {/* <a href="/admin/purchase/add" className="w-full h-full text-center"> Ajouter Achat </a>  */}
          </div>
  
          <div className="font-bold text-lg">
              <h1 className="text-2xl"><b>Détails Achats</b></h1>
          </div>
  
  
          {searchSales ?
          <div>
            <table className="border-4 my-3 py-4 px-8 m-auto text-center">
              <thead>
                
                <th>Producteur</th>
                <th>Cooperative</th>
                <th>quantité</th>
                <th>prix</th>
                <th>date</th>
              </thead>
              <tbody>
              {searchSales? searchSales.map((sale, i) => {
                return (
                  <tr className="" key={sale.id}>
                    <td>{sale.userCode}</td>
                    <td>{sale.cooperativeName}</td>
                    <td>{sale.quantity}</td>
                    <td>{sale.price} XAF</td>
                    <td>{sale.date}</td>    
                    <div className=" flex mt-3">
                        <button><Link onClick={e=> !sale.id ? e.preventDefault(): null}  to= {`/admin/purchase/edit?searchId=${sale.id}`}  
                          className=" p-3 border shadow rounded-lg bg-green-200 hover:bg-green-400" >Edit</Link>
                        </button>
                        <button onClick={()=>deleteSales(sale.id)} 
                          className=" ml-4 p-2 border shadow rounded-lg bg-red-200 hover:bg-red-400">Delete
                        </button>
                    </div>
  
                  </tr>
                )
              }) : null}
              </tbody>
            </table>
          </div>        
          
           : 
           <div>
            <table className="border-4 my-3 py-4 px-8 m-auto text-center">
              <thead>
                <th className="mx-2 min-w-32">producteur</th>
                <th className="mx-2 min-w-32">Cooperative</th>
                <th className="mx-2 min-w-32">quantité</th>
                <th className="mx-2 min-w-32">prix</th>
                <th className="mx-2 min-w-32">date</th>
              </thead>
              <tbody>
              {sales? sales.map((sale, i) => {
                return (
                  <tr className="" key={sale.id}>
                    <td>{sale.userCode}</td>
                    <td>{sale.cooperativeName}</td>
                    <td>{sale.quantity}</td>
                    <td>{sale.price} XAF</td>
                    <td>{sale.date}</td>
                    <div className=" flex mt-3">
                        <button><Link onClick={e=> !sale.id ? e.preventDefault(): null}  to= {`/admin/purchase/edit?searchId=${sale.id}`}  
                          className=" p-3 border shadow rounded-lg bg-green-200 hover:bg-green-400" >Edit</Link>
                        </button>
                        <button onClick={()=>deleteSales(sale.id)} 
                          className=" ml-4 p-2 border shadow rounded-lg bg-red-200 hover:bg-red-400">Delete
                        </button>
                    </div>
  
                  </tr>
                )
              }) : null}
              </tbody>
            </table>
          </div>        
          }
  
  
      </section> 
      
      </>
      }
    </div>
    
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default AdminPurchase
