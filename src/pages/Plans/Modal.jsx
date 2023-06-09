import React from "react";
import styled from "styled-components";

export default function Modal({ classNome, modalRef, plan, value }) {

    return(
        <ContainerModal ref={modalRef} classname={classNome}> 
             <h1>Tem certeza que deseja assinar o plano {plan} R$ {value} </h1>

             <containerModalButtons> 
                <button>Sim</button>
                <button>Não</button>
             </containerModalButtons>
        </ContainerModal>
    )
}



const ContainerModal = styled.div`
    display: flex;
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

const show  = styled.div`
    display: block !important;
`

<ContainerModal ref={modalRef}> 
                                <h1>Tem certeza que deseja assinar o plano {json.name} R$ {json.price} </h1>

                                <containerModalButtons> 
                                    <button>Sim</button>
                                    <button>Não</button>
                                </containerModalButtons>
                        </ContainerModal>