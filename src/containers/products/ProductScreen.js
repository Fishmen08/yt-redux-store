import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/product/productItem";
import { PageHeading, ProductContainerStyle } from "../../styles/ProductScreen";
import { listProducts } from "../../actions/productActions";

const ProductScreen = () => {
    const dispatch = useDispatch();

    const productsList = useSelector((state) => state.productsList);

    const {loading, error, products} = productsList;

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            {loading ? 
            <div>Loading....</div> 
            : error ?
             <div>{error}</div> 
            : 
            <>
            <PageHeading primary>Products</PageHeading>
            <ProductContainerStyle primary>
                {products.map(item => {
                    return <ProductItem item={item} key={item.id} />
                })}
            </ProductContainerStyle>
            </>
            }
        </div>
    )
}

export default ProductScreen;