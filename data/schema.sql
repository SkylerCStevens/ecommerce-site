DROP DATABASE IF EXISTS hummingbird_guitars_db;

CREATE DATABASE hummingbird_guitars_db;
USE hummingbird_guitars_db;

CREATE TABLE brands
(
            brand_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
          brand_name VARCHAR(100) NOT NULL,
           brand_rep VARCHAR(100),
       supplier_name VARCHAR(100),
    supplier_address VARCHAR(100)
);

CREATE TABLE prices
(
    price_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
       price DECIMAL(7,2) NOT NULL
);

CREATE TABLE products
(
          product_id INT AUTO_INCREMENT NOT NULL,
        product_name VARCHAR(50) NOT NULL,
             img_url VARCHAR(255),
             img_alt VARCHAR(120),
         guitar_type VARCHAR(25),
     product_details VARCHAR(120),
            quantity INT NOT NULL,
            brand_id INT,
		    price_id INT,
             PRIMARY KEY(product_id),
             FOREIGN KEY(brand_id) REFERENCES brands(brand_id),
             FOREIGN KEY(brand_id) REFERENCES prices(price_id)
);

CREATE TABLE contacts
(
       contact_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        firstname VARCHAR(100) NOT NULL,
         lastname VARCHAR(100) NOT NULL,
    email_address VARCHAR(100) NOT NULL,
     user_message VARCHAR(255) NOT NULL
);

INSERT INTO contacts (firstname, lastname, email_address, user_message)
VALUES ("John", "Deer", "jdeer@johndeer.com", "You should check out schecter guitars! They're my favorite!"),
       ("Gary", "Gills", "ggills@this.com", "Do you carry any of the SUPREME stratocasters?"),
       ("Henry", "Fields", "hfields@that.com", "You don't have enough sales! Your guitars are too expensive!");

INSERT INTO prices (price)
VALUES (119.99),
       (134.99), 
       (199.99),
       (399.99),
       (499.99), 
       (699.99), 
       (739.99),
       (779.99), 
       (924.99),
       (1099.99),
       (1759.99),
       (1799.99),
       (1999.99),
       (2449.99),
       (2499.99),
       (3499.99),
       (5200.00),
       (8999.99),
       (35000.00);

INSERT INTO brands (brand_name, brand_rep, supplier_name, supplier_address)
VALUES ("Fender", "Brad Smith", "Amazing Music Warehouse", "123 Music Street, Los Angeles, Califonia"),
("Squier", "Ryan Air", "Amazing Music Warehouse", "3425 Music Street, Los Angeles, California"),
("Epiphone", "Tommy Yellow", "Flying V Supplier", "12356 Pentatonic Road, San Francisco, California"),
("PRS", "Julia Reed", "Birdsong Warehouses", "2910 Maple Lane, Phoenix, Arizona"),
("Ibanez", "Caden Jefferson", "Amazing Music Warehouse", "123 Music Street, Los Angeles, California"),
("Martin", "David Christopher", "Birdsong Warehouses", "2910 Maple Lane, Phoenix, Arizona"),
("ESP/LTD", "Alex Schneider", "Extreme Speed Warehouse", "4938 Platinum Street, Las Vegas, Nevada"),
("Taylor", "Theodore Steele", "Birdsong Warehouses", "2910 Maple Lane, Phoenix, Arizona"),
("D'angelico", "Macy Huffman", "Birdsong Warehouses", "2910 Maple Lane, Phoenix, Arizona"),
("Yamaha", "Russell Browning", "Extreme Speed Warehouse", "4938 Platinum Street, Las Vegas, Nevada"),
("Ernie Ball", "Gareth Whittle", "Extreme Speed Warehouse", "4938 Platinum Street, Las Vegas, Nevada");

INSERT INTO products (product_name, img_url, img_alt, guitar_type, product_details, quantity, brand_id, price_id)
VALUES ("Squier Classic Vibe Jaguar", "https://media.sweetwater.com/api/i/b-original__w-300__h-300__bg-ffffff__q-85__ha-1d87d0b1b018b27a__hmac-d52ebb17c7024b6f432093b49376064c24278b12/images/items/350/JagCV70SG.jpg", "Surf Green Jaguar guitar with tortoiseshell pickguard and block inlays", "electric", "Poplar body, Maple Neck, Indian Laurel Fretboard, 2 Single Coil Pickups, Vintage Floating Tremolo", 100, 2, 4),

("PRS S2 Singlecut Semi-Hollow", "https://media.sweetwater.com/api/i/f-webp__b-original__w-300__h-300__bg-ffffff__q-85__ha-8775554beca80595__hmac-c611052dcc1ac5bda37bf6970ab76e506ee5a23d/images/items/350/S2SCHV7SR.jpg.auto.webp", "PRS S2 Singlecut Semi-Hollow with a red flame maple top and traditional bird inlays", "electric", "Semi-Hollow Mahogany Body, Flame Maple Top, Mahogany Neck, Rosewood Fretboard, 2 Humbucker Pickups", 15, 4, 12),

("ESP LTD EC-1000ET Evertune", "https://media.sweetwater.com/api/i/b-original__w-300__h-300__bg-ffffff__q-85__ha-b7814aa779551c7e__hmac-c72de656d5282c23abe4d5bd48b8fa832eafa4ae/images/items/350/LEC1000ETSBK.jpg", "ESP LTD EC-1000 with an Evertune bridge with a black flame maple top", "electric", "Mahogany Body, Flame Maple Top, Mahogany Neck, Ebony Fretboard, 2 Humbucker Pickups, Evertune Bridge", 25, 7, 10),

("Taylor 414ce-R", "https://media.sweetwater.com/api/i/b-original__w-300__h-300__bg-ffffff__q-85__ha-49b25053df8fc674__hmac-beda755c5e76ec96f96d5007c9158d21939b4709/images/items/350/414ceRVCl.jpg", "Taylor 414ce-R acoustic guitar", "acoustic", "Sitka Spruce Top, Rosewood Back and Sides, Mahogany Neck, Ebony Fretboard, Taylor ES2 Electronics", 25, 8, 15),

("Epiphone Les Paul SL", "https://media.sweetwater.com/api/i/b-original__w-300__h-450__bg-ffffff__q-85__ha-d24dc65c05a5f08a__hmac-6647d9550c6738a86da8636a6e0a0b35cf48002b/images/items/750/ENOLTQCH-large.jpg", "Light Blue Epiphone Les Paul SL", "electric", "Poplar Body, Mahogany Neck, Rosewood Fretboard, 2 Single Coil Pickups", 100, 3, 1),

("Fender House Targaryen Strat", "https://images.reverb.com/image/upload/s--CGK-43tw--/f_auto,t_large/v1555647612/sdq5qkxehrl6lp05enyb.jpg", "Targaryen House themed Fender Stratocaster", "electric", "2 Piece Alder Body, Maple Neck, Ebony Fretboard, 3 Single Coil Pickups, Vintge Style Synchcronized Tremolo, Dragon Scale Carved Top, Dragon Sigil on First Fret", 2, 1, 19),

("D'Angelico Premier Gramercy", "https://media.musicarts.com/is/image/MMGS7/L19048000001000-00-600x600.jpg", "Brown Stain D'Angelico acoustic guitar", "acoustic", "Solid Sitka Spruce Top, Laminated Mahogany Back and Sides, Sonokeline Fretboard, Mahogany Neck, D'Angelico Preamp and Pickup", 30, 9, 5),

("Fender American Elite Tele Thinline", "https://media.sweetwater.com/api/i/b-original__w-300__h-300__bg-ffffff__q-85__ha-32c91e6937675cd4__hmac-b5999cec3b0c86f043112a0ee9c1c9e649c2148c/images/items/350/TeleAEThMMIB.jpg", "Light Blue American Elite Fender Thinline tele", "electric", "Semi-Hollow Ash Body, Maple Neck, Maple Fretboard, 2 Singlecoil Pickups", 20, 1, 13),

("Fender Player Stratocaster Plus Top", "https://media.sweetwater.com/api/i/b-original__w-300__h-300__bg-ffffff__q-85__ha-5742423f55917e72__hmac-97faf17b26ec54e62c67b3b027aa22488a0fd242/images/items/350/StratPHSSTPTBS.jpg", "Sunburst flame maple top on Fender Player Stratocaster", "electric", "Alder Body, Flame Maple Top, Maple Neck, Pau Ferro Fretboard, HSS pickups", 30, 1, 6),

("PRS McCarty 594", "https://media.sweetwater.com/api/i/b-original__w-300__h-450__bg-ffffff__q-85__ha-93d39aec38d5ff2f__hmac-c1bc6e6c8319474c1cd535c87cd66da8e0bf9acd/images/items/750/McCty594APBGW-large.jpg", "PRS McCarty 594 with a Black Gold Burst Flame maple top", "electric", "Mahogany Body, Flame Maple Top, Mahogany Neck, Ebony Fretboard, 2 Humbucker Pickups", 10, 4, 17),

("Martin D-45", "https://media.sweetwater.com/api/i/b-original__w-300__h-450__bg-ffffff__q-85__ha-b3a083582170bf5f__hmac-ae510c24ed2041a86585f0e9f70baf451cea14d9/images/items/750/D45Y8-large.jpg", "Martin D-45 with a natural finish", "acoustic", "Sitka Spruce Top, East Indian Rosewood Back and Sides, Mahogany Neck, Ebony Fretboard", 10, 6, 18),

("Fender Jimi Hendrix Strat", "https://media.sweetwater.com/api/i/b-original__w-300__h-300__bg-ffffff__q-85__ha-323332f2c03bff93__hmac-853b4854efec80d3afc82921aa0663ea99eea5a5/images/items/350/STRATJHMUV.jpg", "Jimi Hendrix Signature Ultraviolet Stratocaster", "electric", "Alder Body, Maple Neck, Maple Fretboard, 3 Single Coil Pickups, Reverse Headstock", 15, 1, 9),

("Yamaha JR1", "https://media.sweetwater.com/api/i/f-webp__b-original__w-300__h-450__bg-ffffff__q-85__ha-69bf220e866ab0ff__hmac-127266c1e6327d90b90d915459147952741ad560/images/items/750/JR1-large.jpg.auto.webp", "Sunburst Yamaha JR1 acoustic guitar", "acoustic", "Spruce Top, Meranti Back and Sides, Nato Neck, Rosewood Fretboard", 80, 10, 2),

("Martin 000-17E", "https://media.sweetwater.com/api/i/f-webp__b-original__w-300__h-450__bg-ffffff__q-85__ha-c7487a678f9c34dd__hmac-da898a5df066cc7620cedf180846e6024815dfaf/images/items/750/00017EBS-large.jpg.auto.webp", "Martin 000-17E Black Acoustic Guitar with White Pickguard", "acoustic", "Sitka Spruce Top, Mahogany Back and Sides, Hardwood Neck, Rosewood Fretboard, Martin On-board Electronics", 15, 6, 11),

("Ernie Ball John Petrucci Majesty", "https://media.sweetwater.com/api/i/f-webp__b-original__w-300__h-450__bg-ffffff__q-85__ha-de0501e83130b63b__hmac-3f7b9c8174c37a9e37afe646401a02dbb503bec2/images/items/750/JPM6DR-large.jpg.auto.webp", "Ernie Ball John Petrucci Majesty Dark Brown Flame Maple Top", "electric", "Mahogany Body, Maple Cap, Mahogany Neck, Ebony Fretboard, 2 Humbuckers and 1 Piezo Pickup, Tremolo", 8, 11, 16)