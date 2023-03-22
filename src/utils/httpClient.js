//import MyToastr from "./myToastr";
//Los mensajes fuera

const API = "http://localhost/cosas-reactjs/servidores/login";

export function get(path, getOptionjs) {
  let apiPath = API + path
  return fetch(apiPath, {
    // TODO @AL Sistema de TOken o algo para conectar con el servidor
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    body: JSON.stringify(getOptionjs)
  }).then((result) => result.json()).catch(function (error) {
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
    //MyToastr({ message: "Error detectado", type: "error" })
    console.log("Error detectado");
  });
}