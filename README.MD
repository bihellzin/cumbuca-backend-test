docker run --name cumbuca-postgres -v /tmp/database:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=cumbuca_postgres_password -d postgres

npm install

npx prisma migrate dev --name init

npm run dev
