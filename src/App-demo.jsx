import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";

import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Row from "./ui/Row";
import Input from "./ui/Input";

const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <>
      {/* GLOBAL STYLES CHILDREN COMPONENT KABUL ETMEZ */}
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          {/* AS PROP'U İLE VERİLEN DEĞER NE İSE HTML ETİKETİNE O DEĞER ATANIR YANİ H1 İSE ELEMENT ARTIK H1 OLARAK İŞARETLENİR, H2 İSE H2 VB. */}
          <Row type="horizontal">
            <Heading as={"h1"}>The Wild Oasis</Heading>
            <div>
              <Heading as={"h2"}>H2</Heading>
              <Button variation="primary" size="medium">
                BTN1
              </Button>
              <Button>BTN2</Button>
            </div>
          </Row>

          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form action="">
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
