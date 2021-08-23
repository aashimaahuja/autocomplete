// export const Cache = (function(){
//   let instance;
//   function createInstance(){
//     return new Object('I am a cache');
//   }

//   // function getInstance(){
//   //   if(!instance){
//   //     instance = createInstance(); 
//   //   }

//   //   return instance
//   // }

//   return {
//     getInstance: function () {
//         if (!instance) {
//             instance = createInstance();
//         }
//         return instance;
//     }
//   };
// })();

export const cache = {};