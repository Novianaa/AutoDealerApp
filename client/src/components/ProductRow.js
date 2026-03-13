import { memo, useCallback } from "react";

const ProductRow = memo(({ product, onEdit, onDelete }) => {
  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(value);
  }, []);

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{product.uuid}</td>
      <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{product.brand}</td>
      <td className="px-6 py-4 text-sm text-gray-700">{product.category}</td>
      <td className="px-6 py-4 text-sm">
        <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${product.stock > 0
            ? "bg-gray-200 text-gray-800"
            : "bg-red-200 text-red-800"
          }`}>
          {product.stock}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 font-semibold">
        {formatCurrency(product.price)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
        {product.desc}
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 px-3 py-1 rounded transition text-xs font-semibold"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.uuid)}
            className="text-red-600 hover:text-red-800 hover:bg-red-100 px-3 py-1 rounded transition text-xs font-semibold"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
});

export default ProductRow;