<?php


Behavior('ajax');
Behavior('bubbles');

$prefix='f-'.rand(100000,999999);

UI('form.outlet',array('fields'=>array(
	$prefix.'.fromEmail'=>'',
	$prefix.'.fromEmailName'=>'',

	$prefix.'.subject'=>'',
	$prefix.'.message'=>'',

	)));

HtmlBlock('page', 
    array(
        'className'=>'email-form inline-form',
        'content' => function () {




UI('input',
	array(
		'value' => '',
		'name' => $prefix.'.subject',
		'label' => 'Subject',
		'message'=>'enter a title or subject here'
	));


UI('input',
	array(
		'value' => '',
		'name' => $prefix.'.message',
		'label' => 'Message',
		'lines' =>5,
		'message'=>'write your message here'
	));






UI('input',
	array(
		'value' => '',
		'name' => $prefix.'.fromEmail',
		'label' => 'Your Email Address',
		'message'=>'enter your email address here'
	));

UI('input',
	array(
		'value' => '',
		'name' => $prefix.'.fromEmailName',
		'label' => 'Your Name',
		'message'=>'enter your name here'
	));

UI('button', array(
    'script' => '



    (new AjaxControlQuery(CoreAjaxUrlRoot,"send_email_feedback", Object.append({
    	"plugin":"EmailModerate"
    }, window.Outlets.getFormDataWithNamespace("'.$prefix.'.")))).addEvent("success",function(response){


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