#!/bin/bash

# Raspberry Pi SSH details
RPI_USERNAME="root"
RPI_IP="10.0.0.3"

# ROS setup and launch command
ROS_WS_PATH="/home/deeznuts/MRM-URC2024-NavStack"
ROS_PKG_NAME="sensors"
LAUNCH_FILE="sensors.launch"

# SSH into Raspberry Pi and launch ROS node
ssh $RPI_USERNAME@$RPI_IP "source /opt/ros/noetic/setup.bash && export ROS_MASTER_URI=http://10.0.0.5:11311 && export ROS_HOSTNAME=10.0.0.3 && source $ROS_WS_PATH/devel/setup.bash && roslaunch $ROS_PKG_NAME $LAUNCH_FILE"
