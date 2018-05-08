import React from "react";
import * as usersService from "../services/users.service";
import Paginator from "./Paginator";
import UsersLists from "../components/ListsCRUD/UsersLists.js";
import PageHeader from "./PageHeader";
import headerObject from "../constants/page-header.js";

class UsersView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      searchItems: ""
    };

    this.renderList = this.renderList.bind(this);
    this.onChange = this.onChange.bind(this);
    this.searchAndFilter = this.searchAndFilter.bind(this);
  }

  componentDidMount() {
    usersService.readAll().then(data => {
      this.setState({
        users: data.items
      });
      this.originalUsers = data.items;
    });
  }

  onChange(e) {
    this.setState({ searchItems: e.target.value }, this.searchAndFilter);
  }

  searchAndFilter() {
    let filteredUsers = this.originalUsers.filter(user => {
      if (user.firstName && user.firstName.includes(this.state.searchItems)) {
        return user;
      } else if (user.lastName && user.lastName.includes(this.state.searchItems)) 
      {
        return user;
      }
      return filteredUsers;
    });
    this.setState({users:filteredUsers});
  }

  renderList(listData) {
    return <UsersLists userData={listData} />;
  }

  render() {
    return (
      <React.Fragment>
        <div id="ribbon">
          <span className="ribbon-button-alignment">
            <span
              id="refresh"
              className="btn btn-ribbon"
              data-action="resetWidgets"
              data-titla="refresh"
              rel="tooltip"
              data-placement="bottom"
              data-original-title="<i className='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings."
              data-html="true"
            >
              <i className="fa fa-refresh" />
            </span>
          </span>
          <ol className="breadcrumb">
            <li>Home</li>
            <li>Users List</li>
          </ol>
        </div>

        <div id="content">
          <PageHeader
            pageHeaderName={headerObject.usersViewCrud.pageHeader}
            subtitle={headerObject.usersViewCrud.subTitle}
          />

          <div className="container alert alert-info" role="alert">
            <form className="form-horizontal">
              <label htmlFor="search" className="col-md-2 control-label">
                Search for a user <i className="fa fa-search" />
              </label>

              <div className="col-md-3">
                <input
                  type="text"
                  name="search"
                  className="col-md-12"
                  value={this.state.searchItems}
                  onChange={this.onChange}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-12" id="withPaginator">
          <Paginator dataCRUD={this.state.users} renderList={this.renderList} />
        </div>
      </React.Fragment>
    );
  }
}

export default UsersView;
