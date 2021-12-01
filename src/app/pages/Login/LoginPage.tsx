import * as React from 'react';
import { Grid, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Spacer } from '../../components/Spacer';
import { Field, FieldProps, Form, Formik } from 'formik';
import { BaseTheme } from '../../MuiConfig';
import { Colors } from '../../MuiConfig/colors';
import 'styled-components/macro';
import * as Yup from 'yup';
import { LoginPageContainer, LoginPageContentSide, LoginPageFormConnectButton } from './styles';
import { RestAuthenticationService } from '../../../data/auth/RestAuthenticationService';
import { AuthenticateUserWithUsernamePasswordUseCase } from '../../../core/auth/AuthenticateUserWithUsernamePasswordUseCase';
import { KeepUserTokenUseCase } from '../../../core/auth/SaveUserTokenUseCase';
import { SaveCurrentUserUseCase } from '../../../core/user/SaveCurrentUserUseCase';
import { DBUserRepository } from '../../../data/user/DBUserRepository';
import { DBTokenRepository } from '../../../core/auth/UserTokenRepository';
import { User } from '../../../core/user/User';
import { IsUserAuthenticatedUseCase } from '../../../core/auth/IsUserAuthenticatedUseCase';
import { useNavigate } from 'react-router-dom';
import { LayoutDrawerContentLogo } from '../../components/layout/LayoutStyle';

const authenticationService = new RestAuthenticationService();
const authenticateWithPasswordUsecase = new AuthenticateUserWithUsernamePasswordUseCase(authenticationService);
const localUserRepository = new DBUserRepository();
const dbTokenRepository = new DBTokenRepository();
const saveCurrentUserUseCase = new SaveCurrentUserUseCase(localUserRepository);
const keepUserTokenUseCase = new KeepUserTokenUseCase(dbTokenRepository);
const isUserAuthenticatedUseCase = new IsUserAuthenticatedUseCase(dbTokenRepository);

const theme = createTheme({
  ...BaseTheme,
  palette: {
    primary: {
      main: Colors.primary[500],
    },
  },
});

export enum LoginMode {
  email = 'email',
}

const initialValues = {
  email: '',
  password: '',
};

export function LoginPage() {
  const [formattedPhoneNumber, setFormattedPhoneNumber] = React.useState<string | null>(null);
  const [loginMode, setLoginMode] = React.useState<LoginMode>(LoginMode.email);
  const [isPasswordTextHidden, setIsPasswordTextHidden] = React.useState(true);
  const navigate = useNavigate();

  const emailValidation = Yup.object().shape({
    email: Yup.string().required("Le nom d'utilisateur est requit"),
    password: Yup.string()
      .min(2, 'Au moins deux caracteres')
      .required('Le mot de passe est obligatoire'),
  });

  const validationSchema = React.useMemo(() => (loginMode === LoginMode.email ? emailValidation : ''), [loginMode, emailValidation]);

  const requestLoginViaemail = async (value: any) => {
    const token = await authenticateWithPasswordUsecase.execute(value.email, value.password);
    await keepUserTokenUseCase.execute(token).then(() => navigate('/dashboard'));
    await saveCurrentUserUseCase.execute(new User('cinet', 'pay'));
  };

  return (
    <>
      <LoginPageContainer container>
        <LoginPageContentSide item md="auto">
          <Grid container>
            <Grid item md={3} sm={1} xs={1} />
            <Grid item xl={4} lg={5} sm={7} xs={9}>
              <Grid container justify="center">
                <Grid container justify="center">
                  <LayoutDrawerContentLogo alt="Cinetpay Logo" src={'/cinetpay.png'} />
                  <Spacer size="xSmall" />
                  <Typography
                    variant="h2"
                    style={{
                      color: `${Colors.brown[600]}`,
                      fontWeight: 500,
                    }}
                  >
                    Bienvenu sur votre outils de recrutement
                  </Typography>
                </Grid>

                <Spacer size="large" />

                <Formik
                  key="email"
                  validateOnMount
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    requestLoginViaemail(values);
                  }}
                >
                  {({ isValid, values }) => {
                    return (
                      <>
                        <Form>
                          <ThemeProvider theme={theme}>
                            <Field name="email">
                              {(fieldProps: FieldProps) => (
                                <>
                                  <TextFieldemail
                                    {...fieldProps}
                                    changeLoginMode={setLoginMode}
                                    loginMode={loginMode}
                                    changePasswordVisibilityField={() => {}}
                                    formattedValue={formattedPhoneNumber}
                                  />
                                </>
                              )}
                            </Field>

                            <>
                              <Field name="password">
                                {({ field, meta: { error, value, initialValue, touched } }: FieldProps) => (
                                  <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label={'Mot de passe'}
                                    type={isPasswordTextHidden ? 'password' : 'text'}
                                    id="password"
                                    error={touched && value !== initialValue && Boolean(error)}
                                    helperText={touched && value !== initialValue && touched ? error : ''}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton
                                            aria-label="Set Password Text Visibility"
                                            onClick={() => setIsPasswordTextHidden((prev) => !prev)}
                                            edge="end"
                                          >
                                            {isPasswordTextHidden ? <VisibilityOff /> : <Visibility />}
                                          </IconButton>
                                        </InputAdornment>
                                      ),
                                    }}
                                    {...field}
                                  />
                                )}
                              </Field>
                            </>
                          </ThemeProvider>
                          <Spacer size="xLarge" />

                          <LoginPageFormConnectButton type="submit" variant="contained" color="primary">
                            Connexion
                          </LoginPageFormConnectButton>
                        </Form>
                      </>
                    );
                  }}
                </Formik>
              </Grid>
            </Grid>
            <Grid item lg="auto" md="auto" sm={1} xs={1} />
          </Grid>
        </LoginPageContentSide>
      </LoginPageContainer>
    </>
  );
}

export interface TextFieldemailProps extends FieldProps {
  changeLoginMode(loinMode: LoginMode): void;
  changePasswordVisibilityField(visibility: boolean): void;

  loginMode: LoginMode;
  formattedValue: string | null;
}

export function TextFieldemail({ meta, field, changeLoginMode, changePasswordVisibilityField, loginMode, formattedValue }: TextFieldemailProps) {
  React.useEffect(() => {
    if (meta.value?.startsWith('+')) {
    } else {
      changeLoginMode(LoginMode.email);
    }
  }, [changeLoginMode, meta.value]);

  React.useEffect(() => {
    if (meta.value === '' && loginMode === LoginMode.email) {
      changePasswordVisibilityField(false);
    }
  }, [changePasswordVisibilityField, loginMode, meta.value]);

  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id="email"
      label={'Identifiant'}
      type="text"
      autoComplete="email|password"
      autoFocus
      error={(meta.touched || meta.value !== meta.initialValue) && Boolean(meta.error)}
      helperText={meta.touched || meta.value !== meta.initialValue ? meta.error : ''}
      {...(loginMode === LoginMode.email && {
        onKeyDown: (event) => {
          if (event.key === 'Enter' || event.keyCode === 13) {
            changePasswordVisibilityField(true);
          }
        },
      })}
      {...field}
      value={formattedValue ?? field.value}
    />
  );
}

export default LoginPage;
