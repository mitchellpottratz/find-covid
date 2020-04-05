from .base import BaseModel
from .user import User

''' 
This model is holds information to reset the user's password
'''

class PasswordReset(BaseModel):
    __tablename__ = "pwreset"
    id = Column(Integer, primary_key=True)
    reset_key = Column(String(128), unique=True)
    user_id = Column(Integer, ForeignKey('User.id'), nullable=False)
    datetime = Column(DateTime(timezone=True), default=datetime.datetime.now)
    user = relationship(User, lazy='joined')
    has_activated = Column(Boolean, default=False) 