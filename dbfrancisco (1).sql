-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03/03/2026 às 03:22
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbfrancisco`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `unidade` varchar(10) NOT NULL DEFAULT 'kg',
  `quantidade_por_unidade` decimal(10,3) NOT NULL,
  `quantidade_de_pacotes` int(11) NOT NULL DEFAULT 1,
  `validade` date NOT NULL,
  `data_recebimento` date NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `unidade`, `quantidade_por_unidade`, `quantidade_de_pacotes`, `validade`, `data_recebimento`, `created_at`, `updated_at`) VALUES
(1, 'Arroz', 'kg', 10.000, 1, '2027-11-28', '2026-03-02', '2026-03-02 04:18:18', '2026-03-02 04:18:18'),
(2, 'Arroz', 'kg', 10.000, 1, '2027-11-28', '2026-03-02', '2026-03-02 04:18:40', '2026-03-02 04:18:40'),
(3, 'Feijão', 'kg', 10.000, 1, '2027-11-28', '2026-03-02', '2026-03-02 04:21:12', '2026-03-02 04:21:12'),
(4, 'Arroz', 'kg', 10.000, 1, '2027-11-28', '2026-03-02', '2026-03-02 20:57:28', '2026-03-02 20:57:28'),
(5, 'Feijão', 'kg', 10.000, 1, '2027-11-28', '2026-03-02', '2026-03-02 21:40:47', '2026-03-02 21:40:47'),
(6, 'Macarrão', 'kg', 10.000, 1, '2027-11-28', '2026-03-02', '2026-03-02 22:04:07', '2026-03-02 22:04:07');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbcestas`
--

CREATE TABLE `tbcestas` (
  `codCes` int(11) NOT NULL,
  `dataDeSaida` date NOT NULL,
  `dataDeMontagem` datetime NOT NULL,
  `codUsu` int(11) NOT NULL,
  `codCli` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbclientes`
--

CREATE TABLE `tbclientes` (
  `codCli` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `cnpj` varchar(18) DEFAULT NULL,
  `cep` varchar(9) DEFAULT NULL,
  `rua` varchar(100) DEFAULT NULL,
  `numero` varchar(5) DEFAULT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `telCel` varchar(15) DEFAULT NULL,
  `referencia` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbfaleconosco`
--

CREATE TABLE `tbfaleconosco` (
  `codFaleConosco` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `assunto` varchar(100) DEFAULT NULL,
  `mensagem` varchar(200) NOT NULL,
  `codUsu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbjornal`
--

CREATE TABLE `tbjornal` (
  `codJor` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `dataDePublicacao` datetime NOT NULL,
  `descricao` varchar(10000) NOT NULL,
  `foto` longblob NOT NULL,
  `tema` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `codUsu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tblista`
--

CREATE TABLE `tblista` (
  `codList` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `peso` int(11) NOT NULL,
  `unidade` varchar(20) NOT NULL,
  `codUni` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tblista`
--

INSERT INTO `tblista` (`codList`, `descricao`, `peso`, `unidade`, `codUni`) VALUES
(1, 'Lista Padrão / Geral', 0, 'un', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tborigemdoacao`
--

CREATE TABLE `tborigemdoacao` (
  `codOri` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `cnpj` varchar(18) DEFAULT NULL,
  `cep` varchar(9) DEFAULT NULL,
  `rua` varchar(100) DEFAULT NULL,
  `numero` varchar(5) DEFAULT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `telCel` varchar(15) DEFAULT NULL,
  `referencia` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tborigemdoacao`
--

INSERT INTO `tborigemdoacao` (`codOri`, `nome`, `cpf`, `cnpj`, `cep`, `rua`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `telCel`, `referencia`) VALUES
(1, 'ROTARY', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbprodutos`
--

CREATE TABLE `tbprodutos` (
  `codProd` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `peso` decimal(10,3) NOT NULL,
  `unidade` varchar(20) NOT NULL,
  `codBar` varchar(13) NOT NULL,
  `dataDeEntrada` datetime NOT NULL,
  `dataDeValidade` datetime NOT NULL,
  `dataLimiteDeSaida` datetime DEFAULT NULL,
  `codUsu` int(11) NOT NULL,
  `codOri` int(11) NOT NULL,
  `codList` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbprodutos`
--

INSERT INTO `tbprodutos` (`codProd`, `descricao`, `quantidade`, `peso`, `unidade`, `codBar`, `dataDeEntrada`, `dataDeValidade`, `dataLimiteDeSaida`, `codUsu`, `codOri`, `codList`, `created_at`, `updated_at`, `createdAt`, `updatedAt`) VALUES
(2, 'Arroz', 1, 10.000, 'kg', '0000000000000', '2026-03-03 00:00:00', '2027-11-28 00:00:00', NULL, 1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2026-03-03 00:22:11', '2026-03-03 00:22:11'),
(5, 'Arroz', 1, 10.000, 'kg', '7480409038959', '2026-03-03 00:00:00', '2027-11-28 00:00:00', NULL, 1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2026-03-03 01:07:20', '2026-03-03 01:07:20'),
(6, 'Arroz', 1, 10.000, 'kg', '7445366975419', '2026-03-03 00:00:00', '2027-11-28 00:00:00', NULL, 1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2026-03-03 01:08:49', '2026-03-03 01:08:49'),
(7, 'Macarrão', 1, 10.000, 'kg', '5776868107322', '2026-03-03 00:00:00', '2027-11-28 00:00:00', NULL, 1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2026-03-03 01:16:48', '2026-03-03 01:16:48'),
(8, 'Arroz', 1, 10.000, 'kg', '1512819060339', '2026-03-03 00:00:00', '2027-11-28 00:00:00', NULL, 1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2026-03-03 01:30:48', '2026-03-03 01:30:48'),
(9, 'Arroz', 1, 10.000, 'kg', '0398332453602', '2026-03-03 00:00:00', '2027-11-28 00:00:00', NULL, 1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', '2026-03-03 01:45:05', '2026-03-03 01:45:05');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbsacola`
--

CREATE TABLE `tbsacola` (
  `codCes` int(11) NOT NULL,
  `codProd` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbunidades`
--

CREATE TABLE `tbunidades` (
  `codUni` int(11) NOT NULL,
  `descricao` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbunidades`
--

INSERT INTO `tbunidades` (`codUni`, `descricao`) VALUES
(2, 'GRAMAS (G)'),
(3, 'LITROS (L)'),
(4, 'MILILITROS (ML)'),
(1, 'QUILOGRAMAS (KG)'),
(5, 'UNIDADES (UN)');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbusuarios`
--

CREATE TABLE `tbusuarios` (
  `codUsu` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  `tipo` enum('ADMIN','USER') DEFAULT 'USER',
  `ativo` tinyint(1) DEFAULT 1,
  `codVol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbusuarios`
--

INSERT INTO `tbusuarios` (`codUsu`, `usuario`, `senha`, `tipo`, `ativo`, `codVol`) VALUES
(1, 'admin', '123', 'ADMIN', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbvoluntarios`
--

CREATE TABLE `tbvoluntarios` (
  `codVol` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telCel` varchar(15) DEFAULT NULL,
  `cpf` varchar(14) DEFAULT NULL,
  `cep` varchar(9) DEFAULT NULL,
  `rua` varchar(100) DEFAULT NULL,
  `numero` varchar(5) DEFAULT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `foto` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbvoluntarios`
--

INSERT INTO `tbvoluntarios` (`codVol`, `nome`, `telCel`, `cpf`, `cep`, `rua`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `ativo`, `foto`) VALUES
(1, 'Admin', '(11)90000-0000', '000.000.000-00', '00000-000', 'Grupo Francisco', '000', '', 'Jd.Francisco', 'São Paulo', 'SP', 1, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbcestas`
--
ALTER TABLE `tbcestas`
  ADD PRIMARY KEY (`codCes`),
  ADD KEY `codUsu` (`codUsu`),
  ADD KEY `codCli` (`codCli`);

--
-- Índices de tabela `tbclientes`
--
ALTER TABLE `tbclientes`
  ADD PRIMARY KEY (`codCli`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `cnpj` (`cnpj`);

--
-- Índices de tabela `tbfaleconosco`
--
ALTER TABLE `tbfaleconosco`
  ADD PRIMARY KEY (`codFaleConosco`),
  ADD KEY `codUsu` (`codUsu`);

--
-- Índices de tabela `tbjornal`
--
ALTER TABLE `tbjornal`
  ADD PRIMARY KEY (`codJor`),
  ADD KEY `codUsu` (`codUsu`);

--
-- Índices de tabela `tblista`
--
ALTER TABLE `tblista`
  ADD PRIMARY KEY (`codList`),
  ADD KEY `codUni` (`codUni`);

--
-- Índices de tabela `tborigemdoacao`
--
ALTER TABLE `tborigemdoacao`
  ADD PRIMARY KEY (`codOri`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `cnpj` (`cnpj`);

--
-- Índices de tabela `tbprodutos`
--
ALTER TABLE `tbprodutos`
  ADD PRIMARY KEY (`codProd`),
  ADD UNIQUE KEY `codBar` (`codBar`),
  ADD KEY `codUsu` (`codUsu`),
  ADD KEY `codOri` (`codOri`),
  ADD KEY `codList` (`codList`);

--
-- Índices de tabela `tbsacola`
--
ALTER TABLE `tbsacola`
  ADD PRIMARY KEY (`codCes`,`codProd`),
  ADD KEY `codProd` (`codProd`);

--
-- Índices de tabela `tbunidades`
--
ALTER TABLE `tbunidades`
  ADD PRIMARY KEY (`codUni`),
  ADD UNIQUE KEY `descricao` (`descricao`);

--
-- Índices de tabela `tbusuarios`
--
ALTER TABLE `tbusuarios`
  ADD PRIMARY KEY (`codUsu`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `codVol` (`codVol`);

--
-- Índices de tabela `tbvoluntarios`
--
ALTER TABLE `tbvoluntarios`
  ADD PRIMARY KEY (`codVol`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `tbcestas`
--
ALTER TABLE `tbcestas`
  MODIFY `codCes` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbclientes`
--
ALTER TABLE `tbclientes`
  MODIFY `codCli` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbfaleconosco`
--
ALTER TABLE `tbfaleconosco`
  MODIFY `codFaleConosco` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbjornal`
--
ALTER TABLE `tbjornal`
  MODIFY `codJor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tblista`
--
ALTER TABLE `tblista`
  MODIFY `codList` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tborigemdoacao`
--
ALTER TABLE `tborigemdoacao`
  MODIFY `codOri` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tbprodutos`
--
ALTER TABLE `tbprodutos`
  MODIFY `codProd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `tbunidades`
--
ALTER TABLE `tbunidades`
  MODIFY `codUni` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `tbusuarios`
--
ALTER TABLE `tbusuarios`
  MODIFY `codUsu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tbvoluntarios`
--
ALTER TABLE `tbvoluntarios`
  MODIFY `codVol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tbcestas`
--
ALTER TABLE `tbcestas`
  ADD CONSTRAINT `tbcestas_ibfk_1` FOREIGN KEY (`codUsu`) REFERENCES `tbusuarios` (`codUsu`),
  ADD CONSTRAINT `tbcestas_ibfk_2` FOREIGN KEY (`codCli`) REFERENCES `tbclientes` (`codCli`);

--
-- Restrições para tabelas `tbfaleconosco`
--
ALTER TABLE `tbfaleconosco`
  ADD CONSTRAINT `tbfaleconosco_ibfk_1` FOREIGN KEY (`codUsu`) REFERENCES `tbusuarios` (`codUsu`);

--
-- Restrições para tabelas `tbjornal`
--
ALTER TABLE `tbjornal`
  ADD CONSTRAINT `tbjornal_ibfk_1` FOREIGN KEY (`codUsu`) REFERENCES `tbusuarios` (`codUsu`);

--
-- Restrições para tabelas `tblista`
--
ALTER TABLE `tblista`
  ADD CONSTRAINT `tblista_ibfk_1` FOREIGN KEY (`codUni`) REFERENCES `tbunidades` (`codUni`);

--
-- Restrições para tabelas `tbprodutos`
--
ALTER TABLE `tbprodutos`
  ADD CONSTRAINT `tbprodutos_ibfk_1` FOREIGN KEY (`codUsu`) REFERENCES `tbusuarios` (`codUsu`),
  ADD CONSTRAINT `tbprodutos_ibfk_2` FOREIGN KEY (`codOri`) REFERENCES `tborigemdoacao` (`codOri`),
  ADD CONSTRAINT `tbprodutos_ibfk_3` FOREIGN KEY (`codList`) REFERENCES `tblista` (`codList`);

--
-- Restrições para tabelas `tbsacola`
--
ALTER TABLE `tbsacola`
  ADD CONSTRAINT `tbsacola_ibfk_1` FOREIGN KEY (`codCes`) REFERENCES `tbcestas` (`codCes`),
  ADD CONSTRAINT `tbsacola_ibfk_2` FOREIGN KEY (`codProd`) REFERENCES `tbprodutos` (`codProd`);

--
-- Restrições para tabelas `tbusuarios`
--
ALTER TABLE `tbusuarios`
  ADD CONSTRAINT `tbusuarios_ibfk_1` FOREIGN KEY (`codVol`) REFERENCES `tbvoluntarios` (`codVol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
