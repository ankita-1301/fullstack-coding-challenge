import React from "react";
import "../styles.css";
import "antd/dist/antd.css";
import { Card } from "antd";

export default class Vehicle extends React.Component {
  constructor() {
    super();
    this.state = {
      currentCar: {}
    };
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    fetch(`/get?Id=${params.Id}`, {})
      .then(response => response.json())
      .then(data => {
        this.setState({ currentCar: { data } });
      });
  }
  render() {
    let {
      currentCar: { data }
    } = this.state;

    return (
      <div>
        {data && (
          <Card
            title={"MAKE : " + data.make}
            bordered={true}
            style={{
              width: 600,
              marginLeft: "96px"
            }}
          >
            <h1 className="h1-style">Model : </h1>
            <h2> {data.model}</h2> <br />
            <h1 className="h1-style">Price : </h1>
            <h2>{data.price} Euros</h2> <br />
            <h1 className="h1-style">Year : </h1>
            <h2>{data.year}</h2> <br />
            <h1 className="h1-style">Description : </h1>
            <h2>{data.description}</h2> <br />
            <h1 className="h1-style">Email : </h1>
            <h2>{data.email}</h2> <br />
          </Card>
        )}
      </div>
    );
  }
}
