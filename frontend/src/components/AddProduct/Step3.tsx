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
          value={formdata.stock}
          sx={{ width: "50%",marginBottom:"5px" }}
          onChange={(e)=>setFormData({...formdata,stock:e.target.value.toString()})}
        />
        <TextField
          id="filled-textarea"
          label="Cost"
          placeholder=""
          multiline
          value={formdata.cost}
          variant="filled"
          sx={{ width: "50%" }}
          onChange={(e)=>setFormData({...formdata,cost:e.target.value.toString()})}
        />
      
    </div>
    )
}

export default Step3
