import {extend} from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import {messages} from "vee-validate/dist/locale/en.json";

// install all validation rules
Object.keys(rules).forEach(rule => {
    extend(rule, {
        ...rules[rule],
        message: messages[rule]
    })
});
