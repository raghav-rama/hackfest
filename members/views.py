from django.http import HttpResponse
from django.template import loader
from dotenv import load_dotenv
import os

load_dotenv()


def members(request):
    template = loader.get_template("myfirst.html")
    return HttpResponse(template.render(request=request))
