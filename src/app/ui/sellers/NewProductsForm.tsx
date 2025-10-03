'use client';
import React from 'react';

export default function NewProductsForm() {
    return (
        <div>
            <form className="max-w-[1000px] mx-auto p-5 rounded-lg grid gap-4 grid-cols-[2fr_1fr]">
                <h2 className="col-span-2 text-xl font-semibold mb-2">Add New Product</h2>

                {/* Section 1 */}
                <div className="grid col-span-1 p-5 bg-[#f0efef] rounded-md">
                    <h3 className="font-semibold mb-2 dark:text-gray-800">General Information</h3>
                    <div className="mb-3">
                        <label htmlFor="productName" className="block font-medium mb-1 dark:text-gray-800">
                            Product Name
                        </label>
                        <input
                            className=" dark:text-gray-800 w-full h-6 border-none rounded-md bg-[#e3e3e3] mb-2 focus:outline focus:outline-2 focus:outline-[#818181]"
                            type="text"
                            id="productName"
                            name="productName"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-medium mb-1 dark:text-gray-800">
                            Description
                        </label>
                        <textarea
                            className="dark:text-gray-800 w-full h-24 border-none rounded-md bg-[#e3e3e3] mb-2 focus:outline focus:outline-2 focus:outline-[#818181]"
                            id="description"
                            name="description"
                        ></textarea>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="dark:text-gray-800 grid gap-4 grid-cols-2 col-span-2 p-5 bg-[#f0efef] rounded-md">
                    <h3 className="col-span-2 font-semibold mb-2">Price and Stock</h3>
                    <div>
                        <label htmlFor="price" className="block font-medium mb-1 dark:text-gray-800">
                            Price
                        </label>
                        <input
                            className="w-full h-6 border-none rounded-md bg-[#e3e3e3] mb-2 focus:outline focus:outline-2 focus:outline-[#818181]"
                            type="number"
                            id="price"
                            name="price"
                            step="0.01"
                        />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block font-medium mb-1 dark:text-gray-800">
                            Stock
                        </label>
                        <input
                            className="dark:text-gray-800 w-full h-6 border-none rounded-md bg-[#e3e3e3] mb-2 focus:outline focus:outline-2 focus:outline-[#818181]"
                            type="number"
                            id="stock"
                            name="stock"
                        />
                    </div>
                </div>

                {/* Section 3 */}
                <div className="flex flex-col justify-between p-5 bg-[#f0efef] rounded-md col-start-2 row-span-1 row-start-2 dark:text-gray-800">
                    <label htmlFor="image" className="font-medium mb-2">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="w-full text-sm"
                    />
                </div>
            </form>
        </div>
    );
}
