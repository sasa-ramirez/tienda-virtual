import { Outlet, Link } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row gap-8">
      <aside className="sm:w-48 shrink-0">
        <p className="font-display text-lg text-texto mb-4">Panel Admin</p>
        <nav className="flex flex-row sm:flex-col gap-2 text-sm">
          <Link to="/admin/categorias" className="text-texto hover:text-acento">
            Categorías
          </Link>
          <Link to="/admin/productos" className="text-texto hover:text-acento">
            Productos
          </Link>
        </nav>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;