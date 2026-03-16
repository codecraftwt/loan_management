import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FiShield } from "react-icons/fi";
import { CiLock } from "react-icons/ci";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <MdOutlineDashboardCustomize /> },
  { name: "Plans", path: "/plans", icon: <MdOutlineSubscriptions /> },
  { name: "Revenue", path: "/revenue", icon: <FiDollarSign /> },
  { name: "Lenders", path: "/lenders", icon: <FiUsers /> },
  { name: "Help & Support", path: "/support", icon: <IoIosHelpCircleOutline /> },
  { name: "Privacy & Security", path: "/security", icon: <FiShield /> },
  {
    name: "Change Password", path: "/password", icon: <CiLock />
  },
];

export default function Sidebar({
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
}) {

  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
    fixed inset-y-0 left-0 z-50 bg-white border-r border-orange-100
    shadow-xl
    
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    ${isCollapsed ? "lg:w-20" : "lg:w-72"}
    w-72
  `}
      >
        <div className="h-full flex flex-col">
          {/* Header / Logo */}
          <div className="p-6 border-b border-orange-100 flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent tracking-tight">
                LoanAdmin
              </h2>
            )}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden text-gray-500 hover:text-orange-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  group flex items-center rounded-xl transition-all duration-200
                  ${isCollapsed ? "justify-center py-4" : "px-4 py-3 gap-3"}
                  ${location.pathname === item.path
                    ? "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 font-medium shadow-sm"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                  }
                `}
              >
                <span
                  className={`
                    text-xl transition-colors
                    ${location.pathname === item.path ? "text-orange-600" : "text-gray-500 group-hover:text-orange-600"}
                  `}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            ))}
          </nav>


          {/* Footer (optional subtle info) */}
          {!isCollapsed && (
            <div className="p-4 border-t border-orange-100 text-xs text-gray-500 text-center">
              © {new Date().getFullYear()} LoanAdmin. All rights reserved
            </div>
          )}
        </div>
      </aside>
    </>
  );
}