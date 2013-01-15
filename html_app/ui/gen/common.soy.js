// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof scb_common == 'undefined') { var scb_common = {}; }


scb_common.assignment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append((opt_data.step > 0) ? '<div class=\'scb_s_assignment_step\'>' + ((opt_data.step > 0) ? 'ASSIGNMENTS' : '') + ((opt_data.step > 1) ? '&gt;' + soy.$$escapeHtml(opt_data.assignment_name) : '') + ((opt_data.step > 2) ? '&gt; DESIGN<div class=\'scb_s_assignment_step_experiment\'>&#8988; ' + soy.$$escapeHtml(opt_data.experiment_name) + '</div>' : '') + ((opt_data.step > 3) ? '&gt; SETUP' : '') + ((opt_data.step > 4) ? '&gt; TECHNIQUES' : '') + ((opt_data.step > 5) ? '&gt;' + soy.$$escapeHtml(opt_data.technique_name) : '') + '</div>' : '');
  return opt_sb ? '' : output.toString();
};


scb_common.experiment_step = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class=\'scb_s_experiment_step\'><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 1) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>1</div></div><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 2) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>2</div></div><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 3) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>3</div></div><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 4) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>4</div></div><div class=\'scb_s_experiment_step_circle ', (opt_data.step == 5) ? 'scb_experiment_step_selected' : '', '\'><div class=\'scb_s_experiment_step_number\'>5</div></div></div>');
  return opt_sb ? '' : output.toString();
};
