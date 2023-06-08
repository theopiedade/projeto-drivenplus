import styled from "styled-components";
export default function Login () {
    return (
           <ContainerApp>
            <Logo>
                <img src="../assets/driven.png"/>
            </Logo>

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
        margin-top: 134px;
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

  const Logo = styled.div`
        margin-top: 134px;
        width: 299px;
        height: 49px;
`