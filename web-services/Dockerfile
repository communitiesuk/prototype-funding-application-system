FROM python:3.9
WORKDIR /usr/src/app
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt
CMD ["./manage.py", "runserver", "0.0.0.0:8000"]
