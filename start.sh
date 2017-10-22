#!/bin/bash

# Save modal content to modal.html
curl -g -H "Accept: application/html" -H "Content-Type: application/html" -X GET "www.artistryindy.com/?module=check_availability&property[id]=83354&action=view_unit_spaces&property_floorplan[id]=184396" > ./modals_html/edie.html

# console log the rooms I care about
node parse.js
