import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import UploadDokumen from "./pages/UploadDokumen/UploadDokumen";
import UploadKegiatan from "./pages/UploadKegiatan/UploadKegiatan";
import UploadProgram from "./pages/UploadProgram/UploadProgram";
import UploadArtikel from "./pages/UploadArtikel/UploadArtikel";
import UploadVideo from "./pages/UploadVideo/UploadVideo";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return ( 
    <>
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/signin" replace />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/upload-dokumen" element={<UploadDokumen />} />
              <Route path="/upload-kegiatan" element={<UploadKegiatan />} />
              <Route path="/upload-program" element={<UploadProgram />} />
              <Route path="/upload-artikel" element={<UploadArtikel />} />
              <Route path="/upload-video" element={<UploadVideo />} />
            </Route>
          </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}
