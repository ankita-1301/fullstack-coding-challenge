import React from "react";
import "../styles.css";
import "antd/dist/antd.css";
import {
  Form,
  Select,
  Button,
  InputNumber,
  Input,
  notification,
  Icon
} from "antd";
const { Option } = Select;
const { TextArea } = Input;

class VehicleForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (err) {
        console.log(err);
      } else if (data) {
        fetch("/create", {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            notification.open({
              message: "Success",
              description: `${data.model} - ${data.make} has been CREATED!`,
              icon: (
                <Icon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              ),
              duration: 2
            });
            this.props.history.push("/");
          });
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  dummyRequest({ file, onSuccess }) {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 7 }
    };

    const carMakes = ["BMW", "Peugeot", "Fiat", "Kia", "Toyota", "Chevrolet"];

    return (
      <div>
        <h1 style={{ marginLeft: "96px" }}>Sell your Vehicle</h1>

        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Brand" hasFeedback>
            {getFieldDecorator("make", {
              rules: [{ required: true, message: "Please select Brand!" }]
            })(
              <Select placeholder="Please select Brand">
                {carMakes.map(make => (
                  <Option value={make} key={make}>
                    {make}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Model" hasFeedback>
            {getFieldDecorator("model", {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Price" hasFeedback>
            {getFieldDecorator("price", {
              rules: [
                {
                  required: true,
                  message: "Please select the price",
                  type: "number"
                }
              ]
            })(
              <InputNumber
                formatter={value => `€${value}`}
                parser={value => value.replace("€", "")}
                step="100"
              />
            )}
          </Form.Item>

          <Form.Item label="Year" hasFeedback>
            {getFieldDecorator("year", {
              rules: [
                {
                  required: true,
                  message: "Please select the year",
                  type: "number"
                }
              ]
            })(<InputNumber max={2020} />)}
          </Form.Item>

          <Form.Item label="E-mail" hasFeedback>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Description" hasFeedback>
            {getFieldDecorator("description", {
              rules: [
                {
                  message: "Describe the vehicle!"
                },
                {
                  required: true
                }
              ]
            })(<TextArea placeholder="Describe the Vehicle" autoSize />)}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create()(VehicleForm);
