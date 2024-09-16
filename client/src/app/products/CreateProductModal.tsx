import { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
  productId: string;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModalProps) => {
  const [formData, setFormData] = useState({ productId: v4(), name: "", price: 0, stockQuantity: 0, rating: 0 });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate({ ...formData, productId: v4() });
    onClose();
  }

  if (!isOpen) {
    return null;
  }


  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: (name === "price" || name === "stockQuantity" || name === "rating") ? parseFloat(value) : value,
    });
  }

  const labelCssStyles = "block text-sm font-medium text-gray-700 ";
  const inputCssStyles = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md ";

  return (
    <div className="fixed inset-0 bg-reay-600 bg-opacity-50 overflow-y-auto h-full w-full z-20 ">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white ">
        <Header name="+ New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          {/* NOTE: PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md "
            required
          />


          {/* NOTE: PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price}
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md "
            required
          />

          {/* NOTE: Stock Quantity */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity}
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md "
            required
          />

          {/* NOTE: RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating}
            className="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md "
            required
          />

          {/* NOTE: ACTIONS */}
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 " >Create</button>
          <button type="button" onClick={onClose} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 " >Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateProductModal
