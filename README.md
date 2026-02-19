# Controle.Automoveis.Semi-novos
Criação de automação para semi novos

## Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- MySQL (para o banco de dados)

### Instalação
1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm run install:all
   ```

### Configuração
1. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente.
2. Execute o script SQL `database/init.sql` no MySQL para criar o banco de dados.

### Executar a Aplicação
Para executar a aplicação:
```bash
npm run dev
```

Isso iniciará o servidor Node.js com Express na porta 3001, servindo a interface web em JavaScript puro.

Acesse em: `http://localhost:3001`

### Scripts Disponíveis
- `npm run dev`: Executa o servidor em modo desenvolvimento
- `npm start`: Executa o servidor em modo produção

### Tecnologias
- Backend: Node.js com Express (otimizado com Helmet, Compression, Rate Limiting)
- Frontend: JavaScript puro (sem frameworks)
- Banco de Dados: MySQL com pool de conexões
- Autenticação: JWT com middleware de proteção

### Otimizações Implementadas
- **Segurança**: Helmet para headers de segurança, rate limiting para prevenir ataques
- **Performance**: Compressão de respostas, cache de arquivos estáticos, pool de conexões MySQL
- **Estrutura**: Middleware de autenticação, tratamento de erros, validação de entrada
- **Funcionalidades**: CRUD completo para veículos, interface responsiva

# RESUMO
Esta proposta apresenta o desenvolvimento de um Sistema Web Responsivo para Gestão de Pedidos de Peças para Seminovos da Chemarauto Veículos, com controle por perfis de acesso (Oficina, Logística, Administrativo e Diretor), automação de notificações, fluxo de aprovação financeira e dashboards gerenciais. O projeto será executado em 2 meses (1 mês de desenvolvimento + 1 mês de implantação e ajustes), com concessão de 3 meses de uso gratuito para testes internos. Após esse período, caso a empresa opte pela continuidade, o valor de licenciamento será de R$ 6.000,00.

# SUMÁRIO
1. Introdução
2. Objetivos
3. Justificativa
4. Escopo do Projeto
5. Metodologia de Desenvolvimento
6. Cronograma de Execução
7. Tecnologias Utilizadas
8. Implantação e Período de Testes
9. Investimento e Condições Comerciais
10. Considerações Finais

# 1 INTRODUÇÃO
A Chemarauto Veículos necessita de uma solução digital para organizar, controlar e auditar os pedidos de peças destinados aos veículos seminovos. Atualmente, processos descentralizados podem gerar atrasos, falhas de comunicação e ausência de rastreabilidade. Este projeto visa desenvolver um sistema moderno, seguro e responsivo, garantindo controle financeiro, aprovação hierárquica e acompanhamento em tempo real.

# 2 OBJETIVOS
## 2.1 Objetivo Geral
Desenvolver um sistema web completo para gestão de pedidos de peças, com controle de usuários, fluxo de aprovação e relatórios gerenciais.

## 2.2 Objetivos Específicos
* Implementar controle de usuários com autenticação JWT e níveis de acesso.
* Permitir cadastro e gerenciamento de veículos.
* Criar e acompanhar pedidos vinculados a veículos.
* Implementar aprovação obrigatória para pedidos acima de R$ 500,00.
* Criar notificações automáticas após 48 horas sem atualização.
* Disponibilizar dashboards mensais com indicadores estratégicos.
* Registrar trilha completa de auditoria.

# 3 JUSTIFICATIVA
A implementação do sistema proporcionará:
* Redução de falhas operacionais
* Controle financeiro mais rigoroso
* Transparência entre setores
* Rastreamento completo das decisões
* Agilidade na tomada de decisões estratégicas

# 4 ESCOPO DO PROJETO
## 4.1 Funcionalidades do MVP
### Cadastro de Veículos
* Placa
* Modelo
* Motor
* Observações

### Gestão de Pedidos
* Criação de pedidos pela Oficina
* Atualização pela Logística
* Aprovação pelo Diretor (acima de R$ 500,00)
* Dashboard mensal
* Notificação automática 48 horas
* Registro em log de auditoria

### Perfis de Usuário
* Oficina
* Logística
* Administrativo
* Diretor

# 5 METODOLOGIA DE DESENVOLVIMENTO
Será utilizada metodologia ágil (Scrum), com entregas incrementais.
* Planejamento de Sprint
* Desenvolvimento incremental
* Testes automatizados
* Demonstração para stakeholders
* Ajustes conforme feedback

# 6 CRONOGRAMA DE EXECUÇÃO
## FASE 1 — DESENVOLVIMENTO (1 MÊS)
### Sprint 1 – Estrutura Base (2 semanas)
* Planejamento e modelagem do banco
* Infraestrutura inicial
* Autenticação e controle de acesso
* CRUD de veículos
* Criação de pedidos
* Interface Oficina e Logística
* Job de notificação 48 horas
* Fluxo de aprovação
* Dashboard básico
* Testes automatizados

### Sprint 2 – Refinamento e Validação (2 semanas)
* Ajustes de interface
* Implementação completa do dashboard
* Auditoria completa
* Exportação CSV
* Correções e melhorias
* Validação com stakeholders
* Entrega do protótipo funcional

Entrega ao final do 1º mês: ✔ Sistema funcional (Protótipo Operacional)
✔ API documentada
✔ Ambiente de homologação

## FASE 2 — IMPLANTAÇÃO E INSTALAÇÃO (1 MÊS)
* Configuração em servidor definitivo
* Treinamento dos usuários
* Ajustes conforme uso real
* Monitoramento técnico
* Correções finais

Entrega ao final do 2º mês: ✔ Sistema 100% instalado
✔ Ambiente de produção ativo
✔ Equipe treinada

# 7 TECNOLOGIAS UTILIZADAS
Frontend: React (JavaScript / TypeScript)
Backend: Node.js (Express ou NestJS)
Banco de Dados: MySQL
Autenticação: JWT
Agendador de tarefas: Cron ou Bull
Testes: Jest e Supertest
Hospedagem: Servidor dedicado ou cloud
