<?php

// Hello! welcome to the settings page.
// Here's your two steps guide:

// FIRST: 
// Instead of newsletter@test.com put the email address of the mailing list,
// ... please pay attention to the  ' ' apostrophes, they must remain around the email address.

$emailmanager = 'newsletter@test.com';

// SECOND:
// save this file, and close it. Thank you!


error_reporting(0);

$email = trim($_POST['email']);
$Ok = ereg("^([a-zA-Z0-9_\.-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$", $email);
if ($Ok) {
	mail($emailmanager,'New Subscriber','You have a new subscriber!','From: '.$email);

	if( !ereg("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$",$UNameFrm) )
	{
		echo 1;
	}
} 

	else 
	{
		echo 0;	
	}
?>