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

import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

const customContentStyle = {
  width: "100%",
  maxWidth: "none"
};

const persons = [
  {value: 0, first: 'Oliver ', last:'Hansen'},
  {value: 1, first: 'Van', last: 'Henry'},
  {value: 2, first: 'April', last:'Tucker'},
  {value: 3, first: 'Ralph', last:'Hubbard'},
  {value: 4, first: 'Omar', last:'Alexander'},

];

class DealForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      modal: false,
      values: [],
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
    //console.log("handleChangeQuill " + value);
    //  this.setState({ text: value });
    this.props.f("quill", value);
  }
  handleChangeSelect2(value) {
    console.log("handleChangeSelect " + value.toString());
    //  this.setState({ text: value });
    this.props.f("reqcapital", value);
  }
  handleChangeSelect = (event, index, value) => {
    //this.setState({value});
    console.log("handleChangeSelect " + [index, value]);
    this.props.f("reqcapital", value);
  };
  handleChangePeople = (event, index, values) => {
    this.setState({values});
    this.props.f("keypeople", values);
  }
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

  selectionRenderer = (values) => {
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return persons[values[0]].first;
      default:
      //  return `${values.length} names selected`;
      return values.map( v => persons[v].first+', ')
    }
  }

  menuItems(persons) {
    return persons.map((person) => (
      <MenuItem
        key={person.value}

        checked={this.state.values.indexOf(person.value) > -1}
        value={person.value}
        primaryText={person.first+" "+person.last}
      />
    ));
  }


  render() {
    const {values} = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleModal}
      />,
      <FlatButton label="Submit" primary={true} onTouchTap={this.handleModal} />
    ];
    return (
      <div>

        <form style={{ padding: 20 }}>
          <FloatingActionButton onClick={this.handleAdd}>
            <ContentAdd />
          </FloatingActionButton>
          <RaisedButton
            label="RECOMMENDATION MODAL"
            onTouchTap={this.handleModal}
          />
        <div></div>
          <Dialog
            title="Dialog With Custom Width"
            actions={actions}
            modal={false}
            open={this.state.modal}
             onRequestClose={this.handleModal}
            contentStyle={customContentStyle}
          >
            <div style={{ backgroundColor: "#cccccc", padding: 20 }}>
              RECOMMENDATION for selected project:
              {" "}{this.props.selectedObj.dealname}
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

          <TextField
            hintText="Date received"
            floatingLabelText="Date received"
            name="dateReceived"

            value={this.props.selectedObj.dateReceived}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Family members"
            floatingLabelText="Family members"
            name="familymembers"

            value={this.props.selectedObj.familymembers}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Deal name"
            floatingLabelText="Deal name"
            name="dealname"

            value={this.props.selectedObj.dealname}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Investment type"
            floatingLabelText="Investment type"
            name="investmenttype"

            value={this.props.selectedObj.investmenttype}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Financials"
            floatingLabelText="Financials"
            name="financials"

            value={this.props.selectedObj.financials}
            onChange={this.handleChange}
          />
          <SelectField
            floatingLabelText="Required capital"
            value={this.props.selectedObj.reqcapital}
            onChange={this.handleChangeSelect}
            style={{height:87}}
          >
            <MenuItem value={1} primaryText={this.props.capitalMapping[1]} />
            <MenuItem value={2} primaryText={this.props.capitalMapping[2]} />
            <MenuItem value={3} primaryText={this.props.capitalMapping[3]} />
            <MenuItem value={4} primaryText={this.props.capitalMapping[4]} />
            <MenuItem value={5} primaryText={this.props.capitalMapping[5]} />
          </SelectField>

          <SelectField
              floatingLabelText="Key people"
            multiple={true}
            hintText="Key people"
              name="keypeople"
            value={values}
            onChange={this.handleChangePeople}
            selectionRenderer={this.selectionRenderer}
            style={{height:87}}
          >
            {this.menuItems(persons)}
          </SelectField>
          <TextField
            hintText="Background"
            floatingLabelText="Background"
            name="background"

            value={this.props.selectedObj.background}
            onChange={this.handleChange}
          />
          <TextField
            hintText="Lead person"
            floatingLabelText="Lead person"
            name="leadPerson"

            value={this.props.selectedObj.leadPerson}
            onChange={this.handleChange}
          />
          <Divider />
        </form>
      </div>
    );
  }
}

export default DealForm;
