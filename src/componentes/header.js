import {Link} from "react-router-dom";
export default function Header(){
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">SimpleLogin</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="">Home</Link>
            </li>
            {/*En el futuro se mostrará sólo si es admin || o quizá sólo pueda editar un admin, ya veré*/}
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/listusers">Lista Usuarios</Link>
            </li>
            {/* EN el Futuro habrá un sistema de login*/}
            {/* {user ?
              <li className="nav-item">
                <Link className="nav-link" to="/account">Account</Link>
              </li>
              : ""
            }
            {user ? 
            <li className="nav-item">
                <Link className="nav-link" onClick={handleDisconect}>Disconect</Link>
            </li>
            : 
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            } */}
          </ul>
        </div>
      </div>
    </nav>

  )
}