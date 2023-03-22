import UserTemplate from "../componentes/userTemplate";

export default function Account({ gived_user = {}}) {
  //{ title, buttonText = "Registrar",submitForm, handleChange }
  return (
    <UserTemplate
      title={"Su cuenta"} buttonText={"Actualizar"} servidor={"update"} gived_user={gived_user}
    />
  )
}