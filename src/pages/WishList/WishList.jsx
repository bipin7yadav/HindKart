import React from "react";
import { toast } from "react-toastify";
import { useProductListContext } from "../../contexts/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { MdClose, MdShoppingBag } from "react-icons/md";
import "./wishlist.css";

function Wishlist() {
  const { wishState: { wish }, cartState: { cart }, dispatchCart, dispatchWish } = useProductListContext();
  const navigate = useNavigate();

  const handleMoveToCart = (product) => {
    dispatchCart({ type: "ADD_TO_CART", payload: product });
    dispatchWish({ type: "REMOVE_FROM_WISHLIST", payload: product });
    toast.success("Moved to Bag!");
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h2>My Wishlist <span className="wishlist-count">{wish.length} items</span></h2>
      </div>

      {wish.length > 0 ? (
        <div className="wishlist-grid">
          {wish.map((product) => {
            const { _id, title, price, originalPrice, discount, brand, image, inStock } = product;
            const isCarted = cart.some((i) => i._id === _id);

            return (
              <div className="wishlist-card" key={_id}>
                <button
                  className="remove-wish-btn"
                  onClick={() => {
                    dispatchWish({ type: "REMOVE_FROM_WISHLIST", payload: product });
                    toast.info("Removed from Wishlist");
                  }}
                  title="Remove item"
                >
                  <MdClose />
                </button>

                <div className="wish-img-wrapper">
                  <img src={image} alt={title} className="wish-img" />
                </div>

                <div className="wish-details">
                  <h4 className="wish-title">{title}</h4>
                  <div className="wish-price-row">
                    <span className="wish-price">₹{price}</span>
                    {originalPrice && <span className="wish-mrp">₹{originalPrice}</span>}
                    {discount && <span className="wish-discount">({discount}% OFF)</span>}
                  </div>
                </div>

                <div className="wish-action">
                  {isCarted ? (
                    <button className="wish-cta-btn carted" onClick={() => navigate("/MyCart")}>
                      GO TO BAG
                    </button>
                  ) : (
                    <button
                      className="wish-cta-btn"
                      onClick={() => handleMoveToCart(product)}
                      disabled={!inStock}
                    >
                      <MdShoppingBag /> {inStock ? "MOVE TO BAG" : "OUT OF STOCK"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-wishlist-container">
          <div className="empty-heart-icon">♡</div>
          <h3>YOUR WISHLIST IS EMPTY</h3>
          <p>Save items that you like in your wishlist. Review them anytime and easily move them to the bag.</p>
          <Link className="continue-shop-btn" to="/AllProducts">
            CONTINUE SHOPPING
          </Link>
        </div>
      )}
    </div>
  );
}

export { Wishlist };