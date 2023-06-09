import styled from "styled-components";
import {ContainerApp} from "../Login/Login";
import { Link, useParams, useNavigate} from 'react-router-dom';
import { useState, useContext, useEffect} from 'react';
import Context from "../../Context";
import axios from 'axios';


export default function Plans () {

    const [userData, setUserData] = useContext(Context);
    const [json, setJson] = useState([]);
    const navigate = useNavigate();

 
    useEffect(() => {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + userData.token
            }
        }
  

        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships`;
    
        const promise = axios.get(URL,config);
    
        promise.then((answer) => {
          setJson(answer.data);
        }); // if ok
    
        promise.catch((error) => {
          console.log(error.response.data);
          navigate("/");
        }); // if go bad, error
    
      }, []);

    if (json.length > 0) {
        return (
            <ContainerApp key={userData.token}>
                <h1>Escolha seu Plano</h1>
      
            {
            json.map(item => (
                <Link to={`/subscriptions/${item.id}`}>
                <ContainerPlans key={item.id}>
                    <img src={item.image}></img>
                    <h1> {item.price} </h1>
                </ContainerPlans> 
                </Link>
              ))
             }

         
            </ContainerApp>
        )
    }
}

export const ContainerPlans = styled.div`
    width: 290px;
    height: 180px;
    background: #0E0E13;
    border: 3px solid #7E7E7E;
    border-radius: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    img {
        margin-left: 16px;
        width: 140px;
        height: 95px;
    }
    h1 {
        margin-right: 16px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
    }
`