import * as React from "react";
import Typography from "@mui/material/Typography";
import PatientCard from "./PatientCard";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import * as FirestoreService from "../Services/Firestore";

const ProviderModule = (props) => {
  const [records, setRecords] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await FirestoreService.getResults();
      let objArray = [];
      data.forEach((snap) => {
        let obj = {};
        const found = objArray.findIndex(
          (el) => el.PATIENT === snap.data().PATIENT
        );
        if (found === -1) {
          obj.FIRSTNAME = snap.data().FIRSTNAME;
          obj.LASTNAME = snap.data().LASTNAME;
          obj.PATIENT = snap.data().PATIENT;
          obj.AGE = snap.data().AGE;
          obj.DATA = [
            {
              Results: snap.data().TOTAL_TABLET_PLANNED_ANALYSIS,
              date: snap.data().DATE,
              "Time to Complete": snap.data().TOTAL_TIME_min,
            },
          ];
          obj.resultCount = 1;
          objArray.push(obj);
        } else {
          objArray[found].resultCount++;
          objArray[found].DATA.push({
            Results: snap.data().TOTAL_TABLET_PLANNED_ANALYSIS,
            date: snap.data().DATE,
            "Time to Complete": snap.data().TOTAL_TIME_min,
          });
        }
      });
      handleAdd(objArray);
    };

    fetchData().catch(console.error);
  }, []);

  const handleAdd = (newRecords) => {
    // console.log(newRecords);
    newRecords.sort((a, b) =>
      a.LASTNAME > b.LASTNAME ? 1 : b.LASTNAME > a.LASTNAME ? -1 : 0
    );

    setRecords((records) => [...records, ...newRecords]);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, textAlign: "right", mt: "10px" }}>
        <Typography
          variant="h8"
          sx={{ m: "10px", fontStyle: "italic", fontWeight: "light" }}
        >
          NOTE: This is fictitious data for prototype purpose only
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, m: "20px" }}>
        <Grid container justifyContent="center" spacing={2}>
          {(records || []).map((snap) => (
            <Grid item>
              <PatientCard
                name={snap.FIRSTNAME + " " + snap.LASTNAME}
                age={snap.AGE}
                data={snap.DATA}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProviderModule;