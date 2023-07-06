import logo from "./logo.svg";
import React, { PureComponent } from "react";
import "./Map.css";
import { googleApiKey } from "./config/env";
import Script from "react-load-script";
import GoogleMapReact from "google-map-react";
import { Row, Col, Form, Input, Card } from "antd";

function AnyReactComponent({ text }) {
  return (
    <div style={{ color: "red" }}>
      <img src={"/static/assets/ic_mdlloc.png"} width={30} />
    </div>
  );
}
export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      lat: null,
      lang: null,
    };

    this.autocomplete = React.createRef();
  }

  handleScriptLoad = () => {
    var options = {
      types: ["establishment"],
      componentRestrictions: { country: "my" },
    };

    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );
    this.autocomplete.setFields([
      "address_components",
      "formatted_address",
      "name",
      "geometry.location",
    ]);
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  };

  handlePlaceSelect = () => {
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    if (address) {
      this.setState({
        address: addressObject.name + ", " + addressObject.formatted_address,
      });
    }
  };

  render() {
    return (
      <div>
        <Card>
          <Row>
                  <Col span={6}>
                    <span className="required form-label">Location</span>
                    <Script
                      url={
                        'https://maps.googleapis.com/maps/api/js?key=' +
                        googleApiKey +
                        '&libraries=places'
                      }
                      onLoad={this.handleScriptLoad}
                    />
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      name="address"
                      initialValue={this.state.address}
                    >
                      <Input
                        id="autocomplete"
                        placeholder="Search Your Location"
                      />
                    </Form.Item>
                  </Col>
                </Row>
        </Card>
        <Card>
          <GoogleMapReact
            style={{ height: 300 }}
            // key={'maps'}
            bootstrapURLKeys={{ key: googleApiKey, language: "en" }}
            defaultCenter={{
              lat: 3.146678,
              lng: 101.699129,
            }}
            defaultZoom={13}
          >
            <AnyReactComponent lat={this.state.lat} lng={this.state.lang} />
          </GoogleMapReact>
        </Card>
      </div>
    );
  }
}
