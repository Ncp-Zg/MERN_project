import Product from "../components/Product"
import data from "../data.json"


const Home = () => {

    console.log(data)
    return (
        <div style={{flexWrap:"wrap",display:"flex",justifyContent:"space-around"}}>
            {data.map(item=>(
                <Product item={item} key={item.id}/>
            ))}
        </div>
    )
}

export default Home
