<?php


Behavior('ajax');
Behavior('bubbles');

UI('form.outlet',array('fields'=>array(
	'fromEmail'=>$this->getParameter('fromEmail', ''),
	'fromEmailName'=>$this->getParameter('fromEmailName', ''),

	'subject'=>'',
	'message'=>'',

	)));

HtmlBlock('page', 
    array(
        'className'=>'email-form',
        'content' => function () {




UI('input',
	array(
		'value' => '',
		'name' => 'subject',
		'label' => 'Subject',
		'message'=>'put a description or subject here'
	));


UI('input',
	array(
		'value' => '',
		'name' => 'message',
		'label' => 'Message',
		'lines' =>5,
		'message'=>'write your message here'
	));






UI('input',
	array(
		'value' => $this->getParameter('fromEmail', ''),
		'name' => 'fromEmail',
		'label' => 'Your Email Address',
		'message'=>'put your email address here'
	));

UI('input',
	array(
		'value' => $this->getParameter('fromEmailName', ''),
		'name' => 'fromEmailName',
		'label' => 'Your Name',
		'message'=>'put your name here'
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