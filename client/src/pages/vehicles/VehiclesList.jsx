import React, { useState, useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import apiClient from "../../axiosInstance";
import TanstackTable from "../../components/Common/TanstackTable";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const VehiclesList = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Vehicles List", link: "#" },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const result = await apiClient.get("/vehicles/getvehicles");
        const response = result.data;
        setData(response);
        console.log("Vehicles data:", response);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchVehicles();
  }, []);

  const columns = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "license_plate",
      header: "License No",
    },
    {
      accessorKey: "vin",
      header: "VIN No",
    },
    {
      header: "Engine",
      cell: ({ row }) => (
        <>
          {row.original.engine_number}{" "}
          {row.original.engine_size_cc
            ? `(${row.original.engine_size_cc} cc)`
            : ""}
        </>
      ),
    },

    {
      accessorKey: "make_name",
      header: "Manufacturer",
    },
    {
      header: "Model",
      cell: ({ row }) => (
        <>
          {row.original.model_name}
          {row.original.color ? ` - ${row.original.color}` : ""}
          {row.original.year_of_manufacture
            ? `(${row.original.year_of_manufacture})`
            : ""}
        </>
      ),
    },
    {
      accessorKey: "fuel_type",
      header: "Fuel Type",
    },
    {
      accessorKey: "body_type",
      header: "Body Type",
    },
    {
      accessorKey: "imported_from",
      header: "Imported From",
    },
    {
      accessorKey: "vehicle_condition",
      header: "Vehicle Condition",
    },
    {
      id: "edit",
      header: "Edit",
      cell: ({ row }) => (
        <>
          <Link
            to={`/users/${row.original.id}`}
            className="btn btn-sm btn-primary"
          >
            <i className="ri-file-edit-line"></i>
          </Link>
        </>
      ),
    },
  ];
  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Vehicles List" breadcrumbItems={breadcrumbItems} />
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-12 text-end mb-2">
                <Link to="/createVehicle">
                  <button className="btn btn-primary">Create Vehicle</button>
                </Link>
              </div>
            </div>
            <TanstackTable data={data} columns={columns} />
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default VehiclesList;
