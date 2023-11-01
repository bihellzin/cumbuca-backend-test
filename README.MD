Primeiramente, caso ainda não tenha uma imagem de Postgres, faça o download da imagem mais recente com o comando abaixo.

`docker pull postgres`

Depois, execute o comando abaixo para ter um banco de dados Postgres rodando num container docker.

`docker run --name cumbuca-postgres -v /tmp/database:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=cumbuca_postgres_password -d postgres`

Caso o container com o banco de dados ainda não tenha sido inicializado, rode o comando `docker start cumbuca-postgres` e você pode verificar se o container está rodando com o comando `docker ps`.

Com o banco de dados pronto, instale as dependências do projeto com `npm install`, rode as migrações existents com o comando `npx prisma migrate dev`.

E, finalmente, para rodar o projeto, execute o comando abaixo `npm run dev`
