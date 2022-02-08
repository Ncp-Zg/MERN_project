import { TextField } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { form } from "./Step1";

const Step2: FunctionComponent<form> = (props) => {
  const { formdata, setFormData } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formdata,description:event.target.value})
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
          id="filled-textarea"
          label="Title"
          placeholder=""
          multiline
          value={formdata.title}
          variant="filled"
          sx={{ width: "50%",marginBottom:"5px" }}
          onChange={(e)=>setFormData({...formdata,title:e.target.value})}
        />
      <TextField
        id="filled-multiline-static"
        label="Description"
        multiline
        rows={10}
        value={formdata.description}
        variant="filled"
        sx={{ width: "50%" }}
        onChange={handleChange}
        
      />
    </div>
  );
};

export default Step2;
