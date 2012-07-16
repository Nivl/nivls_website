from django.conf.urls.defaults import patterns, include, url
from sitemaps import *

sitemaps = {
    'lab_project': ProjectSitemap,
    'lab_tag': TagSitemap, }

urlpatterns = patterns(
    'lab.views',

    url(r'^$',
        'home',
        name='lab'),

    url(r'^tag/(?P<slug>[-\w]+)/$',
        'tag',
        name='lab-tag'),

    url(r'^project/(?P<slug>[-\w]+)/$',
        'project',
        name='lab-project'), )
