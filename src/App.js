import './App.css';
//import * as React from "react";

// Main form resources
import {Divider} from "@material-ui/core";
import {useState, useRef} from "react";

// Grid resources
import {DataGrid} from "@material-ui/data-grid";
import {Button} from "@material-ui/core";

// Popup resources
import Popup from "reactjs-popup";

// Main interface form
function Interface() {
    const [jobList, setJobList] = useState([]);
    const jobInput = useRef(null);
    const prioritySelect = useRef(null);

// Handle Job
    const handleJob = (updateEvent) => {
        const jobName = jobInput.current.value;
        const valLength = jobName.length;

        if (valLength == 0) {
            alert("Parameter 'Job' is required");
        }

        if
        (valLength > 70) {
            alert(" 'Job' maximum length is 70 chars");
        }

        const regex = /[A-Za-z]/;
        const chars = updateEvent.target.value.split('');
        const char = chars.pop();

        if (!regex.test(char)) {
            if (char !== ' ') {
                updateEvent.target.value = chars.join('');
                {
                    alert(" 'Job' must contain only english characters");
                }
            }
        }
    }

    // Handle Job creation
    const handleCreate = (updateEvent) => {
        updateEvent.preventDefault();
        const jobName = jobInput.current.value;
        const priority = prioritySelect.current.value;

        const valLength = jobName.length;

        if (valLength == 0) {
            alert("Parameter 'Job' is required");
        } else {

            // Add new row
            const jobId = jobList.length;
            let newJob = {id: jobId, jobName: jobName, priority: priority, edit: "edit", delete: "delete"};
            setJobList([...jobList, newJob])
        }
    }

// Grid management
// Edit row
    const handleEdit = (event, cellValues) => {
        const lineEdit = cellValues.row;
        const idToUpdate = lineEdit.id;
        const newJobList = jobList.map((filterItem, index) => {
                const container = {};
                container.id = index;
                container.jobName = filterItem.jobName;
                if (filterItem.id == idToUpdate) {
                    container.priority = prioritySelect.current.value;
                } else {
                    container.priority = filterItem.priority
                }

                container.edit = "edit";
                container.delete = "delete";
                return container;
            }
        );
        setJobList(newJobList)

    }

// Delete row
    const handleDelete = (event, cellValues) => {
        const line = cellValues.row;
        const idToDelete = line.id;
        //console.log(idToDelete);
        const filterJobList = jobList.filter((jobList) => jobList.id !== idToDelete);

        const newJobList = filterJobList.map((filterItem, index) => {
                const container = {};
                container.id = index;
                container.jobName = filterItem.jobName;
                container.priority = filterItem.priority;
                container.edit = "edit";
                container.delete = "delete";
                return container;
            }
        );
        setJobList(newJobList)
        // {id: jobId, jobName: jobName, priority: priority, edit: "edit", delete: "delete"};

        //console.log("-----------------------");
        //console.log(filterJobList);
        //console.log(newJobList);
        //console.log("-----------------------");
        //console.log(cellValues.value);
        //console.log(cellValues.row);
        //console.log(idToDelete);
    }

    // Handle Search
    const handleSearchJob = (event, cellValues) => {

    }

    const columns = [
        {field: "jobName", headerName: " ", width: 300},
        {field: "priority", headerName: " ", width: 150},
        {
            field: "edit", headerName: " ", width: 150,
            renderCell: (cellValues) => {
                return (
                    <div>
                        <Popup trigger={
                            <Button
                                variant={"contained"}
                            >Edit</Button>
                        }
                               modal
                               nested
                        >
                            <div className="pop-up">
                                <label className="form-box">Priority:</label>
                                <select className="form-box" ref={prioritySelect}>
                                    <option value="urgent">Urgent</option>
                                    <option value="regular">Regular</option>
                                    <option value="trivial">Trivial</option>
                                </select>
                                <button onClick={(event) => {
                                    handleEdit(event, cellValues);
                                }}>Update
                                </button>
                            </div>
                        </Popup>
                    </div>

                )
            }
        },
        {
            field: "delete", headerName: " ", width: 150,
            renderCell: (cellValues) => {
                return (
                    <Button
                        variant={"contained"}
                        onClick={(event) => {
                            handleDelete(event, cellValues)
                        }}
                    >Delete</Button>
                )
            }
        }
    ]

// Grid details
    function Grid() {
        return (
            <div className="grid-style" style={{height: 800, width: "100%"}}>
                <DataGrid
                    rowHeight={120}
                    rows={jobList}
                    columns={columns}
                    pageSize={5}
                    getCellClassName={(params) => {
                        if (params.field !== 'priority') {
                            return ' ';
                        } else {
// logic for colors
                        }

                        return 'red';
                    }}
                />
            </div>
        )
    }

// Return interface form
    return (
        <div className="form-box main-form">
            <form>
                <label className="form-box">Job:</label>
                <input
                    className="form-box"
                    type="text"
                    ref={jobInput}
                    onChange={handleJob}
                />
                <label className="form-box">Priority:</label>
                <select className="form-box" ref={prioritySelect}>
                    <option value="urgent">Urgent</option>
                    <option value="regular">Regular</option>
                    <option value="trivial">Trivial</option>
                </select>
                <button className="create-button" type="submit" onClick={handleCreate}>Create</button>
                <div className="job-list">
                    <div className="job-list-left">JOB LIST</div>
                    <div className="job-list-right">
                        <button type="submit" onClick={(event) => {
                            handleSearchJob()
                        }}>Search Job
                        </button>
                    </div>
                    <br/>
                    <Divider/>
                    <Grid/>
                </div>
            </form>
        </div>
    )
}

// Main function
function App() {
    return (
        <div className="App">
            <Interface/>
        </div>
    );
}

export default App;
