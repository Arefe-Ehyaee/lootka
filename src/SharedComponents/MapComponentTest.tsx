import React, { useEffect, useState } from "react";
import Mapir from "mapir-react-component";
import 'mapbox-gl/dist/mapbox-gl.css';
import locationIcon from "../assets/icons/Group 426.svg"
import slectedlocationIcon from "../assets/icons/Group 373.svg"


interface MapComponentTestProps {

}

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

const MapComponentTest: React.FC<MapComponentTestProps> = () => {

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <Mapir
        center={[49.58378932026671, 37.279374094741485]}
        Map={Map}
        zoom={[14]}
        interactive={true}
        hash={true}
        trackResize={true}
      >
        <div>
          <Mapir.Marker
            Image={locationIcon}
            coordinates={[49.58378932026671, 37.279374094741485]}

          />
          <Mapir.Popup coordinates={[49.58378932026671, 37.279374094741485]} anchor="top">
            <div className="font-myIranSansRegular text-[14px] text-gray-800 font-myIranSansMedium">
              انقلاب
            </div>
          </Mapir.Popup>

        </div>
      </Mapir>

    </div>
  );
};

export default MapComponentTest;