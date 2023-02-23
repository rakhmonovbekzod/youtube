
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WebPushNotification from "./components/pushNotification";
import Home from "./pages/home";
import Profile from "./pages/profile";
import SingleVideo from "./pages/Singlevideo";
import Videos from "./pages/videos";
import axios from "axios"
import  "./styles/grid.css";

const App: React.FC = () => {

  const vapidPublicKey = "BC2khsugf7WFea_kfGzXAHOwuiJw-rsTjSrSyTp1PlvPcbIGXgC-37785t22oIvQNIx5RLIT_ZDkzd-_5-doM5w"
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)

function urlBase64ToUint8Array(base64String: string | any[]) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

 function subscribePush() {
  navigator.serviceWorker.ready.then(registration => {
    if (!registration.pushManager) {
      alert("Push Unsupported")
      return
    }
    
    registration.pushManager
      .subscribe({
        userVisibleOnly: true, //Always display notifications
        applicationServerKey: convertedVapidKey
      })
      .then(subscription => fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subscription: subscription
        })
      }))
      .catch(err => console.error("Push subscription error: ", err))
  })
}
function unsubscribePush() {
  navigator.serviceWorker.ready.then(registration => {
    //Find the registered push subscription in the service worker
    registration.pushManager
      .getSubscription()
      .then(subscription => {
        if (!subscription) {
          return 
          //If there isn't a subscription, then there's nothing to do
        }
        subscription
          .unsubscribe()
          .then(() => axios.delete("http://localhost:4000/register"))
          .catch(err => console.error(err))
      })
      .catch((err) => console.error(err))
  })
}


    


  return (
    <BrowserRouter>
    <button onClick={subscribePush}>subscribe</button>
    <button onClick={unsubscribePush}>unsubscribe</button>
      <Routes>
         <Route path="/notify"  element={<WebPushNotification/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/videos/:id" element={<SingleVideo />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;