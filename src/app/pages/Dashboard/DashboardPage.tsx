import React, { useState } from 'react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetAllProfilesUseCase } from '../../../core/findProfile/GetAllProfilesUseCase';
import { RestProfilesRepository } from '../../../data/findProfile/RestProfilesRepository';
import { GetUserTokenUseCase } from '../../../core/auth/GetUserTokenUseCase';
import { DBUserRepository } from '../../../data/user/DBUserRepository';
import { DBTokenRepository } from '../../../core/auth/UserTokenRepository';
import { SaveCurrentUserUseCase } from '../../../core/user/SaveCurrentUserUseCase';
import { KeepUserTokenUseCase } from '../../../core/auth/SaveUserTokenUseCase';
import { IsUserAuthenticatedUseCase } from '../../../core/auth/IsUserAuthenticatedUseCase';
import { GetProfileUseCase } from '../../../core/findProfile/GetProfileUseCase';
import { UserProfileReviewCard } from './components/ProfileCard';
import { Spacer } from '../../components/Spacer';
import { Colors } from '../../MuiConfig/colors';

const restProfilesRepository = new RestProfilesRepository();
const getAllProfilesUseCase = new GetAllProfilesUseCase(restProfilesRepository);
const getProfileUseCase = new GetProfileUseCase(restProfilesRepository);
const localUserRepository = new DBUserRepository();
const dbTokenRepository = new DBTokenRepository();
const isUserAuthenticatedUseCase = new IsUserAuthenticatedUseCase(dbTokenRepository);
const getUserTokenUseCase = new GetUserTokenUseCase(dbTokenRepository, isUserAuthenticatedUseCase);

const useStyles = makeStyles((theme) => ({
  appMain: {
    width: '100%',
    flexGrow: 1,
  },
  disposeButton: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.primary[700],
    justifyContent: 'center',
    color: Colors.white[900],
    '&:hover': {
      backgroundColor: Colors.primary[700],
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const DashboardPage: React.FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const profiles = React.useMemo(() => data.map((profile: any) => profile.login), [data]);
  const [value, setValue] = React.useState(profiles[0]);
  const [userProfile, setUserProfile] = React.useState(profiles[0]);
  const [inputValue, setInputValue] = React.useState('');

  const findProfile = async (userName: string) => {
    if (Boolean(userName)) {
      const token = await getUserTokenUseCase.execute();
      restProfilesRepository.setCurrentUserToken(token);
      await getProfileUseCase.execute(userName).then((profile) => {
        setUserProfile(() => profile);
      });
    }
  };

  React.useEffect(() => {
    const runUseCase = async () => {
      const token = await getUserTokenUseCase.execute();
      restProfilesRepository.setCurrentUserToken(token);
      await getAllProfilesUseCase.execute().then((profiles) => setData(() => profiles));
    };
    runUseCase();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.appMain} style={{ width: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={10}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                findProfile(newValue);
              }}
              onBlur={() => {
                findProfile(value);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="getProfile"
              options={profiles}
              renderInput={(params) => (
                <TextField
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                  {...params}
                  label="Rechercher un profile"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={2} alignContent="center">
            <Button onClick={() => findProfile(value)} className={classes.disposeButton} variant="contained">
              Rechercher
            </Button>
          </Grid>
        </Grid>
        <Spacer direction="vertical" size="medium" />
        <Grid container justify="center">
          <UserProfileReviewCard data={userProfile} />
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default DashboardPage;
