package main

import (
	"fmt"
)

func main(){

	inputOne := 0;
	inputTwo := 0;

	fmt.Println("Enter First Number")

	fmt.Scanln(&inputOne)
    
	fmt.Println("Enter Second number")

	fmt.Scanln(&inputTwo)

	AddNumber(inputOne ,inputTwo)

}

func AddNumber(a int , b int){
   res := a + b;
   fmt.Print("Added" + " " , res )
}

func SubtractNumber(a int , b int){
	res := a - b;
	fmt.Print("Subtracted" + " " , res )
 }

 func MultiplyNumber(a int , b int){
	res := a * b;
	fmt.Print("Multiplied" + " " , res )
 }

 func divideNuber( a int , b int){
	res := float64(a) / float64(b);
	fmt.Print("Divided" + " " , res )
 }