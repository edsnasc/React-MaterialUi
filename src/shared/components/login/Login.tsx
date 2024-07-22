import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts";
import { loginFormSchema } from "../../forms/ValidationForm";
import { ZodError } from "zod";

interface ILoginProps {
  children: React.ReactNode
}

export const Login: React.FC<ILoginProps> = ({ children }) => {

  const { isAuthenticated, login } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [emailErrors, setEmailErrors] = useState<string>();
  const [passwordErrors, setPasswordErrors] = useState<string>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    try {
      setIsLoading(true);
      loginFormSchema.parse({
        email: email,
        password: password
      });

      login(email, password).then(() => {
        setIsLoading(false);
      })
    } catch (e) {
      setIsLoading(false);
      if (e instanceof ZodError) {
        const emailErro = e.errors.find(err => err.path.includes("email"))?.message;
        const senhaErro = e.errors.find(err => err.path.includes("password"))?.message;

        setEmailErrors(emailErro);
        setPasswordErrors(senhaErro);
      }
    }
  }

  if (isAuthenticated) {
    return (
      <>{children}</>
    )
  }

  return (
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>

      <Card>
        <CardContent>
          <Box display='flex' flexDirection='column' gap={2} width={250}>
            <Typography variant='h6' align='center'>
              Login
            </Typography>

            <TextField
              fullWidth
              label='Email'
              type='email'
              value={email}
              disabled={isLoading}
              error={!!emailErrors}
              helperText={emailErrors}
              onKeyDown={() => setEmailErrors('')}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label='Senha'
              type='password'
              value={password}
              disabled={isLoading}
              error={!!passwordErrors}
              helperText={passwordErrors}
              onKeyDown={() => setPasswordErrors('')}
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>
            <Button
              variant='contained'
              disabled={isLoading}
              onClick={handleSubmit}
              endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
            >
              Entrar
            </Button>

          </Box>
        </CardActions>
      </Card>

    </Box>
  );
};