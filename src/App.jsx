import { useState, createContext } from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import Page_Not_Found from './pages/Page_Not_Found';
import Ticket_Page from './pages/Ticket_Page';
import Search from './pages/Search';

export const Context_API = createContext();

function App() {

  const [projects_collection, set_projects_collection] = useState(() => {
    return JSON.parse(localStorage.getItem("pms-projects-collection")) || [];
  });
  const [project_name, set_project_name] = useState("");
  const [project_description, set_project_description] = useState("");

  return (

    <>

      <Context_API.Provider value={{ projects_collection, set_projects_collection, project_name, set_project_name, project_description, set_project_description }}>

        <Navbar />

        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/ticket/:ticket_id' element={<Ticket_Page />}></Route>

          <Route path='/search/:search_query' element={<Search />}></Route>

          <Route path='*' element={<Page_Not_Found />} />

        </Routes>

      </Context_API.Provider>

      <Footer />

    </>

  );

};

export default App;