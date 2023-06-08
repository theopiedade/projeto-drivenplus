import {ContainerApp, ContainerForm} from "../Login/Login";
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

export default function SignUp () {
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [foto, setFoto] = useState("");
    const [formStatus, setFormStatus] = useState(false);
    const navigate = useNavigate();
    
    function returnLogin() {
        navigate("/");
    }

    function signUpError(answer) {
        alert(answer.response.data.message);
        setFormStatus(false);
    }
    

    function sendRequest(event) {
        setFormStatus(true);
        event.preventDefault();
        const data = {
        	email: email,
            name: name,
            image: foto,
            password: password
        };
        console.log("email:"+data.email);
        console.log("name:"+data.name);   
        console.log("image:"+data.foto);   
        console.log("password:"+data.password);   
        const query = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', data);
        query.then(returnHome); 
        query.catch(signUpError);
      }

    return (
           <ContainerApp>
                <ContainerForm onSubmit={sendRequest}>
                    <input data-test="email-input" value={email} type="email" disabled={formStatus} onChange={e => setEmail(e.target.value)}  placeholder="Email" />
                    <input data-test="password-input" value={password} type="password" disabled={formStatus} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                    <input data-test="user-name-input" value={name} type="text" disabled={formStatus} onChange={e => setName(e.target.value)} placeholder="Nome" />
                    <input data-test="user-image-input" value={foto} type="text" disabled={formStatus} onChange={e => setFoto(e.target.value)} placeholder="Foto" />
                    <button data-test="signup-btn" disabled={formStatus}>
                    {
                    formStatus? (
                        <div className="loader-container">
                            <ClipLoader color={'#fff'} loading={formStatus} size={15} />
                        </div>
                        ) : (
                        "Cadastrar"
                    ) }
                    </button>
                 <h1 onClick={returnLogin}> Já possui uma conta? Entre </h1>
                </ContainerForm>
           </ContainerApp>
      
    )
}

