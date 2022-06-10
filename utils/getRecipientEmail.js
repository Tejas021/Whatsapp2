export const getRecipientEmail=(users,currentUser)=>{

   return  users.filter(u=>u!==currentUser)[0]

}