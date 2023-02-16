<?php

/**
 * Plugin Name: SH Salary Search
 * Description: A custom Elementor widget that utliizes Stability Health API for searching salaries"
 * Version: 1.0
 * Author: James500Dev
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

function register_custom_widget_final() {
    require_once plugin_dir_path(__FILE__) . 'widget.php';
    \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new SH_Salary_Search_Widget());
}
add_action('elementor/widgets/widgets_registered', 'register_custom_widget_final');


$dir = plugin_dir_path(__FILE__) . 'app/build/static/js/';
$files = scandir($dir);
$app_js = preg_grep('/^main\..*\.js$/', $files);
$app_js = plugin_dir_url(__FILE__) . 'app/build/static/js/' . array_shift($app_js);

$dir = plugin_dir_path(__FILE__) . 'app/build/static/css/';
$files = scandir($dir);
$app_css = preg_grep('/^main\..*\.css$/', $files);
$app_css = plugin_dir_url(__FILE__) . 'app/build/static/css/' . array_shift($app_css);


wp_enqueue_script('sh-salary-search-app', $app_js, array(), '1.0.0', true);
wp_enqueue_style('sh-salary-search-app', $app_css, array(), '1.0.0');


// Make a GET request to the API URL
$response = wp_remote_get( 'https://stabilityhealthcare.com/budenurse/form/all-options' );

// Check for errors
if ( is_wp_error( $response ) ) {
    $error_message = $response->get_error_message();
    echo "Something went wrong: $error_message";
} else {
    $allOptions = json_decode( wp_remote_retrieve_body( $response ), true );
}




// WP ENDPOINT for all Options
add_action( 'wp_ajax_sh_all_options', 'sh_all_options_handler' );
add_action( 'wp_ajax_nopriv_sh_all_options', 'sh_all_options_handler' );

function sh_all_options_handler() {
  $response = wp_remote_get( 'https://stabilityhealthcare.com/budenurse/form/all-options' );

  if ( is_wp_error( $response ) ) {
    wp_send_json_error( $response->get_error_message() );
    return;
  }

  $data = json_decode( wp_remote_retrieve_body( $response ), true );

  wp_send_json( $data );
}

// WP ENDPOINT for all Jobs

add_action( 'wp_ajax_sh_jobs', 'sh_jobs_handler' );
add_action( 'wp_ajax_nopriv_sh_jobs', 'sh_jobs_handler' );

function sh_jobs_handler() {
  $clinical_unit = sanitize_text_field( $_GET['clinical_unit'] );
  $city_state = sanitize_text_field( $_GET['city_state'] );

  $url = "https://stabilityhealthcare.com/budenurse/jobs/list?clinical_unit=$clinical_unit&city_state=$city_state";

  $response = wp_remote_get( $url );

  if ( is_wp_error( $response ) ) {
    wp_send_json_error( $response->get_error_message() );
    return;
  }

  $data = json_decode( wp_remote_retrieve_body( $response ), true );

  wp_send_json( $data );
}