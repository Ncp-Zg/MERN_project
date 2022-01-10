import React, { FunctionComponent } from 'react'
import { Item } from '../type'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface IItemProps {
    item: Item
}

const Product : FunctionComponent<IItemProps> = (props) => {

    const {item} = props
    return (
        <Card sx={{ maxWidth: 345, margin: "10px" }}>
      <CardMedia
        sx={{objectFit: "contain"}}
        component="img"
        height="250"
        image={item.img[0]}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
    )
}

export default Product
