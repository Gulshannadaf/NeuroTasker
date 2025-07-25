from models import Task, Agent

tasks = [
    Task(id=1, title="Design new landing page", description="Create mockups", status="todo", priority="high", agent="Content Creator"),
    Task(id=2, title="Implement OAuth", description="Google login", status="in-progress", priority="high", agent="Project Manager"),
]

agents = [
    Agent(id=1, name="Research Assistant", role="Data Analysis", status="active", tasks_completed=24),
    Agent(id=2, name="Content Creator", role="Content Gen", status="active", tasks_completed=18),
    Agent(id=3, name="Project Manager", role="Planning", status="idle", tasks_completed=31),
]
