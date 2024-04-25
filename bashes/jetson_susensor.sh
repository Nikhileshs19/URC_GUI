#!/bin/bash

RPI_USERNAME="mrm"
RPI_IP="10.0.0.5"
ROS_WS_PATH="/home/mrm/MRM-URC2024-NavStack"
ROS_PKG_NAME="planner"
LAUNCH_FILE="susensors.launch"
PASSWORD="nvidia"

# Add the command to sudoers file without password prompt
echo "$RPI_USERNAME ALL=(ALL) NOPASSWD: /bin/su" | sudo tee /etc/sudoers.d/allow_su_without_password >/dev/null

# SSH into the Jetson and run the command without password prompt
ssh $RPI_USERNAME@$RPI_IP "echo '$PASSWORD' | sudo -S su && source /opt/ros/noetic/setup.bash && export ROS_MASTER_URI=http://10.0.0.5:11311 && export ROS_HOSTNAME=10.0.0.5 && source $ROS_WS_PATH/devel/setup.bash && roslaunch $ROS_PKG_NAME $LAUNCH_FILE"
