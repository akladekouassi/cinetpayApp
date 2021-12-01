import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { DATE_FORMAT, formatDate } from '../../../utils/date';
import { Bloc, GridStyled, LeftLabelContainer, RigthLabelTitleContainer } from './Style';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Colors } from '../../../MuiConfig/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  disposeButton: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.primary[700],
    justifyContent: 'center',
    textDecoration: 'none',
    color: Colors.white[900],
    '&:hover': {
      backgroundColor: Colors.primary[700],
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export const UserProfileReviewCard = ({ data }: any) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const getInitials = (name: string) => {
    let initials: any = name.split(' ');

    if (initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 2);
    }

    return initials.toUpperCase();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      {Boolean(data) && (
        <>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {getInitials(data.name ?? data.login)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={(data && data?.name!) ?? data.login}
            subheader={'Crée le ' + formatDate(data?.created_at!, DATE_FORMAT.DATE_TIME)}
          />
          <CardMedia className={classes.media} image={data && data.avatar_url} style={{ objectFit: 'contain' }} title={data && data.login} />
          <CardContent>
            <Bloc>
              <GridStyled container spacing={0}>
                <GridStyled item xs={4}>
                  <LeftLabelContainer>Followers:</LeftLabelContainer>
                </GridStyled>
                <GridStyled item xs={8}>
                  <>
                    <RigthLabelTitleContainer gutterBottom>{data && data?.followers}</RigthLabelTitleContainer>
                  </>
                </GridStyled>
              </GridStyled>
              <GridStyled container spacing={0}>
                <GridStyled item xs={4}>
                  <LeftLabelContainer>Following:</LeftLabelContainer>
                </GridStyled>
                <GridStyled item xs={8}>
                  <>
                    <RigthLabelTitleContainer gutterBottom>{data?.following}</RigthLabelTitleContainer>
                  </>
                </GridStyled>
              </GridStyled>
              <GridStyled container spacing={0}>
                <GridStyled item xs={4}>
                  <LeftLabelContainer>Location:</LeftLabelContainer>
                </GridStyled>
                <GridStyled item xs={8}>
                  <>
                    <RigthLabelTitleContainer gutterBottom>{data?.location}</RigthLabelTitleContainer>
                  </>
                </GridStyled>
              </GridStyled>
              <GridStyled container spacing={0}>
                <GridStyled item xs={4}>
                  <LeftLabelContainer>Repos:</LeftLabelContainer>
                </GridStyled>
                <GridStyled item xs={8}>
                  <>
                    <RigthLabelTitleContainer gutterBottom>{data?.public_repos}</RigthLabelTitleContainer>
                  </>
                </GridStyled>
              </GridStyled>
              <GridStyled container spacing={0}>
                <GridStyled item xs={4}>
                  <LeftLabelContainer>Twetter:</LeftLabelContainer>
                </GridStyled>
                <GridStyled item xs={8}>
                  <>
                    <RigthLabelTitleContainer gutterBottom>{data?.twitter_username}</RigthLabelTitleContainer>
                  </>
                </GridStyled>
              </GridStyled>
            </Bloc>
            <a href={data.html_url} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              <Button variant="contained" className={classes.disposeButton}>
                Visiter reposotory
              </Button>
            </a>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </>
      )}
    </Card>
  );
};
