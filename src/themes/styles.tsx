import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./theme";
import Background from "assets/imgs/background.svg";

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

  *{
    margin:0;
    padding:0;
    border:none,
    box-sizing: border-box;
    list-style:none;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
    font-family: 'Ubuntu', sans-serif;
    outline: none;
  }
  body{
    color: #fff;
    background: url(${Background}) center/cover no-repeat;  
    background-color: #202B9B;
  }
  main{
    display:flex;
    gap:0vh;
    flex-direction:row;
  }
`;
