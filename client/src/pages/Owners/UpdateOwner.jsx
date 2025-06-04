import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Label, Input } from "reactstrap";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

import apiClient from "../../axiosInstance";

import showAlert from "../../components/Common/ShowAlert";

import Breadcrumbs from "../../components/Common/Breadcrumb";

const UpdateOwner = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Update Owner Form", link: "#" },
  ]);
  const navigate = useNavigate();
  const { id } = useParams();

  //options
  const [branches, setBranches] = useState([]);
  const [identification, setIdentification] = useState([]);
  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const branchOptions = [
    { label: "Select Branch", value: "" },
    ...branches.map((branch) => ({ label: branch.name, value: branch.id })),
  ];

  const identificationOptions = [
    { label: "Select Identification Type", value: "" },
    ...identification.map((identification) => ({
      label: identification.name,
      value: identification.id,
    })),
  ];
  const handleGender = (selectedOption) => {
    setFormData({
      ...formData,
      own_gender: selectedOption ? selectedOption.value : "",
    });
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff" // Primary color for selected option
        : state.isFocused
        ? "#f0f0f0" // Light grey on hover
        : "white",
      color: state.isSelected ? "white" : "black", // White text for selected, black for others
    }),
  };
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const result = await apiClient.get("/branches/getbranches"); // Replace with your API URL
        const formattedBranches = result.data.response.map((branch) => ({
          id: branch.id,
          name: branch.name,
        }));
        setBranches(formattedBranches); // Set branches as an array of objects with id and name
      } catch (err) {
        console.log(err);
      }
    };
    const fetchIdentification = async () => {
      try {
        const result = await apiClient.get("/identification/getIdentificaton"); // Replace with your API URL
        const formattedIdentifications = result.data.response.map(
          (identification) => ({
            id: identification.id,
            name: identification.name,
          })
        );
        setIdentification(formattedIdentifications);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchOwners = async (ownerID) => {
      try {
        const result = await apiClient.get(`/owners/getOwnerById/${ownerID}`);
        const owner = result.data.response;
        setFormData({
          own_fullName: owner.full_name || "",
          own_email: owner.email || "",
          own_phone: owner.phone_number || "",
          own_address: owner.address || "",
          own_gender: owner.gender || "",
          own_branch: owner.branch_id || "",
          own_dob: owner.date_of_birth ? owner.date_of_birth.split("T")[0] : "",
          own_identification: owner.identification_type_id || "",
          own_identification_number: owner.identification_number || "",
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchBranches();
    fetchIdentification();
    fetchOwners(id);
  }, [id]);

  //form
  const [formData, setFormData] = useState({
    own_fullName: "",
    own_email: "",
    own_phone: "",
    own_address: "",
    own_gender: "",
    own_branch: "",
    own_dob: "",
    own_identification: "",
    own_identification_number: "",
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
      own_fullName: "",
      own_email: "",
      own_phone: "",
      own_address: "",
      own_username: "",
      own_password: "",
      own_gender: "",
      own_branch: "",
      own_dob: "",
      own_identification: "",
      own_identification_number: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiClient.put(`/owners/updateOwner/${id}`, formData);

    if (response.data.status === "success") {
      await showAlert({
        title: "Owner Updated!",
        text: response.data.message,
        icon: response.data.status,
        goBack: true,
        navigate, // from useNavigate
        timer: 3000, // optional: change timer duration (ms)
      });
    } else {
      await showAlert({
        title: "Owner Update",
        text: response.data.message,
        icon: response.data.status,
        goBack: false,
        timer: 3000, // optional: change timer duration (ms)
      });
    }
  };
  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Update Owner Form"
          breadcrumbItems={breadcrumbItems}
        />
        <form onSubmit={handleSubmit}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title d-flex justify-content-between align-items-center">
                    Owner Update Form
                    <i
                      className="ri-arrow-left-line"
                      style={{ fontSize: "1.25rem", cursor: "pointer" }}
                      onClick={() => navigate(-1)} // Navigate back to the previous page
                    ></i>
                  </h4>

                  <hr className="bg-primary" />
                  <Row>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Fullname</Label>
                      <Input
                        type="text"
                        id="own_fullName"
                        name="own_fullName"
                        placeholder="Enter Full Name"
                        value={formData.own_fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Email</Label>
                      <Input
                        type="email"
                        id="own_email"
                        name="own_email"
                        placeholder="Enter User Email"
                        value={formData.own_email}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Phone</Label>
                      <Input
                        type="text"
                        id="own_phone"
                        name="own_phone"
                        placeholder="Enter User Phone Number"
                        value={formData.own_phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Address</Label>
                      <Input
                        type="text "
                        id="own_address"
                        name="own_address"
                        placeholder="Enter User Address"
                        value={formData.own_address}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">DOB</Label>
                      <Input
                        type="date"
                        id="own_dob"
                        name="own_dob"
                        placeholder="Enter Date of Birth"
                        value={formData.own_dob}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">User Gender</Label>
                      <Select
                        id="own_gender"
                        name="own_gender"
                        value={genderOptions.find(
                          (option) => option.value === formData.own_gender
                        )}
                        onChange={handleGender}
                        options={genderOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Identification Type</Label>
                      <Select
                        id="own_identification"
                        name="own_identification"
                        value={identificationOptions.find(
                          (option) =>
                            option.value === formData.own_identification
                        )}
                        onChange={(selectedOption) =>
                          setFormData({
                            ...formData,
                            own_identification: selectedOption
                              ? selectedOption.value
                              : "",
                          })
                        }
                        options={identificationOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">
                        Identification Number
                      </Label>
                      <Input
                        type="text "
                        id="own_identification_number"
                        name="own_identification_number"
                        placeholder="Enter Identification Number"
                        value={formData.own_identification_number}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">User Branch</Label>
                      <Select
                        id="own_branch"
                        name="own_branch"
                        value={branchOptions.find(
                          (option) => option.value === formData.own_branch
                        )}
                        onChange={(selectedOption) =>
                          setFormData({
                            ...formData,
                            own_branch: selectedOption
                              ? selectedOption.value
                              : "",
                          })
                        }
                        options={branchOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
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

export default UpdateOwner;
