import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

// Import User Authentication
import { validateToken } from "./utilities/userAuthentication";
// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes";

// layouts
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

//animate.css
import "animate.css";
// Import scss
import "./assets/scss/theme.scss";

//Fake backend
import AppRoute from "./routes/route";

// Import audio
import notificationSound from "./assets/notification.mp3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getLayout = this.getLayout.bind(this);
    this.audio = new Audio(notificationSound); // Replace with the actual path to your sound file
  }

  componentDidMount() {
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  }

  componentWillUnmount() {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  }

  handleVisibilityChange = () => {
    const currentPath = window.location.pathname;
    if (document.visibilityState === "visible" && currentPath !== "/login") {
      const token = JSON.parse(localStorage.getItem("authUser"))?.token;
      const isValidToken = validateToken(token);
      if (isValidToken === false) {
        localStorage.removeItem("authUser");
        window.location.href = "/login";
      }
      // this.audio
      //   .play()
      //   .catch((error) => console.error("Audio play failed", error));
    }
  };
  /**
   * Returns the layout
   */
  getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (this.props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  render() {
    const Layout = this.getLayout();

    return (
      <React.Fragment>
        {/* <Router>
					<Routes>
						{publicRoutes.map((route, idx) => (
							<AppRoute
								path={route.path}
								layout={NonAuthLayout}
								component={route.component}
								key={idx}
								isAuthProtected={false}
							/>
						))}

						{authProtectedRoutes.map((route, idx) => (
							<AppRoute
								path={route.path}
								layout={Layout}
								component={route.component}
								key={idx}
								isAuthProtected={true}
							/>
						))}
					</Routes>
				</Router> */}

        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
              key={idx}
              exact={true}
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AppRoute>
                  <Layout>{route.component}</Layout>
                </AppRoute>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Routes>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
