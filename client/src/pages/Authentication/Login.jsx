import React, { Component } from "react";
import { Row, Col, Button, Alert, Container, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import AlertComponent from "../../components/Common/alert";
// import { Link } from "react-router-dom";

// actions
import { checkLogin, apiError } from "../../store/actions";

// import images
import logo from "../../assets/images/logo.png";
import withRouter from "../../components/Common/withRouter";

class Login extends Component {
  componentDidMount() {
    this.props.apiError("");
    document.body.classList.add("auth-body-bg");
  }

  componentWillUnmount() {
    document.body.classList.remove("auth-body-bg");
  }

  render() {
    return <LoginForm {...this.props} />;
  }
}

function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    props.checkLogin(values, props.router.navigate);
  };

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col lg={8}>
              <div className="authentication-bg">
                {/* <div className="bg-overlay"></div> */}
              </div>
            </Col>
            <Col lg={4}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div className="w-100">
                  <Row className="justify-content-center">
                    <Col lg={10}>
                      <div className="mb-0 pb-0">
                        <div className="text-center">
                          <img
                            src={logo}
                            alt=""
                            // height="150"
                            className="auth-logo logo-dark mx-auto img-fluid"
                            style={{ maxHeight: "150px" }}
                          />
                          <h4 className="font-size-18 mt-4">Welcome Back!</h4>
                          <p className="text-muted">
                            Sign in to continue to Daryeel.
                          </p>
                        </div>
                        {props.loginError && (
                          <AlertComponent
                            color="danger"
                            message={props.loginError}
                          />
                          // <Alert color="danger">{props.loginError}</Alert>
                        )}
                        <div className="p-2 mt-5">
                          <form
                            className="form-horizontal"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="username">Username</Label>
                              <input
                                {...register("username", {
                                  required: "Username is required",
                                })}
                                name="username"
                                className={`form-control ${
                                  errors.username ? "is-invalid" : ""
                                }`}
                                id="username"
                                placeholder="Enter username"
                              />
                              {errors.username && (
                                <div className="invalid-feedback">
                                  {errors.username.message}
                                </div>
                              )}
                            </div>
                            <div className="auth-form-group-custom mb-4">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="password">Password</Label>
                              <input
                                type="password"
                                {...register("password", {
                                  required: "Password is required",
                                })}
                                name="password"
                                className={`form-control ${
                                  errors.password ? "is-invalid" : ""
                                }`}
                                id="password"
                                placeholder="Enter password"
                              />
                              {errors.password && (
                                <div className="invalid-feedback">
                                  {errors.password.message}
                                </div>
                              )}
                            </div>
                            <div className="mt-4 text-center">
                              <Button
                                color="primary"
                                className="col-12 w-md waves-effect waves-light"
                                type="submit"
                              >
                                Log In
                              </Button>
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p>
                            © 2025. Crafted with{" "}
                            <i className="mdi mdi-heart text-danger"></i> by
                            Raadsan Tech
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => {
  const { loginError } = state.Login;
  return { loginError };
};

export default withRouter(
  connect(mapStatetoProps, { checkLogin, apiError })(Login)
);
