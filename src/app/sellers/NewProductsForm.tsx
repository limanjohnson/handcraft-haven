'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './NewProductsForm.module.css';

export default function NewProductsForm() {
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
            setError('Please provide a title and a valid price.');
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
            image_url: null
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
            setSuccess('Product created!');
            form.reset();
            setSelectedFile(null);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <h2>Add New Product</h2>
                <div className={styles.section1}>
                    <h3 className={styles.sectionHeading}>General Information</h3>
                    <div>
                        <label htmlFor="productName">Product Name</label>
                        <input className={styles.inputs} type="text" id="productName" name="productName" />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea className={`${styles.inputs} ${styles.description}`} id="description" name="description"></textarea>
                    </div>
                </div>
                <div className={styles.section2}>
                    <h3>Price and Stock</h3>
                    <div className={styles.section2child}>
                        <label htmlFor="price">Price</label>
                        <input className={styles.inputs} type="number" id="price" name="price" step="0.01" />
                    </div>
                    <div className={styles.section2child}>
                        <label htmlFor="stock">Stock</label>
                        <input className={styles.inputs} type="number" id="stock" name="stock" />
                    </div>
                </div>
                <div className={styles.section3}>
                    <label htmlFor="image">Upload Image</label>
                    <input type="file" id="image" name="image" accept="image/*" onChange={handleFileChange} />
                    <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save product'}</button>
                    {error && <p style={{ color: 'crimson' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
            </form>
        </div>
    );
}