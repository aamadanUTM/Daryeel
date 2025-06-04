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
import apiClient from "../../axiosInstance";
import showAlert from "../../components/Common/ShowAlert";
import TanstackTable from "../../components/Common/TanstackTable";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const VehicleMakes = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Vehicle Manufacturers  List", link: "#" },
  ]);

  const [data, setData] = useState([]);

  const [modalCreate, setModalCreate] = useState(false);
  const [formData, setFormData] = useState({
    make_name: "",
    make_code: "",
    make_id: null,
  });
  const fetchVehicleMakes = async () => {
    try {
      const result = await apiClient.get("/vehicles/vehicle-makes");
      const response = result.data;
      setData(response);
    } catch (err) {
      console.error("Error fetching manufacturers:", err);
    }
  };
  useEffect(() => {
    fetchVehicleMakes();
  }, []);

  const toggleCreateModal = () => {
    setFormData({
      make_name: "",
      make_code: "",
      make_id: null,
    });
    setModalCreate(!modalCreate);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveMake = async (e) => {
    e.preventDefault();
    try {
      if (formData.make_id) {
        const id = formData.make_id;
        const response = await apiClient.put(
          `/vehicles/vehicle-makes/${id}`,
          formData
        );
        await showAlert({
          title: "Vehicle Manufacturer Update!",
          text: response.data.message,
          icon: response.data.status,
          goBack: false,
          timer: 5000,
        });
        if (response.data.status === "success") {
          setModalCreate(false);
          setFormData({
            make_name: "",
            make_code: "",
            make_id: null,
          });
          fetchVehicleMakes();
        }
      } else {
        const response = await apiClient.post(
          "vehicles/vehicle-makes",
          formData
        );
        await showAlert({
          title: "Vehicle Manufacturer Creation!",
          text: response.data.message,
          icon: response.data.status,
          goBack: false,
          timer: 5000, // optional: change timer duration (ms)
        });
        if (response.data.status === "success") {
          setModalCreate(false);
          setFormData({
            make_name: "",
            make_code: "",
            make_id: null,
          });
          fetchVehicleMakes();
        }
      }
    } catch (err) {
      console.error("Error creating manufacturer:", err);
    }
  };

  const columns = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "make_name",
      header: "Manufacturer",
    },
    {
      accessorKey: "make_code",
      header: "Manufacturer Code",
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
                make_name: row.original.make_name,
                make_code: row.original.make_code,
                make_id: row.original.id,
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
              title="Vehicle Manufacturers  List"
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
                      Create Car Manufacturer
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
          <form onSubmit={handleSaveMake}>
            <ModalHeader toggle={toggleCreateModal}>
              Create Vehicle Manufacturers
            </ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-12 mb-3">
                  <Label className="form-label">Manufacturer Name</Label>

                  <input
                    type="text"
                    className="form-control"
                    name="make_name"
                    placeholder="Manufacturer Name"
                    value={formData.make_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-12 mb-3">
                  <Label className="form-label">Manufacturer Code</Label>
                  <input
                    type="text"
                    name="make_code"
                    className="form-control"
                    placeholder="Manufacturer Code"
                    value={formData.make_code}
                    onChange={handleInputChange}
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
export default VehicleMakes;
