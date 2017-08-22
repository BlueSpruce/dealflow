import React, { Component } from "react";
import ReactDataGrid from "react-data-grid";
//import ReactDataGridPlugins from 'react-data-grid-addons';
import { Editors, Formatters } from 'react-data-grid-addons';

import "./App.css";

class App extends Component {
  render() {
    const { DropDownEditor } = Editors;
const { DropDownFormatter } = Formatters
    const titles = ['Yes', 'No' ];
    const columns = [
      { key: "received", name: "Date received" },
      { key: "familymembers", name: "Family members" },
      { key: "dealname", name: "Deal name" },
      { key: "investmenttype", name: "Investment type" },
      { key: "keypeople", name: "Key people" },
      { key: "financials", name: "Fiancials",},
      { key: "legalreview", name: "Legal review" },
      { key: "background", name: "Background" },
      { key: "reqcapital", name: "Req capital" },
      { key: "recommend", name: "Recommend" },
      { key: "status", name: "Status" },
      { key: "leadperson", name: "Lead person" }
    ];
    const rows = [{ id: 1, received: "1/2/2017", familymembers:'Iris' ,financials:'Yes'}];
    const rowGetter = rowNumber => rows[rowNumber];

    return (
      <div className="App">
        <ReactDataGrid
          enableCellSelect={true}
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={rows.length}
          minHeight={500}
        />
      </div>
    );
  }
}

export default App;
