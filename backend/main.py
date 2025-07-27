from fastapi import FastAPI
from routers import tasks, agents
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_tables

app = FastAPI(title="NeuroTask AI API")

# Call this function to create tables when the app starts
@app.on_event("startup")
async def startup_event():
    create_db_tables()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(tasks.router, prefix="/tasks")
app.include_router(agents.router, prefix="/agents")