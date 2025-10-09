# Database Setup Guide

This guide explains how to set up and populate the Handcraft Haven database.

## Prerequisites

- PostgreSQL database instance
- Database connection URL (set in environment variables)

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
POSTGRES_URL=postgresql://username:password@host:port/database?sslmode=require
```

## Setup Steps

### 1. Create Database Schema

Run the schema file to create all necessary tables:

```bash
psql -h your_host -U your_user -d your_database -f lib/schema.sql
```

Or execute the SQL directly in your database client:

```sql
-- Run the contents of lib/schema.sql
```

### 2. Add Image URL Columns (If Needed)

If your database already exists, you may need to add the `image_url` columns:

```bash
psql -h your_host -U your_user -d your_database -f lib/migrations/add_image_url_columns.sql
```

### 3. Seed the Database

Populate the database with sample data:

```bash
psql -h your_host -U your_user -d your_database -f lib/seed.sql
```

Or execute the SQL directly in your database client.

## Database Structure

### Tables

- **artisans** - Craftspeople who create products
  - 10 sample artisans with diverse specialties
  - Includes profile images, bios, and contact information

- **users** - Customer accounts
  - 5 sample users
  - Password hashes are placeholder values

- **products** - Items for sale
  - 50+ diverse products across all artisans
  - Includes images, descriptions, prices, and stock levels

- **ratings** - Product reviews
  - 15 sample reviews with ratings and comments

- **wishlists** - User wishlists
  - Each user has a wishlist

- **wishlist_items** - Products saved to wishlists
  - 15 sample wishlist items

## Sample Data Overview

### Artisan Specialties

1. **Elena Martinez** - Ceramics & Pottery
2. **James Chen** - Woodworking & Furniture
3. **Sofia Rodriguez** - Textiles & Weaving
4. **Marcus Thompson** - Leather Goods
5. **Yuki Tanaka** - Jewelry Design
6. **Isabella Costa** - Glass Blowing
7. **David Kim** - Metal Art
8. **Amara Johnson** - Natural Skincare
9. **Lucas Silva** - Handmade Candles
10. **Emma Wilson** - Paper Crafts & Journals

### Price Range

- Budget: $28 - $75 (soaps, candles, small items)
- Mid-range: $75 - $200 (jewelry, textiles, pottery)
- Premium: $200+ (furniture, large artworks)

### Product Categories

- Home Decor
- Furniture
- Jewelry & Accessories
- Textiles
- Leather Goods
- Skincare & Wellness
- Stationery & Paper Goods

## Verifying the Setup

After running the seed script, you should see:

- **10 Artisans**
- **5 Users**
- **50+ Products**
- **15 Ratings**
- **5 Wishlists**
- **15 Wishlist Items**

The seed script includes a verification query at the end that displays counts for all tables.

## Testing the API

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Get Single Product
```bash
curl http://localhost:3000/api/products?id=1
```

### Get All Artisans
```bash
curl http://localhost:3000/api/artisans
```

### Get Single Artisan with Products
```bash
curl http://localhost:3000/api/artisans?id=1
```

## Notes

- All product images use Unsplash URLs as placeholders
- Artisan profile images use Unsplash URLs as placeholders
- Password hashes are placeholder values - implement proper authentication for production
- Stock levels are set to various amounts to test filtering functionality
- Prices range from $28 to $850 to test price filters

## Resetting the Database

To clear all data and start fresh, the seed script includes a `TRUNCATE` command at the beginning. Simply re-run the seed script:

```bash
psql -h your_host -U your_user -d your_database -f lib/seed.sql
```

## Customization

You can modify the seed data by editing `lib/seed.sql`:

- Add more artisans
- Create additional products
- Add more user reviews
- Customize prices and stock levels
- Change product images and descriptions

## Troubleshooting

### Connection Errors
- Verify your `POSTGRES_URL` environment variable is correct
- Check that your database server is running
- Ensure SSL settings match your database configuration

### Schema Errors
- Make sure to run `schema.sql` before `seed.sql`
- Check that all foreign key constraints are properly defined

### Image Loading Issues
- If images don't load, check your internet connection (images are hosted on Unsplash)
- Consider replacing with local images for production use
