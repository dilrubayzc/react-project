import React, { useEffect } from 'react'

function Logout() {
    useEffect(()=>{
        var isAuth= localStorage.getItem('isAuth')
        if(isAuth == "false" ){
            window.location.href = "/login"; 
          }
      },[])
}

export default Logout