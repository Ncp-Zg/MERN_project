import { TextField } from '@mui/material'
import React, { FunctionComponent } from 'react'
import { form } from './Step1'

const Step3 : FunctionComponent<form> = (props) => {

    const {formdata,setFormData} =props

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
          label="Stock(Number)"
          placeholder=""
          multiline
          variant="filled"
          sx={{ width: "50%" }}
        />
      
    </div>
    )
}

export default Step3
