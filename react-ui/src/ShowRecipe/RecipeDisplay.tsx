import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import emptyImage from './emptyImage.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Typography, IconButton, Divider, Tooltip } from '@material-ui/core/';
import { ShoppingListBehaviors } from '../ShoppingList/ShoppinglistBehaviors';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Edit from '@material-ui/icons/Edit';
import SnackbarService from '../Shared/SnackbarService';
import { isAdmin } from '../Shared/AppBehaviors';

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

interface LongListProps {
  content: any;
  title: string;
  numbered?: boolean;
}

export const LongList = ({ content, title, numbered = false }: LongListProps) => {
  const classes = useStyles();

  const getLine = (index: number, line: any) => {
    if (!numbered || !line) return line;
    const val = Math.floor(index / 2 + 1)
    return `${val}. ${line}`
  }
  const processedContent = content.split("\n").map((line: any, i: number) => {
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

export const RecipeDisplay = (props: { match: { params: { number: any; }; }; }) => {
  //@ts-ignore
  const [recipe, setRecipe] = useState<Recipe>({});
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

  if (loading) return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
      <CircularProgress />
    </Box>
  )

  const onError = (ev: { target: any; }) => {
    const eventTarget = ev.target;
    eventTarget.src = emptyImage;
  };
  const [Container, RecipeDetails] = [Box, Box];
  //@ts-ignore
  const tags = [recipe.type, recipe.mainIngredient, recipe.region];
  const addToShoppingList = () => {
    console.log('adding', recipe);
    ShoppingListBehaviors.add(recipe);
    SnackbarService.success('added to list!');
  }
  return (

    <Container mt='50px' width='100%' display='flex' flexDirection={responsive.flexDirection} justifyContent='center' alignItems={responsive.alignItems}>
      <img onError={onError} src={recipe.picture || emptyImage} alt={'a tasty dish'}
        style={responsive.style}
      />
      <RecipeDetails ml='30px' mr='20px' display='flex' flexDirection='column' >
        <Box display='flex' flexDirection='row'>
          <h2>{recipe.title}</h2>
          <Tooltip title="Add to Shopping List">
            <IconButton onClick={addToShoppingList} aria-label="upload picture" >
              <AddShoppingCart />
            </IconButton>
          </Tooltip>
          {isAdmin() && <Tooltip title="Edit Recipe">
            <IconButton href={`/r/${recipe.id}/edit`} aria-label="upload picture" >
              <Edit />
            </IconButton>
          </Tooltip>}
        </Box>
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
        </Box>

        <Box mt='10px' display='flex' flexDirection='column'>
          <LongList title='Ingredients' content={recipe.ingredients || 'unknown'} />
          <LongList title='Directions' content={recipe.directions || 'unknown'} numbered />
        </Box>
      </RecipeDetails>
    </Container>
  )
}