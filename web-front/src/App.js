import { useEffect, useState} from "react";
import Clusters from "./ClusersMonitoring";
import ConfigEditor from "./ConfigEditor";
import Settings from "./Settings";
import clsx from "clsx";
import { WS, HTTP } from "./constants";
import { useFormik } from "formik";
import axios from "axios"

function App() {

  const ARR = [
    {label:"Config", id:"config", Code: (props) => <ConfigEditor {...props}/>},
    {label:"Setting", id:"setting", Code: (props) => <Settings {...props} />},
    {label:"Clusters", id:"clusters", Code: (props) => <Clusters {...props}/> },
  ]

  const formik = useFormik({
    initialValues: {
        file: null,
        aliasing: 5,
        config: '// default'
    },
    onSubmit: values => {
        console.log(`${HTTP}/generate`)
        axios.post(`${HTTP}/generate`, values, {
          headers: {
              "Allow-Origin-Allow-Access": "*"
          }
        })
        .then(response => {
          // Si la requête a réussi, vous pouvez traiter la réponse ici
        })
        .catch(error => {
          // Si la requête a échoué, vous pouvez traiter l'erreur ici
          console.log(error)
          if (error.response && error.response.status === 400) {
              alert(`Erreur : ${error.response.data}`);
          } else {
              console.error("Erreur inattendue :", error);
          }
      } );
    }
});

  const [opened, setOpened] = useState(ARR[1].id)
  const [clusters, setClusters] = useState([])

  useEffect(() => (
    new WebSocket(WS).onmessage = async (e) => {
      console.log(e)
      if (e && e.data) {
        console.log(JSON.parse(e.data))
        setClusters(JSON.parse(e.data))
      }
    }
  ), [])

  return (
    <div className="h-screen w-screen bg-white grid grid-cols-6 p-6 gap-6">
      <div className="bg-cyan-300 col-span-4 rounded-2xl p-4">img</div>
      <div className="bg-cyan-200 col-span-2 rounded-2xl max-h-screen overflow-y-auto">
        <div className="flex justify-evenly h-[4%]">
          {ARR.map(e => (
            <button
              key={e.id}
              onClick={() => setOpened(e.id)}
              className={clsx(
                "w-full",
                "bg-cyan-400",
                opened === e.id ? "border-b-4 border-cyan-600" : "",
                "first:rounded-tl-2xl last:rounded-tr-2xl",
                "hover:bg-cyan-500 transition duration-200",
              )}
            >{e.label}</button>
        ))}
        </div>
        <div className="bg-cyan-700 h-[96%] rounded-b-2xl overflow-y-auto">
          {ARR.find(e => e.id === opened).Code({clusters, formik})}
        </div>
      </div>
    </div>
  );
}

export default App;
