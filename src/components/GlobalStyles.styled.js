import styled from '@emotion/styled'

 const GlobalStyles = styled.div`
  html {
    box-sizing: border-box;
    /* width: 100vw;
    overflow-x: hidden; */
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
   
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    color: #212121;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  img {
    display: block;
  }
`;

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;
export  {AppContainer, GlobalStyles};