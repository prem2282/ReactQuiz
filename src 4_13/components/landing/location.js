
import axios from 'axios';


const getUserLocation = () => {

  let targetUrl = 'http://ip-api.com/json';


    axios.get(targetUrl,{
    })
    .then(res => {
      console.log(res);
    })

}

export default getUserLocation
