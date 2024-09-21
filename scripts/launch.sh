#!/bin/bash

chown ec2-user:ec2-user /home/ec2-user/myapp/subscriptions.json

sudo -u ec2-user pm2 restart subscriptionapi
