import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      id="default-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0 bg-gray-50 dark:bg-gray-800`}
      aria-label="Sidebar"
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Sidebar
        </h2>
        <ul className="space-y-4">
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Link 1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Link 2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              Link 3
            </a>
          </li>
        </ul>
      </div>
      <button
        className="absolute top-4 right-4 text-gray-500 dark:text-gray-400"
        onClick={toggleSidebar} // This line was missing
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </aside>
  );
};

export default Sidebar;
