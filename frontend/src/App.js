import './App.css';
import Form from './components/Form';
import Content from './components/Content';
import { Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Switch, Route } from 'react-router-dom';
import Thread from './components/Thread';

const useStyles = makeStyles({
  divider: {
    margin: "30px 0px"
  }
});


function App() {

  const classes = useStyles();

  return (
    <div className="App">
      <Typography variant="h2">Fringe</Typography>
      <Typography variant="subtitle1">Simple Image Board</Typography>
      <Switch>
        <Route exact path="/"> <Content /> </Route>
        <Route exact path="/:thread_id"> <Thread/> </Route>
      </Switch>
      
    </div>
  );
}

export default App;
