from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import csv, io
import json
# import requests
import openai

# Create your views here.

# from .forms import ProductForm
from .models import Product

def QuesAns(dataq,ques):
    # print(type(dataq),dataq)
    models = [
        # "google/palm-2-codechat-bison",
        # "google/palm-2-chat-bison",
        # "openai/gpt-3.5-turbo",
        # "openai/gpt-3.5-turbo-16k",
        "openai/gpt-4",
        # "openai/gpt-4-32k",
        # "anthropic/claude-2",
        # "anthropic/claude-instant-v1",
        # "meta-llama/llama-2-13b-chat",
        # "meta-llama/llama-2-70b-chat",
    ]

    results = {}
    openai.api_base="https://openrouter.ai/api/v1"
    openai.api_key="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"
    for model in models:
        responsee= openai.ChatCompletion.create(
            model=model,
            messages= [
                {"role": "system", "content": dataq},
                {"role": "user", "content": ques},
            ],
            headers = {
                # "Authorization":"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",
                "HTTP-Referer": "http://localhost:8000",
                "X-Title": "Example",
                # "Content-Type": "application/json",
            },
        )

        # response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        response_json = responsee.choices[0].message
        # print(response_json,'response_json')
        return response_json

        results[model] = {
            # "timestamp": response_json["timestamp"],
            "response": response_json,
        }

        # print(results[model])

    with open("data.json", "w") as json_file:
        json.dump(results, json_file, indent=2)
    return response_json




data_set_table=''

@api_view(['POST'])
def ProductCreateView(request):
    global data_set_table
    if request.method == 'POST':
        data_file = request.FILES["data-file"]
        data_set = data_file.read().decode('UTF-8')
        io_string = io.StringIO(data_set)
        next(io_string)
        data_set_table=data_set
        # print(data_set,'data_set')
        for column in csv.reader(io_string, delimiter=',', quotechar="|"):
            # print(column,type(column))
            p=len(column)
            while(p<7):
                column.insert(p,'')
                p=p+1
            Product.objects.create(
            col1=column[0],
            col2=column[1],
            col3=column[2],
            col4=column[3],
            col5=column[4],
            col6=column[5],
            col7=column[6],
            )
        return Response({"message": "Got some data!", "data": request.data})
    return Response({"message": "Hello, world"})

@api_view(['POST'])
def QuesAnsView(request):
    if request.method=='POST':
        askedQuestion= request.FILES['question']
        data_set = askedQuestion.read().decode('UTF-8')
        # print(type(askedQuestion),'type of question')
        # print(data_set_table)
        ans=QuesAns(data_set_table,data_set)
        # print(data_set,'askedquestion')
        return Response({"askedQuestion": ans})
    return Response({"err": "wrong method"})

    


