import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Conditions from "./pages/Conditions";
import ConditionDetail from "./pages/ConditionDetail";
import Treatments from "./pages/Treatments";
import TreatmentDetail from "./pages/TreatmentDetail";
import HowItWorks from "./pages/HowItWorks";
import PatientStories from "./pages/PatientStories";
import Faqs from "./pages/Faqs";
import BookConsultation from "./pages/BookConsultation";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about-doctor" element={<About />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/conditions/:slug" element={<ConditionDetail />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/treatments/:slug" element={<TreatmentDetail />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/patient-stories" element={<PatientStories />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/book-consultation" element={<BookConsultation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
