import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Switch,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import _ from "lodash";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const baseURL = process.env.REACT_APP_BASE_URL;

function Account() {
  console.log("ROWS:", rows);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const [modalFormValue, setModalFormValue] = useState({
    accountType: "",
    accountNumber: "",
    accountBalance: "",
    bankName: "",
  });
  const [modalValidation, setModalValidation] = useState({
    accountType: "",
    accountNumber: "",
    accountBalance: "",
    bankName: "",
  });
  const disabledCondition =
    Object.values(modalFormValue).some((ele) => ele.length === 0) ||
    Object.values(modalValidation).some((ele) => ele);
  const checkValidation = (name, value) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    switch (name) {
      case "accountType":
        if (value === "") {
          setModalValidation({
            ...modalValidation,
            [name]: "Please select account type",
          });
        } else {
          setModalValidation({
            ...modalValidation,
            [name]: "",
          });
        }
        break;
      case "accountNumber":
        if (value === "") {
          setModalValidation({
            ...modalValidation,
            [name]: "Please enter account number",
          });
        }
        if (value.length < 10) {
          setModalValidation({
            ...modalValidation,
            [name]: "Account number should be 10 digits",
          });
        } else {
          setModalValidation({
            ...modalValidation,
            [name]: "",
          });
        }
        break;
      case "accountBalance":
        if (value === "") {
          setModalValidation({
            ...modalValidation,
            [name]: "Please enter account balance",
          });
        }
        if (value.length < 4) {
          setModalValidation({
            ...modalValidation,
            [name]: "Account balance should be 4 digits",
          });
        } else {
          setModalValidation({
            ...modalValidation,
            [name]: "",
          });
        }
        break;
      case "bankName":
        if (value === "") {
          setModalValidation({
            ...modalValidation,
            [name]: "Please enter bank name",
          });
        }
        if (value.length < 4) {
          setModalValidation({
            ...modalValidation,
            [name]: "Bank name should be 4 characters",
          });
        }
        if (value.length > 20) {
          setModalValidation({
            ...modalValidation,
            [name]: "Bank name should be less than 20 characters",
          });
        }
        if (!value.match(/^[a-zA-Z]+$/)) {
          setModalValidation({
            ...modalValidation,
            [name]: "Bank name should be only alphabets",
          });
        } else {
          setModalValidation({
            ...modalValidation,
            [name]: "",
          });
        }
        break;
      default:
        break;
    }
  };
  // const handleMaxWidthChange = (event) => {
  //   setMaxWidth(
  //     // @ts-expect-error autofill of arbitrary value is not handled.
  //     event.target.value
  //   );
  // };
  // const handleFullWidthChange = (event) => {
  //   setFullWidth(event.target.checked);
  // };
  const handleValueChange = (event) => {
    setModalFormValue({ ...modalFormValue, [event.target.name]: event.target.value });
    checkValidation(event.target.name, event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccountDetails = async () => {
    try {
      const { status } = await axios.post(`${baseURL}/accounts`, modalFormValue);
      if (status === 201) {
        console.log("success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("IT IS CALLED...");
    async function initialCall() {
      try {
        const { status, data } = await axios.get(`${baseURL}/accounts`);
        if (status === 201) {
          console.log("success");
          let firstData = data[0];
          let KeyCollection = Object.keys(firstData).forEach((key) => key);
          let colDefs = KeyCollection.map((key, index) => {
            return <TableCell key={index * Math.random()}>{_.startCase(key)}</TableCell>;
          });
          setColDefs(colDefs ?? []);
          setRowData(data ?? []);
        }
      } catch (err) {
        console.log(err);
      }
    }
    initialCall();
  }, []);

  return (
    <div className="mt-2">
      {/* <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={true}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Account Details Added Successfully
        </Alert>
      </Snackbar> */}
      {/* <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={true}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="danger" sx={{ width: "100%" }}>
          Something went wrong while adding account details
        </Alert>
      </Snackbar> */}
      <Dialog
        PaperProps={{
          sx: {
            minHeight: "50vh",
          },
        }}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}>
        <DialogTitle>Add Account</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText> */}
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              // width: "fit-content",
              width: "50%",
            }}>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="accountType">Select Type</InputLabel>
              <Select
                error={modalValidation.accountType !== ""}
                helperText={modalValidation.accountType}
                autoFocus
                value={modalFormValue.accountType}
                onChange={handleValueChange}
                label="accountType"
                // defaultValue="Credit"
                inputProps={{
                  name: "accountType",
                  id: "accountType",
                }}>
                {/* <MenuItem value={false}>false</MenuItem> */}
                <MenuItem value="Credit">Credit</MenuItem>
                <MenuItem value="Debit">Debit</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <TextField
                error={modalValidation.accountNumber !== ""}
                helperText={modalValidation.accountNumber}
                autoFocus
                margin="dense"
                id="accountNumber"
                name="accountNumber"
                label="Account Number"
                type="text"
                fullWidth
                value={modalFormValue.accountNumber}
                onChange={handleValueChange}
              />
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <TextField
                error={modalValidation.accountBalance !== ""}
                helperText={modalValidation.accountBalance}
                autoFocus
                margin="dense"
                id="accountBalance"
                name="accountBalance"
                label="Account Balance"
                type="text"
                fullWidth
                value={modalFormValue.accountBalance}
                onChange={handleValueChange}
              />
            </FormControl>
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <TextField
                error={modalValidation.bankName !== ""}
                helperText={modalValidation.bankName}
                autoFocus
                margin="dense"
                id="bankName"
                name="bankName"
                label="Bank Name"
                type="text"
                fullWidth
                value={modalFormValue.bankName}
                onChange={handleValueChange}
              />
            </FormControl>
            {/* <FormControlLabel
              sx={{ mt: 1 }}
              control={<Switch checked={fullWidth} onChange={handleFullWidthChange} />}
              label="Full width"
            /> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button disabled={disabledCondition} onClick={handleAccountDetails}>
            Add Account
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <div style={{ justifyContent: "flex-end" }} className="d-flex mr-2">
        <Button sx={{ mr: 2 }} className="mr-2" onClick={handleClickOpen} variant="outlined">
          Add Record
        </Button>{" "}
      </div>
      <TableContainer className="pt-5" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Account;
