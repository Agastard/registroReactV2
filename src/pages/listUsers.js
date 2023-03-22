import { useEffect, useState } from "react";
import { Spinner } from "../componentes/spinner";
import MyToastr from "../componentes/myToastr";
import { get } from "../utils/httpClient";
//CSS
import './listUsers.css';
import UserTemplate from "../componentes/userTemplate";

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [noUserInBD, setNoUserInBD] = useState(false)
  const [errorInBd, setErrorInBd] = useState(false)
   useEffect(() => {
     console.log("¿Usuario seleccionado?", selectedUser, noUserInBD, users)
    if (noUserInBD && selectedUser) {
      console.log("Entré", selectedUser)
      setUsers([selectedUser])
      //console.log(users)
      setNoUserInBD(false);
    } else if (selectedUser?.isNew) {
      var tempUsers = users
      tempUsers.push(selectedUser)
      console.log('tempUsers', tempUsers)
      setUsers(tempUsers);
      setNoUserInBD(false)
    } else if (selectedUser?.actualizado && users) {
      console.log("fui editado", users)
      var tempUsers = users
      tempUsers.forEach(
        (element, indice) => {
          if (element.user_id === selectedUser.user_id
            && element.username !== selectedUser.username){
            console.log("encontrado editado")
            //tempUsers[indice] = { ...selectedUser, actualizado: false }
            tempUsers[indice] = selectedUser
            setUsers(tempUsers)
            console.log("encontrado editado", tempUsers)
          }
        }
        );
      //tempUsers.push(selectedUser)
      
      if (tempUsers !== users) {
        console.log('tempUsers addeditado', tempUsers)
        setUsers(tempUsers)
        //setSelectedUser({ ...selectedUser, actualizado: false })
      } else {
        console.log('tempUsers NO added', tempUsers, users)
        setSelectedUser({ ...selectedUser, actualizado: false })
      }
      
      setNoUserInBD(false)
    } else {
      console.log('useEffect sin nah')
    }
    // Clase de selectedUser
     if (selectedUser?.user_id || typeof selectedUser == "undefined"){
      console.log("Clase de selected")
      const selectedItmes = document.querySelectorAll("li.selected");
      if (selectedItmes) {
        selectedItmes.forEach((element) => {
          element.classList.remove('selected');
        });
      }
      console.log(selectedUser?.user_id)
       var id_element = selectedUser?.user_id
       if (typeof selectedUser == "undefined") {
         id_element = "nuevo-usuario"
       }
       document.getElementById(id_element).classList.toggle('selected');
       if (typeof selectedUser == "undefined") {
         console.log("undefined")
         setSelectedUser()
       }
    }
  }, [selectedUser]) 
  const getUser = (event) => {
    setIsloading(true)
    //console.log(event.target.getAttribute("user-id"), event.target.className)

    let canContinue = true
    // Si clico
    if (event.target.className.search(/selected/i) >= 0) {
      canContinue = false
    }
    // Eliminamos clases 'edited' en caso de cambiar de user
    const editingItmes = document.querySelectorAll(".editing");
    if (editingItmes?.length > 0 && canContinue) {
      var answer = window.confirm("Tiene datos editados ¿Quiere cambiar de usuario?");
      if (answer) {
        // Eliminamos cambios
        canContinue = true;
        editingItmes.forEach((element) => {
          element.classList.remove('editing');
        });
        const editedItmes = document.querySelectorAll(".success_edited");
        editedItmes.forEach((element) => {
          element.classList.remove('success_edited');
        });
        const errorItmes = document.querySelectorAll(".error_edited");
        errorItmes.forEach((element) => {
          element.classList.remove('error_edited');
        });
      }
      else {
        canContinue = false;
        //some code
      }
    }
    if (canContinue) {
      console.log("Continuo")
      const selectedItmes = document.querySelectorAll("li.selected");
      if (selectedItmes) {
        selectedItmes.forEach((element) => {
          element.classList.remove('selected');
        });
      }

      event.target.className = event.target.className + " selected"
      //console.log(event.target.className)
      const searchUrl = "/select.php"
      get(searchUrl, { action: "getUser", user_id: event.target.getAttribute('id') }).then((results) => {
        console.log('getUser', results)
        if (!(results?.success) && results.success <= 0) {
          MyToastr({ message: "Usuario no encontrado", type: results?.success })
          setSelectedUser([]);
        } else if (results?.data) {
          MyToastr({ message: "Usuario encontrado", type: 1 })
          setSelectedUser(results.data);
        } else {
          MyToastr({ message: "Algo ha ocurrido, contacte con soporte si el problema persiste", type: "error" })
          setSelectedUser([]);
        }
        setIsloading(false)
        setErrorInBd(true)
      }).catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log('Error', error);
        setSelectedUser([]);
        setUsers([]);
        setIsloading(false)
        setErrorInBd(true)
      });
    } else {
      setIsloading(false)
    }

  }
  const submitForm = (event) => {
    event.preventDefault()
    console.log('submitForm listusers', users)
    //beforeDoFunction()
    const sendData = {
      user_id: selectedUser?.user_id,
      username: selectedUser?.username,
      first_name: selectedUser?.first_name,
      last_name: selectedUser?.last_name,
      email: selectedUser?.email,
      password: selectedUser?.password
    }
    var searchUrl = "/insert.php"
    if (selectedUser?.user_id > 0) {
      searchUrl = "/update.php"
    }
    console.log('searchUrl', searchUrl)
    get(searchUrl, { ...sendData, action: "updateUser"}).then((result) => {
      console.log('updateUser', result)
      var message = result?.success  ? "Acción ejecutada satisfactoriamente" : "Algo ha fallado.";
      if (result?.message) {
        message = result?.message
      }
      MyToastr(
        { message: message, type: result?.success }
      )
      /*   */
      if (result?.data) {
        setSelectedUser({ ...result?.data, actualizado: true });
      }
      console.log('users', users)
      setIsloading(false)
    }).catch(function (error) {
      console.log('error listUsers',error);
      setSelectedUser([]);
      setIsloading(false)
      setErrorInBd(true)
    })
  }
  const handleChange = (e) => {

    console.log("handleChange")
    //console.log("UNO handleChange en usertemplate", userData)
    if (typeof selectedUser == "undefined") {
      setSelectedUser({
        ...{
          user_id: "",
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          password: ""
        }, [e.target.name]: e.target.value })
    } else {
      setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value })
    }
    
    //console.log(markAsEdited, gived_user?.[e.target.name] !== e.target.value, e.target.className.search(/editing/i))
    /* if (markAsEdited
      && gived_user?.[e.target.name] !== e.target.value) {
      if (e.target.className.search(/editing/i) < 0) {
        e.target.className = e.target.className + " editing"
      }

    } else {
      e.target.classList.remove('editing');
    } */
    //console.log("DOS handleChange en usertemplate", userData)
  }
  console.log('¿no hay users in bd?', noUserInBD, users)
  console.log('isLoading', isLoading)
  // Obtengamos datos
  if (!errorInBd && !noUserInBD && (!users || users?.length <= 0)) {
    console.log("No usewrs", users)
    console.log("searching....")
    //=> setear esto aqui provoca  bucle infinito
    //setIsloading(true)
    const searchUrl = "/select.php"
    get(searchUrl, { action: "getUsers" }).then((results) => {
      //console.log('seteamos esto',results.data)
      if (results.data?.length > 0) {
        console.log('seteamos esto', results.data)
        // @HACk
        var tempUsers = results.data;
        for (var i = 0; i < 9; i++) {
          //tempUsers.push(tempUsers[0])
        }
        //setUsers(results.data);
        setUsers(tempUsers);
      } else {
        console.log('no hay', results.data)
        setNoUserInBD(true);
      }
      setIsloading(false)
    }).catch(function (error) {
      /* if (error.response) {
        The request was made and the server responded with a status code
        that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        The request was made but no response was received
        `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        http.ClientRequest in node.js
        console.log(error.request);
      } else {
        Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      } */
      console.log("Error en ListUser");
      setIsloading(false)
      setErrorInBd(true)
    });
  } else if (users && users?.length > 0) {
    console.log("Sí usewrs", users)
    
  } else {
    console.log("Holllkl")
  }
  if (isLoading) {
    console.log("return spinner");
    return <Spinner />
  }
  return (
    <div id="divUsers">
      <ul id="ulUsers" className={users?.length > 5 ? "marcoLista" : ""}>
        <li id={'nuevo-usuario'} key={'nuevo-usuario'} user={[]} 
        onClick={() => { setSelectedUser(); }} 
        >{"Nuevo Usuario"}</li>
        {users?.length > 0 ? users.map((user) => (
          <li id={user.user_id} key={user.user_id} user={user} onClick={getUser}>{user?.username ?? "No name"}</li>
          /*REAL NO HECHp<UserCard key={movie.id} movie={movie} />*/
        )) : <div>Sin usuarios en el sistema, pruebe a crear alguno</div>}
      </ul>
      <div id="formularioUser">
        {(selectedUser?.username?.length > 0)
          ? <UserTemplate title={"Cuenta de:" + selectedUser?.username ?? "No name"} buttonText={"Actualizar"} 
          servidor={"update"} gived_user={selectedUser} markAsEdited={true} afterDoFunction={(editedUser) => {
            console.log('editedUser', editedUser)
            setSelectedUser(editedUser);
          }}
            submitForm={submitForm} 
            handleChange={handleChange} />
          : <UserTemplate title={"Nueva cuenta"} buttonText={"Crear"} servidor={"insert"} gived_user={selectedUser} markAsEdited={false}
            beforeDoFunction={() => {
              console.log("beforeDoFunction")
              setIsloading(true)
            }}
            afterDoFunction={(newUser) => {
              console.log('afterDoFunction', newUser)
              setSelectedUser(newUser)
              setIsloading(false)
            }}
            submitForm={submitForm}
            handleChange={handleChange} />}
      </div>
    </div>
    )
}