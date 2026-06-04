CREATE DATABASE wash_bd;
USE wash_bd;

-- =========================
-- TABELA CLIENTE
-- =========================
CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20)
);

-- =========================
-- TABELA FUNCIONARIO
-- =========================
CREATE TABLE funcionario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50)
);

-- =========================
-- TABELA EQUIPE
-- =========================
CREATE TABLE equipe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);

-- =========================
-- N:N FUNCIONARIO ↔️ EQUIPE
-- =========================
CREATE TABLE funcionario_equipe (
    funcionario_id INT,
    equipe_id INT,
    PRIMARY KEY (funcionario_id, equipe_id),
    FOREIGN KEY (funcionario_id) REFERENCES funcionario(id),
    FOREIGN KEY (equipe_id) REFERENCES equipe(id)
);

-- =========================
-- TABELA CATEGORIA SERVIÇO
-- =========================
CREATE TABLE categoria_servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100)
);

-- =========================
-- TABELA SERVIÇO
-- =========================
CREATE TABLE servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255),
    valor DECIMAL(10,2),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categoria_servico(id)
);

-- =========================
-- TABELA AGENDAMENTO
-- =========================
CREATE TABLE agendamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    data DATE,
    horario_inicio TIME,
    horario_fim TIME,
    observacao TEXT,
    status VARCHAR(50),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id)
);

-- =========================
-- N:N AGENDAMENTO ↔️ SERVIÇO
-- =========================
CREATE TABLE agendamento_servico (
    agendamento_id INT,
    servico_id INT,
    PRIMARY KEY (agendamento_id, servico_id),
    FOREIGN KEY (agendamento_id) REFERENCES agendamento(id),
    FOREIGN KEY (servico_id) REFERENCES servico(id)
);

-- =========================
-- RELAÇÃO 1:N FUNCIONARIO → AGENDAMENTO
-- (quem executa o serviço)
-- =========================
ALTER TABLE agendamento
ADD funcionario_id INT,
ADD FOREIGN KEY (funcionario_id) REFERENCES funcionario(id);

-- =========================
-- RELAÇÃO 1:N EQUIPE → AGENDAMENTO
-- =========================
ALTER TABLE agendamento
ADD equipe_id INT,
ADD FOREIGN KEY (equipe_id) REFERENCES equipe(id);

select * from cliente;

select * from funcionario;

select * from agendamento_servico;