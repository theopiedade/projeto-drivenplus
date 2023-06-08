import styled from "styled-components";
import {ContainerApp, ContainerForm} from "../Login/Login";
import { useNavigate} from 'react-router-dom';
import { useState, useContext, useEffect} from 'react';
import Context from "../../Context";
import axios from 'axios';


export default function Plans () {

    const [userData, setUserData] = useContext(Context);
    const [json, setJson] = useState([]);
    const navigate = useNavigate();
    const [planSelected, setPlanSelected] = useState("");

    if (planSelected != "") {
        console.log("Selecionado plano: "+planSelected);
    }

    function selectPlan (itemSel) {
        console.log("Selecionado plano: "+itemSel);
    }

    useEffect(() => {
        console.log("userData.token = "+ userData.token);
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
        }); // if go bad, error
    
      }, []);

    if (json.length > 0) {
        return (
            <ContainerApp>
                <h1>Escolha seu Plano</h1>
      
            {
            json.map(item => (
                <ContainerPlans id={item.id} onClick={() => selectPlan(item.id)}>
                    <img src={item.image}></img>
                    <h1> {item.price} </h1>
                </ContainerPlans> 
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
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    img {
        margin-left: 16px;
        width: 140px;
        height: 95px;
    }
    h1 {
        margin-bottom: 24px;
        margin-right: 16px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
    }
`