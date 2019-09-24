import React, { Component, useState } from "react";
import GetData from "../data/GetData";
import "./Cards.css";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';


export const GnomeBox = ({ gnome }) => {

  return (    
      <div className="card">
        <Card>
          <CardImg top width="100%" src={gnome.thumbnail} alt="Card image cap" className="card-img-top"/>
          <CardBody>
            <CardTitle>{}</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Detais</Button>
          </CardBody>
        </Card>
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
      <div className="container">
        <div className="col m-0 p-0">
          <input
            onChange={e => this.searchData(e)}
            value={this.state.searchText}
            className="form-control form-control-borderless mb-3"
            type="search"
            placeholder="Search..."
          ></input>
        </div>

        <div className="row">
          {this.state.respGnomesData.length > 0 ? (
            this.state.respGnomesData.map((gnome) => (
              <GnomeBox key={gnome.id} gnome={gnome} />
            ))
          ) : (
            <h5>Waiting...</h5>
          )}
        </div>
      </div>
    );
  }
}
