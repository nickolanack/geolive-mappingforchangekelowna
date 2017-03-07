<?php


Behavior('ajax');
UI('form.outlet',array('fields'=>array(
	'fromEmail'=>$this->getParameter('fromEmail', ''),
	'fromEmailName'=>$this->getParameter('fromEmailName', ''),
	'toEmail'=>$this->getParameter('fromEmail', ''),
	'subject'=>'',
	'message'=>'',

	)));

HtmlBlock('page', 
    array(
       'className'=>'email-form',
        'content' => function () {

UI('input',
	array(
		'value' => $this->getParameter('fromEmail', ''),
		'name' => 'toEmail',
		'label' => 'To Email',
	));


UI('input',
	array(
		'value' => '',
		'name' => 'subject',
		'label' => 'Subject',
	));


UI('input',
	array(
		'value' => '',
		'name' => 'message',
		'label' => 'Message',
		'lines' =>5
	));






UI('input',
	array(
		'value' => $this->getParameter('fromEmail', ''),
		'name' => 'fromEmail',
		'label' => 'From Email Address',
	));

UI('input',
	array(
		'value' => $this->getParameter('fromEmailName', ''),
		'name' => 'fromEmailName',
		'label' => 'From Email Name',
	));


UI('button', array(
    'script' => '



    (new AjaxControlQuery(CoreAjaxUrlRoot,"send_email", Object.append({
    	"plugin":"EmailModerate"
    }, window.Outlets.getFormData()))).execute();





    ',
    'title' => 'Send',
    'icon' => Core::AssetsDir() . DS . 'Control Panel Icons' . DS . 'mail.png'
));


}));
?>