# A shell script that writes the exif date to the current date
#!/bin/bash

# Get the current date in the format expected by EXIF data
current_date=$(date "+%Y:%m:%d %H:%M:%S")

# Use exiftool to update the EXIF date
exiftool -DateTimeOriginal="$current_date" -CreateDate="$current_date" -ModifyDate="$current_date" "original.jpeg"