// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI

function AppViewModel() {
    var self= this;
    
    self.email=ko.observable('');
    self.password=ko.observable('');
    
    self.newname=ko.observable('ankit');
    self.newemail=ko.observable('ak@a.com');
    self.newpassword=ko.observable('a');
  var token=  readCookie("token");
    self.token=ko.observable(token);
    self.adminName = ko.observable('Admin');

    self.logout=function () {
        eraseCookie("token");
          self.token(null);
        window.location.reload();
    }
    self.login = function() {
      
    $.ajax({
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify({
            email: self.email(),
            password:self.password() }),
            url: "http://18.223.110.166:5000/user/login",
           
            success: function(result) {
                //Write your code here
                if(result.status==200){
                //self.token(result.token);
                $.toast({ heading: 'Success',
                text: result.message,
                  showHideTransition: 'slide',
                icon: 'success'});
                $('#login').hide();
                createCookie("token",result.token,1);
                self.getData();
                
                }
                else{
                    $.toast({heading:'error',text:result.message, icon: 'error'});
                }
                },
            error:
            function(result) {
                //Write your code here
                $.toast({heading:'error',text:result.responseJSON.message,icon:'error'});
                }
        
      });
        // .done(function( data ) {
        //   alert( "welcome your token is = : " + data.token );
        // });

    }

     //make ajax call to api to get the data required to show the data tables.
        self.getData= function(params) {
            //on the success of ajax call showTable method by passing data
          
            self.showTable(data);
        }
    self.showTable= function(tabledata) {
      
        $('#usertable').fadeIn( 2000);
        var table=$('#table_id').DataTable( {
            data: tabledata,
           
            columns: [
                { data: 'name', title:'name' },
                { data: 'position',title:'position' },
                { data: 'salary',title:'salary' },
                { data: 'office' ,title:'office'}
            ]
        } );

        $('#table_id tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
             //   alert('show user details');
             window.location="SurveyDetail.html"
             self.getUserDetailSurvey();
            }
        } );
        
    }
    self.showUsers=function (params) {
        $('#usertable').fadeIn(2000);
        $('#userDetail').hide();
    }
    self.getUserDetailSurvey =function (params) {
        //ajax to bring the user survey
        $('#usertable').hide();
        $('#userDetail').fadeIn(2000);
        
//on success call 
self.showUserDetailTable();
    }
self.showUserDetailTable= function (tabledata) {
    $('#usertable').fadeIn( 2000);
        var detailTable=$('#table_Detail').DataTable( {
            data: tabledata,
            dom: 'Bfrtip',
            columns: [
                { data: 'name', title:'Question' },
                { data: 'position',title:'Answer' },
                { data: 'salary',title:'Score' },
                { data: 'office' ,title:'office'}
            ],
            buttons: [{
                extend: 'pdf',
                text: 'Print ',
                exportOptions: {
                    modifier: {
                        page: 'current'
                    }
                }
            }
            ]
        } );
}

    self.saveUser = function () {
        //add user ajax to be called here
        $('#addUser').slideToggle("slow");

    }

self.showUserForm= function(){
    $('#addUser').slideDown( "slow");
}
// self.hideUserForm= function(){
//     $('addUser').hide( "slow");
// }

//initialisation of the page goes here
if((self.token()==null || self.token()=="")){
$('#usertable').hide();}else{
    self.getData();
}

$('#addUser').hide();


//dummy data to be deleted later
var data = [
    {
        "name":       "Tiger Nixon",
        "position":   "System Architect",
        "salary":     "$3,120",
        "start_date": "2011/04/25",
        "office":     "Edinburgh",
        "extn":       "5421"
    },
    {
        "name":       "Garrett Winters",
        "position":   "Director",
        "salary":     "$5,300",
        "start_date": "2011/07/25",
        "office":     "Edinburgh",
        "extn":       "8422"
    }
];

}

ko.applyBindings(new AppViewModel());

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}


// Activates knockout.js


