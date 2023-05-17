import React, { useEffect } from 'react'
import Slider from '../../componants/Slider/Slider';
import Category from "../../componants/category/category"
import "./HomePage.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProductsByCategory } from '../../store/categorySlice';
import SingleCategory from '../../componants/SingleCategory/SingleCategory';
import { fetchProducts } from '../../store/productSlice';
import ProductList from '../../componants/ProductList/ProductList';
// import product

const HomePage = () => {
  const dispatch = useDispatch()
  const { data: categories, status: categorystatus } = useSelector((state) => {
    console.log('state: homepage', state);
    return state.category
  })
  const { data: product, status: productStatus } = useSelector((state) => {
    console.log('state: homepage', state);
    return state.product
  })
  const { catProductAll: productsByCategory, catProductAllStatus } = useSelector((state) => state.category);
  console.log('{ catProductAll: productsByCategory, catProductAllStatus }: ', { catProductAll: productsByCategory, catProductAllStatus });

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchProductsByCategory(1, 'all'))
    dispatch(fetchProductsByCategory(2, 'all'))
  }, [])
  return (
    <>
      <div className='home-page'>
        <Slider />
        <Category categories={categories} status={categorystatus} />
        <ProductList products={product} productStatus={productStatus} />

        <section>
          {productsByCategory[0] && <SingleCategory products={productsByCategory[0]} status={catProductAllStatus} />}
        </section>
        <section>
          {productsByCategory[1] && <SingleCategory products={productsByCategory[1]} status={catProductAllStatus} />}
        </section>
      </div>
    </>
  )
}

export default HomePage