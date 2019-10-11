### Styled Components

```javascript
const styled = createStyledInstance();

const appContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: tomato;
  -webkit-filter: blur(10px);
  transition: all 300ms ease-in;

  &:hover {
    -webkit-filter: blur(0px);
  }
`;

const title = styled.h1`
  font-family: Helvetica;
  color: white;
  font-size: 60px;
`;

const subTitle = styled.p`
  font-family: Helvetica;
  color: white;
  font-size: 40px;
`;

buildElement('#app', {}, [
  buildElement(appContainer, {}, [
    buildElement(title, {}, 'TDC Recife'),
    buildElement(subTitle, {}, 'Trilha Web Front-end'),
  ]),
]);
```