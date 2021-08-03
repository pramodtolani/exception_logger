import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  Chip,
} from "@material-ui/core";
import {
  Home as HomeIcon,
  Whatshot as WhatshotIcon,
  Grain as GrainIcon,
  List as ListIcon,
  Visibility as ViewIcon,
  Check as CheckIcon,
  AccessTime as PendingIcon,
} from "@material-ui/icons";
import swal from "sweetalert";
import { makeStyles } from "@material-ui/core/styles";
import { fetchExceptions, markAsResolved } from "../../apiRequests/exceptions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    paddingTop: "2rem",
  },
  link: {
    display: "flex",
    cursor: "pointer",
  },
  activeLink: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  breadcrumbsContainer: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
    borderRadius: "50px",
    // background: "#e0e0e0",
  },
  tableContainer: {},
  button: {
    marginLeft: 10,
    marginRigth: 10,
  },
}));

export default function ExceptionsList() {
  const classes = useStyles();
  let history = useHistory();
  const [mutation, setMutation] = useState({});
  const [exceptionsList, setExceptionsList] = useState([]);

  useEffect(() => {
    async function getData() {
      const exceptionsListResponse = await fetchExceptions();

      if (exceptionsListResponse.code === 200) {
        setExceptionsList(exceptionsListResponse.data.data);
      }
    }
    getData();
  }, [mutation]);

  const resolveIssue = async (id) => {
    const willResolve = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to mark this issue as resolved?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willResolve) {
      const exceptionsListResponse = await markAsResolved({ id });
      if (exceptionsListResponse.code === 200) {
        // setExceptionsList(exceptionsListResponse.data.data);
        setMutation({});
        swal("Resolved!", "Your issue has been marked as resolved!", "success");
      }
    }
  };

  return (
    <Grid
      className={classes.container}
      container
      spacing={5}
      justifyContent="center"
    >
      <Grid item xs={12} md={6}>
        <Paper className={classes.breadcrumbsContainer} elevation={2}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="inherit"
              className={classes.link}
              onClick={() => history.push("/")}
            >
              <HomeIcon className={classes.icon} />
            </Link>
            <Link color="inherit" className={classes.link}>
              <WhatshotIcon className={classes.icon} />
              Exceptions
            </Link>
            <Typography color="textPrimary" className={classes.activeLink}>
              <ListIcon className={classes.icon} />
              List
            </Typography>
          </Breadcrumbs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Method</TableCell>
                <TableCell align="center">Url</TableCell>
                <TableCell align="center">Code</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Count</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exceptionsList.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.error_type}</TableCell>
                  <TableCell align="center">{row.method}</TableCell>
                  <TableCell align="center">{row.url}</TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="center">
                    {row.resolved === "RESOLVED" && (
                      <Chip
                        icon={<CheckIcon />}
                        label="Resolved"
                        color="primary"
                      />
                    )}
                    {row.resolved === "PENDING" && (
                      <Chip
                        icon={<PendingIcon />}
                        label="Pending"
                        color="secondary"
                      />
                    )}
                  </TableCell>
                  <TableCell align="center">{row.count}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      className={classes.button}
                      startIcon={<ViewIcon />}
                      onClick={() => history.push("/exceptions/details", row)}
                    >
                      View
                    </Button>
                    {row.resolved === "RESOLVED" || (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<CheckIcon />}
                        onClick={() => resolveIssue(row._id)}
                      >
                        Resolve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
