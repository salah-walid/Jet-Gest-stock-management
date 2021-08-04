import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class consumer(WebsocketConsumer):
    def connect(self):
        
        async_to_sync(self.channel_layer.group_add)('user_update_group', self.channel_name) 
        self.accept()
        print("connected");

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)('user_update_group', self.channel_name)

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        self.send(text_data=json.dumps({
            'message': message
        }))

    def update_message(self, event):
        update = event["update"]

        self.send(text_data=json.dumps({
            'update': update
        }))