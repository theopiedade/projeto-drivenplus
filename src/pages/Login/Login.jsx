import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect} from 'react';
import axios from 'axios';
import Context from "../../Context";
import ClipLoader from 'react-spinners/ClipLoader';

export default function Login () {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [formStatus, setFormStatus] = useState(false);
    const [userData, setUserData] = useContext(Context);

    useEffect(() => {
        logOnCheckAndGo();
    }, []);
  
    function logOnCheckAndGo () {
        const info = localStorage.getItem("UserInfo");
        if (info != undefined && info != null) {
            const infoUnserial =  JSON.parse(info);
            setUserData(infoUnserial);
            if (userData.membership == null) { navigate("/subscriptions"); }
            else { navigate("/home"); }
     }
    }   

    function signUp() {
        navigate("/sign-up");
    }

    function sendRequest(event) {
        setFormStatus(true);
        event.preventDefault();
        const data = {
        	email: email,
            password: password
        };
        const query = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', data);
        query.then(loginSuccess); 
        query.catch(loginError);
      }

      function loginSuccess (answer) {
        localStorage.setItem('UserInfo', JSON.stringify(answer.data));
        logOnCheckAndGo();
      }

      function loginError (answer) {
        alert(answer.response.data.message);
        setFormStatus(false);
      }

    return (
           <ContainerApp>
            <Logo>
                <img src="../assets/driven.png"/>
            </Logo>

                <ContainerForm onSubmit={sendRequest}>
                            <input data-test="email-input" value={email} type="email" disabled={formStatus} onChange={e => setEmail(e.target.value)}  placeholder="Email" />
                            <input data-test="password-input" value={password} type="password" disabled={formStatus} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                            <button data-test="login-btn" onClick={sendRequest} disabled={formStatus}>
                            {
                        formStatus? (
                            <div className="loader-container">
                                <ClipLoader color={'#fff'} loading={formStatus} size={15} />
                            </div>
                            ) : (
                            "Entrar"
                        ) }
                            </button>
                   <h1 onClick={signUp}> Não possui uma conta? Cadastre-se </h1>
                </ContainerForm>

           </ContainerApp>
      
    )
}


export const ContainerApp = styled.div`
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
    }
`

const Logo = styled.div`
    margin-bottom: 102px;
    width: 299px;
    height: 49px;
`

export const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-decoration-line: underline;
        color: #FFFFFF;
    }
    input {
        padding: 6px 6px;
        margin-bottom: 16px;
        width: 299px;
        height: 52px;
        background: #FFFFFF;
        border-radius: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-align: justify;
        color: #7E7E7E;
    }
    button {
        margin-top: 24px;
        margin-bottom: 24px;
        width: 298px;
        height: 52px;
        background: #FF4791;
        border-radius: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
  `

