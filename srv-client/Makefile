run:
	echo "Run srv-client install"
	pip install virtualenv
	python3 -m venv venv
	venv/bin/pip install -r requirements.txt
	venv/bin/python3 manage.py migrate
	echo "Create admin"
	venv/bin/python manage.py createsuperuser
	echo "Launch server"
	venv/bin/python manage.py runserver