-- Seed data for Handcraft Haven database
-- Run this after creating the schema to populate the database with sample data

-- Clear existing data (optional - comment out if you want to keep existing data)
TRUNCATE TABLE wishlist_items, wishlists, ratings, products, artisans, users RESTART IDENTITY CASCADE;

-- Insert Artisans
INSERT INTO artisans (name, bio, contact_email, image_url) VALUES
('Elena Martinez', 'Master ceramicist specializing in handcrafted pottery and decorative pieces. Over 15 years of experience creating unique, functional art.', 'elena.martinez@craftmail.com', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'),
('James Chen', 'Woodworking artisan crafting custom furniture and home decor. Each piece tells a story through natural wood grain and expert craftsmanship.', 'james.chen@woodworks.com', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'),
('Sofia Rodriguez', 'Textile artist creating handwoven scarves, blankets, and wall hangings using traditional techniques passed down through generations.', 'sofia.rodriguez@textiles.com', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'),
('Marcus Thompson', 'Leatherworker specializing in bags, wallets, and accessories. All items are hand-stitched using premium full-grain leather.', 'marcus.thompson@leathercraft.com', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'),
('Yuki Tanaka', 'Japanese-inspired jewelry designer creating minimalist pieces with precious metals and gemstones. Focus on sustainable sourcing.', 'yuki.tanaka@jewelry.com', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'),
('Isabella Costa', 'Glassblowing artist creating stunning vases, bowls, and decorative sculptures. Each piece is one-of-a-kind.', 'isabella.costa@glassart.com', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop'),
('David Kim', 'Metalsmith crafting contemporary home decor and functional art pieces using copper, brass, and steel.', 'david.kim@metalworks.com', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'),
('Amara Johnson', 'Natural soap and skincare artisan using organic ingredients. Committed to eco-friendly and cruelty-free products.', 'amara.johnson@naturalcare.com', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop'),
('Lucas Silva', 'Candle maker specializing in hand-poured soy candles with unique scent blends. All materials are sustainably sourced.', 'lucas.silva@candlecraft.com', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop'),
('Emma Wilson', 'Paper artist creating handmade journals, cards, and stationery using recycled materials and traditional bookbinding techniques.', 'emma.wilson@papercraft.com', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop');

-- Insert Users
INSERT INTO users (name, email, password_hash) VALUES
('John Doe', 'john.doe@email.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ'),
('Jane Smith', 'jane.smith@email.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ'),
('Michael Brown', 'michael.brown@email.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ'),
('Sarah Davis', 'sarah.davis@email.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ'),
('Robert Miller', 'robert.miller@email.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJ');

-- Insert Products

-- Elena Martinez's Ceramics (artisan_id: 1)
INSERT INTO products (artisan_id, title, description, price, stock, image_url) VALUES
(1, 'Handcrafted Ceramic Vase', 'Beautiful ceramic vase with unique glaze patterns. Perfect for fresh or dried flowers. Each piece is one-of-a-kind.', 78.50, 12, 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&h=600&fit=crop'),
(1, 'Artisan Coffee Mug Set', 'Set of 4 handmade coffee mugs with comfortable handles. Dishwasher and microwave safe.', 65.00, 8, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=600&fit=crop'),
(1, 'Decorative Pottery Bowl', 'Large decorative bowl perfect for fruit display or as a centerpiece. Hand-thrown on the pottery wheel.', 95.00, 5, 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=600&fit=crop'),
(1, 'Ceramic Planter Set', 'Set of 3 ceramic planters in varying sizes. Drainage holes included. Perfect for succulents and small plants.', 55.00, 15, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop');

-- James Chen's Woodwork (artisan_id: 2)
INSERT INTO products (artisan_id, title, description, price, stock, image_url) VALUES
(2, 'Walnut Cutting Board', 'Premium walnut cutting board with juice groove. Food-safe mineral oil finish. 18" x 12" size.', 125.00, 10, 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&h=600&fit=crop'),
(2, 'Handcrafted Oak Bookshelf', 'Solid oak bookshelf with 5 shelves. Dimensions: 72"H x 36"W x 12"D. Custom staining available.', 450.00, 3, 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=600&fit=crop'),
(2, 'Wooden Phone Stand', 'Minimalist phone stand carved from cherry wood. Fits all smartphone sizes. Perfect desk accessory.', 35.00, 20, 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800&h=600&fit=crop'),
(2, 'Live Edge Coffee Table', 'Stunning coffee table featuring natural live edge. Made from reclaimed maple. Each piece is unique.', 850.00, 2, 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&h=600&fit=crop'),
(2, 'Wooden Bowl Set', 'Set of 3 hand-turned wooden bowls in various sizes. Perfect for salads or serving. Food-safe finish.', 85.00, 7, 'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&h=600&fit=crop');

-- Sofia Rodriguez's Textiles (artisan_id: 3)
INSERT INTO products (artisan_id, title, description, price, stock, image_url) VALUES
(3, 'Handwoven Wool Scarf', 'Luxurious handwoven scarf made from 100% merino wool. Soft and warm. Multiple color options available.', 68.00, 18, 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=600&fit=crop'),
(3, 'Bohemian Wall Hanging', 'Large macramé wall hanging perfect for adding texture to any room. 36" length. Made with natural cotton rope.', 145.00, 6, 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&h=600&fit=crop'),
(3, 'Throw Blanket - Geometric Pattern', 'Handwoven throw blanket with modern geometric pattern. 50" x 60". Machine washable wool blend.', 185.00, 4, 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop'),
(3, 'Cotton Table Runner', 'Hand-loomed table runner with traditional patterns. 72" long. Perfect for dining table or console.', 45.00, 12, 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&h=600&fit=crop');

-- Marcus Thompson's Leather Goods (artisan_id: 4)
INSERT INTO products (artisan_id, title, description, price, stock, image_url) VALUES
(4, 'Leather Messenger Bag', 'Full-grain leather messenger bag with adjustable strap. Multiple pockets. Fits 15" laptop. Ages beautifully.', 285.00, 8, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=600&fit=crop'),
(4, 'Minimalist Leather Wallet', 'Slim bifold wallet with 6 card slots. Premium vegetable-tanned leather. RFID protection optional.', 75.00, 25, 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=600&fit=crop'),
(4, 'Leather Journal Cover', 'Handstitched leather cover for standard notebooks. Refillable. Available in multiple colors. Personalization available.', 95.00, 15, 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=600&fit=crop'),
(4, 'Leather Belt - Classic', 'Hand-cut leather belt with solid brass buckle. 1.5" width. Available in all sizes. Built to last decades.', 65.00, 30, 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=800&h=600&fit=crop'),
(4, 'Leather Tote Bag', 'Spacious leather tote perfect for everyday use. Interior pockets for organization. Reinforced handles.', 225.00, 10, 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=600&fit=crop');

-- Yuki Tanaka's Jewelry (artisan_id: 5)
INSERT INTO products (artisan_id, title, description, price, stock, image_url) VALUES
(5, 'Sterling Silver Necklace', 'Minimalist sterling silver necklace with geometric pendant. 18" chain. Hypoallergenic.', 125.00, 20, 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop'),
(5, 'Gold-Filled Earrings', '14k gold-filled dangle earrings with freshwater pearls. Lightweight and elegant. Perfect for everyday wear.', 85.00, 22, 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop'),
(5, 'Handcrafted Ring Set', 'Set of 3 stacking rings in mixed metals. Sterling silver, copper, and brass. Adjustable sizing.', 95.00, 18, 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop'),
(5, 'Gemstone Bracelet', 'Delicate bracelet featuring ethically-sourced gemstones. Choice of amethyst, citrine, or rose quartz.', 78.00, 15, 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop');

-- Isabella Costa's Glass Art (artisan_id: 6)
INSERT INTO products (artisan_id, title, description, price, stock, image_url) VALUES
(6, 'Hand-Blown Glass Vase', 'Stunning hand-blown glass vase with swirling colors. Each piece is unique. 12" height.', 165.00, 7, 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=600&fit=crop'),
(6, 'Glass Bowl - Ocean Blue', 'Beautiful decorative glass bowl in ocean blue tones. Perfect centerpiece. 10" diameter.', 135.00, 5, 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=600&fit=crop'),
(6, 'Art Glass Paperweight', 'Collectible glass paperweight with internal bubble design. Makes a unique desk accessory or gift.', 55.00, 12, 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop');

-- David Kim's Metal Art (artisan_id: 7)
INSERT INTO products (artisan_id, title, description, price, stock, image_url) VALUES
(7, 'Copper Wall Art', 'Contemporary copper wall sculpture with geometric design. 24" x 18". Develops unique patina over time.', 245.00, 6, 'https://images.unsplash.com/photo-1513519245088-0e3ad4e6e4f1?w=800&h=600&fit=crop'),
(7, 'Brass Candle Holders', 'Set of 3 handcrafted brass candle holders in varying heights. Modern minimalist design.', 115.00, 10, 'https://images.unsplash.com/photo-1602874801006-3e55ccfad6d5?w=800&h=600&fit=crop'),
(7, 'Metal Coat Rack', 'Industrial-style coat rack made from steel pipe. Wall-mounted with 5 hooks. Easy installation.', 95.00, 8, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop');

-- Amara Johnson's Natural Products (artisan_id: 8)
INSERT INTO products (artisan_id, title, description, price, stock, image_url) VALUES
(8, 'Organic Soap Set', 'Set of 6 handmade soaps with essential oils. Lavender, peppermint, eucalyptus, and more. All natural ingredients.', 42.00, 35, 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&h=600&fit=crop'),
(8, 'Natural Face Cream', 'Moisturizing face cream with organic shea butter and jojoba oil. Suitable for all skin types. 2 oz jar.', 38.00, 28, 'https://images.unsplash.com/photo-1556228841-75a6c2f8e8e8?w=800&h=600&fit=crop'),
(8, 'Bath Bomb Collection', 'Set of 8 colorful bath bombs with natural ingredients and essential oils. Makes bath time luxurious.', 35.00, 40, 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=600&fit=crop'),
(8, 'Body Butter - Lavender', 'Rich, creamy body butter with organic coconut oil and lavender essential oil. 8 oz container.', 32.00, 25, 'https://images.unsplash.com/photo-1571875257727-256c39da42af?w=800&h=600&fit=crop');

-- Lucas Silva's Candles (artisan_id: 9)
INSERT INTO products (artisan_id, title, description, price, stock, image_url) VALUES
(9, 'Soy Candle - Vanilla Bean', 'Hand-poured soy candle with natural vanilla bean scent. 8 oz. Burns for 40+ hours. Lead-free cotton wick.', 28.00, 45, 'https://images.unsplash.com/photo-1602874801006-3e55ccfad6d5?w=800&h=600&fit=crop'),
(9, 'Scented Candle Set', 'Set of 3 mini candles in complementary scents: cedar wood, cinnamon, and amber. Perfect gift set.', 45.00, 30, 'https://images.unsplash.com/photo-1583792551550-59e5bb42b7c5?w=800&h=600&fit=crop'),
(9, 'Large Soy Candle - Ocean Breeze', 'Premium 16 oz soy candle with fresh ocean breeze scent. Perfect for living spaces. 80+ hour burn time.', 48.00, 20, 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=600&fit=crop'),
(9, 'Candle - Lavender Dreams', 'Relaxing lavender-scented candle in elegant glass jar. Natural soy wax. Great for bedrooms.', 32.00, 35, 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=600&fit=crop');

-- Emma Wilson's Paper Crafts (artisan_id: 10)
INSERT INTO products (artisan_id, title, description, price, stock, image_url) VALUES
(10, 'Handmade Leather Journal', 'Hand-bound journal with recycled paper. 200 pages. Leather cover with vintage closure. A5 size.', 65.00, 15, 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=600&fit=crop'),
(10, 'Greeting Card Set', 'Set of 12 handmade greeting cards with envelopes. Blank inside. Made from recycled paper with pressed flowers.', 28.00, 25, 'https://images.unsplash.com/photo-1612789018190-c2108c4f089d?w=800&h=600&fit=crop'),
(10, 'Art Print Collection', 'Set of 3 original watercolor prints on handmade paper. 8" x 10". Unframed. Nature-inspired designs.', 55.00, 20, 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop'),
(10, 'Handmade Notebook Set', 'Set of 3 small notebooks with different cover designs. Perfect for travel or journaling. 100 pages each.', 35.00, 30, 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop');

-- Insert Ratings (some products have customer reviews)
INSERT INTO ratings (user_id, product_id, rating, comment) VALUES
(1, 1, 5, 'Absolutely beautiful vase! The craftsmanship is incredible and it looks amazing in my living room.'),
(2, 1, 5, 'Worth every penny. The glaze is stunning and unique.'),
(1, 6, 5, 'The walnut cutting board is gorgeous and functional. Love the quality!'),
(3, 6, 4, 'Beautiful board, just wish it was a bit larger. Still very happy with it.'),
(2, 11, 5, 'This scarf is so soft and warm. The weaving is perfect. Highly recommend!'),
(4, 16, 5, 'Best messenger bag I''ve ever owned. The leather quality is outstanding.'),
(5, 16, 5, 'Love this bag! Perfect size for work and the leather smells amazing.'),
(1, 21, 5, 'Beautiful, minimalist design. Exactly what I was looking for.'),
(3, 31, 4, 'Great soap set! Smells wonderful and lasts a long time. Skin feels great.'),
(4, 35, 5, 'These candles smell incredible and burn evenly. Will definitely buy more.'),
(2, 39, 5, 'Beautiful journal. The paper quality is excellent for fountain pens.'),
(5, 2, 5, 'These mugs are perfect! Great size and they hold heat well.'),
(1, 17, 5, 'This wallet is perfection. Slim, well-made, and beautiful leather.'),
(3, 26, 4, 'Beautiful glass bowl. Slightly smaller than expected but still lovely.'),
(4, 7, 5, 'Amazing coffee table! The live edge is stunning. Worth the investment.');

-- Insert Wishlists
INSERT INTO wishlists (user_id) VALUES
(1),
(2),
(3),
(4),
(5);

-- Insert Wishlist Items (users saving items they like)
INSERT INTO wishlist_items (wishlist_id, product_id) VALUES
(1, 8),  -- User 1 wants the live edge coffee table
(1, 15), -- User 1 wants the bohemian wall hanging
(1, 26), -- User 1 wants the glass bowl
(2, 6),  -- User 2 wants the cutting board
(2, 19), -- User 2 wants the leather journal
(2, 35), -- User 2 wants the candle set
(3, 1),  -- User 3 wants the ceramic vase
(3, 16), -- User 3 wants the messenger bag
(3, 21), -- User 3 wants the necklace
(4, 11), -- User 4 wants the wool scarf
(4, 31), -- User 4 wants the soap set
(4, 39), -- User 4 wants the handmade journal
(5, 2),  -- User 5 wants the mug set
(5, 17), -- User 5 wants the minimalist wallet
(5, 28); -- User 5 wants the brass candle holders

-- Display counts for verification
SELECT 'Artisans' as table_name, COUNT(*) as count FROM artisans
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'Ratings', COUNT(*) FROM ratings
UNION ALL
SELECT 'Wishlists', COUNT(*) FROM wishlists
UNION ALL
SELECT 'Wishlist Items', COUNT(*) FROM wishlist_items;
