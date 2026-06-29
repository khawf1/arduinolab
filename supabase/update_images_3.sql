-- Third batch of Wikimedia Commons images. Run in the Supabase SQL Editor.
-- Safe to re-run.

update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/LoRa_Module_with_antenna_and_SPI_wires_attached.jpg' where slug = 'lora-sx1278';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/MOSFET_transistors.jpg' where slug = 'mosfets-logic-level';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Opto-isolator_(aka).jpg' where slug = 'pc817-optocoupler';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Part_of_a_Motherboard%2C_pin_headers.JPG' where slug = 'pin-headers';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Wiring_PLC_relay_module_hardware.jpg' where slug = 'relays-solenoids';
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/LCD_TFT_Screen_Closeup.jpg' where slug = 'tft-touch-screen';
-- diagram, not a product photo, used as placeholder
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Membrane_keyboard_diagram_FULL_SCALE.png' where slug = 'matrix-keypad-4x4';
-- diagram of an Arduino + GPS module, not a standalone product photo, used as placeholder
update public.components set image_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Arduino_with_GPS_Module.svg' where slug = 'neo-6m-gps';
