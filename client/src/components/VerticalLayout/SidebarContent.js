import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
// import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader,
} from "../../store/actions";
import withRouter from "../Common/withRouter";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: this.props.router.location.pathname,
    };
  }
  componentDidMount() {
    this.initMenu();
  }

  UNSAFE_componentDidUpdate(prevProps) {
    if (
      this.props.router.location.pathname !== prevProps.router.location.pathname
    ) {
      this.initMenu();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");
    let pathName = window.location.pathname; // Get the current route
    if (pathName === "/") {
      pathName = "/dashboard"; // Default to dashboard if root
    }

    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");

    for (let i = 0; i < items.length; ++i) {
      const href = items[i].getAttribute("href");
      if (href === pathName) {
        matchingMenuItem = items[i];
        break;
      }
    }

    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }
  handleMenuClick = (e, item) => {
    console.log("Clicked item:", item);
    // Clear all active classes
    const ul = document.getElementById("side-menu");
    const activeItems = ul.querySelectorAll(".active, .mm-active, .mm-show");
    activeItems.forEach((activeItem) => {
      activeItem.classList.remove("active", "mm-active", "mm-show");
    });

    // Check if the item has a child <ul>
    const parentLi = item.closest("li");
    console.log("Parent <li> found: ", parentLi); // Debugging log
    if (!parentLi) {
      console.log("No parent <li> found for this item."); // Debugging log
      return;
    } // If no parent <li>, exit

    const childUl = parentLi.querySelector("ul.sub-menu");
    if (childUl) {
      console.log("Item has a child <ul>: ", childUl); // Debugging log
      // If it has a child <ul>, expand it
      parentLi.classList.add("mm-active");
      childUl.classList.add("mm-show");
    } else {
      // If it doesn't have a child <ul>, mark it as active
      item.classList.add("active");
      parentLi.classList.add("mm-active");
    }
  };

  activateParentDropdown = (item) => {
    const ul = document.getElementById("side-menu");
    const activeItems = ul.querySelectorAll(".active, .mm-active, .mm-show");
    activeItems.forEach((activeItem) => {
      activeItem.classList.remove("active", "mm-active", "mm-show");
    });

    // Add active classes to the current item and its parents
    item.classList.add("active");
    let parent = item.parentElement;

    while (parent) {
      // Debugging log
      if (parent.tagName === "LI") {
        console.log("Activating parent:", parent);
        parent.classList.add("mm-active");

        // Add mm-show to the child <ul> if it exists
        const childUl = parent.querySelector("ul.sub-menu");
        if (childUl) {
          childUl.classList.add("mm-show");
        }
      }
      parent = parent.parentElement;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t("Menu")}</li>

            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ri-dashboard-line"></i>
                <span className="badge rounded-pill bg-success float-end">
                  3
                </span>
                <span
                  className="ms-1"
                  onClick={(e) => this.handleMenuClick(e, e.target)}
                >
                  {this.props.t("Dashboard")}
                </span>
              </Link>
            </li>
            <li>
              <Link className="has-arrow waves-effect">
                <i className="ri-user-line"></i>
                <span className="ms-1">{this.props.t("User Management")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link
                    to="/users"
                    onClick={(e) => this.handleMenuClick(e, e.target)}
                  >
                    {this.props.t("Users")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/roles"
                    onClick={(e) => this.handleMenuClick(e, e.target)}
                  >
                    {this.props.t("Roles")}
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/branches" className="waves-effect">
                <i className="ri-building-line"></i>
                <span
                  className="ms-1"
                  onClick={(e) => this.handleMenuClick(e, e.target)}
                >
                  {this.props.t("Branches")}
                </span>
              </Link>
            </li>
            <li>
              <Link to="/owners" className="waves-effect">
                <i className="ri-account-box-line"></i>
                <span
                  className="ms-1"
                  onClick={(e) => this.handleMenuClick(e, e.target)}
                >
                  {this.props.t("Owners")}
                </span>
              </Link>
            </li>
            <li>
              <Link className="has-arrow waves-effect">
                <i className="  ri-car-fill "></i>
                <span className="ms-1">{this.props.t("Vehicles")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link
                    to="/vehicleModels"
                    onClick={(e) => this.handleMenuClick(e, e.target)}
                  >
                    {this.props.t("Vehicle Models")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vehicleMakes"
                    onClick={(e) => this.handleMenuClick(e, e.target)}
                  >
                    {this.props.t("Vehicle Manufacturers")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/vehiclesList"
                    onClick={(e) => this.handleMenuClick(e, e.target)}
                  >
                    {this.props.t("Registered Vehicles")}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  return { ...state.Layout };
};

export default withRouter(
  connect(mapStatetoProps, {
    changeLayout,
    changeSidebarTheme,
    changeSidebarType,
    changeLayoutWidth,
    changePreloader,
  })(withTranslation()(SidebarContent))
);
