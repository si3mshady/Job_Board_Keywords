FROM amazonlinux:latest

WORKDIR /app

COPY requirements.txt .


RUN yum install python3-pip -y

RUN yum install wget -y
RUN yum install unzip -y 
RUN pip3  install selenium==3.141.0  && pip3 install -r requirements.txt 
RUN /usr/bin/wget https://chromedriver.storage.googleapis.com/91.0.4472.101/chromedriver_linux64.zip

RUN unzip chromedriver_linux64.zip && rm chromedriver_linux64.zip

RUN  wget https://raw.githubusercontent.com/si3mshady/aws_lambda_functions-/master/google-chrome-repo.txt
RUN  mv google-chrome-repo.txt  /etc/yum.repos.d/google-chrome.repo
RUN yum install google-chrome-stable -y 
COPY webfetch.py .
EXPOSE 8000

CMD ["uvicorn", "webfetch:app",  "--host", "0.0.0.0", "--reload", "--port", "8000"]

# pip3 install FastAPI
#pip install uvicorn[standard]
# uvicorn webfetch:app --reload
#localhost:8000/dataset
# si3mshady/popularlanguages:3