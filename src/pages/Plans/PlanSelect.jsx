import Context from "../../Context";
import styled from "styled-components";
import { useNavigate, Link, useParams} from 'react-router-dom';
import { useState, useContext, useEffect} from 'react';
import axios from 'axios';


export default function PlanSelect () {

    const [userData, setUserData] = useContext(Context);
    const [json, setJson] = useState([]);
    const [json2, setJson2] = useState([]);
    const params = useParams();
    let benefitsArray = [];

    function benefits (i) {
        console.log("i"+i);
        return `${i+1} - ${benefitsArray[i]}`;
    }

 
    useEffect(() => {
        
       
        let config = {
            headers: {
                'Authorization': 'Bearer ' + userData.token
            }
        }
        console.log("userData.token "+userData.token);
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${params.idPlan}`;
    
        const promise = axios.get(URL,config);
    
        promise.then((answer) => {
           setJson(answer.data);
           console.log(json);
           benefitsArray = [];
          for (let i=0; i< json.perks.length; i++) {
            //console.log("item "+json.perks[i].title);
            benefitsArray.push(json.perks[i].title);
          }
          console.log("benefits Array:"+benefitsArray);
          const newStrings = benefitsArray.toString();
          setJson2(JSON.parse(newStrings));
        }); // if ok
    
        promise.catch((error) => {
          console.log(error.response.data);
        }); // if go bad, error
    
      }, []);
        if (json != undefined) {
                return (
                    <ContainerApp>
                        <Link to={`/subscriptions/`}>
                        <BackTopImg><img src="../../assets/back.png"/></BackTopImg>
                        </Link>

                        <ContainerMid>
                            <img src={json.image} />
                            <h1>{json.name}</h1>

                            <TopBenefitsAndPrice>
                            <img src="../../assets/list.png"/>
                            <h1>Benefícios:</h1> 
                            </TopBenefitsAndPrice>
                            <BenefitsAndPrice>1-</BenefitsAndPrice>
                            <BenefitsAndPrice>2-</BenefitsAndPrice>
                                       
                  
                   
                            <TopBenefitsAndPrice>
                            <img src="../../assets/cash.png"/>
                            <h1>Preço:</h1> 
                            </TopBenefitsAndPrice>
                            <BenefitsAndPrice>
                            R$ {json.price} cobrados mensalmente
                            </BenefitsAndPrice>

                        </ContainerMid>

                    </ContainerApp>
                )

            }
        }
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

const BackTopImg = styled.div`
    margin-left: 22px;
    margin-top: 25px;
    height: 28px;
    width: 28px;
    border-radius: 0px;
    background: #0E0E13;
`

const ContainerMid = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 62px;
    margin-left: 44px;
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


const BenefitsAndPrice = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 2px;
`