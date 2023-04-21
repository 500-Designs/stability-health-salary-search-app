  

# stability-health-salary-search-app

  

- A Wordpress plugin that adds new elementor widget named "SH Salary Search"

- The widget has no editable features just default elementor styling options for background and padding


- preview: ![widget preview](relative/path/to/image.png)

- the widget pulls jobs data realtime from client's API as follows:
	1. API End Point for Jobs: https://stabilityhealthcare.com/budenurse/jobs/list?clinical_unit=12&city_state=CA
		- (It takes in 2 variables, clinical_unit[] and city_state, clinical_unit must be id of our specialties and city_state must be 2 character abbreviations of state name)

	2. API for Specialties and Profession: https://stabilityhealthcare.com/budenurse/form/all-options (
		- Specialties name and their IDs are in "data.clinicalUnits", Profession and their associated specialties can be found under "data.professionClinicalUnits"


- package contains react app in 'app' folder just run `npm install` and `npm start` to start modifying

- more details of the app are in app/readme.md file