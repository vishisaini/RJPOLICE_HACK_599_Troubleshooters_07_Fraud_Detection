import requests
import random


class SpamCallDetection:
    
    def entrypoint(self):
        # Write your flow here
        pass
    
    def choose_key(self):

        api_key =["0889df2964msh6421f67b9b99a94p1deed7jsna89e428569ce"]
        return random.choice (api_key)

    def getResults(self, number, countryCode):
        url = "https://truecaller4.p.rapidapi.com/api/v1/getDetails"

        querystring = {"phone": number, "countryCode": countryCode}

        key = "23c7ec3f06mshe3e8c87b3af7220p1ade97jsn0041ce862084"

        headers = {
            "X-RapidAPI-Key": "c98b9b8b72msha1adbd2324d2fb2p12466cjsn5b6be2a3b8d9",
            "X-RapidAPI-Host": "truecaller4.p.rapidapi.com"
        }
        response = requests.get(url, headers=headers, params=querystring)
        print(response)
        return response.json()


# fc26d88782msh4fc2a5e1a15a197p1abad2jsn10d6e07def48
# b82928ad07msh3ac976db902f329p113c5ajsn19eb5698fcf4
# 584b8a06cfmshb6dc2331d11e824p115e25jsnb80d52f5796d

# "d13576acf0msh7f7c080c079ed1dp101a95jsn7cb96ec36a82"