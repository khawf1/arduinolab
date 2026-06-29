-- Second batch of Wikimedia Commons images. Run in the Supabase SQL Editor.
-- Safe to re-run.

update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/LM2596_buck_converter_module%2C_MP1584_buck_converter_module%2C_and_SDB628_boost_converter_module.jpg' where slug = 'lm2596-buck';
-- same photo also shows a boost converter, used here too since no dedicated MT3608 photo was found
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/LM2596_buck_converter_module%2C_MP1584_buck_converter_module%2C_and_SDB628_boost_converter_module.jpg' where slug = 'mt3608-boost';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Resistor_Color_Code.svg' where slug = 'resistors-quarter-watt';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Electrolytic_capacitors-P1090328.JPG' where slug = 'electrolytic-capacitors';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Diode_1n4148.jpg' where slug = 'diodes-1n4007-1n4148';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Transistor-2N2222.PNG' where slug = 'bjt-transistors';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Nema_17_Stepper_Motor.jpg' where slug = 'nema17-stepper-driver';
-- no exact MG996R photo found on Commons; using a representative hobby servo photo (SG90) instead
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Tower_Pro_SG90_micro_servo_motor.jpg' where slug = 'mg996r-servo';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/RobotNanoRF24L01.png' where slug = 'nrf24l01';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/RFID-RC522.jpg' where slug = 'rc522-rfid';
-- diagram rather than a product photo, used as a placeholder
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Arduino_SD_card_module.svg' where slug = 'microsd-reader';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Rotary_encoder.jpg' where slug = 'rotary-encoder';
