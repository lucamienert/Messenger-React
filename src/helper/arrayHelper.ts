export const arrayEquality = (a: Array<any>, b: Array<any>) => {
    if (a.length !== b.length) 
        return false
  
    a.sort()
    b.sort()

    return a.every((element, index) => element === b[index])
}