//===================================================
// Date         : 26 Jan 2022
// Author       : I Gusti Kade Sugiantara
// Description  : User data grid page
//===================================================
// Revision History:
// Name             Date            Description
//
//===================================================
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import Spacer from "components/shared/commons/Spacer";
import TableList from "components/shared/tables";
import { getPage, deactivate, remove } from "services/user-services";
import { showAlert } from "redux/actions/alert";
import ConfirmationDialog from "components/shared/pop-up-dialog/ConfirmationDialog";

const UserGrid = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [isDescending, setIsDescending] = useState(0);
  const [orderBy, setOrderBy] = useState("name");
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const roles = ["Admin", "Teacher", "Student"];

  const headers = [
    { id: "name", label: "Name", isSortable: true },
    { id: "email", label: "Email", isSortable: true },
    { id: "is_active", label: "Status", isSortable: true },
    { id: "role", label: "Role", isSortable: false },
    { id: "option", label: "Options", isSortable: false },
  ];

  const loadUser = async () => {
    let params = {
      search: "",
      pageNumber: page,
      pageSize: pageSize,
      orderBy: orderBy,
      isDescending: isDescending,
    };

    const response = await getPage(params);
    if (response?.success) {
      let users = response.data.data.records.map((user) => ({
        ...user,
        role: roles[user.role],
        is_active: user.is_active ? "Active" : "Not Active",
      }));
      setUsers(users);
      updatePagination(response.data.data.pagination);
    }
  };

  const sortHandler = (value) => {
    if (orderBy === value) {
      isDescending ? setIsDescending(0) : setIsDescending(1);
    } else {
      setOrderBy(value);
      setIsDescending(0);
    }
  };

  const onPageChange = (newPage) => {
    setPage(newPage + 1);
  };

  const onRowPerPageChange = (event) => {
    setPageSize(parseInt(event.target.value));
  };

  const updatePagination = (pagination) => {
    if (pagination == null) return;

    setTotalItems(pagination.totalItems);
    setPage(pagination.currentPage);
    setPageSize(pagination.pageSize);
  };

  const onAddRecord = () => {
    history.push("/user-form");
  };

  const onUpdateRecord = async (id) => {
    const response = await deactivate(id);
    if (response?.success) {
      dispatch(showAlert("success", "Record update successfully!"));
      loadUser();
    }
  };

  const onDelete = (id) => {
    setDeleteId(id);
    setIsOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (deleteId == null) return;

    const response = await remove(deleteId);
    if (response?.success) {
      setDeleteId(null);
      setIsOpenDialog(false);
      dispatch(showAlert("success", "Record delete successfully!"));
      loadUser();
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [page, pageSize, orderBy, isDescending]);

  const tableHeader = {
    headers: headers,
    orderBy: orderBy,
    isDescending: isDescending,
    onSortChange: sortHandler,
  };

  const tableBody = {
    records: users,
    hiddenField: ["id"],
    onUpdate: (id) => onUpdateRecord(id),
    onDelete: (id) => onDelete(id),
  };

  const tableFooter = {
    totalItems: totalItems,
    pageSize: pageSize,
    page: page,
    onPageChange: onPageChange,
    onRowPerPageChange: onRowPerPageChange,
  };

  return (
    <>
      <Button variant="outlined" onClick={onAddRecord}>
        Add Record
      </Button>
      <Spacer height={10} />
      <TableList
        name="user"
        tableHeader={tableHeader}
        tableBody={tableBody}
        tableFooter={tableFooter}
      />
      <ConfirmationDialog
        isOpen={isOpenDialog}
        onCancel={() => {
          setDeleteId(null);
          setIsOpenDialog(false);
        }}
        onConfirm={confirmDelete}
        message="Do you want to delete this record?"
      />
    </>
  );
};

export default UserGrid;
