import React from 'react'

const timerContext = React.createContext({
 userChoice: {totalRounds: 8,
currentRound: 1,
warmUpTime: 7,
activeRestTime: 1,
glovesOnOffTime: 1,
roundTime: 3,
coreTime: 7,
},
updateUserChoice: () => {}, 
updateTrainingMode: () => {}
})

export default timerContext 