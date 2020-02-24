import React from "react";
import Navigation from "./components/Navigation";
import VehicleForm from "./components/VehicleForm";
import Vehicle from "./components/Vehicle";
import HomePage from "./pages/HomePage";
import { Route } from "react-router";
import { Layout } from "antd"; //Using Ant Design for UI

const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Navigation /> {/* Rendering Navigation Component */}
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <div
              style={{
                background: "#fff",
                padding: 24,
                minHeight: "100em"
              }}
            >
              <Route exact path="/" component={HomePage} />{" "}
              {/* Rendering HomePage Component */}
              <Route exact path="/sellVehicle" component={VehicleForm} />{" "}
              {/* Rendering VehicleForm Component */}
              <Route
                exact
                name="vehicleView"
                path="/vehicle/:Id"
                component={Vehicle}
              />{" "}
              {/* Rendering Vehicle Component */}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Footer text here</Footer>
        </Layout>
      </div>
    );
  }
}
