import React, { Component } from "react";
import GetData from "../data/GetData";
import "./Cards.css";
import {
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

export const GnomeBox = ({ gnome }) => {
  return (
    <div className="container">
      <div className="row mb-3 b">
        <CardImg top width="100%" src={gnome.thumbnail} alt={gnome.name} />
        <CardBody>
          <CardTitle>
            <strong>Name: </strong> {gnome.name}
          </CardTitle>
          <CardSubtitle>
            <strong>Professions: </strong> {gnome.professions.join(", ")}
          </CardSubtitle>
          <CardText>
            <strong>Friends: </strong> {gnome.friends.join(", ")}
          </CardText>
          <hr />
          <CardText>
            <strong>Age: </strong>
            <span className="text-muted">{gnome.age}</span> |
            <strong> Haid Color: </strong>
            <span className="text-muted">{gnome.hair_color}</span> |
            <strong> Height: </strong>
            <span className="text-muted">{Math.round(gnome.height)}</span> |
            <strong> Weight: </strong>
            <span className="text-muted">{Math.round(gnome.weight)}</span>
          </CardText>
        </CardBody>
      </div>
    </div>
  );
};

export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = { respGnomesData: [], searchType: "Name", searchText: "" };
  }

  componentDidMount = async () => {
    const getData = await GetData;
    this.setState({
      respGnomesData: getData.Brastlewark,
      initState: getData.Brastlewark
    });
  };

  selectType = async event => {
    this.setState({
      searchType: event.target.value
    });
  };
  searchData = async event => {
    this.setState({
      searchText: event.target.value
    });

    let _gnomes = this.state.initState;
    let _newGnomes = this.state.respGnomesData;
    let _searchType = this.state.searchType;
    let _filteredGnomes = [];
    if (_searchType === "Name") {
      _filteredGnomes = _newGnomes.filter(gnome =>
        gnome.name.toLowerCase().includes(this.state.searchText.toLowerCase())
      );
    } else if (_searchType === "Professions") {
      _filteredGnomes = _newGnomes.filter(gnome =>
        gnome.professions.toString().includes(this.state.searchText)
      );
    }

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
        <div className="form-group col-md-2">
          <select
            defaultValue="Name"
            className="custom-select"
            onChange={e => this.selectType(e)}
          >
            <option value="Name">Name</option>
            <option value="Professions">Professions</option>
          </select>
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
