<?php

// Exit if accessed directly
if (!defined('ABSPATH')) {
	exit;
}

function php_array_to_js($array, $name = 'phpData') {
	$js_code = "<!-- php_array_to_js " . $name . " -->";
	$js_code .= '<script>var ' . $name . ' = ' . json_encode($array) . ';</script>';
	echo $js_code;
}


class SH_Salary_Search_Widget extends \Elementor\Widget_Base {

	// Your widget's name, title, icon and category
	public function get_name() {
		return 'wp_sh_salary_search';
	}

	public function get_title() {
		return __('SH Salary Search', 'sh-salary-search');
	}

	public function get_icon() {
		return 'eicon-site-search';
	}

	public function get_categories() {
		return ['basic'];
	}




	// Your widget's sidebar settings

	// What your widget displays on the front-end
	protected function render() {

		$response = wp_remote_get('https://stabilityhealthcare.com/budenurse/form/all-options');

		if (is_wp_error($response)) {
			wp_send_json_error($response->get_error_message());
			return;
		}

		$data = json_decode(wp_remote_retrieve_body($response), true);

		php_array_to_js($data['data']['clinicalUnits'], 'shClinicalUnits');
		php_array_to_js($data['data']['professions'], 'shProfessions');
		php_array_to_js($data['data']['professionClinicalUnits'], 'shProfessionClinicalUnits');
		php_array_to_js($data['data'], 'shAllOPtions');

		$location = isset($_GET['location']) ? $_GET['location'] : '';
		php_array_to_js( $location, 'shLocation');

		$settings = $this->get_settings_for_display();

		$widget = $this->get_data();
		$unique_id = $widget['id'];

?>
		<div id="SHWidget<?php echo $unique_id; ?>">
			<div id="SHSSApp"></div>
		</div>


<?php
	}
}
