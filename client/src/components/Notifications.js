import React, { useContext } from 'react'
import { userContext } from '../context/userContext'
import axios from "axios"

const notif=({notification})=>{
    return (
        <div className="notification">
            <div>{notification}</div>
        </div>
    )
}

function Notifications() {

    const {user} =useContext(userContext);
    const[notification,setNotification]=useState([]);
    useEffect(() => {
       axios.post("http://localhost:5000/user/notfications",{
           "userid":user._id
       })

       .then(res=>setNotification(res.data));
       console.log(user.notification.length);
    }, []);

    let returnData;
    if(notification.length>=1){
        returnData=notification.map(n=>{
            return <Notification notification={n}/>
        })
    }

    else{
        returnData=<h1>no new notifications</h1>
    }
    return (
       returnData
    )
}

export default Notifications

