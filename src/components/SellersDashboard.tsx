'use client';

import { useEffect, useState } from 'react';
import NewProductsForm from '@/app/ui/sellers/NewProductsForm';
import Link from 'next/link';
import Image from 'next/image';
import { Pencil, Trash2, Plus, Package, TrendingUp, DollarSign } from 'lucide-react';

type Product = {
  id: number;
  title: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string | null;
  created_at?: string;
};

type Stats = {
  totalProducts: number;
  activeListings: number;
  totalValue: number;
};

export default function SellersDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats>({ totalProducts: 0, activeListings: 0, totalValue: 0 });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'add'>('overview');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?limit=100');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      const allProducts = data.products || [];
      
      setProducts(allProducts);
      
      // Calculate stats
      const totalProducts = allProducts.length;
      const activeListings = allProducts.filter((p: Product) => p.stock > 0).length;
      const totalValue = allProducts.reduce((sum: number, p: Product) => sum + (p.price * p.stock), 0);
      
      setStats({ totalProducts, activeListings, totalValue });
    } catch (error) {
      console.error('Error loading products:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        loadProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#F5F5F5' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: '#5C4A3A' }}>
                Seller Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your artisan products and inventory
              </p>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/products"
                className="px-4 py-2 rounded-md border transition-colors"
                style={{ 
                  borderColor: '#8B6F47',
                  color: '#8B6F47'
                }}
              >
                View Store
              </Link>
              <button
                onClick={() => setActiveTab('add')}
                className="px-4 py-2 rounded-md text-white transition-colors flex items-center gap-2"
                style={{ backgroundColor: '#8B6F47' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5C4A3A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8B6F47'}
              >
                <Plus size={18} />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#5C4A3A' }}>
                Total Products
              </h3>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F9F7F4' }}>
                <Package size={24} style={{ color: '#8B6F47' }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#8B6F47' }}>
              {stats.totalProducts}
            </p>
            <p className="text-sm text-gray-500 mt-1">Products listed</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#5C4A3A' }}>
                Active Listings
              </h3>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F9F7F4' }}>
                <TrendingUp size={24} style={{ color: '#8B6F47' }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#8B6F47' }}>
              {stats.activeListings}
            </p>
            <p className="text-sm text-gray-500 mt-1">Currently in stock</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#5C4A3A' }}>
                Inventory Value
              </h3>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#F9F7F4' }}>
                <DollarSign size={24} style={{ color: '#8B6F47' }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: '#8B6F47' }}>
              ${stats.totalValue.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total stock value</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 p-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                  activeTab === 'overview' ? '' : 'hover:bg-gray-50'
                }`}
                style={activeTab === 'overview' ? {
                  backgroundColor: '#F9F7F4',
                  color: '#5C4A3A',
                  borderBottom: '3px solid #8B6F47'
                } : { color: '#6B7280' }}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                  activeTab === 'products' ? '' : 'hover:bg-gray-50'
                }`}
                style={activeTab === 'products' ? {
                  backgroundColor: '#F9F7F4',
                  color: '#5C4A3A',
                  borderBottom: '3px solid #8B6F47'
                } : { color: '#6B7280' }}
              >
                Manage Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`px-6 py-3 font-semibold rounded-t-lg transition-colors ${
                  activeTab === 'add' ? '' : 'hover:bg-gray-50'
                }`}
                style={activeTab === 'add' ? {
                  backgroundColor: '#F9F7F4',
                  color: '#5C4A3A',
                  borderBottom: '3px solid #8B6F47'
                } : { color: '#6B7280' }}
              >
                Add New
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#5C4A3A' }}>
                  Recent Products
                </h2>
                {loading ? (
                  <p className="text-gray-600">Loading...</p>
                ) : products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">No products yet</p>
                    <button
                      onClick={() => setActiveTab('add')}
                      className="px-6 py-3 rounded-md text-white font-semibold"
                      style={{ backgroundColor: '#8B6F47' }}
                    >
                      Add Your First Product
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.slice(0, 6).map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                        {product.image_url && (
                          <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={product.image_url}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <h3 className="font-semibold mb-2 line-clamp-1" style={{ color: '#5C4A3A' }}>
                          {product.title}
                        </h3>
                        <div className="flex justify-between items-center text-sm mb-3">
                          <span className="font-bold" style={{ color: '#8B6F47' }}>
                            ${product.price.toFixed(2)}
                          </span>
                          <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/products/${product.id}`}
                            className="flex-1 text-center px-3 py-2 rounded-md text-sm border transition-colors"
                            style={{ borderColor: '#8B6F47', color: '#8B6F47' }}
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-2 rounded-md text-sm text-red-600 border border-red-300 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Products Management Tab */}
            {activeTab === 'products' && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#5C4A3A' }}>
                  All Products
                </h2>
                {loading ? (
                  <p className="text-gray-600">Loading...</p>
                ) : products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No products to manage</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{ backgroundColor: '#F9F7F4' }}>
                          <th className="text-left p-3 font-semibold" style={{ color: '#5C4A3A' }}>Product</th>
                          <th className="text-left p-3 font-semibold" style={{ color: '#5C4A3A' }}>Price</th>
                          <th className="text-left p-3 font-semibold" style={{ color: '#5C4A3A' }}>Stock</th>
                          <th className="text-left p-3 font-semibold" style={{ color: '#5C4A3A' }}>Status</th>
                          <th className="text-right p-3 font-semibold" style={{ color: '#5C4A3A' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                {product.image_url && (
                                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image
                                      src={product.image_url}
                                      alt={product.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium" style={{ color: '#5C4A3A' }}>{product.title}</p>
                                  {product.description && (
                                    <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-3 font-semibold" style={{ color: '#8B6F47' }}>
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="p-3">{product.stock}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.stock > 0 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex justify-end gap-2">
                                <Link
                                  href={`/products/${product.id}`}
                                  className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                                  title="View product"
                                >
                                  <Pencil size={18} style={{ color: '#8B6F47' }} />
                                </Link>
                                <button
                                  onClick={() => handleDelete(product.id)}
                                  className="p-2 rounded-md hover:bg-red-50 transition-colors"
                                  title="Delete product"
                                >
                                  <Trash2 size={18} className="text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Add New Product Tab */}
            {activeTab === 'add' && (
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#5C4A3A' }}>
                  Add New Product
                </h2>
                <NewProductsForm onSuccess={() => {
                  loadProducts();
                  setActiveTab('products');
                }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
