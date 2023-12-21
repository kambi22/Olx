import React from "react"

function ServiceWorker(){
    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    console.log("path is ",swUrl);
  navigator.serviceWorker.register(swUrl).then((resp)=>{
    console.log('reponse ',resp);
})
}
export default ServiceWorker;

//https://console.firebase.google.com/project/softwork-b09e4/overview?hl=en_GB