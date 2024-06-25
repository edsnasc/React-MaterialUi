import { Avatar, Box, Divider, Drawer, List, Icon, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
// import HomeIcon from '@mui/icons-material/Home';
import { ReactNode, useContext } from "react";
import { DrawerContext } from "../../contexts";
import { useNavigate } from "react-router-dom";


interface IMenuLateralProps {
  children: ReactNode
}

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
    onClick?.()
  };

  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  )
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useContext(DrawerContext);

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              alt="avatar"
              src="https://media.licdn.com/dms/image/C4D03AQGbiv60VhHplg/profile-displayphoto-shrink_100_100/0/1605665352569?e=1718236800&v=beta&t=IVQpqwk1B5KDLyvP5CcMGg2ShTdgmdm416twhZPfp0A"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List>
              <ListItem disablePadding>
                <ListItemLink
                  icon="home"
                  to="/pagina-inicial"
                  label="Página inicial"
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  )
}