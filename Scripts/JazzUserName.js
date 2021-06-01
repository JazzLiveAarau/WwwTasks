// File: JazzUserName.js
// Date: 2021-05-23
// Author: Gunnar Lidén

// Inhalt
// =============
//
//  Class handling user name as a local storage parameter

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start User Name /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class with variables an functions that handle login and logout
// Here is a sample how an object of the class can be created:
// var object_user_name = new JazzUserName();
class JazzUserName
{
    // Function that is executed when an object of this class is created
    // Variables are defined and two inititialization functions are executed
    // Input parameters
    constructor()
    {
        // Member variables
        // ================

        // User name
        this.m_user_name = "";

        // windows.localStorage key
        this.m_local_storage_jazz_user_name = "jazz_user_name_str";

        // Initialization functions
        // ========================

        // Get the user name from the local storage. 
        // If not yet stored, request name from the user, store and return it
        this.getUserName();

    } // constructor

    // Member get and set functions
    // ============================

    // Get the user name from the local storage. 
    // If not yet stored, request name from the user, store and return it
    // 1. Return m_user_name if it is set
    // 2. If the user name not yet was saved in the computer, call requestSetUserName
    // 3. If the user name is saved in the computer
    // 3.1 Set m_user_name with this name
    // 3.2 Return m_user_name
    // 4. 
    getUserName()
    {
        if (this.m_user_name.length > 0)
        {
            return this.m_user_name;
        }

        var user_name_local_storage = localStorage.getItem(this.m_local_storage_jazz_user_name);

        if (user_name_local_storage == null)
        {
            var user_name_init = this.requestSetUserName();

            return user_name_init;
        }

        if (user_name_local_storage.length > 0)
        {
            this.setUserName(user_name_local_storage);

            return user_name_local_storage;
        }

        var user_name = this.requestSetUserName();

        return user_name;
        
    } // getUserName

    // Set user name
    setUserName(i_user_name)
    {
        this.m_user_name = i_user_name;

    } // setUserName

    // Utility functions
    // -----------------

    // Request and set user name
    // The calling function should use the returned user name and not m_user_name
    // set by setUserName. 
    requestSetUserName()
    {
        var user_name_requested = JazzUserName.requestUserName();

        if (user_name_requested.length > 0)
        {
            localStorage.setItem(this.m_local_storage_jazz_user_name, user_name_requested);

            this.setUserName(user_name_requested);               
        }

        return user_name_requested;

    } // requestSetUserName

    // Request user name
    // Loop is used because reload page and recursive calling resulted in problems
    static requestUserName()
    {
        for (var i_request=1; i_request <= 100; i_request++)
        {
            var user_name = prompt(JazzUserName.getPromptUserName(), "");

            var user_name_trim = "";
    
            if (user_name == null)
            {
                user_name_trim = "";
            }
            else if (user_name.length == 0)
            {
                user_name_trim = "";
            }
            else
            {
                user_name_trim = user_name.trim();
            }
    
            if (JazzUserName.checkUserName(user_name_trim))
            {
                return user_name_trim;
            }
        } // i_request

        return "AnyName";

    } // requestUserName

    // Returns true if user name is OK
    static checkUserName(i_user_name_trim)
    {
        if (i_user_name_trim.length == 0)
        {
            alert(JazzUserName.getUserNameErrorUserNameEmpty());

            return false;
        }

        if (i_user_name_trim.length < 2)
        {
            alert(JazzUserName.getUserNameErrorUserNameTooShort());

            return false;
        }

        var index_space = i_user_name_trim.indexOf(" ");

        if (index_space >= 0)
        {
            alert(JazzUserName.getUserNameErrorContainsSpaces());

            return false;
        }

        return true;

    } // checkUserName

    // Strings and messages
    // --------------------

    // Returns the prompt string for user name
    static getPromptUserName()
    {
        return "Bitte Benutzer-Name (Vor- oder Nachname) eingeben." +
        "\nDer Name wird für das Backup von DOCs vervendet und" + 
        "\nfür Login. Der Name wird im Computer gespeichert." +
        "\nNach Cache löschen muss er wieder eingegeben werden.";

    } // getPromptUserName

    // Returns the error message that the input name string is empty
    static getUserNameErrorUserNameEmpty()
    {
        return "Benutzer-Name ist leer";

    } // getUserNameErrorUserNameEmpty

    // Returns the error message that the user name is too short
    static getUserNameErrorUserNameTooShort()
    {
        return "Min Anzahl Buchstaben des Benutzer-Names ist zwei (2)";

    } // getUserNameErrorUserNameTooShort

    // Returns the error message that the user name are two or more name
    static getUserNameErrorContainsSpaces()
    {
        return "Benutzer-Name enthält Leerschlag";

    } // getUserNameErrorContainsSpaces    

} // JazzUserName

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End User Name ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
