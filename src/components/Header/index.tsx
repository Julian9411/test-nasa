import { Button, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../assets/logo.png";
import { routes } from "../../routes/routes";
import "./style.css";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const links = [
    {
      path: routes.PHOTOS,
      label: "Photos marck rovers",
    },
    {
      path: routes.SATELLITES,
      label: "Satellites",
    },
    {
      path: routes.ASTEROIDS,
      label: "Asteroids - NeoWs",
    },
    {
      path: routes.LOGIN,
      label: "Change api key",
    },
  ];
  return (
    <header className="headerContainer">
      <img className="logo" src={logo} alt="logo" />
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {links.map((link) => (
            <MenuItem
              key={link.path}
              onClick={() => {
                handleClose();
                navigate(link.path)
              }}
            >
              {link.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </header>
  );
};
