from models import *
from django.contrib import admin

# Project
class ProjectLanguageRateInline(admin.TabularInline):
    model = ProjectLanguageRate
    extra = 1

class ProgressionInline(admin.TabularInline):
    model = Progression
    extra = 1

class ImageInline(admin.TabularInline):
    model = Image
    extra = 1

class VideoInline(admin.TabularInline):
    model = Video
    extra = 1

class DownloadInline(admin.TabularInline):
    model = Download
    extra = 1

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectLanguageRateInline, ProgressionInline, ImageInline, VideoInline, DownloadInline]

# Others

class LanguageAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',),}

class LicenceAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',),}

admin.site.register(Language, LanguageAdmin)
admin.site.register(Licence, LicenceAdmin)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Coworker)
admin.site.register(VideoHost)