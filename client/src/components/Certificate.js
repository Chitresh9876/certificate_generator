import React, { useState } from "react";
import "./Certificate.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { TextField } from "@mui/material";

const Certificate = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState();
  const [date, setDate] = useState("");
  const [refID, setRefID] = useState("");
  const [link, setLink] = useState();
  const [loading, setLoading] = useState(false);
  
    
    
    const generatePDF = async () => {
        setLoading(true);
        await axios
          .post("http://localhost:5000/certificates/generate", {
            name: name,
            course: course,
            date: date,
            refID: refID,
          })
          .then(async(res) => {
            const data = res?.data;
            if (data?.success) {
              await axios("http://localhost:5000/save", {
                name: name,
                course: course,
                date: date,
                refID: refID,
                link: data?.link,
              })
                .then((res) => {
                  if(res?.status == 200) 
                    setLink(data?.link);
                console.log(res)
              })
              
            } else {
              console.log(data?.error);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
    }
  

  return (
    <div className="container">
      <div className="input-container">
        <h2> Enter the Details</h2>
        <span>Name: </span>{" "}
        <TextField
          required
          variant="outlined"
          size="small"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span>Course Enrolled: </span>{" "}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Course Enrolled"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <span>Date: </span>{" "}
        <TextField
          variant="outlined"
          size="small"
          placeholder="DD/MM/YYYY"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <span>Certificate ID: </span>{" "}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Certificate ID"
          value={refID}
          onChange={(e) => setRefID(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => generatePDF()}
        >
          {loading ? `Generating...` : `Generate`}
        </Button>
        {link &&
          !loading &&(
            <span>
              {" "}
              Link:{" "}
              <a href={link} target="_blank">
                ${link}
              </a>{" "}
            </span>
          )}
      </div>
      <div className="image-container">
        <h2>Preview Certification</h2>
        <img
          src="https://iili.io/Jr1J4XS.png"
          alt="certificate image"
          height={"400px"}
          width={"100%"}
        />
        <div className="contain">
          <h1 className="name">{name}</h1>
          <p className="course">
            {course &&
              `For successfully completing the Tutedude ${course} course on ${date}`}
          </p>
          <p className="refId">{refID}</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
