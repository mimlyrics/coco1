import {useState, useEffect} from "react";
const PLOT_URL = "api/plot";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { IoIosArrowDropup, IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
const AdminPlot = () => {

  const plotJson = [
    {id: "123",code: "234", region: "west", dept: "1234", area: "345", 
      village: "any", location: "test", xCoord: 1.5, yCoord: 24, fertilizer: "any rombu", plantingAge: 14, plantsNumber: 345, productionPerYear: 456, 
    chemistryIntrants: "chem 45", CIYearUseFrequency: "fre4", fYearUseFrequency: "freq29", difficulties: "any day, any time" },
    {id:456, code: "234", region: "west", dept: "1234", area: "345", 
      village: "any", location: "test", xCoord: 1.5, yCoord: 24, fertilizer: "any rombu", plantingAge: 14, plantsNumber: 345, productionPerYear: 456, 
    chemistryIntrants: "chem 45", CIYearUseFrequency: "fre4", fYearUseFrequency: "freq29", difficulties: "any day, any time" },  
  ]
    const [plots, setPlots] = useState(plotJson);
    const [errMsg, setErrMsg] = useState("");

    const [searchplots, setSearchplots] = useState(null);

    const [searchId, setSearchId] = useState("");

    const [successMsg, setSuccessMsg] = useState("");
    const [showMore, setShowMore]  = useState(false);

    const [showplots, setShowplots] = useState([]);

    useEffect(() => {
        const getPlots = async () => {
            try {
                const res = axios.get(PLOT_URL, {headers:{withCredentials: true}});
                setPlots(res.data.plots);
            }catch(err) {
                setErrMsg(err?.data?.msg);
            }
        }

        getPlots();

    }, [])

    const searchPlot = async () => {

    }

    const deletePlot = async (id) => {
      try {
        const res = await axios.delete(PLOT_URL, {id: id}, {});
        if(res) {
          setSuccessMsg("Plot has been deleted successfully");
        }
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }

    

    const ShowMore = async (plot) => {
      console.log(plot);
      setShowplots([...showplots, plot]);
      console.log(showplots);
      setShowMore(!showMore);
    }

    const RemoveMore = async (plot, id) => {
      console.log(plot, id);
      const index = showplots.findIndex(plot => plot.id == id);
      if(index !== -1 ) {
        showplots.splice(index, 1);
        setShowplots([...plots]);
      }
      console.log(showplots);
      setShowMore(!showMore);
    }






  return (
    <>
    <section className=" md:absolute md:top-16 md:w-[90vw] mx-1 md:ml-[19%] xl:ml-[9%]">
        <div className="my-1 md:w-[90vw]">
            <h1 className=" text-lg md:text-xl text-center bg-amber-200 font-semibold">Admin Plot DashBoard</h1>
        </div>

        <div className="md:w-[100%]">
            <input 
              onKeyDown={(e)=>(e.key === "Enter" ? searchPlot(e,searchId) : null)} 
              placeholder="search..." className=" w-96 text-lg p-2 h-11 bg-amber-200 text-gray-700" 
              type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
            <button 
             onClick={(e) => searchPlot(e, searchId)} 
             className="h-11 py-2 px-3 md:px-10 ml-1 text-lg bg-amber-300 rounded-md text-gray-700 hover:bg-blue-500 hover:translate-y-[1px] ">
              Search
            </button>
        </div>

        <div className="my-3">
            <Link  to= "/admin/plot/add"  className=" w-11 h-4 p-2 border shadow rounded-lg bg-blue-100 hover:bg-blue-300 hover:translate-y-1" >Ajouter plot</Link>
        </div>

        <div className="font-bold text-lg ">
            <h1>Plot Info</h1>
        </div>

        <div>
          <table className=" border-4">
            <thead>
              <th>Code|</th>
              <th>Region</th>
              <th>Dept</th>
              <th>area</th>
              <th>Village</th>
              <th>Location</th>
              <th>Xcoord</th>
              <th>Ycoord</th>
              <th>Plannting Age</th>
              <th>Plants Number</th>
              <th>Prod per year</th>
              <th>Ch Intrants</th>
              <th>CI Year use freq</th>
              <th>fertilizer</th>
              <th>fyear use freq</th>
              <th>Difficulties</th>
            </thead>
            {plots? plots.map((plot, i) => {
              return (
                <tr className="" key={plot.id}>
                  <td>{plot.code}</td>
                  <td>{plot.region}</td>
                  <td className="">{plot.dept}</td>
                  <td>{plot.area}</td>
                  <td>{plot.village}</td>
                  <td>{plot.location}</td>
                  <td>{plot.xCoord}</td>

                  <td>{plot.yCoord}</td>
                  <td>{plot.plantingAge}</td>
                  <td>{plot.plantsNumber}</td>
                  <th>{plot.productionPerYear}</th>
                  <td>{plot.chemistryIntrants}</td>
                  <td>{plot.CIYearUseFrequency}</td>

                  <td>{plot.fertilizer}</td>
                  <td>{plot.fYearUseFrequency}</td>
                  <td>{plot.difficulties.substring(0,20)}</td>



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
                      <button><Link onClick={e=> !plot.id ? e.preventDefault(): null}  to= {`/admin/plot/edit?searchId=${plot.id}`}  
                        className=" p-3 border shadow rounded-lg bg-green-200 hover:bg-green-400" >Edit</Link>
                      </button>
                      <button onClick={()=>deletePlot(plot.id)} 
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

export default AdminPlot
