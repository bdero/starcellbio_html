import random

list = []
indices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

f = open('706_2014_mapping.txt','w')

while len(list) < 24:
	string = ""
	while len(string) != 4 :
		num = random.randint(1, 4)
		if num == 1 and not ('A' in string):
			string+='A'
		elif num == 2 and not ('B' in string):
			string+='B'
		elif num == 3 and  not ('C' in string):
			string+='C'
		elif num == 4 and not ('D' in string):
			string+='D'
	if string in list:
		print 'alreadythere'
	else:
		list.append(string)

print list
dict_list = zip(indices,list)
dict_list = dict(dict_list)
print dict_list
f.write(str(dict_list))
f.close()