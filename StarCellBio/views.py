__author__ = 'ceraj'

# Create your views here.

from django.http import HttpResponse
import datetime

from django.shortcuts import redirect
import json
import pudb
from backend.models import Assignment, StudentAssignment, Course, UserCourse
import StringIO
from django.core.files.base import ContentFile
import StarCellBio.settings
import os
import StarCellBio.supplements as supplements

random_mapping = {0: 'DEBAC', 1: 'DABEC', 2: 'CABED', 3: 'ACDEB', 4: 'EBADC', 5: 'BDECA', 6: 'EBCAD', 7: 'ADBCE', 8: 'CBAED', 9: 'DEACB', 10: 'ECDAB', 11: 'EDACB', 12: 'EBACD', 13: 'EADBC', 14: 'CBDEA', 15: 'CEDBA', 16: 'AEDCB', 17: 'DCBEA', 18: 'EDCAB', 19: 'ECBDA', 20: 'ABDCE', 21: 'BCAED', 22: 'ADECB', 23: 'BCADE', 24: 'BACED', 25: 'AEDBC', 26: 'EADCB', 27: 'AEBCD', 28: 'DBECA', 29: 'CAEBD', 30: 'ABECD', 31: 'CDAEB', 32: 'EABDC', 33: 'BDCEA', 34: 'CADEB', 35: 'DEABC', 36: 'BDACE', 37: 'AEBDC', 38: 'EBDAC', 39: 'ABCED', 40: 'EBCDA', 41: 'DACBE', 42: 'DCBAE', 43: 'BDCAE', 44: 'AECBD', 45: 'DCEBA', 46: 'ACEDB', 47: 'BCEAD', 48: 'CDEAB', 49: 'ECDBA', 50: 'DAECB', 51: 'BEACD', 52: 'CDBEA', 53: 'ACEBD', 54: 'DBEAC', 55: 'ACBED', 56: 'CBDAE', 57: 'ABCDE', 58: 'ADCBE', 59: 'BAECD', 60: 'DECAB', 61: 'ADCEB', 62: 'BCDAE', 63: 'CBADE', 64: 'CEADB', 65: 'CEBDA', 66: 'EACDB', 67: 'DBAEC', 68: 'EDCBA', 69: 'DEBCA', 70: 'CDEBA', 71: 'BAEDC', 72: 'CAEDB', 73: 'EDBCA', 74: 'ABDEC', 75: 'EDABC', 76: 'CADBE', 77: 'DCABE', 78: 'ADBEC', 79: 'ABEDC', 80: 'EBDCA', 81: 'DCAEB', 82: 'BEDCA', 83: 'CEBAD', 84: 'CBEDA', 85: 'DABCE', 86: 'BECDA', 87: 'EDBAC', 88: 'CBEAD', 89: 'BADEC', 90: 'BDAEC', 91: 'ADEBC', 92: 'CEABD', 93: 'DBCAE', 94: 'BECAD', 95: 'BCDEA', 96: 'BCEDA', 97: 'ECBAD', 98: 'DBCEA', 99: 'AECDB', 100: 'DCEAB', 101: 'BADCE', 102: 'DBACE', 103: 'EACBD', 104: 'CDABE', 105: 'BACDE', 106: 'ACDBE', 107: 'ECABD', 108: 'CDBAE', 109: 'DACEB', 110: 'BEADC', 111: 'EABCD', 112: 'CABDE', 113: 'BDEAC', 114: 'CEDAB', 115: 'DECBA', 116: 'DAEBC', 117: 'ECADB', 118: 'ACBDE', 119: 'BEDAC'}


random_mapping_ps2 = {0: '51432', 1: '53142', 2: '24513', 3: '13425', 4: '34521', 5: '31452', 6: '45213', 7: '25413', 8: '13452', 9: '14235', 10: '45312', 11: '52134', 12: '31425', 13: '24351', 14: '51342', 15: '25431', 16: '42135', 17: '35241', 18: '41532', 19: '21354', 20: '15342', 21: '53421', 22: '53241', 23: '54123', 24: '54231', 25: '54132', 26: '13254', 27: '23541', 28: '25143', 29: '52143', 30: '15324', 31: '53412', 32: '23514', 33: '12435', 34: '42315', 35: '35124', 36: '25314', 37: '42513', 38: '42351', 39: '31542', 40: '45231', 41: '54213', 42: '53214', 43: '45132', 44: '32145', 45: '24153', 46: '32541', 47: '41352', 48: '12453', 49: '34125', 50: '25134', 51: '15432', 52: '13542', 53: '35412', 54: '32514', 55: '23451', 56: '35421', 57: '14532', 58: '32154', 59: '51234', 60: '24531', 61: '31254', 62: '12345', 63: '32415', 64: '14352', 65: '51324', 66: '14253', 67: '15423', 68: '41253', 69: '54312', 70: '43125', 71: '25341', 72: '12534', 73: '21345', 74: '13524', 75: '14523', 76: '52341', 77: '43512', 78: '15234', 79: '21453', 80: '34251', 81: '13245', 82: '23415', 83: '42153', 84: '53124', 85: '43215', 86: '21435', 87: '41523', 88: '54321', 89: '51423', 90: '52413', 91: '43251', 92: '43521', 93: '52314', 94: '52431', 95: '23154', 96: '15243', 97: '14325', 98: '41235', 99: '45123', 100: '23145', 101: '51243', 102: '32451', 103: '45321', 104: '21534', 105: '35214', 106: '43152', 107: '24315', 108: '41325', 109: '34512', 110: '34215', 111: '24135', 112: '34152', 113: '35142', 114: '42531', 115: '31524', 116: '12543', 117: '12354', 118: '31245', 119: '21543'}
def home(request):

    file_path = StarCellBio.settings.rel('../html_app/index.html')
    fsock = open(file_path, "r")
    response = HttpResponse(fsock, mimetype='text/html; charset=utf-8')
    return response
    #return redirect('static/index.html')


def get_model(request):
    json_response = {'user': None, 'authenticated': False}
    #import pudb
    #pudb.set_trace()
    print request.user
    if request.user.is_authenticated():
        json_assignments = [];
        json_response = { 'user': request.user.username , 'authenticated': True, 'app_title':'StarCellBio' , 'app_description':'StarCellBio Placeholder', 'assignments':{'list':json_assignments}}
        if(Statuses.objects.exists()):
        	public_status = Statuses.objects.get(code='PUBL')
        	courses = request.user.course_set.filter(status=public_status)
        	for c in courses:
        		# Do something for authenticated users.
        		assignments = c.assignment_set.filter(status=public_status)
        		for a in assignments:
        			sa, created = StudentAssignment.objects.get_or_create(student=request.user, assignment=a)
        			if created:
        				sa.initialize()
        			json_assignments.append(sa.current)
        else:
        	return HttpResponse("var get_model_result = {0};".format( json.dumps("not working yet")))
    else:
        #import pudb
        #pudb.set_trace()
        #json_object = json.loads(request.body)
        pass
        # Do something for anonymous users.
    response = HttpResponse("var get_model_result = {0};".format( json.dumps(json_response)))
    response.set_cookie("scb_username", request.user.username)
    response['Content-Type'] = 'text/javascript'
    return response
    
def create_courses(request, **kwargs):# 
# 	import pudb
# 	pudb.set_trace()
	if(request.method == 'POST'):

		jstr=request.raw_post_data
		jsondata = json.loads(jstr)
		if(jsondata):
			#make more complex later 
			for x in jsondata['assignments']['list']:
				assign_id = x["id"]
				course_code = x["course"]
				assign_name = x["name"]
				course_name = x["course_name"]
				c = Course(code = course_code, course_name = course_name)
				c.save()
				a = Assignment(courseID=c, assignmentID=assign_id, assignmentName=assign_name, data = x)
				a.save()
			return HttpResponse('got it')
	else:
		response = HttpResponse("var create_courses_result = {0};".format( ''))
		response.set_cookie("scb_username", request.user.username)
		response['Content-Type'] = 'text/javascript'
		return response
		
def get_courses(request, **kwargs):
	import ast
	import random
	import pudb
	#pudb.set_trace()
	alist = []
	retval = []
	token1 = random.randrange(0, 1000000)
	if(UserCourse.objects.filter(user__username = request.user.username).count()>0):
		usercourses = UserCourse.objects.filter(user=request.user)
		courses = []
		for usercourse in usercourses:
			for c in Course.objects.filter(usercourses = usercourse):
				courses.append(c)
		assignments=[]
		#for course in courses:
		#	assignments.append(course.assignments.all())
		for course in courses:
			course_assignments = course.assignments.all()
			#pudb.set_trace()
			if(course.sassignments.filter(student=request.user).count() == 0 or course.sassignments.count() == 0):
				for a in course_assignments:
					original_assignment_data = a.data
					assignment_data = ast.literal_eval(original_assignment_data)
					if(a.assignmentName == 'StarCellBio Problem 2' ):
						import hashlib
						md5 = hashlib.md5()
						md5.update(str(request.user.email).lower())
						encoded_email = md5.hexdigest()
						encoded_number = int(encoded_email, 16)%120
						order = random_mapping_ps2[encoded_number]
						order = list(order)
						#pudb.set_trace()
						assignment_data['template']['random_order'] = order
						original_assignment_data = repr(assignment_data)
						print order
					if(a.assignmentName == 'StarCellBio Problem 1'):
						original_assignment_data = randomize_706_2014_ps1(request, assignment_data)
					sa = StudentAssignment(student = request.user, course = course, assignmentID = a.assignmentID, assignmentName= a.assignmentName, token = token1, data = original_assignment_data)
					sa.save()
				for x in course.sassignments.filter(student=request.user):
					assignments.append(x)
			else:
				#pudb.set_trace()
				assignments =[]
				if(len(course.sassignments.filter(student=request.user)) != len(course_assignments)):
					list_of_extras = []
					for a in course_assignments:
						list_of_extras.append(a.assignmentID)
					for a in course_assignments:
						for sa in course.sassignments.filter(student=request.user):
							if a.assignmentID == sa.assignmentID:
								list_of_extras.remove(a.assignmentID)
					for x in list_of_extras:
						a = Assignment.objects.filter(assignmentID=x)
						a = a[0]
						original_assignment_data = a.data
						assignment_data = ast.literal_eval(original_assignment_data)
						if(a.assignmentName == 'StarCellBio Problem 2' or assignment_data['template']['random_choose']):
							import hashlib
							md5 = hashlib.md5()
							md5.update(str(request.user.email).lower())
							encoded_email = md5.hexdigest()
							encoded_number = int(encoded_email, 16)%120
							order = random_mapping_ps2[encoded_number]
							order = list(order)
							assignment_data['template']['random_order'] = order
							original_assignment_data = repr(assignment_data)
							print order
						if(a.assignmentName == 'StarCellBio Problem 1' or assignment_data['template']['randomize_all']):
							original_assignment_data = randomize_706_2014_ps1(request, assignment_data)
						sa = StudentAssignment(student = request.user, course = course, assignmentID = a.assignmentID, assignmentName= a.assignmentName, token = token1, data = original_assignment_data)
						sa.save()
					print 'added assignment'
				token1 = course.sassignments.filter(student=request.user)[0].token
				for x in course.sassignments.filter(student=request.user):
					assignments.append(x)
		for a in assignments:
			dictionary = ast.literal_eval(a.data)
			alist.append(dictionary)
		#pudb.set_trace()
		is_selected_val = alist[0]['id']
		if (alist[0]['course'] == '7.06_Spring_2014' and len(alist) == 2):
			is_selected_val = 'assignment_706_2014_ps2'
		else:
			is_selected_val = alist[0]['id']
		retval = {'list': alist, 'is_auth': True, 'is_selected': is_selected_val, 'token': token1}
	else:
		#pudb.set_trace()
		all =[]
		for a in Assignment.objects.all():
			dictionary = ast.literal_eval(a.data)
			if(a.assignmentID == 'decusability' or a.assignmentID == 'microscopy_test' ): #or a.assignmentID == 'assignment_706_2014_ps2'):
				all.append(dictionary)
		retval = {'list': all, 'is_auth': False, 'is_selected': all[0]['id'], 'token': token1}
	response = HttpResponse("var get_courses_result = {0};".format(json.dumps(retval)))
	response.set_cookie("scb_username", request.user.username)
	response['Content-Type'] = 'text/javascript'
	return response
	
def post_state(request, **kwargs):
	#import pudb
	#print request.user
	jstr = request.raw_post_data
	jsondata = json.loads(jstr)
	jsonmodel = jsondata['model']
	import random
	token2 = random.randrange(0, 1000000)
	if(UserCourse.objects.filter(user__username = request.user.username).count()>0):
		usercourses = UserCourse.objects.filter(user=request.user)
		courses = []
		for usercourse in usercourses:
			for c in Course.objects.filter(usercourses = usercourse):
				courses.append(c)
		for course in courses:
			sassignments = course.sassignments.all()
			retval = {'is_anonymous': False, 'valid_token':False, 'token': token2}
			for sa in sassignments:
				for x in jsondata['model']['assignments']['list']:
					#pudb.set_trace()
					if(sa.token == jsondata['token'] and sa.assignmentID == x['id']):
							sa.data = json.loads(json.dumps(x))
							sa.token = token2
							sa.save()
							retval = {'is_anonymous': False, 'valid_token': True, 'token': token2}
	else:
		retval = {'is_anonymous': True, 'valid_token': False, 'token': token2}
	response = HttpResponse("var post_state_result = {0};".format(json.dumps(retval)))
	response.set_cookie("scb_username", request.user.username)
	response['Content-Type'] = 'text/javascript'
	return response

def contact(request, **kwargs):
	print "Content-Type: text/html"     # HTML is following
	print                               # blank line, end of headers
	#pudb.set_trace()
	#method = os.environ['REQUEST_METHOD']
	if request.method == "POST":
		try:
			post = supplements.get_post_dict(request)
		except supplements.MissingData, e:
			print "<h1>Error: %s</h1>" % e.value
			return
		supplements.send_feedback(post)
		return HttpResponse(supplements.success(post))
	else:
		return HttpResponse('POST-only cgi') 
		
def randomize_706_2014_ps1(request, assignment_data):
	import random
	#pudb.set_trace()
	import hashlib
	md5 = hashlib.md5()
	md5.update(str(request.user.email).lower())
	encoded_email = md5.hexdigest()
	encoded_number = int(encoded_email, 16)%120
	order = random_mapping[encoded_number]
	order = list(order)
	
	#replace A
	assignment_data['template']['ui']['add_multiple_dialog']['gfp1']['rows'][0]['cells'][0]['text'] = "WT-GFP-Protein "+order[0]+""
	assignment_data['template']['cell_lines']['gfp1']['name'] = "WT-GFP-Protein "+order[0]+""
	assignment_data['template']['primary_anti_body']['mp1']['name'] = "mouse anti-phospho-protein "+order[0]+""
	assignment_data['template']['primary_anti_body']['mp1']['gel_name'] = "P-Protein "+order[0]+""
	
	#replace B
	assignment_data['template']['ui']['add_multiple_dialog']['gfp2']['rows'][0]['cells'][0]['text'] = "WT-GFP-Protein "+order[1]+""
	assignment_data['template']['cell_lines']['gfp2']['name'] = "WT-GFP-Protein "+order[1]+""
	assignment_data['template']['primary_anti_body']['mp2']['name'] = "mouse anti-phospho-protein "+order[1]+""
	assignment_data['template']['primary_anti_body']['mp2']['gel_name'] = "P-Protein "+order[1]+""
	array_b = [(1,0), (3,0), (5,0), (7,0), (9,0), (11,0), (13,0), (15,0), (17,0), (19,0), (21,0), (21,1), (23,0), (23,1), (25,0), (27,0), (29,0), (31,0), (33,0), (35,0)]
	for x in array_b:
		assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][x[0]]['above_marks'][x[1]]['name'] = "protein "+order[1]+""
	#assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][1]['above_marks'][0]['name'] = "protein "+order[1]+""
	#assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][3]['above_marks'][0]['name'] = "protein "+order[1]+""
	
	#replace C
	assignment_data['template']['ui']['add_multiple_dialog']['gfp3']['rows'][0]['cells'][0]['text'] = "WT-GFP-Protein "+order[2]+""
	assignment_data['template']['cell_lines']['gfp3']['name'] = "WT-GFP-Protein "+order[2]+""
	assignment_data['template']['primary_anti_body']['mp3']['name'] = "mouse anti-phospho-protein "+order[2]+""
	assignment_data['template']['primary_anti_body']['mp3']['gel_name'] = "P-Protein "+order[2]+""
	array_c = [(0,0),(1,1), (2,0), (3,1), (4,0), (5,1), (6,0), (7,1), (8,0), (9,1), (10,0), (11,1), (12,0), (13,1), (14,0), (15,1), (16,0), (17,1), (18,0), (19,1), (20,0), (21,2), (22,0), (23,2), (24,0), (24,1), (25,1), (25,2), (26,0), (26,1), (27,1), (27,2), (28,0), (29,1), (30,0), (31,1), (32,0), (33,1), (34,0), (35,1)]
	for x in array_c:
		assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][x[0]]['above_marks'][x[1]]['name'] = "protein "+order[2]+""
		
	#assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][0]['above_marks'][0]['name'] = "protein "+order[2]+""
	#assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][1]['above_marks'][1]['name'] = "protein "+order[2]+""
	#assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][2]['above_marks'][0]['name'] = "protein "+order[2]+""
	#assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][3]['above_marks'][1]['name'] = "protein "+order[2]+""
	
	#replace D
	assignment_data['template']['ui']['add_multiple_dialog']['gfp4']['rows'][0]['cells'][0]['text'] = "WT-GFP-Protein "+order[3]+""
	assignment_data['template']['cell_lines']['gfp4']['name'] = "WT-GFP-Protein "+order[3]+""
	assignment_data['template']['primary_anti_body']['mp4']['name'] = "mouse anti-phospho-protein "+order[3]+""
	assignment_data['template']['primary_anti_body']['mp4']['gel_name'] = "P-Protein "+order[3]+""
	array_d = [(1,2), (5,2), (9,2), (13,2), (17,2), (21,3), (25,3), (29,2), (29,3), (33,2)]
	for x in array_d:
		assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][x[0]]['above_marks'][x[1]]['name'] = "protein "+order[3]+""
		
	#assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][1]['above_marks'][2]['name'] = "protein "+order[3]+""
	#replace Eassignment_data['template']['ui']['add_multiple_dialog']['gfp5']['rows'][0]['cells'][0]['text'] = "WT-GFP-Protein "+order[4]+""
	
	assignment_data['template']['cell_lines']['gfp5']['name'] = "WT-GFP-Protein "+order[4]+""
	assignment_data['template']['primary_anti_body']['mp5']['name'] = "mouse anti-phospho-protein "+order[4]+""
	assignment_data['template']['primary_anti_body']['mp5']['gel_name'] = "P-Protein "+order[4]+""
	array_e = [(1,3), (3,2), (5,3), (7,2), (9,3), (11,2), (13,3), (15,2), (17,3), (19,2), (21,4), (23,3), (25,4), (27,3), (29,4), (31,2), (33,3), (33,4), (35,2), (35,3)]
	for x in array_e:
		assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][x[0]]['above_marks'][x[1]]['name'] = "protein "+order[4]+""
		
	#assignment_data['template']['model']['western_blot']['cyto']['parser_fixed'][x[0]]['above_marks'][x[1]]['name'] = "protein "+order[4]+""
	for key, value in assignment_data['template']['ui']['add_multiple_dialog'].iteritems():
		if(key != 'order' and key != 'headings' and value['rows'][0]['cells'][0]['text'] == 'WT-GFP-Protein A'):
			assignment_data['template']['ui']['add_multiple_dialog']['order'][1] = key
		if(key != 'order' and key != 'headings' and value['rows'][0]['cells'][0]['text'] == 'WT-GFP-Protein B'):
			assignment_data['template']['ui']['add_multiple_dialog']['order'][2] = key
		if(key != 'order' and key != 'headings' and value['rows'][0]['cells'][0]['text'] == 'WT-GFP-Protein C'):
			assignment_data['template']['ui']['add_multiple_dialog']['order'][3] = key
		if(key != 'order' and key != 'headings' and value['rows'][0]['cells'][0]['text'] == 'WT-GFP-Protein D'):
			assignment_data['template']['ui']['add_multiple_dialog']['order'][4] = key
		if(key != 'order' and key != 'headings' and value['rows'][0]['cells'][0]['text'] == 'WT-GFP-Protein E'):
			assignment_data['template']['ui']['add_multiple_dialog']['order'][5] = key
	for key, value in assignment_data['template']['primary_anti_body'].iteritems():
		if(key != 'order' and value['gel_name'] == 'P-Protein A'):
			assignment_data['template']['primary_anti_body']['order'][0] = key
		if(key != 'order' and value['gel_name'] == 'P-Protein B'):
			assignment_data['template']['primary_anti_body']['order'][1] = key
		if(key != 'order' and value['gel_name'] == 'P-Protein C'):
			assignment_data['template']['primary_anti_body']['order'][2] = key
		if(key != 'order' and value['gel_name'] == 'P-Protein D'):
			assignment_data['template']['primary_anti_body']['order'][3] = key
		if(key != 'order' and value['gel_name'] == 'P-Protein E'):
			assignment_data['template']['primary_anti_body']['order'][4] = key
	
	return repr(assignment_data)
					
			
