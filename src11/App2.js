import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          key: "id",
          name: "ID",
          width: 80
        },
        {
          key: "task",
          name: "Title",
          editable: true
        },
        {
          key: "priority",
          name: "Priority",
          editable: true
        },
        {
          key: "issueType",
          name: "Issue Type",
          editable: true
        },
        {
          key: "complete",
          name: "% Complete",
          editable: true
        },
        {
          key: "startDate",
          name: "Start Date",
          editable: true
        },
        {
          key: "completeDate",
          name: "Expected Complete",
          editable: true
        }
      ],
     return { rows: this.createRows(1000) };
    };
  }

  getRandomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ).toLocaleDateString();
  }

  createRows(numberOfRows) {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: "Task " + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ["Critical", "High", "Medium", "Low"][
          Math.floor(Math.random() * 3 + 1)
        ],
        issueType: ["Bug", "Improvement", "Epic", "Story"][
          Math.floor(Math.random() * 3 + 1)
        ],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }
  //  console.log('rows '+rows)
    this.setState({rows:rows})
    //return rows;
  }

  rowGetter(i) {
    console.log('i'+i)
    console.log(this.state.rows)
    return this.state.rows[i];
  }

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows;

    for (let i = fromRow; i <= toRow; i++) {
      let rowToUpdate = rows[i];
      let updatedRow = React.addons.update(rowToUpdate, { $merge: updated });
      rows[i] = updatedRow;
    }

    this.setState({ rows:rows });
  }

  render() {
    return (
      <ReactDataGrid
        enableCellSelect={true}
        columns={this.state.columns}
        rowGetter={this.rowGetter}
        rowsCount={2}
        minHeight={500}
        onGridRowsUpdated={this.handleGridRowsUpdated}
      />
    );
  }
}

export default App;
