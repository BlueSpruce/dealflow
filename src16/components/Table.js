import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import SortIcon from "material-ui/svg-icons/action/swap-vert";
import Lightbulb from "material-ui/svg-icons/action/lightbulb-outline";
import { numberAddCommas, prependDollarSign } from "../utils/utils";
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import NoteAdd from "material-ui/svg-icons/action/note-add";
import TableSelectField from "./TableSelectField";
import muiThemeable from "material-ui/styles/muiThemeable";
import IconButton from "material-ui/IconButton";
import Dimensions from "react-dimensions";
const styles = {
  columns: {
    icon: {
      overflow: "visible",
      width: "25%"
    }
  },
  large: 1000,
  medium: 600,
  small: 450
};

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      absoluteSelected: 0
    };
  }
  componentDidUpdate() {}
  isSelected = index => {
    //console.log('isSelected '+[index, this.])
    //  return this.props.select.indexOf(index) !== -1;
    return index === this.state.absoluteSelected;
  };

  render() {
    const getRandomCurrency = () => {
      return prependDollarSign(
        numberAddCommas(Math.round(Math.random() * 100000, 2))
      );
    };
    const handleClick = (type, n) => {
      //this.props.onselect(this.state.projects[n].order);
      this.setState({ absoluteSelected: n });
      this.props.onselect(n + 1);
      this.props.onEdit(type);
    };

    const drawTableHeader = () => {
      let columns = [];
      const largeColumns = [
        { name: "Deal name", width: "20%" },
        { name: "Minimum $", width: "" },
        { name: "Maximum $", width: "" },
        { name: "Committed $ ", width: "" },
        { name: "Legal", width: "" },
        { name: "Background", width: "" },
        { name: "Financials", width: "" },
        { name: "", width: "" },
        { name: "", width: "" },
        { name: "", width: "" }
      ];
      const medColumns = ["Deal name", `Committed $`, ""];
      const smallColumns = ["Deal name", ""];
      if (this.props.containerWidth > styles.large) {
        columns = largeColumns;
      } else if (this.props.containerWidth > styles.medium) {
        columns = medColumns;
      } else {
        columns = smallColumns;
      }

      if (columns == largeColumns) {
        return (
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              {columns.map(i => (
                <TableHeaderColumn style={{ width: i.width }}>
                  {i.name}
                </TableHeaderColumn>
              ))}
            </TableRow>
          </TableHeader>
        );
      } else {
        return (
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              {columns.map(i => <TableHeaderColumn>{i}</TableHeaderColumn>)}
            </TableRow>
          </TableHeader>
        );
      }
    };
    const returnWidthCurr = widthPerct => {
      let r = "0%";
      if (widthPerct > styles.large) {
        r = "10%";
      } else if (widthPerct > styles.medium) {
        r = "15%";
      } else {
        r = "0%";
      }
      return (
        <TableRowColumn style={{ width: r }}>{"$3,100,000"}</TableRowColumn>
      );
    };
    const drawTableRow = (item, i) => {
      return (
        <TableRow key={"tableRow" + i} selected={this.isSelected(i)}>
          {this.props.containerWidth > styles.large ? (
            <TableRowColumn style={{ width: "20%" }}>
              {item.Name}
            </TableRowColumn>
          ) : (
            <TableRowColumn style={{ width: "35%" }}>
              {item.Name}
            </TableRowColumn>
          )}
          {this.props.containerWidth > styles.large ? (
            <TableRowColumn>{"$10,000"}</TableRowColumn>
          ) : (
            <TableRowColumn style={{ width: "0%" }} />
          )}
          {this.props.containerWidth > styles.large ? (
            <TableRowColumn>{"200,000"}</TableRowColumn>
          ) : (
            <TableRowColumn style={{ width: "0%" }} />
          )}
          {returnWidthCurr(this.props.containerWidth)}
          {this.props.containerWidth > 600 ? (
            <TableRowColumn>
              <TableSelectField
                choices={this.props.selectLegal}
                save={item.legal}
                change={handleChange}
                name={"legal"}
              />
            </TableRowColumn>
          ) : (
            <TableRowColumn style={{ width: "0%" }} />
          )}
          {this.props.containerWidth > 600 ? (
            <TableRowColumn>
              <TableSelectField
                choices={this.props.selectBackground}
                save={item.background}
                change={handleChange}
                name="background"
              />
            </TableRowColumn>
          ) : (
            <TableRowColumn style={{ width: "0%" }} />
          )}
          {this.props.containerWidth > 600 ? (
            <TableRowColumn>
              <TableSelectField
                choices={this.props.selectFinancials}
                save={item.financials}
                change={handleChange}
                name="financials"
              />
            </TableRowColumn>
          ) : (
            <TableRowColumn style={{ width: "0%" }} />
          )}
          {this.props.containerWidth > styles.medium ? (
            drawIconRowColumn(i, "20%")
          ) : (
            drawIconRowColumn(i, "20%")
          )}
        </TableRow>
      );
    };

    const drawIconRowColumn = (i, strWidth) => {
      return (
        <TableRowColumn style={styles.columns.icon}>
          <IconButton tooltip="Box.com viewer" tooltipPosition={"bottom-left"}>
            <NoteAdd
              id={i}
              onMouseUp={() => handleClick("docs", i)}
              color={this.props.muiTheme.palette.accent5Color}
            />
          </IconButton>
          <IconButton tooltip="Edit all fields" tooltipPosition={"bottom-left"}>
            <ModeEdit
              id={i}
              onMouseUp={() => handleClick("form", i)}
              color={this.props.muiTheme.palette.accent5Color}
            />
          </IconButton>

          <IconButton
            tooltip="Publish template"
            tooltipPosition={"bottom-left"}
          >
            <Lightbulb
              id={i}
              onMouseUp={() => handleClick("execSummary", i)}
              color={this.props.muiTheme.palette.accent5Color}
            />
          </IconButton>
        </TableRowColumn>
      );
    };
    const handleChange = (name, value) => {
      console.log("handleChange f called " + [name, value]);
      this.props.change(name, value);
    };
    return (
      <div>
        <Table fixedHeader={true} selectable={true}>
          {drawTableHeader()}
          <TableBody
            ref="table-body"
            displayRowCheckbox={false}
            stripedRows={true}
            showRowHover={true}
          >
            {this.props.data.map((item, i) => drawTableRow(item, i))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Dimensions()(muiThemeable()(TableComponent));
