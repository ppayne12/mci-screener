import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeTab = React.useCallback(
    (tab) => {
      console.log(tab);
      handleCloseNavMenu();
      props.setTab(tab);
    },
    [props.setTab]
  );

  return (
    <AppBar position="static" sx={{ bgcolor: "#6b705c" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu-bar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="patient" onClick={() => changeTab("patient")}>
                <Typography
                  textAlign="center"
                  sx={props.tab === "patient" ? { fontWeight: "600" } : {}}
                >
                  Patient
                </Typography>
              </MenuItem>
              <MenuItem key="provider" onClick={() => changeTab("provider")}>
                <Typography
                  textAlign="center"
                  sx={props.tab === "provider" ? { fontWeight: "600" } : {}}
                >
                  Provider
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="patient"
              onClick={() => changeTab("patient")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Typography
                sx={
                  props.tab === "patient"
                    ? { fontWeight: "600", borderBottom: "1px solid" }
                    : {}
                }
              >
                Patient
              </Typography>
            </Button>
            <Button
              key="provider"
              onClick={() => changeTab("provider")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Typography
                sx={
                  props.tab === "provider"
                    ? { fontWeight: "600", borderBottom: "1px solid" }
                    : {}
                }
              >
                Provider
              </Typography>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <HealthAndSafetyOutlinedIcon />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mt: -0.5,
              }}
            >
              MCI Screener
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;