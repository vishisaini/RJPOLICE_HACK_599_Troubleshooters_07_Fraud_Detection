import requests
import random


class UPI_Verification:
    def entrypoint(self):
        # Write your flow here
        pass

    def choose_key(sefl):
        api_key = [
            "432f88e5b8mshc410a27e477b53fp17344djsn388d019f5e0a",
            "2c0be3e612mshcdeb855e74ec1a2p1fec15jsnfea433017420",
            "c291daa491mshe35137eb6c4e2aep1a41dcjsnf9476dfb8884",
            "661ee611d9msh50e23027c1afa77p17810ajsn1947ff1e59a5",
            "d13576acf0msh7f7c080c079ed1dp101a95jsn7cb96ec36a82",
            "0889df2964msh6421f67b9b99a94p1deed7jsna89e428569ce",
        ]
        return random.choice(api_key)

    def getResults(self, upi_id):
        url = "https://upi-verification.p.rapidapi.com/v3/tasks/sync/verify_with_source/ind_vpa"
        payload = {"task_id": "UUID", "group_id": "UUID", "data": {"vpa": upi_id}}
        key = self.choose_key()
        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": key,
            "X-RapidAPI-Host": "upi-verification.p.rapidapi.com",
        }
        response = requests.post(url, json=payload, headers=headers)

        # return response.json()
        print(response.json())


obj = UPI_Verification()

obj.getResults("borsev662@okhdfcban")
