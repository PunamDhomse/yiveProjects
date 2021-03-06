import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { businessMngActions, visitorActions } from '../_actions';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import Table from 'react-bootstrap/Table';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import DataTable from 'react-data-table-component';


class BusinessManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      debounce: null,
      customers: [],
      main: [],
      locs: [],
      deleted: false
    }
  }
  componentDidMount() {
    const { user } = this.props.authentication;
    const authUser = this.props.match.params.b_id;
    // if (authUser && authUser.role == 'businessOwner') {
    //   this.props.getAllCustomers('business_owner_id', authUser._id, { search: this.state.searchText }).then(customers => {
    //     this.setState({ customers: customers.data, main: customers.data })
    //   });
    // } else if (authUser && authUser.role == 'businessManager') {
    //   this.props.getAllCustomers('user_id', authUser._id, { search: this.state.searchText }).then(customers => {
    //     this.setState({ customers: customers.data, main: customers.data })
    //   });
    // } else {
    //   this.props.getAllCustomers('all', '', { search: this.state.searchText }).then(customers => {
    //     this.setState({ customers: customers.data, main: customers.data })
    //   });
    // }
    this.props.getAllCustomers('business_id', authUser, { search: this.state.searchText }).then(customers => {
      this.setState({ customers: customers.data, main: customers.data })
    });
  }

  searchText = (text) => {
    let { searchText, debounce } = this.state;
    searchText = text;
    // if (debounce !== null) {
    //   clearTimeout(debounce);
    // }
    // debounce = setTimeout(() => this.componentDidMount(), 1500);
    let customers = this.state.main.filter(item => item.firstname && item.firstname.toLowerCase().includes(text.toLowerCase()));
    this.setState({ searchText, debounce, customers });
  }


  handleEditCustomer(e, id) {
    e.preventDefault();
    this.props.editCustomer(id);
  }

  handleDeleteCustomer(e, id) {
    e.preventDefault();
    this.props.deleteCustomer(id);
  }
  handleActivateCustomer(e, id) {
    e.preventDefault();
    const customer = {};
    customer._id = id;
    customer.status = 1;
    this.props.activateCustomer(customer);
  }

  getActions(status, customer_id) {
    return <div> <Link to={{ pathname: `/editbusinessmanager/${customer_id}/${this.props.match.params.b_id}` }} className=""><i className="fa fa-edit fa-fw"></i></Link>
      {status ?
        <Link to="/" className="" onClick={e => this.handleDeleteCustomer(e, customer_id)} ><i className="fa fa-check fa-fw"></i></Link>
        :
        <Link to="/" className="" onClick={e => this.handleActivateCustomer(e, customer_id)} ><i className="fa fa-remove fa-fw"></i></Link>
      } </div>
  }


  render() {
    const { customer, alert } = this.props;
    const { user } = this.props.authentication;
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
    this.state.customers.forEach((customer, index) => {
      // if(customer.userprofileData.length > 0){
      const data = {
        sno: tableData.length + 1,
        business: customer.business[0] ? customer.business[0].business_name : 'Un-assigned',
        name: customer.firstname ? customer.firstname + " " + customer.lastname : '',
        email: customer.email ? customer.email : '',
        status: customer.status ? 'Active' : 'Inactive',
        actions: this.getActions(customer.status, customer._id)
      }
      if (this.state.deleted !== customer.status) {
        tableData.push(data);
      }
      // }
    });
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
                  <h3>Business Managers</h3>
                </div>
                <div className="col-sm-3 col-6 d-flex justify-content-start justify-content-sm-end align-items-center mt-1 mt-sm-0">
                  <select class="form-control" value={this.state.deleted} onChange={(e) => this.setState({ deleted: !this.state.deleted })}>
                    <option value={false}>Active</option>
                    <option value={true}>Inactive</option>
                  </select>
                </div>
                <div className="col-sm-3 col-6 d-flex justify-content-start justify-content-sm-end align-items-center mt-1 mt-sm-0">
                  {user && ['admin', 'businessOwner'].includes(user.role) ? <Link to={`/addbusinessmanager/${this.props.match.params.b_id}`} className="btn btn-primary w-100 editBtn text-white font-weight-normal">Add New Manager</Link> : null}
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
  const { businessmng, alert, authentication } = state;
  let customer = businessmng;
  return { customer, alert, authentication };
}

const actionCreators = {
  getAllCustomers: businessMngActions.getAllCustomers,
  editCustomer: businessMngActions.editCustomer,
  deleteCustomer: businessMngActions.deleteCustomer,
  activateCustomer: businessMngActions.activate
}

const connectedBusinessManager = connect(mapState, actionCreators)(BusinessManager);
export { connectedBusinessManager as BusinessManager };