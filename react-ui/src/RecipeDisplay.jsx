import React, { useState, useEffect } from 'react';
import MultiLineField from './MultiLineField'
import ImageUploader from './ImageUploader'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const FixedField = ({ title, content }) => {
  const classes = useStyles();

  return (
    <ExpansionPanel
      expanded
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
        <Typography className={classes.secondaryHeading}>{content}</Typography>
      </ExpansionPanelSummary>
    </ExpansionPanel>
  )
}

const ExpandableField = ({ title, content }) => {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {content.split("\n").map((line) => {
          return <Typography className={classes.secondaryHeading}>{line}</Typography>
        })}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default (props) => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

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
    return 'loading';
  }
  console.log('what is recipe picture', recipe.Picture);
  return (
    <div>
      <h2>{recipe['RecipeName']}</h2>
      <ImageUploader getRecipe={getRecipe} recipeID={recipe.ID} image={recipe.Picture} />
      <FixedField title='from' content={recipe['Source'] || 'unknown'} />
      <FixedField title='serves' content={recipe['Serves'] || 'unknown'} />
      <ExpandableField title='ingredients' content={recipe['Ingredients'] || 'unknown'} />
      <ExpandableField title='directions' content={recipe['Directions'] || 'unknown'} />
    </div>
  );
}