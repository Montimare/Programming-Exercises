# Backend
FROM python:3.12.2
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY /requirements.txt ./
RUN pip install -r requirements.txt
COPY /mysite .
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]