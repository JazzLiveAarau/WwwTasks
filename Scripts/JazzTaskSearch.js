// File: JazzTaskSearch.js
// Date: 2021-04-20
// Author: Gunnar Lidén

// Content
// =======
//
// Search class for tasks
//
// Reference: https://www.w3schools.com/js/js_classes.asp

// Class for the search of tasks
class JazzTasksSearch 
{
    // Creates the instance of the class
    constructor(i_table) 
    {
        // Member variables
        // ===============

        // JazzTasksTable object that hold all JazzTask records 
        this.m_table = i_table;

        // Existing registration numbers (strings) of the input table
        this.m_registration_numbers = [];        

        // Search string
        this.m_search_str = '';

        // Search string as an array of search words
        this.m_search_words = [];

        // The result of a search is a list of registration numbers (strings)
        this.m_result_registration_numbers = [];

        // Set registration numbers (strings) of the input table
        this.setRecordNumberArray();

    } // constructor

    // Execution functions
    // ===================

    // Executes the search and returns an array of record numbers
    // 1. Set members search string and search word array. Call of setSearchString.
    search(i_search_str)
    {
        var ret_registration_numbers = [];

        this.m_result_registration_numbers = [];

        this.setSearchString(i_search_str);

        // ret_registration_numbers = this.m_registration_numbers; // Temporary for test QQQQQQQ

        ret_registration_numbers = this.sortTitleTasks();

        this.m_result_registration_numbers = ret_registration_numbers;   

        return ret_registration_numbers;

    } // search

    // Get and set functions for the member variables
    // ==============================================

    // Sets the search string. Also the search words array will be set
    setSearchString(i_search_str) 
    {
        this.m_search_str = i_search_str;

        this.setSearchWordArray();

    } // setJazzTaskRegNumber

    // Sets the search words array
    setSearchWordArray()
    {
        this.m_search_words = this.getSearchWordArray(this.m_search_str);

    } // setSearchWordArray

    // Init functions
    // ==============

    // Sets the existing record numbers of the input table
    setRecordNumberArray()
    {
        if (this.m_table == null)
        {
            alert("JazzTaskSearch Table object is null");

            return;
        }

        var array_case = 'reg_number';

        this.m_registration_numbers = this.m_table.getJazzTasksNameArray(array_case);

    } // setRecordNumberArray

    // Search functions
    // ================

    // Utility functions
    // =================

    // Get the search words array from the input search text
    // Function copied from the homepage web application 
    getSearchWordArray(i_search_str)
    {
        var ret_word_array = [];
    
        var n_char = i_search_str.length;
    
        var n_words = 0;
    
        var current_word = '';
        for (var index_char=0; index_char<n_char;index_char++)
        {
            var current_char = i_search_str.substring(index_char, index_char + 1);
    
            if (current_char == ' ')
            {
                if (current_word.length > 0)
                {
                    ret_word_array[n_words] = current_word;
    
                    n_words = n_words + 1;
    
                    current_word = '';
                }
            }
            else
            {
                current_word = current_word + current_char;
            }
        }
    
        if (current_word.length > 0)
        {
            ret_word_array[n_words] = current_word;
    
            n_words = n_words + 1; // Not used
    
            current_word = '';   // Not used 
        }
    
        return ret_word_array;
    
    } // getSearchWordArray


    // Returns an array with registration numbers after sorting with the title
    sortTitleTasks()
    {
        var ret_numbers_sort = [];

        var array_case = 'reg_number';

        var registration_numbers = this.m_table.getJazzTasksNameArray(array_case);   

        array_case = 'title';

        var task_titles_sort = this.m_table.getJazzTasksNameArray(array_case);  

        task_titles_sort.sort();
        
        var n_elements = registration_numbers.length;

        var task_titles = this.m_table.getJazzTasksNameArray(array_case);  

        for (var index_element=0; index_element < n_elements; index_element++)
        {
            var title_sorted = task_titles_sort[index_element];

            for (var index_out=0; index_out < n_elements; index_out++)
            {
                var current_reg_number = registration_numbers[index_out];

                var current_title = task_titles[index_out];

                if (current_title == title_sorted)
                {
                    ret_numbers_sort[index_element] = current_reg_number;
                }

            } // index_out

        } // index_element

        return ret_numbers_sort;

    } // sortTitleTasks

        // Returns an array with registration numbers after sorting with the responsible
        // Does not work. Names are not unique
        sortResponsibleTasks()
        {
            var ret_numbers_sort = [];
    
            var array_case = 'reg_number';
    
            var registration_numbers = this.m_table.getJazzTasksNameArray(array_case);   
    
            array_case = 'responsible';
    
            var task_responsibles_sort = this.m_table.getJazzTasksNameArray(array_case);  
    
            task_responsibles_sort.sort();
            
            var n_elements = registration_numbers.length;
    
            var task_responsibles = this.m_table.getJazzTasksNameArray(array_case);  
    
            for (var index_element=0; index_element < n_elements; index_element++)
            {
                var responsible_sorted = task_responsibles_sort[index_element];
    
                for (var index_out=0; index_out < n_elements; index_out++)
                {
                    var current_reg_number = registration_numbers[index_out];
    
                    var current_responsible = task_responsibles[index_out];
    
                    if (current_responsible == responsible_sorted)
                    {
                        ret_numbers_sort[index_element] = current_reg_number;
                    }
    
                } // index_out
    
            } // index_element
    
            return ret_numbers_sort;
    
        } // sortResponsibleTasks

} // class


