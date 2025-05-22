import './Navigation.css';
import {createBrowserRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
function Navi(){
  
    return(
        <>
        <nav className="nhere">
          <div className="nav-left">
            <span className="nav-text">AGAR</span>
          </div>
          <div className="nav-right">
            <a href="/">English</a>
            <a href="/signup">Signup</a>
            <a href="/login">Login</a>
            <a href="/login"><div className="list">List your space</div></a>
          </div>
        </nav>
        </>
    )
}
export default Navi;