import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import emptyImage from './emptyImage.png';

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
        {content.split("\n").map((line, i) => <Typography key={i}className={classes.secondaryHeading}>{line}</Typography>
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default (props) => {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h2>{recipe.title}</h2>
      {isAdmin() && <Button
        href={`/r/${recipe.id}/edit`}
      >edit this recipe</Button>}
      {isAdmin() ? <ImageUploader getRecipe={getRecipe} recipeID={recipe.id} image={recipe.picture} /> :
        <img onError={onError} src={recipe.picture || emptyImage} alt={'a tasty dish'} style={{ height: '200px', width: '200px', border: '1px' }} />
      }

      <FixedField title='from' content={recipe.source || 'unknown'} />
      <FixedField title='serves' content={recipe.serves || 'unknown'} />
      <ExpandableField title='ingredients' content={recipe.ingredients || 'unknown'} />
      <ExpandableField title='directions' content={recipe.directions || 'unknown'} />
    </div>
  );
}