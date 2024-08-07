import { Avatar, Box, Divider, Drawer, List, Icon, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
// import HomeIcon from '@mui/icons-material/Home';
import { ReactNode, useContext } from "react";
import { AuthContext, DrawerContext, ThemeContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";


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

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.()
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
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

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useContext(DrawerContext);
  const { toggleTheme } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

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
              {drawerOptions.map(drawerOption => (
                <ListItem disablePadding key={drawerOption.path}>
                  <ListItemLink
                    icon={drawerOption.icon}
                    to={drawerOption.path}
                    label={drawerOption.label}
                    onClick={smDown ? toggleDrawerOpen : undefined}
                  />
                </ListItem>

              ))
              }
            </List>
          </Box>

          <Box>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={toggleTheme}>
                  <ListItemIcon>
                    <Icon>dark_mode</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Alternar tema" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemIcon>
                    <Icon>logout</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Sair" />
                </ListItemButton>
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