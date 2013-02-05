from django.shortcuts import render, get_object_or_404
from django.conf import settings
from django.views.decorators.http import require_safe
from django.contrib.sites.models import Site
from django.core.urlresolvers import reverse
from commons.decorators import ajax_only
from commons.paginator import simple_paginator
from commons.forms import SingleTextareaForm
from commons.views import validate_single_ajax_form
from models import *
from forms import *


@require_safe
def home(request):
    project_list = Project.objects.filter(site=settings.SITE_ID)
    projects = simple_paginator(project_list, 5, request.GET.get('page'))
    return render(request, "lab/listing.haml",
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
    return render(request, "lab/project.haml", {'project': p})


@require_safe
def get_project_small(request, slug):
    p = get_object_or_404(Project, slug=slug, site=settings.SITE_ID)
    return render(request, "lab/inc/project_description.haml", {'project': p})


@ajax_only
def get_project_small_form(request, slug):
    project = get_object_or_404(Project,
      slug=slug,
      site=Site.objects.get_current())

    if not request.user.has_perm('lab.change_project'):
        return HttpResponseForbidden()

    render_args = {'template_name': "ajax/single_field_form.haml",
                   'dictionary': {'id': 'small-project-form-' + slug,
                                  'url': reverse('lab-get-project-small-form', args=[slug])
                                  }
                    }

    return validate_single_ajax_form(request, project, 'description', render_args, SingleTextareaForm)
