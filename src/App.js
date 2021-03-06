import logo from './logo.svg';
import './App.css';
import React from "react";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Interchart from './components/Interchart/Interchart';


const cbDataPointEventSelected = () => (console.log("Call back for selected item"));
const cbDataPointEdit = () => (console.log("Call back for edit the data"));
const cbDataPointEventMoved = () => {
    console.log("Call back for a data point that is moved on chart")
    return true;
  };

function App() {

  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    setDarkMode(darkMode);
  }, [darkMode]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({  
        palette: {
          type: darkMode ? 'light' : 'dark',
        },
      }),
    [darkMode],
  );

  const enableDarkMode = (darkMode) => {
    setDarkMode(darkMode);
  }

  // generate some random data
  function randomPoints() { 
    let i=0;
    let arr = [];
    for (i=0;i<10;i++){
      const myLabelName = "My idea " + i;
      arr.push({
        x: Math.floor(Math.random() * 500),
        y: Math.floor(Math.random() * 500),
        label : myLabelName });
    }
    return arr;
  }

    
  const useStyles = makeStyles((theme) =>({
    container: {
        margin: theme.spacing(0.5),
        //backgroundColor: '#0055', 
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    
    table : {
        //backgroundColor: '#12D',   
        width: '30%',
    },

    chart : {
        width: '70%',
    },
    })
  );

    
  const sample = [
    ['Frozen yoghurt', 159, 6.0, 24, 4.0],
    ['Ice cream sandwich', 237, 9.0, 37, 4.3],
    ['Eclair', 262, 16.0, 24, 6.0],
    ['Cupcake', 305, 3.7, 67, 4.3],
    ['Gingerbread', 356, 16.0, 49, 3.9],
  ];

  function createData(id, dessert, calories, fat, carbs, protein) {
    return { id, dessert, calories, fat, carbs, protein };
  }

  const rows = [];

  for (let i = 0; i < 200; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
  }
  
  const classes = useStyles();  

  const dataSet = randomPoints()
  return (
    <ThemeProvider theme= { theme } >
      <CssBaseline />
      <div className={classes.container}>        
        <div className={classes.chart}>
          <Interchart
            height = "600"
            width = "600"
            dataPoints = { dataSet } 
            XAxisLabel = "Risk or Effort"
            YAxisLabel = "Benefits"
          />
        </div>
        <div className={classes.table}>
      
        </div>
      </div>

    </ThemeProvider>
  );
}

export default App;
