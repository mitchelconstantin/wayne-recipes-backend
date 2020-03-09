import React from 'react';
import noImage from '../Shared/noImage.png';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core/';
import { IRecipe } from '../Shared/Types';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { isMobile } from '../Shared/AppBehaviors';
import { OverflowTip } from './OverflowTip';

const useMobileStyles = makeStyles(theme => ({
  card: {
    margin: '8px',
    width: '43%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 600,
    fontSize: '.8rem', 
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  detail: {
    fontWeight: 300,
    fontSize: '.7rem'
  },
  image: {
    objectFit: 'cover',
    maxHeight: '300px',
    maxWidth: '100%'
  },
  textBox: {
    width: '100%', 
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto'
  }
}));
const useDesktopStyles = makeStyles(theme => ({
  card: {
    cursor: 'pointer',
    margin: '20px',
    width: '300px',
    minHeight: '370px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.3rem',
    fontWeight: 500,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  detail: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    color: '#999'
  },
  image: {
    objectFit: 'cover',
    maxHeight: '300px',
    maxWidth: '100%'
  },
  textBox: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 'auto'
  }
}));

interface Props {
  recipe: IRecipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const mobileStyles = useMobileStyles();
  const desktopStyles = useDesktopStyles();
  const classes = isMobile() ? mobileStyles : desktopStyles;
  const selectRecipe = () => (window.location.href = `/r/${recipe.id}`);
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
    <Paper className={classes.card} onClick={selectRecipe}>
      <LazyLoadComponent visibleByDefault={false} threshold={200}>
        <img
          onError={onError}
          src={imageToUse()}
          alt={'a tasty dish!'}
          className={classes.image}
        />
      </LazyLoadComponent>
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
  );
};
