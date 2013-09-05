'use strict';

scb.ui = scb.ui || {};
scb.ui.static = scb.ui.static || {};
scb.ui.static.MicroscopyView = scb.ui.static.MicroscopyView || {};

scb.ui.static.MicroscopyView.parse = function (element) {
    var assignment_id = $(element).attr('assignment_id');
    var experiment_id = $(element).attr('experiment_id');
    var microscopy_id = $(element).attr('microscopy_id');
    var microscopy_lane_id = $(element).attr('microscopy_lane_id');


    var state = {
        experiment_id: experiment_id,
        assignment_id: assignment_id,
        microscopy_id: microscopy_id,
        microscopy_lane_id: microscopy_lane_id,
        view: 'microscopy',
        skip_hash_update: true
    };
    var parsed = scb.ui.static.MainFrame.validate_state(state);
    parsed.state = state;
    return parsed;
}


scb.ui.static.MicroscopyView.scb_s_microscopy_lens_draw_slide = function(state){
	console.log('draw slide');	
	var model = new scb.components.ModelFactory(state.context.template);
// 	console.log(model);
	model.microscopy.compute(state);
	console.log(state.color);
	init(map, draw, 'images/microscopy/'+state.color+'.jpg');
}
scb.ui.static.MicroscopyView.scb_f_microscopy_select_slide_type = function (element, event) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var slide_type = $(element).val();
    if (slide_type == '') {
        return;
    }
    var slide_id = $(element).attr('lane_id');
    if (slide_id == '') {
       var cell_treatment_id = $(element).attr('cell_treatment_id');
        parsed.microscopy.lanes_list.start({
            kind: slide_type,
            cell_treatment_id: cell_treatment_id,
            experiment_id: parsed.experiment.id
        });
    }
    else {
    	parsed.microscopy.lanes_list.get(slide_id).kind = slide_type;

    }
    if (event) {
        scb.ui.static.MainFrame.refresh();
    }
}

scb.ui.static.MicroscopyView.scb_f_microscopy_sample_remove = function (element) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var slide_id = $(element).attr('lane_id');
    if (slide_id != '') {
    }
    scb.ui.static.MainFrame.refresh();
}

scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active = function (element, event) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    var val = $(element).attr('checked');
    var cell_treatment_id = $(element).attr('cell_treatment_id');

    parsed.microscopy.is_cell_treatment_enabled[cell_treatment_id] = val;
    $('.scb_f_microscopy_select_slide_type', $(element).parent().parent()).each(function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_select_slide_type(this);
    });
    if (event) {
        var rows_count = parsed.microscopy.rows_state();
        scb.ui.static.MainFrame.refresh();
        if (rows_count.valid > (scb.ui.static.MicroscopyView.MAX_ROWS - 1)) {
            var element = $('.scb_f_microscopy_sample_active[cell_treatment_id="' + cell_treatment_id + '"]');
            var parent = $(element).parent();
            var note = $("<span>" + rows_count.valid + "</span>");
            note.appendTo(parent);
            console.info(parent);
            setTimeout(function () {
                $(note).detach();
            }, 500);
        }
    }
}

scb.ui.static.MicroscopyView.scb_f_microscopy_remove = function (element) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.experiment.microscopy_list.remove(parsed.microscopy.id);
    parsed.state.view = 'select_technique';
    delete parsed.state.skip_hash_update;
    scb.ui.static.MainFrame.refresh(parsed.state);


}

scb.ui.static.MicroscopyView.scb_s_microscopy_selected = function (element) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }

    parsed.microscopy.name = $(element).text();
}

scb.ui.static.MicroscopyView.scb_f_microscopy_prepare_slides = function (element) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
    // if (parsed.redisplay) {
//         alert("INVALID ELEMENT!");
//     }
//     var rows_state = parsed.microscopy.rows_state();
//     if (rows_state.valid > (scb.ui.static.MicroscopyView.MAX_ROWS - 1)) {
//         alert("You have selected more than " + scb.ui.static.MicroscopyView.MAX_ROWS + " samples. The gel only has 15 lanes. Please only select " + scb.ui.static.MicroscopyView.MAX_ROWS + " samples, and remember that one lane is usually reserved for a protein marker.");
// 
//     }
//     else if (rows_state.valid < 1) {
//         alert("Please select at least 1 slide to prepare.");
// 
//     }
//     else {
        parsed.microscopy.slide_prepared = true;
        window.scrollTo(0, 0);
        scb.ui.static.MainFrame.refresh();
    // }
}

scb.ui.static.MicroscopyView.scb_s_microscopy_choose_gel_type_input = function (element) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    //TODO: 1st things first -- we needs to save NEW order

    parsed.microscopy.gel_type = $(element).val();
    scb.ui.static.MainFrame.refresh();
}



scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active_all = function (element) {
    $('.scb_f_microscopy_sample_active').each(function (e) {
        var element = this;
        $(element).attr('checked', true);
        scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active(element);
    });
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.MicroscopyView.scb_f_microscopy_sample_inactive_all = function (element) {
	$('.scb_f_microscopy_sample_active').each(function(e){
		var element = this;
		$(element).attr('checked', false);
		scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active(element);
	});    
    scb.ui.static.MainFrame.refresh();

}

scb.ui.static.MicroscopyView.scb_f_microscopy_load_slides = function(element){
    var parsed = scb.ui.static.MicroscopyView.parse(element);

    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
    parsed.microscopy.samples_finished = true;
    parsed.microscopy.lane_selected = scb.utils.get(parsed.microscopy.lanes_list.list, [0, 'id']);
    scb.ui.static.MainFrame.refresh();

	//init(map, draw, 'hi.jpg');
}

scb.ui.static.MicroscopyView.scb_s_microscopy_choose_samples_order_list_select = function (element, event) {
    var parsed = scb.ui.static.MicroscopyView.parse(element);
    if (parsed.redisplay) {
        alert("INVALID ELEMENT!");
    }
   if (parsed.microscopy.samples_finished) {
        $('li', $(element).parent()).removeClass('scb_s_microscopy_sample_selected');
        $(element).addClass('scb_s_microscopy_sample_selected');
        parsed.microscopy.lane_selected = parsed.microscopy_lane.id;
        scb.ui.static.MainFrame.refresh();
   }
}




var img_width;
var img_height;
//Caman.DEBUG = ('console' in window);

///////////////////
/*
structure of the state object

orig - contains original image
brightness - contains brightness level on original image
blur -
blur - 
 
xparam - x offset for full image
yparam - y offset for full image



cache - 
	brightness
	image



*/
//////////////////

var map = new Object();

var caman;

/*

First call init 

The init method should first get the canvas, get the context, and create an image element
You set the image source and then you call the image onload function. The image onload function should do everything as before
set up the canvas store the image data and then redisplay the canvas

The next point of contention is the callback

you pass a callback function to the method so that it calls the draw method immediately after the original


*/


function draw_lens(param, addition, state, canvas){
	var context = canvas.getContext('2d');
	clear_canvas(context, canvas);
	if(state['cache']['brightness'] != state['brightness'] || state['cache']['blur'] != state['blur'] || state['cache']['sharpen'] != state['sharpen']){
		save_and_draw_cache_image(canvas,state);
	}
	else
		//insert special method that listens for borders to rerender new portion of image
		context.drawImage(state['cache']['image'], state['xparam'], state['yparam']);

	switch(param)
	{
		case 'x':
		  state['xparam'] = state['xparam'] + addition ;
		  break;
		case 'y':
		  state['yparam'] = state['yparam'] + addition ;
		  break;
		default:
		  break;
	}
}

function draw(state){
	var canvas=document.getElementsByTagName("canvas")[0];
	document.onkeydown=function (e) {
		
		document.documentElement.style.overflow='hidden';
		document.body.style.overflow='hidden';
		e = e || window.event;
		if(state.action =='rendering'){
				console.log('nope');
		}
		else{
			if (e.keyCode == '37') {
				// l arrow
				draw_lens('x', 10, state, document.getElementsByTagName("canvas")[0]);
				console.log('left')
			}
			else if (e.keyCode == '38') {
				// u arrow
				draw_lens('y', 10, state, document.getElementsByTagName("canvas")[0]);
				console.log('up');
			}
			else if (e.keyCode == '39') {
				// r arrow
				draw_lens('x', -10, state, document.getElementsByTagName("canvas")[0]);
				console.log('right');
			}
			else if (e.keyCode == '40') {
				// d arrow
				draw_lens('y', -10, state, document.getElementsByTagName("canvas")[0]);
				console.log('down');
			}
		}
	};
	$('#brightup').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_brightness(5, state);
	});
	$('#brightdown').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_brightness(-5, state);
	});
	$('#blurup').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_blur(-10, state, modify_state_sharpen);
	});
	$('#blurdown').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_blur(10, state, modify_state_sharpen);
	});
	$('#fblurup').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_blur(-5, state, modify_state_sharpen);
	});
	$('#fblurdown').click(function(){
		if(state.action =='rendering'){
				console.log('nope');
		}
		else
		modify_state_blur(5, state, modify_state_sharpen);
	});
	$('#scb_s_navigation_button_choose_slide_button').click(function(){
		var string = $("form input[type='radio']:checked").val();
		var canvases = document.getElementsByTagName('canvas');
		while(canvases.length>0){
			var samples_area =  $('body').find('.scb_s_microscopy_samples_slide_area')[0];
			samples_area.removeChild(canvases[0]);
		}
		init(map, draw, string);
	});
	console.log('draw');
}


function reset_image(img2string){
	var image = document.createElement('img');
	image.src = img2string;
	return image;
}




function full_modify_cache(state){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	save_and_draw_cache_image(canvas, state)
}

function clear_canvas(ctx, canvas){
 	ctx.save()
	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();

}

function reset_cache(){
	var old_canvas = document.getElementById('spy');
	old_canvas.parentNode.removeChild(old_canvas);
	var new_canvas = document.createElement('canvas');
	new_canvas.id = 'spy';
	new_canvas.style.visibility='hidden';
	new_canvas.width = img_width;
	new_canvas.height = img_height;
	var samples_area =  $('body').find('.scb_s_microscopy_samples_slide_area')[0];
	document.body.appendChild(new_canvas);
	var ctx = new_canvas.getContext('2d');
	return [new_canvas, ctx];	
}
function reset_canvas(){
	var old_canvas = document.getElementById('lens');
	var width = old_canvas.width;
	var height = old_canvas.height;
	old_canvas.parentNode.removeChild(old_canvas);
	var new_canvas = document.createElement('canvas');
	new_canvas.id = 'lens';
	new_canvas.width = width;
	new_canvas.height = height;
	var samples_area = $('body').find('.scb_s_microscopy_samples_slide_area')[0];
	samples_area.insertBefore(new_canvas,samples_area.firstChild);
	var ctx = new_canvas.getContext('2d');
	ctx.beginPath();
	ctx.arc(200, 200, 175, 0, Math.PI *2, false);
	ctx.clip();
	return [new_canvas, ctx];	
}
//This function will initialize the image and serialize the data of the 
//original unprocessed image to a string
function init(state, draw, image_source){
	var img = document.createElement('IMG');
	var canvas = document.createElement('canvas');
	var controls = document.getElementById('scb_s_microscopy_lens_controls');

	canvas.id = 'lens';
	var samples_area =  $('body').find('.scb_s_microscopy_samples_slide_area')[0];
	if(samples_area){
		samples_area.appendChild(canvas);
	
		samples_area.appendChild(controls);
		var ctx = canvas.getContext('2d');
		var canvas_hidden = document.createElement('canvas');
		canvas_hidden.id = 'spy';
		canvas_hidden.style.visibility='hidden';
		var samples_area =  $('body').find('.scb_s_microscopy_samples_slide_area')[0];
		document.body.appendChild(canvas_hidden);
		state['action'] = 'loading image';
		$('.scb_s_microscope_status').text(state['action']);
		caman = Caman("#lens");
		img.src = image_source;
		img.onload= function (){
			ctx.save();
			img_width = img.width;
			img_height = img.height;	
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);	
			var img2string=canvas.toDataURL(0,0, img.width, img.height);
			canvas.width = 400;
			canvas.height = 400;
			ctx.beginPath();
			ctx.arc(200, 200, 175, 0, Math.PI *2, false);
			ctx.clip();
			ctx.drawImage(img, 0, 0);
			initialize_state(state, img2string);
			//console.log(img2string);
			draw(state);
		
			add_sharpen_images(map);

			add_5_sharpen_images(map);
		}
	}

}


function initialize_state(state, img2string){
	state['orig'] = reset_image(img2string);
	state['display'] = reset_image(img2string);
	state['brightness'] = 0;
	state['xparam'] = 0;
	state['yparam'] = 0;
	state['blur'] = 0;
	state['sharpen'] = 0;
	state['action'] = 'start';
	state['cache'] = new Object();
	state['cache']['brightness'] = 0;
	state['cache']['blur'] = 0;
	state['cache']['sharpen'] = 0;
	state['cache']['image'] = reset_image(img2string);
	
	state['sharp']= new Object();
	state['sharp']['images'] = [];
	$('.scb_s_microscope_status').text(state['action']);
	$("input").attr("disabled", true);
	
}


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//////////////////ORIGINAL FUNCTIONS/////////////////////////


function save_and_draw_cache_image(canvas, state){
	var ctx = canvas.getContext('2d');
	var elements = reset_cache();
	var canvas_hidden = elements[0]; 
	var spy_ctx = elements[1];
	var img = state['display'];
	var spy_img;
	Caman(canvas_hidden, img, function () {
		this.brightness(state['brightness']);
		console.log('bright');
		this.stackBlur(state['blur']);
		if(state['blur']>0){
			this.stackBlur(state['blur']);
			console.log('blur');
		}
		this.render(function(){
			console.log('before image');
			state['action']='before image saved';
			spy_img= Canvas2Image.saveAsPNG(canvas_hidden, true); 
			//Canvas2Image.saveAsPNG(canvas_hidden, false, 100, 100); 
			state['action'] = 'rendered';
			console.log('rendered'); 
			var hidden_canvas = document.getElementById('spy');
			hidden_canvas.width= 0;
			hidden_canvas.height=0;
			$('.scb_s_microscope_status').text(state['action']);
			state['cache']['image'] = spy_img ;
			state['cache']['brightness'] = state['brightness'];
			state['cache']['sharpen'] = state['sharpen'];
			state['cache']['blur'] = state['blur'];
			
			document.documentElement.style.overflow='scroll';
			document.body.style.overflow='scroll';
			var samples_area =  $('body').find('.scb_s_microscopy_samples_slide_area')[0];
			samples_area.style.overflow = 'hidden';
			samples_area.style.height = '100%';
			var e = jQuery.Event("keydown");
			e.which = 40;
			e.keyCode = 40;
			$(document.body).trigger(e);
		});
		console.log('rendering...');
		state['action'] = 'rendering';
		document.documentElement.style.overflow='hidden';
		document.body.style.overflow='hidden';
	
		$('.scb_s_microscope_status').text(state['action']);	

	});
	
	spy_ctx.drawImage(img, 0, 0);
	canvas.width = 400;
	canvas.height = 400;
	ctx.beginPath();
	ctx.arc(200, 200, 175, 0, Math.PI *2, false);
	ctx.clip();	
	ctx.drawImage(state['cache']['image'], state['xparam'], state['yparam']);
}


function modify_state_brightness(addition, state){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	state['brightness'] = state['brightness'] + addition;
	if(state['brightness'] >= 100)
		state['brightness'] = 100;
	else if (state['brightness'] <=-100)
		state['brightness'] = -100;
	Caman(canvas, state['display'], function () {
		this.brightness(state['brightness']);
		this.stackBlur(state['blur']);
		this.render(function(){
			state['action'] = 'bright';

			console.log('bright');
			
			$('.scb_s_microscope_status').text(state['action']);
		});
		
		console.log('rendering...');
		state['action'] = 'rendering';
		
		$('.scb_s_microscope_status').text(state['action']);

	});
	context.beginPath();
	context.arc(200, 200, 175, 0, Math.PI *2, false);
	context.clip();	
	context.drawImage(state['display'], state['xparam'], state['yparam']);

}


function modify_state_blur(addition, state, sharpen){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	console.log('blur');
	console.log(state['blur']);
	
	console.log('addition');
	console.log(addition);
	console.log('sharpen');
	console.log(state['sharpen']);
	
	if(state['blur'] > 100){
		state['blur'] = 100;
		blur_helper(state, context, canvas, addition);
	}
	if((state['blur']>0 && state['blur']<=100) || (state['sharpen']==0&&addition >0))
		blur_helper(state,context,canvas,addition);
	if ((state['sharpen']>0 && state['sharpen']<=100) || (state['blur']==0 && addition<0)){
		sharpen(-addition, state);	
	}
}


function blur_helper(state, context, canvas, addition){
	state['sharpen']=0;
	state['display'] = state['orig'];
	state['blur'] = state['blur'] + addition;
	Caman(canvas, state['display'], function () {
		this.brightness(state['brightness']);
		this.stackBlur(state['blur']);
		this.render(function(){
			state['action'] = 'blur';

			console.log('stackblur');
			
			$('.scb_s_microscope_status').text(state['action']);
		});
	
		console.log('rendering...');
		state['action'] = 'rendering';
		
		$('.scb_s_microscope_status').text(state['action']);


	});
	context.beginPath();
	context.arc(200, 200, 175, 0, Math.PI *2, false);
	context.clip();	
	context.drawImage(state['orig'], state['xparam'], state['yparam']);
}

function modify_state_sharpen(addition, state){
	var elements = reset_canvas();
	var canvas = elements[0]; 
	var context = elements[1];
	console.log('sharpen addition');
	console.log(addition);
	state['sharpen'] = state['sharpen'] + addition;
	if(state['sharpen'] > 100){
		state['sharpen'] = 100;
		state['display']=state['sharp']['images'][state['sharpen']];

	}
	else if (state['sharpen'] <5){
		state['sharpen'] = 0;
		state['display']=state['orig'];
	}
	else
		state['display']=state['sharp']['images'][state['sharpen']];
	
	Caman(canvas, state['display'], function () {
		this.brightness(state['brightness']);
		this.stackBlur(state['blur']);
		this.render(function(){
			state['action'] = 'sharpen';
			console.log('sharpen');
			
			$('.scb_s_microscope_status').text(state['action']);
		});
	
		console.log('rendering...');
		state['action'] = 'rendering';
		
		$('.scb_s_microscope_status').text(state['action']);

	});
	context.beginPath();
	context.arc(200, 200, 175, 0, Math.PI *2, false);
	context.clip();	
	context.drawImage(state['display'], state['xparam'], state['yparam']);
	
}


function add_sharpen_images(state){
	var img = document.createElement('IMG');
	img.src = 'images/microscopy/hi_s10.jpg';
	img.onload=function(){
		state['sharp']['images'][10] = img;
		var img2 = document.createElement('IMG');
		img2.src = 'images/microscopy/hi_s20.jpg';
		img2.onload=function(){
			state['sharp']['images'][20] = img2;
			var img3 = document.createElement('IMG');
			img3.src = 'images/microscopy/hi_s30.jpg';
			img3.onload=function(){
				state['sharp']['images'][30] = img3;
				var img4 = document.createElement('IMG');
				img4.src = 'images/microscopy/hi_s40.jpg';
				img4.onload=function(){
					state['sharp']['images'][40] = img4;
					var img5 = document.createElement('IMG');
					img5.src = 'images/microscopy/hi_s50.jpg';
					img5.onload=function(){
						state['sharp']['images'][50] = img5;
						var img6 = document.createElement('IMG');
						img6.src = 'images/microscopy/hi_s60.jpg';
						img6.onload=function(){
							state['sharp']['images'][60] = img6;
							var img7 = document.createElement('IMG');
							img7.src = 'images/microscopy/hi_s70.jpg';
							img7.onload=function(){
								state['sharp']['images'][70] = img7;
								var img8 = document.createElement('IMG');
								img8.src = 'images/microscopy/hi_s80.jpg';
								img8.onload=function(){
									state['sharp']['images'][80] = img8;
									var img9 = document.createElement('IMG');
									img9.src = 'images/microscopy/hi_s90.jpg';
									img9.onload=function(){
										state['sharp']['images'][90] = img9;
										var img0 = document.createElement('IMG');
										img0.src = 'images/microscopy/hi_s100.jpg';
										img0.onload=function(){
											state['sharp']['images'][100] = img0;
											console.log('allloaded');
										}

									}

								}

							}

						}

					}

				}

			}

		}
	}
	
}


function add_5_sharpen_images(state){
	var img = document.createElement('IMG');
	img.src = 'images/microscopy/hi_s5.jpg';
	img.onload=function(){
		state['sharp']['images'][5] = img;
		var img2 = document.createElement('IMG');
		img2.src = 'images/microscopy/hi_s15.jpg';
		img2.onload=function(){
			state['sharp']['images'][15] = img2;
			var img3 = document.createElement('IMG');
			img3.src = 'images/microscopy/hi_s25.jpg';
			img3.onload=function(){
				state['sharp']['images'][25] = img3;
				var img4 = document.createElement('IMG');
				img4.src = 'images/microscopy/hi_s35.jpg';
				img4.onload=function(){
					state['sharp']['images'][35] = img4;
					var img5 = document.createElement('IMG');
					img5.src = 'images/microscopy/hi_s45.jpg';
					img5.onload=function(){
						state['sharp']['images'][45] = img5;
						var img6 = document.createElement('IMG');
						img6.src = 'images/microscopy/hi_s55.jpg';
						img6.onload=function(){
							state['sharp']['images'][55] = img6;
							var img7 = document.createElement('IMG');
							img7.src = 'images/microscopy/hi_s65.jpg';
							img7.onload=function(){
								state['sharp']['images'][65] = img7;
								var img8 = document.createElement('IMG');
								img8.src = 'images/microscopy/hi_s75.jpg';
								img8.onload=function(){
									state['sharp']['images'][75] = img8;
									var img9 = document.createElement('IMG');
									img9.src = 'images/microscopy/hi_s85.jpg';
									img9.onload=function(){
										state['sharp']['images'][85] = img9;
										var img0 = document.createElement('IMG');
										img0.src = 'images/microscopy/hi_s95.jpg';
										img0.onload=function(){
											state['sharp']['images'][95] = img0;
											console.log('allloaded');
										}

									}

								}

							}

						}

					}

				}

			}

		}
	}
	
}



scb.ui.static.MicroscopyView.register = function (workarea) {
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_select_slide_type', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_select_slide_type(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_sample_remove', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_sample_remove(this);
    });
    scb.utils.off_on(workarea, 'change', '.scb_f_microscopy_sample_active', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_remove', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_remove(this);
    });
    scb.utils.off_on(workarea, 'blur', '.scb_s_microscopy_selected', function (e) {
        scb.ui.static.MicroscopyView.scb_s_microscopy_selected(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_load_slides', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_load_slides(this, e);
    });

    scb.utils.off_on(workarea, 'click', '.scb_s_microscopy_choose_samples_order_list>li', function (e) {
        scb.ui.static.MicroscopyView.scb_s_microscopy_choose_samples_order_list_select(this, e);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_prepare_slides', function (e) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_prepare_slides(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_sample_active_all', function (e, ui) {
        scb.ui.static.MicroscopyView.scb_f_microscopy_sample_active_all(this);
    });
    scb.utils.off_on(workarea, 'click', '.scb_f_microscopy_sample_inactive_all', function (e, ui){
    	scb.ui.static.MicroscopyView.scb_f_microscopy_sample_inactive_all(this);
    });
}

scb.ui.static.MicroscopyView.MAX_ROWS = 15;

scb.ui.static.MicroscopyView.draw_slides = function (workarea) {
    $('.scb_s_microscopy_samples_slide_area').each(function () {

        var slide = $(this);
        var parsed = scb.ui.static.MicroscopyView.parse(this);
        parsed.slide = slide;
        scb.ui.static.MicroscopyView.scb_s_microscopy_lens_draw_slide(parsed);
    })
}

scb.ui.MicroscopyView = function scb_ui_MicroscopyView(gstate) {
    var self = this;

    self.show = function (state) {
    	var workarea = gstate.workarea;
        var template = state.assignment.template;
        var rows_state = state.microscopy.rows_state();

        var can_prepare_slide = rows_state.valid > 0;

        var kind = 'sample_prep';
        if (state.microscopy.slide_prepared) {
        	 kind = 'prepare_slide';
        	 //init(map, draw, 'images/microscopy/black.jpg');
        }
        
        workarea.html(scb_microscopy.main({
            global_template: gstate.context.master_model,
            assignment: state.assignment,
            experiment: state.experiment,
            microscopy: state.microscopy,
            t: template,
            rows: rows_state.rows,
            rows_valid: rows_state.valid,
            kind: kind,
            kinds: template.micro_kinds,

            can_prepare_slide: can_prepare_slide
        }));

        if (kind == 'sample_prep') {
            if (_.keys(template.micro_kinds).length == 1) {
                $('button.scb_f_microscopy_sample_remove').hide();
            }

        }
        
        
        if (state.microscopy.samples_finished) {
        	scb.ui.static.MicroscopyView.draw_slides(workarea);
        }
        
        
		

        // var workarea = state.workarea;
//         var experiment = state.experiment;
//         var template = state.assignment.template;
//         var rows_state = state.microscopy.rows_state();
// 
//         var kind = 'sample_prep';
//         if (state.microscopy.slide_prepared) {
//             kind = 'prepare_slide';
//         }
// 	
//         var can_prepare_slide = rows_state.valid > 0;
// 
//         workarea.html(scb_microscopy.main({
//             global_template: gstate.context.master_model,
//             t: template,
//             assignment: state.assignment,
//             experiment: state.experiment,
//             microscopy: state.microscopy,
//             rows: rows_state.rows,
//             kind: kind,
//             can_prepare_slide: can_prepare_slide
//         }));
//         
// 		init(map, draw, 'images/microscopy/hi.jpg');
// 		 if (kind == 'sample_prep') {
//             if (_.keys(template.lysate_kinds).length == 1) {
//                 $('button.scb_f_microscopy_sample_remove').hide();
//             }
// 
//         }
// rows_state.valid > 0;
//         state.experiment.last_view = 'microscopy';
// // 		$('ol.scb_s_microscopy_choose_samples_order_list').sortable();
// 		
    }
}