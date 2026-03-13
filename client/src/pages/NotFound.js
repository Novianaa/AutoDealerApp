import PageTitle from "../components/PageTitle"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <PageTitle title="Page Not Found" />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600">Halaman tidak ditemukan</p>
      </div>
    </div>
  );
}