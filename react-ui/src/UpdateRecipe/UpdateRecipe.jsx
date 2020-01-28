import React, { useState, useEffect } from 'react'
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import {ImageUploader} from './ImageUploader';
import {isAdmin} from '../Shared/AppBehaviors';

const emptyRecipe = { id: undefined, title: '', picture: '', source: '', serves: '', ingredients: '', directions: '' };

const getRecipeData = async (setRecipe, recipeId) => {
  if (recipeId) {
    const res = await fetch(`/api/recipes/${recipeId}`)
    const [recipe] = await res.json();
    console.log('here is your data', recipe);
    setRecipe({
      id: recipe.id,
      title: recipe.title,
      picture: recipe.picture,
      source: recipe.source,
      serves: recipe.serves,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
    })
  }
  if (!recipeId) {
    console.log('no recipe data');
    setRecipe(emptyRecipe)};
};


export const UpdateRecipe = (props) => {
  const [recipeId] = useState(
    () => {
      if (props && props.match && props.match.params && props.match.params.number) {
        return props.match.params.number
      }
      else return null;
    }
  )
  const [recipe, setRecipe] = useState(emptyRecipe);

  useEffect(() => {
    getRecipeData(setRecipe, recipeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleChange = (type, newValue) => {
    setRecipe(prev=> ({ ...prev, [type]: newValue }))
  }
  const saveRecipe = async () => {
    const res = await fetch('/api/recipes/', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipe })
    })
    const json = await res.json();
    window.location = `/r/${json.id}`;
  }
  const disabled = (
    !(recipe.title
      // && recipe.source
      // && recipe.serves
      && recipe.ingredients
      && recipe.directions)
  )
  console.log('here is your recipe', recipe);
  return (
    <>
      {!isAdmin() && <Redirect push to='/all' />}

      <Typography variant="h6" gutterBottom>
        {recipeId ?'edit this recipe' :'Add a new recipe '}

      </Typography>
      <ImageUploader setPicture={(newImage) => handleChange('picture', newImage)} recipeId={recipe.id} picture={recipe.picture} />
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
        {recipeId ? 'update recupe' : 'save new recipe' }
   </Button>
    </>
  )
}