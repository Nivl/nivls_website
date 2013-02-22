from django.shortcuts import render, get_object_or_404
from django.conf import settings
from django.views.decorators.http import require_safe
from django.contrib.sites.models import Site
from django.contrib.auth.models import User
from commons.decorators import ajax_only
from commons.paginator import simple_paginator
from commons.forms import *
from commons.views import *
from models import *
from forms import *


@require_safe
def home(request):
    project_list = Project.objects.filter(site=settings.SITE_ID)
    projects = simple_paginator(project_list, 5, request.GET.get('page'))
    return render(request, 'lab/listing.haml',
                  {'projects': projects,
                   'menu_name': 'home'})


@require_safe
def tag(request, slug):
    tag = get_object_or_404(Tag, slug=slug, site=Site.objects.get_current())
    project_list = Project.objects.filter(tags=tag)
    projects = simple_paginator(project_list, 5, request.GET.get('page'))
    return render(request, "lab/listing.haml", {'projects': projects,
                                                'tag': tag,
                                                'menu_name': tag.slug})


@require_safe
def project(request, slug):
    p = get_object_or_404(Project, slug=slug, site=settings.SITE_ID)
    return render(request, 'lab/project.haml', {'project': p})


#
# Ajax
#
def get_single_form(request, pk, Obj=Project, path_name='', perm='lab.change_project', template_name='ajax/single_field_form.haml', **kwargs):
    if len(path_name) == 0:
        path_name = 'project-%s' % kwargs['attr_name']
    return ajax_get_form(request, pk, Obj, 'lab', path_name, perm, template_name, **kwargs)


# Description
def get_project_description(request, pk):
    return ajax_get_single_data(request, pk, Project, 'description', template_name='ajax/single_field_value_md.haml')


def get_project_description_form(request, pk):
    args = {'attr_name': 'description',
            'form_obj': SingleTextareaForm,
            }

    return get_single_form(request, pk, **args)


# Name
def get_project_name(request, pk):
    return ajax_get_single_data(request, pk, Project, 'name')


def get_project_name_form(request, pk):
    args = {'attr_name': 'name',
            'form_obj': SingleCharFieldForm
            }

    return get_single_form(request, pk, template_name='ajax/single_field_form_inline.haml', **args)


# Catchphrase
def get_project_catchphrase(request, pk):
    return ajax_get_single_data(request, pk, Project, 'catchphrase')


def get_project_catchphrase_form(request, pk):
    args = {'attr_name': 'catchphrase',
            'form_obj': SingleCharFieldForm
            }

    return get_single_form(request, pk, template_name='ajax/single_field_form_inline.haml', **args)


# License
@require_safe
@ajax_only
def get_project_license(request, pk):
    p = get_object_or_404(Project, pk=pk)
    return render(request, "ajax/single_field_link_value.haml",
                 {'value': p.license.name, 'value_url': p.license.url})


def get_project_license_form(request, pk):
    licenses = License.objects.filter(site=Site.objects.get_current()) \
                              .values_list('pk', 'name')
    args = {'attr_name': 'license',
            'form_obj': SingleChoiceFieldForm,
            'form_args': {'choices': licenses},
            'inital_fix': ('License', 'pk'),
            }

    return get_single_form(request, pk, template_name='ajax/single_field_form_inline.haml', **args)


# real Clients
@require_safe
@ajax_only
def get_project_realclients(request, pk):
    p = get_object_or_404(Project, pk=pk)
    return render(request, "lab/ajax/business_card.haml", {'items': p.clients_user.all(),
                                                           'is_user': True})


def get_project_realclients_form(request, pk):
    args = {'attr_name': 'clients_user',
            'form_obj': SingleMultipleChoiceFieldForm,
            'form_args': {'queryset': User.objects.all()},
            'has_many': True,
            }

    return get_single_form(request, pk, path_name='project-realclients', **args)


# Client
@require_safe
@ajax_only
def get_project_clients(request, pk):
    p = get_object_or_404(Project, pk=pk)
    return render(request, "lab/ajax/business_card.haml", {'items': p.clients.all(),
                                                           'is_user': False})


def get_project_clients_form(request, pk):
    queryset = Client.objects.filter(site=Site.objects.get_current())
    args = {'attr_name': 'clients',
            'form_obj': SingleMultipleChoiceFieldForm,
            'form_args': {'queryset': queryset},
            'has_many': True,
            }

    return get_single_form(request, pk, **args)


# real Coworker
@require_safe
@ajax_only
def get_project_realcoworkers(request, pk):
    p = get_object_or_404(Project, pk=pk)
    return render(request, "lab/ajax/business_card.haml", {'items': p.coworkers_user.all(),
                                                           'is_user': True})


def get_project_realcoworkers_form(request, pk):
    args = {'attr_name': 'coworkers_user',
            'form_obj': SingleMultipleChoiceFieldForm,
            'form_args': {'queryset': User.objects.all()},
            'has_many': True,
            }

    return get_single_form(request, pk, path_name='project-realcoworkers', **args)


# Coworker
@require_safe
@ajax_only
def get_project_coworkers(request, pk):
    p = get_object_or_404(Project, pk=pk)
    return render(request, "lab/ajax/business_card.haml", {'items': p.coworkers.all(),
                                                           'is_user': False})


def get_project_coworkers_form(request, pk):
    args = {'attr_name': 'coworkers',
            'form_obj': SingleMultipleChoiceFieldForm,
            'form_args': {'queryset': Coworker.objects.filter(site=Site.objects.get_current())},
            'has_many': True,
            }

    return get_single_form(request, pk, **args)


# Progress rate
def get_project_progress(request, pk):
    return ajax_get_single_data(request, pk, Project, 'overall_progress', template_name='lab/ajax/overall_progress.haml')


def get_project_progress_form(request, pk):
    args = {'attr_name': 'overall_progress',
            'form_obj': SingleCharFieldForm
            }

    return get_single_form(request, pk, path_name='project-progress', **args)


# progress date
def get_progress_date(request, pk):
    return ajax_get_single_data(request, pk, Progress, 'pub_date', template_name='ajax/single_field_value.haml')


def get_progress_date_form(request, pk):
    kwargs = {'attr_name': 'pub_date',
              'form_obj': SingleDateFieldForm,
              }

    return get_single_form(request, pk, Obj=Progress, path_name='progress-date', perm='lab.change_progress', **kwargs)


# progress description
def get_progress_description(request, pk):
    return ajax_get_single_data(request, pk, Progress, 'description', template_name='ajax/single_field_value.haml')


def get_progress_description_form(request, pk):
    kwargs = {'attr_name': 'description',
              'form_obj': SingleCharFieldForm
              }

    return get_single_form(request, pk, Obj=Progress, path_name='progress-description', perm='lab.change_progress', **kwargs)


# video name
def get_video_name(request, pk):
    return ajax_get_single_data(request, pk, Video, 'name', template_name='ajax/single_field_value.haml')


def get_video_name_form(request, pk):
    kwargs = {
    'attr_name': 'name',
    'form_obj': SingleCharFieldForm,
    }

    return get_single_form(request, pk, Obj=Video, path_name='video-name', perm='lab.change_video', **kwargs)


# video description
def get_video_description(request, pk):
    return ajax_get_single_data(request, pk, Video, 'description', template_name='ajax/single_field_value_md.haml')


def get_video_description_form(request, pk):
    kwargs = {'attr_name': 'description',
              'form_obj': SingleTextareaForm,
              }

    return get_single_form(request, pk, Obj=Video, path_name='video-description', perm='lab.change_video', **kwargs)
