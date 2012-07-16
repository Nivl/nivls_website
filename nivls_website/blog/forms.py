from django import forms
from django.utils.translation import ugettext_lazy as _
from bootstrap.forms import BootstrapForm, BootstrapModelForm
from commons import happyforms
from models import Comment
from commons.protection import akismet_is_valid


class CommentForm(BootstrapModelForm, happyforms.ModelForm):
    class Meta:
        model = Comment
        exclude = ('user', 'post', 'is_public', 'ip_address', 'pub_date')

    honeypot = forms.CharField(
        required=False,
        label='<!-- honeypot -->',
        widget=forms.TextInput(attrs={'class': 'hidden'}))

    def __init__(self, data=None, files=None, user=None, request=None,
                 *args, **kwargs):
        if request is None:
            raise TypeError("Keyword argument 'request' must be supplied")
        super(CommentForm, self).__init__(data=data, files=files,
                                          *args, **kwargs)
        self.fields['comment'].widget.attrs['data-parse'] = '1'
        self.fields['comment'].widget.attrs['data-target'] = '#form-preview'
        if user.is_authenticated():
            del self.fields['email']
            del self.fields['name']
            del self.fields['website']
        else:
            self.fields['email'].required = True
            self.fields['name'].required = True
        self.request = request

    def clean_honeypot(self):
        value = self.cleaned_data['honeypot']
        if value:
            raise forms.ValidationError('Spam attempt detected!')
        return value

    def clean_comment(self):
        if akismet_is_valid(self.request, self.cleaned_data['comment']):
            return self.cleaned_data['comment']
        else:
            raise forms.ValidationError('Spam attempt detected!')


class SingleCommentForm(BootstrapForm, happyforms.Form):
    comment = forms.CharField(
        widget=forms.Textarea(attrs={'style': 'width: 100%;'}),
        label=_('<!-- Comment -->'))
