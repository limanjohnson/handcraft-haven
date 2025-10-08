-- Migration: Add image_url columns to artisans and products tables
-- Run this if your database doesn't already have these columns

-- Add image_url column to artisans table
ALTER TABLE artisans 
ADD COLUMN IF NOT EXISTS image_url text;

-- Add image_url column to products table (if not exists)
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS image_url text;
