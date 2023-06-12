import Context from "../../Context";
import styled from "styled-components";
import { useNavigate, Link, useParams} from 'react-router-dom';
import { useState, useContext} from 'react';
import axios from 'axios';


export default function UserUpdate () {

    const params = useParams();
    const [userData, setUserData] = useContext(Context);
    const [email, setEmail] = useState(userData.email);
	const [password, setPassword] = useState(userData.password);
    const [newPassword, setNewPassword] = useState("");
    const [name, setName] = useState(userData.name);
    const [cpf, setCPF] = useState(userData.cpf);
    const navigate = useNavigate();


   
    function alterDataSuccess() {
        console.log("Alter Data Success");
        navigate("/users/:"+params.id);
    }

    function alterDataError(answer) {
        console.log("Alter Data Fail");
        alert(answer.message);
    }

    function alterData(event) {
        navigate("/users/:"+params.id+"/update");
    }

    function sendRequest(event) {
        event.preventDefault();

        console.log("Token: "+userData.token);

        let config = {
            headers: { 'Authorization': 'Bearer ' + userData.token }
        }



        const data = {
            name: name,
            cpf: cpf,
            email: email,
            currentPassword: password,
	        newPassword: newPassword
        };

        console.log("Name: "+data.name+ " CPF: "+data.cpf+" Email: "+data.email+" currentPassword: "+data.currentPassword+" newPassword: "+data.newPassword);

        const query = axios.put('https://mock-api.driven.com.br/api/v4/driven-plus/users/', data, config);
        query.then(alterDataSuccess); 
        query.catch(alterDataError);
      }
    
       return (
            <ContainerApp>
                        <BackTopImg>
                        <Link to={`/home`}><img src="../../assets/back.png"/></Link>
                        </BackTopImg>

                    <ContainerForm onSubmit={alterData}>
                        <input value={name} type="text"  onChange={e => setName(e.target.value)} placeholder={name} />
                        <input value={cpf} type="text" disabled={true} onChange={e => setCPF(e.target.value)} placeholder={cpf}/>
                        <input value={email} type="email"  onChange={e => setEmail(e.target.value)}  placeholder={email} />
                        <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder={password}/>
                        <input value={newPassword} type="password" onChange={e => setNewPassword(e.target.value)} />
                        <button onClick={sendRequest}> Salvar </button>
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