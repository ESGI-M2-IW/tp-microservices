run:
	echo "Run srv-client install"
	pip install virtualenv
	python -m venv venv
	venv/Scripts/pip install -r requirements.txt
	venv/Scripts/python manage.py migrate
	echo "Create admin"
	venv/Scripts/python manage.py createsuperuser
	echo "Launch server"
	venv/Scripts/python manage.py runserver