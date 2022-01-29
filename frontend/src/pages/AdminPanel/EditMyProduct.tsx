import { useParams } from 'react-router-dom';

const EditMyProduct = () => {

    const {id} = useParams();
  return (
  <div>
      {id}
  </div>
  );
};

export default EditMyProduct;
