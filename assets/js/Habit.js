function getHabits(data){
    console.log(data);
    $.ajax({
        url: '/getSchedule',
        method: 'POST',
        data:data,
        success: function(res){
            console.log("Success in getting habits", res.data.habits);
            $('#habits').empty();
            $('#habits').attr("hidden", true);
            $('#confirm').attr("hidden", true);
            $('#noHabitstoDisplay').attr("hidden", true);
            if(res.data.habits.length>0){
                $('#habits').removeAttr('hidden');
                $('#confirm').removeAttr('hidden');
                for(let i of res.data.habits){
                    console.log("getHabits() function working ",i);
                    let newHabit = getHabitTitle(i);
                    $('#habits').prepend(newHabit);
                }
            }else{
                $('#noHabits').removeAttr('hidden');
            }
        }, error: function() {
            console.log('error in reaching the server: ',error);
        }

    });
}

function getHabitTitle(obj){
    console.log("getHabitTitle working: ",obj);
    if(obj.status == "Done"){
        return $(`<div class="habitsTitle" id=${obj._id}>
        ${obj.habit}
        <div class="checkBox">
                <input type="checkbox" value="Done" checked>
                <span>Done</span>
                <input type="checkbox" value="NotDone">
                <span.l>Not Done</span.l>
            </div>
    </div>`)
    }else if(obj.status == "NotDone"){
        return $(`<div class="habitsTitle" id=${obj._id}>
        ${obj.habit}
        <div class="checkBox">
            <input type="checkbox" value="Done">
            <span>Done</span>
            <input type="checkbox" value="NotDone checked="true">
            <span>Not Done</span>
        </div>
    </div>`)
    
    }
    return $(`<div class="habitsTitle" id=${obj._id}>
    ${obj.habit}
    <div class="checkBox">
        <input type="checkbox" value="Done">
        <span>Done</span>
        <input type="checkbox" value="NotDone>
        <span>Not Done</span>
    </div>
</div>`)
}

function getLastDate(){
    var lastDate = new Date().setDate(new Date().getDate() - 6);
    let last = new Date(lastDate);
    var lastDay = ("0" + last.getDate()).slice(-2);
    var lastMonth = ("0" + (last.getMonth() + 1)).slice(-2);
    lastDate = last.getFullYear() + '-' + lastMonth + '-' + lastDay;
    console.log("This is getLastDate() working ",lastDate);
    return lastDate;
}
function postStatus(Data){
    console.log(Data);
    // let object = new Object();
    // object.data = Data;
    $.ajax({
        url: '/updateStatus',
        method: 'POST',
        data: Data,
        success: function (res) {
            console.log("Success in getting habits", res.message);
            notification(true);
           
        }, error: function () {
            console.log('error while reaching server');
            notification(false);
        }
    });
}

function notification(value){
    if(value){
        new Noty({
            theme: 'relax',
            text: 'Status Updated',
            type: 'success',
            layout: 'topRight',
            timeout: 1500,
        }).show();
    }
    else{
        new Noty({
            theme: 'relax',
            text: 'Error occurred',
            type: 'error',
            layout: 'topRight',
            timeout: 1500,
        }).show();
    }
}

var now = new Date();

var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear() + "-" + (month) + "-" + (day);

let lastDate = getLastDate();

$('#date-input').val(today);

$('#date-input').prop('min',lastDate);

getHabits($('#date-input').serialize());


$('#submit-date').on('click',function(){
    let date = $('#date-input').serialize();
    console.log("Submit clicked");
    getHabits(date);
});

$('#confirm').on('click',function(){
    console.log("confirm click is working");
    console.log($("input[type='checkbox']").val());
    let arr = {};
    $("#habits").children('div[id]').each(function(){
        let idValue = $(this).attr('id');
        $(this).children('.checkBox').each(function(){
            let idVal = $(`#${idValue} input[type='checkbox']:checked`).val();
            console.log(idVal);
            if(idVal){
                arr[idValue] = idVal;
            }else{
                arr[idValue] = "null";
            }
        })
    })
    postStatus(arr);
})

