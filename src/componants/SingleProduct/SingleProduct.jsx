import React from 'react'
import "./SingleProduct.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalVisible } from '../../store/modalSlice';
import { formatPrice } from '../../utils/helpers';

const SingleProduct = () => {
  const dispatch = useDispatch()
  const { data: product } = useSelector((state) => state.modal)
  console.log('product:data ', product);
  return (
    <>
      <div className='overlay-bg' >
        <div className="product-details-modal bg-white">
          <button type="button" className='modal-close-btn flex flex-center fs-14' onClick={() => dispatch(setIsModalVisible(false))}>
            <i className="fas fa-times"></i>
          </button>
          <div className="details-content grid">
            {/* details left */}
            <div className="details-right">
              <div className="details-img">
                <img src={product.images[0]} alt={product.title} />
              </div>
            </div>
            {/* detials right */}
            <div className='details-left'>
              <div className="details-info">
                <h3 className="title text-regal-blue fs-22 fw-5">{product.title}</h3>
                <p className='description text-pine-green'>{product.description}</p>
                <div className='price fw-7 fs-24'>Price: {formatPrice(product.price)}</div>
                <div className="qty flex">
                  <span className="text-light-blue qty-text">Qty: </span>
                  <div className="qty-change flex">
                    <button type="button" className='qty-dec fs-14' >
                      <i className="fas fa-minus text-light-blue"></i>
                    </button>
                    <span className="qty-value flex flex-center"></span>
                    <button type="button" className='qty-inc fs-14 text-light-blue'>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <button type="button" className='btn-primary add-to-cart-btn' >
                  <span className="btn-icon">
                    <i className='fas fa-cart-shopping'></i>
                  </span>
                  <span className='btn-text'>Add To Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleProduct