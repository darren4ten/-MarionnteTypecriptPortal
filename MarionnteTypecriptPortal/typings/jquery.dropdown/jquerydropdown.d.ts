// Type definitions for jquery dropdown plugin 1.0.4
// Project: http://labs.abeautifulsite.net/jquery-dropdown/, https://github.com/claviska/jquery-dropdown

/// <reference path="../jquery/jquery.d.ts" />

interface JQuery {
    // methods are:
    //attach - attach a dropdown to the selected trigger element(s); pass in the #dropdown-id as value
    //detach - detach a dropdown from the selected trigger element(s)
    //enable - enables the dropdown and removes the dropdown - disabled class from the trigger
    //disable - disables the dropdown and adds the dropdown - disabled class to the trigger
    //hide - hide the dropdown
    //show - show the dropdown
    dropdown(methodName: string, triggerElement?: string): void;
}