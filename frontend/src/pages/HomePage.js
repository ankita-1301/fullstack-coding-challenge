import React from "react";
// import { Redirect, Route } from "react-router";
import "../styles.css";
import "antd/dist/antd.css";
import { Table, Button, Divider, notification, Icon } from "antd";
import { Link } from "react-router-dom";

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      reload: false,
      visible: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch("/getAll")
      .then(response => response.json())
      .then(data => {
        this.setState({ cars: data, reload: false });
      })
      .catch(err => console.log(err));
  };

  openNotification = data => {
    fetch(`/delete?id=${data.id}`, {})
      .then(() => {
        notification.open({
          message: "Success",
          description: `${data.model} - ${data.make} has been DELETED!`,
          icon: (
            <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
          ),
          duration: 2
        });
        this.setState({ reload: true });
      })
      .catch(err => console.log(err));
  };

  render() {
    let { cars, reload } = this.state;

    if (reload) {
      this.fetchData();
    }

    const columns = [
      {
        title: "Make",
        dataIndex: "make",
        key: "make",
        filters: Array.from(new Set(cars.map(s => s.make))).map(make => {
          return { text: make, value: make };
        }),
        filterMultiple: true,
        onFilter: (value, record) => record.make.indexOf(value) === 0,
        sorter: (a, b) => a.make.length - b.make.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        // defaultSortOrder: "descend",
        sorter: (a, b) => a.price - b.price
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
        filters: Array.from(new Set(cars.map(s => s.model))).map(model => {
          return { text: model, value: model };
        }),
        filterMultiple: true,
        onFilter: (value, record) => record.model.indexOf(value) === 0,
        sorter: (a, b) => a.model.length - b.model.length,
        sortDirections: ["descend", "ascend"]
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Link
              to={{
                pathname: `/vehicle/${record.id}`
              }}
            >
              Check
            </Link>
            <Divider type="vertical" />
            <Button onClick={() => this.openNotification(record)}>
              Delete
            </Button>
          </span>
        )
      }
    ];

    return (
      <div>
        <Table columns={columns} dataSource={cars} rowKey="id" />
      </div>
    );
  }
}
