import React, { useEffect, useState } from "react";
import Mapir from "mapir-react-component";
import 'mapbox-gl/dist/mapbox-gl.css';
import locationIcon from "../assets/icons/Group 426.svg"
import slectedlocationIcon from "../assets/icons/Group 373.svg"

interface Branch {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  attributes: BranchAttributes;
}

interface BranchAttributes {
  phone: string;
  address: string;
  working_hours: string;
  metro_distance: string;
  parking_distance: string;
}


interface MapComponentProps {
  onSelectBranch: (branchName: string) => void;
}


const Map = Mapir.setToken({
  transformRequest: (url: string) => {
    return {
      url: url,
      headers: {
        'x-api-key': 'your-api-key-here',
        'Mapir-SDK': 'reactjs'
      }
    };
  }
});

const MapComponent: React.FC<MapComponentProps> = ({ onSelectBranch }) => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);


  const handleSelect = (branchId: string) => {
    setSelectedLocation(branchId);
    onSelectBranch(branchId);
  };

  useEffect(() => {
    fetch("http://localhost:3001/hammiz")
      .then((res) => res.json())
      .then((data) => {
        setBranches(data);
        setLoading(false);
        console.log("branches", data)
      })
      .catch((error) => {
        console.error("Error fetching branch data:", error);
        setLoading(false);
      });
  }, []);


  const defaultCenter: [number, number] = [51.410798, 35.757568];
  const center: [number, number] =
    branches.length > 0
      ? branches.reduce<[number, number]>(
        (acc, branch) => [
          acc[0] + branch.latitude / branches.length,
          acc[1] + branch.longitude / branches.length,
        ],
        [0, 0]
      )
      : defaultCenter;


  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      {loading ? (
        <div>
          {/* <p>در حال بارگذاری شعبه ها...</p> */}

        </div>
      ) : (
        <Mapir
          center={center}
          Map={Map}
          zoom={[14]}
          interactive={true}
          hash={true}
          trackResize={true}
        >
          {branches.map((branch) => (
            <div>
              <Mapir.Marker
                key={branch.id}
                coordinates={[branch.latitude, branch.longitude]}
                offset={[0, 0]}
                Image={selectedLocation === branch.id ? slectedlocationIcon : locationIcon}
                onClick={() => handleSelect(branch.id)}
              />
              <Mapir.Popup coordinates={[branch.latitude, branch.longitude]} anchor="top" onClick={() => setSelectedLocation(branch.id)}>
                <div className="font-myDanaDemiBold text-[14px] text-gray-800 font-myIranSansMedium">
                  {branch.name}
                </div>
              </Mapir.Popup>

            </div>


          ))}
        </Mapir>
      )}
    </div>
  );
};

export default MapComponent;
