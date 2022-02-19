import { TextField } from '@mui/material'
import React, { FunctionComponent } from 'react'
import CurrencyFormat from 'react-currency-format'
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
          type="number"
          multiline
          variant="filled"
          value={formdata.stock}
          sx={{ width: "50%",marginBottom:"5px" }}
          onChange={(e)=>setFormData({...formdata,stock:+e.target.value})}
        />
        <TextField
          id="filled-textarea"
          type="number"
          label="Cost"
          placeholder=""
          multiline
          value={formdata.cost}
          variant="filled"
          sx={{ width: "50%" }}
          onChange={(e)=>setFormData({...formdata,cost:(+e.target.value).toFixed(2)})}
        />
        <CurrencyFormat
                  renderText={(value:any) => (
                    <>
                      <h3>
                        Cost:{" "}
                        <strong>{value}</strong>
                      </h3>
                    </>
                  )}
                  decimalScale={2}
                  value={formdata.cost}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₺"}
                />
      
    </div>
    )
}

export default Step3
