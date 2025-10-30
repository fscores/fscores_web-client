import { NavLink } from "react-router-dom"; // Import NavLink

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Players", href: "/players" },
  { name: "Clubs", href: "/clubs" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  return (
    <div>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href} // Use 'to' instead of 'href' for NavLink
          >
            {item.name}
          </NavLink>
        ))}
    </div>
  );
};

export default Header;
