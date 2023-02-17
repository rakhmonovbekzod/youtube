import Home from "./pages/home";
import Profile from "./pages/profile";
import SingleVideo from "./pages/Singlevideo";


const routes = [{
    path:'/',
    component:Home,
    is_protected: false
},
{
    path:'/video/:id',
    component:SingleVideo,
    is_protected: false
},
{
    path:'/profile',
    component:Profile,
    is_protected: true
}]

export default routes;