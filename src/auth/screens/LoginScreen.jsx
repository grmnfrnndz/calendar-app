import React, {useEffect} from 'react';

import './LoginScreen.css';
import {useAuthStore, useForm} from "../../hooks/index.js";
import Swal from "sweetalert2";

const loginFormFields = {
    loginEmail: 'lepmah@lepmah.ru',
    loginPassword: '123456',
}

const registerFormFields = {
    registerName: 'Lepmah5',
    registerEmail: 'lepmah6@lepmah.ru',
    registerPassword: '654321',
    registerPassword2: '654321',
}

export const LoginScreen = () => {
    const {errorMessage, startLogin, startRegister} = useAuthStore();

    const {loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm(loginFormFields);
    const {registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange} = useForm(registerFormFields);

    const loginSubmit = (event) => {
        event.preventDefault();
        console.log({loginEmail, loginPassword});
        startLogin({email: loginEmail, password:loginPassword})
    }

    const registerSubmit = (event) => {
        event.preventDefault();

        if (registerPassword !== registerPassword2) {
            Swal.fire('Error Register', 'Password no valid', 'error');
            return;
        }

        startRegister({name:registerName, email:registerEmail, password:registerPassword});
    }

    useEffect(
        () => {
            if(errorMessage !== undefined) {
                Swal.fire('Error Login', errorMessage, 'error');
            }
        },
        [errorMessage]
    );



    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button
                                className="btnSubmit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}