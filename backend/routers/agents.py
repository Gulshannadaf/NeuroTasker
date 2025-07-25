from fastapi import APIRouter
from models import Agent
from database import agents

router = APIRouter()

@router.get("/", response_model=list[Agent])
def get_agents():
    return agents
