import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./style.css";

import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Car from "@material-ui/icons/DirectionsCarOutlined";
import Motorcycle from "@material-ui/icons/MotorcycleOutlined";
import Grid from "@material-ui/core/Grid";

import { SearchCar } from "../../components";

const useStyles = makeStyles({
  svgRoot: {
    marginRight: "20px",
    fontSize: "1.75rem"
  },
  root: {
    fontSize: "1.25rem",
    minHeight: "0px",
    fontWeight: "400",
    lineHeight: 0,
    letterSpacing: 0
  },
  wrapper: {
    flexDirection: "row"
  },
  textcolor: {
    color: "#898999",
    "&$selected": {
      color: "#CA252F"
    }
  },
  selected: {
    color: "#CA252F"
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function content(index) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`
  };
}

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="tab-container">
      <Grid container>
        <Grid item xs={2} className="label-comprar-1">
          <label>Comprar</label>
        </Grid>
        <Grid item xs={2} className="label-comprar-2">
          <label>Comprar</label>
        </Grid>
      </Grid>
      <Tabs value={value} onChange={handleChange}>
        <Tab
          icon={<Car classes={{ root: classes.svgRoot }} />}
          selected
          label="Carros"
          classes={{
            root: classes.root,
            wrapper: classes.wrapper,
            textColorSecondary: classes.textcolor,
            selected: classes.selected
          }}
          {...content(0)}
        />
        <Tab
          icon={<Motorcycle classes={{ root: classes.svgRoot }} />}
          label="Motos"
          classes={{
            root: classes.root,
            wrapper: classes.wrapper,
            textColorSecondary: classes.textcolor,
            selected: classes.selected
          }}
          {...content(1)}
        />
        <Button variant="outlined" className="btn-sellCar">
          Vender meu carro
        </Button>
      </Tabs>
      <TabPanel value={value} index={0} className="box">
        <SearchCar />
      </TabPanel>
      <TabPanel value={value} index={1} className="box">
        To implement
      </TabPanel>
    </div>
  );
}
