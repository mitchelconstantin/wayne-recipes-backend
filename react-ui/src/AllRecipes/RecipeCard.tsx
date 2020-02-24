import React from 'react';
import noImage from '../Shared/noImage.png';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core/';
import { IRecipe } from '../Shared/Types';
//@ts-ignore
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const useStyles = makeStyles(theme => ({
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
    fontWeight: 600,
  },
  detail: {
    fontWeight: 300,
  },
  image: {
    objectFit: 'cover',
    maxHeight: '300px',
    maxWidth: '100%'
  },
  boxAroundImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
    width: '300px'
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
  const classes = useStyles();
  const selectRecipe = () => (window.location.href = `/r/${recipe.id}`);
  const onError = (ev: any) => {
    const eventTarget = ev.target;
    eventTarget.src = noImage;
  };

  interface ImgProps {
    picture?: string;
  }
  const RecipeImg = ({ picture }: ImgProps) => {
    const imageToUse = () => {
      if (!picture || picture[0].toLowerCase() === 'x') {
        return noImage;
      }
      const ar = picture.split('upload');
      const newUrl = `${ar[0]}upload/w_300,h_300,c_fill,g_auto${ar[1]}`;
      return newUrl;
    };
    return (
      <img
        onError={onError}
        src={imageToUse()}
        alt={'a tasty dish!'}
        className={classes.image}
      />
    );
  };

  return (
    <Paper className={classes.card} onClick={selectRecipe}>
      <Box className={classes.boxAroundImage}>
        <LazyLoadComponent
          visibleByDefault={false}
          threshold={200}
          placeholder={<RecipeImg />}
        >
          <RecipeImg picture={recipe.picture} />
        </LazyLoadComponent>
      </Box>
      <Box className={classes.textBox}>
        <Typography className={classes.title}>{recipe.title}</Typography>
        <Typography className={classes.detail}>{`from: ${recipe.source ||
          'unknown'}`}</Typography>
      </Box>
    </Paper>
  );
};
