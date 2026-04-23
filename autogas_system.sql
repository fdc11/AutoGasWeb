-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-03-2026 a las 17:32:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `autogas_system`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `ruc` varchar(20) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `sede_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `dni`, `ruc`, `telefono`, `email`, `sede_id`, `created_at`) VALUES
(1, 'Fabrizio Durand Clemente', '12345678', '', '999888777', 'hola@gmail.com', NULL, '2026-03-16 19:39:09'),
(2, 'Fabrizio Durand Clemente', '12345678', '', '999888777', 'hola@gmail.com', NULL, '2026-03-16 19:39:13'),
(3, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:44:45'),
(4, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:44:46'),
(5, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:44:46'),
(6, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:44:47'),
(7, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:44:47'),
(8, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:44:48'),
(9, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:44:48'),
(10, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:44:48'),
(11, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:44:48'),
(12, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:45:32'),
(13, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:45:33'),
(14, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:45:33'),
(15, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:45:33'),
(16, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:45:33'),
(17, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:45:33'),
(18, 'Fabrizio Durand', '77777777', '', '999999999', 'hola@gmail,com', NULL, '2026-03-16 19:45:34'),
(19, '', '', '', '', '', NULL, '2026-03-16 19:48:43'),
(20, '', '', '', '', '', NULL, '2026-03-16 19:48:48'),
(21, '', '', '', '', '', NULL, '2026-03-16 19:48:49'),
(22, '', '', '', '', '', NULL, '2026-03-16 19:48:49'),
(23, '', '', '', '', '', NULL, '2026-03-16 19:48:49'),
(24, '', '', '', '', '', NULL, '2026-03-16 19:48:49'),
(25, '', '', '', '', '', NULL, '2026-03-16 19:48:50'),
(26, '', '', '', '', '', NULL, '2026-03-16 19:48:50'),
(27, '', '', '', '', '', NULL, '2026-03-16 19:48:50'),
(28, '', '', '', '', '', NULL, '2026-03-16 19:48:50'),
(29, '', '', '', '', '', NULL, '2026-03-16 19:48:51'),
(30, '', '', '', '', '', NULL, '2026-03-16 19:48:52'),
(31, '', '', '', '', '', NULL, '2026-03-16 19:48:52'),
(32, '', '', '', '', '', NULL, '2026-03-16 19:48:53'),
(33, '', '', '', '', '', NULL, '2026-03-16 19:48:53'),
(34, '', '', '', '', '', NULL, '2026-03-16 19:48:53'),
(35, '', '', '', '', '', NULL, '2026-03-16 19:48:53'),
(36, '', '', '', '', '', NULL, '2026-03-16 19:50:22'),
(37, '', '', '', '', '', NULL, '2026-03-16 19:50:23'),
(38, '', '', '', '', '', NULL, '2026-03-16 19:50:23'),
(39, '', '', '', '', '', NULL, '2026-03-16 19:50:39'),
(40, '', '', '', '', '', NULL, '2026-03-16 19:50:39'),
(41, '', '', '', '', '', NULL, '2026-03-16 19:50:40'),
(42, '', '', '', '', '', NULL, '2026-03-16 19:50:46'),
(43, '', '', '', '', '', NULL, '2026-03-16 19:50:46'),
(44, '', '', '', '', '', NULL, '2026-03-16 19:50:47'),
(45, 'Fabrizio Durand', '70770789', '', '978 678 678', 'hola@gmail.com', NULL, '2026-03-16 19:54:13'),
(46, 'Fabrizio Durand', '70770789', '', '978 678 678', 'hola@gmail.com', NULL, '2026-03-16 19:54:18'),
(47, 'Fabrizio Durand', '70770789', '', '978 678 678', 'hola@gmail.com', NULL, '2026-03-16 19:54:19'),
(48, 'Fabrizio Durand', '70770789', '', '978 678 678', 'hola@gmail.com', NULL, '2026-03-16 19:54:19'),
(49, 'Fabrizio Durand', '70770789', '', '978 678 678', 'hola@gmail.com', NULL, '2026-03-16 19:54:19'),
(50, 'Fabrizio Durand', '70770789', '', '978 678 678', 'hola@gmail.com', NULL, '2026-03-16 19:54:40'),
(51, 'Fabrizio Durand', '70770789', '', '978 678 678', 'hola@gmail.com', NULL, '2026-03-16 19:54:41'),
(52, 'Fabrizio Durand', '70770789', '', '978 678 678', 'hola@gmail.com', NULL, '2026-03-16 19:54:41'),
(53, 'Fabrizio Durand', '70770789', '', '978 678 678', 'hola@gmail.com', NULL, '2026-03-16 19:54:41'),
(54, 'Fabrizio Durand', '70770789', '', '978 678 678', 'hola@gmail.com', NULL, '2026-03-16 19:54:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes_trabajo`
--

CREATE TABLE `ordenes_trabajo` (
  `id` int(11) NOT NULL,
  `codigo` varchar(30) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `vehiculo_id` int(11) NOT NULL,
  `sede_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `mecanico_id` int(11) DEFAULT NULL,
  `tipo_servicio` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `solucion` text DEFAULT NULL,
  `estado` enum('pendiente','en_proceso','listo','entregado','cancelado') DEFAULT 'pendiente',
  `prioridad` enum('baja','media','alta') DEFAULT 'media',
  `fecha_inicio` datetime DEFAULT current_timestamp(),
  `fecha_fin` datetime DEFAULT NULL,
  `total` decimal(10,2) DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `activa` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sedes`
--

INSERT INTO `sedes` (`id`, `nombre`, `direccion`, `telefono`, `email`, `activa`, `created_at`) VALUES
(1, 'Ica', 'Av. Fernando León de Vivero MZ B LT 03 Y 04 - URB. Villa Aurora', '984851714', 'autogasica@gmail.com', 1, '2026-03-16 19:06:24'),
(2, 'Lima', 'Por definir', '', '', 1, '2026-03-16 19:06:24'),
(3, 'Arequipa', 'Por definir', '', '', 1, '2026-03-16 19:06:24'),
(4, 'Huancayo', 'Por definir', '', '', 1, '2026-03-16 19:06:24'),
(5, 'Trujillo', 'Por definir', '', '', 1, '2026-03-16 19:06:24'),
(6, 'Nasca', 'Por definir', '', '', 1, '2026-03-16 19:06:24'),
(7, 'Chincha', 'Por definir', '', '', 1, '2026-03-16 19:06:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('superadmin','admin','recepcionista','mecanico','almacen') NOT NULL,
  `sede_id` int(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `username`, `email`, `password`, `rol`, `sede_id`, `activo`, `created_at`) VALUES
(1, 'Super Admin', 'superadmin', 'superadmin@autogas.com', 'ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270', 'superadmin', NULL, 1, '2026-03-16 19:06:24'),
(2, 'Admin Ica', 'admin.ica', 'admin.ica@autogas.com', 'ab187e7896af5e7e7bb9376e61bdc9f4bf5f46bf370d5a8b37b0388dd201a663', 'admin', 1, 1, '2026-03-16 19:06:24'),
(3, 'Recepcion Ica', 'recepcion.ica', 'recepcion.ica@autogas.com', 'e5f7ec423dab64668db01d6ca231610e8d8ffcd7d67a317b5c14cd70a89972f6', 'recepcionista', 1, 1, '2026-03-16 19:06:24'),
(4, 'Mecanico Ica', 'mecanico.ica', 'mecanico.ica@autogas.com', 'ddf97b6e17d63d2bfcce62cb6aba9a2e185e07d67c821cafa2ce3e5aa794c509', 'mecanico', 1, 1, '2026-03-16 19:06:24'),
(5, 'Almacen Ica', 'almacen.ica', 'almacen.ica@autogas.com', 'a1a7b5bfb6060f6d5c217cf2c175786594fd6c6ba75981a2f6efa26c390a2f2d', 'almacen', 1, 1, '2026-03-16 19:06:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `placa` varchar(20) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `anio` int(11) DEFAULT NULL,
  `kilometraje` int(11) DEFAULT NULL,
  `combustible` varchar(30) DEFAULT NULL,
  `vin` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `cliente_id`, `placa`, `marca`, `modelo`, `anio`, `kilometraje`, `combustible`, `vin`, `created_at`) VALUES
(1, 1, 'ABC-123', 'Kia', 'Sorento', 2015, 4500, 'GLP', '', '2026-03-16 19:39:09'),
(2, 2, 'ABC-123', 'Kia', 'Sorento', 2015, 4500, 'GLP', '', '2026-03-16 19:39:13'),
(3, 3, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:44:45'),
(4, 4, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:44:46'),
(5, 5, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:44:46'),
(6, 6, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:44:47'),
(7, 7, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:44:47'),
(8, 8, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:44:48'),
(9, 9, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:44:48'),
(10, 10, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:44:48'),
(11, 11, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:44:48'),
(12, 12, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:45:32'),
(13, 13, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:45:33'),
(14, 14, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:45:33'),
(15, 15, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:45:33'),
(16, 16, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:45:33'),
(17, 17, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:45:33'),
(18, 18, 'ABC-123', 'KIA', 'SORENTO', 2015, 12000, 'Gasolina', '', '2026-03-16 19:45:34'),
(19, 19, '', '', '', 0, 0, '', '', '2026-03-16 19:48:43'),
(20, 20, '', '', '', 0, 0, '', '', '2026-03-16 19:48:48'),
(21, 21, '', '', '', 0, 0, '', '', '2026-03-16 19:48:49'),
(22, 22, '', '', '', 0, 0, '', '', '2026-03-16 19:48:49'),
(23, 23, '', '', '', 0, 0, '', '', '2026-03-16 19:48:49'),
(24, 24, '', '', '', 0, 0, '', '', '2026-03-16 19:48:49'),
(25, 25, '', '', '', 0, 0, '', '', '2026-03-16 19:48:50'),
(26, 26, '', '', '', 0, 0, '', '', '2026-03-16 19:48:50'),
(27, 27, '', '', '', 0, 0, '', '', '2026-03-16 19:48:50'),
(28, 28, '', '', '', 0, 0, '', '', '2026-03-16 19:48:50'),
(29, 29, '', '', '', 0, 0, '', '', '2026-03-16 19:48:51'),
(30, 30, '', '', '', 0, 0, '', '', '2026-03-16 19:48:52'),
(31, 31, '', '', '', 0, 0, '', '', '2026-03-16 19:48:52'),
(32, 32, '', '', '', 0, 0, '', '', '2026-03-16 19:48:53'),
(33, 33, '', '', '', 0, 0, '', '', '2026-03-16 19:48:53'),
(34, 34, '', '', '', 0, 0, '', '', '2026-03-16 19:48:53'),
(35, 35, '', '', '', 0, 0, '', '', '2026-03-16 19:48:53'),
(36, 36, '', '', '', 0, 0, '', '', '2026-03-16 19:50:22'),
(37, 37, '', '', '', 0, 0, '', '', '2026-03-16 19:50:23'),
(38, 38, '', '', '', 0, 0, '', '', '2026-03-16 19:50:23'),
(39, 39, '', '', '', 0, 0, '', '', '2026-03-16 19:50:39'),
(40, 40, '', '', '', 0, 0, '', '', '2026-03-16 19:50:39'),
(41, 41, '', '', '', 0, 0, '', '', '2026-03-16 19:50:40'),
(42, 42, '', '', '', 0, 0, '', '', '2026-03-16 19:50:46'),
(43, 43, '', '', '', 0, 0, '', '', '2026-03-16 19:50:46'),
(44, 44, '', '', '', 0, 0, '', '', '2026-03-16 19:50:47'),
(45, 45, 'ABC-123', 'KIA', 'SORENTO', 2015, 14000, 'Gas Natural (GNV)', '', '2026-03-16 19:54:13'),
(46, 46, 'ABC-123', 'KIA', 'SORENTO', 2015, 14000, 'Gas Natural (GNV)', '', '2026-03-16 19:54:18'),
(47, 47, 'ABC-123', 'KIA', 'SORENTO', 2015, 14000, 'Gas Natural (GNV)', '', '2026-03-16 19:54:19'),
(48, 48, 'ABC-123', 'KIA', 'SORENTO', 2015, 14000, 'Gas Natural (GNV)', '', '2026-03-16 19:54:19'),
(49, 49, 'ABC-123', 'KIA', 'SORENTO', 2015, 14000, 'Gas Natural (GNV)', '', '2026-03-16 19:54:19'),
(50, 50, 'ABC-123', 'KIA', 'SORENTO', 2015, 14000, 'Gas Natural (GNV)', '', '2026-03-16 19:54:40'),
(51, 51, 'ABC-123', 'KIA', 'SORENTO', 2015, 14000, 'Gas Natural (GNV)', '', '2026-03-16 19:54:41'),
(52, 52, 'ABC-123', 'KIA', 'SORENTO', 2015, 14000, 'Gas Natural (GNV)', '', '2026-03-16 19:54:41'),
(53, 53, 'ABC-123', 'KIA', 'SORENTO', 2015, 14000, 'Gas Natural (GNV)', '', '2026-03-16 19:54:41'),
(54, 54, 'ABC-123', 'KIA', 'SORENTO', 2015, 14000, 'Gas Natural (GNV)', '', '2026-03-16 19:54:42');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sede_id` (`sede_id`);

--
-- Indices de la tabla `ordenes_trabajo`
--
ALTER TABLE `ordenes_trabajo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `vehiculo_id` (`vehiculo_id`),
  ADD KEY `sede_id` (`sede_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `sede_id` (`sede_id`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `ordenes_trabajo`
--
ALTER TABLE `ordenes_trabajo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sedes`
--
ALTER TABLE `sedes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`);

--
-- Filtros para la tabla `ordenes_trabajo`
--
ALTER TABLE `ordenes_trabajo`
  ADD CONSTRAINT `ordenes_trabajo_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  ADD CONSTRAINT `ordenes_trabajo_ibfk_2` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculos` (`id`),
  ADD CONSTRAINT `ordenes_trabajo_ibfk_3` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`),
  ADD CONSTRAINT `ordenes_trabajo_ibfk_4` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`);

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `vehiculos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
