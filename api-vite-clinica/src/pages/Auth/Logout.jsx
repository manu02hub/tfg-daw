import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

function Logout() {

    const {setAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{

        //Vaciar localStorage

        localStorage.clear();

        //Setear globales a vacio
        setAuth({})

        //Navigate redireccion a Login
        navigate("/login");

    },[])

  return (
    <div>Logout</div>
  )
}

export default Logout