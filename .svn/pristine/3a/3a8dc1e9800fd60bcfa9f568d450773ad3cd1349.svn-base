import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

export default class AddLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            regions: []
        }
    }

    componentWillMount() {
        this.props.returnCountries().then(countries => {
            this.setState({ countries: countries.data });
        });
    }

    countryChange = (e) => {
        this.props.returnRegions(e.target.value).then(regions => {
            this.setState({ regions: regions.data[0].regions });
        });
        this.props.handleChange(e);
    }

    render() {
        const { idx, val, regions, businessLocation } = this.props;
        let nameId = `name-${idx}`, cityId = `city-${idx}`, countryId = `country-${idx}`, addressId = `address-${idx}`, stateId = `state-${idx}`, postalcodeId = `postalcode-${idx}`
        return (
            <div className="row">
                {val.status ? <div className="col-12 addLocation my-3 p-3 bg-light rounded">
                    <Form.Group>
                        <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" data-fieldname="name" name={nameId} id={nameId} data-id={idx} placeholder="Enter location name" value={businessLocation[idx].name} onChange={this.props.handleChange} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>City <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" data-fieldname="city" name={cityId} id={cityId} data-id={idx} placeholder="Enter location city" value={businessLocation[idx].city} onChange={this.props.handleChange} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Country <span className="text-danger">*</span></Form.Label>
                        <Form.Control as="select" data-fieldname="country" name={countryId} id={countryId} data-id={idx} as="select" onChange={this.countryChange} >
                            <option value="0">Select country</option>
                            {this.state.countries &&
                                this.state.countries.map((country, index) =>
                                    <option value={country._id}>{country.name}</option>
                                )};
                                              </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" data-fieldname="address" name={addressId} id={addressId} data-id={idx} placeholder="Enter location address" value={businessLocation[idx].address} onChange={this.props.handleChange} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>State <span className="text-danger">*</span></Form.Label>
                        <Form.Control as="select" name={stateId} data-fieldname="state" id={stateId} data-id={idx} as="select" onChange={this.props.handleChange} >
                            <option >Select state</option>
                            {this.state.regions &&
                                this.state.regions.map((region, index) =>
                                    <option value={region._id}>{region.name}</option>
                                )};
                                              </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Postal Code <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="text" name={postalcodeId} data-fieldname="postalcode" id={postalcodeId} data-id={idx} placeholder="Enter postal code" value={businessLocation[idx].postalcode} onChange={this.props.handleChange} />
                    </Form.Group>
                    {(idx > 0) ?
                        <Form.Group className="d-flex flex-wrap justify-content-end">
                            <Form.Label></Form.Label>
                            <button type="button" class="customBtn float-right btn btn-primary" key={idx} data-id={idx} onClick={this.props.removeLocation}>Remove location</button>

                        </Form.Group>
                        : <Form.Group className="d-flex flex-wrap justify-content-end">
                            <Form.Label></Form.Label>
                            {/* <button type="button" class="customBtn float-right btn btn-primary" key={idx} data-id={idx} onClick={this.props.removeLocation}>Remove location</button> */}

                        </Form.Group>}
                </div> : null}
            </div>
        );
    }
}