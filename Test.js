function password(str) {
  let lc = "abcdefghijklmnopqrstuvwxyz"
  let uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let num = "0123456789"
  let res = [false, false, false]
  
  str.split("").forEach(letter => {
    if(lc.includes(letter)){
      res[0] = true
    } 
    if(uc.includes(letter)){
      res[1] = true
    } 
    if(num.includes(letter)){
      res[2] = true
    } 
  })
  
  console.log(res[0] && res[1] && res[2])
  return res[0] && res[1] && res[2]
}

password("Filipe21")