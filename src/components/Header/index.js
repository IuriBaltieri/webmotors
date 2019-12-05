import React from "react";

import { WebMotorsLogo, Container } from "./style";
import logo from "../../assets/img/webmotors-logo.png";

const Header = () => {
  return (
    <Container>
      <WebMotorsLogo src={logo} alt="webmotors" />
    </Container>
  );
};

export default Header;
