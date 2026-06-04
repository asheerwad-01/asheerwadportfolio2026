import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientLayout from "@/components/ClientLayout";
import HomePage from "@/app/page";
import AboutPage from "@/app/about/page";
import ServicesPage from "@/app/services/page";
import LabPage from "@/app/lab/page";
import ContactPage from "@/app/contact/page";
import WorkCategoryPage from "@/app/work/page";

export default function App() {
  return (
    <BrowserRouter>
      <ClientLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/lab" element={<LabPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/work/:category" element={<WorkCategoryPage />} />
        </Routes>
      </ClientLayout>
    </BrowserRouter>
  );
}
