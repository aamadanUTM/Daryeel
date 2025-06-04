import React, { useState, useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { format, parseISO, differenceInYears } from "date-fns";

import apiClient from "../../axiosInstance";
import TanstackTable from "../../components/Common/TanstackTable";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const OwnersList = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Owners List", link: "#" },
  ]);

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await apiClient.get("/owners/getAllowners");
        const response = result.data.response;
        setData(response);
        console.log(response);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "full_name",
      header: "Full Name",
    },
    {
      accessorKey: "date_of_birth",
      header: "DOB / Age",
      cell: ({ getValue }) => {
        const dobISO = getValue(); // e.g., "1993-04-17T21:00:00.000Z"
        const dob = parseISO(dobISO);
        const formattedDOB = format(dob, "yyyy-MM-dd");
        const age = differenceInYears(new Date(), dob);
        return `${formattedDOB} (${age} yrs)`;
      },
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone_number",
      header: "Phone",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "identification_type",
      header: "ID Type",
    },
    {
      accessorKey: "identification_number",
      header: "ID Number",
    },
    {
      accessorKey: "branch_name",
      header: "Branch",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Link
          to={`/owners/${row.original.id}`}
          className="btn btn-sm btn-primary"
        >
          <i className="ri-file-edit-line"></i>
        </Link>
      ),
    },
  ];
  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Users List" breadcrumbItems={breadcrumbItems} />
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-12 text-end mb-2">
                <Link to="/createOwner">
                  <button className="btn btn-primary">Create Owner</button>
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

export default OwnersList;
