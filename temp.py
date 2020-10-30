count = 0
template1 = ''' 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Symptom/History</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>

<body>
    <center>
        <h4 class='bg-light text-primary p-3'>
'''
template2 = '''
</h4>
        <br>
    </center>
    <form>
        <div class="container mb-3">
            <div class="form-row">
                <div class="col-sm-12">
                    <label class='text-secondary ml-1'>
'''
template3='''
</div>
            </div>
            <center>
                <br>
                <button type="submit" id='updateBtn' class="btn btn-primary">
                    Add Feature
                </button>
            </center>
        </div>
    </form>
    <script src='../popup.js'></script>
</body>

</html>


'''

import json
with open('SymptomsOutput.json') as f:
    data  = json.load(f)
    for element in data:
        with open('files/'+str(count)+'.html','w') as wf:
            wf.write(template1)
            wf.write(str(element['text']))
            wf.write(template2)
            if str(element['type'])=='integer' or str(element['type'])=='double':
                inputField = "" +str(element["laytext"]) +'</label><br /> <input type="number" class="form-control" min="' +str(element["min"]) +'" name="' +str(element["name"]) +'" id="fetchFeature" max="' +str(element["max"]) +'" value="' +str(element["default"]) +'" /><br />'
            else:
                inputField = ''+str(element["laytext"]) +"</label><br /><select class='custom-select' id='fetchFeature'>"
                for j in element['choices']:
                    inputField +='<option value="' + str(j["value"]) + '" >' + str(j["laytext"]) + "</option>"    
                inputField+="</select>" 
            inputField+="<input type='hidden' id='feature' value='"+element['name']+"'/>"
            wf.write(inputField)       
            wf.write(template3)        
        count+=1
