import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogTitle, Grid, TextField, Typography, Snackbar } from '@material-ui/core';
//@ts-ignore
import { Redirect, useParams } from 'react-router-dom'
import { ImageUploader } from './ImageUploader';
import { isAdmin } from '../Shared/AppBehaviors';
import { IRecipe, emptyRecipe } from '../Shared/Types';
import { RecipeAPI } from '../Shared/RecipeAPI';
import SnackbarService from '../Shared/SnackbarService';

const getRecipeData = async (setRecipe: Function, recipeId: number) => {
  const recipe = await RecipeAPI.getRecipe(recipeId);
  if (!recipe) {
    SnackbarService.error('could not find that recipe')
    window.location.href = '/';
  }
  setRecipe({
    id: recipe.id,
    title: recipe.title,
    picture: recipe.picture,
    source: recipe.source,
    serves: recipe.serves,
    ingredients: recipe.ingredients,
    directions: recipe.directions,
  })
};
interface DialogProps {
  onClose: any;
  id: number;
  open: boolean;
}
//@ts-ignore
const SimpleDialog = ({onClose, id, open}: DialogProps) => {
  const handleDelete = async () => {
    await RecipeAPI.deleteRecipe(id);
    SnackbarService.success('recipe deleted')
    window.location.href = '/';
    onClose();
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Are you sure you want to delete this recipe?</DialogTitle>
      <Button onClick={handleDelete}>YES DELETE IT</Button>
      <Button onClick={onClose}>oops, no</Button>
    </Dialog>
  );
}

export const UpdateRecipe = () => {
  const [openModal, setOpenModal] = useState(false);
  const {recipeId} = useParams();
  const [recipe, setRecipe] = useState<IRecipe>(emptyRecipe);

  useEffect(() => {
    if (recipeId) {
      getRecipeData(setRecipe, recipeId);
    } else {
      setRecipe(emptyRecipe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (type: string, newValue: any) => {
    setRecipe(prev => ({ ...prev, [type]: newValue }))
  }

  const saveRecipe = async () => {
    const json = await RecipeAPI.saveRecipe(recipe);
    window.location.href = `/r/${json.id}`;
    SnackbarService.success('recipe saved')
  }
  const disabled = (
    !(recipe.title
      // && recipe.source
      // && recipe.serves
      && recipe.ingredients
      && recipe.directions)
  )
  return (
    <>
      {!isAdmin() && <Redirect push to='/all' />}
      <Typography variant="h6" gutterBottom>
        {recipeId ? 'edit this recipe' : 'Add a new recipe '}
      </Typography>
      <ImageUploader setPicture={(newImage: string) => handleChange('picture', newImage)} picture={recipe.picture} />
      <Grid container direction='column' spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            value={recipe.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            required id="title" label="Title" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={recipe.source || ''}
            onChange={(e) => handleChange('source', e.target.value)}
            required id="from" label="From" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={recipe.serves || ''}
            onChange={(e) => handleChange('serves', e.target.value)}
            required id="serves" label="Serves" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={recipe.ingredients || ''}
            onChange={(e) => handleChange('ingredients', e.target.value)}
            required id="ingredients" label="Ingredients" fullWidth multiline rows="4" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            value={recipe.directions || ''}
            onChange={(e) => handleChange('directions', e.target.value)}
            required id="directions" label="Directions" fullWidth multiline rows="4" />
        </Grid>
      </Grid>
      <Button
        disabled={disabled}
        onClick={saveRecipe} variant="contained" color="primary">
        {recipeId ? 'update recipe' : 'save new recipe'}
      </Button>
      <Button
        onClick={() => setOpenModal(true)} variant="contained" color="primary">
        delete recipe
      </Button>
      <SimpleDialog open={openModal} id={recipe.id || 1} onClose={() => setOpenModal(false)} />
    </>
  )
}