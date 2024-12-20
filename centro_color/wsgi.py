"""
WSGI config for centro_color project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
import sys
from django.core.wsgi import get_wsgi_application
from django.contrib.staticfiles.handlers import StaticFilesHandler

# Configurar el entorno de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'centro_color.settings')

# Añadir el path del proyecto si es necesario
path = os.path.expanduser('~/ccolor-tienda')
if path not in sys.path:
    sys.path.insert(0, path)

# Configurar el WSGI application con soporte para archivos estáticos
application = StaticFilesHandler(get_wsgi_application())
