import MainPage from "./Pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RestaurantDetail from "./SharedComponents/PlaceDetail";
import MapComponentTest from "./SharedComponents/MapComponentTest";
import SignUp from "./SharedComponents/SignUp";
import Login from "./SharedComponents/Login";
import AboutUs from "./SharedComponents/AboutUs";
import AllRestaurants from "./SharedComponents/AllRestaurants";
import FormLanding from "./SharedComponents/FormLanding";
import AllResorts from "./SharedComponents/AllResorts";
import WizardPage from "./Pages/WizardPage";
import GetPlan from "./SharedComponents/wizard/GetPlan";
import AllAttractions from "./SharedComponents/AllAttractions";
import PlaceDetail from "./SharedComponents/PlaceDetail";
import RestaurantForm from "./SharedComponents/RestaurantForm";
import AllCafes from "./SharedComponents/AllCafes";
import ScrollToTop from "./SharedComponents/ScrollToTop";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useUserStore from './store/userStore';
import SearchResultsPage from "./SharedComponents/SerachResultPage";

function App() {
    const queryClient = new QueryClient();
  const [hydrated, setHydrated] = useState(false);

  // ✅ Zustand hydration check
  useEffect(() => {
    const unsub = useUserStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    if (useUserStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => unsub?.();
  }, []);

  
  return (
        <QueryClientProvider client={queryClient}>

    <div className="App font-myIranSansRegular" dir="rtl">
      <BrowserRouter>
        <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<MainPage></MainPage>} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="/addForm" element={<FormLanding />} />
          <Route path="/addPlace" element={<RestaurantForm />} />
          <Route path="/branches" element={<MapComponentTest />}></Route>
          <Route path="/restaurants" element={<AllRestaurants />} />
          <Route path="/cafes" element={<AllCafes />} />
          <Route path="/hostels" element={<AllResorts />} />
          <Route path="/attractions" element={<AllAttractions />} />
          <Route path="/planner" element={<WizardPage />} />
          <Route path="/getPlanLanding" element={<GetPlan />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
              <ToastContainer/>
      </BrowserRouter>
    </div>
        </QueryClientProvider>
  );
}

export default App;
