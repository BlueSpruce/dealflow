import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
//import Toggle from "material-ui/Toggle";
import DatePicker from "material-ui/DatePicker";
import Divider from "material-ui/Divider";

import ReactQuill from "react-quill";
import theme from "react-quill/dist/quill.snow.css";

import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

import injectTapEventPlugin from "react-tap-event-plugin";

import { debounce } from "throttle-debounce";
//import  {throttle} from 'throttle-debounce/throttle'

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const customContentStyle = {
  width: "100%",
  maxWidth: "none"
};

const persons = [
  { value: 0, first: "Oliver ", last: "Hansen" },
  { value: 1, first: "Van", last: "Henry" },
  { value: 2, first: "April", last: "Tucker" },
  { value: 3, first: "Ralph", last: "Hubbard" },
  { value: 4, first: "Omar", last: "Alexander" }
];

class DealForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      modal: false,
      values: []
    };
    this.handleChangeQuill = this.handleChangeQuill.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    injectTapEventPlugin();
  }

  handleModal = () => {
    console.log("handleModal");
    this.setState({ modal: !this.state.modal });
  };

  handleChangeQuill(value) {
    this.props.f("quill", value);
  }
  handleChangeSelect2(value) {
    console.log("handleChangeSelect " + value.toString());
    this.props.f("reqcapital", value);
  }
  handleChangeSelect = (event, index, value) => {
    console.log("handleChangeSelect " + [index, value]);
    this.props.f("reqcapital", value);
  };
  handleChangePeople = (event, index, values) => {
    this.setState({ values });
    this.props.f("keypeople", values);
  };
  handleAdd() {
    console.log("handleAdd");
    this.props.ad();
  }

  handleChange = event => {
    console.log("handleChange name: " + event.target.name);
    this.props.f(event.target.name, event.target.value);
  };

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"],
      [{ color: [] }, { background: [] }]
    ]
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background"
  ];

  selectionRenderer = values => {
    switch (values.length) {
      case 0:
        return "";
      case 1:
        return persons[values[0]].first;
      default:
        //  return `${values.length} names selected`;
        return values.map(v => persons[v].first + ", ");
    }
  };

  menuItems(persons) {
    return persons.map(person =>
      <MenuItem
        key={person.value}
        checked={this.state.values.indexOf(person.value) > -1}
        value={person.value}
        primaryText={person.first + " " + person.last}
      />
    );
  }

  render() {
    const { values } = this.state;
    const {selectedObj, capitalMapping} = this.props;
    const actions = [
      <FlatButton label="Close" primary={true} onTouchTap={this.handleModal} />
    ];
    return (
      <div>
        <form style={{ padding: 20 }}>



          <TextField
            hintText="Date received"
            floatingLabelText="Date received"
            name="dateReceived"
            value={selectedObj.dateReceived}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Family members"
            floatingLabelText="Family members"
            name="familymembers"
            value={selectedObj.familymembers}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Deal name"
            floatingLabelText="Deal name"
            name="dealname"
            value={selectedObj.dealname}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Investment type"
            floatingLabelText="Investment type"
            name="investmenttype"
            value={selectedObj.investmenttype}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Financials"
            floatingLabelText="Financials"
            name="financials"
            value={selectedObj.financials}
            onChange={this.handleChange}
          />
          <SelectField
            floatingLabelText="Required capital"
            value={selectedObj.reqcapital}
            onChange={this.handleChangeSelect}
            style={{ height: 87 }}
          >
            <MenuItem value={1} primaryText={capitalMapping[1]} />
            <MenuItem value={2} primaryText={capitalMapping[2]} />
            <MenuItem value={3} primaryText={capitalMapping[3]} />
            <MenuItem value={4} primaryText={capitalMapping[4]} />
            <MenuItem value={5} primaryText={capitalMapping[5]} />
          </SelectField>

          <SelectField
            floatingLabelText="Key people"
            multiple={true}
            hintText="Key people"
            name="keypeople"
            value={values}
            onChange={this.handleChangePeople}
            selectionRenderer={this.selectionRenderer}
            style={{ height: 87 }}
          >
            {this.menuItems(persons)}
          </SelectField>
          <TextField
            hintText="Background"
            floatingLabelText="Background"
            name="background"
            value={selectedObj.background}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Lead person"
            floatingLabelText="Lead person"
            name="leadPerson"
            value={selectedObj.leadPerson}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Status"
            floatingLabelText="Status"
            name="status"
            value={selectedObj.status}
            onChange={this.handleChange}
          />


          <RaisedButton
            label= {'Recommendation for '+selectedObj.dealname}
            onTouchTap={this.handleModal}
            primary={true}
          />
          <div />
            <Dialog
              title={'Recommendation for '+selectedObj.dealname}
              actions={actions}
              modal={false}
              open={this.state.modal}
              onRequestClose={this.handleModal}
              contentStyle={customContentStyle}
            >
              <div style={{ backgroundColor: "#cccccc", padding: 20 }}>
                 
                <div style={{ backgroundColor: "#fff" }}>
                  <ReactQuill
                    onChange={debounce(500, this.handleChangeQuill)}
                    placeholder={this.props.placeholder}
                    value={this.props.selectedObj.quill}
                    theme={"snow"}
                    modules={this.modules}
                    formats={this.formats}
                  />
                </div>
              </div>
            </Dialog>


        </form>
      </div>
    );
  }
}

export default DealForm;
