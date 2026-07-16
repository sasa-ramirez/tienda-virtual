import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import RutaProtegida from './components/RutaProtegida';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import DetalleProducto from './pages/DetalleProducto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import CrearCategoria from './pages/admin/CrearCategoria';
import CrearProducto from './pages/admin/CrearProducto';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/admin"
            element={
              <RutaProtegida soloAdmin>
                <AdminLayout />
              </RutaProtegida>
              
            }
          >
            <Route path="productos" element={<CrearProducto />} />
            <Route path="categorias" element={<CrearCategoria />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;