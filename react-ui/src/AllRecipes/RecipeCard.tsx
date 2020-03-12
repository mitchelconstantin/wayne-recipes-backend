import React from 'react';
import noImage from '../Shared/noImage.png';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core/';
import { IRecipe } from '../Shared/Types';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { OverflowTip } from './OverflowTip';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: '8px',
      width: '43%'
    },
    [theme.breakpoints.up('md')]: {
      margin: '20px',
      width: '300px',
      minHeight: '370px'
    }
  },
  title: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 600,
      fontSize: '.8rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.3rem',
      fontWeight: 500
    }
  },
  detail: {
    [theme.breakpoints.down('sm')]: {
      fontWeight: 300,
      fontSize: '.7rem'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      color: '#999'
    }
  },
  image: {
    objectFit: 'cover',
    maxHeight: '300px',
    maxWidth: '100%'
  },
  textBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto',
    [theme.breakpoints.down('sm')]: {
      padding: '8px'
    },
    [theme.breakpoints.up('md')]: {
      padding: '10px'
    }
  }
}));

interface Props {
  recipe: IRecipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const classes = useStyles();

  const onError = (ev: any) => {
    const eventTarget = ev.target;
    eventTarget.src = noImage;
  };

  const imageToUse = () => {
    if (!recipe.picture) return noImage;
    const ar = recipe.picture.split('upload');
    const newUrl = `${ar[0]}upload/w_300,h_300,c_fill,g_auto${ar[1]}`;
    return newUrl;
  };

  return (
    <Link className={classes.link} to={`/r/${recipe.id}`}>
      <LazyLoadComponent visibleByDefault={false}>
        <Paper>
          <img
            onError={onError}
            src={imageToUse()}
            alt={'a tasty dish!'}
            className={classes.image}
          />
          <Box className={classes.textBox}>
            <OverflowTip
              //@ts-ignore
              title={recipe.title}
              classes={classes.title}
            />
            <Typography noWrap className={classes.detail}>
              {recipe.source || 'unknown'}
            </Typography>
          </Box>
        </Paper>
      </LazyLoadComponent> 
    </Link>
  );
};
