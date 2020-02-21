import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { businessActions } from '../_actions';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import Table from 'react-bootstrap/Table';
import DataTable from 'react-data-table-component';

class BusinessPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      debounce: null,
      businesses: [],
      deleted: false,
      main: []
    }
  }

  componentWillMount() {
    debugger;
    const { user } = this.props.authentication;
    const authUser = user;
    if (authUser && authUser.role == 'businessOwner') {
      this.props.getBusiness(authUser._id).then(res => {
        console.log("In side business from service "+ res);
        // this.props.history.push(`editbusiness/${res.data[0]._id}`);
      });
    } else {
      this.props.getBusiness();
    }
  }

  // componentDidMount() {
  //   const { user } = this.props.authentication;
  //   const authUser = user;
  //   if (authUser && authUser.role == 'admin') {
  //     this.props.getBusinessData('admin_id', authUser._id, { search: this.state.searchText }).then(businesses => {
  //       this.setState({ businesses: businesses.data, main: businesses.data })
  //     });
  //   } else {
  //     this.props.getBusinessData('all', '', { search: this.state.searchText }).then(businesses => {
  //       this.setState({ businesses: businesses.data, main: businesses.data })
  //     });
  //   }
  // }

  handleEditBusiness(e, id) {
    e.preventDefault();
    this.props.editBusiness(id);
  }

  handleDeleteBusiness(e, id) {
    e.preventDefault();
    this.props.deleteBusiness(id);
  }

  handleActivateBusiness(e, id) {
    e.preventDefault();
    const business = {};
    business._id = id;
    business.status = 1;
    this.props.activateBusiness(business);
  }

  // getActions(status, business_id) {
  //   return <div>
  //     <Link to={{ pathname: `/enroll/${business_id}` }} target="_blank" className=""><i title="Enroll" className="fa fa-plus"></i></Link>
  //     <Link to={{ pathname: `/business-manager/${business_id}` }} className=""><i title="Business Managers" className="fa fa-user fa-fw"></i></Link>
  //     <Link to={{ pathname: `/locationMgr/${business_id}` }} className=""><i title="Location Managers" className="fa fa-user-circle fa-fw"></i></Link>
  //     <Link to={{ pathname: `editbusiness/${business_id}` }} className=""><i className="fa fa-edit fa-fw"></i></Link>
  //     {status ?
  //       <Link to="/" className="" onClick={e => this.handleDeleteBusiness(e, business_id)} ><i className="fa fa-check fa-fw"></i></Link>
  //       :
  //       <Link to="/" className="" onClick={e => this.handleActivateBusiness(e, business_id)} ><i className="fa fa-remove fa-fw"></i></Link>
  //     } </div>
  // }

  searchText = (text) => {
    debugger
    let { searchText, debounce } = this.state;
    searchText = text;
    // if (debounce !== null) {
    //   clearTimeout(debounce);
    // }
    // debounce = setTimeout(() => this.componentDidMount(), 1500);
    let businesses = this.state.businesses.filter(item => item.business_name && (item.business_name.toLowerCase()).includes(text.toLowerCase()));
    this.setState({ searchText, debounce, businesses });
  }

  getActionToName(business_name, business_id) {
    return <div> <Link to={{ pathname: `editbusiness/${business_id}` }} className="">{business_name}</Link></div>
  }

  render() {
    debugger;
    const { business, alert, authentication } = this.props;
    //console.log('---------------', business)
    const { user } = authentication;
    const authUser = user;
    const columns = [
      // {
      //   name: '#',
      //   selector: 'sno',
      //   sortable: true,
      //   grow: 0,
      // },
      {
        name: 'Business Name',
        selector: 'name',
        sortable: true,
        grow: 1
      },
      {
        name: 'Business Owner',
        selector: 'owner',
        sortable: true
      },
      {
        name: 'Status',
        selector: 'status',
        sortable: true,
        right: true,

      },
      // {
      //   name: 'Actions',
      //   selector: 'actions',
      //   right: true,
      // },
    ];
    let nameOfBusiness = [];
    let tableData = [];
    if (business.items && business.items.length) {
      debugger;
      business.items.forEach((business, index) => {
        debugger;
        const data = {
          //sno: tableData.length + 1,
          //name: business.business_name,
          name: this.getActionToName(business.business_name, business._id),
          owner: (business.userData && business.userData[0]) ? business.userData[0]['firstname'] : authUser.role == 'businessOwner' ? authUser.firstname : '',
          // location:business.business_name,
          status: business.status ? 'Active' : 'Inactive',
          //actions: this.getActions(business.status, business._id)
        }
        if (this.state.deleted !== business.status) {
          tableData.push(data);
        }
      });
    }
    return (
      <div>
        <Sidebar {...this.props} />
        <div className="wrapper">
          <Header />
          <div className="businesslist">
            <div className="container-fluid">
              <div className="row">
                {alert.message &&
                  <div className="col-12 mt-2"><div className={`alert ${alert.type}`}>{alert.message}</div></div>
                }
                {/*business.loading && <em>Loading businesses...</em>*/}
                {business.error && <span className="text-danger">ERROR: {business.error}</span>}
              </div>
              <div className="row">

                <div className="col-sm-7 col-12">
                  <h3>Business List</h3>
                </div>
                {/* <div className="col-sm-2 col-6 d-flex justify-content-start justify-content-sm-end align-items-center mt-1 mt-sm-0">
                  <select className="form-control" value={this.state.deleted} onChange={(e) => this.setState({ deleted: !this.state.deleted })}>
                    <option value={false}>Active</option>
                    <option value={true}>Inactive</option>
                  </select>
                </div> */}
                <div className="col-sm-3 col-6 d-flex justify-content-start justify-content-sm-end align-items-center mt-1 mt-sm-0">
                  <input type='text' placeholder="Search for a Business" className={'form-control'} onChange={(e) => this.searchText(e.target.value)} />
                </div>
                <div className="col-sm-2 col-6 d-flex justify-content-start justify-content-sm-end align-items-center">
                  {authUser && authUser.role == 'admin' ? <Link to="/addbusiness" className="btn btn-success editBtn  w-100  text-white font-weight-normal">ADD NEW BUSINESS</Link> : null}
                </div>

              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="content my-4 shadow bg-white table-responsive dataTables">
                    <DataTable className="table table-stripped table-bordered"
                      title=""
                      columns={columns}
                      data={tableData}
                      pagination
                      paginationPerPage={25}
                      paginationRowsPerPageOptions={[25, 50, 100]}
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
  const { business, alert, authentication } = state;
  return { business, alert, authentication };
}

const actionCreators = {
  getBusiness: businessActions.getAllBusiness,
  //getBusinessData: businessActions.getBusinessData,
  editBusiness: businessActions.editBusiness,
  deleteBusiness: businessActions.deleteBusiness,
  activateBusiness: businessActions.activate
}

const connectedBusinessPage = connect(mapState, actionCreators)(BusinessPage);
export { connectedBusinessPage as BusinessPage };