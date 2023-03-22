import { useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../componentes/spinner";

export default function Login() {
  const [isLoading, setIsloading] = useState(false)
  const [data, setData] = useState({
    //Used default values for developing
    username: "",//can be a email
    password: ""
  })
  // TODO @Al Unificar Esto, deberia ser igual que para register.js
  const handleChange = (e) => {
    console.log('handleChange')
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const submitForm = (e) => {
    setIsloading(true);
    console.log('submitForm data', data)
    e.preventDefault()
  }
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="-main-box">
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Username</div>
          <div className="col-md-6">
            <input type="text" name="username" className="form-control" value={data.username} placeholder="Su Nombre de usuario" onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Password</div>
          <div className="col-md-6">
            <input type="password" name="password" className="form-control" placeholder="Su password" onChange={handleChange} value={data.password} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input type="submit" name="submit" value="Login" />
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-12">
          <p className="pLink">If you haven't an account, create one <Link className="nav-link" to="/register"><b>here</b></Link></p>
        </div>
      </div>
    </div>
  )
}