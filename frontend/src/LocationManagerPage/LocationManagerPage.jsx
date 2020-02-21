import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { locationmanagerActions } from '../_actions';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';


class LocationManagerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      debounce: null,
      locationManagers: [],
      main: [],
      deleted: false
    }
  }
  componentDidMount() {
    const { user } = this.props.authentication;
    const authUser = this.props.match.params.b_id;
    // if (authUser && authUser.role == 'businessOwner') {
      this.props.getAllLocationManagers('business_id', authUser, { search: this.state.searchText }).then(locationManagers => {
        this.setState({ locationManagers: locationManagers.data, main: locationManagers.data })
      });
    // } else {
    //   this.props.getAllLocationManagers('all', '', { search: this.state.searchText }).then(locationManagers => {
    //     this.setState({ locationManagers: locationManagers.data, main: locationManagers.data })
    //   });
    // }
  }

  searchText = (text) => {
    let { searchText, debounce } = this.state;
    searchText = text;
    // if (debounce !== null) {
    //   clearTimeout(debounce);
    // }
    // debounce = setTimeout(() => this.componentDidMount(), 1500);
    let locationManagers = this.state.main.filter(item => item.firstname && item.firstname.toLowerCase().includes(text.toLowerCase()));
    this.setState({ searchText, debounce, locationManagers });
  }

  handleDeleteLocationManager(e, id) {
    e.preventDefault();
    this.props.deleteLocationManager(id);
    // this.getActions(locationManager.status, locationManager._id);
  }

  handleActivateLocationManager(e, id) {
    e.preventDefault();
    const locationManager = {};
    locationManager._id = id;
    locationManager.status = true;
    this.props.activateLocationManager(locationManager);
    // this.getActions(locationManager.status, locationManager._id);
  }

  getActions(status, locationMgr_id) {
    return <div> <Link to={{ pathname: `/editlocationMgr/${locationMgr_id}/${this.props.match.params.b_id}` }} className=""><i className="fa fa-edit fa-fw"></i></Link>
      {status ?
        <Link to="/" className="" onClick={e => this.handleDeleteLocationManager(e, locationMgr_id)} ><i className="fa fa-check fa-fw"></i></Link>
        :
        <Link to="/" className="" onClick={e => this.handleActivateLocationManager(e, locationMgr_id)} ><i className="fa fa-remove fa-fw"></i></Link>
      } </div>
  }


  render() {
    const { locationManager, alert } = this.props;
    //console.log("customer ", customer);
    const columns = [
      {
        name: '#',
        selector: 'sno',
        sortable: true,
        grow: 0,
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        grow: 1
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true
      },
      {
        name: 'Business',
        selector: 'business',
        sortable: true,
        grow: 1
      },
      {
        name: 'Location',
        selector: 'location',
        sortable: true,
        grow: 1
      },
      {
        name: 'Status',
        selector: 'status',
        sortable: true,
        right: true,

      },
      {
        name: 'Actions',
        selector: 'actions',
        right: true,
      }
    ];
    let tableData = [];
    if (locationManager.items) {
      locationManager.items.forEach((locationManager, index) => {
        const data = {
          sno: tableData.length + 1,
          business: locationManager.business[0] ? locationManager.business[0].business_name : (locationManager.business ? locationManager.business.business_name : ''),
          name: locationManager.firstname ? locationManager.firstname + " " + locationManager.lastname : '',
          email: locationManager.email ? locationManager.email : '',
          status: locationManager.status ? 'Active' : 'Inactive',
          location: locationManager.location[0] ? locationManager.location[0].name : (locationManager.location ? locationManager.location.name : ''),
          actions: this.getActions(locationManager.status, locationManager._id)
        }
        if (this.state.deleted !== locationManager.status) {
          tableData.push(data);
        }
      });
    }
    return (
      <div>
        <Sidebar {...this.props} />
        <div className="wrapper">
          <Header />
          <div className="users">
            <div className="container-fluid">
              <div className="row">
                {alert.message &&
                  <div className="col-12 mt-3"><div className={`alert ${alert.type}`}>{alert.message}</div></div>
                }
              </div>
              <div className="row">
                <div className="col-sm-5 col-12">
                  <h3>Location Manager List</h3>
                </div>
                <div className="col-sm-3 col-6 d-flex justify-content-start justify-content-sm-end align-items-center mt-1 mt-sm-0">
                  <select class="form-control" value={this.state.deleted} onChange={(e) => this.setState({ deleted: !this.state.deleted })}>
                    <option value={false}>Active</option>
                    <option value={true}>Inactive</option>
                  </select>
                </div>
                <div className="col-sm-3 col-6 d-flex justify-content-start justify-content-sm-end align-items-center mt-1 mt-sm-0">
                  <Link to={`/addlocationMgr/${this.props.match.params.b_id}`} className="btn btn-primary w-100 editBtn text-white font-weight-normal">Add New Location Manager</Link>
                </div>
                {/* <div className="col-1 d-flex justify-content-end align-items-center">
                  <Link to={`/business`} className=""><i class="fa fa-arrow-circle-left fa-fw"></i></Link>
                </div> */}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="content my-3 shadow bg-white table-responsive dataTables">
                    <DataTable className="table table-stripped table-bordered"
                      title=""
                      columns={columns}
                      data={tableData}
                      pagination
                      paginationPerPage={25}
                      paginationRowsPerPageOptions={[25,50,100]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { locationManager, alert, authentication } = state;
  return { locationManager, alert, authentication };


}

const actionCreators = {
  getAllLocationManagers: locationmanagerActions.getAllLocationManagers,
  deleteLocationManager: locationmanagerActions.deleteLocationManager,
  activateLocationManager: locationmanagerActions.activate
}

const connectedLocationManagerPage = connect(mapState, actionCreators)(LocationManagerPage);
export { connectedLocationManagerPage as LocationManagerPage };