import { Injectable } from '@angular/core';

@Injectable()
export class FlattenUnflattenService {
  // Verify if the input is an Object
  isObject(obj){
	  return typeof(obj) ==="object"
  }
  	// The Flatten Function
  flatten(obj){
     var newObj = {};
      var innerFlatten = function(obj, parent){
        //if the obj is an Object else return the value 
        if(this.isObject(obj)){
          //if the obj inside is an Array we iterate it with a for loop
            if(Array.isArray(obj)){
              if (!!obj.length){
                for (var i = 0; i < obj.length; i++){
                  //Create the flattened key
                  var valueName = parent === "" ? i.toString() : parent + "." + i;
                  //Recursively run the function to iterate over the other keys
                  innerFlatten(obj[i], valueName)
                }
              }else{
                newObj[parent] = [];
              }        	
            }else{
              //if the obj inside is an Object we iterate it diferently
              for (var x in obj){
                //Create the flattened key
                var valueName = parent === "" ? x : parent + "." + x;
                //Recursively run the function to iterate over the other keys
                innerFlatten(obj[x], valueName)
              }
            }
          }else{
            newObj[parent] = obj;
          } 
      }
      innerFlatten = innerFlatten.bind(this)
      innerFlatten(obj, "");
      return newObj;
    }
    isNum(str) {
      return /^d+$/.test(str)
    }
    // The unFlatten Function
    unFlatten(data) {
       if (Object(data) !== data || Array.isArray(data))
        return data;
        // set global variables
        var result = {}, current, value, parts, idx;
        // Iterate of the keys in the flattend object
        for(var p in data) {
            current = result, value = "";
            // Separate the Keys into Arrays to iterate over them
            parts = p.split(".");
            for(var i=0; i<parts.length; i++) {
                // Verify if the value is a number or an object
                idx = !isNaN(parseInt(parts[i]));
                // set the value to an array or object depending on the value
                current = current[value] || (current[value] = (idx ? [] : {}));
                // set the value to the Key
                value = parts[i];
            }
            current[value] = data[p];
        }
        return result[""];
    }
}
