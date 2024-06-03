import { AppBar, Typography, Toolbar, Button, Box } from "@mui/material/";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/vinuBytes.png";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Product List", link: "/grid-table" },
  { name: "Stepper", link: "/stepper" },
  { name: "Tabs", link: "/tabs" },
];

const Header = () => {
  return (
    <AppBar component="nav" className="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          className="logoWrapper"
        >
          <img src={Logo} alt="vinu bytes" className="logo-img" />
          Vinu Bytes
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item, key) => (
            <Button key={key} sx={{ color: "#fff" }}>
              <Typography variant="subtitle2" component="span">
                <NavLink
                  to={item.link}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  {item.name}
                </NavLink>
              </Typography>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
