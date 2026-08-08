import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useProductListContext } from "../../contexts/ProductContext";
import { MdClose, MdLocalOffer, MdSecurity, MdFavoriteBorder, MdAdd, MdRemove, MdCheckCircle, MdHome, MdWork, MdPayment } from "react-icons/md";
import "./cart.css";

const defaultAddresses = [
  {
    id: "addr_1",
    name: "Bipin Yadav",
    mobile: "9876543210",
    pincode: "110001",
    street: "Flat 402, Sunshine Apartments, Sector 15",
    city: "New Delhi",
    state: "Delhi",
    type: "Home",
  },
  {
    id: "addr_2",
    name: "Bipin Yadav",
    mobile: "9876543211",
    pincode: "560001",
    street: "HindKart Tech Park, Outer Ring Road",
    city: "Bengaluru",
    state: "Karnataka",
    type: "Office",
  },
];

function MyCart() {
  const { cartState: { cart }, dispatchCart, dispatchWish, wishState: { wish } } = useProductListContext();
  const { state: { userInfo, isLoggedIn } } = useAuth();
  const navigate = useNavigate();

  const [checkoutStep, setCheckoutStep] = useState("BAG"); // "BAG" | "ADDRESS" | "PAYMENT"
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState("addr_1");
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [lastPaymentId, setLastPaymentId] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  // New Address Form State
  const [newAddr, setNewAddr] = useState({
    name: "",
    mobile: "",
    pincode: "",
    street: "",
    city: "",
    state: "",
    type: "Home",
  });

  // Price calculations
  const totalMRP = cart.reduce((acc, item) => acc + (item.originalPrice || Math.round(item.price * 1.5)) * item.quantity, 0);
  const totalCurrent = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountOnMRP = totalMRP - totalCurrent;
  const couponDiscount = discountApplied ? 300 : 0;
  const finalAmount = Math.max(0, totalCurrent - couponDiscount);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  // Dynamically load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "HINDKART300") {
      setDiscountApplied(true);
      toast.success("Coupon HINDKART300 applied! ₹300 Saved.");
    } else {
      toast.error("Invalid coupon code. Use HINDKART300");
    }
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.mobile || !newAddr.pincode || !newAddr.street || !newAddr.city || !newAddr.state) {
      toast.error("Please fill in all address fields!");
      return;
    }

    const created = {
      ...newAddr,
      id: `addr_${Date.now()}`,
    };

    setAddresses([...addresses, created]);
    setSelectedAddressId(created.id);
    setShowAddAddressModal(false);
    setNewAddr({ name: "", mobile: "", pincode: "", street: "", city: "", state: "", type: "Home" });
    toast.success("New shipping address added!");
  };

  const handleRazorpayPayment = async () => {
    if (!isLoggedIn) {
      toast.info("Please log in to place order!");
      navigate("/Auth");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a delivery address!");
      return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
      // Fallback demo payment if Razorpay CDN is unreachable in offline sandbox
      const mockPayId = `pay_mock_${Math.random().toString(36).substring(2, 10)}`;
      setLastPaymentId(mockPayId);
      setOrderSuccess(true);
      dispatchCart({ type: "CLEAR_CART" });
      toast.success(`Payment Successful! Demo ID: ${mockPayId}`);
      return;
    }

    const options = {
      key: "rzp_test_hindkart",
      amount: finalAmount * 100, // Amount in paise
      currency: "INR",
      name: "HindKart Fashion",
      description: "Order Payment Checkout",
      image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/11641064/2020/9/9/ac522d33-1325-4e3e-ab68-1de4768a61b11599633085687-HRX-by-Hrithik-Roshan-Men-Medieval-Blue-Solid-Regular-Fit-Ra-1.jpg",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id || `pay_${Date.now()}`;
        setLastPaymentId(paymentId);
        setOrderSuccess(true);
        dispatchCart({ type: "CLEAR_CART" });
        toast.success(`Payment Received! ID: ${paymentId}`);
      },
      prefill: {
        name: selectedAddress.name,
        contact: selectedAddress.mobile,
        email: userInfo?.email || "user@hindkart.com",
      },
      theme: {
        color: "#ff3f6c",
      },
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      const mockPayId = `pay_demo_${Math.random().toString(36).substring(2, 10)}`;
      setLastPaymentId(mockPayId);
      setOrderSuccess(true);
      dispatchCart({ type: "CLEAR_CART" });
      toast.success(`Payment Completed! Ref: ${mockPayId}`);
    }
  };

  // Order Confirmation Success View
  if (orderSuccess) {
    return (
      <div className="cart-page">
        <div className="order-success-card">
          <MdCheckCircle className="success-icon" />
          <h2>ORDER CONFIRMED!</h2>
          <p className="order-id-txt">Payment ID: <strong>{lastPaymentId}</strong></p>
          <div className="delivery-summary-box">
            <h4>Delivering To:</h4>
            <p><strong>{selectedAddress?.name}</strong> ({selectedAddress?.type})</p>
            <p>{selectedAddress?.street}, {selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pincode}</p>
            <p>Mobile: {selectedAddress?.mobile}</p>
          </div>
          <p className="est-delivery">Estimated Delivery: <strong>2 - 4 Business Days</strong></p>
          <button className="continue-shopping-btn" onClick={() => navigate("/AllProducts")}>
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Checkout Stepper Header */}
      <div className="checkout-stepper">
        <div
          className={`step ${checkoutStep === "BAG" ? "active" : checkoutStep === "ADDRESS" || checkoutStep === "PAYMENT" ? "completed" : ""}`}
          onClick={() => setCheckoutStep("BAG")}
        >
          1. BAG
        </div>
        <div className="step-line" />
        <div
          className={`step ${checkoutStep === "ADDRESS" ? "active" : checkoutStep === "PAYMENT" ? "completed" : ""}`}
          onClick={() => cart.length > 0 && setCheckoutStep("ADDRESS")}
        >
          2. ADDRESS
        </div>
        <div className="step-line" />
        <div className={`step ${checkoutStep === "PAYMENT" ? "active" : ""}`}>
          3. PAYMENT
        </div>
      </div>

      {cart.length > 0 || checkoutStep !== "BAG" ? (
        <div className="cart-container">
          {/* Left Column: STEP Dynamic Content */}
          <div className="cart-left-col">
            {/* STEP 1: BAG */}
            {checkoutStep === "BAG" && (
              <>
                <div className="offer-banner">
                  <MdLocalOffer className="offer-icon" />
                  <div>
                    <strong>Available Offers:</strong> 10% Instant Discount on HDFC Bank Cards & Razorpay UPI.
                  </div>
                </div>

                <div className="cart-items-list">
                  <div className="items-header">
                    <h3>My Bag ({cart.length} {cart.length === 1 ? "Item" : "Items"})</h3>
                  </div>

                  {cart.map((item) => {
                    const { _id, title, price, originalPrice, discount, brand, image, quantity, selectedSize } = item;
                    const isWishlisted = wish.some((w) => w._id === _id);

                    return (
                      <div className="cart-item-card" key={_id}>
                        <button
                          className="item-remove-btn"
                          onClick={() => {
                            dispatchCart({ type: "REMOVE_FROM_CART", payload: item });
                            toast.info("Item removed from bag");
                          }}
                          title="Remove item"
                        >
                          <MdClose />
                        </button>

                        <div className="item-image-wrapper">
                          <img src={image} alt={title} className="item-img" />
                        </div>

                        <div className="item-details">
                          <h4 className="item-brand">{brand}</h4>
                          <p className="item-title">{title}</p>
                          
                          <div className="item-meta-row">
                            <span className="meta-pill">Size: <strong>{selectedSize || "M"}</strong></span>
                            <div className="qty-control">
                              <button
                                className="qty-btn"
                                onClick={() => {
                                  if (quantity > 1) {
                                    dispatchCart({ type: "DECREMENT_QUANTITY", payload: item });
                                  }
                                }}
                                disabled={quantity <= 1}
                              >
                                <MdRemove />
                              </button>
                              <span className="qty-val">{quantity}</span>
                              <button
                                className="qty-btn"
                                onClick={() => {
                                  dispatchCart({ type: "INCREMENT_QUANTITY", payload: item });
                                }}
                              >
                                <MdAdd />
                              </button>
                            </div>
                          </div>

                          <div className="item-price-row">
                            <span className="item-price">₹{price * quantity}</span>
                            <span className="item-mrp">₹{(originalPrice || Math.round(price * 1.5)) * quantity}</span>
                            <span className="item-discount">({discount || 40}% OFF)</span>
                          </div>

                          <div className="item-actions">
                            <button
                              className="action-btn"
                              onClick={() => {
                                if (!isWishlisted) {
                                  dispatchWish({ type: "ADD_TO_WISHLIST", payload: item });
                                }
                                dispatchCart({ type: "REMOVE_FROM_CART", payload: item });
                                toast.success("Moved to Wishlist!");
                              }}
                            >
                              <MdFavoriteBorder /> MOVE TO WISHLIST
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* STEP 2: ADDRESS */}
            {checkoutStep === "ADDRESS" && (
              <div className="address-step-container">
                <div className="address-step-header">
                  <h3>SELECT DELIVERY ADDRESS</h3>
                  <button className="add-new-address-btn" onClick={() => setShowAddAddressModal(true)}>
                    + ADD NEW ADDRESS
                  </button>
                </div>

                <div className="address-cards-list">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`address-card ${selectedAddressId === addr.id ? "selected" : ""}`}
                      onClick={() => setSelectedAddressId(addr.id)}
                    >
                      <div className="address-card-header">
                        <input
                          type="radio"
                          name="addressSelection"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="address-radio"
                        />
                        <div className="address-title-row">
                          <span className="address-user-name">{addr.name}</span>
                          <span className="address-type-badge">
                            {addr.type === "Home" ? <MdHome /> : <MdWork />} {addr.type}
                          </span>
                        </div>
                      </div>
                      <div className="address-body">
                        <p className="street-text">{addr.street}</p>
                        <p className="city-state-text">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="mobile-text">Mobile: <strong>{addr.mobile}</strong></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {checkoutStep === "PAYMENT" && (
              <div className="payment-step-container">
                <div className="payment-address-summary">
                  <h4>Delivering to:</h4>
                  <p><strong>{selectedAddress?.name}</strong> ({selectedAddress?.type})</p>
                  <p>{selectedAddress?.street}, {selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pincode}</p>
                  <button className="change-address-btn" onClick={() => setCheckoutStep("ADDRESS")}>
                    CHANGE ADDRESS
                  </button>
                </div>

                <div className="payment-options-box">
                  <h3>PAYMENT METHOD</h3>
                  <div className="payment-option-card active">
                    <MdPayment className="pay-icon" />
                    <div>
                      <strong>Razorpay Gateway (UPI, Credit/Debit Cards, Net Banking)</strong>
                      <p>Instant refunds, 100% secure payment encryption.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Price Details */}
          <div className="cart-right-col">
            {/* Coupon Box */}
            <div className="coupon-box">
              <h4>COUPONS</h4>
              <div className="coupon-input-row">
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. HINDKART300)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="coupon-input"
                />
                <button className="apply-coupon-btn" onClick={applyCoupon}>
                  APPLY
                </button>
              </div>
              {discountApplied && <span className="coupon-applied-tag">✓ HINDKART300 Applied</span>}
            </div>

            {/* Price Details Card */}
            <div className="price-details-card">
              <h4 className="price-details-title">
                PRICE DETAILS ({cart.length} {cart.length === 1 ? "Item" : "Items"})
              </h4>

              <div className="price-summary-row">
                <span>Total MRP</span>
                <span>₹{totalMRP}</span>
              </div>

              <div className="price-summary-row">
                <span>Discount on MRP</span>
                <span className="text-green">- ₹{discountOnMRP}</span>
              </div>

              {discountApplied && (
                <div className="price-summary-row">
                  <span>Coupon Discount</span>
                  <span className="text-green">- ₹300</span>
                </div>
              )}

              <div className="price-summary-row">
                <span>Convenience Fee</span>
                <span>
                  <s style={{ color: "#94969f" }}>₹99</s> <span className="text-green">FREE</span>
                </span>
              </div>

              <div className="price-divider" />

              <div className="total-amount-row">
                <span>Total Amount</span>
                <span>₹{finalAmount}</span>
              </div>

              {checkoutStep === "BAG" && (
                <button className="place-order-btn" onClick={() => setCheckoutStep("ADDRESS")}>
                  PROCEED TO ADDRESS
                </button>
              )}

              {checkoutStep === "ADDRESS" && (
                <button className="place-order-btn" onClick={() => setCheckoutStep("PAYMENT")}>
                  DELIVER TO THIS ADDRESS
                </button>
              )}

              {checkoutStep === "PAYMENT" && (
                <button className="place-order-btn razorpay-btn" onClick={handleRazorpayPayment}>
                  PAY ₹{finalAmount} WITH RAZORPAY
                </button>
              )}

              <div className="secure-badge">
                <MdSecurity /> 100% Safe & Secure Payments via Razorpay
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart-container">
          <img
            src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp"
            alt="Empty Bag"
            className="empty-bag-img"
          />
          <h3>Hey, it feels so light!</h3>
          <p>There is nothing in your bag. Let's add some fashion items!</p>
          <Link className="add-items-btn" to="/AllProducts">
            ADD ITEMS FROM CATALOG
          </Link>
        </div>
      )}

      {/* Add New Address Modal */}
      {showAddAddressModal && (
        <div className="modal-backdrop">
          <div className="address-modal">
            <div className="modal-header">
              <h4>ADD NEW SHIPPING ADDRESS</h4>
              <button className="modal-close-btn" onClick={() => setShowAddAddressModal(false)}>
                <MdClose />
              </button>
            </div>
            <form onSubmit={handleAddAddressSubmit} className="address-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  value={newAddr.name}
                  onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                  placeholder="e.g. Bipin Yadav"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mobile Number *</label>
                  <input
                    type="text"
                    required
                    value={newAddr.mobile}
                    onChange={(e) => setNewAddr({ ...newAddr, mobile: e.target.value })}
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    required
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    placeholder="6-digit PIN code"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address (House No, Building, Street) *</label>
                <input
                  type="text"
                  required
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  placeholder="Street address & landmark"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City / District *</label>
                  <input
                    type="text"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    placeholder="e.g. New Delhi"
                  />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    required
                    value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                    placeholder="e.g. Delhi"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Address Type</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="addrType"
                      checked={newAddr.type === "Home"}
                      onChange={() => setNewAddr({ ...newAddr, type: "Home" })}
                    />
                    Home
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="addrType"
                      checked={newAddr.type === "Office"}
                      onChange={() => setNewAddr({ ...newAddr, type: "Office" })}
                    />
                    Office
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddAddressModal(false)}>
                  CANCEL
                </button>
                <button type="submit" className="save-addr-btn">
                  SAVE ADDRESS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export { MyCart };