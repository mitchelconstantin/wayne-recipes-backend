import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader'
import { makeStyles } from '@material-ui/core/styles';
import emptyImage from './emptyImage.png';
import { Box, Button, Typography, Divider } from '@material-ui/core/';
import {ShoppingListBehaviors} from '../ShoppingList/ShoppinglistBehaviors';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  details: {
    flexDirection: "column"
  }
}));

const isAdmin = () => {
  return JSON.parse(localStorage.getItem('isAdmin'));
}

const isMobile = () => {
  return window.orientation !== undefined
}

const getLayout = () => (
  isMobile() ?
    {
      style: { height: '80%', width: '80%', border: '1px' },
      flexDirection: 'column',
      alignItems: 'center'
    }
    :
    {
      style: { height: '30%', width: '30%', border: '1px' },
      flexDirection: 'row',
      alignItems: 'top'
    }
);

const LongList = ({ content, title, numbered = false }) => {
  const classes = useStyles();

  const getLine = (index, line) => {
    if (!numbered || !line) return line;
    const val = Math.floor(index / 2 + 1)
    return `${val}. ${line}`
  }
  const processedContent = content.split("\n").map((line, i) => {
    return (
      <Box mt='10px' key={i}>
        <Typography className={classes.secondaryHeading}>
          {getLine(i, line)}
        </Typography>
      </Box>)
  }
  )
  return (
    <Box mt='20px' mb='20px'>
      <Typography variant="h2" >
        {title}
      </Typography>
      {processedContent}
    </Box>)
}

export default (props) => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [responsive] = useState(getLayout());
  const getRecipe = async () => {
    const res = await fetch(`/api/recipes/${props.match.params.number}`)
    const [data] = await res.json();
    setRecipe(data);
    setLoading(false);
  }

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return 'loading3';
  }
  const onError = (ev) => {
    const eventTarget = ev.target;
    eventTarget.src = emptyImage;
  };
  const [Container, RecipeDetails] = [Box, Box];
  const tags = [recipe.type, recipe.mainIngredient, recipe.region];
  const addToShoppingList = () => {
    console.log('adding', recipe);
    ShoppingListBehaviors.add(recipe);
  }
  return (

    <Container mt='50px' width='100%' display='flex' flexDirection={responsive.flexDirection} justifyContent='center' alignItems={responsive.alignItems}>
      {isAdmin() ? <ImageUploader getRecipe={getRecipe} recipeID={recipe.id} image={recipe.picture} /> :
        <img onError={onError} src={recipe.picture || emptyImage} alt={'a tasty dish'}
          style={responsive.style}
        />
      }
      <RecipeDetails ml='30px' mr='20px' display='flex' flexDirection='column' >
        <h2>{recipe.title}</h2>
        <Box display='flex' mb='10px'>
          <div>
            {`from: ${recipe.source || 'unknown'}`}
          </div>
          <Box ml='auto'>
            {tags.map((tag) => !!tag && `#${tag} `)}
          </Box>
        </Box>
        <Divider />
        <Box mt='10px' display='flex' flexDirection='column'>
          <div>
            {`Yield: ${recipe.serves || 'unknown'}`}
          </div>
          <div>
            {`Time: ${recipe.time || 'unknown'}`}
          </div>
          <Button onClick={addToShoppingList}>Add To Shopping List</Button>
        </Box>

        <Box mt='10px' display='flex' flexDirection='column'>
          <LongList title='Ingredients' content={recipe.ingredients || 'unknown'} />
          <LongList title='Directions' content={recipe.directions || 'unknown'} numbered />
        </Box>
      </RecipeDetails>
    </Container>
  )
}