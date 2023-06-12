import Context from "../../Context";
import styled from "styled-components";
import { useNavigate, Link, useParams} from 'react-router-dom';
import { useState, useContext} from 'react';
import axios from 'axios';

export default function Users () {

    const params = useParams();
    const [userData, setUserData] = useContext(Context);
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");
    const [formStatus, setFormStatus] = useState(true);
    const navigate = useNavigate();
    
    function returnLogin() {
        navigate("/");
    }

    function signUpError(answer) {
        alert(answer.response.data.message);
        setFormStatus(false);
    }
    function alterData(even) {
        navigate("/users/:"+userData.id+"/update");
    }
   
        return (
            <ContainerApp>
                        <BackTopImg>
                        <Link to={`/home`}><img src="../../assets/back.png"/></Link>
                        </BackTopImg>

                    <ContainerForm onSubmit={alterData}>
                        <input data-test="user-name-input" type="text" disabled={formStatus}  placeholder={userData.name} />
                        <input data-test="user-image-input" type="text" disabled={formStatus}  placeholder={userData.cpf}/>
                        <input data-test="email-input"  type="email" disabled={formStatus}  placeholder={userData.email} />
                        
                        <button data-test="signup-btn" onClick={alterData}>
                        Atualizar
                        </button>
                    </ContainerForm>
            </ContainerApp>
    )
}

const BackTopImg = styled.div`
    margin-top: 10px;
    margin-left: 20px;
    height: 28px;
    width: 28px;
    border-radius: 0px;
    background: #0E0E13;
`

const ContainerApp = styled.div`
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: column;
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
    }
`


const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 155px;
    margin-bottom: 10px;
    input {
        padding: 6px 6px;
        margin-bottom: 3px;
        width: 299px;
        height: 52px;
        background: #EBEBEB;
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
        margin-top: 12px;
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
    }
`