var list = [];
var totalSec = (2 * 60) + 42 ;
console.log(totalSec);

// keys : 'LEFT' , 'UP' , 'DOWN' , 'RIGHT'
list.push( {sec: 3, keys : ['Y', 'Y', 'N', 'N'] });
list.push( {sec: 6, keys : ['LEFT', 'UP', '', ''] });
list.push( {sec: 17, keys : ['LEFT', 'UP', '', ''] });
list.push( {sec: 30, keys : ['LEFT', 'UP', '', ''] });
list.push( {sec: 36, keys : ['LEFT', 'UP', '', ''] });
list.push( {sec: 42, keys : ['LEFT', 'UP', '', ''] });

console.log(list);