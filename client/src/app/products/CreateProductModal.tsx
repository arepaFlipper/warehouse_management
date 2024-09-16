import { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
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
    onCreate(formData);
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
        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
    </div>
  )
}

export default CreateProductModal
