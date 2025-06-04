import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";

import placeHolder from "../../assets/images/users/place-holder.jpeg";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Employees = () => {
  const [breadcrumbItems] = useState([
    { title: "Deero", link: "/" },
    { title: "Employees Form", link: "#" },
  ]);
  const [image, setImage] = useState(null);
  const fileInputRef = React.useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    emp_file: "",
    emp_id: "",
    emp_name: "",
    emp_email: "",
    emp_phone: "",
    emp_gender: "",
    emp_dob: "",
    emp_hDate: "",
    emp_salary: "",
    emp_role: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData({
        ...formData,
        emp_file: file,
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const handleGender = (selectedOption) => {
    setFormData({
      ...formData,
      emp_gender: selectedOption ? selectedOption.value : "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  // useEffect(() => {
  //   // Function to fetch homes
  //   const fetchHomes = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/homes"); // Replace with your API URL
  //       setHomes(response.data); // Assuming response.data contains the homes array
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchHomes();
  // }, []);

  const handleReset = () => {
    setFormData({
      emp_file: "",
      emp_id: "",
      emp_name: "",
      emp_email: "",
      emp_phone: "",
      emp_gender: "",
      emp_dob: "",
      emp_hDate: "",
      emp_salary: "",
      emp_role: "",
    });
    setImage(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const form = e.target;
    // const formData = new FormData(form);
    // if (image) {
    //   const submitForm = await axios.post("/employee/registration", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    //   console.log(submitForm);
    // } else {
    //   alert("Please upload an image");
    // }
  };
  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Employees Form" breadcrumbItems={breadcrumbItems} />
        <form onSubmit={handleSubmit} ref={formRef}>
          <Row>
            <Col lg="3">
              <Card>
                <CardBody style={{ height: "405px" }}>
                  <h4 className="card-title">Employee Image</h4>
                  <hr className="bg-primary" />
                  <Row>
                    <Col lg="12" style={{ height: "260px" }}>
                      <img
                        src={image || placeHolder}
                        alt="user"
                        className="img-fluid"
                        style={{
                          objectFit: "contain",
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg="12">
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control d-none"
                        id="emp_file"
                        name="emp_file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                      />
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="btn btn-primary w-100"
                      >
                        Upload Photo
                      </button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg="9">
              <Card>
                <CardBody>
                  <h4 className="card-title">Employees Registration Form</h4>
                  <hr className="bg-primary" />
                  <Row>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Employee ID</Label>
                      <Input
                        type="text"
                        id="emp_id"
                        name="emp_id"
                        placeholder="Enter Employee ID"
                        value={formData.emp_id}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Employee Name</Label>
                      <Input
                        type="text"
                        id="emp_name"
                        name="emp_name"
                        placeholder="Enter Employee Name"
                        value={formData.emp_name}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Employee Email</Label>
                      <Input
                        type="text"
                        id="emp_email"
                        name="emp_email"
                        placeholder="Enter Employee Email"
                        value={formData.emp_email}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Employee Phone</Label>
                      <Input
                        type="text"
                        id="emp_phone"
                        name="emp_phone"
                        placeholder="Enter Employee Phone"
                        value={formData.emp_phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Employee Gender</Label>
                      <Select
                        id="emp_gender"
                        name="emp_gender"
                        value={genderOptions.find(
                          (option) => option.value === formData.emp_gender
                        )}
                        onChange={handleGender}
                        options={genderOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Employee DOB</Label>
                      <Input
                        type="date"
                        id="emp_dob"
                        name="emp_dob"
                        value={formData.emp_dob}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col lg="4">
                      <Label className="form-label">Hire Date</Label>
                      <Input
                        type="date"
                        id="emp_hDate"
                        name="emp_hDate"
                        value={formData.emp_hDate}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col lg="4">
                      <Label className="form-label">Employee Salary</Label>
                      <Input
                        type="number"
                        id="emp_salary"
                        name="emp_salary"
                        required
                        placeholder="Enter Salary as Digits"
                        value={formData.emp_salary}
                        onChange={handleInputChange}
                      />
                    </Col>
                    <Col lg="4">
                      <Label className="form-label">Employee Role</Label>
                      <Input
                        type="select"
                        className="form-control"
                        id="emp_role"
                        name="emp_role"
                        required
                        value={formData.emp_role}
                        onChange={handleInputChange}
                      >
                        <option value="">Select</option>
                        <option value="Manager">Manager</option>
                        <option value="Staff">Staff</option>
                      </Input>
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

export default Employees;
