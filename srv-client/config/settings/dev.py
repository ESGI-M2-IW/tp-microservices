from .base import *

DEBUG = True

# Environment information
ENVIRONMENT_NAME = 'DEV'
ENVIRONMENT_COLOR = '#38cb65'

ALLOWED_HOSTS = ['localhost', '127.0.0.1']
CORS_ALLOWED_ORIGINS = ['http://localhost']
INTERNAL_IPS = ["127.0.0.1"]

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'base/static'),
    os.path.join(BASE_DIR, 'theme/static'),
]
