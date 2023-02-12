<?php

// Exit if accessed directly
if (!defined('ABSPATH')) {
	exit;
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
