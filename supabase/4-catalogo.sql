-- =====================================================================
-- Roomies Deco · Archivo 4 de 5: la casa y el catálogo de muebles
--
-- Qué hace: crea la casa "Apartamento" y los 21 muebles del catálogo
--           (los mismos de assets/Datos/muebles.jsx).
-- Dónde se corre: SQL Editor → New query → pega TODO este archivo → Run.
-- Cuándo: una sola vez, después del archivo 3 y ANTES de crear usuarios
--         (las cuentas nuevas entran a esta casa).
-- Antes o después: sube las fotos a la carpeta "muebles" de Storage (paso 5 de la guía).
--                  La columna "imagen" tiene el nombre de cada archivo.
-- Este archivo se generó desde los datos de prueba de la app.
-- =====================================================================

-- La casa (solo se crea si todavía no hay ninguna)
insert into public.casas (nombre)
select 'Apartamento'
where not exists (select 1 from public.casas);

-- El catálogo, en el orden en que sale en Explorar
insert into public.muebles
  (id, orden, nombre, categoria, precio, imagen, proporcion, tienda, largo, ancho, alto, color, materiales, estilo, descripcion, colores)
values
  ('m1', 1, 'Sofá 3 puestos', 'Sofás', 890000, 'sofa-3-puestos.jpg', 0.95, 'Homecenter', 210, 90, 85, 'Verde oliva', '{"Tela","Madera"}', 'Moderno', 'Sofá cómodo de líneas suaves, ideal para la sala compartida.', '{"#AB946F","#DBCCB8","#756945","#5A4723","#33250C"}'),
  ('m20', 2, 'Planta decorativa', 'Plantas', 120000, 'planta-decorativa.jpg', 1, 'Homecenter', 40, 40, 60, 'Verde', '{"Planta natural","Matera de barro"}', 'Natural', 'Potus en matera de barro, fácil de cuidar y perfecta para cualquier rincón.', '{"#E7E9EE","#82954F","#555924","#ACC081"}'),
  ('m17', 3, 'Silla de comedor', 'Sillas', 240000, 'silla-de-comedor.jpg', 1.27, 'Homecenter', 45, 50, 90, 'Café', '{"Madera","Tela"}', 'Clásico', 'Silla de madera con asiento acolchado, cómoda para comer o trabajar.', '{"#EEDFD3","#C8B3A3","#A28D7D","#442D1A","#816A58"}'),
  ('m12', 4, 'Lámpara de arco', 'Lámparas', 180000, 'lampara-de-arco.jpg', 0.87, 'Homecenter', 100, 35, 180, 'Negro', '{"Metal"}', 'Industrial', 'Lámpara de pie en arco que ilumina el sofá desde arriba.', '{"#CEB698","#907552","#B59978","#514226"}'),
  ('m18', 5, 'Estante blanco', 'Estantes', 410000, 'estante-blanco.jpg', 1.27, 'Homecenter', 80, 35, 180, 'Blanco', '{"MDF"}', 'Minimalista', 'Estante de cubos para libros, cajas y decoración.', '{"#625A51","#D9D4CC","#918375","#AEA193","#BBB8AF"}'),
  ('m10', 6, 'Mesa de comedor', 'Mesas', 690000, 'mesa-de-comedor.jpg', 0.87, 'Homecenter', 160, 90, 75, 'Madera clara', '{"Pino"}', 'Nórdico', 'Mesa de comedor para seis personas en madera clara.', '{"#8D602D","#C9AF8F","#E0D5C4","#AF8556"}'),
  ('m2', 7, 'Sofá esquinero', 'Sofás', 1450000, 'sofa-esquinero.jpg', 1.27, 'Homecenter', 260, 180, 80, 'Beige', '{"Tela","Madera"}', 'Moderno', 'Sofá en L con cojines amplios, perfecto para ver películas entre todos.', '{"#CBAB8C","#81654C","#9A7E64","#E2C19C","#543B28"}'),
  ('m11', 8, 'Lámpara de pie', 'Lámparas', 180000, 'lampara-de-pie.jpg', 1.27, 'Homecenter', 40, 40, 160, 'Dorado', '{"Metal","Tela"}', 'Cálido', 'Lámpara de pie con pantalla de tela y luz cálida.', '{"#804913","#562C08","#2C1303","#A56A26"}'),
  ('m6', 9, 'Mesa auxiliar', 'Mesas', 150000, 'mesa-auxiliar.jpg', 1, 'Homecenter', 90, 50, 45, 'Blanco hueso', '{"MDF lacado"}', 'Minimalista', 'Mesa baja de formas orgánicas para poner junto al sofá.', '{"#DED7D0","#B2A499","#D1C1B5","#9B8169"}'),
  ('m5', 10, 'Love seat azul', 'Sofás', 780000, 'love-seat-azul.jpg', 0.94, 'Homecenter', 150, 85, 80, 'Azul cielo', '{"Terciopelo","Metal dorado"}', 'Retro', 'Sofá de dos puestos con respaldo en ondas y patas doradas.', '{"#6C6E74","#475866","#69ADD8","#5387AC","#CDC9C1"}'),
  ('m13', 11, 'Lámpara de mesa', 'Lámparas', 95000, 'lampara-de-mesa.jpg', 1.27, 'Homecenter', 30, 30, 55, 'Bronce', '{"Metal","Tela"}', 'Clásico', 'Lámpara de mesa con pantalla bordada que da una luz cálida.', '{"#241708","#7F5427","#633D19","#B68B50"}'),
  ('m7', 12, 'Mesa de centro', 'Mesas', 280000, 'mesa-de-centro.jpg', 1, 'Homecenter', 110, 60, 40, 'Nogal', '{"Madera maciza"}', 'Natural', 'Mesa de centro ovalada en madera con base curva.', '{"#C1B5A8","#A89B8D","#735237","#82684F","#3D2714"}'),
  ('m3', 13, 'Sillón individual', 'Sofás', 520000, 'sillon-individual.jpg', 1.27, 'Homecenter', 105, 95, 80, 'Crema', '{"Ratán","Algodón"}', 'Bohemio', 'Sillón redondo y acolchado para leer en un rincón.', '{"#8E785F","#C2AB8E","#615040","#DCC5A4","#38291E"}'),
  ('m14', 14, 'Lámpara colgante', 'Lámparas', 130000, 'lampara-colgante.jpg', 1.27, 'Homecenter', 20, 20, 40, 'Ámbar', '{"Vidrio","Metal"}', 'Industrial', 'Juego de lámparas colgantes de vidrio ámbar para el comedor.', '{"#6B4B35","#ECD7B5","#A27C5A","#C0986E","#97643E"}'),
  ('m19', 15, 'Estante de madera', 'Estantes', 520000, 'estante-de-madera.jpg', 1.27, 'Homecenter', 90, 30, 190, 'Madera miel', '{"Madera de pino"}', 'Natural', 'Biblioteca abierta de cinco repisas en madera.', '{"#C09D81","#623111","#895735","#B27F59","#DFC7B1"}'),
  ('m8', 16, 'Mesa redonda', 'Mesas', 480000, 'mesa-redonda.jpg', 1, 'Homecenter', 80, 80, 45, 'Café oscuro', '{"Madera"}', 'Clásico', 'Mesa redonda con repisa inferior para revistas.', '{"#DFD4C9","#8C7361","#2B1D15","#A29183","#F4EBE0"}'),
  ('m4', 17, 'Sofá cama', 'Sofás', 960000, 'sofa-cama.jpg', 0.91, 'Homecenter', 200, 95, 85, 'Azul petróleo', '{"Tela","Metal"}', 'Moderno', 'Sofá que se convierte en cama para recibir visitas.', '{"#344F5E","#C9C4A9","#D9D9C8","#B0A793","#938169"}'),
  ('m15', 18, 'Lámpara de noche', 'Lámparas', 75000, 'lampara-de-noche.jpg', 1.25, 'Homecenter', 20, 20, 35, 'Dorado', '{"Vidrio","Metal"}', 'Romántico', 'Lámpara de noche en forma de flor para la mesa de noche.', '{"#C08249","#503215","#7B4E26","#DB9F62"}'),
  ('m9', 19, 'Mesa flor', 'Mesas', 320000, 'mesa-flor.jpg', 1.2, 'Homecenter', 75, 75, 40, 'Crema', '{"Fibra de vidrio"}', 'Colorido', 'Mesa de centro en forma de flor para una sala alegre.', '{"#D4CEBA","#A68D7A","#B2A599","#794222","#4E260F"}'),
  ('m16', 20, 'Lámpara espiral', 'Lámparas', 110000, 'lampara-espiral.jpg', 1.27, 'Homecenter', 25, 25, 70, 'Blanco', '{"Acrílico"}', 'Moderno', 'Lámpara colgante en espiral que da una luz suave.', '{"#A39C8E","#B4B6B1","#D0D9D6"}'),
  ('m21', 21, 'Planta monstera', 'Plantas', 160000, 'planta-monstera.jpg', 1.27, 'Homecenter', 50, 50, 110, 'Verde oscuro', '{"Planta natural","Matera de cerámica"}', 'Natural', 'Monstera grande para darle vida a la sala.', '{"#C8C6BE","#6E7461","#2B381F","#A09B8D","#DADFDF"}')
on conflict (id) do nothing;
