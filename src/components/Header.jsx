import { NavLink } from "react-router-dom"; // Import NavLink

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Players", href: "/players" },
  { name: "Clubs", href: "/clubs" },
];


const Header = () => {


  return (
    <div className="flex justify-between bg-gray-600 p-4 rounded-b-md bg-linear-to-r from-gray-500 to-gray-800">
      <div>
        <h2>FSCORES</h2>
      </div>
      <div className="hidden md:flex">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href} // Use 'to' instead of 'href' for NavLink\
            className="mx-1 text-white hover:bg-gray-700 px-3 py-2 rounded-md font-medium"
            activeClassName="bg-gray-900" // Apply active class when the link is active
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <div className="md:hidden" data-dropdown-toggle="dropdownNavbar" onClick={}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div
          id="dropdownNavbar"
          class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <h2>Dropdown</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
