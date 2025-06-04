import React, { useState, useEffect } from "react";
import { Container, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import apiClient from "../../axiosInstance";
import TanstackTable from "../../components/Common/TanstackTable";
import ToastrNotification from "../../components/Common/Notification";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UsersList = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Users List", link: "#" },
  ]);

  const [data, setData] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await apiClient.get("/users/getAllUsers");
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
      await apiClient.put(`/users/updateStatus/${userId}`, {
        status: updateStatus,
      });
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
      accessorKey: "full_name",
      header: "Full Name",
      cell: ({ row }) => {
        const fullName = row.original.full_name;
        const photoName = row.original.profile_photo;
        const photoUrl = `/images/users/${photoName}`;
        return (
          <div className="d-flex align-items-center gap-2">
            <img
              src={photoUrl}
              alt="Profile"
              className="img-thumbnail rounded-circle avatar-sm"
            />
            <span>{fullName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "username",
      header: "Username",
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
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "branch_name",
      header: "Branch",
    },
    {
      accessorKey: "role_name",
      header: "Role",
    },
    {
      accessorKey: "user_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.user_status;
        const userId = row.original.id;
        return (
          <div className="d-flex align-items-center gap-2">
            <div
              className={`badge bg-${
                status === "Active" ? "success" : "secondary"
              }`}
            ></div>
            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={status === "Active"}
                onChange={() => handleStatusToggle(userId, status)}
              />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "last_login",
      header: "Last Login",
      cell: ({ getValue }) => {
        const date = getValue();
        return date ? (
          formatDistanceToNow(new Date(date), { addSuffix: true })
        ) : (
          <span className="text-muted">Never</span>
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
        <Breadcrumbs title="Users List" breadcrumbItems={breadcrumbItems} />
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-12 text-end mb-2">
                <Link to="/createUser">
                  <button className="btn btn-primary">Create User</button>
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
      </Container>
    </div>
  );
};

export default UsersList;
