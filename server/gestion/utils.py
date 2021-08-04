from django.utils.deconstruct import deconstructible
from uuid import uuid4
import os

@deconstructible
class PathAndRename(object):

    def __init__(self, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        file = ""
        if instance.id:
            obj = type(instance).objects.get(id=instance.id)
            if obj.image:
                file = os.path.basename(obj.image.name.split(".")[:-1][0])
                os.remove(obj.image.path)
            else:
                file = uuid4().hex
        else:
            file = uuid4().hex

        
        ext = filename.split('.')[-1]
        # set filename as random string
        filename = '{}.{}'.format(file, ext)
        # return the whole path to the file
        return os.path.join(self.path, filename)

products_path_and_rename = PathAndRename("products")
categories_path_and_rename = PathAndRename("categories")
subCategories_path_and_rename = PathAndRename("subCategories")
