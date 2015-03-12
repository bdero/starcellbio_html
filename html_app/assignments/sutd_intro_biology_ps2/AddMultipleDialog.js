var sutd_ps2 = sutd_ps2 || {};
sutd_ps2.static = sutd_ps2.static || {};

sutd_ps2.static.sutd_ps2_inner_dialog_add = function (element, dialog, state) {
    $('input[type="checkbox"]:checked', dialog).each(function (e) {
        var element = $(this);
        var experiment_id = $(element).attr('experiment_id');
        var assignment_id = $(element).attr('assignment_id');
        var treatment_id = $(element).attr('treatment_id');
        var cell_line = $(element).attr('cell_line');
        var name = $(element).attr('name');
		$(element).attr('aria-checked',true);
        var parsed = scb.ui.static.MainFrame.validate_state({
            experiment_id: experiment_id,
            assignment_id: assignment_id,
            view: 'add_many_dialog_box',
            skip_hash_update: true
        });

        var template = parsed.assignment.template;
        var rows = template.ui.add_multiple_dialog[cell_line].rows;
        var row = _.find(rows, function (eh) {
            return eh.treatment_id == treatment_id;
        });
        var cell_treatments_array = row.cell_treatments[name];
        _.each(cell_treatments_array, function (eh) {
            parsed.experiment.cell_treatment_list.start(scb.utils.clone_and_clear(eh));
        });
    });

    $(dialog).detach();
    $('.contact_overlay').remove();
    scb.utils.call_back(state.close);

}

sutd_ps2.register = function (dialog, state) {
    scb.utils.off_on(dialog.parent(), 'click', '.sutd_ps2_dialog', function (e) {
        var container = dialog;
        if (container.has(e.target).length === 0) {
            $(dialog).detach();
            $('.contact_overlay').remove();
        }
    });
    scb.utils.off_on(dialog.parent(), 'click', '.sutd_ps2_inner_dialog_cancel', function (e) {
        $(dialog).detach();
        $('.contact_overlay').remove();
    });
    scb.utils.off_on(dialog.parent(), 'click', '.sutd_ps2_inner_dialog_add', function (e) {
        sutd_ps2.static.sutd_ps2_inner_dialog_add(this, dialog, state);
        $(this).focus();
    });
	scb.utils.off_on(dialog.parent(), 'change', '.scb_f_experiment_setup_dialog_checkbox', function (e) {
		$(this, dialog).attr('aria-checked',$(this, dialog).attr('aria-checked') =='false' ? true : false);
	});
    scb.utils.off_on(dialog.parent(), 'click', '.sutd_ps2_inner_dialog_select_all', function (e) {
        $('input[type=checkbox]' , dialog).attr('checked','checked');
         $('input[type=checkbox]' , dialog).attr('aria-checked',true);
    });

    scb.utils.off_on(dialog.parent(), 'click', '.sutd_ps2_inner_dialog_title_close', function (e) {
        $(dialog).detach();
        $('.contact_overlay').remove();
    });
    scb.utils.off_on(dialog.parent(), 'click', '.sutd_ps2_inner_dialog_select', function (e) {
        var cell_line = $(this).attr('cell_line');
        var name = $(this).attr('name');
        $('input[type=checkbox][name="'+name+'"]' , dialog).attr('checked','checked');
        $('input[type=checkbox][name="'+name+'"]' , dialog).attr('aria-checked',true);
    });

}

sutd_ps2.setup = function (state) {
    var workarea = state.workarea;
    var assignment = state.assignment;
    var experiment = state.experiment;
    var template = state.assignment.template;
    var onClose = state.close;

    var dialog = $("<div class='sutd_ps2_dialog'></div>");
    dialog.html(sutd_ps2.dialog({
        assignment: assignment,
        experiment: experiment,
        template: template
    }));

    dialog.appendTo($(workarea));
    sutd_ps2.register($(dialog), state);

    var css = scb.utils.get(state, ['source_state', 'css']);
    _.each( css , function(v,k){
        dialog.css(k,v);
    });

    $('.sutd_ps2_dialog').draggable({handle:'.sutd_ps2_inner_dialog_title'})

}