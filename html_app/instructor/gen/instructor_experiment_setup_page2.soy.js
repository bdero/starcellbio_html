// This file was automatically generated from instructor_experiment_setup_page2.soy.
// Please don't edit this file by hand.

if (typeof scb_instructor_experiment_setup_page2 == 'undefined') { var scb_instructor_experiment_setup_page2 = {}; }


scb_instructor_experiment_setup_page2.main = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_setup_view\' >');
  scb_instructor_homepage.display_header(opt_data, output);
  scb_instructor_common.assignment_step({step: 2, last_step: opt_data.last_step, prev_step: opt_data.prev_step, assignments: assignments}, output);
  output.append('<div class=\'scb_s_experiment_setup_container\' role=\'main\'>');
  scb_instructor_homepage.display_assignment_navigation(opt_data, output);
  scb_instructor_experiment_setup_page2.display_assignment(opt_data, output);
  output.append('</div>');
  scb_instructor_homepage.display_footer(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_assignment = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_course_setup_description \'><div class=\'scb_s_abstract_title\'>Assignment Editor</div><div class=\'scb_s_experiment_setup_title\'>Experiment Setup</div><div class=\'scb_s_experiment_setup_subtitle\'>In this section, you will specify the strains and treatments available for experimentation.</div><br/>');
  scb_instructor_experiment_setup_page2.display_experiment_setup(opt_data, output);
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_experiment_setup = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_assignment_setup_course_name_heading\'>3. Define the treatment protocols available for experimentation.</div><br/><div class=\'scb_s_experiment_setup_strains_list_container\'>a) Name and define your treatment variables.');
  scb_instructor_experiment_setup_page2.display_treatment_edit(opt_data, output);
  if (opt_data.assignment.has_temperature) {
    output.append('b) Name and define your temperature variables.');
    scb_instructor_experiment_setup_page2.display_temperature_edit(opt_data, output);
  }
  if (opt_data.assignment.has_collection_time) {
    output.append('c) Name and define your collection time variables.');
    scb_instructor_experiment_setup_page2.display_collection_edit(opt_data, output);
  }
  output.append('</div>');
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_treatment_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div><span class=\'scb_s_experiment_setup_treatment_name_title\'>Name</span><span class=\'scb_s_experiment_setup_treatment_concentration_title\'>Concentration</span>', (opt_data.assignment.has_start_time) ? '<span class=\'scb_s_experiment_setup_treatment_start_time_title\'>Start Time</span>' : '', (opt_data.assignment.has_duration) ? '<span class=\'scb_s_experiment_setup_treatment_duration_title\'>Duration</span>' : '', '</div>');
  if (soy.$$getMapKeys(opt_data.assignment.template.drugs).length <= 0) {
    output.append('<ol class=\'scb_s_experiment_setup_list\'><li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_treatment_text_field scb_f_experiment_setup_treatment_edit scb_s_experiment_setup_treatment_name_edit\' placeholder="Treatment 1" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><input type=\'text\' class=\'scb_s_experiment_setup_treatment_text_field scb_f_experiment_setup_treatment_concentration_edit scb_s_experiment_setup_treatment_concentration_edit\' placeholder="Concentration" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><div class="scb_s_experiment_setup_treatment_list scb_f_experiment_setup_treatment_concentration_units_edit" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'  aria-labelledby="scb_s_experiment_step_progress_label_for_course"><label role="presentation" class="custom-select-treatment-concentration"><select role="select" aria-label="Experiments" alt="" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><option role=\'option\' aria-label=\'M\' value="M" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'', (opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '', '>M</option><option role=\'option\' aria-label=\'mM\' value="mM" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'', (opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '', '>mM</option><option role=\'option\' aria-label=\'μM\' value="μM" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'', (opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '', '>μM</option><option role=\'option\' aria-label=\'nM\' value="nM" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'', (opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '', '>nM</option><option role=\'option\' aria-label=\'pM\' value="pM" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'', (opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '', '>pM</option><option role=\'option\' aria-label=\'mg/mL\' value="mg/mL" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'', (opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '', '>mg/mL</option><option role=\'option\' aria-label=\'μg/L\' value="μg/L" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'', (opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '', '>μg/L</option><option role=\'option\' aria-label=\'μg/mL\' value="μg/mL" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'', (opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '', '>μg/mL</option><option role=\'option\' aria-label=\'μg/μL\' value="μg/μL" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'', (opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '', '>μg/μL</option></select></label></div>', (opt_data.assignment.has_start_time) ? '<input type=\'text\' class=\'scb_s_experiment_setup_treatment_text_field scb_f_experiment_setup_start_time_edit scb_s_experiment_setup_treatment_concentration_edit\' placeholder="Start Time" value=\'\'  title=\'\' maxlength="30" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' role=\'textbox\'><div class="scb_s_experiment_setup_treatment_list scb_f_experiment_setup_start_time_units_edit" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'  aria-labelledby="scb_s_experiment_step_progress_label_for_course"><label role="presentation" class="custom-select-treatment"><select role="select" aria-label="Experiments" alt="" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'><option role=\'option\' aria-label=\'sec\' value="sec" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>sec</option><option role=\'option\' aria-label=\'min\' value="min" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>min</option><option role=\'option\' aria-label=\'hr\' value="hr" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>hr</option><option role=\'option\' aria-label=\'day\' value="day" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>day</option><option role=\'option\' aria-label=\'days\' value="days" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>days</option><option role=\'option\' aria-label=\'month\' value="month" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>month</option><option role=\'option\' aria-label=\'months\' value="months" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>months</option><option role=\'option\' aria-label=\'year\' value="year" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>year</option><option role=\'option\' aria-label=\'years\' value="years" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>years</option></select></label></div>' : '', (opt_data.assignment.has_duration) ? '<input type=\'text\' class=\'scb_s_experiment_setup_treatment_text_field scb_f_experiment_setup_duration_edit scb_s_experiment_setup_treatment_concentration_edit\' placeholder="Duration" value=\'\'  title=\'\' maxlength="30" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\' role=\'textbox\'><div class="scb_s_experiment_setup_treatment_list scb_f_experiment_setup_duration_units_edit" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'  aria-labelledby="scb_s_experiment_step_progress_label_for_course"><label role="presentation" class="custom-select-treatment"><select role="select" aria-label="Experiments" alt="" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'><option role=\'option\' aria-label=\'sec\' value="sec" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>sec</option><option role=\'option\' aria-label=\'min\' value="min" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>min</option><option role=\'option\' aria-label=\'hr\' value="hr" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>hr</option><option role=\'option\' aria-label=\'day\' value="day" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>day</option><option role=\'option\' aria-label=\'days\' value="days" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>days</option><option role=\'option\' aria-label=\'month\' value="month" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>month</option><option role=\'option\' aria-label=\'months\' value="months" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>months</option><option role=\'option\' aria-label=\'year\' value="year" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>year</option><option role=\'option\' aria-label=\'years\' value="years" assignment_id=\'' + soy.$$escapeHtml(opt_data.assignment.id) + '\'' + ((opt_data.assignment.id == opt_data.assignment.id) ? 'selected="selected"' : '') + '>years</option></select></label></div>' : '', '</li><li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  } else {
    output.append('<ol class=\'scb_s_experiment_setup_list\'>');
    var strainList256 = soy.$$getMapKeys(opt_data.assignment.template.drugs);
    var strainListLen256 = strainList256.length;
    for (var strainIndex256 = 0; strainIndex256 < strainListLen256; strainIndex256++) {
      var strainData256 = strainList256[strainIndex256];
      output.append('<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData256), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData256].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData256].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_concentration_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData256), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData256].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData256].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_concentration_unit_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData256), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData256].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData256].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_dashboard_remove_assignment scb_s_experiment_setup_remove_treatment\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></li>');
    }
    output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  }
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_temperature_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div><span class=\'scb_s_experiment_setup_treatment_name_title\'>Temperature</span></div>');
  if (soy.$$getMapKeys(opt_data.assignment.template.experiment_temperatures).length <= 0) {
    output.append('<ol class=\'scb_s_experiment_setup_list\'><li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><span class=\'scb_s_experiment_setup_course_name_heading\'>°C</span></li><li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  } else {
    output.append('<ol class=\'scb_s_experiment_setup_list\'>');
    var strainList307 = soy.$$getMapKeys(opt_data.assignment.template.experiment_temperatures);
    var strainListLen307 = strainList307.length;
    for (var strainIndex307 = 0; strainIndex307 < strainListLen307; strainIndex307++) {
      var strainData307 = strainList307[strainIndex307];
      output.append('<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData307), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData307].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData307].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><span class=\'scb_s_experiment_setup_course_name_heading\'>°C</span><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_dashboard_remove_assignment scb_s_experiment_setup_remove_temperature\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></li>');
    }
    output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  }
  return opt_sb ? '' : output.toString();
};


scb_instructor_experiment_setup_page2.display_collection_edit = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div><span class=\'scb_s_experiment_setup_treatment_name_title\'>Collection Time</span></div>');
  if (soy.$$getMapKeys(opt_data.assignment.template.collections).length <= 0) {
    output.append('<ol class=\'scb_s_experiment_setup_list\'><li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" value=\'\'  title=\'\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'></li><li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  } else {
    output.append('<ol class=\'scb_s_experiment_setup_list\'>');
    var strainList342 = soy.$$getMapKeys(opt_data.assignment.template.collections);
    var strainListLen342 = strainList342.length;
    for (var strainIndex342 = 0; strainIndex342 < strainListLen342; strainIndex342++) {
      var strainData342 = strainList342[strainIndex342];
      output.append('<li class=\'scb_s_experiment_setup_list_item \' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><input type=\'text\' class=\'scb_s_experiment_setup_text_field scb_f_experiment_setup_list_item scb_s_experiment_setup_treatment_name_edit\' placeholder="Strain A" strain_id=\'', soy.$$escapeHtml(strainData342), '\' value=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData342].name), '\'  title=\'', soy.$$escapeHtml(opt_data.assignment.template.cell_lines[strainData342].name), '\' maxlength="30" assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' role=\'textbox\'><button role=\'button\' aria-label=\'Delete\'  class=\'scb_f_dashboard_remove_assignment scb_s_experiment_setup_remove_temperature\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\' ><img alt="" title="Delete" role=\'presentation\' src="images/setup/scb_remove.png"></button></li>');
    }
    output.append('<li class=\'scb_s_experiment_setup_list_item\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'><button class=\'scb_s_gray_button scb_f_experiment_setup_add_strain scb_s_experiment_setup_add_button\' assignment_id=\'', soy.$$escapeHtml(opt_data.assignment.id), '\'>ADD</button></li></ol>');
  }
  return opt_sb ? '' : output.toString();
};
