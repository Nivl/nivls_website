#!/usr/bin/python
import os, sys

sys.path.insert(0, "/home/nivl/python/modules/")
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", ".."))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "..", ".."))

os.environ['DJANGO_SETTINGS_MODULE'] = 'nivls_website.conf.fr'
os.environ['PATH'] = os.environ['PATH'] + ':/home/nivl/root/bin'


from django.core.servers.fastcgi import runfastcgi
runfastcgi(method="threaded", daemonize="false")
