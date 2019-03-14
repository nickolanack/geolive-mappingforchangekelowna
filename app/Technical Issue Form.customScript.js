<?php


Behavior('ajax');
Behavior('bubbles');

UI('form.outlet',array('fields'=>array(
	'tech.fromEmail'=>'',
	'tech.fromEmailName'=>'',

	'tech.subject'=>'',
	'tech.message'=>'',

	)));

HtmlBlock('page', 
    array(
        'className'=>'email-form inline-form',
        'content' => function () {




UI('input',
	array(
		'value' => '',
		'name' => 'tech.subject',
		'label' => 'Subject',
		'message'=>'enter a title or subject here'
	));


UI('input',
	array(
		'value' => '',
		'name' => 'tech.message',
		'label' => 'Message',
		'lines' =>5,
		'message'=>'write your message here'
	));






UI('input',
	array(
		'value' => '',
		'name' => 'tech.fromEmail',
		'label' => 'Your Email Address',
		'message'=>'enter your email address here'
	));

UI('input',
	array(
		'value' => '',
		'name' => 'tech.fromEmailName',
		'label' => 'Your Name',
		'message'=>'enter your name here'
	));

UI('button', array(
    'script' => '



    (new AjaxControlQuery(CoreAjaxUrlRoot,"send_email_feedback", Object.append({
    	"plugin":"EmailModerate"
    }, window.Outlets.getFormData()))).addEvent("success",function(response){


    	if(response.success){

    		
    		NotificationBubble.Make("", "Your message has been sent to a moderator");
    		try{
    			window.Outlets.clearForm();
    		}catch(e){}
    		
    	}else{
    		NotificationBubble.Make("", response.error);
    	}



    }).execute();



    ',
    'title' => 'Send',
    'icon' => Core::AssetsDir() . DS . 'Control Panel Icons' . DS . 'mail.png'
));


}));

?>