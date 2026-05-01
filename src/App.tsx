import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { checkAuth } from "./redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import { Toaster } from "react-hot-toast";
import AboutView from "./components/header/AboutView";
import ContactView from "./components/header/ContactView";
import CreateView from "./components/details/CreateView";
import UpdateView from "./components/details/UpdateView";
import DetailView from "./components/details/DetailView";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(checkAuth());
    }, 100);
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />

      <Header />
      <div className="mt-16 px-4 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/create" element={<CreateView />} />
          <Route path='/update/:id' element={<UpdateView />} />
          <Route path='/details/:id' element={<DetailView />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;