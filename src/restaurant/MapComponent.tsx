import React from 'react';
import Mapir from "mapir-react-component";
import locationIcon from "../assets/icons/Location.svg";
import 'mapir-react-component/dist/index.css';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapComponentProps {
  mapUrl?: string;
  latitude?: number;
  longitude?: number;
  name?:string
}

const MapComponent: React.FC<MapComponentProps> = ({ mapUrl, latitude, longitude, name }) => {
  // Initialize Map component
  const Map = Mapir.setToken({
    transformRequest: (url: string) => {
      return {
        url: url,
        headers: {
          'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIyMWQ4ZjM4MDgxNTA1YTMwNWNhZTY4YWNmMzcwNmRhYzU5YmI5YzllM2NlM2M1ZTFiNWZhY2FhZTc2MjdlMTQ5MjAyNWViODVlZDVkN2I5In0.eyJhdWQiOiIzMTYyNiIsImp0aSI6IjIyMWQ4ZjM4MDgxNTA1YTMwNWNhZTY4YWNmMzcwNmRhYzU5YmI5YzllM2NlM2M1ZTFiNWZhY2FhZTc2MjdlMTQ5MjAyNWViODVlZDVkN2I5IiwiaWF0IjoxNzQyNjI0NDM0LCJuYmYiOjE3NDI2MjQ0MzQsImV4cCI6MTc0NTIxNjQzNCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.DjwfXfL1bo4S0um881R_eeKxPXnQQCntmZbv3E0mw-9pthimlAiQHDDc9k-UjR94d0ZA6y3mmKn5UFJ9O-isMC9kCsLz0jVsqHaZXHUBkY5ijHi8rytRs_EfW12lZBdZ35WQejYRB1umr865eObl-EkSpFB_F4JjqCPbeeoi6P-5g5W68nHQwe17fkIBhHi610vh6sI5bmWRkjhZaKbn5FGrkpbvBkuEsDUj2Toxcir4OR0UR1SCD5L7I69SsvvSke44JWrPk--NVFIPgb24sC5scqcIG8oGh-WYTEvLB9cT6XkZLfFOiG0eK1lYSeKZniLOB6v47MmKKKhwvW067A',
          'Mapir-SDK': 'reactjs'
        }
      };
    }
  });

  return (
<div className="w-full mt-4">

      <div className="bg-white rounded-lg overflow-hidden h-[30%]">
        <h3 className="p-4 font-myIranSansMedium border-b">لوکیشن</h3>

        {longitude && latitude ? (
          <div>
            <Mapir
              center={[latitude, longitude]}
              Map={Map}
              zoom={[16]}
              interactive={true}
              hash={true}
              trackResize={true}
            >
              <div>
                <Mapir.Marker
                  offset={[0,0]}
                  Image={locationIcon}
                  coordinates={[latitude, longitude]}
                />
                <Mapir.Popup coordinates={[latitude, longitude]} anchor="top">
                  <div className="font-myIranSansRegular text-[14px] text-gray-800 font-myIranSansMedium">
                    {name}
                  </div>
                </Mapir.Popup>
              </div>
            </Mapir>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            اطلاعات موقعیت مکانی موجود نیست
          </div>
        )}
      </div>

    </div>
  );
};

export default MapComponent;