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
import { UserProfileReviewCard } from '../Dashboard/components/ProfileCard';
import { Spacer } from '../../components/Spacer';
import { Colors } from '../../MuiConfig/colors';

const restProfilesRepository = new RestProfilesRepository();
const getAllProfilesUseCase = new GetAllProfilesUseCase(restProfilesRepository);
const getProfileUseCase = new GetProfileUseCase(restProfilesRepository);
const localUserRepository = new DBUserRepository();
const dbTokenRepository = new DBTokenRepository();
const saveCurrentUserUseCase = new SaveCurrentUserUseCase(localUserRepository);
const keepUserTokenUseCase = new KeepUserTokenUseCase(dbTokenRepository);
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

const CompareUserProfilePage: React.FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const profiles = React.useMemo(() => data.map((profile: any) => profile.login), [data]);
  const [firstUser, setFirstUser] = React.useState(profiles[0]);
  const [secondUser, setSecondUser] = React.useState(profiles[0]);
  const [firstUserProfile, setFirstUserProfile] = React.useState(profiles[0]);
  const [secondUserProfile, setSecondUserProfile] = React.useState(profiles[0]);
  const [inputValue, setInputValue] = React.useState('');

  const findProfile = async (userName: string, type: 'one' | 'two') => {
    if (Boolean(userName)) {
      const token = await getUserTokenUseCase.execute();
      restProfilesRepository.setCurrentUserToken(token);
      await getProfileUseCase
        .execute(userName)
        .then((profile) => (type === 'one' ? setFirstUserProfile(() => profile) : setSecondUserProfile(() => profile)));
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
          <Grid item xs={5}>
            <Autocomplete
              value={firstUser}
              onChange={(event, newValue) => {
                setFirstUser(newValue);
                findProfile(newValue, 'one');
              }}
              onBlur={() => {
                findProfile(firstUser, 'one');
              }}
              inputValue={firstUser}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="getProfileForFirstUser"
              options={profiles}
              renderInput={(params) => (
                <TextField
                  onChange={(event) => {
                    setFirstUser(event.target.value);
                  }}
                  {...params}
                  label="Utilisateur 1"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
            <Spacer direction="vertical" size="medium" />
            <Grid container justify="center">
              <UserProfileReviewCard data={firstUserProfile} />
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <Autocomplete
              value={secondUser}
              onChange={(event, newValue) => {
                setSecondUser(newValue);
                findProfile(newValue, 'two');
              }}
              onBlur={() => {
                findProfile(secondUser, 'two');
              }}
              inputValue={secondUser}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="getProfile"
              options={profiles}
              renderInput={(params) => (
                <TextField
                  onChange={(event) => {
                    setSecondUser(event.target.value);
                  }}
                  {...params}
                  label="Utilisateur 1"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
            <Spacer direction="vertical" size="medium" />
            <Grid container justify="center">
              <UserProfileReviewCard data={secondUserProfile} />
            </Grid>
          </Grid>
          <Grid item xs={2} alignContent="center">
            <Button onClick={() => findProfile(secondUser, 'two')} className={classes.disposeButton} variant="contained">
              Rechercher
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default CompareUserProfilePage;
