-- Applies free, public-domain/CC-licensed images from Wikimedia Commons
-- to a first batch of components. Run in the Supabase SQL Editor.
-- Safe to re-run.

update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Arduino_Uno_-_R3.jpg' where slug = 'arduino-uno';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/ESP32_Espressif_ESP-WROOM-32_Dev_Board.jpg' where slug = 'esp32';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Raspberry_Pi_Pico_top_and_bottom.jpg' where slug = 'raspberry-pi-pico';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Arduino_MEGA_2560_R3%2C_front_side.jpg' where slug = 'arduino-mega-2560';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Arduino_Nano_V3_1530635.JPG' where slug = 'arduino-nano';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/GY-521_MPU-6050_Module_3_Axis_Gyroscope_%2B_Accelerometer_0487.jpg' where slug = 'mpu6050';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/BME280.jpg' where slug = 'bme280';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/L293D_motor_driver_module.jpg' where slug = 'l298n';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Digital_Multimeter_Mastech_M-830BZ.JPG' where slug = 'digital-multimeter';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Breadboard.JPG' where slug = 'perfboard';
