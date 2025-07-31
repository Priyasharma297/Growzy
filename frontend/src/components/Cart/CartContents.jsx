import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";

export const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
        })
      );
    }
  };

  const handleRemoverFromCart = (productId) => {
    dispatch(removeFromCart({ productId, guestId, userId }));
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3 className="text-green-700 font-semibold">{product.name}</h3>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity
                    )
                  }
                  className="border border-green-600 text-green-700 rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4 font-medium text-green-800">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity
                    )
                  }
                  className="border border-green-600 text-green-700 rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-green-800 font-semibold">₹ {product.price.toLocaleString("en-IN")}</p>
            <button
              onClick={() => handleRemoverFromCart(product.productId)}
              title="Remove from cart"
            >
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600 hover:text-red-800" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
