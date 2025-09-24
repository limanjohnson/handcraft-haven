'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './NewProductsForm.module.css';

export default function NewProductsForm() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setSelectedFile(file);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission logic here
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
                </div>
            </form>
        </div>
    );
}