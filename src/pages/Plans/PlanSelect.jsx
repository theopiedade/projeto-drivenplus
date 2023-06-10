import Context from "../../Context";
import styled from "styled-components";
import { useNavigate, Link, useParams} from 'react-router-dom';
import { useState, useContext, useEffect} from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';


export default function PlanSelect () {

    const [userData, setUserData] = useContext(Context);
    const [json, setJson] = useState([]);
    const params = useParams();
    const [formStatus, setFormStatus] = useState(false);
    const [name, setName] = useState("");
	const [card, setCard] = useState("");
    const [secureCod, setSecureCod] = useState("");
    const [vality, setVality] = useState("");
    const [modalRef, setmodalRef] = useState("");
    const navigate = useNavigate();


    let benefitsArray = [];


    function BuySuccess (answer) {
        navigate("/home");
    }

    function BuyError (answer) {
        alert("Erro na aquisição"+answer.response.data.message);
    }

    function sendRequest(event) {

        const ConfirmBuy = confirm("Confirma a compra ?");

    
        if (ConfirmBuy) { 
               event.preventDefault();


            let config = {
                headers: {
                    'Authorization': 'Bearer ' + userData.token
                }
            }
            
            const data = {
                membershipId: params.idPlan,
                cardName: name,
                cardNumber: card,
                securityNumber: secureCod,
                expirationDate: vality
            };

            
            const query = axios.post('https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions', data , config );

            query.then(BuySuccess); 
            query.catch(BuyError);
            
  
        }

        promise.catch((error) => {
            console.log(error.response.data);
            alert("Erro: "+error.response.data);
            setFormStatus(false);
          }); // if go bad, error
      }


    function axiosSuccess (props) {
        setJson(props);
    }
   
 
    useEffect(() => {
       
        let config = {
            headers: {
                'Authorization': 'Bearer ' + userData.token
            }
        }
        const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${params.idPlan}`;
    
        const promise = axios.get(URL,config);
   
        promise.then((answer) => {
           axiosSuccess(answer.data);        
        }); // if ok
    
        promise.catch((error) => {
          console.log(error.response.data);
        }); // if go bad, error
    

      

      }, []);

        if (json.perks === undefined || json.perks === null || json.perks === "") {
            return (
                <ContainerApp>
                    <PlanImg>
                    <h1>Carregando...</h1>
                    </PlanImg>
                </ContainerApp>
            )
        }
        else {
                return (
                    <ContainerApp>
                        <Link to={`/subscriptions/`}>
                        <BackTopImg><img src="../../assets/back.png"/></BackTopImg>
                        </Link>

                        <ContainerMid>
                            <PlanImg>
                            <img src={json.image} />
                            <h1>{json.name}</h1>
                            </PlanImg>

                            <TopBenefitsAndPrice>
                            <img src="../../assets/list.png"/>
                            <h1>Benefícios:</h1> 
                            </TopBenefitsAndPrice>
                            {
                            json.perks.map((p, i) => (
                                <BenefitsAndPrice key={p.id}>
                                    {i+1}. {p.title} 
                                </BenefitsAndPrice>

                            ))}        
                   
                            <TopBenefitsAndPrice>
                            <img src="../../assets/cash.png"/>
                            <h1>Preço:</h1> 
                            </TopBenefitsAndPrice>
                            <BenefitsAndPrice>
                            R$ {json.price} cobrados mensalmente
                            </BenefitsAndPrice>

                        </ContainerMid>

                        <ContainerForm>
                            <input data-test="name-input" value={name} type="text" disabled={formStatus} onChange={e => setName(e.target.value)}  placeholder="Nome impresso no cartão" />
                            <input data-test="card-input" value={card} type="text" disabled={formStatus} onChange={e => setCard(e.target.value)} placeholder="Digitos do cartão" />
                        </ContainerForm>
                            <SmallInputContainer>
                            <input data-test="cardcore-input" value={secureCod} type="text" disabled={formStatus} onChange={e => setSecureCod(e.target.value)}  placeholder="Código de segurança" />
                            <input data-test="cardvality-input" value={vality} type="text" disabled={formStatus} onChange={e => setVality(e.target.value)} placeholder="Validade" />
                            </SmallInputContainer>
                        <ContainerForm>
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
                        </ContainerForm>
                       
                        

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

const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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

 
const SmallInputContainer = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-left: 33px;
        margin-right: 36px;
        input {
            padding: 6px 6px;
            width: 140px;
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
`

const ContainerModal = styled.div`
    display: none;
    justify-content: center;
    flex-direction: column;
    height: 210px;
    width: 248px;
    left: 64px;
    top: 229px;
    border-radius: 12px;
    backgroun-color: white;
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #000000;
    }
`

const containerModalButtons = styled.div`
    margin-top: 47px;
    margin-left: 22px;
    margin-right: 22px;
    display: flex;
    justify-content: space-between;
    flex-direction: row; 
    height: 210px;
    width: 248px;
    left: 64px;
    top: 229px;
    border-radius: 12px;
    buttom {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        color: #000000;
    }
`
