export const GlobalConstants = {
    MENU_ITEMS: [
        {
            title: "Control Flow",
            routerName: "controlflow",
            allowedRoles: ["admin"]
        },
        {
            "title": "Data Binding",
            "routerName": "data-binding",
            allowedRoles: ["admin"]
        },
        {
            "title": "Signal",
            "routerName": "signal",
            allowedRoles: ["guest", "admin"]
        },
        {
            "title": "Dynamic Reactive Form",
            "routerName": "dynamicform",
            allowedRoles: ["guest", "admin"]
        }
    ]
}


export const DNAMIC_FORM = {
    EFORM: [
        {
            "type": "input",
            "label": "First Name",
            "name": "firstName",
            "value": "",
            "validators": {
                "required": true,
                "minLength": 2
            }
        },
        {
            "type": "input",
            "label": "Last Name",
            "name": "lastName",
            "value": "",
            "validators": {
                "required": true,
                "minLength": 2
            }
        },
        {
            "type": "select",
            "label": "Gender",
            "name": "gender",
            "value": "",
            "options": [
                { "label": "Male", "value": "male" },
                { "label": "Female", "value": "female" }
            ]
        },
        {
            "type": "checkbox",
            "label": "Accept Terms",
            "name": "acceptTerms",
            "value": false,
            "validators": {
                "requiredTrue": true
            }
        },
        {
            "type": "radio",
            "label": "Subscription",
            "name": "subscription",
            "value": "",
            "options": [
                { "label": "Basic", "value": "basic" },
                { "label": "Premium", "value": "premium" }
            ]
        },
        {
            "type": "textarea",
            "label": "Comments",
            "name": "comments",
            "value": "",
            "validators": {
                "maxLength": 500
            }
        },
        {
            "type": "date",
            "label": "Date of Birth",
            "name": "dob",
            "value": "",
            "validators": {
                "required": true
            }
        }
    ]
}
