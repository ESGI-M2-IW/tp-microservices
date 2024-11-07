install_unix:
	[ -f .env ]
	pip install virtualenv
	python3 -m venv venv
	venv/bin/pip install -r requirements.txt
	venv/bin/python3 manage.py migrate
	venv/bin/python manage.py createsuperuser
	venv/bin/python manage.py runserver

install_windows:
	[ -f .env ]
	pip install virtualenv
	python -m venv venv
	venv/Scripts/pip install -r requirements.txt
	venv/Scripts/python manage.py migrate
	venv/Scripts/python manage.py createsuperuser
	venv/Scripts/python manage.py runserver

run_unix:
	[ -f .env ]
	pip install virtualenv
	python3 -m venv venv
	venv/bin/pip install -r requirements.txt
	venv/bin/python manage.py runserver

run_windows:
	[ -f .env ]
	pip install virtualenv
	python -m venv venv
	venv/Scripts/pip install -r requirements.txt
	venv/Scripts/python manage.py runserver

server_unix:
	venv/bin/python manage.py runserver

server_windows:
	venv/Scripts/python manage.py runserver