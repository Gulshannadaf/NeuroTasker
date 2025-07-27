# NeuroTasks 
### Task Manager powered by AI Agents


## Running backend

Make sure Postgres DB is running on localhost:5432
```bash
docker run -d --restart always -e POSTGRES_USER="user" -e POSTGRES_PASSWORD="password" -e POSTGRES_DB="neurotasksai" -p 5432:5432 -v pgdata:/var/lib/postgresql/data  postgres:13 
```
(Docker files are under development)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```


## Running frontend

```bash
npm install
npm run dev
```