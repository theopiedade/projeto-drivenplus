import Context from "../../Context";
import styled from "styled-components";
import { useNavigate, Link, useParams} from 'react-router-dom';
import { useState, useContext, useEffect} from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import Modal from 'react-modal';


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

    Modal.setAppElement('#root');
    const [modalDisplay, setModalDisplay] = useState("none");
    const [noModalOpacity, setNoModalOpacity] = useState("2");


    function openModal() {
        setModalDisplay("block");
        setNoModalOpacity("0.2");
      }

    function closeModal() {
        setModalDisplay("none");
        setNoModalOpacity("2");
      }


    function BuySuccess (answer) {
        navigate("/home");
    }

    function BuyError (answer) {
        alert("Erro na aquisição"+answer.response.data.message);
    }

    function sendRequest(event) {

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

      function axiosSuccess (props) {
        setJson(props);
    }
   

        if (json.perks === undefined || json.perks === null || json.perks === "") {
            return (
                <ContainerApp>
                        <BackTopImg>
                            <Link to={`/subscriptions/`}><img src="../../assets/back.png"/></Link>
                        </BackTopImg>

                    <PlanImg>
                    <h1>Carregando...</h1>
                    </PlanImg>
                </ContainerApp>
            )
        }
        else {
                return (
                    <ContainerApp>
                        
                        <BackTopImg opacity={noModalOpacity}>
                        <Link to={`/subscriptions/`}><img src="../../assets/back.png"/></Link>
                        </BackTopImg>
                        

                        <ContainerMid opacity={noModalOpacity}>
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
                            R$ {json.price.replace(".",",")} cobrados mensalmente
                            </BenefitsAndPrice>

                        </ContainerMid>

                        <ContainerForm opacity={noModalOpacity}>
                            <input value={name} type="text" disabled={formStatus} onChange={e => setName(e.target.value)}  placeholder="Nome impresso no cartão" />
                            <input value={card} type="text" disabled={formStatus} onChange={e => setCard(e.target.value)} placeholder="Digitos do cartão" />
          
                            <SmallInputContainer>
                            <input value={secureCod} type="text" disabled={formStatus} onChange={e => setSecureCod(e.target.value)}  placeholder="Código de segurança" />
                            <input value={vality} type="text" disabled={formStatus} onChange={e => setVality(e.target.value)} placeholder="Validade" />
                            </SmallInputContainer>
              
                            <button onClick={openModal} disabled={formStatus}>
                            Entrar
                            </button>
                        </ContainerForm>
                       
                        <ModalBox className="ModalBox" display={modalDisplay} contentLabel="Modal de exemplo">
                            
                            <p>Tem certeza que deseja assinar o plano {json.name} R$ {json.price.replace(".",",")}  ?</p>
                            
                            <ModalContainerButtons>
                                <ModalButton color="#CECECE">
                                    <button onClick={closeModal}>NÃO</button>
                                </ModalButton>
                                <ModalButton color="#FF4791">
                                <button color="#FF4791" onClick={sendRequest}>SIM</button>
                                </ModalButton>
                            </ModalContainerButtons>
                        </ModalBox>
                     

                        </ContainerApp>
                )

            }
        }


const ModalBox = styled.div`
        opacity: 2;
        position: relative;
        zindex: 0;
        width: 248px;
        height: 210px;
        top: -450px;
        left: 70px;
        background: #FFFFFF;
        border-radius: 12px;
        display: ${(props) => props.display};
        flex-direction: center;
        align-items: center;
        flex-direction: column;
        p {
            margin-top: 15px;
            margin-left: 22px;
            margin-right: 22px;
            margin-bottom: 47px;
            display: flex;
            justify-content: center;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 21px;
            text-align: center;
            color: black;
        }
`

const ModalContainerButtons = styled.div`
    margin-top: 10px;
    margin-left: 22px;
    margin-right: 8px;
    margin-bottom: 11px;
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    align-items: center;
`

const ModalButton = styled.div`
button {
    margin-right: 14px;
    margin-bottom: 10px;
    width: 95px;
    height: 42px;
    background: ${(props) => props.color};
    border-radius: 8px;
    border-color: ${(props) => props.color};
    color: white;
 }
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

const PlanImg = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center; 
    align-items: center;
    margin-left: 22px;
`

const BackTopImg = styled.div`
    opacity: ${(props) => props.opacity};
    margin-top: 10px;
    margin-left: 20px;
    height: 28px;
    width: 28px;
    border-radius: 0px;
    background: #0E0E13;
`

const ContainerMid = styled.div`
    opacity: ${(props) => props.opacity};
    display: flex;
    flex-direction: column;
    margin-top: 20px;
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
    opacity: ${(props) => props.opacity};
    display: flex;
    flex-direction: column;
    align-items: center;
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

 
const SmallInputContainer = styled.div`
        opacity: ${(props) => props.opacity};
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
