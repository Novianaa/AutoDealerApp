import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PageTitle from "../components/PageTitle"
import api from "../helpers/axios"
import ProductForm from "../components/ProductForm"

export default function ProductFormPage() {
  const { uuid } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // when editing, fetch existing product
  useEffect(() => {
    if (uuid) {
      setIsLoading(true)
      api
        .get(`/api/v1/product/${uuid}`)
        .then((res) => {
          if (res.data && res.data.status === 200) {
            setProduct(res.data.data)
          }
        })
        .catch((err) => {
          console.error(err)
          setError("Failed to load product")
        })
        .finally(() => setIsLoading(false))
    }
  }, [uuid])

  const handleSubmit = async (data) => {
    try {
      if (uuid) {
        const res = await api.put(`/api/v1/product/${uuid}`, data)
        if (res.data) {
          navigate("/")
        }
      } else {
        const res = await api.post("/api/v1/product", data)
        if (res.data) {
          navigate("/")
        }
      }
    } catch (err) {
      console.error(err)
      setError("Failed to save product")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <PageTitle title={uuid ? "Edit Product" : "Create Product"} />
      <div className="bg-white rounded-lg shadow max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            {uuid ? "Edit Vehicle" : "Add Vehicle"}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Cancel
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
