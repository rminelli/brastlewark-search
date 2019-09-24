import React, { Component } from "react";
import GetData from "../data/GetData";
import "./Cards.css";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";

export const GnomeBox = ({ gnome }) => {
  return (
    <div className="container">
      <div className="row mb-3 b">
        <CardImg top width="100%" src={gnome.thumbnail} alt={gnome.name} />
        <CardBody>
          <CardTitle>
            <strong>Name:</strong> {gnome.name}
          </CardTitle>
          <CardSubtitle>
            <strong>Professions:</strong> {gnome.professions.join(", ")}
          </CardSubtitle>
          <CardText>
            <strong>Friends:</strong> {gnome.friends.join(", ")}
          </CardText>
        </CardBody>
      </div>
    </div>
  );
};

export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = { respGnomesData: [], searchText: "" };
  }

  componentDidMount = async () => {
    const getData = await GetData;
    this.setState({
      respGnomesData: getData.Brastlewark,
      initState: getData.Brastlewark
    });
  };

  searchData = async event => {
    this.setState({
      searchText: event.target.value
    });

    let _gnomes = this.state.initState;
    let _newGnomes = this.state.respGnomesData;
    let _filteredGnomes = [];
    _filteredGnomes = _newGnomes.filter(gnome =>
      gnome.name.toLowerCase().includes(this.state.searchText.toLowerCase())
    );

    if (_filteredGnomes.length === 0 || !event.target.value) {
      this.setState({
        respGnomesData: _gnomes
      });
    } else {
      this.setState({
        respGnomesData: _filteredGnomes
      });
    }
  };

  render() {
    return (
     
        <div className="form-row">
          <div className="form-group col-md-1">
        <UncontrolledButtonDropdown>
          <DropdownToggle caret>Select</DropdownToggle>
          <DropdownMenu>           
            <DropdownItem>Name</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Profession</DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        </div>
        
        <div className="form-group col-md-8">
          <input
            onChange={e => this.searchData(e)}
            value={this.state.searchText}
            className="form-control form-control-borderless"
            type="search"
            placeholder="Search..."
          ></input>
        </div>

        <div className="container">
          {this.state.respGnomesData.length > 0 ? (
            this.state.respGnomesData.map(gnome => (
              <GnomeBox key={gnome.id} gnome={gnome} />
            ))
          ) : (
            <h3>Waiting... </h3>
          )}
        </div>
      </div>
    );
  }
}
