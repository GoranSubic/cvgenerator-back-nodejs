# act-cv-generator-be
    - CV Generator app - beckend
    - CV Generator - api using nodejs, express, pgsql

# Project commands
bash -c "cp -n .env.cvgen .env; npm install;";

# Start docker from start (run init sql)
docker compose down --volumes && docker-compose up

# Dev - run nodemon
npm run devStart

# ORM
    - Prisma
# Prisma Commands
    - npx prisma generate
    - npx prisma migrate dev