import requests
import random

class URLdetection:
    def entrypoint(self):
        # Write your flow here
        pass
    def choose_key(self):
        api_key =['2c0be3e612mshcdeb855e74ec1a2p1fec15jsnfea433017420','19b3605d09msh0e8a3962c078239p158a04jsn111d2d4d1b5b','661ee611d9msh50e23027c1afa77p17810ajsn1947ff1e59a5','d13576acf0msh7f7c080c079ed1dp101a95jsn7cb96ec36a82','0889df2964msh6421f67b9b99a94p1deed7jsna89e428569ce']

        return random.choice (api_key)
    def getResults(self, inputUrl):
        url = "https://phishing-url-risk-api.p.rapidapi.com/url/"

        querystring = {"url": inputUrl}

        key = self.choose_key()

        headers = {
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "phishing-url-risk-api.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers, params=querystring)
        return response.json()
