import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Label, Input } from "reactstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import apiClient from "../../axiosInstance";
import showAlert from "../../components/Common/ShowAlert";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import countryOptions from "../../utilities/CountrySelectOptions";

const transmissionOptions = [
  { label: "Select Transmission", value: "" },
  { label: "Manual", value: "Manual" },
  { label: "Automatic", value: "Automatic" },
  { label: "CVT", value: "CVT" },
  { label: "Semi-Automatic", value: "Semi-Automatic" },
  { label: "Dual-Clutch", value: "Dual-Clutch" },
  { label: "AMT", value: "AMT" },
  { label: "Tiptronic", value: "Tiptronic" },
  { label: "Direct-Drive", value: "Direct-Drive" },
  { label: "EVT", value: "EVT" },
];

const colorOptions = [
  { label: "Select Color", value: "" },
  { label: "White", value: "White" },
  { label: "Silver", value: "Silver" },
  { label: "Black", value: "Black" },
  { label: "Gray", value: "Gray" },
  { label: "Blue", value: "Blue" },
  { label: "Beige", value: "Beige" },
  { label: "Green", value: "Green" },
  { label: "Red", value: "Red" },
  { label: "Gold", value: "Gold" },
  { label: "Brown", value: "Brown" },
  { label: "Other", value: "Other" },
];

const bodyTypeOptions = [
  { label: "Select Body Type", value: "" },
  { label: "Sedan", value: "Sedan" },
  { label: "Hatchback", value: "Hatchback" },
  { label: "SUV", value: "SUV" },
  { label: "Pickup", value: "Pickup" },
  { label: "Van / Minivan", value: "Van / Minivan" },
  { label: "Crossover", value: "Crossover" },
  { label: "Bus / Minibus", value: "Bus / Minibus" },
  { label: "Truck / Lorry", value: "Truck / Lorry" },
  { label: "Wagon", value: "Wagon" },
  { label: "Chassis Cab", value: "Chassis Cab" },
  { label: "Bajaj", value: "Bajaj" },
  { label: "Other", value: "Other" },
];

const fuelTypeOptions = [
  { label: "Select Fuel Type", value: "" },
  { label: "Petrol", value: "Petrol" },
  { label: "Diesel", value: "Diesel" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Plug-in Hybrid", value: "Plug-in Hybrid" },
  { label: "Electric", value: "Electric" },
  { label: "CNG", value: "CNG" },
  { label: "LPG", value: "LPG" },
  { label: "Other", value: "Other" },
];

const conditionOptions = [
  { label: "Select Condition", value: "" },
  { label: "New", value: "New" },
  { label: "Used", value: "Used" },
  { label: "Damaged", value: "Damaged" },
];

const CreateVehicle = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Register Vehicle", link: "#" },
  ]);
  const navigate = useNavigate();

  // Options state
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);

  // Fetch manufacturers and models
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const res = await apiClient.get("/vehicles/vehicle-makes");
        setManufacturers(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchModels = async () => {
      try {
        const res = await apiClient.get("/vehicles/vehicle-models");
        setModels(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchManufacturers();
    fetchModels();
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    vin: "",
    engine_number: "",
    license_plate: "",
    manufacturer_id: "",
    model_id: "",
    year_of_manufacture: "",
    color: "",
    fuel_type: "",
    transmission_type: "",
    body_type: "",
    engine_size_cc: "",
    imported_from: "",
    vehicle_condition: "",
  });

  // Numeric input validation handler
  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Update filtered models when manufacturer changes
  useEffect(() => {
    if (formData.manufacturer_id) {
      setFilteredModels(
        models.filter((m) => m.make_id === formData.manufacturer_id)
      );
    } else {
      setFilteredModels([]);
    }
    setFormData((prev) => ({ ...prev, model_id: "" }));
  }, [formData.manufacturer_id, models]);

  // Select options
  const manufacturerOptions = [
    { label: "Select Manufacturer", value: "" },
    ...manufacturers.map((m) => ({ label: m.make_name, value: m.id })),
  ];
  const modelOptions = [
    { label: "Select Model", value: "" },
    ...filteredModels.map((m) => ({ label: m.model_name, value: m.id })),
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#007bff"
        : state.isFocused
        ? "#f0f0f0"
        : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (selected, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selected ? selected.value : "",
    }));
  };
  const handleReset = () => {
    setFormData({
      vin: "",
      engine_number: "",
      license_plate: "",
      manufacturer_id: "",
      model_id: "",
      year_of_manufacture: "",
      color: "",
      fuel_type: "",
      transmission_type: "",
      body_type: "",
      engine_size_cc: "",
      imported_from: "",
      vehicle_condition: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiClient.post("/vehicles/createVehicle", formData);
    await showAlert({
      title: "Vehicle Registration!",
      text: response.data.message,
      icon: response.data.status,
      goBack: false,
      timer: 5000,
    });
    if (response.data.status === "success") {
      handleReset();
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="Register Vehicle"
          breadcrumbItems={breadcrumbItems}
        />
        <form onSubmit={handleSubmit}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title d-flex justify-content-between align-items-center">
                    Vehicle Registration Form
                    <i
                      className="ri-arrow-left-line"
                      style={{ fontSize: "1.25rem", cursor: "pointer" }}
                      onClick={() => navigate(-1)}
                    ></i>
                  </h4>
                  <hr className="bg-primary" />
                  <Row>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">VIN</Label>
                      <Input
                        type="text"
                        id="vin"
                        name="vin"
                        placeholder="Enter VIN"
                        value={formData.vin}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Engine Number</Label>
                      <Input
                        type="text"
                        id="engine_number"
                        name="engine_number"
                        placeholder="Enter Engine Number"
                        value={formData.engine_number}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">License Plate</Label>
                      <Input
                        type="text"
                        id="license_plate"
                        name="license_plate"
                        placeholder="Enter License Plate"
                        value={formData.license_plate}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Manufacturer</Label>
                      <Select
                        id="manufacturer_id"
                        name="manufacturer_id"
                        value={manufacturerOptions.find(
                          (option) => option.value === formData.manufacturer_id
                        )}
                        onChange={(selected) =>
                          handleSelectChange(selected, "manufacturer_id")
                        }
                        options={manufacturerOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Model</Label>
                      <Select
                        id="model_id"
                        name="model_id"
                        value={modelOptions.find(
                          (option) => option.value === formData.model_id
                        )}
                        onChange={(selected) =>
                          handleSelectChange(selected, "model_id")
                        }
                        options={modelOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        required
                        isDisabled={!formData.manufacturer_id}
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Year of Manufacture</Label>
                      <Input
                        type="text"
                        id="year_of_manufacture"
                        name="year_of_manufacture"
                        placeholder="e.g. 2020"
                        value={formData.year_of_manufacture}
                        onChange={handleNumberInput}
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                        maxLength={4}
                        inputMode="numeric"
                        pattern="\d*"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Color</Label>
                      <Select
                        id="color"
                        name="color"
                        value={colorOptions.find(
                          (option) => option.value === formData.color
                        )}
                        onChange={(selected) =>
                          handleSelectChange(selected, "color")
                        }
                        options={colorOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Fuel Type</Label>
                      <Select
                        id="fuel_type"
                        name="fuel_type"
                        value={fuelTypeOptions.find(
                          (option) => option.value === formData.fuel_type
                        )}
                        onChange={(selected) =>
                          handleSelectChange(selected, "fuel_type")
                        }
                        options={fuelTypeOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Transmission Type</Label>
                      <Select
                        id="transmission_type"
                        name="transmission_type"
                        value={transmissionOptions.find(
                          (option) =>
                            option.value === formData.transmission_type
                        )}
                        onChange={(selected) =>
                          handleSelectChange(selected, "transmission_type")
                        }
                        options={transmissionOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Body Type</Label>
                      <Select
                        id="body_type"
                        name="body_type"
                        value={bodyTypeOptions.find(
                          (option) => option.value === formData.body_type
                        )}
                        onChange={(selected) =>
                          handleSelectChange(selected, "body_type")
                        }
                        options={bodyTypeOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        required
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Engine Size (cc)</Label>
                      <Input
                        type="text"
                        id="engine_size_cc"
                        name="engine_size_cc"
                        placeholder="Enter Engine Size (cc)"
                        value={formData.engine_size_cc}
                        onChange={handleNumberInput}
                        min="0"
                        required
                        inputMode="numeric"
                        pattern="\d*"
                      />
                    </Col>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Imported From</Label>
                      <Select
                        id="imported_from"
                        name="imported_from"
                        value={countryOptions.find(
                          (option) => option.value === formData.imported_from
                        )}
                        onChange={(selected) =>
                          handleSelectChange(selected, "imported_from")
                        }
                        options={countryOptions}
                        styles={customStyles}
                        classNamePrefix="select2-selection form-control"
                        isSearchable
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" className="mt-3">
                      <Label className="form-label">Vehicle Condition</Label>
                      <Select
                        id="vehicle_condition"
                        name="vehicle_condition"
                        value={conditionOptions.find(
                          (option) =>
                            option.value === formData.vehicle_condition
                        )}
                        onChange={(selected) =>
                          handleSelectChange(selected, "vehicle_condition")
                        }
                        options={conditionOptions}
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

export default CreateVehicle;
