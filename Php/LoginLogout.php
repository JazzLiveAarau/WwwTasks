<?php

// File: LoginLogout.php
// Date: 2021-05-31
// Author: Gunnar Liden

// This file defines all PHP functions for JavaScript class LoginLogout

// References
// PHP Functions:  https://www.w3schools.com/php/php_functions.asp

$exec_case = $_POST['exec_case'];

$user_name = $_POST['user_name'];

$logged_in_name = $_POST['logged_in_name'];

$user_logged_in = $_POST['user_logged_in'];

$name_nobody = $_POST['name_nobody'];

$file_login_logout = $_POST['file_login_logout'];

$error_message_one = $_POST['error_message_one'];

$error_message_two = $_POST['error_message_two'];

switch ($exec_case) 
{
    case "ExecGetLoggedIn":
        getLoggedInNameEcho($user_name, $file_login_logout);
        break;
    case "ExecSetLoggedIn":
      setLoggedInNameEcho($logged_in_name, $user_name, $file_login_logout, $error_message_one);
      break;
    case "ExecLoginIfPossible":
      loginIfPossible($user_name, $file_login_logout, $name_nobody, $error_message_one);
      break;
      case "ExecClickLoginLogout":
        clickLoginLogout($user_name, $file_login_logout, $user_logged_in,  $name_nobody, $error_message_one, $error_message_two); 
        break;
    default:
      echo "Error LoginLogout.php Not an implemented case " . $exec_case;
}

// Login if possible
function loginIfPossible($i_user_name, $i_file_login_logout, $i_name_nobody, $i_error_message_one)
{
  $logged_in_name = getLoggedInName($i_file_login_logout);

  if ($logged_in_name == $i_name_nobody)
  {
    setLoggedInName($i_user_name, $i_file_login_logout, $i_error_message_one);

    echo $i_user_name . "_user";
  }
  elseif($logged_in_name == $i_user_name)
  {
    echo $i_user_name . "_myself";
  }
  else
  {
    echo $logged_in_name . "_other";
  }

} // loginIfPossible

// Handling function when user clicked the login/logout button
function clickLoginLogout($i_user_name, $i_file_login_logout, $i_user_logged_in, $i_name_nobody, $i_error_message_one, $i_error_message_two)
{
  $logged_in_name = getLoggedInName($i_file_login_logout);

  if ($logged_in_name == $i_name_nobody && $i_user_logged_in == "FALSE")
  {
    // Nobody is logged in and the user is not logged in, i.e. the user logged himself out
    // Displayed: Ausgeloggt --- Login
    
    setLoggedInName($i_user_name, $i_file_login_logout, $i_error_message_one);

    echo $i_user_name . "_login";
  }
  elseif ($logged_in_name == $i_name_nobody && $i_user_logged_in == "TRUE")
  {
    // The user is logged out, but nobody is logged in, i.e. somebody else
    // took over the login and then logged out. 
    // This means that the user can login again. The user is however not aware
    // of this unless there is a warning message

    setLoggedInName($i_user_name, $i_file_login_logout, $i_error_message_one);

    echo $i_user_name . "_outlogged-free";
  }
  elseif ($logged_in_name != $i_user_name && $i_user_logged_in == "FALSE")
  {
    // Another person is logged in and the user is not logged in. The user
    // now is using the possibility to force a login.

    setLoggedInName($i_user_name, $i_file_login_logout, $i_error_message_one);

    echo $i_user_name . "_forced";
  }
  elseif ($logged_in_name != $i_user_name && $i_user_logged_in == "TRUE")
  {
    // Another user has taken over the login. The user is no longer allowed
    // to save any changes. The user will get a warning and the other persons
    // name will be displayed.

    echo $logged_in_name . "_outlogged";
  }
  elseif ($logged_in_name == $i_user_name && $i_user_logged_in == "TRUE")
  {
    // The user is logged out and is the same person as registered in the text file,
    // i.e. the user wants to be logged out

    setLoggedInName($i_name_nobody, $i_file_login_logout, $i_error_message_one);  

    echo $i_name_nobody . "_logout";
  }
  elseif ($logged_in_name == $i_user_name && $i_user_logged_in == "FALSE")
  {
    echo $i_error_message_two;
  }
  else
  {
    echo $i_error_message_two . $i_error_message_two;
  }

} // clickLoginLogout

// Echoes the name of the logged in person
function getLoggedInNameEcho($i_user_name, $i_file_login_logout)
{
  $file_content = file_get_contents($i_file_login_logout);

  if ($file_content == $i_user_name)
  {
    echo  $file_content . "_user";
  }
  else
  {
    echo  $file_content . "_other";
  }

} // getLoggedInNameEcho

// Echos the set logged in name (not yet tested)
function setLoggedInNameEcho($i_logged_in_name, $i_user_name, $i_file_login_logout, $i_error_message_one)
{
  if (strlen($i_logged_in_name) < 2)
  {
      echo $i_error_message_one;
  }

  $file_content_new = $i_logged_in_name;

  $new_file = fopen($i_file_login_logout, "w") or die("Unable to open file!");

  fwrite($new_file, $file_content_new);

  fclose($new_file);

  if ($i_logged_in_name == $i_user_name)
  {
    echo  $i_logged_in_name . "_user";
  }
  else
  {
    echo  $i_logged_in_name . "_other";
  }

} // setLoggedInNameEcho


// Returns the name of the logged in person
function getLoggedInName($i_file_login_logout)
{
  $file_content = file_get_contents($i_file_login_logout);

  return  $file_content;

} // getLoggedInName

// Sets the logged in name
function setLoggedInName($i_logged_in_name, $i_file_login_logout, $i_error_message_one)
{
  if (strlen($i_logged_in_name) < 2)
  {
      return $i_error_message_one;
  }

  $file_content_new = $i_logged_in_name;

  $new_file = fopen($i_file_login_logout, "w") or die("Unable to open file!");

  fwrite($new_file, $file_content_new);

  fclose($new_file);

  return $i_logged_in_name;

} // setLoggedInName

?>
