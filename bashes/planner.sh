#!/bin/bash

# jetson  SSH details
jetson_USERNAME="mrm"
jetson_IP="10.0.0.5"

# ROS setup and launch command
ROS_WS_PATH="/home/mrm/MRM-URC2024-NavStack"
ssh $jetson_USERNAME@$jetson_IP "source /opt/ros/noetic/setup.bash && export ROS_MASTER_URI=http://10.0.0.5:11311 && export ROS_HOSTNAME=10.0.0.5 && source $ROS_WS_PATH/devel/setup.bash && rosrun planner planner"
