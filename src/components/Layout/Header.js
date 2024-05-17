import { AppBar, Typography, Toolbar, Button, Box } from "@mui/material/";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Product List", link: "/grid-table" },
  { name: "Stepper", link: "/stepper" },
];

const Header = () => {
  return (
    <AppBar component="nav" className="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Aitechsoft
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item) => (
            <Button key={item} sx={{ color: "#fff" }}>
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
