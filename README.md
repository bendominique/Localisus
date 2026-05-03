\# 📍 LocaliSUS - Projeto Integrador (Senac)



Este é o \*\*Projeto Integrador\*\* desenvolvido para o curso de Tecnologia no \*\*Senac\*\*. A aplicação consiste em uma plataforma de geolocalização que integra os dados oficiais do \*\*LocalizaSUS\*\* com a \*\*Google Maps API\*\*, permitindo a busca e visualização de unidades de saúde e serviços do SUS de forma eficiente.



---



\## 🎯 A Solução

Durante o desenvolvimento, identificamos que o acesso aos dados de saúde pública muitas vezes é fragmentado ou de difícil compreensão para o cidadão comum. O \*\*LocalizaSUS App\*\* entrega as seguintes soluções:



\* \*\*Centralização de Dados:\*\* Consolida informações de diferentes microsserviços em uma interface única.

\* \*\*Acessibilidade Geográfica:\*\* Através da integração com Google Maps, o usuário visualiza instantaneamente a unidade mais próxima, reduzindo o tempo de busca em situações de necessidade.

\* \*\*Transparência e Confiabilidade:\*\* Utiliza a base de dados oficial do governo, garantindo que o usuário consulte informações reais de postos de saúde, UPAs e hospitais.

\* \*\*Eficiência Técnica:\*\* A arquitetura em microsserviços permite que a plataforma seja escalável, podendo adicionar novos serviços de saúde sem interromper o funcionamento do mapa principal.



---



\## 🛠️ Stack Tecnológica



\### \*\*Frontend (Interface)\*\*

\* \*\*React + Vite:\*\* Estrutura base para uma Single Page Application (SPA) de alta performance.

\* \*\*TypeScript:\*\* Tipagem estrita para garantir a integridade dos dados geoespaciais.

\* \*\*Google Maps API:\*\* Integração core para renderização de mapas, geocodificação e plotagem de marcadores.

\* \*\*CSS Puro / Modules:\*\* Estilização customizada e exclusiva para o projeto.



\### \*\*Backend (Microsserviços e API)\*\*

\* \*\*C# / .NET 8:\*\* Framework principal para o desenvolvimento da lógica de negócio.

\* \*\*Arquitetura de Microsserviços:\*\* Estrutura modular para independência funcional e escalabilidade.

\* \*\*Entity Framework Core:\*\* ORM utilizado para a persistência e manipulação de dados.

\* \*\*SQL Server:\*\* Banco de dados relacional para armazenamento de informações do ecossistema.

\* \*\*Scalar:\*\* Documentação interativa da API, proporcionando uma interface de testes moderna.



---



\## 📂 Fluxo de Funcionamento



1\.  \*\*Integração Governamental:\*\* O sistema consome os serviços de dados georreferenciados do LocalizaSUS.

2\.  \*\*Processamento via EF Core:\*\* Os dados são processados pelos microsserviços e persistidos no SQL Server.

3\.  \*\*Visualização Maps:\*\* O frontend consome a API própria e renderiza os pontos de interesse via Google Maps.

4\.  \*\*Interface Scalar:\*\* Documentação técnica acessível para visualização dos contratos da API.



---



\## 🚀 Como Executar o Projeto



1\.  \*\*Clonagem do Repositório:\*\*

&nbsp;   `git clone https://github.com/LuizSoares-sys/projeto-integrador-senac.git`



2\.  \*\*Configuração do Banco (Migrações):\*\*

&nbsp;   `dotnet ef database update`



3\.  \*\*Execução do Backend:\*\*

&nbsp;   `dotnet run` (Acesse o Scalar em: `/scalar/v1`)



4\.  \*\*Execução do Frontend:\*\*

&nbsp;   `npm install \&\& npm run dev`



---



\## 👥 Equipe de Desenvolvimento (Senac)



\* \*\*Benjamin Dominique\*\* - \[GitHub](https://github.com/SeuUsuarioAqui)

\* \*\*Italo Vinicius\*\* - \[@Italo15](https://github.com/Italo15)

\* \*\*Lucas Torino\*\* - \[@zerowavez](https://github.com/zerowavez)

\* \*\*Luiz Soares\*\* - \[@LuizSoares-sys](https://github.com/LuizSoares-sys)

\* \*\*Ryan Silva\*\* - \[@ryanzlxt](https://github.com/ryanzlxt)



---

> "Conectando tecnologia e saúde pública para o desenvolvimento social." — Projeto Integrador Senac 2026.

