import { useState } from "react"
import UserTemplate from "../componentes/userTemplate"
import './register.css';

export default function Register() {
  // TODO @Al Aquí se hará inserts
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  })
  // Tras crear usuario,redireccionar a la página de Login
  return (
    <UserTemplate title={"Regístrese"} buttonText={"Enviar"} />
  )
}