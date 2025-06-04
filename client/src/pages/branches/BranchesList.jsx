import React, { useState, useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import apiClient from "../../axiosInstance";
import TanstackTable from "../../components/Common/TanstackTable";
import ToastrNotification from "../../components/Common/Notification";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const BranchesList = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Branches List", link: "#" },
  ]);

  const [data, setData] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await apiClient.get("/branches/getbranches");
        const response = result.data.response;
        setData(response);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);
  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
      const updateStatus = currentStatus === "Active" ? 2 : 1;
      setData((prevData) =>
        prevData.map((user) =>
          user.id === userId ? { ...user, user_status: newStatus } : user
        )
      );
      const response = await apiClient.put(`/users/updateStatus/${userId}`, {
        status: updateStatus,
      });
      console.log(response.data);
      if (newStatus === "Active") {
        setToast({
          message: "User activated successfully",
          title: "User Status",
          type: "success",
        });
      } else {
        setToast({
          message: "User suspended successfully",
          title: "User Status",
          type: "error",
        });
      }
      setTimeout(() => {
        setToast(null);
      }, 3000);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const columns = [
    {
      id: "index",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Branch Name",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.is_active;
        const userId = row.original.id;
        return (
          <div className="d-flex align-items-center gap-2">
            <div
              className={`badge bg-${status === 1 ? "success" : "secondary"}`}
            ></div>
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={status === 1}
                onChange={() => handleStatusToggle(userId, status)}
              />
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Link
          to={`/users/${row.original.id}`}
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
        <div className="row">
          <div className="col-12">
            <Breadcrumbs
              title="Branches List"
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
                    <Link to="/createUser">
                      <button className="btn btn-primary">Create Branch</button>
                    </Link>
                  </div>
                </div>
                <TanstackTable data={data} columns={columns} />
                {toast && (
                  <ToastrNotification
                    message={toast.message}
                    title={toast.title}
                    type={toast.type}
                  />
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BranchesList;
