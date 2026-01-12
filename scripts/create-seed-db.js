const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

async function createSeedDatabase() {
  console.log('Creating seed database...');
  
  // Initialize SQL.js
  const SQL = await initSqlJs({
    locateFile: file => path.join(__dirname, '../node_modules/sql.js/dist', file)
  });

  // Create new database
  const db = new SQL.Database();

  // Create tables
  db.run(`
    CREATE TABLE personas ( 
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        screensaver_path TEXT,
        theme_color TEXT
    );

    CREATE TABLE products (
        id TEXT PRIMARY KEY,
        model_name TEXT NOT NULL,
        persona_id TEXT,
        hero_description TEXT, 
        is_featured INTEGER DEFAULT 0,
        url TEXT,
        FOREIGN KEY (persona_id) REFERENCES personas(id)
    );

    CREATE TABLE product_media (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT,
        media_type TEXT,
        file_path TEXT NOT NULL,
        display_order INTEGER DEFAULT 0,
        is_hero_media INTEGER DEFAULT 0,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE product_specs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id TEXT,
        label TEXT,
        human_value TEXT,
        tech_value TEXT,
        icon_name TEXT,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS pdp_sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT,
      section_type TEXT,    -- 'hero', 'bento', 'feature-split'
      title TEXT,
      description TEXT,
      media_path TEXT,      -- Local path from your ASSETS folder
      layout_config TEXT,   -- JSON: { "span": "large", "align": "right", "theme": "dark" }
      display_order INTEGER,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);

  db.run('PRAGMA foreign_keys = ON');

  // Insert personas
  console.log('Inserting personas...');
  const personas = [
    ['gaming', 'Gaming', 'media/screensavers/gaming_helix.mp4', '#FF4500'],
    ['creator', 'Creator', 'media/screensavers/creator_helix.mp4', '#9333EA'],
    ['office', 'Office', 'media/screensavers/office_helix.mp4', '#2563EB'],
    ['student', 'Student', 'media/screensavers/student_helix.mp4', '#10B981']
  ];
  personas.forEach(p => {
    db.run(`INSERT INTO personas (id, name, screensaver_path, theme_color) VALUES (?, ?, ?, ?)`, p);
  });
  console.log(`✓ Inserted ${personas.length} personas`);

  // Insert products
  console.log('Inserting products...');
  const allProducts = [
    ['omen-17', 'OMEN 17', 'gaming', 'Desktop-class power in a portable form factor.', "https://victus17.vercel.app/"],
    ['omen-16', 'OMEN 16', 'gaming', 'The perfectly balanced engine for competitive play.', "https://victus17.vercel.app/"],
    ['victus-16', 'Victus 16', 'gaming', 'Serious gaming performance at an accessible value.', "https://victus17.vercel.app//"],
    ['spectre-16', 'Spectre x360 16', 'creator', 'A 16-inch canvas for your biggest creative ideas.', "https://pavillion-plus14oled.vercel.app/"],
    ['envy-16', 'Envy 16', 'creator', 'Power and precision for editing 4K video on the go.', "https://pavillion-plus14oled.vercel.app/"],
    ['pavilion-plus-14-oled', 'Pavilion Plus 14 OLED', 'creator', 'Compact creator power with a stunning OLED display.', "https://pavillion-plus14oled.vercel.app/"],
    ['elitebook-840', 'EliteBook 840 G10', 'office', 'The corporate standard for security and performance.', "https://victus17.vercel.app/"],
    ['probook-450', 'ProBook 450 G10', 'office', 'Essential business power for the modern professional.', "https://pavillion-plus14oled.vercel.app/"],
    ['elite-x360', 'Elite x360 830', 'office', 'Premium flexibility for executive leaders.', "https://victus17.vercel.app/"],
    ['pavilion-14-std', 'Pavilion Plus 14', 'student', 'The all-day companion for lectures and late-night study.', "https://pavillion-plus14oled.vercel.app/"],
    ['pavilion-x360', 'Pavilion x360 14', 'student', 'The versatile laptop for taking notes and streaming movies.', "https://pavillion-plus14oled.vercel.app/"],
    ['hp-laptop-15', 'HP Laptop 15', 'student', 'Affordable, reliable, and ready for every assignment.', "https://pavillion-plus14oled.vercel.app/"]
  ];
  allProducts.forEach(p => {
    db.run(`INSERT INTO products (id, model_name, persona_id, hero_description, url) VALUES (?, ?, ?, ?, ?)`, p);
  });
  console.log(`✓ Inserted ${allProducts.length} products`);

  // Insert specs
  console.log('Inserting specs...');
  const techSpecs = [
    // OMEN 17
    ['omen-17', 'Processor', 'Intel® Core™ i9-13900HX', '24 Cores (8P+16E), up to 5.4 GHz', 'FiCpu'],
    ['omen-17', 'Graphics', 'NVIDIA® GeForce RTX™ 4080', '12 GB GDDR6 Dedicated', 'FiZap'],
    ['omen-17', 'Memory', '32 GB DDR5-5600 MHz', '2 x 16 GB (Upgradable)', 'FiServer'],
    ['omen-17', 'Storage', '2 TB PCIe® Gen4 NVMe™ SSD', '7000 MB/s Read Speed', 'FiHardDrive'],
    ['omen-17', 'Display', '17.3" QHD (2560 x 1440)', '240Hz, 3ms, IPS, 100% sRGB', 'FiMonitor'],
    ['omen-17', 'Cooling', 'OMEN Tempest Cooling', '3-sided venting, 5-way airflow', 'FiWind'],
    ['omen-17', 'Keyboard', 'Optical Mech RGB', 'Per-key RGB, NKRO', 'FiType'],
    ['omen-17', 'Audio', 'Audio by Bang & Olufsen', 'DTS:X® Ultra, Dual Speakers', 'FiHeadphones'],
    ['omen-17', 'Connectivity', 'Wi-Fi 6E AX211', 'Bluetooth® 5.3', 'FiWifi'],
    ['omen-17', 'Ports', '1x Thunderbolt™ 4', '3x USB-A, 1x HDMI 2.1, 1x RJ-45', 'FiLayout'],
    ['omen-17', 'Battery', '83 Wh Li-ion polymer', '330W Smart AC Adapter', 'FiBattery'],
    ['omen-17', 'OS', 'Windows 11 Home', 'High-end Gaming optimized', 'FiCommand'],

    // OMEN 16
    ['omen-16', 'Processor', 'Intel® Core™ i7-13700HX', '16 Cores, up to 5.0 GHz', 'FiCpu'],
    ['omen-16', 'Graphics', 'NVIDIA® GeForce RTX™ 4060', '8 GB GDDR6 Dedicated', 'FiZap'],
    ['omen-16', 'Memory', '16 GB DDR5-4800 MHz', '2 x 8 GB', 'FiServer'],
    ['omen-16', 'Storage', '1 TB PCIe® Gen4 NVMe™ SSD', 'High-speed loading', 'FiHardDrive'],
    ['omen-16', 'Display', '16.1" FHD (1920 x 1080)', '165Hz, 7ms, IPS, Low Blue Light', 'FiMonitor'],
    ['omen-16', 'Thermal', 'Omen Tempest Cooling', 'IR Thermopile Sensor', 'FiWind'],
    ['omen-16', 'Audio', 'Audio by Bang & Olufsen', 'HP Audio Boost', 'FiHeadphones'],
    ['omen-16', 'Webcam', 'HP True Vision 1080p', 'Temporal Noise Reduction', 'FiVideo'],
    ['omen-16', 'Connectivity', 'Wi-Fi 6E (2x2)', 'Bluetooth® 5.3', 'FiWifi'],
    ['omen-16', 'Ports', '1x USB-C® (DisplayPort™)', '3x USB-A, 1x HDMI 2.1, 1x RJ-45', 'FiLayout'],
    ['omen-16', 'Battery', '83 Wh Li-ion polymer', 'Fast Charge (50% in 30 min)', 'FiBattery'],
    ['omen-16', 'OS', 'Windows 11 Home', 'Game Pass Included (1 Month)', 'FiCommand'],

    // Add more specs for other products...
    // (Include all your specs from model.ts here)
     // --- VICTUS 16 ---
    ['victus-16', 'Processor', 'AMD Ryzen™ 7 7840HS', '8 Cores, 16 Threads, AI Engine', 'FiCpu'],
    ['victus-16', 'Graphics', 'NVIDIA® GeForce RTX™ 4050', '6 GB GDDR6 Dedicated', 'FiZap'],
    ['victus-16', 'Memory', '16 GB DDR5-5600 MHz', '2 x 8 GB', 'FiServer'],
    ['victus-16', 'Display', '16.1" FHD (1920 x 1080)', '144Hz, IPS, Micro-edge', 'FiMonitor'],
    ['victus-16', 'Design', 'Performance Blue', 'Paint finish', 'FiDroplet'],
    ['victus-16', 'Keyboard', 'Full-size Backlit', 'Numeric keypad included', 'FiType'],
    ['victus-16', 'Audio', 'Audio by B&O', 'Dual Speakers', 'FiHeadphones'],
    ['victus-16', 'Connectivity', 'Wi-Fi 6E (2x2)', 'Bluetooth® 5.3', 'FiWifi'],
    ['victus-16', 'Ports', '1x USB-C®, 3x USB-A', '1x HDMI 2.1, 1x RJ-45', 'FiLayout'],
    ['victus-16', 'Battery', '70 Wh Li-ion polymer', '230W Smart AC Adapter', 'FiBattery'],
    ['victus-16', 'OS', 'Windows 11 Home', 'OMEN Gaming Hub installed', 'FiCommand'],

    // --- SPECTRE 16 ---
    ['spectre-16', 'Processor', 'Intel® Core™ Ultra 7 155H', '16 Cores, AI Boost NPU', 'FiCpu'],
    ['spectre-16', 'Graphics', 'NVIDIA® GeForce RTX™ 4050', 'Laptop GPU (6 GB)', 'FiZap'],
    ['spectre-16', 'Display', '16" 2.8K (2880 x 1800) OLED', 'Touch, 120Hz, HDR 500, VRR', 'FiEye'],
    ['spectre-16', 'Memory', '32 GB LPDDR5x-6400', 'Onboard (High Bandwidth)', 'FiServer'],
    ['spectre-16', 'Webcam', 'HP Wide Vision 9MP IR', 'Night mode, AI Auto Frame', 'FiVideo'],
    ['spectre-16', 'Audio', 'Poly Studio Quad Speakers', 'DTS:X® Ultra', 'FiHeadphones'],
    ['spectre-16', 'Input', 'HP Rechargeable MPP2.0 Pen', 'Tilt Pen Included', 'FiPenTool'],
    ['spectre-16', 'Connectivity', 'Intel® Wi-Fi 7 BE200', 'Bluetooth® 5.4', 'FiWifi'],
    ['spectre-16', 'Ports', '2x Thunderbolt™ 4', '1x USB-A, 1x HDMI 2.1', 'FiLayout'],
    ['spectre-16', 'Features', 'Haptic Touchpad', 'Walk Away Lock / Wake on Approach', 'FiLock'],
    ['spectre-16', 'Battery', '83 Wh Li-ion polymer', '100W USB-C Adapter', 'FiBattery'],
    ['spectre-16', 'OS', 'Windows 11 Home', 'AI-enhanced creative tools', 'FiCommand'],

    // --- ENVY 16 ---
    ['envy-16', 'Processor', 'Intel® Core™ i9-13900H', '14 Cores, up to 5.4 GHz', 'FiCpu'],
    ['envy-16', 'Graphics', 'NVIDIA® GeForce RTX™ 4060', '8 GB GDDR6', 'FiZap'],
    ['envy-16', 'Display', '16" WQXGA (2560 x 1600)', '120Hz, IPS, 100% sRGB, 400 nits', 'FiMonitor'],
    ['envy-16', 'Storage', '1 TB PCIe® Gen4 NVMe™', 'Performance SSD', 'FiHardDrive'],
    ['envy-16', 'Cooling', 'Vapor Chamber', 'Advanced thermal management', 'FiWind'],
    ['envy-16', 'Audio', 'Bang & Olufsen', 'Quad Speakers', 'FiHeadphones'],
    ['envy-16', 'Connectivity', 'Wi-Fi 6E (2x2)', 'Bluetooth® 5.3', 'FiWifi'],
    ['envy-16', 'Ports', '2x Thunderbolt™ 4', '2x USB-A, 1x HDMI 2.1, MicroSD', 'FiLayout'],
    ['envy-16', 'Webcam', '5MP IR Camera', 'True Vision, Privacy Shutter', 'FiVideo'],
    ['envy-16', 'Battery', '83 Wh Li-ion', 'Up to 10 hours mixed usage', 'FiBattery'],
    ['envy-16', 'OS', 'Windows 11 Home', 'HP QuickDrop included', 'FiCommand'],

    // --- PAVILION PLUS 14 OLED ---
    ['pavilion-plus-14-oled', 'Display', '14" 2.8K (2880 x 1800) OLED', 'IMAX Enhanced, 120Hz, 500 nits', 'FiEye'],
    ['pavilion-plus-14-oled', 'Processor', 'AMD Ryzen™ 7 7840U', '8 Cores, Power Efficient', 'FiCpu'],
    ['pavilion-plus-14-oled', 'Weight', '3.06 lbs (1.38 kg)', 'All-Metal Recycled Chassis', 'FiFeather'],
    ['pavilion-plus-14-oled', 'Memory', '16 GB LPDDR5x-6400', 'Onboard', 'FiServer'],
    ['pavilion-plus-14-oled', 'Graphics', 'AMD Radeon™ 780M', 'Integrated Graphics', 'FiZap'],
    ['pavilion-plus-14-oled', 'Webcam', '5MP IR Wide Vision', 'Temporal Noise Reduction', 'FiVideo'],
    ['pavilion-plus-14-oled', 'Audio', 'Audio by B&O', 'Dual Speakers', 'FiHeadphones'],
    ['pavilion-plus-14-oled', 'Connectivity', 'Wi-Fi 6E', 'Bluetooth® 5.3', 'FiWifi'],
    ['pavilion-plus-14-oled', 'Ports', '2x USB-C® 10Gbps', '2x USB-A, 1x HDMI 2.1', 'FiLayout'],
    ['pavilion-plus-14-oled', 'Battery', '68 Wh Li-ion', 'Up to 13h Video Playback', 'FiBattery'],
    ['pavilion-plus-14-oled', 'OS', 'Windows 11 Home', 'EPEAT® Gold Registered', 'FiGlobe'],

    // --- ELITEBOOK 840 G10 ---
    ['elitebook-840', 'Security', 'HP Wolf Pro Security', 'BIOS protection, Sure Click', 'FiLock'],
    ['elitebook-840', 'Processor', 'Intel® Core™ i7-1365U', 'vPro® Enterprise Enabled', 'FiCpu'],
    ['elitebook-840', 'Display', '14" WUXGA (1920 x 1200)', 'IPS, Anti-glare, 400 nits', 'FiMonitor'],
    ['elitebook-840', 'Memory', '32 GB DDR5-5200', '2 SODIMM Slots (Replaceable)', 'FiServer'],
    ['elitebook-840', 'Webcam', '5MP IR Camera', 'Dual array mics, AI Noise Reduction', 'FiVideo'],
    ['elitebook-840', 'Connectivity', '5G LTE Optional', 'Wi-Fi 6E, NFC', 'FiWifi'],
    ['elitebook-840', 'Audio', 'Audio by Bang & Olufsen', 'Dual stereo speakers', 'FiHeadphones'],
    ['elitebook-840', 'Ports', '2x Thunderbolt™ 4', '2x USB-A, 1x HDMI 2.1, SmartCard', 'FiLayout'],
    ['elitebook-840', 'Biometrics', 'Fingerprint Sensor', 'IR Face Recognition', 'FiLock'],
    ['elitebook-840', 'OS', 'Windows 11 Pro', 'Downgrade rights to Win 10 Pro', 'FiCommand'],

    // --- PROBOOK 450 G10 ---
    ['probook-450', 'Durability', 'MIL-STD 810H Certified', 'Drop, Shock, Dust Resistant', 'FiShield'],
    ['probook-450', 'Processor', 'Intel® Core™ i5-1335U', '10 Cores, Efficient Business Power', 'FiCpu'],
    ['probook-450', 'Display', '15.6" FHD (1920 x 1080)', 'IPS, Narrow Bezel, 250 nits', 'FiMonitor'],
    ['probook-450', 'Upgrade', 'Serviceable Design', 'Tool-less access to RAM/SSD', 'FiTool'],
    ['probook-450', 'Memory', '16 GB DDR4-3200', '2 SODIMM slots', 'FiServer'],
    ['probook-450', 'Storage', '512 GB PCIe® NVMe™', 'Value SSD', 'FiHardDrive'],
    ['probook-450', 'Ports', '1x RJ-45 Ethernet', '1x USB-C®, 3x USB-A, HDMI 2.1', 'FiLayout'],
    ['probook-450', 'Webcam', '720p HD Camera', 'Privacy Shutter', 'FiVideo'],
    ['probook-450', 'Connectivity', 'Wi-Fi 6E', 'Bluetooth® 5.3', 'FiWifi'],
    ['probook-450', 'OS', 'Windows 11 Pro', 'Business Class', 'FiCommand'],

    // --- ELITE x360 830 ---
    ['elite-x360', 'Form Factor', '2-in-1 Convertible', 'Laptop, Tent, Stand, Tablet', 'FiRefreshCw'],
    ['elite-x360', 'Privacy', 'HP Sure View Reflect', 'Instant electronic privacy screen', 'FiEyeOff'],
    ['elite-x360', 'Input', 'Touch & Active Pen', 'Wacom AES 2.0 Support', 'FiPenTool'],
    ['elite-x360', 'Weight', '2.9 lbs (1.3 kg)', 'Magnesium Unibody', 'FiFeather'],
    ['elite-x360', 'Processor', 'Intel® Core™ i7-1355U', '10 Cores, vPro®', 'FiCpu'],
    ['elite-x360', 'Display', '13.3" WUXGA (1920 x 1200)', '1000 nits, Sure View', 'FiEye'],
    ['elite-x360', 'Connectivity', 'Wi-Fi 6E', '4G LTE Advanced Pro (Cat 16)', 'FiWifi'],
    ['elite-x360', 'Audio', 'Audio by Bang & Olufsen', 'AI-based noise reduction', 'FiHeadphones'],
    ['elite-x360', 'Ports', '2x Thunderbolt™ 4', '2x USB-A, HDMI 2.1', 'FiLayout'],
    ['elite-x360', 'OS', 'Windows 11 Pro', 'Enterprise Ready', 'FiCommand'],

    // --- PAVILION 14 PLUS (Student) ---
    ['pavilion-14-std', 'Battery', 'Up to 10h 45m', 'HP Fast Charge (50% in 45m)', 'FiBattery'],
    ['pavilion-14-std', 'Processor', 'Intel® Core™ i3-1315U', '6 Cores, Efficient Performance', 'FiCpu'],
    ['pavilion-14-std', 'Display', '14" FHD (1920 x 1080)', 'IPS, Micro-edge', 'FiMonitor'],
    ['pavilion-14-std', 'Storage', '512 GB NVMe™ SSD', 'Fast boot and file load', 'FiHardDrive'],
    ['pavilion-14-std', 'Audio', 'Audio by B&O', 'Dual Speakers, HP Audio Boost', 'FiHeadphones'],
    ['pavilion-14-std', 'Weight', '3.09 lbs', 'Easy to carry', 'FiFeather'],
    ['pavilion-14-std', 'Connectivity', 'Wi-Fi 6', 'Bluetooth® 5.3', 'FiWifi'],
    ['pavilion-14-std', 'Ports', '1x USB-C®, 2x USB-A', 'HDMI 2.1, Headphone jack', 'FiLayout'],
    ['pavilion-14-std', 'Webcam', 'HP Wide Vision 720p', 'Integrated dual array mics', 'FiVideo'],
    ['pavilion-14-std', 'OS', 'Windows 11 Home in S mode', 'Secure and Fast', 'FiCommand'],

    // --- PAVILION x360 14 ---
    ['pavilion-x360', 'Mode', 'x360 Hinge', 'Note-taking & Streaming modes', 'FiRefreshCw'],
    ['pavilion-x360', 'Display', '14" FHD (1920 x 1080)', 'Multitouch-enabled, Edge-to-edge', 'FiMonitor'],
    ['pavilion-x360', 'Processor', 'Intel® Core™ i5-1335U', '10 Cores, 4.6 GHz Turbo', 'FiCpu'],
    ['pavilion-x360', 'Storage', '512 GB PCIe® NVMe™', 'M.2 SSD', 'FiHardDrive'],
    ['pavilion-x360', 'Connectivity', 'Wi-Fi 6 (2x2)', 'Gigabit speeds for streaming', 'FiWifi'],
    ['pavilion-x360', 'Input', 'HP Rechargeable Pen', 'Magnetic attachment (Optional)', 'FiPenTool'],
    ['pavilion-x360', 'Audio', 'Audio by B&O', 'Dual Speakers', 'FiHeadphones'],
    ['pavilion-x360', 'Ports', '1x USB-C® (Power Delivery)', '2x USB-A, HDMI 2.1', 'FiLayout'],
    ['pavilion-x360', 'Battery', '43 Wh Li-ion', 'Up to 9 hours', 'FiBattery'],
    ['pavilion-x360', 'OS', 'Windows 11 Home', 'Touch optimized', 'FiCommand'],

    // --- HP LAPTOP 15 ---
    ['hp-laptop-15', 'Screen Size', '15.6" Full HD', 'Anti-glare, Micro-edge bezel', 'FiMonitor'],
    ['hp-laptop-15', 'Processor', 'AMD Ryzen™ 5 7520U', 'Reliable Quad-Core performance', 'FiCpu'],
    ['hp-laptop-15', 'Memory', '8 GB LPDDR5-5500', 'Fast onboard RAM', 'FiServer'],
    ['hp-laptop-15', 'Storage', '256 GB SSD', 'Reliable storage', 'FiHardDrive'],
    ['hp-laptop-15', 'Keyboard', 'Full-size with NumPad', 'Integrated numeric keypad', 'FiLayout'],
    ['hp-laptop-15', 'Webcam', 'HP True Vision 720p', 'Privacy shutter', 'FiVideo'],
    ['hp-laptop-15', 'Mic', 'Dual array microphones', 'AI noise reduction', 'FiMic'],
    ['hp-laptop-15', 'Value', 'EPEAT® Gold Registered', 'Ocean-bound plastic construction', 'FiGlobe'],
    ['hp-laptop-15', 'Connectivity', 'Wi-Fi 6', 'Bluetooth® 5.3', 'FiWifi'],
    ['hp-laptop-15', 'OS', 'Windows 11 Home', 'Everyday essentials', 'FiCommand']
  ];
  
  techSpecs.forEach(s => {
    db.run(`INSERT INTO product_specs (product_id, label, human_value, tech_value, icon_name) VALUES (?, ?, ?, ?, ?)`, s);
  });
  console.log(`✓ Inserted ${techSpecs.length} specs`);

  // Insert media
  console.log('Inserting media...');
  const repoBaseUrl = 'https://raw.githubusercontent.com/bedarkartejas-cyber/helix-images/main';
  const onlineMedia = [
    // OMEN 17
    ['omen-17', 'image', `${repoBaseUrl}/Omen%2017/Img1.jpg`, 1, 1],
    ['omen-17', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Omen%2017/img2.jpg?raw=true`, 2, 0],
    ['omen-17', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Omen%2017/img3.jpg?raw=true`, 3, 0],

    // OMEN 16
    ['omen-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Omen%2016/img1.jpg?raw=true`, 1, 1],
    ['omen-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Omen%2016/img2.jpg?raw=true`, 2, 0],
    ['omen-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Omen%2016/img3.jpg?raw=true`, 3, 0],

    // Add all your media URLs here...
        // VICTUS 16
    ['victus-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Victus%2016/img1.jpg?raw=true`, 1, 1],
    ['victus-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Victus%2016/img2.jpg?raw=true`, 2, 0],
    ['victus-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Victus%2016/img3.jpg?raw=true`, 3, 0],

    // SPECTRE 16
    ['spectre-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Spectre%20x360%2016/img2.jpg?raw=true`, 1, 1],
    ['spectre-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Spectre%20x360%2016/img3.jpg?raw=true`, 2, 0],
    ['spectre-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Spectre%20x360%2016/img4.jpg?raw=true`, 3, 0],

    // ENVY 16
    ['envy-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Envy%2016/img1.jpg?raw=true`, 1, 1],
    ['envy-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Envy%2016/img2.jpg?raw=true`, 2, 0],
    ['envy-16', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Envy%2016/img3.jpg?raw=true`, 3, 0],

    // PAVILION PLUS 14 OLED
    ['pavilion-plus-14-oled', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Pavillion%20Plus%2014%20OLED/img.jpg?raw=true`, 1, 1],
    ['pavilion-plus-14-oled', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Pavillion%20Plus%2014%20OLED/img2.jpg?raw=true`, 2, 0],
    ['pavilion-plus-14-oled', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Pavillion%20Plus%2014%20OLED/img4.jpg?raw=true`, 3, 0],

    // ELITEBOOK 840
    ['elitebook-840', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/EliteBook%20840%20g10/img1.jpg?raw=true`, 1, 1],
    ['elitebook-840', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/EliteBook%20840%20g10/img2.jpg?raw=true`, 2, 0],
    ['elitebook-840', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/EliteBook%20840%20g10/img3.jpg?raw=true`, 3, 0],

    // PROBOOK 450
    ['probook-450', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/probook%20450%20G10/img1.jpg?raw=true`, 1, 1],
    ['probook-450', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/probook%20450%20G10/img2.jpg?raw=true`, 2, 0],
    ['probook-450', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/probook%20450%20G10/img3.jpg?raw=true`, 3, 0],

    // ELITE x360
    ['elite-x360', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Elite%20x360%20830/img2.jpg?raw=true`, 1, 1],
    ['elite-x360', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Elite%20x360%20830/img1.jpg?raw=true`, 2, 0],
    ['elite-x360', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Elite%20x360%20830/img3.jpg?raw=true`, 3, 0],

    // PAVILION 14 (Student)
    ['pavilion-14-std', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/PavillionPlus14/img1.jpg?raw=true`, 1, 1],
    ['pavilion-14-std', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/PavillionPlus14/img2.jpg?raw=true`, 2, 0],
    ['pavilion-14-std', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/PavillionPlus14/img3.jpg?raw=true`, 3, 0],

    // PAVILION x360
    ['pavilion-x360', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Pavillion%20x360%2014/img2.jpg?raw=true`, 1, 1],
    ['pavilion-x360', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Pavillion%20x360%2014/img3.jpg?raw=true`, 2, 0],
    ['pavilion-x360', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/Pavillion%20x360%2014/img4.jpg?raw=true`, 3, 0],

    // HP LAPTOP 15
    ['hp-laptop-15', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/HP%20Laptop%2015/img1.jpg?raw=true`, 1, 1],
    ['hp-laptop-15', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/HP%20Laptop%2015/img2.jpg?raw=true`, 2, 0],
    ['hp-laptop-15', 'image', `https://github.com/bedarkartejas-cyber/helix-images/blob/main/HP%20Laptop%2015/img3.jpg?raw=true`, 3, 0],
  ];
  
  onlineMedia.forEach(m => {
    db.run(`INSERT INTO product_media (product_id, media_type, file_path, display_order, is_hero_media) VALUES (?, ?, ?, ?, ?)`, m);
  });
  console.log(`✓ Inserted ${onlineMedia.length} media items`);

  
    const assets = [
        [
            "omen-17",
            "bento",
            "Pro-Level Gaming",
            "Packed with a jaw-dropping display, next-gen CPU and GPU. Essentially everything you need for epic gaming and nothing you don’t.",
            "https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_4_Hero-Laptop-Cropped%402x.png",
            JSON.stringify({
                align: "left",
                theme: "dark",
                sub_brand: "OMEN 17 GAMING LAPTOP",
                logos: [{
                    src: "https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_2_242448702-A_AMD_Ryzen_9_Badge_RGB.png",
                    alt: "AMD Ryzen 9 logo",
                    height: "h-20",
                }, {
                    src: "https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_3_nvidia-geforce-rtx.png",
                    alt: "NVIDIA GeForce RTX logo",
                    height: "h-12",
                }, ],
                textMaxWidth: "max-w-xl",
                styles: {
                    title: {
                        size: "text-5xl",
                        weight: "font-bold",
                    },
                    description: {
                        size: "text-lg",
                        weight: "font-light",
                    },
                },
            }),
            1,
        ],
        ["omen-16", "", "", "", "", JSON.stringify({theme: "dark"})],
        ["victus-16", "", "", "", "", JSON.stringify({theme: "dark"})],
        ["spectre-16", "", "", "", "", JSON.stringify({theme: "dark"})],
        ["envy-16", "", "", "", "", JSON.stringify({theme: "dark"})],
        ["pavilion-plus-14-oled", "", "", "", "", JSON.stringify({theme: "light"})],
        ["elitebook-840", "", "", "", "", JSON.stringify({theme: "light"})],
        ["probook-450", "", "", "", "", JSON.stringify({theme: "light"})],
        ["elite-x360", "", "", "", "", JSON.stringify({theme: "light"})],
        ["pavilion-14-std", "", "", "", "", JSON.stringify({theme: "light"})],
        ["pavilion-x360", "", "", "", "", JSON.stringify({theme: "light"})],
        ["hp-laptop-15", "", "", "", "", JSON.stringify({theme: "light"})],
    ];

    assets.forEach((m) => {
        db.run(
            `INSERT INTO pdp_sections (product_id, section_type, title, description, media_path, layout_config, display_order) values (?,?,?,?,?,?,?)`,
            m
        );
    });
    console.log(`✓ Inserted ${assets.length} media items`);
   


  // Export to file
  const data = db.export();
  const buffer = Buffer.from(data);
  const seedDbPath = path.join(__dirname, '../resources/seed.db');
  
  // Create resources directory if it doesn't exist
  const resourcesDir = path.dirname(seedDbPath);
  if (!fs.existsSync(resourcesDir)) {
    fs.mkdirSync(resourcesDir, { recursive: true });
  }
  
  fs.writeFileSync(seedDbPath, buffer);
  console.log(`✓ Seed database created at: ${seedDbPath}`);
  
  // Verify
  const productCount = db.exec('SELECT COUNT(*) as count FROM products')[0]?.values[0][0];
  const specsCount = db.exec('SELECT COUNT(*) as count FROM product_specs')[0]?.values[0][0];
  const mediaCount = db.exec('SELECT COUNT(*) as count FROM product_media')[0]?.values[0][0];
  const assetsCount = db.exec('SELECT COUNT(*) as count FROM pdp_sections')[0]?.values[0][0];
  
  console.log('\n=== Database Summary ===');
  console.log(`Products: ${productCount}`);
  console.log(`Specs: ${specsCount}`);
  console.log(`Media: ${mediaCount}`);
  console.log(`Assets: ${assetsCount}`);

  console.log('========================\n');
  
  db.close();
}

createSeedDatabase().catch(error => {
  console.error('Failed to create seed database:', error);
  process.exit(1);
});
