//import myTheme from './myTheme.js'
import getMuiTheme from "material-ui/styles/getMuiTheme";
import * as Colors from "material-ui/styles/colors";
import { darken, fade, emphasize, lighten } from "./utils/colorManipulator";
//import { darken, fade, emphasize, lighten } from "./utils/colorManipulator";

const themeDefault = getMuiTheme({
  palette: {
    primary1Color: "#607D8B", //blueGrey500
    primary2Color: "#455A64", //blueGrey700
    primary3Color: "#90A4AE", //blueGrey300
    primary4Color: "#3e688c", //cornflower blue
    textColor: Colors.blueGrey700,
    primaryTextColor: Colors.blueGrey500,
    secondaryTextColor: "#455A64", //blueGrey700
    //  alternateTextColor: '#ffffff',
    canvasColor: Colors.grey300,
    accent1Color: Colors.yellow700,  //yellow
    //accent2Color: '#4eaf7b', //green light
    accent2Color: Colors.yellow100,
    accent3Color: "#af7b4e", //brown light
    accent4Color: "#CFD8DC", //grey light
    borderColor: "#9ccc65"
  },
  fontFamily: "Roboto, sans-serif",
  typography: {
    //fontStyleButtonFontSize:
    //fontWeightMedium,
  },
  appBar: {
    height: 57
    //color: blueGrey600
  },
  drawer: {
    width: 230,
    color: "#90A4AE"
  },
  raisedButton: {
    //  primaryColor: blue600
  },
  flatButton: {
    primaryTextColor: Colors.blueGrey200
  },
  menuItem: {
    selectedTextColor: Colors.cyan500,
    hoverColor: fade(Colors.cyan500, 0.1)
  },
  toggle: {
    thumbOnColor: Colors.green500,
    trackOnColor: fade(Colors.green500, 0.5)
  },

  tableRow: {
    //hoverColor: palette.accent2Color,
    //stripeColor: fade(lighten(blueGrey800, 0.5), 0.4),
    //selectedColor: palette.borderColor,
    //textColor: palette.textColor,
    //borderColor: palette.borderColor,
  fontSize: 28,
  },
  tableHeader: {
    //borderColor: Colors.cyan500,
    color: Colors.green900
  },
  tableFooter: {
    //textColor: '#ffffff'
  },
  table: {
    //backgroundColor: cyan500,
  },

  tableRowColumn: {
      height: 18,
      spacing: 20,
  },
  card: {
      titleColor: fade("#455A64", 0.87),
      subtitleColor: fade( "#455A64", 0.54),

    },
    cardText: {
      textColor:  "" ,
    },
});

export default themeDefault;
