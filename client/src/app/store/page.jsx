"use client";
import React, { useState } from "react";
import FormUser from "@/components/FormUser/FormUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/config";

export default function RegisterUser() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});
  const [passwordConfirmed, setPasswordConfirmed] = useState(true); 
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoginErrors({});

    if (password !== confirmPassword) {
      setPasswordConfirmed(false);
      return; 
    }

    const user = {
      nombreCompleto: nombre,
      email: email,
      telefono: telefono,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await axios.post(`${apiUrl}/user`, user);
      const result = response.data;
      console.log(result);
      router.push(`/store/user/login`);
    } catch (error) {
      console.log(error.response.data);
      if (error.response && error.response.data) {
        setLoginErrors(error.response.data);
      } else {
        setLoginErrors({ general: "Something went wrong. Please try again." });
      }
    }
  };

  const inputChange = (e) => {
    if (e.target.name === "nombre") {
      setNombre(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "telefono") {
      setTelefono(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };

  return (
    <div>
      <div className="py-5 ps-20 bg-[#f9f4fa]">
        <div>
          <div>
            <Link href="/store">Inicio</Link>
            <Link href="/store/user/mi-cuenta">Mi cuenta</Link>
            <Link href="/store/user/register">Registrarse</Link>
          </div>
          <div className="pt-3">
            <h1 className="text-5xl font-bold">Crear mi cuenta</h1>
            <FormUser
              onSubmitHandler={onSubmitHandler}
              isRegister={true}
              nombre={nombre}
              email={email}
              telefono={telefono}
              password={password}
              confirmPassword={confirmPassword}
              loginErrors= {loginErrors}
              inputChange={inputChange}
              passwordConfirmed={passwordConfirmed} // Asegúrate de pasar passwordConfirmed a FormUser
            />
          </div>
        </div>
      </div>
    </div>
  );
}
