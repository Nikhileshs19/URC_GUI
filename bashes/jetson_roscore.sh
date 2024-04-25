#!/bin/bash

RPI_USERNAME="mrm"
RPI_IP="10.0.0.5"
ROS_WS_PATH="/home/mrm/MRM-URC2024-NavStack"

ssh $RPI_USERNAME@$RPI_IP "source /opt/ros/noetic/setup.bash && export ROS_MASTER_URI=http://10.0.0.5:11311 && export ROS_HOSTNAME=10.0.0.5 && source $ROS_WS_PATH/devel/setup.bash && roscore"

