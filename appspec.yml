version: 0.0
os: linux

files:
  - source: /
    destination: /home/ec2-user/myapp

hooks:
  AfterInstall:
    - location: scripts/launch.sh
      timeout: 300
      runas: root
