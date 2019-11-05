import firebase from './firebase';
const databaseRef = firebase.database().ref("MyChatApp");
let messages = [];
let userRef = databaseRef.child('Users');
let msgRef = databaseRef.child('Conversations')
 class DbServices{
  constructor(){

  }

  getAllUsers(){
    let userslist=[];
    userRef
    .once('value',snapshot => {
      if(snapshot.val()!==null){
       snapshot.forEach(snap=>{
        userslist.push(snap.val());
       })
      }
    })
    return userslist;
  }

  async getAllConversationMsg(id){
   await msgRef.child(id).child('Messages')
    .once('value',snapshot => {
      // console.log("All msg",snapshot.val());
      snapshot.forEach(data=>{
        messages.push(data.val());
      })
      // console.log("Messages :",messages);
    })
     return messages; 
  }

  async isUserAlreadyExists(userName){
    let isexists=''; 
    await userRef
      .once('value',async snapshot => {
      if(snapshot.val() !== null){
      await snapshot.forEach(snap=>{
        console.log("users are :",snap.val().name);
         if(snap.val().name === userName){
            isexists = snap.key;
            console.log("is exists :",isexists)
            return isexists;
            }
          })
        }
      })
      
      return isexists;
  }

 async addNewUser(newuser){
  let key = '';
    await userRef.push(newuser)
    .then(res=>{
     key = res.key;
     console.log("new user saved successfully..",key);
     return key;
    })
    return key;
  }

  async setConversation(curentUser,chattingWith){
    let cid = '';
    await databaseRef.child('Conversations/').once('value',snap => {
     snap.forEach(data=>{
       console.log("name :",data.val().curentUser);
       if(((data.val().curentUser===curentUser) && (data.val().chattingwith=== chattingWith)) ||
        (data.val().curentUser===chattingWith && data.val().chattingwith === curentUser)){
          cid = data.val().id;
          console.log("already exists :",cid);
          return cid;
       }
     })
    })
  if(cid === ''){
    await msgRef
    .push({
      curentUser:curentUser,
      chattingwith:chattingWith,
      messages:[]
    }).then(async res=>{
      await msgRef.child(res.key).update({id:res.key});
      cid = res.key;
      console.log("new consversation set....",cid);
      return cid;
    })
  }
    return cid;
  }

  async savemessages(msg,cID,currentUser){
    await msgRef.child(cID).child('Messages').child(Date.now()).set({
      sender:currentUser,
      message:msg,
      time:Date.now()
    })
  }

  async getLastAddedMsg(cid){
    
  //   await msgRef.child(cid).child('Messages')
  //  .once('child_added',snapshot => {
  //   // console.log("snap :",snapshot.val());
  //   messages.push(snapshot.val());
  //  })
  //  return messages;

  await databaseRef.child('Conversations').child(cid).child('Messages')
  .on('value',snapshot => {
   // console.log("snap :",snapshot.val());
    messages.push(snapshot.val());  
    console.log("snap array :".messages);
  })
  return messages;
  }

}

const DBService=new DbServices();
export default DBService;