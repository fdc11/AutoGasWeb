-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-03-2026 a las 17:32:39
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
-- Base de datos: `autogas_db`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_guardar_cita` (IN `p_sede_id` TINYINT UNSIGNED, IN `p_nombres` VARCHAR(80), IN `p_apellidos` VARCHAR(80), IN `p_celular` VARCHAR(15), IN `p_correo` VARCHAR(100), IN `p_marca` VARCHAR(40), IN `p_modelo` VARCHAR(60), IN `p_placa` VARCHAR(8), IN `p_km` INT UNSIGNED, IN `p_combustible` VARCHAR(30), IN `p_servicio` VARCHAR(80), IN `p_fecha` DATE, IN `p_hora` TIME, OUT `p_cita_id` INT UNSIGNED, OUT `p_ok` TINYINT, OUT `p_msg` VARCHAR(200))   BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_tiene_limite TINYINT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_ok = 0;
        SET p_msg = 'Error interno al guardar la cita.';
        SET p_cita_id = 0;
    END;

    IF p_servicio IN ('Revisión técnica', 'Diagnóstico general', 'Mecánica General') THEN
        SET v_tiene_limite = 1;
    END IF;

    IF v_tiene_limite = 1 THEN
        SELECT COUNT(*) INTO v_count
        FROM citas
        WHERE sede_id = p_sede_id AND fecha = p_fecha AND hora = p_hora
          AND servicio IN ('Revisión técnica', 'Diagnóstico general', 'Mecánica General')
          AND estado NOT IN ('cancelado');
    END IF;

    IF v_tiene_limite = 1 AND v_count >= 4 THEN
        SET p_ok = 0;
        SET p_msg = 'El horario seleccionado ya alcanzo el maximo de 4 clientes.';
        SET p_cita_id = 0;
    ELSE
        START TRANSACTION;
            INSERT INTO citas
                (sede_id, nombres, apellidos, celular, correo, marca, modelo,
                 placa, kilometraje, combustible, servicio, fecha, hora, estado)
            VALUES
                (p_sede_id, p_nombres, p_apellidos, p_celular, p_correo,
                 p_marca, p_modelo, p_placa, p_km, p_combustible,
                 p_servicio, p_fecha, p_hora, 'pendiente');
            SET p_cita_id = LAST_INSERT_ID();
        COMMIT;
        SET p_ok = 1;
        SET p_msg = 'Cita registrada correctamente.';
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_horas_bloqueadas` (IN `p_sede_id` TINYINT UNSIGNED, IN `p_fecha` DATE)   BEGIN
    SELECT TIME_FORMAT(hora, '%H:%i') AS hora_bloqueada
    FROM citas
    WHERE sede_id = p_sede_id
      AND fecha = p_fecha
      AND servicio IN ('Revisión técnica', 'Diagnóstico general', 'Mecánica General')
      AND estado NOT IN ('cancelado')
    GROUP BY hora
    HAVING COUNT(*) >= 4
    ORDER BY hora;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin_usuarios`
--

CREATE TABLE `admin_usuarios` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `usuario` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL COMMENT 'Hash bcrypt cost=12',
  `nombre` varchar(100) NOT NULL,
  `sede_id` tinyint(3) UNSIGNED DEFAULT NULL COMMENT 'NULL = acceso total',
  `rol` enum('superadmin','admin','operador') NOT NULL DEFAULT 'operador',
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `admin_usuarios`
--

INSERT INTO `admin_usuarios` (`id`, `usuario`, `password`, `nombre`, `sede_id`, `rol`, `activo`, `created_at`) VALUES
(1, 'autogas', '$2y$12$VGt7V5bZ2OKrK9KhY8sXJ.6P2qB1hM8ZRQF4Ld5Nk0ATy7wWe9Oy', 'AutoGas Administracion Central', NULL, 'superadmin', 1, '2026-03-08 00:27:04'),
(2, 'admin_ica', '$2y$12$AJ3Lm6ZkT9P2vN4rQ8sXJeY7H1gC5Wf0RTME6IdOb2KLnVu8XQPS', 'Administrador Sede Ica', 1, 'admin', 1, '2026-03-08 00:27:04'),
(3, 'admin_nasca', '$2y$12$BK4Mn7aLU0Q3wO5sR9tYKfZ8I2hD6Xg1SUNF7JeOc3LMow9YRQT', 'Administrador Sede Nasca', 2, 'admin', 1, '2026-03-08 00:27:04'),
(4, 'admin_huancayo', '$2y$12$CL5No8bMV1R4xP6tS0uZLgA9J3iE7Yh2TVOG8KfPd4MNpx0ZSRU', 'Administrador Sede Huancayo', 3, 'admin', 1, '2026-03-08 00:27:04'),
(5, 'admin_lima', '$2y$12$DM6Op9cNW2S5yQ7uT1vAMhB0K4jF8Zi3UWPH9LgQe5NOqy1ATSV', 'Administrador Sede Lima', 4, 'admin', 1, '2026-03-08 00:27:04'),
(6, 'admin_trujillo', '$2y$12$EN7Pq0dOX3T6zR8vU2wBNiC1L5kG9Aj4VXQI0MhRf6OPrz2BUTW', 'Administrador Sede Trujillo', 5, 'admin', 1, '2026-03-08 00:27:04'),
(7, 'admin_chincha', '$2y$12$FO8Qr1ePY4U7aS9wV3xCOjD2M6lH0Bk5WYRJ1NiSg7PQsa3CVUX', 'Administrador Sede Chincha', 6, 'admin', 1, '2026-03-08 00:27:04'),
(8, 'admin_arequipa', '$2y$12$GP9Rs2fQZ5V8bT0xW4yDPkE3N7mI1Cl6XZSK2OjTh8QRtb4DWVY', 'Administrador Sede Arequipa', 7, 'admin', 1, '2026-03-08 00:27:04'),
(9, 'op_ica1', '$2y$12$HQ0St3gRA6W9cU1yX5zEQlF4O8nJ2Dm7YATL3PkUi9RSuc5EXWZ', 'Operador Ica 1', 1, 'operador', 1, '2026-03-08 00:27:04'),
(10, 'op_lima1', '$2y$12$IR1Tu4hSB7X0dV2zA6aFRmG5P9oK3En8ZBUM4QlVj0STvd6FYXA', 'Operador Lima 1', 4, 'operador', 1, '2026-03-08 00:27:04'),
(11, 'AutoGasTaller', '$2y$12$3lOuDbiaIDw8TInCZT822eof19DtOXJ1hJKFCYfoGkO97ru2pW64m', 'AutoGas Panel de Control', NULL, 'superadmin', 1, '2026-03-08 01:35:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(10) UNSIGNED NOT NULL,
  `cliente_id` smallint(5) UNSIGNED DEFAULT NULL COMMENT 'NULL si cita sin cuenta registrada',
  `sede_id` tinyint(3) UNSIGNED NOT NULL,
  `nombres` varchar(80) NOT NULL,
  `apellidos` varchar(80) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `marca` varchar(40) NOT NULL,
  `modelo` varchar(60) NOT NULL,
  `placa` varchar(8) DEFAULT NULL,
  `kilometraje` int(10) UNSIGNED DEFAULT NULL,
  `combustible` varchar(30) NOT NULL,
  `servicio` varchar(80) NOT NULL COMMENT 'Texto literal del dropdown del formulario web',
  `servicio_id` tinyint(3) UNSIGNED DEFAULT NULL COMMENT 'FK a servicios_catalogo — se rellena en inserción o por trigger',
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('pendiente','confirmado','completado','cancelado') NOT NULL DEFAULT 'pendiente',
  `notas` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`id`, `cliente_id`, `sede_id`, `nombres`, `apellidos`, `celular`, `correo`, `marca`, `modelo`, `placa`, `kilometraje`, `combustible`, `servicio`, `servicio_id`, `fecha`, `hora`, `estado`, `notas`, `created_at`) VALUES
(1, 1, 1, 'Carlos Enrique', 'Paredes Quispe', '956111001', 'cparedes@gmail.com', 'Toyota', 'Corolla', 'ABC-123', 85000, 'Gasolina', 'Conversión a GNV', 1, '2025-03-10', '09:00:00', 'confirmado', NULL, '2026-03-08 00:27:04'),
(2, 5, 1, 'Jorge Andres', 'Villanueva Poma', '956111005', NULL, 'Chevrolet', 'Aveo', 'EFG-567', 130000, 'Gasolina', 'Mantenimiento GNV', 3, '2025-03-10', '11:00:00', 'confirmado', NULL, '2026-03-08 00:27:04'),
(3, 16, 2, 'Edwin Rolando', 'Solis Aparcana', '956222001', 'esolis@gmail.com', 'Kia', 'Picanto', 'PQR-678', 72000, 'Gasolina', 'Conversión a GNV', 1, '2025-03-11', '10:00:00', 'pendiente', NULL, '2026-03-08 00:27:04'),
(4, 22, 3, 'Javier Eduardo', 'Palomino Rojas', '956333001', 'jpalomino@gmail.com', 'Toyota', 'Camry', 'VWX-234', 115000, 'Gasolina', 'Conversión a GLP', 2, '2025-03-12', '09:00:00', 'pendiente', NULL, '2026-03-08 00:27:04'),
(5, 29, 4, 'Ricardo Martin', 'Alvarez Soto', '956444001', 'ralvarez@gmail.com', 'Toyota', 'Land Cruiser', 'CDE-901', 178000, 'Diesel', 'Diagnóstico General', 6, '2025-03-13', '14:00:00', 'pendiente', NULL, '2026-03-08 00:27:04'),
(6, 37, 5, 'Alfredo Manuel', 'Benites Anticona', '956555001', 'abenites@gmail.com', 'Kia', 'Stinger', 'KLM-789', 38000, 'Gasolina', 'Conversión a GNV', 1, '2025-03-14', '09:00:00', 'confirmado', NULL, '2026-03-08 00:27:04'),
(7, 43, 6, 'Ernesto Raul', 'Canepa Huaman', '956666001', 'ecanepa@gmail.com', 'Mazda', 'BT-50', 'QRS-345', 135000, 'Diesel', 'Mantenimiento GLP', 4, '2025-03-15', '10:00:00', 'pendiente', NULL, '2026-03-08 00:27:04'),
(8, 47, 7, 'Gino Alessandro', 'Lazo Mamani', '956777001', 'glazo@gmail.com', 'Nissan', 'Kicks', 'UVW-789', 42000, 'Gasolina', 'Conversión a GNV', 1, '2025-03-17', '09:00:00', 'pendiente', NULL, '2026-03-08 00:27:04'),
(9, 3, 1, 'Luis Alberto', 'Ramos Flores', '956111003', 'lramos@yahoo.com', 'Hyundai', 'Tucson', 'CDE-345', 110000, 'Gasolina', 'Revisión Técnica', 5, '2025-03-18', '11:00:00', 'pendiente', NULL, '2026-03-08 00:27:04'),
(10, 30, 4, 'Claudia Beatriz', 'Mendoza Vargas', '956444002', 'cmendoza@yahoo.com', 'Kia', 'Sorento', 'DEF-012', 88000, 'Gasolina', 'Mecánica General', 7, '2025-03-19', '10:00:00', 'pendiente', NULL, '2026-03-08 00:27:04'),
(11, NULL, 2, 'Juan Carlos', 'Perez Garcia', '999999999', '', 'Kia', 'Sorento', 'ABC-123', 123, 'Gasolina', 'Mecánica General', 7, '2026-03-09', '08:00:00', 'cancelado', NULL, '2026-03-08 16:02:39'),
(12, NULL, 2, 'Juan Carlos', 'Perez Garcia', '999999999', '', 'Kia', 'Sorento', 'ABC-123', 21234, 'Gasolina', 'Mecánica General', 7, '2026-03-09', '09:00:00', 'completado', NULL, '2026-03-08 16:10:54'),
(13, NULL, 3, 'Juan Carlos', 'Perez Garcia', '999999999', '', 'Kia', 'Picanto', 'ABC-123', 45000, 'Diesel', 'Mantenimiento GNV', 3, '2026-03-10', '08:00:00', 'completado', NULL, '2026-03-09 13:27:19'),
(14, NULL, 2, 'Juan Carlos', 'Perez Garcia', '999999999', '', 'Kia', 'Sorento', 'ABC-123', 4500, 'Gasolina', 'Mantenimiento GLP', 4, '2026-03-10', '08:00:00', 'pendiente', NULL, '2026-03-09 14:56:17'),
(15, NULL, 1, 'Luciana', 'Vega Valles', '999999999', 'lucianavega@gmail.com', 'Kia', 'Picanto', 'AWD-123', 45000, 'Gasolina', 'Diagnóstico general', 6, '2026-03-10', '08:00:00', 'pendiente', NULL, '2026-03-09 15:57:59'),
(16, NULL, 1, 'Juan Carlos', 'Vega Valles', '999999999', 'ahajsgjsg@gmail.com', 'Kia', 'Sorento', 'ABC-123', 4500, 'Diesel', 'Mantenimiento GNV', 3, '2026-03-17', '08:00:00', 'confirmado', NULL, '2026-03-16 15:34:42'),
(17, NULL, 1, 'Juan Carlos', 'Vega Valles', '999999999', 'hahahs@gmail.com', 'Kia', 'Sorento', 'ABC-123', 4500, 'Gasolina', 'Mantenimiento GLP', 4, '2026-03-19', '08:00:00', 'pendiente', NULL, '2026-03-18 13:08:21');

--
-- Disparadores `citas`
--
DELIMITER $$
CREATE TRIGGER `trg_citas_before_insert` BEFORE INSERT ON `citas` FOR EACH ROW BEGIN
    DECLARE v_servicio_id TINYINT UNSIGNED DEFAULT NULL;

    IF NEW.servicio_id IS NULL AND NEW.servicio IS NOT NULL THEN
        SELECT id INTO v_servicio_id
        FROM `servicios_catalogo`
        WHERE LOWER(nombre) = LOWER(TRIM(NEW.servicio))
           OR nombre LIKE CONCAT('%', TRIM(NEW.servicio), '%')
        ORDER BY id ASC
        LIMIT 1;

        SET NEW.servicio_id = v_servicio_id;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `nombres` varchar(80) NOT NULL,
  `apellidos` varchar(80) NOT NULL,
  `dni` char(8) DEFAULT NULL,
  `celular` varchar(15) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `sede_principal` tinyint(3) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombres`, `apellidos`, `dni`, `celular`, `correo`, `sede_principal`, `created_at`) VALUES
(1, 'Carlos Enrique', 'Paredes Quispe', '45231876', '956111001', 'cparedes@gmail.com', 1, '2026-03-08 00:27:04'),
(2, 'Maria Fernanda', 'Huanca Sulca', '52361489', '956111002', 'mhuanca@hotmail.com', 1, '2026-03-08 00:27:04'),
(3, 'Luis Alberto', 'Ramos Flores', '38741256', '956111003', 'lramos@yahoo.com', 1, '2026-03-08 00:27:04'),
(4, 'Adriana Paola', 'Chavez Mendoza', '61478523', '956111004', 'achavez@gmail.com', 1, '2026-03-08 00:27:04'),
(5, 'Jorge Andres', 'Villanueva Poma', '74125896', '956111005', 'jvillanueva@gmail.com', 1, '2026-03-08 00:27:04'),
(6, 'Rosa Elena', 'Quispe Quispe', '83256147', '956111006', NULL, 1, '2026-03-08 00:27:04'),
(7, 'Pedro Pablo', 'Castillo Taipe', '29874563', '956111007', 'pcastillo@outlook.com', 1, '2026-03-08 00:27:04'),
(8, 'Yolanda Milagros', 'Lujan Ccanto', '47896321', '956111008', NULL, 1, '2026-03-08 00:27:04'),
(9, 'Raul Augusto', 'Perez Condori', '63214785', '956111009', 'rperez@gmail.com', 1, '2026-03-08 00:27:04'),
(10, 'Sandra Lucia', 'Torres Palomino', '85412369', '956111010', 'storres@gmail.com', 1, '2026-03-08 00:27:04'),
(11, 'Miguel Angel', 'Gutierrez Ayala', '14785236', '956111011', 'mgutierrez@hotmail.com', 1, '2026-03-08 00:27:04'),
(12, 'Liliana Carmen', 'Espinoza Huarcaya', '52147896', '956111012', NULL, 1, '2026-03-08 00:27:04'),
(13, 'Hugo Ruben', 'Martinez Ccari', '36985214', '956111013', 'hmartinez@gmail.com', 1, '2026-03-08 00:27:04'),
(14, 'Gabriela Ivonne', 'Cardenas Navarro', '74125630', '956111014', 'gcardenas@yahoo.com', 1, '2026-03-08 00:27:04'),
(15, 'Antonio Jose', 'Salinas Paucar', '98765432', '956111015', NULL, 1, '2026-03-08 00:27:04'),
(16, 'Edwin Rolando', 'Solis Aparcana', '45789632', '956222001', 'esolis@gmail.com', 2, '2026-03-08 00:27:04'),
(17, 'Celia Rosario', 'Laime Huanca', '23698741', '956222002', NULL, 2, '2026-03-08 00:27:04'),
(18, 'Dante Rodrigo', 'Ccopa Mamani', '81456923', '956222003', 'dccopa@hotmail.com', 2, '2026-03-08 00:27:04'),
(19, 'Flor de Maria', 'Quispe Salas', '56321478', '956222004', NULL, 2, '2026-03-08 00:27:04'),
(20, 'Renato Cesar', 'Huamani Flores', '74962135', '956222005', 'rhuamani@gmail.com', 2, '2026-03-08 00:27:04'),
(21, 'Patricia Luz', 'Meza Asto', '32145698', '956222006', NULL, 2, '2026-03-08 00:27:04'),
(22, 'Javier Eduardo', 'Palomino Rojas', '65231489', '956333001', 'jpalomino@gmail.com', 3, '2026-03-08 00:27:04'),
(23, 'Mariana Sofia', 'Rios Poma', '87412563', '956333002', 'mrios@outlook.com', 3, '2026-03-08 00:27:04'),
(24, 'Oscar Fabian', 'Vega Ccente', '41785296', '956333003', NULL, 3, '2026-03-08 00:27:04'),
(25, 'Ingrid Paola', 'Munoz Taipe', '63258741', '956333004', 'imunoz@gmail.com', 3, '2026-03-08 00:27:04'),
(26, 'Wilfredo Ivan', 'Huanca Torres', '25896314', '956333005', NULL, 3, '2026-03-08 00:27:04'),
(27, 'Gloria Esther', 'Capcha Chavez', '74123658', '956333006', 'gcapcha@hotmail.com', 3, '2026-03-08 00:27:04'),
(28, 'Ruben Dario', 'Pomalaza Vilchez', '98741236', '956333007', NULL, 3, '2026-03-08 00:27:04'),
(29, 'Ricardo Martin', 'Alvarez Soto', '41236985', '956444001', 'ralvarez@gmail.com', 4, '2026-03-08 00:27:04'),
(30, 'Claudia Beatriz', 'Mendoza Vargas', '52369874', '956444002', 'cmendoza@yahoo.com', 4, '2026-03-08 00:27:04'),
(31, 'Felix Orlando', 'Arroyo Pinto', '63741258', '956444003', NULL, 4, '2026-03-08 00:27:04'),
(32, 'Natalia Pilar', 'Guerrero Lazaro', '74125987', '956444004', 'nguerrero@gmail.com', 4, '2026-03-08 00:27:04'),
(33, 'Hernan Oswaldo', 'Diaz Cotrina', '85236147', '956444005', 'hdiaz@hotmail.com', 4, '2026-03-08 00:27:04'),
(34, 'Vanessa Karina', 'Llanos Huerta', '96321478', '956444006', NULL, 4, '2026-03-08 00:27:04'),
(35, 'Cesar Augusto', 'Montalvo Cespedes', '12547896', '956444007', 'cmontalvo@gmail.com', 4, '2026-03-08 00:27:04'),
(36, 'Isabel Cristina', 'Rojas Cabrera', '23658741', '956444008', 'irojas@outlook.com', 4, '2026-03-08 00:27:04'),
(37, 'Alfredo Manuel', 'Benites Anticona', '34785296', '956555001', 'abenites@gmail.com', 5, '2026-03-08 00:27:04'),
(38, 'Silvia Noemi', 'Aguilar Morales', '45896321', '956555002', NULL, 5, '2026-03-08 00:27:04'),
(39, 'Walter Enrique', 'Reyes Cabos', '56123784', '956555003', 'wreyes@gmail.com', 5, '2026-03-08 00:27:04'),
(40, 'Carmen Dolores', 'Sanchez Arroyo', '67412359', '956555004', 'csanchez@hotmail.com', 5, '2026-03-08 00:27:04'),
(41, 'Gilberto Noel', 'Chacon Pretell', '78523641', '956555005', NULL, 5, '2026-03-08 00:27:04'),
(42, 'Lucia Esperanza', 'Varas Rios', '89631425', '956555006', NULL, 5, '2026-03-08 00:27:04'),
(43, 'Ernesto Raul', 'Canepa Huaman', '90741236', '956666001', 'ecanepa@gmail.com', 6, '2026-03-08 00:27:04'),
(44, 'Pilar Jacinta', 'Asto Bendezu', '12896543', '956666002', NULL, 6, '2026-03-08 00:27:04'),
(45, 'Rodrigo Emilio', 'Suarez Castillo', '23147896', '956666003', 'rsuarez@yahoo.com', 6, '2026-03-08 00:27:04'),
(46, 'Estela Amalia', 'Ortega Neyra', '34258741', '956666004', NULL, 6, '2026-03-08 00:27:04'),
(47, 'Gino Alessandro', 'Lazo Mamani', '45369852', '956777001', 'glazo@gmail.com', 7, '2026-03-08 00:27:04'),
(48, 'Roxana Milagros', 'Apaza Quispe', '56471963', '956777002', 'rapaza@hotmail.com', 7, '2026-03-08 00:27:04'),
(49, 'Augusto Renato', 'Caceres Benavente', '67582074', '956777003', NULL, 7, '2026-03-08 00:27:04'),
(50, 'Diana Lorena', 'Arredondo Pinto', '78693185', '956777004', 'darredondo@gmail.com', 7, '2026-03-08 00:27:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_clientes`
--

CREATE TABLE `comentarios_clientes` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `cliente_id` smallint(5) UNSIGNED DEFAULT NULL,
  `nombre_publico` varchar(100) DEFAULT NULL COMMENT 'Nombre del visitante web (cuando no es cliente registrado)',
  `sede_id` tinyint(3) UNSIGNED NOT NULL,
  `servicio_id` tinyint(3) UNSIGNED DEFAULT NULL,
  `comentario` text NOT NULL,
  `calificacion` tinyint(3) UNSIGNED NOT NULL,
  `sentimiento` enum('positivo','neutro','negativo') NOT NULL DEFAULT 'neutro',
  `fuente` enum('web','whatsapp','presencial','google') NOT NULL DEFAULT 'web',
  `fecha` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Volcado de datos para la tabla `comentarios_clientes`
--

INSERT INTO `comentarios_clientes` (`id`, `cliente_id`, `nombre_publico`, `sede_id`, `servicio_id`, `comentario`, `calificacion`, `sentimiento`, `fuente`, `fecha`, `created_at`) VALUES
(1, 1, NULL, 1, 1, 'Excelente servicio de conversion, el equipo fue muy profesional y me explicaron todo el proceso. Mi carro ahora consume mucho menos.', 5, 'positivo', 'google', '2023-01-20', '2026-03-08 00:27:05'),
(2, 2, NULL, 1, 1, 'Muy buena atencion desde el primer momento. La conversion quedo perfecta y ya empece a ahorrar en combustible. Lo recomiendo al 100 por ciento.', 5, 'positivo', 'web', '2023-03-15', '2026-03-08 00:27:05'),
(3, 22, NULL, 3, 1, 'Increible trabajo. El tecnico me explico detalladamente como funciona el sistema. Precio justo y calidad de primera.', 5, 'positivo', 'google', '2023-02-18', '2026-03-08 00:27:05'),
(4, 37, NULL, 5, 2, 'La conversion a GLP fue rapida y bien hecha. El personal de Trujillo es muy amable y profesional. Volvere para el mantenimiento.', 5, 'positivo', 'google', '2023-03-05', '2026-03-08 00:27:05'),
(5, 47, NULL, 7, 1, 'Muy satisfecho con la conversion GNV en Arequipa. El tecnico fue muy detallista. Mi vehiculo funciona perfectamente.', 5, 'positivo', 'google', '2023-03-22', '2026-03-08 00:27:05'),
(6, 7, NULL, 1, 3, 'El mantenimiento de mi sistema GNV fue rapido y eficiente. Solo tomo 2 horas y el carro quedo como nuevo.', 4, 'positivo', 'web', '2023-06-10', '2026-03-08 00:27:05'),
(7, 16, NULL, 2, 1, 'Buen servicio en Nasca. Me atendieron puntual y explicaron bien cada paso de la conversion. Satisfecho con el resultado.', 4, 'positivo', 'presencial', '2023-04-15', '2026-03-08 00:27:05'),
(8, 32, NULL, 4, 1, 'El equipo de Lima es excelente. Me hicieron la conversion GNV en menos tiempo del esperado y con mucho cuidado.', 5, 'positivo', 'google', '2023-06-18', '2026-03-08 00:27:05'),
(9, 23, NULL, 3, 4, 'El mantenimiento fue rapido y economico. El tecnico detecto un pequeno problema adicional y lo resolvio sin costo extra.', 5, 'positivo', 'whatsapp', '2023-04-23', '2026-03-08 00:27:05'),
(10, 49, NULL, 7, 1, 'Muy contento con AutoGas Arequipa. El precio fue competitivo y el trabajo de conversion fue impecable.', 5, 'positivo', 'google', '2023-09-02', '2026-03-08 00:27:05'),
(11, 8, NULL, 1, 1, 'Excelente atencion y trabajo tecnico. Mi Civic ahora ahorra mas del 40 por ciento en combustible. Vale totalmente la inversion.', 5, 'positivo', 'google', '2024-02-24', '2026-03-08 00:27:05'),
(12, 25, NULL, 3, 1, 'Gran trabajo en Huancayo. El personal es muy capacitado y el sistema GNV fue instalado perfectamente.', 4, 'positivo', 'google', '2023-05-28', '2026-03-08 00:27:05'),
(13, 30, NULL, 4, 4, 'Rapido y eficiente el mantenimiento. Precios razonables y atencion de calidad en la sede Lima.', 4, 'positivo', 'web', '2024-01-31', '2026-03-08 00:27:05'),
(14, 38, NULL, 5, 4, 'Buen servicio en Trujillo. Mantenimiento GLP bien realizado. El carro quedo en excelente estado.', 4, 'positivo', 'presencial', '2024-03-14', '2026-03-08 00:27:05'),
(15, 44, NULL, 6, 1, 'Primera vez en AutoGas Chincha y quede encantado. Conversion GNV perfecta. Definitivamente regresare.', 5, 'positivo', 'google', '2023-07-23', '2026-03-08 00:27:05'),
(16, 11, NULL, 1, 1, 'La conversion de mi Accent fue excelente. El equipo fue muy profesional y el proceso duro exactamente lo prometido.', 4, 'positivo', 'web', '2024-04-05', '2026-03-08 00:27:05'),
(17, 34, NULL, 4, 1, 'Conversion GNV exitosa. El asesor me oriento muy bien sobre que kit convenia para mi Spark. Muy satisfecho.', 5, 'positivo', 'google', '2024-10-25', '2026-03-08 00:27:05'),
(18, 28, NULL, 3, 1, 'Buen trabajo en Huancayo. Mi Vitara ya circula con GNV y el ahorro es notable. Gracias al equipo.', 4, 'positivo', 'google', '2024-07-12', '2026-03-08 00:27:05'),
(19, 31, NULL, 4, 1, 'Excelente servicio de conversion para el Santa Fe. Lima tiene el mejor equipo tecnico que he visto.', 5, 'positivo', 'google', '2024-07-19', '2026-03-08 00:27:05'),
(20, 50, NULL, 7, 1, 'Muy profesionales en Arequipa. La conversion fue perfecta y el servicio post-venta es atento.', 5, 'positivo', 'google', '2024-07-31', '2026-03-08 00:27:05'),
(21, 14, NULL, 1, 1, 'Mi Swift ahora va con GNV y estoy ahorrando bastante. El equipo de Ica es de confianza.', 4, 'positivo', 'whatsapp', '2024-12-14', '2026-03-08 00:27:05'),
(22, 29, NULL, 4, 3, 'El mantenimiento preventivo fue muy bien realizado. Precio accesible y atencion puntual.', 4, 'positivo', 'web', '2024-11-22', '2026-03-08 00:27:05'),
(23, 9, NULL, 1, 4, 'Mantenimiento de calidad, rapido y bien explicado. El tecnico fue muy profesional.', 4, 'positivo', 'presencial', '2024-05-17', '2026-03-08 00:27:05'),
(24, 2, NULL, 1, 3, 'Ya van dos mantenimientos con AutoGas Ica y siempre excelente. Personal capacitado y puntual.', 5, 'positivo', 'google', '2025-01-10', '2026-03-08 00:27:05'),
(25, 37, NULL, 5, 3, 'Segundo mantenimiento y el servicio sigue siendo impecable en Trujillo. Muy recomendado.', 5, 'positivo', 'google', '2025-02-06', '2026-03-08 00:27:05'),
(26, 3, NULL, 1, 2, 'El servicio estuvo bien. La conversion tomo un poco mas de lo esperado pero el resultado fue satisfactorio.', 3, 'neutro', 'web', '2024-01-22', '2026-03-08 00:27:05'),
(27, 18, NULL, 2, 5, 'La revision tecnica fue correcta. Nada especial pero cumplio con lo esperado.', 3, 'neutro', 'presencial', '2023-10-13', '2026-03-08 00:27:05'),
(28, 33, NULL, 4, 7, 'Servicio mecanico adecuado. Los precios estan bien para Lima. La atencion pudo ser mas calida.', 3, 'neutro', 'web', '2023-05-06', '2026-03-08 00:27:05'),
(29, 40, NULL, 5, 3, 'El mantenimiento estuvo bien. Espere un poco mas de lo habitual pero quede conforme.', 3, 'neutro', 'whatsapp', '2024-08-30', '2026-03-08 00:27:05'),
(30, 46, NULL, 6, 6, 'El diagnostico fue correcto pero me parecio que explicaron poco sobre los hallazgos.', 3, 'neutro', 'presencial', '2024-05-10', '2026-03-08 00:27:05'),
(31, 10, NULL, 1, 7, 'Servicio estandar. Bien hecho pero sin nada que lo haga sobresalir.', 3, 'neutro', 'web', '2023-10-06', '2026-03-08 00:27:05'),
(32, 26, NULL, 3, 7, 'Mecanica general correcta. El precio estuvo acorde. La atencion fue normal.', 3, 'neutro', 'presencial', '2023-08-18', '2026-03-08 00:27:05'),
(33, 15, NULL, 1, 6, 'Diagnostico rapido pero la explicacion fue muy tecnica y no lo entendi bien.', 3, 'neutro', 'web', '2023-08-17', '2026-03-08 00:27:05'),
(34, 42, NULL, 5, 6, 'Diagnostico correcto pero el tiempo de espera fue largo. Deberian mejorar eso.', 3, 'neutro', 'google', '2024-09-20', '2026-03-08 00:27:05'),
(35, NULL, NULL, 3, 3, 'El mantenimiento estuvo bien en general, aunque me hubiera gustado mas informacion sobre el estado del sistema.', 3, 'neutro', 'google', '2024-06-21', '2026-03-08 00:27:05'),
(36, 6, NULL, 1, 3, 'El mantenimiento tardo mas de lo prometido y no me avisaron del retraso. Tuve que esperar 4 horas.', 2, 'negativo', 'web', '2024-09-08', '2026-03-08 00:27:05'),
(37, 13, NULL, 1, 7, 'Tuve que regresar porque el trabajo mecanico no quedo bien a la primera. Esperaba mas del servicio.', 2, 'negativo', 'google', '2024-09-06', '2026-03-08 00:27:05'),
(38, NULL, NULL, 4, NULL, 'La atencion en Lima fue fria y demoraron mucho en recibirme. El precio me parecio elevado para lo recibido.', 1, 'negativo', 'google', '2024-07-18', '2026-03-08 00:27:05'),
(39, NULL, NULL, 2, NULL, 'Llame varias veces y no contestaron. Cuando fui presencialmente me dijeron que no habia tecnico. Perdi mi tiempo.', 1, 'negativo', 'presencial', '2024-10-12', '2026-03-08 00:27:05'),
(40, NULL, NULL, 6, NULL, 'La sede de Chincha tiene poco personal y el tiempo de espera es muy largo. Deben mejorar la organizacion.', 2, 'negativo', 'google', '2025-01-17', '2026-03-08 00:27:05'),
(41, NULL, 'Carlos Mendoza', 1, NULL, 'La atención fue buena.', 4, 'positivo', 'web', '2026-03-08', '2026-03-08 20:52:03'),
(42, NULL, 'Carlos Mendoza', 1, NULL, 'La atención y las soluciones que me dieron fueron buenas.', 4, 'positivo', 'web', '2026-03-08', '2026-03-08 20:56:58'),
(43, NULL, 'Carlos Mendoza', 1, NULL, 'El servicio fue bueno.', 4, 'positivo', 'web', '2026-03-09', '2026-03-09 14:53:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `sede_id` tinyint(3) UNSIGNED NOT NULL,
  `nombres` varchar(80) NOT NULL,
  `apellidos` varchar(80) NOT NULL,
  `cargo` varchar(60) NOT NULL,
  `area` enum('Atencion al Cliente','Ventas','Soporte Tecnico') NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `sede_id`, `nombres`, `apellidos`, `cargo`, `area`, `activo`, `created_at`) VALUES
(1, 1, 'Marco Antonio', 'Zegarra Poma', 'Jefe de Taller', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(2, 1, 'Roberto Carlos', 'Huanca Quispe', 'Tecnico GNV Certificado', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(3, 1, 'Flor Milagros', 'Ayala de la Cruz', 'Asesora Comercial', 'Ventas', 1, '2026-03-08 00:27:04'),
(4, 1, 'Juan de Dios', 'Soto Palomino', 'Recepcionista', 'Atencion al Cliente', 1, '2026-03-08 00:27:04'),
(5, 2, 'Elvis Renato', 'Ccopa Huaman', 'Tecnico GNV/GLP', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(6, 2, 'Carmen Rosa', 'Asto Lazo', 'Asesora de Ventas', 'Ventas', 1, '2026-03-08 00:27:04'),
(7, 2, 'Diego Augusto', 'Flores Ccari', 'Tecnico Auxiliar', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(8, 3, 'Segundo Efrain', 'Palomino Mendoza', 'Jefe de Taller', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(9, 3, 'Yenny Margot', 'Torres Rojas', 'Asesora Comercial', 'Ventas', 1, '2026-03-08 00:27:04'),
(10, 3, 'Luis Enrique', 'Ccente Vega', 'Tecnico GLP Certificado', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(11, 3, 'Miriam Judith', 'Chavez Taipe', 'Asesora al Cliente', 'Atencion al Cliente', 1, '2026-03-08 00:27:04'),
(12, 4, 'Ernesto Paolo', 'Vargas Gutierrez', 'Jefe de Taller', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(13, 4, 'Stefania Paola', 'Mendez Rivas', 'Asesora Comercial Senior', 'Ventas', 1, '2026-03-08 00:27:04'),
(14, 4, 'Carlos Alberto', 'Pinto Diaz', 'Tecnico GNV Sr.', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(15, 4, 'Veronica Elena', 'Salas Uribe', 'Coordinadora CX', 'Atencion al Cliente', 1, '2026-03-08 00:27:04'),
(16, 4, 'Arturo Miguel', 'Cotrina Benavides', 'Tecnico GLP', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(17, 5, 'Fernando Jose', 'Anticona Reyes', 'Jefe de Taller', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(18, 5, 'Liliana Paola', 'Morales Pretell', 'Asesora Comercial', 'Ventas', 1, '2026-03-08 00:27:04'),
(19, 5, 'Marcos Andres', 'Cabos Varas', 'Tecnico GNV Certificado', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(20, 6, 'Patricia Noemi', 'Bendezu Ortega', 'Asesora de Ventas', 'Ventas', 1, '2026-03-08 00:27:04'),
(21, 6, 'Hugo Aurelio', 'Huaman Suarez', 'Tecnico Auxiliar', 'Ventas', 1, '2026-03-08 00:27:04'),
(22, 6, 'Silvia Aurora', 'Neyra Canepa', 'Asesora Junior', 'Ventas', 1, '2026-03-08 00:27:04'),
(23, 7, 'Raul Alejandro', 'Mamani Lazo', 'Jefe de Taller', 'Soporte Tecnico', 1, '2026-03-08 00:27:04'),
(24, 7, 'Angelica Maria', 'Benavente Apaza', 'Asesora Comercial', 'Ventas', 1, '2026-03-08 00:27:04'),
(25, 7, 'Nelson Ruben', 'Quispe Caceres', 'Tecnico GNV/GLP Senior', 'Soporte Tecnico', 1, '2026-03-08 00:27:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_servicios`
--

CREATE TABLE `historial_servicios` (
  `id` int(10) UNSIGNED NOT NULL,
  `cliente_id` smallint(5) UNSIGNED NOT NULL,
  `vehiculo_id` smallint(5) UNSIGNED NOT NULL,
  `sede_id` tinyint(3) UNSIGNED NOT NULL,
  `servicio_id` tinyint(3) UNSIGNED NOT NULL,
  `empleado_id` smallint(5) UNSIGNED DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time DEFAULT NULL,
  `precio_final` decimal(10,2) DEFAULT NULL,
  `estado` enum('completado','cancelado','en_proceso') NOT NULL DEFAULT 'completado',
  `notas` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `historial_servicios`
--

INSERT INTO `historial_servicios` (`id`, `cliente_id`, `vehiculo_id`, `sede_id`, `servicio_id`, `empleado_id`, `fecha`, `hora_inicio`, `hora_fin`, `precio_final`, `estado`, `notas`, `created_at`) VALUES
(1, 1, 1, 1, 1, 2, '2023-01-15', '08:30:00', '16:30:00', 3800.00, 'completado', 'Conversion GNV exitosa. Kit certificado instalado.', '2026-03-08 00:27:05'),
(2, 5, 5, 1, 3, 2, '2023-01-22', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento preventivo GNV. Todo en orden.', '2026-03-08 00:27:05'),
(3, 3, 3, 1, 6, 1, '2023-02-05', '10:00:00', '11:00:00', 90.00, 'completado', 'Diagnostico por falla de encendido.', '2026-03-08 00:27:05'),
(4, 22, 22, 3, 1, 10, '2023-02-14', '08:00:00', '16:00:00', 3800.00, 'completado', 'Conversion GNV. Cliente muy satisfecho.', '2026-03-08 00:27:05'),
(5, 29, 29, 4, 6, 14, '2023-02-20', '14:00:00', '15:00:00', 90.00, 'completado', 'Diagnostico general solicitado.', '2026-03-08 00:27:05'),
(6, 37, 37, 5, 2, 19, '2023-03-02', '09:00:00', '15:00:00', 2800.00, 'completado', 'Conversion GLP completada.', '2026-03-08 00:27:05'),
(7, 2, 2, 1, 1, 2, '2023-03-10', '08:30:00', '16:30:00', 3750.00, 'completado', 'Conversion GNV. Precio especial por referido.', '2026-03-08 00:27:05'),
(8, 47, 47, 7, 1, 25, '2023-03-18', '08:00:00', '16:00:00', 3900.00, 'completado', 'Conversion GNV. Vehiculo 2020.', '2026-03-08 00:27:05'),
(9, 30, 30, 4, 3, 14, '2023-03-25', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV programado.', '2026-03-08 00:27:05'),
(10, 7, 7, 1, 3, 2, '2023-04-05', '09:00:00', '11:30:00', 310.00, 'completado', 'Revision anual de sistema GNV.', '2026-03-08 00:27:05'),
(11, 16, 16, 2, 1, 5, '2023-04-12', '08:00:00', '16:00:00', 3800.00, 'completado', 'Primera conversion GNV en sede Nasca.', '2026-03-08 00:27:05'),
(12, 23, 23, 3, 4, 10, '2023-04-20', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP. Cambio de filtros.', '2026-03-08 00:27:05'),
(13, 33, 33, 4, 7, 14, '2023-05-03', '08:00:00', '11:00:00', 220.00, 'completado', 'Cambio de aceite y filtros. Afinamiento.', '2026-03-08 00:27:05'),
(14, 4, 4, 1, 5, 1, '2023-05-10', '10:00:00', '11:30:00', 150.00, 'completado', 'Revision tecnica pre-conversion.', '2026-03-08 00:27:05'),
(15, 43, 43, 6, 4, 20, '2023-05-18', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP rutinario.', '2026-03-08 00:27:05'),
(16, 25, 25, 3, 1, 10, '2023-05-25', '08:00:00', '16:00:00', 3750.00, 'completado', 'Conversion GNV Hyundai Creta.', '2026-03-08 00:27:05'),
(17, 48, 48, 7, 7, 23, '2023-06-01', '09:00:00', '12:00:00', 200.00, 'completado', 'Mantenimiento general. Revision de frenos.', '2026-03-08 00:27:05'),
(18, 9, 9, 1, 3, 2, '2023-06-07', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV semestral.', '2026-03-08 00:27:05'),
(19, 32, 32, 4, 1, 14, '2023-06-15', '08:00:00', '16:00:00', 3800.00, 'completado', 'Conversion GNV. Honda CR-V 2020.', '2026-03-08 00:27:05'),
(20, 38, 38, 5, 3, 19, '2023-06-22', '09:00:00', '11:30:00', 315.00, 'completado', 'Mantenimiento GNV. Se ajusto regulador.', '2026-03-08 00:27:05'),
(21, 1, 1, 1, 3, 2, '2023-07-04', '09:00:00', '11:30:00', 320.00, 'completado', 'Primer mantenimiento post-conversion.', '2026-03-08 00:27:05'),
(22, 22, 22, 3, 3, 10, '2023-07-12', '09:00:00', '11:30:00', 305.00, 'completado', 'Mantenimiento GNV. Cliente fidelizado.', '2026-03-08 00:27:05'),
(23, 44, 44, 6, 1, 21, '2023-07-20', '08:00:00', '14:00:00', 3800.00, 'completado', 'Conversion GNV Toyota Etios.', '2026-03-08 00:27:05'),
(24, 17, 17, 2, 1, 5, '2023-07-27', '08:00:00', '14:00:00', 3750.00, 'completado', 'Conversion GNV Hyundai Grand i10.', '2026-03-08 00:27:05'),
(25, 35, 35, 4, 7, 16, '2023-08-02', '09:00:00', '12:00:00', 210.00, 'completado', 'Frenos y afinamiento. Todo OK.', '2026-03-08 00:27:05'),
(26, 6, 6, 1, 5, 1, '2023-08-09', '10:00:00', '11:30:00', 150.00, 'completado', 'Revision tecnica Toyota Yaris.', '2026-03-08 00:27:05'),
(27, 26, 26, 3, 7, 8, '2023-08-15', '08:00:00', '11:00:00', 250.00, 'completado', 'Servicio mecanico general Frontier.', '2026-03-08 00:27:05'),
(28, 41, 41, 5, 4, 19, '2023-08-22', '09:00:00', '11:00:00', 275.00, 'completado', 'Mantenimiento GLP Honda Pilot.', '2026-03-08 00:27:05'),
(29, 49, 49, 7, 1, 25, '2023-08-30', '08:00:00', '14:00:00', 3700.00, 'completado', 'Conversion GNV Honda Jazz. Precio campana.', '2026-03-08 00:27:05'),
(30, 2, 2, 1, 4, 2, '2023-09-06', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Kia Rio.', '2026-03-08 00:27:05'),
(31, 10, 10, 1, 7, 1, '2023-10-03', '08:00:00', '11:00:00', 230.00, 'completado', 'Mantenimiento diesel Hilux.', '2026-03-08 00:27:05'),
(32, 18, 18, 2, 5, 6, '2023-10-10', '10:00:00', '11:30:00', 150.00, 'completado', 'Revision tecnica Fortuner.', '2026-03-08 00:27:05'),
(33, 27, 27, 3, 6, 8, '2023-10-18', '10:00:00', '11:00:00', 90.00, 'completado', 'Diagnostico sistema hibrido.', '2026-03-08 00:27:05'),
(34, 36, 36, 4, 3, 14, '2023-10-25', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV Toyota Vios.', '2026-03-08 00:27:05'),
(35, 39, 39, 5, 3, 19, '2023-11-02', '09:00:00', '11:30:00', 310.00, 'completado', 'Mantenimiento GNV Avanza.', '2026-03-08 00:27:05'),
(36, 45, 45, 6, 1, 20, '2023-11-09', '08:00:00', '14:00:00', 3800.00, 'completado', 'Conversion GNV Kia Seltos.', '2026-03-08 00:27:05'),
(37, 7, 7, 1, 4, 2, '2023-11-16', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Mazda3.', '2026-03-08 00:27:05'),
(38, 23, 23, 3, 6, 9, '2023-11-23', '10:00:00', '11:00:00', 85.00, 'completado', 'Diagnostico falla de sensor.', '2026-03-08 00:27:05'),
(39, 50, 50, 7, 4, 25, '2023-11-30', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Grand Vitara.', '2026-03-08 00:27:05'),
(40, 32, 32, 4, 3, 14, '2023-12-05', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV semestral.', '2026-03-08 00:27:05'),
(41, 1, 1, 1, 4, 2, '2023-12-12', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Corolla. Cliente leal.', '2026-03-08 00:27:05'),
(42, 22, 22, 3, 4, 10, '2023-12-19', '09:00:00', '11:00:00', 275.00, 'completado', 'Mantenimiento GLP Toyota Camry.', '2026-03-08 00:27:05'),
(43, 3, 3, 1, 2, 2, '2024-01-08', '08:00:00', '14:00:00', 2800.00, 'completado', 'Conversion GLP Hyundai Tucson.', '2026-03-08 00:27:05'),
(44, 47, 47, 7, 3, 25, '2024-01-15', '09:00:00', '11:30:00', 310.00, 'completado', 'Primer mantenimiento GNV Kicks.', '2026-03-08 00:27:05'),
(45, 16, 16, 2, 3, 5, '2024-01-22', '09:00:00', '11:30:00', 315.00, 'completado', 'Mantenimiento GNV Picanto.', '2026-03-08 00:27:05'),
(46, 29, 29, 4, 7, 12, '2024-01-30', '08:00:00', '11:00:00', 240.00, 'completado', 'Cambio aceite y filtros Land Cruiser.', '2026-03-08 00:27:05'),
(47, 37, 37, 5, 3, 19, '2024-02-05', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV Stinger.', '2026-03-08 00:27:05'),
(48, 43, 43, 6, 7, 20, '2024-02-13', '09:00:00', '12:00:00', 195.00, 'completado', 'Servicio mecanico general BT-50.', '2026-03-08 00:27:05'),
(49, 8, 8, 1, 1, 2, '2024-02-20', '08:00:00', '16:00:00', 3800.00, 'completado', 'Conversion GNV Honda Civic 2021.', '2026-03-08 00:27:05'),
(50, 24, 24, 3, 1, 10, '2024-02-27', '08:00:00', '14:00:00', 3800.00, 'completado', 'Conversion GNV Tracker.', '2026-03-08 00:27:05'),
(51, 30, 30, 4, 4, 14, '2024-03-05', '09:00:00', '11:00:00', 275.00, 'completado', 'Mantenimiento GLP Sorento.', '2026-03-08 00:27:05'),
(52, 38, 38, 5, 4, 19, '2024-03-12', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Elantra.', '2026-03-08 00:27:05'),
(53, 48, 48, 7, 7, 23, '2024-03-19', '08:00:00', '11:00:00', 215.00, 'completado', 'Mantenimiento general Innova.', '2026-03-08 00:27:05'),
(54, 5, 5, 1, 5, 1, '2024-03-26', '10:00:00', '11:30:00', 150.00, 'completado', 'Revision tecnica Aveo.', '2026-03-08 00:27:05'),
(55, 11, 11, 1, 1, 2, '2024-04-02', '08:00:00', '16:00:00', 3750.00, 'completado', 'Conversion GNV Accent. Precio campana.', '2026-03-08 00:27:05'),
(56, 25, 25, 3, 3, 10, '2024-04-09', '09:00:00', '11:30:00', 310.00, 'completado', 'Mantenimiento GNV Creta.', '2026-03-08 00:27:05'),
(57, 33, 33, 4, 5, 15, '2024-04-16', '10:00:00', '11:30:00', 150.00, 'completado', 'Revision tecnica Pathfinder.', '2026-03-08 00:27:05'),
(58, 41, 41, 5, 7, 17, '2024-04-23', '09:00:00', '12:00:00', 200.00, 'completado', 'Servicio mecanico Honda Pilot.', '2026-03-08 00:27:05'),
(59, 19, 19, 2, 4, 5, '2024-04-30', '09:00:00', '11:00:00', 270.00, 'completado', 'Mantenimiento GLP Nissan Versa.', '2026-03-08 00:27:05'),
(60, 46, 46, 6, 6, 20, '2024-05-07', '10:00:00', '11:00:00', 90.00, 'completado', 'Diagnostico sistema hibrido Ioniq.', '2026-03-08 00:27:05'),
(61, 9, 9, 1, 4, 2, '2024-05-14', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Sportage.', '2026-03-08 00:27:05'),
(62, 35, 35, 4, 3, 14, '2024-05-21', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV Mazda6.', '2026-03-08 00:27:05'),
(63, 20, 20, 2, 3, 5, '2024-05-28', '09:00:00', '11:30:00', 315.00, 'completado', 'Mantenimiento GNV Honda HR-V.', '2026-03-08 00:27:05'),
(64, 49, 49, 7, 3, 25, '2024-06-04', '09:00:00', '11:30:00', 310.00, 'completado', 'Mantenimiento GNV Jazz.', '2026-03-08 00:27:05'),
(65, 4, 4, 1, 2, 3, '2024-06-11', '08:00:00', '14:00:00', 2750.00, 'completado', 'Conversion GLP Nissan Sentra.', '2026-03-08 00:27:05'),
(66, 26, 26, 3, 6, 8, '2024-06-18', '10:00:00', '11:00:00', 85.00, 'completado', 'Diagnostico Frontier.', '2026-03-08 00:27:05'),
(67, 39, 39, 5, 4, 19, '2024-06-25', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Avanza.', '2026-03-08 00:27:05'),
(68, 12, 12, 1, 1, 2, '2024-07-02', '08:00:00', '16:00:00', 3800.00, 'completado', 'Conversion GNV X-Trail.', '2026-03-08 00:27:05'),
(69, 28, 28, 3, 1, 10, '2024-07-09', '08:00:00', '14:00:00', 3800.00, 'completado', 'Conversion GNV Vitara.', '2026-03-08 00:27:05'),
(70, 31, 31, 4, 1, 14, '2024-07-16', '08:00:00', '16:00:00', 3850.00, 'completado', 'Conversion GNV Santa Fe.', '2026-03-08 00:27:05'),
(71, 45, 45, 6, 3, 21, '2024-07-23', '09:00:00', '11:30:00', 310.00, 'completado', 'Mantenimiento GNV Seltos.', '2026-03-08 00:27:05'),
(72, 50, 50, 7, 1, 25, '2024-07-30', '08:00:00', '14:00:00', 3800.00, 'completado', 'Conversion GNV Grand Vitara.', '2026-03-08 00:27:05'),
(73, 6, 6, 1, 3, 2, '2024-08-06', '09:00:00', '11:30:00', 315.00, 'completado', 'Mantenimiento GNV Yaris.', '2026-03-08 00:27:05'),
(74, 21, 21, 2, 2, 5, '2024-08-13', '08:00:00', '14:00:00', 2800.00, 'completado', 'Conversion GLP CX-5.', '2026-03-08 00:27:05'),
(75, 32, 32, 4, 4, 14, '2024-08-20', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP CR-V.', '2026-03-08 00:27:05'),
(76, 40, 40, 5, 3, 19, '2024-08-27', '09:00:00', '11:30:00', 310.00, 'completado', 'Mantenimiento GNV Almera.', '2026-03-08 00:27:05'),
(77, 13, 13, 1, 7, 1, '2024-09-03', '09:00:00', '12:00:00', 205.00, 'completado', 'Servicio mecanico Sail.', '2026-03-08 00:27:05'),
(78, 36, 36, 4, 4, 14, '2024-09-10', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Vios.', '2026-03-08 00:27:05'),
(79, 42, 42, 5, 6, 17, '2024-09-17', '10:00:00', '11:00:00', 90.00, 'completado', 'Diagnostico electrico Captiva.', '2026-03-08 00:27:05'),
(80, 1, 1, 1, 3, 2, '2024-10-01', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV anual.', '2026-03-08 00:27:05'),
(81, 47, 47, 7, 4, 25, '2024-10-08', '09:00:00', '11:00:00', 275.00, 'completado', 'Mantenimiento GLP Kicks.', '2026-03-08 00:27:05'),
(82, 17, 17, 2, 3, 5, '2024-10-15', '09:00:00', '11:30:00', 310.00, 'completado', 'Mantenimiento GNV Grand i10.', '2026-03-08 00:27:05'),
(83, 34, 34, 4, 1, 14, '2024-10-22', '08:00:00', '14:00:00', 3700.00, 'completado', 'Conversion GNV Spark 2021. Precio campana.', '2026-03-08 00:27:05'),
(84, 38, 38, 5, 7, 17, '2024-10-29', '09:00:00', '12:00:00', 200.00, 'completado', 'Cambio de frenos Elantra.', '2026-03-08 00:27:05'),
(85, 43, 43, 6, 3, 20, '2024-11-05', '09:00:00', '11:30:00', 315.00, 'completado', 'Mantenimiento GNV BT-50.', '2026-03-08 00:27:05'),
(86, 22, 22, 3, 7, 8, '2024-11-12', '09:00:00', '12:00:00', 220.00, 'completado', 'Frenos y suspension Camry.', '2026-03-08 00:27:05'),
(87, 29, 29, 4, 3, 14, '2024-11-19', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV Land Cruiser.', '2026-03-08 00:27:05'),
(88, 7, 7, 1, 5, 1, '2024-11-26', '10:00:00', '11:30:00', 150.00, 'completado', 'Revision tecnica Mazda3.', '2026-03-08 00:27:05'),
(89, 50, 50, 7, 3, 25, '2024-12-03', '09:00:00', '11:30:00', 310.00, 'completado', 'Mantenimiento GNV Grand Vitara.', '2026-03-08 00:27:05'),
(90, 14, 14, 1, 1, 2, '2024-12-10', '08:00:00', '14:00:00', 3800.00, 'completado', 'Conversion GNV Swift.', '2026-03-08 00:27:05'),
(91, 25, 25, 3, 4, 10, '2024-12-17', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Creta.', '2026-03-08 00:27:05'),
(92, 33, 33, 4, 7, 12, '2024-12-24', '08:00:00', '11:00:00', 195.00, 'completado', 'Mantenimiento pre-navidad Pathfinder.', '2026-03-08 00:27:05'),
(93, 2, 2, 1, 3, 2, '2025-01-07', '09:00:00', '11:30:00', 325.00, 'completado', 'Mantenimiento GNV anio nuevo.', '2026-03-08 00:27:05'),
(94, 48, 48, 7, 3, 25, '2025-01-14', '09:00:00', '11:30:00', 310.00, 'completado', 'Mantenimiento GNV Innova.', '2026-03-08 00:27:05'),
(95, 16, 16, 2, 4, 5, '2025-01-21', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Picanto.', '2026-03-08 00:27:05'),
(96, 30, 30, 4, 1, 13, '2025-01-28', '08:00:00', '16:00:00', 3800.00, 'completado', 'Conversion GNV Sorento.', '2026-03-08 00:27:05'),
(97, 37, 37, 5, 3, 19, '2025-02-04', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV Stinger.', '2026-03-08 00:27:05'),
(98, 44, 44, 6, 4, 20, '2025-02-11', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Etios.', '2026-03-08 00:27:05'),
(99, 9, 9, 1, 5, 1, '2025-02-18', '10:00:00', '11:30:00', 150.00, 'completado', 'Revision tecnica Sportage.', '2026-03-08 00:27:05'),
(100, 23, 23, 3, 3, 10, '2025-02-25', '09:00:00', '11:30:00', 315.00, 'completado', 'Mantenimiento GNV Cerato.', '2026-03-08 00:27:05'),
(101, 31, 31, 4, 3, 14, '2025-03-04', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV Santa Fe.', '2026-03-08 00:27:05'),
(102, 39, 39, 5, 5, 17, '2025-03-07', '10:00:00', '11:30:00', 150.00, 'completado', 'Revision tecnica Avanza.', '2026-03-08 00:27:05'),
(103, 10, 10, 1, 7, 1, '2023-07-05', '08:00:00', '11:00:00', 230.00, 'completado', 'Mantenimiento diesel Hilux temporada alta.', '2026-03-08 00:27:05'),
(104, 15, 15, 1, 6, 1, '2023-08-14', '10:00:00', '11:00:00', 90.00, 'completado', 'Diagnostico RAV4.', '2026-03-08 00:27:05'),
(105, 20, 20, 2, 2, 5, '2023-09-20', '08:00:00', '14:00:00', 2750.00, 'completado', 'Conversion GLP Honda HR-V.', '2026-03-08 00:27:05'),
(106, 27, 27, 3, 5, 8, '2023-10-05', '10:00:00', '11:30:00', 150.00, 'completado', 'Revision tecnica Prius.', '2026-03-08 00:27:05'),
(107, 40, 40, 5, 1, 19, '2023-11-08', '08:00:00', '16:00:00', 3800.00, 'completado', 'Conversion GNV Almera.', '2026-03-08 00:27:05'),
(108, 46, 46, 6, 1, 21, '2023-12-06', '08:00:00', '14:00:00', 3750.00, 'completado', 'Conversion GNV Ioniq.', '2026-03-08 00:27:05'),
(109, 8, 8, 1, 5, 1, '2024-01-09', '10:00:00', '11:30:00', 150.00, 'completado', 'Revision tecnica Civic.', '2026-03-08 00:27:05'),
(110, 18, 18, 2, 7, 6, '2024-03-06', '09:00:00', '12:00:00', 210.00, 'completado', 'Cambio aceite Fortuner.', '2026-03-08 00:27:05'),
(111, 34, 34, 4, 6, 15, '2024-04-10', '10:00:00', '11:00:00', 90.00, 'completado', 'Diagnostico electrico Spark.', '2026-03-08 00:27:05'),
(112, 42, 42, 5, 2, 17, '2024-05-15', '08:00:00', '14:00:00', 2800.00, 'completado', 'Conversion GLP Captiva.', '2026-03-08 00:27:05'),
(113, 14, 14, 1, 6, 1, '2024-06-19', '10:00:00', '11:00:00', 85.00, 'completado', 'Diagnostico vibracion Swift.', '2026-03-08 00:27:05'),
(114, 24, 24, 3, 3, 10, '2024-07-24', '09:00:00', '11:30:00', 310.00, 'completado', 'Primer mantenimiento GNV Tracker.', '2026-03-08 00:27:05'),
(115, 44, 44, 6, 7, 20, '2024-08-28', '09:00:00', '12:00:00', 200.00, 'completado', 'Mantenimiento mecanico Etios.', '2026-03-08 00:27:05'),
(116, 3, 3, 1, 4, 2, '2024-09-04', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Tucson.', '2026-03-08 00:27:05'),
(117, 19, 19, 2, 7, 6, '2024-10-09', '09:00:00', '12:00:00', 195.00, 'completado', 'Servicio mecanico Versa.', '2026-03-08 00:27:05'),
(118, 28, 28, 3, 4, 10, '2024-11-06', '09:00:00', '11:00:00', 275.00, 'completado', 'Mantenimiento GLP Vitara.', '2026-03-08 00:27:05'),
(119, 11, 11, 1, 3, 2, '2024-12-11', '09:00:00', '11:30:00', 320.00, 'completado', 'Mantenimiento GNV Accent.', '2026-03-08 00:27:05'),
(120, 49, 49, 7, 4, 25, '2025-01-09', '09:00:00', '11:00:00', 280.00, 'completado', 'Mantenimiento GLP Jazz.', '2026-03-08 00:27:05'),
(121, 13, 13, 1, 2, 3, '2025-02-13', '08:00:00', '14:00:00', 2800.00, 'completado', 'Conversion GLP Sail.', '2026-03-08 00:27:05'),
(122, 41, 41, 5, 3, 19, '2025-03-06', '09:00:00', '11:30:00', 315.00, 'completado', 'Mantenimiento GNV Pilot.', '2026-03-08 00:27:05'),
(123, 15, 15, 1, 1, 2, '2024-02-07', '09:00:00', NULL, 0.00, 'cancelado', 'Cliente no se presento a la cita.', '2026-03-08 00:27:05'),
(124, 26, 26, 3, 2, 8, '2024-06-12', '09:00:00', NULL, 0.00, 'cancelado', 'Cancelado por el cliente. Reagendo.', '2026-03-08 00:27:05'),
(125, 45, 45, 6, 1, 20, '2023-09-14', '09:00:00', NULL, 0.00, 'cancelado', 'Equipo no disponible ese dia.', '2026-03-08 00:27:05'),
(126, 5, 5, 1, 3, 2, '2025-03-07', '09:00:00', NULL, 320.00, 'en_proceso', 'Mantenimiento GNV en curso.', '2026-03-08 00:27:05'),
(127, 35, 35, 4, 1, 14, '2025-03-07', '08:00:00', NULL, 3800.00, 'en_proceso', 'Conversion GNV Mazda6 en proceso.', '2026-03-08 00:27:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horas_bloqueadas`
--

CREATE TABLE `horas_bloqueadas` (
  `id` int(10) UNSIGNED NOT NULL,
  `sede_id` tinyint(3) UNSIGNED NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `cita_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `horas_bloqueadas`
--

INSERT INTO `horas_bloqueadas` (`id`, `sede_id`, `fecha`, `hora`, `cita_id`) VALUES
(1, 1, '2025-03-10', '09:00:00', 1),
(2, 1, '2025-03-10', '11:00:00', 2),
(3, 2, '2025-03-11', '10:00:00', 3),
(4, 3, '2025-03-12', '09:00:00', 4),
(5, 4, '2025-03-13', '14:00:00', 5),
(6, 5, '2025-03-14', '09:00:00', 6),
(7, 6, '2025-03-15', '10:00:00', 7),
(8, 7, '2025-03-17', '09:00:00', 8),
(9, 1, '2025-03-18', '11:00:00', 9),
(10, 4, '2025-03-19', '10:00:00', 10),
(11, 2, '2026-03-09', '08:00:00', 11),
(12, 2, '2026-03-09', '09:00:00', 12),
(13, 3, '2026-03-10', '08:00:00', 13),
(14, 2, '2026-03-10', '08:00:00', 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `ciudad` varchar(60) NOT NULL,
  `direccion` varchar(160) NOT NULL,
  `latitud` decimal(10,7) NOT NULL,
  `longitud` decimal(10,7) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sedes`
--

INSERT INTO `sedes` (`id`, `nombre`, `ciudad`, `direccion`, `latitud`, `longitud`, `created_at`) VALUES
(1, 'Ica', 'Ica', 'Av. Los Maestros 253, Ica', -14.0699400, -75.7288900, '2026-03-08 00:27:04'),
(2, 'Nasca', 'Nasca', 'Jr. Lima 318, Nasca', -14.8294400, -74.9388600, '2026-03-08 00:27:04'),
(3, 'Huancayo', 'Huancayo', 'Av. Huancavelica 1245, Huancayo', -12.0650900, -75.2048600, '2026-03-08 00:27:04'),
(4, 'Lima', 'Lima', 'Av. Argentina 2845, Cercado de Lima', -12.0431800, -77.0499600, '2026-03-08 00:27:04'),
(5, 'Trujillo', 'Trujillo', 'Av. Industrial 879, La Esperanza, Trujillo', -8.1091600, -79.0324900, '2026-03-08 00:27:04'),
(6, 'Chincha', 'Chincha', 'Av. Mariscal Benavides 456, Chincha Alta', -13.4098600, -76.1349800, '2026-03-08 00:27:04'),
(7, 'Arequipa', 'Arequipa', 'Av. Aviacion 1102, Cerro Colorado, Arequipa', -16.3988900, -71.5350000, '2026-03-08 00:27:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sede_areas`
--

CREATE TABLE `sede_areas` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `sede_id` tinyint(3) UNSIGNED NOT NULL,
  `area` enum('Atencion al Cliente','Ventas','Soporte Tecnico') NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `whatsapp` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sede_areas`
--

INSERT INTO `sede_areas` (`id`, `sede_id`, `area`, `telefono`, `whatsapp`) VALUES
(1, 1, 'Atencion al Cliente', '056-234100', '956100001'),
(2, 1, 'Ventas', '056-234101', '956100002'),
(3, 1, 'Soporte Tecnico', '056-234102', '956100003'),
(4, 2, 'Ventas', '056-522100', '956200001'),
(5, 2, 'Soporte Tecnico', '056-522101', '956200002'),
(6, 3, 'Atencion al Cliente', '064-213100', '956300001'),
(7, 3, 'Ventas', '064-213101', '956300002'),
(8, 3, 'Soporte Tecnico', '064-213102', '956300003'),
(9, 4, 'Atencion al Cliente', '01-4251100', '956400001'),
(10, 4, 'Ventas', '01-4251101', '956400002'),
(11, 4, 'Soporte Tecnico', '01-4251102', '956400003'),
(12, 5, 'Ventas', '044-605100', '956500001'),
(13, 5, 'Soporte Tecnico', '044-605101', '956500002'),
(14, 6, 'Ventas', '056-261100', '956600001'),
(15, 7, 'Ventas', '054-412100', '956700001'),
(16, 7, 'Soporte Tecnico', '054-412101', '956700002');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios_catalogo`
--

CREATE TABLE `servicios_catalogo` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `categoria` enum('Conversion','Mantenimiento','Revision','Diagnostico','Mecanica') NOT NULL,
  `descripcion` text DEFAULT NULL,
  `palabras_clave` text DEFAULT NULL COMMENT 'Términos separados por coma para matching por la IA de diagnóstico',
  `precio_base` decimal(10,2) DEFAULT NULL COMMENT 'Precio referencial en soles',
  `duracion_hrs` decimal(4,1) DEFAULT NULL COMMENT 'Duracion estimada en horas',
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `servicios_catalogo`
--

INSERT INTO `servicios_catalogo` (`id`, `nombre`, `categoria`, `descripcion`, `palabras_clave`, `precio_base`, `duracion_hrs`, `activo`, `created_at`) VALUES
(1, 'Conversion a GNV', 'Conversion', 'Instalacion completa de kit GNV certificado OSINERGMIN. Incluye cilindro, regulador, inyectores y ECU.', 'gnv,gas natural,conversion,instalar gas,ahorrar combustible,gasnv,convertir a gas,kit gnv,cilindro gnv,inyectores,osinergmin,certificacion', 3800.00, 8.0, 1, '2026-03-08 00:27:04'),
(2, 'Conversion a GLP', 'Conversion', 'Instalacion completa de kit GLP tipo vapor o liquido. Certificado y con garantia de 1 anio.', 'glp,gas licuado,conversion,instalar gas,propano,butano,convertir glp,kit glp,cilindro glp,garantia', 2800.00, 6.0, 1, '2026-03-08 00:27:04'),
(3, 'Mantenimiento GNV', 'Mantenimiento', 'Servicio preventivo: revision de mangueras, valvulas, regulador, cilindro y ECU del sistema GNV.', 'mantenimiento gnv,revision gnv,servicio gnv,mangueras,valvulas,regulador,cilindro,ecu gnv,preventivo gnv,check gnv', 320.00, 2.5, 1, '2026-03-08 00:27:04'),
(4, 'Mantenimiento GLP', 'Mantenimiento', 'Servicio preventivo: revision de valvulas, regulador, cilindro, lineas y sensores del sistema GLP.', 'mantenimiento glp,revision glp,servicio glp,valvulas,regulador,sensores,lineas glp,preventivo glp,check glp', 280.00, 2.0, 1, '2026-03-08 00:27:04'),
(5, 'Revision tecnica', 'Revision', 'Revision tecnica vehicular. Evaluacion de emisiones, frenos, luces y sistemas de seguridad.', 'revision tecnica,tecnicogas,inspeccion vehicular,emisiones,frenos,luces,soat,seguridad vehicular,rtv', 150.00, 1.5, 1, '2026-03-08 00:27:04'),
(6, 'Diagnostico general', 'Diagnostico', 'Diagnostico electronico completo con scanner. Identificacion de fallas y recomendaciones.', 'diagnostico,scanner,falla,codigo error,luz tablero,check engine,problema electrico,averia,que tiene mi carro,revision electronica', 90.00, 1.0, 1, '2026-03-08 00:27:04'),
(7, 'Mecanica General', 'Mecanica', 'Servicios de mecanica automotriz general: cambio de aceite, frenos, afinamiento, suspension y mas.', 'mecanica,aceite,frenos,afinamiento,suspension,embrague,transmision,correa,bujias,filtro,ruidos,vibracion,taller mecanico', 200.00, 3.0, 1, '2026-03-08 00:27:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `cliente_id` smallint(5) UNSIGNED NOT NULL,
  `marca` varchar(40) NOT NULL,
  `modelo` varchar(60) NOT NULL,
  `anio` year(4) NOT NULL,
  `placa` varchar(8) NOT NULL,
  `combustible` enum('Gasolina','Diesel','GNV','GLP','Hibrido') NOT NULL DEFAULT 'Gasolina',
  `kilometraje` int(10) UNSIGNED DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `cliente_id`, `marca`, `modelo`, `anio`, `placa`, `combustible`, `kilometraje`, `color`, `created_at`) VALUES
(1, 1, 'Toyota', 'Corolla', '2018', 'ABC-123', 'Gasolina', 85000, 'Blanco', '2026-03-08 00:27:04'),
(2, 2, 'Kia', 'Rio', '2019', 'BCD-234', 'Gasolina', 62000, 'Plata', '2026-03-08 00:27:04'),
(3, 3, 'Hyundai', 'Tucson', '2017', 'CDE-345', 'Gasolina', 110000, 'Negro', '2026-03-08 00:27:04'),
(4, 4, 'Nissan', 'Sentra', '2020', 'DEF-456', 'Gasolina', 45000, 'Blanco', '2026-03-08 00:27:04'),
(5, 5, 'Chevrolet', 'Aveo', '2015', 'EFG-567', 'Gasolina', 130000, 'Rojo', '2026-03-08 00:27:04'),
(6, 6, 'Toyota', 'Yaris', '2019', 'FGH-678', 'Gasolina', 58000, 'Gris', '2026-03-08 00:27:04'),
(7, 7, 'Mazda', 'Mazda3', '2016', 'GHI-789', 'Gasolina', 94000, 'Azul', '2026-03-08 00:27:04'),
(8, 8, 'Honda', 'Civic', '2021', 'HIJ-890', 'Gasolina', 28000, 'Blanco', '2026-03-08 00:27:04'),
(9, 9, 'Kia', 'Sportage', '2018', 'IJK-901', 'Gasolina', 76000, 'Negro', '2026-03-08 00:27:04'),
(10, 10, 'Toyota', 'Hilux', '2017', 'JKL-012', 'Diesel', 145000, 'Plata', '2026-03-08 00:27:04'),
(11, 11, 'Hyundai', 'Accent', '2020', 'KLM-123', 'Gasolina', 41000, 'Blanco', '2026-03-08 00:27:04'),
(12, 12, 'Nissan', 'X-Trail', '2016', 'LMN-234', 'Gasolina', 102000, 'Gris', '2026-03-08 00:27:04'),
(13, 13, 'Chevrolet', 'Sail', '2019', 'MNO-345', 'Gasolina', 67000, 'Rojo', '2026-03-08 00:27:04'),
(14, 14, 'Suzuki', 'Swift', '2021', 'NOP-456', 'Gasolina', 22000, 'Naranja', '2026-03-08 00:27:04'),
(15, 15, 'Toyota', 'RAV4', '2015', 'OPQ-567', 'Gasolina', 138000, 'Verde', '2026-03-08 00:27:04'),
(16, 16, 'Kia', 'Picanto', '2018', 'PQR-678', 'Gasolina', 72000, 'Amarillo', '2026-03-08 00:27:04'),
(17, 17, 'Hyundai', 'Grand i10', '2020', 'QRS-789', 'Gasolina', 35000, 'Blanco', '2026-03-08 00:27:04'),
(18, 18, 'Toyota', 'Fortuner', '2017', 'RST-890', 'Diesel', 122000, 'Negro', '2026-03-08 00:27:04'),
(19, 19, 'Nissan', 'Versa', '2019', 'STU-901', 'Gasolina', 58000, 'Plata', '2026-03-08 00:27:04'),
(20, 20, 'Honda', 'HR-V', '2020', 'TUV-012', 'Gasolina', 44000, 'Blanco', '2026-03-08 00:27:04'),
(21, 21, 'Mazda', 'CX-5', '2018', 'UVW-123', 'Gasolina', 81000, 'Gris', '2026-03-08 00:27:04'),
(22, 22, 'Toyota', 'Camry', '2016', 'VWX-234', 'Gasolina', 115000, 'Blanco', '2026-03-08 00:27:04'),
(23, 23, 'Kia', 'Cerato', '2019', 'WXY-345', 'Gasolina', 53000, 'Negro', '2026-03-08 00:27:04'),
(24, 24, 'Chevrolet', 'Tracker', '2021', 'XYZ-456', 'Gasolina', 19000, 'Azul', '2026-03-08 00:27:04'),
(25, 25, 'Hyundai', 'Creta', '2018', 'YZA-567', 'Gasolina', 79000, 'Plata', '2026-03-08 00:27:04'),
(26, 26, 'Nissan', 'Frontier', '2016', 'ZAB-678', 'Diesel', 132000, 'Negro', '2026-03-08 00:27:04'),
(27, 27, 'Toyota', 'Prius', '2019', 'ABC-789', 'Hibrido', 62000, 'Blanco', '2026-03-08 00:27:04'),
(28, 28, 'Suzuki', 'Vitara', '2020', 'BCD-890', 'Gasolina', 31000, 'Rojo', '2026-03-08 00:27:04'),
(29, 29, 'Toyota', 'Land Cruiser', '2015', 'CDE-901', 'Diesel', 178000, 'Blanco', '2026-03-08 00:27:04'),
(30, 30, 'Kia', 'Sorento', '2018', 'DEF-012', 'Gasolina', 88000, 'Gris', '2026-03-08 00:27:04'),
(31, 31, 'Hyundai', 'Santa Fe', '2017', 'EFG-123', 'Gasolina', 107000, 'Negro', '2026-03-08 00:27:04'),
(32, 32, 'Honda', 'CR-V', '2020', 'FGH-234', 'Gasolina', 47000, 'Plata', '2026-03-08 00:27:04'),
(33, 33, 'Nissan', 'Pathfinder', '2016', 'GHI-345', 'Gasolina', 121000, 'Blanco', '2026-03-08 00:27:04'),
(34, 34, 'Chevrolet', 'Spark', '2021', 'HIJ-456', 'Gasolina', 15000, 'Verde', '2026-03-08 00:27:04'),
(35, 35, 'Mazda', 'Mazda6', '2018', 'IJK-567', 'Gasolina', 74000, 'Azul', '2026-03-08 00:27:04'),
(36, 36, 'Toyota', 'Vios', '2019', 'JKL-678', 'Gasolina', 56000, 'Blanco', '2026-03-08 00:27:04'),
(37, 37, 'Kia', 'Stinger', '2020', 'KLM-789', 'Gasolina', 38000, 'Negro', '2026-03-08 00:27:04'),
(38, 38, 'Hyundai', 'Elantra', '2017', 'LMN-890', 'Gasolina', 96000, 'Plata', '2026-03-08 00:27:04'),
(39, 39, 'Toyota', 'Avanza', '2015', 'MNO-901', 'Gasolina', 142000, 'Blanco', '2026-03-08 00:27:04'),
(40, 40, 'Nissan', 'Almera', '2019', 'NOP-012', 'Gasolina', 61000, 'Gris', '2026-03-08 00:27:04'),
(41, 41, 'Honda', 'Pilot', '2018', 'OPQ-123', 'Gasolina', 83000, 'Negro', '2026-03-08 00:27:04'),
(42, 42, 'Chevrolet', 'Captiva', '2016', 'PQR-234', 'Gasolina', 118000, 'Plata', '2026-03-08 00:27:04'),
(43, 43, 'Mazda', 'BT-50', '2017', 'QRS-345', 'Diesel', 135000, 'Blanco', '2026-03-08 00:27:04'),
(44, 44, 'Toyota', 'Etios', '2019', 'RST-456', 'Gasolina', 48000, 'Rojo', '2026-03-08 00:27:04'),
(45, 45, 'Kia', 'Seltos', '2021', 'STU-567', 'Gasolina', 21000, 'Azul', '2026-03-08 00:27:04'),
(46, 46, 'Hyundai', 'Ioniq', '2020', 'TUV-678', 'Hibrido', 33000, 'Blanco', '2026-03-08 00:27:04'),
(47, 47, 'Nissan', 'Kicks', '2020', 'UVW-789', 'Gasolina', 42000, 'Naranja', '2026-03-08 00:27:04'),
(48, 48, 'Toyota', 'Innova', '2017', 'VWX-890', 'Diesel', 127000, 'Plata', '2026-03-08 00:27:04'),
(49, 49, 'Honda', 'Jazz', '2018', 'WXY-901', 'Gasolina', 69000, 'Gris', '2026-03-08 00:27:04'),
(50, 50, 'Suzuki', 'Grand Vitara', '2016', 'XYZ-012', 'Gasolina', 108000, 'Negro', '2026-03-08 00:27:04');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_calificacion_sede`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_calificacion_sede` (
`sede_id` tinyint(3) unsigned
,`sede` varchar(60)
,`total_comentarios` bigint(21)
,`calificacion_promedio` decimal(6,2)
,`positivos` decimal(23,0)
,`neutros` decimal(23,0)
,`negativos` decimal(23,0)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_citas_resumen`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_citas_resumen` (
`sede` varchar(60)
,`estado` enum('pendiente','confirmado','completado','cancelado')
,`total` bigint(21)
,`primera_cita` date
,`ultima_cita` date
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_dashboard_citas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_dashboard_citas` (
`cita_id` int(10) unsigned
,`sede_id` tinyint(3) unsigned
,`sede` varchar(60)
,`fecha` date
,`hora` varchar(10)
,`estado` enum('pendiente','confirmado','completado','cancelado')
,`cliente_nombre` varchar(161)
,`celular` varchar(15)
,`correo` varchar(100)
,`marca` varchar(40)
,`modelo` varchar(60)
,`placa` varchar(8)
,`kilometraje` int(10) unsigned
,`combustible` varchar(30)
,`servicio` varchar(80)
,`servicio_id` tinyint(3) unsigned
,`servicio_categoria` enum('Conversion','Mantenimiento','Revision','Diagnostico','Mecanica')
,`notas` text
,`fecha_registro` timestamp
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_demanda_sede`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_demanda_sede` (
`sede_id` tinyint(3) unsigned
,`sede` varchar(60)
,`fecha` date
,`anio` int(4)
,`mes` int(2)
,`dia` int(2)
,`dia_semana_num` int(1)
,`dia_semana` varchar(9)
,`hora_num` int(2)
,`hora` varchar(10)
,`estado` enum('pendiente','confirmado','completado','cancelado')
,`total_citas` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_disponibilidad_citas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_disponibilidad_citas` (
`sede_id` tinyint(3) unsigned
,`sede` varchar(60)
,`fecha` date
,`hora_bloqueada` varchar(10)
,`cita_id` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_ingresos_sede_mes`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_ingresos_sede_mes` (
`sede` varchar(60)
,`sede_id` tinyint(3) unsigned
,`periodo` varchar(7)
,`total_servicios` bigint(21)
,`ingresos_totales` decimal(32,2)
,`ticket_promedio` decimal(11,2)
,`conversiones` decimal(23,0)
,`mantenimientos` decimal(23,0)
,`mecanica` decimal(23,0)
,`revisiones` decimal(23,0)
,`diagnosticos` decimal(23,0)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_perfil_cliente`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_perfil_cliente` (
`cliente_id` smallint(5) unsigned
,`cliente` varchar(161)
,`celular` varchar(15)
,`correo` varchar(100)
,`sede_principal` varchar(60)
,`total_visitas` bigint(21)
,`gasto_total` decimal(32,2)
,`ultima_visita` date
,`dias_sin_visita` int(7)
,`ticket_promedio` decimal(11,2)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `v_segmentacion_clientes`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `v_segmentacion_clientes` (
`cliente_id` smallint(5) unsigned
,`cliente` varchar(161)
,`celular` varchar(15)
,`sede_principal` varchar(60)
,`total_visitas` bigint(21)
,`gasto_total` decimal(32,2)
,`ultima_visita` date
,`dias_sin_visita` int(7)
,`ticket_promedio` decimal(11,2)
,`segmento_preliminar` varchar(13)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `v_calificacion_sede`
--
DROP TABLE IF EXISTS `v_calificacion_sede`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_calificacion_sede`  AS SELECT `s`.`id` AS `sede_id`, `s`.`nombre` AS `sede`, count(`cc`.`id`) AS `total_comentarios`, round(avg(`cc`.`calificacion`),2) AS `calificacion_promedio`, sum(`cc`.`sentimiento` = 'positivo') AS `positivos`, sum(`cc`.`sentimiento` = 'neutro') AS `neutros`, sum(`cc`.`sentimiento` = 'negativo') AS `negativos` FROM (`comentarios_clientes` `cc` join `sedes` `s` on(`s`.`id` = `cc`.`sede_id`)) GROUP BY `s`.`id` ORDER BY round(avg(`cc`.`calificacion`),2) DESC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_citas_resumen`
--
DROP TABLE IF EXISTS `v_citas_resumen`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_citas_resumen`  AS SELECT `s`.`nombre` AS `sede`, `c`.`estado` AS `estado`, count(0) AS `total`, min(`c`.`fecha`) AS `primera_cita`, max(`c`.`fecha`) AS `ultima_cita` FROM (`citas` `c` join `sedes` `s` on(`s`.`id` = `c`.`sede_id`)) GROUP BY `s`.`id`, `c`.`estado` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_dashboard_citas`
--
DROP TABLE IF EXISTS `v_dashboard_citas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_dashboard_citas`  AS SELECT `c`.`id` AS `cita_id`, `s`.`id` AS `sede_id`, `s`.`nombre` AS `sede`, `c`.`fecha` AS `fecha`, time_format(`c`.`hora`,'%H:%i') AS `hora`, `c`.`estado` AS `estado`, concat(`c`.`nombres`,' ',`c`.`apellidos`) AS `cliente_nombre`, `c`.`celular` AS `celular`, `c`.`correo` AS `correo`, `c`.`marca` AS `marca`, `c`.`modelo` AS `modelo`, `c`.`placa` AS `placa`, `c`.`kilometraje` AS `kilometraje`, `c`.`combustible` AS `combustible`, `c`.`servicio` AS `servicio`, `c`.`servicio_id` AS `servicio_id`, `sc`.`categoria` AS `servicio_categoria`, `c`.`notas` AS `notas`, `c`.`created_at` AS `fecha_registro` FROM ((`citas` `c` join `sedes` `s` on(`s`.`id` = `c`.`sede_id`)) left join `servicios_catalogo` `sc` on(`sc`.`id` = `c`.`servicio_id`)) ORDER BY `c`.`fecha` DESC, `c`.`hora` DESC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_demanda_sede`
--
DROP TABLE IF EXISTS `v_demanda_sede`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_demanda_sede`  AS SELECT `s`.`id` AS `sede_id`, `s`.`nombre` AS `sede`, `c`.`fecha` AS `fecha`, year(`c`.`fecha`) AS `anio`, month(`c`.`fecha`) AS `mes`, dayofmonth(`c`.`fecha`) AS `dia`, dayofweek(`c`.`fecha`) AS `dia_semana_num`, dayname(`c`.`fecha`) AS `dia_semana`, hour(`c`.`hora`) AS `hora_num`, time_format(`c`.`hora`,'%H:%i') AS `hora`, `c`.`estado` AS `estado`, count(`c`.`id`) AS `total_citas` FROM (`citas` `c` join `sedes` `s` on(`s`.`id` = `c`.`sede_id`)) GROUP BY `s`.`id`, `s`.`nombre`, `c`.`fecha`, year(`c`.`fecha`), month(`c`.`fecha`), dayofmonth(`c`.`fecha`), dayofweek(`c`.`fecha`), dayname(`c`.`fecha`), hour(`c`.`hora`), time_format(`c`.`hora`,'%H:%i'), `c`.`estado` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_disponibilidad_citas`
--
DROP TABLE IF EXISTS `v_disponibilidad_citas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_disponibilidad_citas`  AS SELECT `hb`.`sede_id` AS `sede_id`, `s`.`nombre` AS `sede`, `hb`.`fecha` AS `fecha`, time_format(`hb`.`hora`,'%H:%i') AS `hora_bloqueada`, `hb`.`cita_id` AS `cita_id` FROM (`horas_bloqueadas` `hb` join `sedes` `s` on(`s`.`id` = `hb`.`sede_id`)) WHERE `hb`.`fecha` >= curdate() ORDER BY `hb`.`sede_id` ASC, `hb`.`fecha` ASC, `hb`.`hora` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_ingresos_sede_mes`
--
DROP TABLE IF EXISTS `v_ingresos_sede_mes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_ingresos_sede_mes`  AS SELECT `s`.`nombre` AS `sede`, `s`.`id` AS `sede_id`, date_format(`hs`.`fecha`,'%Y-%m') AS `periodo`, count(`hs`.`id`) AS `total_servicios`, sum(`hs`.`precio_final`) AS `ingresos_totales`, round(avg(`hs`.`precio_final`),2) AS `ticket_promedio`, sum(`sc`.`categoria` = 'Conversion') AS `conversiones`, sum(`sc`.`categoria` = 'Mantenimiento') AS `mantenimientos`, sum(`sc`.`categoria` = 'Mecanica') AS `mecanica`, sum(`sc`.`categoria` = 'Revision') AS `revisiones`, sum(`sc`.`categoria` = 'Diagnostico') AS `diagnosticos` FROM ((`historial_servicios` `hs` join `sedes` `s` on(`s`.`id` = `hs`.`sede_id`)) join `servicios_catalogo` `sc` on(`sc`.`id` = `hs`.`servicio_id`)) WHERE `hs`.`estado` = 'completado' GROUP BY `s`.`id`, date_format(`hs`.`fecha`,'%Y-%m') ORDER BY `s`.`nombre` ASC, date_format(`hs`.`fecha`,'%Y-%m') ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_perfil_cliente`
--
DROP TABLE IF EXISTS `v_perfil_cliente`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_perfil_cliente`  AS SELECT `c`.`id` AS `cliente_id`, concat(`c`.`nombres`,' ',`c`.`apellidos`) AS `cliente`, `c`.`celular` AS `celular`, `c`.`correo` AS `correo`, `s`.`nombre` AS `sede_principal`, count(`hs`.`id`) AS `total_visitas`, coalesce(sum(`hs`.`precio_final`),0) AS `gasto_total`, max(`hs`.`fecha`) AS `ultima_visita`, to_days(curdate()) - to_days(max(`hs`.`fecha`)) AS `dias_sin_visita`, round(avg(`hs`.`precio_final`),2) AS `ticket_promedio` FROM ((`clientes` `c` left join `sedes` `s` on(`s`.`id` = `c`.`sede_principal`)) left join `historial_servicios` `hs` on(`hs`.`cliente_id` = `c`.`id` and `hs`.`estado` = 'completado')) GROUP BY `c`.`id` ;

-- --------------------------------------------------------

--
-- Estructura para la vista `v_segmentacion_clientes`
--
DROP TABLE IF EXISTS `v_segmentacion_clientes`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_segmentacion_clientes`  AS SELECT `c`.`id` AS `cliente_id`, concat(`c`.`nombres`,' ',`c`.`apellidos`) AS `cliente`, `c`.`celular` AS `celular`, `s`.`nombre` AS `sede_principal`, count(`hs`.`id`) AS `total_visitas`, coalesce(sum(`hs`.`precio_final`),0) AS `gasto_total`, max(`hs`.`fecha`) AS `ultima_visita`, to_days(curdate()) - to_days(max(`hs`.`fecha`)) AS `dias_sin_visita`, round(avg(`hs`.`precio_final`),2) AS `ticket_promedio`, CASE WHEN count(`hs`.`id`) = 0 THEN 'sin_historial' WHEN count(`hs`.`id`) = 1 AND to_days(curdate()) - to_days(max(`hs`.`fecha`)) <= 180 THEN 'nuevo' WHEN count(`hs`.`id`) >= 2 AND to_days(curdate()) - to_days(max(`hs`.`fecha`)) <= 365 THEN 'recurrente' ELSE 'inactivo' END AS `segmento_preliminar` FROM ((`clientes` `c` left join `sedes` `s` on(`s`.`id` = `c`.`sede_principal`)) left join `historial_servicios` `hs` on(`hs`.`cliente_id` = `c`.`id` and `hs`.`estado` = 'completado')) GROUP BY `c`.`id`, `c`.`nombres`, `c`.`apellidos`, `c`.`celular`, `s`.`nombre` ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin_usuarios`
--
ALTER TABLE `admin_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_admin_usuario` (`usuario`),
  ADD KEY `idx_admin_sede` (`sede_id`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_citas_cliente` (`cliente_id`),
  ADD KEY `idx_citas_sede` (`sede_id`),
  ADD KEY `idx_citas_fecha` (`fecha`),
  ADD KEY `idx_citas_estado` (`estado`),
  ADD KEY `idx_citas_sede_fecha` (`sede_id`,`fecha`,`estado`),
  ADD KEY `idx_citas_servicio_id` (`servicio_id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_cliente_dni` (`dni`),
  ADD KEY `idx_cliente_celular` (`celular`),
  ADD KEY `idx_cliente_sede` (`sede_principal`);

--
-- Indices de la tabla `comentarios_clientes`
--
ALTER TABLE `comentarios_clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_com_cliente` (`cliente_id`),
  ADD KEY `idx_com_sede` (`sede_id`),
  ADD KEY `idx_com_servicio` (`servicio_id`),
  ADD KEY `idx_com_sentim` (`sentimiento`),
  ADD KEY `idx_com_fecha_sent` (`fecha`,`sentimiento`),
  ADD KEY `idx_com_sede_calif` (`sede_id`,`calificacion`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_emp_sede` (`sede_id`),
  ADD KEY `idx_emp_area` (`area`);

--
-- Indices de la tabla `historial_servicios`
--
ALTER TABLE `historial_servicios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_hs_cliente` (`cliente_id`),
  ADD KEY `idx_hs_vehiculo` (`vehiculo_id`),
  ADD KEY `idx_hs_sede` (`sede_id`),
  ADD KEY `idx_hs_servicio` (`servicio_id`),
  ADD KEY `idx_hs_empleado` (`empleado_id`),
  ADD KEY `idx_hs_fecha` (`fecha`),
  ADD KEY `idx_hs_sede_fecha` (`sede_id`,`fecha`),
  ADD KEY `idx_hs_servicio_fecha` (`servicio_id`,`fecha`),
  ADD KEY `idx_hs_precio_estado` (`precio_final`,`estado`),
  ADD KEY `idx_hs_cliente_fecha` (`cliente_id`,`fecha`);

--
-- Indices de la tabla `horas_bloqueadas`
--
ALTER TABLE `horas_bloqueadas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_hb_sede_fecha_hora` (`sede_id`,`fecha`,`hora`),
  ADD KEY `idx_hb_cita` (`cita_id`),
  ADD KEY `idx_hb_fecha` (`fecha`),
  ADD KEY `idx_hb_sede_fecha` (`sede_id`,`fecha`);

--
-- Indices de la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_sedes_nombre` (`nombre`);

--
-- Indices de la tabla `sede_areas`
--
ALTER TABLE `sede_areas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_sede_area` (`sede_id`,`area`),
  ADD KEY `idx_sede_areas_sede` (`sede_id`);

--
-- Indices de la tabla `servicios_catalogo`
--
ALTER TABLE `servicios_catalogo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_servicio_nombre` (`nombre`),
  ADD KEY `idx_servicio_categoria` (`categoria`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_vehiculo_placa` (`placa`),
  ADD KEY `idx_vehiculo_cliente` (`cliente_id`),
  ADD KEY `idx_vehiculo_marca` (`marca`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin_usuarios`
--
ALTER TABLE `admin_usuarios`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `comentarios_clientes`
--
ALTER TABLE `comentarios_clientes`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `historial_servicios`
--
ALTER TABLE `historial_servicios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT de la tabla `horas_bloqueadas`
--
ALTER TABLE `horas_bloqueadas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `sedes`
--
ALTER TABLE `sedes`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `sede_areas`
--
ALTER TABLE `sede_areas`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `servicios_catalogo`
--
ALTER TABLE `servicios_catalogo`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admin_usuarios`
--
ALTER TABLE `admin_usuarios`
  ADD CONSTRAINT `fk_au_sede` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `fk_cit_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cit_sede` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cit_servicio` FOREIGN KEY (`servicio_id`) REFERENCES `servicios_catalogo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `fk_cli_sede` FOREIGN KEY (`sede_principal`) REFERENCES `sedes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentarios_clientes`
--
ALTER TABLE `comentarios_clientes`
  ADD CONSTRAINT `fk_com_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_com_sede` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_com_servicio` FOREIGN KEY (`servicio_id`) REFERENCES `servicios_catalogo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `fk_emp_sede` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_servicios`
--
ALTER TABLE `historial_servicios`
  ADD CONSTRAINT `fk_hs_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_hs_empleado` FOREIGN KEY (`empleado_id`) REFERENCES `empleados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_hs_sede` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_hs_servicio` FOREIGN KEY (`servicio_id`) REFERENCES `servicios_catalogo` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_hs_vehiculo` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculos` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `horas_bloqueadas`
--
ALTER TABLE `horas_bloqueadas`
  ADD CONSTRAINT `fk_hb_cita` FOREIGN KEY (`cita_id`) REFERENCES `citas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_hb_sede` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sede_areas`
--
ALTER TABLE `sede_areas`
  ADD CONSTRAINT `fk_sa_sede` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `fk_veh_cli` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
