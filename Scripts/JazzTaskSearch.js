// File: JazzTaskSearch.js
// Date: 2021-04-24
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
        // The array may be ordered
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
        var ret_result_registration_numbers = [];

        this.m_result_registration_numbers = [];

        this.setSearchString(i_search_str);

        // this.m_registration_numbers

        if (i_search_str.length == 0)
        {
            this.m_result_registration_numbers = this.m_registration_numbers;

            return this.m_registration_numbers;
        }

        var index_hit = 0;

        var search_word_array = this.getSearchWordArray(i_search_str);

        for (var index_record=0; index_record < this.m_registration_numbers.length; index_record++)
        {
            var reg_number = this.m_registration_numbers[index_record];

            var task_number = g_display_table.getTaskNumberFromRegistrationNumber(reg_number);

            var current_record = g_display_table.getJazzTaskRecord(task_number);

            if (this.searchOneRecord(search_word_array, current_record))
            {
                ret_result_registration_numbers[index_hit] = reg_number;

                index_hit = index_hit + 1;
            }
          
        } // index_record

        this.m_result_registration_numbers = ret_result_registration_numbers;

        return ret_result_registration_numbers;

    } // search


    // Returns true if there are AND hits
    searchOneRecord(i_search_array, i_record)
    {
        var hit_array = this.getHitArray(i_search_array);

        var compare_array = this.getCompareArray(i_record);
        
        for (var index_compare=0; index_compare < compare_array.length; index_compare++)
        {
            var search_text = compare_array[index_compare];

            for (var index_word=0; index_word < i_search_array.length; index_word++)
            {
                var search_word = i_search_array[index_word];

                var b_hit = this.stringContainsSearchString(search_word, search_text);
                
                if (b_hit)
                {
                    hit_array[index_word] = true;
                }

            } // index_word

        } // index_compare

        return this.allHitArrayTrue(hit_array)

    } // searchOneRecord

    // Returns true if all elements in the input array are true
    allHitArrayTrue(i_hit_array)
    {
        var n_elements = i_hit_array.length;

        var hit_element_false_exists = false;

        for (var index_element=0; index_element < n_elements; index_element++)
        {
            if (i_hit_array[index_element] == false)
            {
                hit_element_false_exists = true;
            }
        }

        if (hit_element_false_exists)
        {
            return false;
        }
        else
        {
            return true;
        }
     
    } // allHitArrayTrue

    // Returns an array of texts to compare 
    getCompareArray(i_record)
    {
        var ret_compare_array = [];

        var title_str = i_record.getJazzTaskTitle();

        var descr_str = i_record.getJazzTaskDescription();

        var respons_str = i_record.getJazzTaskResponsible();

        var remark_str = i_record.getJazzTaskRemark();

        var deputies_str = i_record.getJazzTaskDeputiesString();

        var reg_number_str = i_record.getJazzTaskRegNumber();

        var link_descr_str = i_record.getJazzTaskLinkDescriptionsString();

        ret_compare_array[0] = title_str;

        ret_compare_array[1] = descr_str;

        ret_compare_array[2] = respons_str;

        ret_compare_array[3] = remark_str;

        ret_compare_array[4] = deputies_str;

        ret_compare_array[5] = reg_number_str;

        ret_compare_array[6] = link_descr_str;

        return ret_compare_array;

    } // getCompareArray

    // Returns an array with false values (no hits). Size equal to input array
    getHitArray(i_search_array)
    {
        var ret_hit_array = [];

        var n_elements = i_search_array.length;

        for (var index_element=0; index_element < n_elements; index_element++)
        {
            ret_hit_array[index_element] = false;
        }

        return ret_hit_array;
    }

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

        var registration_numbers = this.m_table.getJazzTasksNameArray(array_case)

        this.m_registration_numbers = registration_numbers;

        var registration_numbers_ordered = this.sortTitleTasks(registration_numbers);

        this.m_registration_numbers = registration_numbers_ordered;

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
    sortTitleTasks(i_registration_numbers)
    {
        var ret_numbers_sort = [];

        var array_case = 'title';

        var task_titles_sort = this.m_table.getJazzTasksNameArray(array_case);  

        task_titles_sort.sort();
        
        var n_elements = i_registration_numbers.length;

        var task_titles = this.m_table.getJazzTasksNameArray(array_case);  

        for (var index_element=0; index_element < n_elements; index_element++)
        {
            var title_sorted = task_titles_sort[index_element];

            for (var index_out=0; index_out < n_elements; index_out++)
            {
                var current_reg_number = i_registration_numbers[index_out];

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

        // Returns true if search string is contained in the text string
        // 1. Convert input strings to upper case. Calls of toUpperCase
        // 2. Determine if string contains search string. Call of indexOf
        stringContainsSearchString(i_search_str, i_text_str)
        {
            var search_string_upper_case = i_search_str.toUpperCase();

            var text_string_upper_case = i_text_str.toUpperCase();

            var index_pos = text_string_upper_case.indexOf(search_string_upper_case);

            if (index_pos >= 0)
            {
                return true;
            }
            else
            {
                return false;
            }

        } // stringContainsSearchString

} // class


