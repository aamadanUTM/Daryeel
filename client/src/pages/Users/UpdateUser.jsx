import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Label, Input } from "reactstrap";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

import apiClient from "../../axiosInstance";

import showAlert from "../../components/Common/ShowAlert";
import placeHolder from "../../assets/images/users/place-holder.jpeg";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UpdateUser = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Update User Form", link: "#" },
  ]);

  const navigate = useNavigate();
  const { id } = useParams();

  //image
  const [image, setImage] = useState(null);
  const fileInputRef = React.useRef(null);
  const formRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData({
        ...formData,
        usr_file: file,
      });
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const [formData, setFormData] = useState({
    usr_file: "",
    usr_fullName: "",
    usr_email: "",
    usr_phone: "",
    usr_address: "",
    usr_username: "",
    usr_gender: "",
    usr_role: "",
    usr_branch: "",
  });
  //Options
  const [branches, setBranches] = useState([]);
  const [roles, setRoles] = useState([]);
  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const branchOptions = [
    { label: "Select Branch", value: "" },
    ...branches.map((branch) => ({ label: branch.name, value: branch.id })),
  ];
  const roleOptions = [
    { label: "Select Role", value: "" },
    ...roles.map((role) => ({ label: role.name, value: role.id })),
  ];
  const handleGender = (selectedOption) => {
    setFormData({
      ...formData,
      usr_gender: selectedOption ? selectedOption.value : "",
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
    const fetchRoles = async () => {
      try {
        const result = await apiClient.get("/roles/getAllRoles"); // Replace with your API URL
        const formattedRoles = result.data.response.map((role) => ({
          id: role.id,
          name: role.name,
        }));
        setRoles(formattedRoles); // Set roles as an array of objects with id and name
      } catch (err) {
        console.log(err);
      }
    };
    const fetchUsers = async (userId) => {
      try {
        const result = await apiClient.get(`/users/getUser/${userId}`);
        const user = result.data.response;
        setFormData({
          usr_file: "",
          usr_fullName: user.full_name || "",
          usr_email: user.email || "",
          usr_phone: user.phone || "",
          usr_address: user.address || "",
          usr_username: user.username || "",
          usr_gender: user.gender || "",
          usr_role: user.role_id || "",
          usr_branch: user.branch_id || "",
        });
        setImage("/images/users/" + user.profile_photo || placeHolder);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBranches();
    fetchRoles();
    fetchUsers(id);
  }, [id]);

  const handleReset = () => {
    setFormData({
      usr_file: "",
      usr_fullName: "",
      usr_email: "",
      usr_phone: "",
      usr_address: "",
      usr_username: "",
      usr_gender: "",
      usr_role: "",
      usr_branch: "",
    });
    setImage(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    const response = await apiClient.put(`/users/updateUser/${id}`, formData);

    if (response.data.status === "success") {
      await showAlert({
        title: "User Updated!",
        text: response.data.message,
        icon: response.data.status,
        goBack: true,
        navigate, // from useNavigate
        timer: 3000, // optional: change timer duration (ms)
      });
    } else {
      await showAlert({
        title: "User Update",
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
          title="Update User Form"
          breadcrumbItems={breadcrumbItems}
        />
        <form onSubmit={handleSubmit} ref={formRef}>
          <Row>
            <Col lg="3">
              <Card>
                <CardBody style={{ height: "330px" }}>
                  <h4 className="card-title">User Photo</h4>
                  <hr className="bg-primary" />
                  <Row>
                    <Col lg="12" style={{ height: "190px" }}>
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
                        id="usr_file"
                        name="usr_file"
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
                  <h4 className="card-title d-flex justify-content-between align-items-center">
                    Update User Form
                    <i
                      className="ri-arrow-left-line"
                      style={{ fontSize: "1.25rem", cursor: "pointer" }}
                      onClick={() => navigate(-1)} // Navigate back to the previous page
                    ></i>
                  </h4>

                  <hr className="bg-primary" />
                  <Row>
                    <Col lg="3" className="mt-3">
                      <Label className="form-label">Fullname</Label>
                      <Input
                        type="text"
                        id="usr_fullName"
                        name="usr_fullName"
                        placeholder="Enter Full Name"
                        value={formData.usr_fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="3" className="mt-3">
                      <Label className="form-label">Email</Label>
                      <Input
                        type="email"
                        id="usr_email"
                        name="usr_email"
                        placeholder="Enter User Email"
                        value={formData.usr_email}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="3" className="mt-3">
                      <Label className="form-label">Phone</Label>
                      <Input
                        type="text"
                        id="usr_phone"
                        name="usr_phone"
                        placeholder="Enter User Phone Number"
                        value={formData.usr_phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="3" className="mt-3">
                      <Label className="form-label">Address</Label>
                      <Input
                        type="text "
                        id="usr_address"
                        name="usr_address"
                        placeholder="Enter User Address"
                        value={formData.usr_address}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="3" className="mt-3">
                      <Label className="form-label">Username</Label>
                      <Input
                        type="text"
                        id="usr_username"
                        name="usr_username"
                        placeholder="Enter Username"
                        value={formData.usr_username}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="3" className="mt-3">
                      <Label className="form-label">User Role</Label>
                      <Select
                        id="usr_role"
                        name="usr_role"
                        value={roleOptions.find(
                          (option) => option.value === formData.usr_role
                        )}
                        onChange={(selectedOption) =>
                          setFormData({
                            ...formData,
                            usr_role: selectedOption
                              ? selectedOption.value
                              : "",
                          })
                        }
                        options={roleOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        required
                      />
                    </Col>
                    <Col lg="3" className="mt-3">
                      <Label className="form-label">User Branch</Label>
                      <Select
                        id="usr_branch"
                        name="usr_branch"
                        value={branchOptions.find(
                          (option) => option.value === formData.usr_branch
                        )}
                        onChange={(selectedOption) =>
                          setFormData({
                            ...formData,
                            usr_branch: selectedOption
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
                    <Col lg="3" className="mt-3">
                      <Label className="form-label">User Gender</Label>
                      <Select
                        id="usr_gender"
                        name="usr_gender"
                        value={genderOptions.find(
                          (option) => option.value === formData.usr_gender
                        )}
                        onChange={handleGender}
                        options={genderOptions}
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

export default UpdateUser;
