import React from 'react';
import noImage from '../Shared/noImage.png';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core/';
import { IRecipe } from '../Shared/Types';
//@ts-ignore
import { LazyLoadComponent} from 'react-lazy-load-image-component';

const useStyles = makeStyles(theme => ({
  card: {
    cursor: 'pointer',
    margin: '20px',
    width: '300px'
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
  const RecipeImg = ({picture}: ImgProps) =>{ 
    const imageToUse = () => {
      if (!picture || picture[0].toLowerCase() === 'x') {
        return noImage
      }
      return picture
    }
    return (
    <img
      onError={onError}
      src={imageToUse()}
      alt={'a tasty dish!'}
      style={{ height: '300px', width: '300px' }}
    />
  )};

  return (
    <Box justifySelf="center" alignSelf="center">
      <Paper className={classes.card} onClick={selectRecipe}>
        <LazyLoadComponent
          visibleByDefault={false} 
          threshold={100}
          placeholder={<RecipeImg />}
        >
          <RecipeImg picture={recipe.picture} />
        </LazyLoadComponent>
        <Box p="10px">
          <Typography>{recipe.title}</Typography>
          <Typography>{`from: ${recipe.source || 'unknown'}`}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};
