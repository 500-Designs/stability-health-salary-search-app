  

# stability-health-salary-search-app

- A Wordpress plugin that adds new elementor widget named "SH Salary Search"
- Af of writing the widget is added here: https://stabhealthdev.wpengine.com/salary-guide/ 
- The widget has no editable features just default elementor styling options for background and padding
- Preview: 
	
![widget preview](https://github.com/jamesdev500/stability-health-salary-search-app/blob/abeebde9253989a004264f7a01d304b5b27ebad7/preview.png)

- scss styling, as seen in the preview, are included in the app, but may be affected any matching !important declarations from the wordpress site where the plugin is installed

- the widget pulls jobs data realtime from client's API as follows:
	1. API End Point for Jobs: https://stabilityhealthcare.com/budenurse/jobs/list?clinical_unit=12&city_state=CA
		- (It takes in 2 variables, clinical_unit[] and city_state, clinical_unit must be id of our specialties and city_state must be 2 character abbreviations of state name)

	2. API for Specialties and Profession: https://stabilityhealthcare.com/budenurse/form/all-options (
		- Specialties name and their IDs are in "data.clinicalUnits", Profession and their associated specialties can be found under "data.professionClinicalUnits"


- package contains react app in 'app' folder just run `npm install` and `npm start` to start modifying

- more details of the app are in app/readme.md file


