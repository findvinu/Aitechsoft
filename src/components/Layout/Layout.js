import { Container } from "@mui/material";
import Header from "./Header";
import Routing from "../../Routing";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Container maxWidth="xl" sx={{mt:10}}>
        <Routing />
      </Container>
    </div>
  );
};

export default Layout;
