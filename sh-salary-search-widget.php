<?php

/**
 * Plugin Name: SH Salary Search
 * Description: A custom Elementor widget that utliizes Stability Health API for searching salaries"
 * Version: 1.0
 * Author: James
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


wp_enqueue_script('sh-salary-search-script', plugin_dir_url(__FILE__) . 'js/sh-salary-search.js', ['jquery'], '1.0.0', true);

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