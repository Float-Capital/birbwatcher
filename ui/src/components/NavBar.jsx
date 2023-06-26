import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 m-2">
      <Link to="/">Back</Link>
    </div>
  );
};

export default NavBar;
