import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import api from "../helpers/axios"
import ProductRow from "../components/ProductRow"
import PageTitle from "../components/PageTitle"

export default function Index() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchBrand, setSearchBrand] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  // removed modal/edit state since we're using dedicated pages
  const [error, setError] = useState("")

  const fetchProducts = useCallback(async (retries = 3) => {
    try {
      setIsLoading(true)
      const response = await api.get("/api/v1/products")
      if (response.data) {
        setProducts(response.data.data.resultProduct)
      }
    } catch (err) {
      console.error(err)
      if (retries > 0 && err.code === 'ECONNABORTED') {
        // Timeout, retry
        setTimeout(() => fetchProducts(retries - 1), 1000)
        return
      }
      setError("Failed to load products")
    } finally {
      setIsLoading(false)
    }
  }, [])
  // Filter products based on search
  useEffect(() => {
    const filtered = products.filter(p =>
      searchBrand === "" || p.brand.toLowerCase().includes(searchBrand.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [products, searchBrand])

  // Initial fetch
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])


  const handleDeleteProduct = useCallback(async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      await api.delete(`/api/v1/product/${id}`)
      setProducts(prev => prev.filter(p => p.uuid !== id))
    } catch (err) {
      setError("Failed to delete product")
    }
  }, [])

  // navigation helper
  const navigate = useNavigate()

  // redirect to form pages
  const goToCreate = useCallback(() => navigate("/product/new"), [navigate])
  const goToEdit = useCallback((product) => navigate(`/product/${product.uuid}/edit`), [navigate])

  return (
    <div className="min-h-screen bg-gray-100">
      <PageTitle title="Home" />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Lewis's Vroom
          </h1>
          <p className="text-gray-600">
            Premium used cars at unbeatable prices
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Controls Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Search */}
            <div className="w-full lg:w-2/3">

              <input
                type="text"
                placeholder="Search Brand... (e.g., Toyota, Daihatsu, etc)"
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Create Button */}
            <div className="w-full lg:w-1/3 flex justify-end">
              <button
                onClick={goToCreate}
                className="w-full lg:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
              >
                + Add Vehicle
              </button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex space-x-4">
                      <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/6"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-gray-600 text-lg">
                  {searchBrand ? "No vehicles match the search." : "No vehicles in inventory yet."}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Brand</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {filteredProducts.map((product) => (
                    <ProductRow key={product.uuid} product={product} onEdit={goToEdit} onDelete={handleDeleteProduct} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Results info */}
        {!isLoading && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} vehicles
          </div>
        )}
      </div>
    </div>
  )
}
