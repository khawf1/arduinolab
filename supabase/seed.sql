-- Optional: run this in the Supabase SQL Editor after schema.sql to pre-populate
-- the library with a starter set of categories and components.

insert into public.categories (name, slug, sort_order) values
  ('Microcontrollers & Dev Boards', 'microcontrollers', 1),
  ('Power Management', 'power-management', 2),
  ('Passive & Discrete Components', 'passive-discrete', 3),
  ('Sensors', 'sensors', 4),
  ('Actuators & Motor Control', 'actuators-motors', 5),
  ('Displays & User Interfaces', 'displays-ui', 6),
  ('Communication & Storage', 'communication-storage', 7),
  ('Tools & Construction', 'tools-construction', 8)
on conflict (slug) do nothing;

insert into public.components (category_id, name, slug, description, best_use_case, specs) values
  (
    (select id from public.categories where slug = 'microcontrollers'),
    'Arduino Uno (R3/R4)', 'arduino-uno',
    'The classic general-purpose Arduino board, ideal for learning and prototyping.',
    'General prototyping & testing',
    '{"Logic voltage": "5V", "Footprint": "Standard shield"}'
  ),
  (
    (select id from public.categories where slug = 'microcontrollers'),
    'ESP32', 'esp32',
    'Dual-core Wi-Fi + Bluetooth microcontroller, popular for IoT projects.',
    'IoT, Smart Home, Web servers',
    '{"Logic voltage": "3.3V", "Wireless": "Wi-Fi & Bluetooth"}'
  ),
  (
    (select id from public.categories where slug = 'sensors'),
    'MPU6050', 'mpu6050',
    '6-axis accelerometer and gyroscope module.',
    'Motion & orientation sensing',
    '{"Interface": "I2C", "Axes": "6 (accel + gyro)"}'
  ),
  (
    (select id from public.categories where slug = 'actuators-motors'),
    'L298N Motor Driver', 'l298n',
    'Dual H-bridge motor driver for controlling DC motors.',
    'Driving high-power DC motors',
    '{"Max current": "2A per channel", "Logic": "5V TTL"}'
  ),
  (
    (select id from public.categories where slug = 'displays-ui'),
    'SSD1306 OLED Display', 'ssd1306-oled',
    '0.96-inch I2C OLED display, high contrast and low pin usage.',
    'Standalone status/debug displays',
    '{"Size": "0.96 in", "Interface": "I2C"}'
  )
on conflict (slug) do nothing;
