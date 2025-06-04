import React, { useState, useEffect } from "react";
import {
  Label,
  Container,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import apiClient from "../../axiosInstance";
import showAlert from "../../components/Common/ShowAlert";
import TanstackTable from "../../components/Common/TanstackTable";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const VehicleModels = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Vehicle Models List", link: "#" },
  ]);

  const [data, setData] = useState([]);

  const [makes, setMakes] = useState([]);
  const makeOptions = [
    { label: "Select Makes", value: "" },
    ...makes.map((make) => ({ label: make.make_name, value: make.id })),
  ];
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
  const [modalCreate, setModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    model_name: "",
    model_code: "",
    make_id: "",
  });
  const fetchVehicleModels = async () => {
    try {
      const result = await apiClient.get("/vehicles/vehicle-models");
      const response = result.data;
      setData(response);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const result = await apiClient.get("/vehicles/vehicle-makes"); // Replace with your API URL
        const formattedMakes = result.data.map((make) => ({
          id: make.id,
          make_name: make.make_name,
        }));
        setMakes(formattedMakes); // Set branches as an array of objects with id and name
      } catch (err) {
        console.log(err);
      }
    };
    fetchVehicleModels();
    fetchMakes();
  }, []);

  const toggleCreateModal = () => {
    setFormData({
      model_name: "",
      model_code: "",
      make_id: "",
      modelId: null, // Reset modelId for new creation
    });
    console.log(formData);
    setModalCreate(!modalCreate);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   const handleRoleNameChange = (e) => setRoleName(e.target.value);

  const handleSaveModel = async (e) => {
    e.preventDefault();
    try {
      if (formData.modelId) {
        const id = formData.modelId;
        const response = await apiClient.put(
          `/vehicles/vehicle-models/${id}`,
          formData
        );
        await showAlert({
          title: "Vehicle Model Update!",
          text: response.data.message,
          icon: response.data.status,
          goBack: false,
          timer: 5000,
        });
        if (response.data.status === "success") {
          setModalCreate(false);
          setFormData({
            model_name: "",
            model_code: "",
            make_id: "",
            modelId: null, // Reset modelId for new creation
          });
          fetchVehicleModels();
        }
      } else {
        console.log(formData);
        const response = await apiClient.post(
          "vehicles/vehicle-models",
          formData
        );
        await showAlert({
          title: "Vehicle Model Creation!",
          text: response.data.message,
          icon: response.data.status,
          goBack: false,
          timer: 5000, // optional: change timer duration (ms)
        });
        if (response.data.status === "success") {
          setModalCreate(false);
          setFormData({
            model_name: "",
            model_code: "",
            make_id: "",
            modelId: null, // Reset modelId for new creation
          });
          fetchVehicleModels();
        }
      }

      // Optionally refresh roles list here
    } catch (err) {
      console.error("Error creating role:", err);
    }
  };

  const columns = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "model_name",
      header: "Model Name",
    },
    {
      accessorKey: "model_code",
      header: "Model Code",
    },
    {
      accessorKey: "make_name",
      header: "Make Name",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => {
              setFormData({
                model_name: row.original.model_name,
                model_code: row.original.model_code,
                make_id: row.original.make_id,
                modelId: row.original.id,
              });
              setModalCreate(true);
            }}
          >
            <i className="ri-file-edit-line"></i>
          </button>
        </>
      ),
    },
  ];
  return (
    <div className="page-content">
      <Container fluid>
        <div className="row">
          <div className="col-12">
            <Breadcrumbs
              title="Vehicle Models List"
              breadcrumbItems={breadcrumbItems}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Card>
              <CardBody>
                <div className="row">
                  <div className="col-12 text-end mb-2">
                    <button
                      className="btn btn-primary"
                      onClick={toggleCreateModal}
                    >
                      Create Car Model
                    </button>
                  </div>
                </div>
                <TanstackTable data={data} columns={columns} />
              </CardBody>
            </Card>
          </div>
        </div>
        <Modal
          isOpen={modalCreate}
          toggle={toggleCreateModal}
          centered={true}
          backdrop="static"
        >
          <form onSubmit={handleSaveModel}>
            <ModalHeader toggle={toggleCreateModal}>
              Create Vehicle Models
            </ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-12 mb-3">
                  <Label className="form-label">Model Name</Label>

                  <input
                    type="text"
                    className="form-control"
                    name="model_name"
                    placeholder="Model Name"
                    value={formData.model_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 mb-3">
                  <Label className="form-label">Model Code</Label>
                  <input
                    type="text"
                    name="model_code"
                    className="form-control"
                    placeholder="Model Code"
                    value={formData.model_code}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 mb-3">
                  <Label className="form-label">Select Manufacturer</Label>

                  <Select
                    id="make_id"
                    name="make_id"
                    value={makeOptions.find(
                      (option) => option.value === formData.make_id
                    )}
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        make_id: selectedOption ? selectedOption.value : "",
                      })
                    }
                    options={makeOptions}
                    styles={customStyles}
                    classNamePrefix="select2-selection form-control"
                    required
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-secondary" onClick={toggleCreateModal}>
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </ModalFooter>
          </form>
        </Modal>
      </Container>
    </div>
  );
};
export default VehicleModels;
