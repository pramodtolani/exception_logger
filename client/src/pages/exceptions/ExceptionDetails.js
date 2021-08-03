import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Breadcrumbs,
  Link,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Tabs,
  Tab,
  TabPanel,
} from "@material-ui/core";
import {
  Home as HomeIcon,
  Whatshot as WhatshotIcon,
  Grain as GrainIcon,
  List as ListIcon,
  Visibility as ViewIcon,
  Check as CheckIcon,
} from "@material-ui/icons";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  docco,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

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
  tableTitles: {
    fontWeight: "bold",
  },
}));

export default function ExceptionDetails(props) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const [exceptionDetails, setExceptionDetails] = useState();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    setExceptionDetails(location.state);
  }, [location]);

  console.log("exceptionDetails", exceptionDetails);

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
            <Link
              color="inherit"
              className={classes.link}
              onClick={() => history.push("/exceptions")}
            >
              <WhatshotIcon className={classes.icon} />
              Exceptions
            </Link>
            <Typography color="textPrimary" className={classes.activeLink}>
              <ViewIcon className={classes.icon} />
              Details
            </Typography>
          </Breadcrumbs>
        </Paper>
      </Grid>
      {exceptionDetails && (
        <Grid item xs={12}>
          <Card>
            <CardHeader title={"Request Details"} />
            <CardContent>
              <TableContainer className={classes.tableContainer}>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableTitles} align="left">
                        Method
                      </TableCell>
                      <TableCell align="center">
                        {exceptionDetails.method}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableTitles} align="left">
                        Path
                      </TableCell>
                      <TableCell align="center">
                        {exceptionDetails.url}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableTitles} align="left">
                        Status
                      </TableCell>
                      <TableCell align="center">
                        {exceptionDetails.code}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableTitles} align="left">
                        Duration
                      </TableCell>
                      <TableCell align="center">
                        {exceptionDetails.response_time}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableTitles} align="left">
                        IP Address
                      </TableCell>
                      <TableCell align="center">
                        {exceptionDetails.ip_address}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableTitles} align="left">
                        Time
                      </TableCell>
                      <TableCell align="center">
                        {exceptionDetails.start_time &&
                          moment(exceptionDetails.start_time).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      )}
      {exceptionDetails && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Tabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabChange}
                aria-label="disabled tabs example"
                variant="fullWidth"
              >
                <Tab label="Log Data" />
                <Tab label="Headers" />
                <Tab label="Error" />
                <Tab label="Payload" />
              </Tabs>
              {tabValue === 0 && (
                <div value={tabValue}>
                  {exceptionDetails.log_data.map((data) => (
                    <>
                      <p>
                        {moment(data.date).format("MMMM Do YYYY, h:mm:ss a")}
                      </p>
                      <SyntaxHighlighter
                        language="json"
                        style={atomOneDark}
                        wrapLines={true}
                        wrapLongLines={true}
                      >
                        {data.log}
                      </SyntaxHighlighter>
                    </>
                  ))}
                </div>
              )}
              {tabValue === 1 && (
                <div value={tabValue}>
                  <SyntaxHighlighter
                    language="json"
                    style={atomOneDark}
                    wrapLines={true}
                    wrapLongLines={true}
                  >
                    {JSON.stringify(exceptionDetails.headers, null, 2)}
                  </SyntaxHighlighter>
                </div>
              )}
              {tabValue === 2 && (
                <div value={tabValue}>
                  <SyntaxHighlighter
                    language="json"
                    style={atomOneDark}
                    wrapLines={true}
                    wrapLongLines={true}
                  >
                    {exceptionDetails.exception_message}
                  </SyntaxHighlighter>
                </div>
              )}
              {tabValue === 3 && (
                <div value={tabValue}>
                  <SyntaxHighlighter
                    language="json"
                    style={atomOneDark}
                    wrapLines={true}
                    wrapLongLines={true}
                  >
                    {JSON.stringify([], null, 2)}
                  </SyntaxHighlighter>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
