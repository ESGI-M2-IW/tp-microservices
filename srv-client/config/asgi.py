"""
ASGI config for srvClient project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from dotenv import load_dotenv

load_dotenv()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', f'config.settings.{"prod" if os.getenv("PY_ENV") == "prod" else "dev"}')

application = get_asgi_application()