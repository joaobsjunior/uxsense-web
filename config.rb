# Compass configuration file

require 'compass/import-once/activate'
# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
http_stylesheets_path = http_path + "/assets/css"
http_images_path = http_path + "/assets/img"
http_javascripts_path = http_path + "/assets/js"
http_fonts_path = http_path + "/assets/fonts"
fonts_path = "admin/assets/fonts"

css_dir = "admin/assets/css"
sass_dir = "admin/assets/scss"
images_dir = "admin/assets/img"
javascripts_dir = "admin/assets/js"
fonts_dir = "admin/assets/fonts"

#output_style = :expanded
output_style = :compressed
relative_assets = true

add_import_path "./admin/bower_components/susy/sass/"
add_import_path "./admin/bower_components/breakpoint-sass/stylesheets"
