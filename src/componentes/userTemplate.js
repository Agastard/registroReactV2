import './userTemplate.css';

export default function UserTemplate(
  { 
    title = "Datos", buttonText = "Registrar",gived_user = [],
    submitForm = () => { }, handleChange = () => { }, 
    beforeDoFunction = () => { }, afterDoFunction = () => { } 
  }) {
  // Aunque no haga las llamadas a servidor, sí que recibe las funciones
  return (
    <div className="-main-box">
      <form onSubmit={submitForm}>
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Username</div>
          <div className="col-md-6">
            <input type="text" name="username" className="form-control" placeholder="Su Nombre de usuario" defaultValue={gived_user?.username ?? ""} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Firt Name</div>
          <div className="col-md-6">
            <input type="text" name="first_name" className="form-control" placeholder="Su Nombre" defaultValue={gived_user?.first_name ?? ""} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Last Name</div>
          <div className="col-md-6">
            <input type="text" name="last_name" className="form-control" placeholder="Su/s apellido/s" defaultValue={gived_user?.last_name ?? ""} onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Email</div>
          <div className="col-md-6">
            <input type="email" name="email" className="form-control" placeholder="Su email" defaultValue={gived_user?.email ?? ""} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">Password</div>
          <div className="col-md-6">
            <input type="text" name="password" className="form-control" placeholder="Su contraseña" defaultValue={gived_user?.password ?? ""} onChange={handleChange} required />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input type="submit" name="submit" value={buttonText ?? "Enviar"} />
            <input type="hidden" id="user_id" className="form-control" value={gived_user?.user_id ?? ""} onChange={handleChange} />
          </div>
        </div>
      </form>
    </div>

  )
}