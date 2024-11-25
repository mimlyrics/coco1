import {useState, useEffect} from "react"
import "./css/index.css";
import { useMimlyrics } from "./context/AppProvider";

import { logout } from "../slices/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../slices/auth/usersApiSlice";
import { selectCurrentUser } from "../slices/auth/authSlice";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";

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

  /* { "type": "Feature",
        "properties": { 
         "id": null,
         "Num_Operat": "A01146",
         "Region": "Littoral",
         "Departemen": "Sanaga-Maritime",
         "Arrondi_Pa": "MASSOK",
         "Village": "NSINGMANDENG",
         "Lieu_Dit": "Mouande",
         "Statut_Pac": "Domaine National",
         "Surface": 10920, "Date_Leve": "08/07/2024", "Cooperative": "MUDEVAN",
         "Nom(s)": "NDJIKI", "Prenom(s)": "Esaie", "Tel": "692995616", "Mobile": null, "Sexe": "Masculin", "Né(e) le": "1946-03-22", "Né(e) à": "Kokoa ", "Sit Matrimoniale": "Marié(e)", "Résidence": "SINGMANDENG", "Mail": null, "N°CNI": "500154135", "Delivree le": "2023-09-25", "Expire le ": "2033-09-25", "Date d'adhesion": "2023-10-25", "Niveau d'etude": "Primaire", "Statut": "Actif", "Photo": "Photo_Producteur/Photo_NDJIKI Esaie.JPG", "Recto CNI": "Photo_CNI_Recto/Rectocni_NDJIKI Esaie.JPG", "Verso CNI": "Photo_CNI_verso/Versocni_NDJIKI Esaie.JPG", "Compte Bancaire": null, "Controle Qualité": null, "Bonnes Pratiques": null, "Ecole Paysanne": null, "Certification": null, "Entrepreneuriat agricole": null, "Exploitation existe": null, "Date de leve": "2024-07-08", "Operateur": "A", "VILLAGES": "SINGMANDENG", "Quel est l'age de votre plantation?\n": "{\"10-15 ans\",\"5-7 ans\",\"7-10 ans\"}", "quels Nombres de plants contient votre parcelle?\n": "{\"plus de 200\"}", "Quelle quantite de cacao produisez-vous en moyenne par an?\n": "{\"500-1 tonne\"}", "Quels produits phytosanitaires (insecticides  fongicides pesticides) utilisez vous? \n": "{\"Plantomil Super\"}", "Combien de fois utilisez-vous ces produits par an?\n": "{\"3 fois\"}", "Quels types d'engrais utilisez-vous?\n": "{\"Banzai Bonus`\"}", "Combien de fois utilisez-vous ces engrais par an?\n": "{\"3 fois\"}", "Quel problemes rencontrez-vous?\n": "{\"Manque d'infrastructures\",\"Prix instable du cacao\"}", "layer": "t1", "path": "C:/Users/GENERAL STORES/Desktop/PROJET CICC phase 5/DIGITALISATION/identifications MASSOCK/08-07-2024/Tablette 01/Identifications_MASSOCK/Nouveau GeoPackage.gpkg|layername=Operateurs" }, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 10.632949, 4.16934 ], [ 10.633275, 4.169156 ], [ 10.63339, 4.169265 ], [ 10.633529754780202, 4.169139627886718 ], [ 10.63343, 4.168733 ], [ 10.633583, 4.168371 ], [ 10.633245, 4.168185 ], [ 10.632899, 4.168145 ], [ 10.632406, 4.168703 ], [ 10.632735, 4.169051 ], [ 10.632949, 4.16934 ] ] ] ] } } */
  const [numOperat, setNumOperat] = useState("");
  const [region, setRegion] = useState("");
  const [dept, setDept] = useState("");
  const [arr, setArr] = useState("");
  const [Village, setVillage] = useState("");
  const [lieuDit, setLieuDit] = useState("");
  const [statut, setStatut] = useState("");
  const [surface, setSurface] = useState("");
  const [coop, setCoop] = useState("");
  const [name, setName] = useState(""); // nom prenom tel sexe
  const [surName, setSurName] = useState("");
  const [tel, setTel] = useState("");
  const [sex, setSex] = useState("");

  const [lat, setLat] = useState(4.16934);
  const [long, setLong] = useState(10.632949);
  const [zoom, setZoom] = useState(13);
  useEffect(() => {
    // Remplacez l'URL par celle de votre fichier GeoJSON
    fetch('http://localhost:5000/api/v1/static/geodatas-gps.geojson')
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
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
        setNumOperat(feature.properties.Num_Operat);
        setRegion(feature.properties.Region);
        setDept(feature.properties.Departemen);
        setArr(feature.properties.Arrondi_Pa);
        setVillage(feature.properties.Village);
        setLieuDit(feature.properties.Lieu_Dit);
        setStatut(feature.properties.Statut_Pac);
        setSurface(feature.properties.Surface);
        setCoop(feature.properties.Cooperative);
        setName(feature.properties["Nom(s)"]);
        setSurName(feature.properties["Prenom(s)"]);
        setTel(feature.properties.Tel);
        setSex(feature.properties.Sexe);
        
        let tmp_lat = feature.geometry.coordinates[0][0][0][1];
        let tmp_long = feature.geometry.coordinates[0][0][0][0];

        console.log({ "tmp_lat": tmp_lat, "tmp_long": tmp_long });
        map.setView([tmp_lat, tmp_long], 15);

        layer.bindPopup(`
            <h2>Parcelle</h2>
            <b>Surface :</b> ${feature.properties.Surface} m<sup>2</sup><br>
            <b>Proprietaire :</b> ${feature.properties["Noms(s)"] == undefined ? "" : feature.properties["Noms(s)"]} ${feature.properties["Prenom(s)"] == undefined ? "" : feature.properties["Prenom(s)"]}<br>
            <b>Téléphone :</b> ${feature.properties.Tel}<br>
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
                <b>Numéro Opérateur : </b> { numOperat }<br />
                <b>Région : </b> { region }<br/>
                <b>Département : </b> { dept }<br/>
                <b>Arrondissement : </b> { arr }<br/>
                <b>Village : </b> { Village }<br/>
                <b>Lieu dit : </b> { lieuDit }<br/>
            </div>

            <div className="flex-1 mt-3">
                <b>Statut : </b> { statut }<br/>
                <b>Surface : </b> { surface } m<sup>2</sup><br/>
                <b>Cooperative : </b> { coop }<br/>
                <b>Nom(S) propriétaire : </b> { name }<br/>
                <b>Prénom(s) propriétaire : </b> { surName }<br/>
                <b>Téléphone propriétaire : </b> { tel }<br/>
                <b>Sexe : </b> { sex }<br/>
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

                <h2 className="text-center text-gray-300 mt-2">QR Code producteur</h2>
                
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