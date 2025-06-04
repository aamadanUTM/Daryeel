import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";

import apiClient from "../../axiosInstance";

import showAlert from "../../components/Common/ShowAlert";

import Breadcrumbs from "../../components/Common/Breadcrumb";

const CreateRole = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Create Role Form", link: "#" },
  ]);
  const navigate = useNavigate();

  //form
  const [formData, setFormData] = useState({
    role_name: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleReset = () => {
    setFormData({
      role_name: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const response = await apiClient.post("/roles/createRole", formData);
    await showAlert({
      title: "Role Creation",
      text: response.data.message,
      icon: response.data.status,
      goBack: false,
      timer: 5000, // optional: change timer duration (ms)
    });
    if (response.data.status === "success") {
      handleReset();
    }
  };
  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Create User Form"
          breadcrumbItems={breadcrumbItems}
        />
        <form onSubmit={handleSubmit}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title d-flex justify-content-between align-items-center">
                    User Registration Form
                    <i
                      className="ri-arrow-left-line"
                      style={{ fontSize: "1.25rem", cursor: "pointer" }}
                      onClick={() => navigate(-1)} // Navigate back to the previous page
                    ></i>
                  </h4>

                  <hr className="bg-primary" />
                  <Row>
                    <Col lg="12" className="mt-3">
                      <Label className="form-label">Fullname</Label>
                      <Input
                        type="text"
                        id="role_name"
                        name="role_name"
                        placeholder="Enter Role Name"
                        value={formData.role_name}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                  <div className="row d-flex justify-content-end">
                    <div className="col-md-2 col-6">
                      <button
                        type="button"
                        className="btn btn-secondary mt-4 w-100"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    </div>
                    <div className="col-md-2 col-6">
                      <button
                        type="submit"
                        className="btn btn-success mt-4 w-100"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
};

export default CreateRole;
