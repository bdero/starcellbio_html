'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.ExperimentSetupView = scb.ui.static.ExperimentSetupView || {};

scb.ui.static.ExperimentSetupView.scb_f_experiment_setup_action_open_add_samples_dialog = function (element) {
    var dialog_selector = $('.scb_s_experiment_setup_table_add_samples_dialog');
    dialog_selector.dialog("open");
    scb.utils.off_on(dialog_selector, 'click', '.scb_f_experiment_setup_dialog_apply', function (e) {
        //TODO: form new 'cell_treatment' using dialog box
        var experiment_id = $('.scb_s_experiment_setup_table_add_samples_dialog').attr('experiment_id');
        var assignment_id = $('.scb_s_experiment_setup_table_add_samples_dialog').attr('assignment_id');
        var state = {
            experiment_id:experiment_id,
            assignment_id:assignment_id,
            view:'experiment_setup',
            skip_hash_update:true
        };
        var parsed = scb.ui.static.MainFrame.validate_state(state);
        if (parsed.redisplay) {
            alert("INVALID ELEMENT!");
        }
        var cell_treatment_list = parsed.experiment.cell_treatment_list;
        var template = parsed.assignment.template;
        var cell_lines = $('.scb_s_experiment_setup_dialog_cell_lines_select').val();
        var treatments = $('.scb_s_experiment_setup_dialog_treatments_select').val();
        var schedules = $('.scb_s_experiment_setup_dialog_collection_select').val();
        _.each(cell_lines, function (cell_line) {
            var cell_line_template = scb.utils.find(template.experiment_setup_actions.cell_lines, cell_line);
            _.each(treatments, function (treatment) {
                var treatment_template = scb.utils.find(template.experiment_setup_actions.treatment_protocol_list, treatment);
                _.each(schedules, function (schedule) {
                    var collection_template = scb.utils.find(template.experiment_setup_actions.collection_schedule_list, schedule);
                    var construct = {};
                    _.each(cell_line_template, function (v, k) {
                        if (k != 'id' && k != 'title') {
                            construct[k] = v;
                        }
                    });
                    _.each(treatment_template, function (v, k) {
                        if (k != 'id' && k != 'title') {
                            construct[k] = v;
                        }
                    });
                    _.each(collection_template, function (v, k) {
                        if (k != 'id' && k != 'title') {
                            construct[k] = v;
                        }
                    });
                    cell_treatment_list.start(construct);
                    console.info("NEXT");
                });
            });
        });
        console.info("DETACH HERE!")
        scb.ui.static.ExperimentSetupView.scb_f_experiment_setup_action_apply(this);

    });
    scb.utils.off_on(dialog_selector, 'click', '.scb_f_experiment_setup_dialog_cancel', function (e) {
        scb.ui.static.ExperimentSetupView.scb_f_experiment_setup_action_cancel(this);
    });
}
scb.ui.static.ExperimentSetupView.scb_f_experiment_setup_action_apply = function (param) {
    $('.scb_s_experiment_setup_table_add_samples_dialog').dialog("close");
    $('.scb_s_experiment_setup_table_add_samples_dialog').detach();
    scb.ui.static.MainFrame.refresh();
};

scb.ui.static.ExperimentSetupView.scb_f_experiment_setup_action_cancel = function (param) {
    $('.scb_s_experiment_setup_table_add_samples_dialog').dialog("close").detach();
    scb.ui.static.MainFrame.refresh();
};

scb.ui.static.ExperimentSetupView.scb_f_experiment_setup_remove_sample = function (param) {
    var experiment_id = $(param).attr('experiment_id');
    var assignment_id = $(param).attr('assignment_id');
    var cell_treatment_id = $(param).attr('cell_treatment_id');

    var state = {
        experiment_id:experiment_id,
        assignment_id:assignment_id,
        view:'experiment_setup',
        skip_hash_update:true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    var cell_treatment_list = parsed.experiment.cell_treatment_list;
    cell_treatment_list.remove(cell_treatment_id);
    $('.scb_s_experiment_setup_table_add_samples_dialog').detach();
    scb.ui.static.MainFrame.refresh();
};


scb.ui.static.ExperimentSetupView.scb_f_open_select_technique = function (param) {
    var experiment_id = $(param).attr('experiment_id');
    var assignment_id = $(param).attr('assignment_id');

    var state = {
        experiment_id:experiment_id,
        assignment_id:assignment_id,
        view:'experiment_setup',
        skip_hash_update:true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.experiment.setup_finished = true;
    scb.ui.static.MainFrame.refresh();
};


scb.ui.static.ExperimentSetupView.register = function (workarea) {
    scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_action_open_add_samples_dialog', function (e) {
        scb.ui.static.ExperimentSetupView.scb_f_experiment_setup_action_open_add_samples_dialog(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_experiment_setup_remove_sample', function (e) {
        scb.ui.static.ExperimentSetupView.scb_f_experiment_setup_remove_sample(this);
    });

    scb.utils.off_on(workarea, 'click', '.scb_f_open_select_technique', function (e) {
        scb.ui.static.ExperimentSetupView.scb_f_open_select_technique(this);
    });

}

scb.ui.static.ExperimentSetupView.headings = function (table_map) {
    var headings = [];
    _.each(table_map, function (part) {
        if (part.kind == 'cell_plate') {
            headings.push(part);
        }
        if (part.kind == 'cell_line') {
            headings.push(part);
        }
        if (part.kind == 'treatments') {
            for (var subpart_index in part.children) {
                var subpart = part.children[subpart_index];
                headings.push(subpart);
            }
        }
        if (part.kind == 'custom') {
            headings.push(part);
        }
        if (part.kind == 'actions') {
            headings.push(part);
        }


    });
    return headings;
}

scb.ui.static.ExperimentSetupView.rows = function (cell_treatment_list, headings, template) {
    var rows = [];
    _.each(cell_treatment_list, function (sample) {
        var treatment_list = sample.treatment_list.list;
        var size = treatment_list.length;
        var total_height = 0;
        _.each(treatment_list, function (treatment) {
            total_height += treatment.drug_list.length;
        });
        _.each(treatment_list, function (treatment, treatment_index) {
            var drug_list = treatment.drug_list.list;
            _.each(drug_list, function (drug, drug_index) {
                var row = [];
                _.each(headings, function (part) {
                    if (drug_index == 0 && treatment_index == 0 && part.kind == 'cell_line') {
                        row.push({
                            kind:'cell_line',
                            title:template.cell_lines[sample.cell_line].name,
                            rows:total_height,
                            first_row:drug_index == 0 && treatment_index == 0
                        });
                    }
                    else if (part.kind == 'drug') {
                        row.push({
                            kind:'drug',
                            title:drug.drug_name,
                            rows:1,
                            first_row:drug_index == 0 && treatment_index == 0
                        });
                    }
                    else if (part.kind == 'concentration') {
                        row.push({
                            kind:'concentration',
                            title:drug.drug_concentration,
                            rows:1,
                            first_row:drug_index == 0 && treatment_index == 0
                        });
                    }
                    else if (drug_index == 0 && part.kind == 'start') {
                        row.push({
                            kind:'start',
                            title:treatment.schedule,
                            rows:drug_list.length,
                            first_row:drug_index == 0 && treatment_index == 0
                        });
                    }
                    else if (drug_index == 0 && part.kind == 'duration') {
                        row.push({
                            kind:'duration',
                            title:treatment.duration,
                            rows:drug_list.length,
                            first_row:drug_index == 0 && treatment_index == 0
                        })
                    }
                    else if (drug_index == 0 && treatment_index == 0 && part.kind == 'custom') {
                        row.push({
                            kind:part.kind,
                            title:sample[part.key],
                            rows:total_height,
                            first_row:drug_index == 0 && treatment_index == 0
                        })
                    }
                    else if (drug_index == 0 && treatment_index == 0 && part.kind == 'cell_plate') {
                        row.push({
                            kind:part.kind,
                            title:'',
                            rows:total_height,
                            first_row:drug_index == 0 && treatment_index == 0
                        })
                    }
                    else if (drug_index == 0 && treatment_index == 0 && part.kind == 'actions') {
                        row.push({
                            kind:part.kind,
                            rows:total_height,
                            first_row:drug_index == 0 && treatment_index == 0
                        });
                    }
                });
                rows.push({
                    id:sample.id,
                    columns:row
                });
            });
        });
    });
    return rows;
}

scb.ui.static.ExperimentSetupView.new_row = function (workarea, state, gstate) {
    var template = gstate.context.template;
    $('.scb_s_experiment_setup_new_row').each(function (index) {
        var element = this;
        var kind = $(element).attr('kind');
        if (kind == 'cell_line') {
            if (_.keys(template.cell_lines).length > 1) {
                // this is editable
            }
            else {
                state.experiment.new_row.cell_line = _.keys(template.cell_lines)[0];
            }
        }
        if (kind == 'drug') {
            if (_.keys(template.drugs).length > 1) {
                $(element).html(scb_experiment_setup.drug_edit({
                    global_template:gstate.context.master_model,
                    template:template,
                    assignment:state.assignment,
                    experiment:state.experiment,
                    drug_id:state.experiment.new_row.drug_id
                }));
                scb.utils.off_on(element,"change","select",function (e) {
                    console.info($(this).val());
                    state.experiment.new_row.drug_id = $(this).val();
                    scb.ui.static.MainFrame.refresh();
                });
            }
            else {
                state.experiment.new_row.drug_id = _.keys(template.drugs)[0];
            }
        }
        if (kind == 'concentration') {
            if (_.keys(template.concentrations).length > 1) {
                var drug_id = state.experiment.new_row.drug_id;
                if (drug_id && template.drugs[drug_id].concentrations) {
                    $(element).html(scb_experiment_setup.concentration_edit({
                        global_template:gstate.context.master_model,
                        template:template,
                        assignment:state.assignment,
                        experiment:state.experiment,
                        drug_id:state.experiment.new_row.drug_id,
                        concentrations:template.drugs[drug_id].concentrations,
                        concentration_id:state.experiment.new_row.concentration_id
                    }));
                    scb.utils.off_on(element,"change","select",function (e) {
                        console.info($(this).val());
                        state.experiment.new_row.concentration_id = $(this).val();
                        scb.ui.static.MainFrame.refresh();
                    });
                }
                else {
                    $(element).html("Select drug first");
                }
            } else {
                state.experiment.new_row.concentration_id = _.keys(template.concentrations)[0];
            }
        }
        if (kind == 'actions') {
            var cell_line_id = state.experiment.new_row.cell_line;
            var drug_id = state.experiment.new_row.drug_id;
            var concentration_id = state.experiment.new_row.concentration_id;
            if (drug_id && concentration_id) {
                var valid = _.find(template.drugs[drug_id].concentrations, function (a) {
                    return a == concentration_id
                });
                if (!_.isUndefined(valid)) {
                    $('button', element).removeAttr('disabled');
                    $('button', element).click(function () {
                        var cell_treatment_list = state.experiment.cell_treatment_list;
                        cell_treatment_list.start({
                            title:'New row',
                            cell_line: cell_line_id,
                            treatment_list:{list:[
                                {schedule_value:0, duration_value:0, drug_list:{list:[
                                    {drug_id:drug_id, concentration_id:concentration_id}
                                ]}
                                }
                            ]},
                            collection_schedule_list:{list:[
                                {schedule:"18h", schedule_value:18 * 3600, id:'3'}
                            ]}
                        });
                        scb.ui.static.MainFrame.refresh();
                    });
                }
            }
        }

    });
}

scb.ui.ExperimentSetupView = function scb_ui_ExperimentSetupView(gstate) {
    var self = this;

    self.show = function (state) {
        var workarea = state.workarea;
        var experiment = state.experiment;
        var template = state.assignment.template;
        var headings = scb.ui.static.ExperimentSetupView.headings(template.ui.experiment_setup.table);
        var rows = scb.ui.static.ExperimentSetupView.rows(experiment.cell_treatment_list.list, headings, template);

        if (experiment.setup_finished) {
            state.mode = 'readonly';
            state.last_view = 'experiment_run';
        }
        $('.scb_s_experiment_setup_table_add_samples_dialog').detach();
        workarea.html(scb_experiment_setup.main({
            global_template:gstate.context.master_model,
            t:template,
            assignment:state.assignment,
            experiment:state.experiment,
            headings:headings,
            rows:rows,
            kind:state.mode
        }));
        state.experiment.last_view = state.last_view;
        if (state.mode == 'readonly') {
            $('.scb_s_experiment_setup_table_add_samples_dialog').hide();
        }
        else {
            $('.scb_s_experiment_setup_table_add_samples_dialog').dialog({autoOpen:false})
        }

        scb.ui.static.ExperimentSetupView.new_row(workarea, state, gstate);
    }
}