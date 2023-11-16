import  PropTypes  from "prop-types";

const HeaderAdmin = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      <nav className="bg-white border-b border-gray-300">
        <div className="flex justify-between h-14 items-center px-6">
          {/* Ícono de Menú (cyan) */}
          <button
            id="menu-button"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <i className="fas fa-bars text-cyan-500 text-lg" />
          </button>
          {/* Logo (centrado) */}
          <div className=" text-cyan-500 text-[30px] font-semibold">
            {/* <img
              src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png"
              alt="logo"
              className="h-20 w-28"
            /> */}
            VVD Coder<span className="text-red-500 font-bold text-[30px]">.</span>
          </div>
          {/* Ícono de Notificación y Perfil */}
          <div className="space-x-4">
            <button>
              <i className="fas fa-bell text-cyan-500 text-lg" />
            </button>
            {/* Botón de Perfil */}
            <button>
              <i className="fas fa-user text-cyan-500 text-lg" />
            </button>
          </div>
        </div>
      </nav>
      {/* <Siderbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      /> */}
    </>
  );
};
HeaderAdmin.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
}
export default HeaderAdmin;
