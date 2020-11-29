import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  

    // div {
    //     background-color: ${({ theme }) => theme.body} !important;
    //     color: ${({ theme }) => theme.text} !important;
    //     transition: all 0.25s linear;
    // }

    // form {
    //     background-color: ${({ theme }) => theme.body} !important;
    //     color: ${({ theme }) => theme.text} !important;
    //     transition: all 0.25s linear;
    // }

    // span {
    //     background-color: ${({ theme }) => theme.body} !important;
    //     color: ${({ theme }) => theme.text} !important;
    //     transition: all 0.25s linear;
    // }

    // h1, h2, h3, h4, h5, h6 {
    //     background-color: ${({ theme }) => theme.body} !important;
    //     color: ${({ theme }) => theme.text} !important;
    //     transition: all 0.25s linear;
    // }

    // input {
    //     background-color: ${({ theme }) => theme.body} !important;
    //     color: ${({ theme }) => theme.text} !important;
    //     transition: all 0.25s linear;
    // }
  

    // p {
    //     background-color: ${({ theme }) => theme.body} !important;
    //     color: ${({ theme }) => theme.text} !important;
    //     transition: all 0.25s linear; 
    // }
    // button {
    //     color: ${({ theme }) => theme.text} !important;
    //     transition: all 0.25s linear; 
    // }
  

    body {
        background-color:  ${({ theme }) => theme.bgContainer} !important;
        color: ${({ theme }) => theme.text} !important;
        transition: all 0.25s linear;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        // align-items: center;
        // height: 100vh;
        // margin: 0;
        // padding: 0;
        // font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

`
