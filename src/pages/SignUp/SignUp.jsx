import styled from "styled-components";
export default function SignUp () {
    return (
           <ContainerApp>
             <img src="../assets/driven.png"/>
           </ContainerApp>
      
    )
}


const ContainerApp = styled.div`
    width: 375px;
    height: 667px;
    background: #0E0E13;
    display: flex;
    flex-direction: row;
    img {
    width: 299px;
    height: 49px;
    }
    input {
    width: 299px;
    height: 52px;
    background: #FFFFFF;
    border-radius: 8px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #7E7E7E;
    }
    button {
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
  `