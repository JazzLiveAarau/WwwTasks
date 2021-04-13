// File: JazzTasksTests.js
// Date: 2021-04-13
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Test-Funktionen

// Beschreibung wann die Funktion angerufen wird und was die Funktion macht
function onClickOfTestButton()
{
    // alert("Enter onClickOfTestButton");

    var backup_file_name = getBackupFileName("A0001.docx");

    var url_file_to_copy = "Documents/A0001.docx";

    var url_file_backup = "Documents/Backups/" + backup_file_name;

    backupFileWithJQueryPostFunction(url_file_to_copy, url_file_backup);

} // onClickOfTestButton




