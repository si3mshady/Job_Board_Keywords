import os, sys, functools
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options




app = FastAPI()
options = Options()
options.add_argument("--start-maximized") 
# options.binary_location = '/usr/bin/google-chrome'
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--single-process')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--window-size=1920,1080') #needed to prevent object is not clickable error 

driver = webdriver.Chrome(executable_path='./chromedriver',chrome_options=options)
driver.maximize_window()
driver.implicitly_wait(14)
url = "https://www.indeed.com/"
keyword = '//*[@id="text-input-what"]'
button = '//*[@id="whatWhereFormId"]/div[3]/button'
result = '//*[@id="searchCountPages"]'

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    allow_methods=["*"],
    allow_headers=["*"],
)


def fetch_data(search):
    driver.get(url)
    driver.find_element(By.XPATH, keyword).send_keys(search)
    driver.find_element(By.XPATH, button).click()
    text_data = driver.find_element(By.ID,"searchCountPages").text
    data = int(text_data[10::].split(' ')[0].replace(',','')) 
    return {f"name":{search},"data":data}


def init():
    results = []
    for key in  ['ruby', 'python', 'java', 'javascript']:
        result = fetch_data(key)
        results.append(result)
    return results
    

@app.get("/dataset")
async def get_data_set():
    dataset = init()
    nums = [i['data'] for i in dataset]
    sum = functools.reduce(lambda a, b: a+b, nums)
    dataset.append({"sum": sum})
    print(dataset)
    return dataset

# pip3 install FastAPI
#pip install uvicorn[standard]
# uvicorn webfetch:app --reload
#localhost:8000/dataset

