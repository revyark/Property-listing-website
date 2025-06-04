import './Navigation.css';
import { Link } from 'react-router-dom';

function Navi() {
  return (
    <>
      <nav className="nhere">
        <div className="nav-left">
          <span className="nav-text">BOOKISH</span>
        </div>
        <div className="nav-right">
          <Link to="/">English</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard/listings">
            <div className="list">Start hosting</div>
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navi;
