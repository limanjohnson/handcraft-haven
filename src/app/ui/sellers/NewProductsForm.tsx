'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';

type NewProductsFormProps = {
    onSuccess?: () => void;
};

export default function NewProductsForm({ onSuccess }: NewProductsFormProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setSelectedFile(file);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const title = String(formData.get('productName') ?? '').trim();
        const description = String(formData.get('description') ?? '').trim();
        const price = Number(formData.get('price') ?? 0);
        const stock = Number(formData.get('stock') ?? 0);

        if (!title || !Number.isFinite(price)) {
            setError('Please provide a product name and a valid price.');
            setLoading(false);
            return;
        }

        // Optional: upload image to a host first and set image_url
        const payload = {
            title,
            description: description || null,
            price,
            stock,
            category: null,
            image_url: null,
            artisanId: 1 // TODO: Get from authenticated user
        };

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'Failed to create product');
            }
            setSuccess('Product created successfully!');
            form.reset();
            setSelectedFile(null);
            
            // Call onSuccess callback if provided
            if (onSuccess) {
                setTimeout(() => onSuccess(), 1500);
            }
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form 
                className="max-w-[1100px] mx-auto p-6 rounded-lg grid gap-5 grid-cols-[2fr_1fr]"
                onSubmit={handleSubmit}
                style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <h2 className="col-span-2 text-2xl font-bold mb-2" style={{ color: '#5C4A3A' }}>
                    Add New Product
                </h2>

                {/* Section 1 - General Information */}
                <div className="grid col-span-1 p-6 rounded-lg" style={{ backgroundColor: '#F9F7F4' }}>
                    <h3 className="font-semibold mb-4 text-lg" style={{ color: '#5C4A3A' }}>
                        General Information
                    </h3>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block font-medium mb-2" style={{ color: '#5C4A3A' }}>
                            Product Name *
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                            style={{ 
                                backgroundColor: 'white',
                                color: '#5C4A3A'
                            }}
                            onFocus={(e) => e.target.style.setProperty('--tw-ring-color', '#8B6F47')}
                            type="text"
                            id="productName"
                            name="productName"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-medium mb-2" style={{ color: '#5C4A3A' }}>
                            Description
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                            style={{ 
                                backgroundColor: 'white',
                                color: '#5C4A3A',
                                minHeight: '120px'
                            }}
                            onFocus={(e) => e.target.style.setProperty('--tw-ring-color', '#8B6F47')}
                            id="description"
                            name="description"
                        ></textarea>
                    </div>
                </div>

                {/* Section 2 - Price and Stock */}
                <div className="grid gap-4 grid-cols-2 col-span-2 p-6 rounded-lg" style={{ backgroundColor: '#F9F7F4' }}>
                    <h3 className="col-span-2 font-semibold mb-2 text-lg" style={{ color: '#5C4A3A' }}>
                        Price and Stock
                    </h3>
                    <div>
                        <label htmlFor="price" className="block font-medium mb-2" style={{ color: '#5C4A3A' }}>
                            Price ($) *
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                            style={{ 
                                backgroundColor: 'white',
                                color: '#5C4A3A'
                            }}
                            onFocus={(e) => e.target.style.setProperty('--tw-ring-color', '#8B6F47')}
                            type="number"
                            id="price"
                            name="price"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block font-medium mb-2" style={{ color: '#5C4A3A' }}>
                            Stock Quantity
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                            style={{ 
                                backgroundColor: 'white',
                                color: '#5C4A3A'
                            }}
                            onFocus={(e) => e.target.style.setProperty('--tw-ring-color', '#8B6F47')}
                            type="number"
                            id="stock"
                            name="stock"
                            min="0"
                            defaultValue="0"
                        />
                    </div>
                </div>

                {/* Section 3 - Image Upload and Submit */}
                <div 
                    className="flex flex-col justify-between p-6 rounded-lg col-start-2 row-span-1 row-start-2"
                    style={{ backgroundColor: '#F9F7F4' }}
                >
                    <div className="mb-4">
                        <label htmlFor="image" className="block font-medium mb-2" style={{ color: '#5C4A3A' }}>
                            Product Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            className="w-full text-sm"
                            style={{ color: '#5C4A3A' }}
                            onChange={handleFileChange}
                        />
                        {selectedFile && (
                            <p className="text-sm mt-2" style={{ color: '#8B6F47' }}>
                                Selected: {selectedFile.name}
                            </p>
                        )}
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full px-6 py-3 text-white rounded-md font-semibold transition-all"
                        style={{ 
                            backgroundColor: loading ? '#D4C5A9' : '#8B6F47',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#5C4A3A')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#8B6F47')}
                    >
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>

                {/* Feedback Messages */}
                {(error || success) && (
                    <div className="col-span-2 mt-2">
                        {error && (
                            <div className="p-4 rounded-md" style={{ backgroundColor: '#FEE', color: '#C00' }}>
                                <p className="font-medium">❌ {error}</p>
                            </div>
                        )}
                        {success && (
                            <div className="p-4 rounded-md" style={{ backgroundColor: '#EFE', color: '#070' }}>
                                <p className="font-medium">✅ {success}</p>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
}
