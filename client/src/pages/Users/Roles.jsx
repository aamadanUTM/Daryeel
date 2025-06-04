import React, { useState, useEffect } from "react";
import {
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
import ToastrNotification from "../../components/Common/Notification";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Roles = () => {
  const [breadcrumbItems] = useState([
    { title: "Daryeel", link: "/" },
    { title: "Roles List", link: "#" },
  ]);

  const [data, setData] = useState([]);
  const [toast, setToast] = useState(null);

  const [modalCreate, setModalCreate] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [editRoleId, setEditRoleId] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const result = await apiClient.get("/roles/getAllRoles");
        const response = result.data.response;
        console.log(response);
        setData(response);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchRoles();
  }, [roleName]);
  const handleStatusToggle = async (roleID, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Suspended" : "Active";
      const updateStatus = currentStatus === "Active" ? 2 : 1;
      setData((prevData) =>
        prevData.map((role) =>
          role.id === roleID ? { ...role, status: newStatus } : role
        )
      );
      await apiClient.put(`/roles/updateRoleStatus/${roleID}`, {
        status: updateStatus,
      });
      if (newStatus === "Active") {
        setToast({
          message: "Role activated successfully",
          title: "Role Status",
          type: "success",
        });
      } else {
        setToast({
          message: "Role deactivated successfully",
          title: "Role Status",
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

  const toggleCreateModal = () => setModalCreate(!modalCreate);

  const handleRoleNameChange = (e) => setRoleName(e.target.value);

  const handleSaveRole = async () => {
    try {
      if (editRoleId) {
        const id = editRoleId;
        const response = await apiClient.put(`/roles/updateRole/${id}`, {
          role_name: roleName,
        });
        await showAlert({
          title: "Role Update!",
          text: response.data.message,
          icon: response.data.status,
          goBack: false,
          timer: 5000,
        });
        if (response.data.status === "success") {
          setRoleName("");
          setEditRoleId(null);
          setModalCreate(false);
        }
      } else {
        const response = await apiClient.post("roles/createRole", {
          role_name: roleName,
        });
        await showAlert({
          title: "Role Creation!",
          text: response.data.message,
          icon: response.data.status,
          goBack: false,
          timer: 5000, // optional: change timer duration (ms)
        });
        if (response.data.status === "success") {
          setModalCreate(false);
          setRoleName("");
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
      accessorKey: "name",
      header: "Role Name",
    },
    {
      accessorKey: "user_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const roleID = row.original.id;
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
                onChange={() => handleStatusToggle(roleID, status)}
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
        <>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => {
              setEditRoleId(row.original.id);
              setRoleName(row.original.name);
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
            <Breadcrumbs title="Roles List" breadcrumbItems={breadcrumbItems} />
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
                      Create Role
                    </button>
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
        <Modal
          isOpen={modalCreate}
          toggle={toggleCreateModal}
          centered={true}
          backdrop="static"
        >
          <ModalHeader toggle={toggleCreateModal}>Create Role</ModalHeader>
          <ModalBody>
            <input
              type="text"
              className="form-control"
              placeholder="Role Name"
              value={roleName}
              onChange={handleRoleNameChange}
            />
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-secondary" onClick={toggleCreateModal}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSaveRole}
              disabled={!roleName.trim()}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};
export default Roles;
