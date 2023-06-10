import Context from "../../Context";
import styled from "styled-components";
import { useNavigate, Link, useParams} from 'react-router-dom';
import { useState, useContext, useEffect} from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Home() {

    const [userData, setUserData] = useContext(Context);
    const params = useParams();
    const [userInfo, setUserInfo] = useState("");
    const navigate = useNavigate();


    function logOnCheckAndGo () {
        const info = localStorage.getItem("UserInfo");
        if (info != undefined && info != null) {
            const infoUnserial =  JSON.parse(info);
            setUserData(infoUnserial);
            if (userData.membership == null) { navigate("/subscriptions"); }
            else { navigate("/home"); }
     }
    }   

    useEffect(() => {
        const data = {
        	email: userData.email,
            password: userData.password
        };
        const query = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/auth/login', data);
        query.then(dataSuccess); 
        query.catch(dataError);
      },[]);

      function dataError (answer) {
        alert(answer.response.data.message);
        setFormStatus(false);
      }

      function dataSuccess (answer) {
        setUserInfo(answer.data);
      }
    
      if (userInfo.membership == null) { 
        return (
            <ContainerApp> 
                <ContainerTop>
                    <img src="../../assets/user.png" />
                </ContainerTop>
                     <h1>Carregando...</h1>
            </ContainerApp>
                );

       }
      else { 
            return (
            <ContainerApp> 
                <ContainerTop>
                    <PlanImage>
                    <img src={userInfo.membership.image} />
                    </PlanImage>
                    <USerImage>
                    <img src="../../assets/user.png" />
                    </USerImage>
                 </ContainerTop>
                <ContainerMid>
                     <h1>Olá, {userInfo.name} </h1>
                     {
                            userInfo.membership.perks.map((p, i) => (
                                <Link to={p.link}>
                                <button key={p.id}> {p.title} </button>
                                </Link>
                                
                            ))}        
                </ContainerMid>
                        <FooterButtons>
                            <ButtonPink>
                            <button>Mudar Plano</button>
                            </ButtonPink>
                            <ButtonRed>
                            <button>Cancelar Plano</button>
                            </ButtonRed>
                        </FooterButtons>

            </ContainerApp>
                );
      }
    }

const ContainerApp = styled.div`
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    margin-left: 38px;
    margin-right: 22px;
`

const PlanImage = styled.div`
img {
    width: 75px;
    height: 51px;
    border-radius: 0px;
}
`
const USerImage = styled.div`
img {
    width: 33px;
    height: 33px;
    border-radius: 0px;
}

`

const ContainerMid = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 22px;
    margin-left: 44px;
    margin-bottom: 15px;
    button {
        margin-bottom: 8px;
        width: 299px;
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
    h1 {
        display: flex;
        justify-content: center;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
        margin-bottom: 53px;
    }
`

const FooterButtons = styled.div`
    bottom: -5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const ButtonPink = styled.div`
    button {
        width: 299px;
        height: 52px;
        border-radius: 8px;
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

const ButtonRed = styled.div`
    button {
        width: 299px;
        height: 52px;
        border-radius: 8px;
        background: #FF4791;
        border-radius: 8px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        background: #FF4747;
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
