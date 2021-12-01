import React from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
}));

interface ButtonProps {
  text: string;
  type: any;
  size?: string;
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | undefined;
  variant?: string;
  onClick: (e: any) => void;
}

const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps): JSX.Element => {
  const { text, size, color, variant, onClick, type, ...other } = props;
  const classes = useStyles();

  return (
    <MuiButton
      variant="contained"
      size="large"
      color={color || 'primary'}
      onClick={onClick}
      type={type}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
