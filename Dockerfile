FROM python:3.9.1

ENV PYTHONUNBUFFERED=1
WORKDIR /usr/src/app
COPY ./server/ ./
RUN pip install -r requirements.txt
RUN chmod +x ./entrypoint.sh