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
      width: "20%"
    }
  }
};

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      absoluteSelected: 0,
      hideColWidth: 1000,
      hideForPhone: 375
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
      console.log("containerWidth " + this.props.containerWidth);
      //this.props.onselect(this.state.projects[n].order);
      this.setState({ absoluteSelected: n });
      this.props.onselect(n + 1);
      this.props.onEdit(type);
    };
    /*
    const handleChange = () => {
      console.log("handleChange f");
      this.props.change('company',)
    };
    */
    const handleChange = (name, value) => {
      console.log("handleChange f called " + [name, value]);
      this.props.change(name, value);
    };
    return (
      <div>
        <Table fixedHeader={true} selectable={true}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan="3">
                Deal name <SortIcon id={2} />
              </TableHeaderColumn>
              {this.props.containerWidth > this.state.hideColWidth ? (
                <span>
                  <TableHeaderColumn>
                    Minimum
                    <br />capital
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Maximum <br /> capital
                  </TableHeaderColumn>
                </span>
              ) : null}
              {this.props.containerWidth > this.state.hideForPhone ? (
                <TableHeaderColumn>
                  Committed <br />capital
                </TableHeaderColumn>
              ) : null}
              {this.props.containerWidth > this.state.hideForPhone ? (
                <span>
                  <TableHeaderColumn>Legal</TableHeaderColumn>
                  <TableHeaderColumn>Background</TableHeaderColumn>
                  <TableHeaderColumn>Financials</TableHeaderColumn>
                </span>
              ) : null}
              <TableHeaderColumn style={styles.columns.icon} />
            </TableRow>
          </TableHeader>
          <TableBody
            ref="table-body"
            displayRowCheckbox={false}
            stripedRows={true}
            showRowHover={true}
          >
            {this.props.data.map((item, i) => (
              <TableRow key={"tableRow" + i} selected={this.isSelected(i)}>
                <TableRowColumn>{item.Name}</TableRowColumn>
                {this.props.containerWidth > this.state.hideColWidth ? (
                  <span>
                    <TableRowColumn>{"$10,000"}</TableRowColumn>
                    <TableRowColumn>{"$200,000"}</TableRowColumn>
                  </span>
                ) : null}
                {this.props.containerWidth > this.state.hideForPhone ? (
                  <TableRowColumn>{"$3,000,000"}</TableRowColumn>
                ) : null}
                {this.props.containerWidth > this.state.hideForPhone ? (
                  <span>
                    <TableRowColumn>
                      <TableSelectField
                        choices={this.props.selectLegal}
                        save={item.legal}
                        change={handleChange}
                        name={"legal"}
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <TableSelectField
                        choices={this.props.selectBackground}
                        save={item.background}
                        change={handleChange}
                        name="background"
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <TableSelectField
                        choices={this.props.selectFinancials}
                        save={item.financials}
                        change={handleChange}
                        name="financials"
                      />
                    </TableRowColumn>
                  </span>
                ) : null}
                <TableRowColumn style={styles.columns.icon}>
                  <IconButton
                    tooltip="Box.com viewer"
                    tooltipPosition={"bottom-left"}
                  >
                    <NoteAdd
                      id={i}
                      onMouseUp={() => handleClick("docs", i)}
                      color={this.props.muiTheme.palette.accent5Color}
                    />
                  </IconButton>

                  <IconButton
                    tooltip="Edit all fields"
                    tooltipPosition={"bottom-left"}
                  >
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Dimensions()(muiThemeable()(TableComponent));
