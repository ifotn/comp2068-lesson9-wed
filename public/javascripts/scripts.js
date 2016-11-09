/**
 * Created by RFreeman on 10/12/2016.
 */

// delete confirmation
$('.confirmation').on('click', function() {
    return confirm('Are you sure you want to delete this?');
});

// password equals confirm check
var validator = $('#registerForm').validate({
    rules: {
        confirm: {
            required: true,
            equalTo: '#password'
        }
    },
    messages: {
        confirm: {
            equalTo: 'Your Passwords do not Match'
        }
    }
});
