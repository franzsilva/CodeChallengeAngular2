import { Injectable } from '@angular/core';

@Injectable()
export class FlattenUnflattenService {
  isObject(obj){
	  return typeof(obj) ==="object"
  }
  flatten(obj){
     var newObj = {};
      var innerFlatten = function(obj, parent){
        if(this.isObject(obj)){
            if(Array.isArray(obj)){
              if (!!obj.length){
                for (var i = 0; i < obj.length; i++){
                  var valueName = parent === "" ? i.toString() : parent + "." + i;
                  innerFlatten(obj[i], valueName)
                }
              }else{
                newObj[parent] = [];
              }        	
            }else{
              for (var x in obj){
                var valueName = parent === "" ? x : parent + "." + x;
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

    unFlatten(data) {
       if (Object(data) !== data || Array.isArray(data))
        return data;
        var result = {}, cur, prop, parts, idx;
        for(var p in data) {
            cur = result, prop = "";
            parts = p.split(".");
            for(var i=0; i<parts.length; i++) {
                idx = !isNaN(parseInt(parts[i]));
                cur = cur[prop] || (cur[prop] = (idx ? [] : {}));
                prop = parts[i];
            }
            cur[prop] = data[p];
        }
        return result[""];
    }

    assign(final, path, value) {
      let lastKeyIndex = path.length - 1;
      for (var i = 0; i < lastKeyIndex; ++i) {
        let key = path[i];
        if (!(key in final)) {
          final[key] = this.isNum(path[i + 1]) ? [] : {};
        }
        final = final[key];
      }
      final[path[lastKeyIndex]] = value;
    }

}
