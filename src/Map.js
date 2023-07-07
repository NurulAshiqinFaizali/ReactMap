import React, { PureComponent } from "react";
import "./Map.css";
import { googleApiKey} from "./config/env";
import Script from "react-load-script";
import GoogleMapReact from "google-map-react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { Row, Col, Form, Input, Card, Button } from "antd";



function AnyReactComponent({ text }) {
  return (
    <div style={{ color: "red" }}>
      <img src={"./marker.png"} width={15} />
    </div>
  );
}
const defaultLocation = { lat: 3.1472 , lng: 101.6997,};
export default class MapClass extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      center : defaultLocation,
      lat: 3.1472,
      lng: 101.6997
    };

    this.autocomplete = React.createRef();
  }
  load = () => {
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
    this.autocomplete.addListener("place_changed", this.handlePlace);
  };

  handlePlace = () => {
    const addressObject = this.autocomplete.getPlace();
    if (addressObject.geometry.location) {
      console.log('address ob', addressObject)
      const address =  addressObject.name + ", " + addressObject.formatted_address;
      var lat_place = addressObject.geometry.location.lat();
      var lang_place = addressObject.geometry.location.lng();
      this.formRef.setFieldsValue({
        address: address,
      });
    }
    this.setState({
      lat: lat_place,
      lng: lang_place,
    });
    this.setState({
      center: { lat: lat_place, lng:lang_place},
    });
    this.forceUpdate()
  };

  render() {
 
    return (
      <div>
        <Card>
          <Row>
            <Col span={12}>
              <span>Enter your location</span>
              <Script
                url={
                  "https://maps.googleapis.com/maps/api/js?key=" +
                  googleApiKey +
                  "&libraries=places"
                }
                onLoad={this.load}
              />
              <Form
                name=""
                ref={(ref) => (this.formRef = ref)}
              >
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="address"
                  initialValue={this.state.address}
                >
                  <Input id="autocomplete" placeholder="Search Your Location" />
                </Form.Item>
                <Col span={12}>
                </Col>
              </Form>
            </Col>
          </Row>
        </Card>

<Card>
        {/* dynamic */}
        {/* <GoogleMap
          center={this.state.center}
          zoom={20}
          mapContainerStyle={{ height: "400px", width: "800px" }}
        >
          <Marker
            //onLoad={onLoad}
            position={this.state.center}
          >
          </Marker>
        </GoogleMap> */}

{/* static */}
        <GoogleMapReact
         style={{ height: 300 }}
         key={'maps'}
         bootstrapURLKeys={{ key: googleApiKey }}
         defaultCenter={this.state.center
         }
         defaultZoom={13}
        >
         <AnyReactComponent lat={this.state.lat} lng = {this.state.lng}>

         </AnyReactComponent>
        </GoogleMapReact>
     </Card>
      </div>
    );
  }
}
