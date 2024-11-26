import {useState, useEffect} from "react"
import "./css/index.css";
import { useMimlyrics } from "./context/AppProvider";
import CLIENT_URL from "./routes/clientRoutes";
import { logout } from "../slices/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../slices/auth/usersApiSlice";
import { selectCurrentUser } from "../slices/auth/authSlice";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import BASE_URL from "./routes/serverRoutes";

const Map = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const userInfo = useSelector(selectCurrentUser);
  const [isRun, setIsRun] = useState(true);  
  const [logOutApiCall, {isLoading}] = useLogoutMutation();
  const [errMsg, setErrMsg] = useState("");
  const location = useLocation();
  const {pathname} = location;

  const [geojsonData, setGeojsonData] = useState(null);

  /*
  { "type": "Feature", "properties": { 
   "CODE_PRODUCTEUR": "L7001",
    "CODE_PARCELLE": "MSL7001",
    "REGION": "Littoral",
    "DEPARTEMENT": "Sanaga-Maritime",
    "ARRONDISSEMENT": "Massock-Songloulou",
    "VILLAGE": "NSINGMANDENG",
     "LIEU_DIT": "Mouande",
      "AGE MOYENNE DE LA PLANTATION": "10-15 ans,5-7 ans,7-10 ans",
       "NOMBRE DE PLANTS": "plus de 3000",
        "PRODUCTION PAR AN": "500-1 tonne",
         "INTRANTS CHIMIQUES UTILISES": "Plantomil Super",
          "FREQUENCE D'UTILISATION DES INTRANTS CHIMIQUES": "3 fois",
           "ENGRAIS UTILISES": "Banzai Bonus",
            "FREQUENCE D'UTILISATION DES ENGRAIS": "3 fois",
             "DIFFICULTES RENCONTREES": "Manque d'infrastructures,Prix instable du cacao", "SUPERFICIE_HA": "01Ha09a20Ca" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 681253.10844482795801, 461033.328205498226453 ], [ 681289.345544800627977, 461013.05639130086638 ], [ 681302.088707284303382, 461025.136153539817315 ], [ 681317.634060331038199, 461011.304590765736066 ], [ 681306.651762076886371, 460966.316443977702875 ], [ 681323.721951061626896, 460926.321454339718912 ], [ 681286.237278673332185, 460905.675665753078647 ], [ 681247.830921002547257, 460901.172833276505116 ], [ 681192.96653937373776, 460962.763417468755506 ], [ 681229.414819670608267, 461001.321159222978167 ], [ 681253.10844482795801, 461033.328205498226453 ] ] ] ] } },
 */
  const [codeProducteur, setCodeProducteur] = useState("");
  const [codeParcelle, setCodeParcelle] = useState("");
  const [region, setRegion] = useState("");
  const [dept, setDept] = useState("");
  const [arr, setArr] = useState("");
  const [village, setVillage] = useState("");
  const [lieuDit, setLieuDit] = useState("");
  const [plantingAge, setplantingAge] = useState("");
  const [surface, setSurface] = useState("");
  const [plantsNb, setPlantsNb] = useState("");
  const [yearProduction, setYearProduction] = useState("");
  const [usedIntrants, setUsedIntrants] = useState("");
  const [uIFrequency, setUIFrequency] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [fFrequency, setfFrequency] = useState("");
  const [difficulties, setDifficulties] = useState("");

  // Parse query parameters
  const searchParams = new URLSearchParams(location.search);
  const userCode = searchParams.get("code");

  useEffect(() => {
    // Remplacez l'URL par celle de votre fichier GeoJSON
    fetch(`${BASE_URL}/api/v1/static/geodatas-gps.geojson`)
      .then((response) => response.json())
      .then((data) => {
        let finalDatas = null;
        if(userCode !== null && userCode !== undefined)
          finalDatas = data.features.filter((feature) => feature.properties.CODE_PRODUCTEUR == userCode)
        else finalDatas = data;

        setGeojsonData(finalDatas);
      })
      .catch((error) => console.error('Erreur lors du chargement du GeoJSON:', error));
  }, []);


  //console.log(showProfile, userInfo);

  const {isActiveModalNavbar, setIsActiveModalNavbar} = useMimlyrics();


  // Gestionnaire d'événements pour chaque objet GeoJSON
  const onEachFeature = (feature, layer) => {
    // Ajoute une action au clic
    layer.on('click', () => {

        let map = layer._map;
        console.log('Objet GeoJSON cliqué:', feature);

        /*
          CODE_PRODUCTEUR
          CODE_PARCELLE
          REGION
          DEPARTEMENT
          ARRONDISSEMENT
          VILLAGE
          LIEU_DIT
          AGE MOYENNE DE LA PLANTATION
          NOMBRE DE PLANTS
          PRODUCTION PAR AN
          INTRANTS CHIMIQUES UTILISES
          FREQUENCE D'UTILISATION DES INTRANTS CHIMIQUES
          ENGRAIS UTILISES
          FREQUENCE D'UTILISATION DES ENGRAIS
          DIFFICULTES RENCONTREES
          SUPERFICIE_HA
        */
        setCodeProducteur(feature.properties.CODE_PRODUCTEUR);
        setCodeParcelle(feature.properties.CODE_PARCELLE);
        setRegion(feature.properties.REGION);
        setDept(feature.properties.DEPARTEMENT);
        setArr(feature.properties.ARRONDISSEMENT);
        setVillage(feature.properties.VILLAGE);
        setLieuDit(feature.properties.LIEU_DIT);
        setplantingAge(feature.properties["AGE MOYENNE DE LA PLANTATION"]);
        setSurface(feature.properties.SUPERFICIE_HA);
        setPlantsNb(feature.properties["NOMBRE DE PLANTS"]);
        setYearProduction(feature.properties["PRODUCTION PAR AN"]);
        setUsedIntrants(feature.properties["INTRANTS CHIMIQUES UTILISES"]);
        setUIFrequency(feature.properties["FREQUENCE D'UTILISATION DES INTRANTS CHIMIQUES"]);
        setFertilizer(feature.properties["ENGRAIS UTILISES"]);
        setfFrequency(feature.properties["FREQUENCE D'UTILISATION DES ENGRAIS"]);
        setDifficulties(feature.properties["DIFFICULTES RENCONTREES"]);
        
        let tmp_lat = feature.geometry.coordinates[0][0][0][1];
        let tmp_long = feature.geometry.coordinates[0][0][0][0];

        console.log({ "tmp_lat": tmp_lat, "tmp_long": tmp_long });
        map.setView([tmp_lat, tmp_long], 15);

        layer.bindPopup(`
            <h1 class="text-center mb-4 text-[brown]">Parcelle : ${feature.properties.CODE_PARCELLE}</h1>
            <b>Code Producteur :</b> ${feature.properties.CODE_PRODUCTEUR}<br>
            <b>Surface :</b> ${feature.properties.SUPERFICIE_HA}<br>
            <b>Département :</b> ${feature.properties.DEPARTEMENT}<br>
            <b>Arrondissement :</b> ${feature.properties.ARRONDISSEMENT}<br>
            <b>Village :</b> ${feature.properties.VILLAGE}<br>
            <b>Lieu dit :</b> ${feature.properties.LIEU_DIT}<br>
            `).openPopup();
    });
  };

  const dynamicStyle = (feature) => {
    return {
      color: feature.properties.color || 'brown', // Couleur basée sur une propriété
      weight: 2,
      fillOpacity: 0.7,
    };
  };

  return ( 
    <div className="">

      <section className={ isActiveModalNavbar ? " relative opacity-60 -z-50 mt-24" :  "flex flex-col z-50 font-medium space-x-1 mt-24" }>
        <div className=' mt-2 md:mt-2 pl-2 pr-14 py-1'>
          <div className=" ">
            <h1 className="border-l text-4xl md:text-[2.5rem] "><strong>Parcelles</strong></h1>
            
            {/* <p className=" pt-2 ">
              This web app is subdivided into categories 
            </p> */}
          </div>
        </div>
        

        <MapContainer 
            center={[4.16934, 10.632949]} // Coordonnées (latitude, longitude) (4.16934, 10.632949) pour centrer la carte
            zoom={13} 
            style={{ height: '60vh', width: '100%' }} // Style de la carte
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Fournisseur de tuiles (OpenStreetMap)
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* <Marker position={[4.16934, 10.632949]}>
                <Popup>POPUP</Popup>
            </Marker> */}

            {geojsonData && (
                <GeoJSON 
                data={geojsonData} 
                style={dynamicStyle}
                onEachFeature={onEachFeature} 
                />
            )}
        </MapContainer>

        <div className="mt-8">
            <h1 className="border-l text-2xl md:text-[1.5rem] "><strong>Plus de détails sur la Parcelle</strong></h1>
        <div className="flex flex-col md:flex-row justify-between ml-8">
            <div className="flex-1 mt-3">
                <b>Code Producteur: </b> { codeProducteur }<br/><br/>
                <b>Code Parcelle : </b> { codeParcelle }<br/><br/>
                <b>Region : </b> { region }<br/><br/>
                <b>Département : </b> { dept }<br/><br/>
                <b>Arrondissement : </b> { arr }<br/><br/>
                <b>Village : </b> { village }<br/><br/>
                <b>Lieu dit : </b> { lieuDit }<br/><br/>
                <b>Surface : </b> { surface }<br/><br/>
            </div>

            <div className="flex-1 mt-3">
                <b>Age moyen de la plantation : </b> { plantingAge }<br/><br/>
                <b>Nombre de plants : </b> { plantsNb }<br/><br/>
                <b>Production moyen par an : </b> { yearProduction }<br/><br/>
                <b>Intrants chimiques utilisés : </b> { usedIntrants }<br/><br/>
                <b>Fréquence d'utilisation des intrants chimiques : </b> { uIFrequency }<br/><br/>
                <b>Engrais utilisés : </b> { fertilizer }<br/><br/>
                <b>Difficultées rencontrées : </b> <ul className="ml-4">
                  { difficulties.split(",").map((element, index) => (
                    <li key={index}>{element.trim()}</li>
                  ))}</ul>
                <br/>
            </div>
        </div>
        </div>
        <div className="m-0 mt-8 box-border flex flex-col md:text-lg md:py-1 text-white bg-[brown]">
          <div className="flex justify-around text-gray-100 jus p-4 flex-wrap">
            <div className="mx-2">
              <h2 className="text-center text-gray-300 mt-3">Contacts</h2>
              (+237) 6xx xx xx xx<br/>
              (+237) 6xx xx xx xx<br/>
            </div>
            <div className="mx-2">
                <h2 className="text-center text-gray-300 mt-3">Adresses email</h2>
                tracecocoa.camer@gmail.com<br/>
                adresseemail2@gmail.com<br/>
            </div>
            <div className="mx-2">
                <h2 className="text-center text-gray-300 mt-3">Infos supplémentaires</h2>
                Ministère de l&apos;agriculture<br/>

                {/* <h2 className="text-center text-gray-300 mt-2">QR Code producteur</h2> */}
                
            </div>
          </div>
          <div className="text-center border-t">
            Copyright © 2024 Tous droits reservés
          </div>
 
        </div>
      </section>
    </div>

  );
}

export default Map