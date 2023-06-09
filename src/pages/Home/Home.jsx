import Context from "../../Context";
import styled from "styled-components";
import { useNavigate, Link, useParams} from 'react-router-dom';
import { useState, useContext, useEffect} from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Home() {

    const [userData, setUserData] = useContext(Context);
    const params = useParams();
    
    return (
        <ContainerApp> 
            <ContainerTop>
                <img src={ } />
            </ContainerTop>
            <h1>Olá, {userData.name} </h1>

        </ContainerApp>
    );
}

const ContainerApp = styled.div`
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
    }
`
const ContainerTop = styled.div`
    margin-top: 22px;
    display: flex;
    flex-direction: row; 
    justify-content: space-between;

`

const PlanImage = styled.div`
 img {
    width: 75px;
    height: 38px;
    border-radius: 0px;
 }

`

const PlanImg = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center; 
    align-items: center;
    margin-left: 22px;
`

const BackTopImg = styled.div`
    margin-top: 20px;
    margin-left: 20px;
    height: 28px;
    width: 28px;
    border-radius: 0px;
    background: #0E0E13;
`

const ContainerMid = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-left: 44px;
    margin-bottom: 15px;
    img {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 139px;
        height: 95px;
        display: flex;
    }
    h1 {
        margin-top: 12px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
    }
`

const TopBenefitsAndPrice = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 0px;
    img {
        width: 12px;
        height: 16px;
    }
    h1 {
        margin-left: 5px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
    }
`
