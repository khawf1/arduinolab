-- Full component catalog seed. Run this in the Supabase SQL Editor.
-- Safe to re-run: uses "on conflict do nothing" so it won't duplicate rows.
-- Categories must already exist (run schema.sql + seed.sql first, or this
-- block re-creates them too).

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

-- 1. Microcontrollers & Development Boards -----------------------------------
(
  (select id from public.categories where slug = 'microcontrollers'),
  'Arduino Uno (R3/R4)', 'arduino-uno',
  'The classic general-purpose Arduino board, ideal for learning and prototyping.',
  'General prototyping & testing',
  '{"Logic voltage": "5V", "Footprint": "Standard shield"}'
),
(
  (select id from public.categories where slug = 'microcontrollers'),
  'Arduino Mega 2560', 'arduino-mega-2560',
  'A larger Arduino board with massive I/O for projects needing many pins.',
  'Massive I/O requirements',
  '{"Digital pins": "54", "Analog pins": "16"}'
),
(
  (select id from public.categories where slug = 'microcontrollers'),
  'Arduino Nano', 'arduino-nano',
  'A compact 5V Arduino board that fits directly on a breadboard.',
  'Breadboard projects & final builds',
  '{"Logic voltage": "5V", "Size": "Compact"}'
),
(
  (select id from public.categories where slug = 'microcontrollers'),
  'ESP32 / ESP8266', 'esp32',
  'Dual-core Wi-Fi + Bluetooth microcontroller, popular for IoT projects.',
  'IoT, Smart Home, Web servers',
  '{"Logic voltage": "3.3V", "Wireless": "Wi-Fi & Bluetooth"}'
),
(
  (select id from public.categories where slug = 'microcontrollers'),
  'Teensy 4.0 / 4.1', 'teensy-4',
  'A very high-performance board for demanding compute tasks.',
  'High-speed computing, DSP, Audio',
  '{"CPU": "600MHz ARM Cortex-M7"}'
),
(
  (select id from public.categories where slug = 'microcontrollers'),
  'Raspberry Pi Pico', 'raspberry-pi-pico',
  'A low-cost dual-core board built around the RP2040 chip.',
  'Cost-effective dual-core processing',
  '{"Chip": "RP2040", "Feature": "PIO state machines"}'
),

-- 2. Power Management ----------------------------------------------------------
(
  (select id from public.categories where slug = 'power-management'),
  'LM2596 Buck Converter', 'lm2596-buck',
  'A step-down module used to drop higher voltages to a lower stable voltage.',
  'Dropping 12V down to 5V',
  '{"Type": "Step-down (buck)"}'
),
(
  (select id from public.categories where slug = 'power-management'),
  'MT3608 Boost Converter', 'mt3608-boost',
  'A step-up module that boosts a lower voltage to a higher one.',
  'Boosting 3.7V battery to 5V',
  '{"Type": "Step-up (boost)"}'
),
(
  (select id from public.categories where slug = 'power-management'),
  'Logic Level Converter', 'logic-level-converter',
  'A bi-directional module that lets devices at different logic voltages talk safely.',
  'Letting 5V Arduinos talk to 3.3V sensors/ESP32s',
  '{"Direction": "Bi-directional"}'
),
(
  (select id from public.categories where slug = 'power-management'),
  'TP4056 LiPo Charger', 'tp4056-charger',
  'A charging module with protection for 3.7V lithium batteries.',
  'Charging LiPo/Li-ion batteries safely',
  '{"Input": "USB", "Protection": "Yes"}'
),
(
  (select id from public.categories where slug = 'power-management'),
  '12V/5V Power Supply', 'power-supply-12v-5v',
  'Wall adapters and barrel jack supplies for powering projects off mains power.',
  'Bench power for finished projects',
  '{"Min output": "2A"}'
),

-- 3. Passive & Discrete Components ----------------------------------------------
(
  (select id from public.categories where slug = 'passive-discrete'),
  'Resistors (1/4 Watt)', 'resistors-quarter-watt',
  'Fixed resistors from 10ohm to 1Mohm; 220ohm, 1k, 4.7k, and 10k are used most.',
  'Current limiting, pull-up/down, voltage dividers',
  '{"Power": "1/4W", "Common values": "220, 1k, 4.7k, 10k ohm"}'
),
(
  (select id from public.categories where slug = 'passive-discrete'),
  'Ceramic Capacitors (100nF)', 'ceramic-capacitors',
  'Small capacitors used to decouple noise around ICs.',
  'Decoupling ICs',
  '{"Value": "100nF (0.1uF)"}'
),
(
  (select id from public.categories where slug = 'passive-discrete'),
  'Electrolytic Capacitors', 'electrolytic-capacitors',
  'Larger capacitors used to smooth power supply ripple.',
  'Smoothing power supplies',
  '{"Common values": "10uF, 100uF, 1000uF"}'
),
(
  (select id from public.categories where slug = 'passive-discrete'),
  '1N4007 / 1N4148 Diodes', 'diodes-1n4007-1n4148',
  'Rectifier and fast-switching diodes for protection and signal use.',
  'Flyback protection, rectification, fast switching',
  '{"1N4007": "Rectifier/flyback", "1N4148": "Fast switching"}'
),
(
  (select id from public.categories where slug = 'passive-discrete'),
  '2N2222 / 2N3906 Transistors', 'bjt-transistors',
  'Common NPN and PNP bipolar transistors for low-power switching.',
  'Low-power switching circuits',
  '{"NPN": "2N2222", "PNP": "2N3906"}'
),
(
  (select id from public.categories where slug = 'passive-discrete'),
  'Logic-Level MOSFETs', 'mosfets-logic-level',
  'N-channel MOSFETs that can be driven directly from a 5V pin.',
  'Driving motors and LED strips from a 5V pin',
  '{"Examples": "IRLZ44N, IRLB8721"}'
),
(
  (select id from public.categories where slug = 'passive-discrete'),
  'PC817 Optocoupler', 'pc817-optocoupler',
  'Isolates high-voltage circuits from delicate microcontroller pins using light.',
  'Electrical isolation between circuits',
  '{"Isolation": "Optical"}'
),

-- 4. Advanced Sensors -------------------------------------------------------------
(
  (select id from public.categories where slug = 'sensors'),
  'MPU6050', 'mpu6050',
  '6-axis accelerometer and gyroscope module.',
  'Motion & orientation sensing',
  '{"Interface": "I2C", "Axes": "6 (accel + gyro)"}'
),
(
  (select id from public.categories where slug = 'sensors'),
  'BME280', 'bme280',
  'Precision sensor for temperature, humidity, and barometric pressure.',
  'Environmental monitoring',
  '{"Interface": "I2C/SPI"}'
),
(
  (select id from public.categories where slug = 'sensors'),
  'MQ Series Gas Sensors', 'mq-gas-sensors',
  'Sensors for detecting smoke, gas, or alcohol vapors.',
  'Gas/smoke/alcohol detection',
  '{"MQ-2": "Smoke/gas", "MQ-3": "Alcohol"}'
),
(
  (select id from public.categories where slug = 'sensors'),
  'VL53L0X ToF Sensor', 'vl53l0x',
  'A time-of-flight laser ranging sensor, more accurate than ultrasonic.',
  'Precision distance measurement',
  '{"Type": "Time-of-Flight laser"}'
),
(
  (select id from public.categories where slug = 'sensors'),
  'HX711 + Load Cell', 'hx711-load-cell',
  'An amplifier paired with a load cell for measuring weight/force.',
  'Building digital scales',
  '{"Use": "Weight/force measurement"}'
),
(
  (select id from public.categories where slug = 'sensors'),
  'NEO-6M GPS Module', 'neo-6m-gps',
  'A GPS module for determining geographic location.',
  'Location tracking',
  '{"Output": "NMEA over UART"}'
),
(
  (select id from public.categories where slug = 'sensors'),
  'INA219 / ACS712', 'ina219-acs712',
  'Sensors for measuring voltage and current draw in a circuit.',
  'Power monitoring',
  '{"Measures": "Voltage & current"}'
),

-- 5. Actuators & Motor Control -----------------------------------------------------
(
  (select id from public.categories where slug = 'actuators-motors'),
  'NEMA 17 Stepper + A4988/DRV8825', 'nema17-stepper-driver',
  'A stepper motor paired with a driver, essential for precise positioning.',
  'CNC and 3D printer logic',
  '{"Motor": "NEMA 17", "Driver": "A4988 or DRV8825"}'
),
(
  (select id from public.categories where slug = 'actuators-motors'),
  'MG996R Servo', 'mg996r-servo',
  'A high-torque metal-gear servo for loads that would strip plastic gears.',
  'High-torque positioning',
  '{"Gear": "Metal"}'
),
(
  (select id from public.categories where slug = 'actuators-motors'),
  'L298N / L293D Motor Driver', 'l298n',
  'H-bridge motor drivers for controlling DC motors.',
  'Driving DC motors',
  '{"Max current": "2A per channel (L298N)"}'
),
(
  (select id from public.categories where slug = 'actuators-motors'),
  'Relays & Solenoids', 'relays-solenoids',
  'Mechanical relays, solid state relays, and push-pull solenoids for switching loads.',
  'Switching AC/DC loads, push-pull mechanisms',
  '{"Types": "Mechanical, SSR, solenoid"}'
),

-- 6. Displays & User Interfaces -----------------------------------------------------
(
  (select id from public.categories where slug = 'displays-ui'),
  'SSD1306 OLED Display', 'ssd1306-oled',
  '0.96-inch I2C OLED display, high contrast and low pin usage.',
  'Standalone status/debug displays',
  '{"Size": "0.96 in", "Interface": "I2C"}'
),
(
  (select id from public.categories where slug = 'displays-ui'),
  'TFT Touch Screen / Nextion', 'tft-touch-screen',
  'SPI color screens, including Nextion displays that handle their own graphics.',
  'Graphical UIs without taxing the MCU',
  '{"Interface": "SPI"}'
),
(
  (select id from public.categories where slug = 'displays-ui'),
  'Rotary Encoder', 'rotary-encoder',
  'A control input superior to potentiometers for menu navigation.',
  'Infinite-scrolling menu navigation',
  '{"Type": "Rotary"}'
),
(
  (select id from public.categories where slug = 'displays-ui'),
  '4x4 Matrix Keypad', 'matrix-keypad-4x4',
  'A membrane keypad for entering PIN codes or numeric input.',
  'PIN-code entry',
  '{"Layout": "4x4"}'
),

-- 7. Communication & Storage --------------------------------------------------------
(
  (select id from public.categories where slug = 'communication-storage'),
  'NRF24L01+ Transceiver', 'nrf24l01',
  'A short-range radio transceiver module for wireless communication.',
  'Short-range wireless links',
  '{"Range": "Short"}'
),
(
  (select id from public.categories where slug = 'communication-storage'),
  'LoRa SX1278 Module', 'lora-sx1278',
  'A long-range radio module that can reach miles without Wi-Fi.',
  'Long-range wireless links',
  '{"Range": "Miles"}'
),
(
  (select id from public.categories where slug = 'communication-storage'),
  'RC522 RFID/NFC Module', 'rc522-rfid',
  'A module for reading RFID/NFC cards and key fobs.',
  'Access control, ID scanning',
  '{"Frequency": "13.56MHz"}'
),
(
  (select id from public.categories where slug = 'communication-storage'),
  'MCP2515 CAN Bus Module', 'mcp2515-can-bus',
  'A module for interfacing with CAN bus networks, common in vehicles.',
  'Automotive/industrial data networks',
  '{"Protocol": "CAN"}'
),
(
  (select id from public.categories where slug = 'communication-storage'),
  'Micro SD Card Reader', 'microsd-reader',
  'A storage module for logging data without an internet connection.',
  'Offline data logging',
  '{"Interface": "SPI"}'
),

-- 8. Physical Construction & Debugging Tools ----------------------------------------
(
  (select id from public.categories where slug = 'tools-construction'),
  'Perfboard / Protoboard', 'perfboard',
  'Double-sided prototyping boards for soldering permanent circuits.',
  'Turning breadboard prototypes into permanent builds',
  '{"Type": "Double-sided"}'
),
(
  (select id from public.categories where slug = 'tools-construction'),
  'Pin Headers', 'pin-headers',
  'Breakaway male and female headers, straight and right-angle.',
  'Connecting boards and modules',
  '{"Types": "Male/female, straight/right-angle"}'
),
(
  (select id from public.categories where slug = 'tools-construction'),
  'Silicone Wire & Heat Shrink', 'wire-heatshrink',
  'Stranded silicone-coated wire that resists melting during soldering, plus heat shrink tubing.',
  'Wiring and insulating connections',
  '{"Wire": "Silicone-coated stranded"}'
),
(
  (select id from public.categories where slug = 'tools-construction'),
  'Digital Multimeter', 'digital-multimeter',
  'A handheld tool for measuring voltage, current, resistance, and continuity.',
  'General circuit debugging',
  '{"Type": "Handheld digital"}'
),
(
  (select id from public.categories where slug = 'tools-construction'),
  'USB Logic Analyzer', 'usb-logic-analyzer',
  'An 8-channel 24MHz tool for diagnosing digital communication issues.',
  'Diagnosing I2C/SPI communication problems',
  '{"Channels": "8", "Max sample rate": "24MHz"}'
)

on conflict (slug) do nothing;
