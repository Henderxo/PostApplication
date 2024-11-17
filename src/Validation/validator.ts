import type { Author } from "@/types/Author";
import { defineRule } from "vee-validate";

defineRule('required', (value: String) => {
    if (!value || !value.length) {
      return 'This field is required';
    }
    return true;
})

defineRule('selectBox', (value: Author | undefined) => {
    if (typeof value === 'undefined') {
      return 'This field is required';
    }
    return true;
})

defineRule('content', (value: String) => {
    if (!value || !value.length) {
      return 'This field is required';
    }
    if(value[0] === ' ' || value[value.length-1] === ' '){
        return "The body can't start or end with a space"
    }
    if(value.length<10 || value.length>400){
        return "The body can't be longer then 400 char or shorter then 10."
    }
    if(value.split('\n').length > 20){
        return "Too many new lines"
    }
    return true;
})

defineRule('title', (value: String) => {
    if (!value || !value.length) {
      return 'This field is required';
    }
    if(value[0] === ' ' || value[value.length-1] === ' '){
        return "The title can't start or end with a space"
    }
    if(value.length<4 || value.length>25){
        return "The title can't be longer then 25 char or shorter then 4."
    }
    const regex = /^([\p{L}0-9]+[ ]?)+$/u
    if (!regex.test(value as string)) {
        return "The title can't have any special symbols or numbers or repeating spaces";
    }
    return true;
})

defineRule('name', (value: String) => {
    if (!value || !value.length) {
      return 'This field is required';
    }
    if(value[0] === ' ' || value[value.length-1] === ' '){
        return "The name can't start or end with a space"
    }
    if(value.length<4 || value.length>20){
        return "The name can't be longer then 20 char or shorter then 4."
    }
    const regex = /^([\p{L}]+[ ]?)+$/u
    if (!regex.test(value as string)) {
        return "The name can't have any special symbols or numbers or repeating spaces";
    }
    return true;
})

defineRule('surname', (value: String) => {
    if (!value || !value.length) {
      return 'This field is required';
    }
    if(value[0] === ' ' || value[value.length-1] === ' '){
        return "The surname can't start or end with a space"
    }
    if(value.length<4 || value.length>25){
        return "The surname can't be longer then 25 char or shorter then 4."
    }
    const regex = /^([\p{L}]+[ ]?)+$/u
    if (!regex.test(value as string)) {
        return "The surname can't have any special symbols or numbers or repeating spaces";
    }
    return true;
})

defineRule('email', (value: String) =>{
    if(!value){
        return 'This field is required'
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    if (!regex.test(value as string)) {
        return 'This field must be a valid email';
    }
    return true
})
