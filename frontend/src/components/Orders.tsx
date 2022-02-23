import { Button, Card, TextField } from '@mui/material';
import React, { FunctionComponent, SetStateAction } from 'react'
import { ClipLoader } from 'react-spinners';
import { Dispatch } from 'redux';
import { incomingOrders } from '../type'

interface IItemProps {
    data:incomingOrders[];
    ordr:incomingOrders;
    index:number;
    loadingPrep:number;
    loadingCargo:number;
    changePrep:(active: number) => void;
    changeSentByCargo:(active: number) => void;
    setTrackNumber:(active: number) => void;
  }

const Orders: FunctionComponent<IItemProps> = (props) => {

    const { 
    data,
    ordr,
    index,
    loadingPrep,
    loadingCargo,
    changePrep,
    changeSentByCargo,
    setTrackNumber,
     } = props;

  return (
    <div>
        <Card
          key={ordr._id}
          sx={{
            marginBottom: "4px",
            padding: "0px 0px 5px 5px",
            backgroundColor: "#E4CDA7",
          }}
        >
          <h3>
            {ordr.product.title} : {ordr.amount} piece
          </h3>
          <h4>Customer : {ordr.toWho.email}</h4>
          {/* <p>{moment(ordr.orderedAt).format("LLL")}</p> */}
          <p>{ordr.orderedAt}</p>
          {loadingPrep!==index ? (<Button
            disabled={data[index].prepared ? true : false}
            onClick={() => changePrep(index)}
          >
            preparing...
          </Button>) : (
            <div
            style={{
              display: "inline-block",
              textAlign:"center",
              width:"16vh"
            }}
          >
              <ClipLoader size={15} color="#c67c03" />
          </div> 
          )}
          {loadingCargo!==index ? <Button
            disabled={data[index].cargotracknumber === "" ? false : true}
            onClick={() => changeSentByCargo(index)}
          >
            sent by cargo
          </Button> : (
            <div
            style={{
              display: "inline-block",
              textAlign:"center",
              width:"19vh"
            }}
          >
              <ClipLoader size={15} color="#c67c03" />
          </div> 
          )}
          <TextField
          defaultValue={data[index].cargotracknumber !== "" ? data[index].cargotracknumber : null}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setTrackNumber(+e.target.value)}
            disabled={data[index].cargotracknumber === "" ? false : true}
            size="small"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
        </Card>
    </div>
  )
}

export default Orders