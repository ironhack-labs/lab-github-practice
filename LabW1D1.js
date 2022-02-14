let hacker1 = "Jack"
console.log(`The driver's name is ${hacker1}`)

let hacker2 = "Baloo"
console.log(`The navigator's name is ${hacker2}`)

if(hacker1.length > hacker2.length) {
    console.log(`The driver has the longest name, it has ${hacker1.length} characters`)
} else if(hacker1.length < hacker2.length) {
    console.log(`It seems that the navigator has the longest name, it has ${hacker2.length} characters.`)
} else if(hacker1.length === hacker2.length) {
    console.log(`Wow, you both have equally long names, ${hacker2.length} characters.`)
}

let str = ""
for(let i = 0; i < hacker1.length; i++ ) {
    str += hacker1[i] + " "    
}

console.log(str.toUpperCase())

let reverseNav = hacker2.split("").reverse().join("")
console.log(reverseNav)

if(hacker1.charAt(0) > hacker2.charAt(0)) {
    console.log("The driver's name goes first.")
} else if(hacker1.charAt(0) < hacker2.charAt(0)) {
    console.log("Yo, the navigator goes first definitely.")
} else if(hacker1.charAt(0) === hacker2.charAt(0)) {
    console.log("What?! You both have the same name?")
}

