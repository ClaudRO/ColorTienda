"""
Django settings for centro_color project.

Generated by 'django-admin startproject' using Django 5.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
from django.urls import reverse_lazy

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-px0-$hc8&=silx3y^dx2!)&18d0d_v&%!l3_okq-faw7ac20ha'

DEBUG = True

# settings.py
TRANSBANK_COMMERCE_CODE = "597055555532"
TRANSBANK_API_KEY = "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"
TRANSBANK_ENVIRONMENT = "TEST"

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'centro_color.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'main/templates'],  # Indica a Django dónde encontrar las plantillas
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
        
    },

]
STATIC_URL = '/static/'  

STATICFILES_DIRS = [BASE_DIR / 'main/static']  # Indica dónde buscar archivos estáticos


WSGI_APPLICATION = 'centro_color.wsgi.application'

ALLOWED_HOSTS = ['127.0.0.1', 'localhost','centrocolor.cl','98.82.174.238']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'tbk_ecocolor',
<<<<<<< Updated upstream
        'USER': 'root', #root cuando se prueba en local
=======
        'USER': 'usuario_django',
>>>>>>> Stashed changes
        'PASSWORD': 'Duoc123!',
        'HOST': 'localhost',  # o dirección IP del servidor
        'PORT': '3306',
    }
    #'default': {
        #'ENGINE': 'django.db.backends.sqlite3',
        #'NAME': BASE_DIR / 'db.sqlite3',
    #}
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/



# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

LOGIN_REDIRECT_URL = reverse_lazy('index')
LOGOUT_REDIRECT_URL = reverse_lazy('index')

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Configuración para enviar correos
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'  # Utilizamos Gmail como servidor SMTP
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'claudior.ortega98@gmail.com'  # Tu correo de Gmail o el que uses para enviar los correos
EMAIL_HOST_PASSWORD = 'vmkr iodc xnmp aynj'  # Tu contraseña o la contraseña de aplicación
DEFAULT_FROM_EMAIL = 'webmaster@localhost'

# Configuración para sesiones
SESSION_EXPIRE_AT_BROWSER_CLOSE = True  # Cerrar sesión al cerrar el navegador

LOGIN_URL = '/login/'  # URL para redirigir si el usuario no está autenticado


GETNET_LOGIN = '7ffbb7bf1f7361b1200b2e8d74e1d76f'
GETNET_SECRET_KEY = 'SnZP3D63n3I9dH9O'
GETNET_URL_BASE = 'https://checkout.test.getnet.cl'

SESSION_COOKIE_SAMESITE = None
SESSION_COOKIE_SECURE = True  # Cambia a True si usas HTTPS con Ngrok

CSRF_TRUSTED_ORIGINS = ['https://d4ff-201-187-171-80.ngrok-free.app']


