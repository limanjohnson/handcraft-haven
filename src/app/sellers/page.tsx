import NewProductsForm from "../ui/sellers/NewProductsForm";

export default function SellersPage() {
    return (
        <div className="min-h-screen py-12 px-4" style={{ backgroundColor: '#F5F5F5' }}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2" style={{ color: '#5C4A3A' }}>
                        Seller Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Add new products to your artisan collection
                    </p>
                </div>
                <NewProductsForm />
            </div>
        </div>
    );
}