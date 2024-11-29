import {useState, useEffect} from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { IoIosArrowDropup, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../slices/auth/authSlice";
import { SALE_URL, COOPERATIVE_URL, EXPORTER_URL } from "../../routes/serverRoutes";
const AdminSale = () => {

  const salesJson = [
    {ExporterId: "1", price: 123, quantity: 3, date: "Mon 4 20234"},
    {ExporterId: "2", price: 9000, quantity: 3, date: "Mon 4 20234"},
  ]
    const [sales, setSales] = useState([]);
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

    const correctPassword = "makeSale";

    /*
    <th>Exportateur</th>
              <th>Cooperative</th>
              <th>quantity</th>
              <th>price</th>
              <th>date</th>

              <td>{sale.exporterId}</td>
                  <td>{sale.cooperativeId}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.price}</td>
                  <td>D{sale.date}</td>   
    */
    useEffect(() => {
        const getSales = async () => {
            try {
                const res = await axios.get(SALE_URL, {headers:{Authorization: `Bearer ${token}`, withCredentials: true}});
                console.log(res);

                const coopsDt = await axios.get(COOPERATIVE_URL, {headers:{Authorization: `Bearer ${token}`, withCredentials: true}});
                const exportersDt = await axios.get(EXPORTER_URL, {headers:{Authorization: `Bearer ${token}`, withCredentials: true}});

                console.log("\n\n");
                console.log({"coopsDt" : coopsDt, "exportersDt" : exportersDt});
                console.log("\n\n");

                let datas = [];
                for(let i = 0; i < res.data.length; i++)
                {
                  let sale = res.data[i];

                  let finalDate = new Date(sale.createdAt);

                  let cN = "", eN = "";
                  if(coopsDt.data.filter((elt) => elt.id == sale.cooperativeId).length > 0) cN = coopsDt.data.filter((elt) => elt.id == sale.cooperativeId)[0].name;
                  if(exportersDt.data.filter((elt) => elt.id == sale.exporterId).length > 0) eN = exportersDt.data.filter((elt) => elt.id == sale.exporterId)[0].name;

                  let obj = {
                    "id": sale.id,
                    "cooperativeName": cN,
                    "exporterName": eN,
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

  const SearchSale = async (e, name) => {
    console.log(name);
    e.preventDefault();
    try { 
        const res = await axios.get(`${SALE_URL}`, {headers: {Authorization: `Bearer ${token}`,withCredentials: true}});
        console.log(res.data);
        //setPlots(null);
        setSearchSales(res?.data.filter(el => el.exporterId.includes(name)));
        console.log(searchSales);
    }catch(err) {
        console.log(err);
        setErrMsg(err?.response?.data?.message);
    }
  }

    const deleteSales = async (id) => {
      console.log(id);
      try {
        const res = await axios.delete(`${SALE_URL}/${id}`, {headers: {Authorization: `Bearer ${token}`, withCredentials: true}});
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
        <section className=" md:absolute md:top-16 md:w-[90vw] mx-1 md:ml-[19%] xl:ml-[9%] mt-28">
            <div className="my-1 md:w-[90vw]">
            <h1 className="border-l text-4xl md:text-[2.5rem]"><strong>Ventes</strong></h1>
            </div>
    
            {searchSales ? <h1 className="text-center font-bold py-3 text-amber-800 bg-amber-200">ventes trouves</h1> : null}
            {/* <button className=" m-1 p-3 bg-amber-300 rounded-md" onClick={()=>setSearchSales(null)}>All ventes</button> */}
    
            <div className="md:w-[500px] m-auto flex">
                <input 
                  onKeyDown={(e)=>(e.key === "Enter" ? SearchSale(e,searchId) : null)} 
                  placeholder="Rechercher..." className=" w-96 text-lg p-2 h-11 rounded  border px-4 text-black flex-1" 
                  type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
                <button 
                onClick={(e) => SearchSale(e, searchId)} 
                className="h-11 py-2 px-3 md:px-10 ml-1 text-lg bg-amber-300 rounded-md text-black hover:bg-blue-500 hover:translate-y-[1px] ">
                  Rechercher
                </button>
            </div>
    
            <div className="my-3 py-4 px-8 m-auto text-center">
                <Link  to= "/admin/sale/add"  className="w-11 h-4 p-2 border shadow rounded-lg bg-blue-100 hover:bg-blue-300 hover:translate-y-1" >Ajouter ventes</Link>
            </div>
    
            <div className="font-bold text-lg ">
                <h1 className="text-2xl">Détails ventes</h1>
            </div>
    
    
            {searchSales ?
            <div>
              <table className="border-4 my-3 py-4 px-8 m-auto text-center">
                <thead>
                  
                  <th className="mx-2 min-w-32">Exportateur</th>
                  <th className="mx-2 min-w-32">Cooperative</th>
                  <th className="mx-2 min-w-32">quantité</th>
                  <th className="mx-2 min-w-32">prix</th>
                  <th className="mx-2 min-w-32">date</th>
                </thead>
                <tbody>
                {searchSales? searchSales.map((sale, i) => {
                  return (
                    <tr className="" key={sale.id}>
                      <td>{sale.exporterName}</td>
                      <td>{sale.cooperativeName}</td>
                      <td>{sale.quantity}</td>
                      <td>{sale.price} XAF</td>
                      <td>D{sale.date}</td>    
                      <div className=" flex mt-3">
                          <button><Link onClick={e=> !sale.id ? e.preventDefault(): null}  to= {`/admin/sale/edit?searchId=${sale.id}`}  
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
                  
                  <th className="mx-2 min-w-32">Exportateur</th>
                  <th className="mx-2 min-w-32">Cooperative</th>
                  <th className="mx-2 min-w-32">quantité</th>
                  <th className="mx-2 min-w-32">prix</th>
                  <th className="mx-2 min-w-32">date</th>
                </thead>
                <tbody>
                {sales? sales.map((sale, i) => {
                  return (
                    <tr className="" key={sale.id}>
                      <td>{sale.exporterName}</td>
                      <td>{sale.cooperativeName}</td>
                      <td>{sale.quantity}</td>
                      <td>{sale.price} XAF</td>
                      <td>D{sale.date}</td>    
                      <div className=" flex mt-3">
                          <button><Link onClick={e=> !sale.id ? e.preventDefault(): null}  to= {`/admin/sale/edit?searchId=${sale.id}`}  
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
      </>}
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

export default AdminSale
