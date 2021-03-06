from django import forms
from django.utils.translation import ugettext_lazy as _
from commons import happyforms
from commons.protection import akismet_is_valid
from models import NavigationLink, ContactLink


class ContactForm(happyforms.Form):
    subject = forms.CharField(
        max_length=100,
        label=_('Subject'))

    email = forms.EmailField(
        label=_('Email address'))

    message = forms.CharField(
        widget=forms.Textarea,
        label=_('Message'))

    honeypot = forms.CharField(
        required=False,
        label="",
        widget=forms.TextInput(attrs={'class': 'hidden'}))

    def __init__(self, data=None, files=None, request=None, *args, **kwargs):
        if request is None:
            raise TypeError("Keyword argument 'request' must be supplied")
        super(ContactForm, self).__init__(data=data, files=files,
                                          *args, **kwargs)
        self.request = request
        self.fields['message'].widget.attrs['data-storage'] = 'contact-message'
        if request.user.is_authenticated():
            self.fields['email'].widget = forms.HiddenInput()
            self.initial['email'] = request.user.email

    def clean_honeypot(self):
        value = self.cleaned_data['honeypot']
        if value:
            raise forms.ValidationError('Spam attempt detected!')
        return value

    def clean_message(self):
        if akismet_is_valid(self.request,
                            self.cleaned_data['message'],
                            self.cleaned_data['email']):
            return self.cleaned_data['message']
        else:
            raise forms.ValidationError('Spam attempt detected!')


class NavigationForm(happyforms.ModelForm):
    class Meta:
        model = NavigationLink
        exclude = ('site', 'order',)


class ContactLinkForm(happyforms.ModelForm):
    class Meta:
        model = ContactLink
        exclude = ('site', 'order',)
