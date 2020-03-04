/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  FormHelperText
} from '@material-ui/core';
//@ts-ignore
import { Redirect, useParams } from 'react-router-dom';
import { ImageUploader } from './ImageUploader';
import { isAdmin, isOwner } from '../Shared/AppBehaviors';
import { IRecipe, emptyRecipe, emptyFilterOptions } from '../Shared/Types';
import { RecipeAPI } from '../Shared/RecipeAPI';
import SnackbarService from '../Shared/SnackbarService';
import { useContainerStyles } from '../Shared/formStyles';
import { Loading } from '../Shared/Components/Loading';

const getRecipeData = async (recipeId: string) => {
  if (!recipeId) return emptyRecipe;
  const recipe = await RecipeAPI.getRecipe(recipeId);
  const filters = await RecipeAPI.getFilters();
  if (!recipe) {
    SnackbarService.error('could not find that recipe');
    window.location.href = '/';
  }
  return { recipe: {...recipe}, filters: { ...filters } };
};
interface DialogProps {
  onClose: any;
  id: string;
  open: boolean;
}
//@ts-ignore
const SimpleDialog = ({ onClose, id, open }: DialogProps) => {
  const classes = useContainerStyles();

  const handleDelete = async () => {
    await RecipeAPI.deleteRecipe(id);
    SnackbarService.success('recipe deleted');
    setTimeout(() => (window.location.href = '/all'), 1500);
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        Are you sure you want to delete this recipe?
      </DialogTitle>
      <Button className={classes.formButton} onClick={handleDelete}>
        YES DELETE IT
      </Button>
      <Button className={classes.formButton} onClick={onClose}>
        oops, no
      </Button>
    </Dialog>
  );
};


export const UpdateRecipe = () => {
  const [openModal, setOpenModal] = useState(false);
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<IRecipe>(emptyRecipe);
  const [filters, setFilters] = useState(emptyFilterOptions);
  const [loading, setLoading] = useState(true);
  const classes = useContainerStyles();

  useEffect(() => {
    //@ts-ignore
    getRecipeData(recipeId).then(({recipe, filters}) => {
      console.log('recipe', recipe);
      console.log('filters', filters);
      setFilters(filters);
      setRecipe(recipe);
      setLoading(false);
    });
  }, []);

  const handleChange = (type: string, newValue: any) => {
    setRecipe(prev => ({ ...prev, [type]: newValue }));
  };

  const saveRecipe = async () => {
    const json = await RecipeAPI.saveRecipe(recipe);
    SnackbarService.success('recipe saved');
    setTimeout(() => (window.location.href = `/r/${json.id}`), 1500);
  };
  const disabled = !(recipe.title && recipe.ingredients && recipe.directions);
  if (!isAdmin()) return <Redirect push to="/all" />;
  if (loading) return <Loading />;
  return (
    <Box className={classes.formContainer}>
      <Typography variant="h6" gutterBottom>
        {recipeId ? 'edit this recipe' : 'Add a new recipe '}
      </Typography>
      <ImageUploader
        setPicture={(newImage: string) => handleChange('picture', newImage)}
        picture={recipe.picture}
      />
      <Box display="flex" width="50%" alignItems="end" justifyContent="end">
        <TextField
          value={recipe.title || ''}
          onChange={e => handleChange('title', e.target.value)}
          required
          id="title"
          label="Title"
          style={{ height: '44px', width: '60%', marginBottom: '4px' }}
        />
        <FormControl style={{ paddingLeft: '20px', width: '40%' }}>
          <FormHelperText>Recipe Type</FormHelperText>
          <Select
            value={recipe.type || ''}
            onChange={e => handleChange('type', e.target.value)}
          >
            {filters.types.map((type: any) => (
              //@ts-ignore
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))} 
          </Select>
        </FormControl>
      </Box>
      <TextField
        value={recipe.source || ''}
        onChange={e => handleChange('source', e.target.value)}
        required
        id="from"
        label="From"
        style={{ width: '50%' }}
      />
      <TextField
        value={recipe.serves || ''}
        onChange={e => handleChange('serves', e.target.value)}
        required
        id="serves"
        label="Serves"
        style={{ width: '50%' }}
      />
      <TextField
        value={recipe.mainIngredient || ''}
        onChange={e => handleChange('mainIngredient', e.target.value)}
        required
        id="mainIngredient"
        label="Main Ingredient"
        style={{ width: '50%' }}
      />
      <TextField
        value={recipe.region || ''}
        onChange={e => handleChange('region', e.target.value)}
        required
        id="region"
        label="Region"
        style={{ width: '50%' }}
      />
      <TextField
        value={recipe.netCarbs || ''}
        onChange={e => handleChange('netCarbs', e.target.value)}
        required
        id="netCarbs"
        label="Net Carbs"
        style={{ width: '50%' }}
      />
      <TextField
        value={recipe.ingredients || ''}
        onChange={e => handleChange('ingredients', e.target.value)}
        required
        id="ingredients"
        label="Ingredients"
        style={{ width: '50%' }}
        multiline
        rows="4"
      />
      <TextField
        value={recipe.directions || ''}
        onChange={e => handleChange('directions', e.target.value)}
        required
        id="directions"
        label="Directions"
        style={{ width: '50%' }}
        multiline
        rows="4"
      />
      <Button
        disabled={disabled}
        className={classes.formButton}
        onClick={saveRecipe}
      >
        {recipeId ? 'update recipe' : 'save new recipe'}
      </Button>
      {isOwner() && recipeId && (
        <Button
          onClick={() => setOpenModal(true)}
          className={classes.formButton}
        >
          delete recipe
        </Button>
      )}
      <SimpleDialog
        open={openModal}
        id={recipe.id || '1'}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};
