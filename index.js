//array to store heights of all div elements to implement sorting on
var arr=[];
// elements to calculate time taken in nano-seconds by each sorting algorithm
var interval,starttime,stoptime;
//this function takes sizze of array,generate random heights between 100px and 800 px and then stores them in array 
function generate()
{
    document.getElementById("button_start").disabled=false;
    //this val element prints the value selected by range input element
    var val=document.getElementById("value_of_range");
    //size has value of input range
    var size=document.getElementById("size").value;
    //changing val to make it more user friendly
    val.innerHTML=size;
    //for loop to generate array and lines of random heights 
    for(var i=0;i<size;i++)
    {
        //random funtion to get value between 800 and 100
        var rand=Math.floor(Math.random() * 800) + 100  ;
        arr[i]=rand;
        var line=document.getElementById("array_"+i);
        line.style.transition="height 0.1s linear";
        line.innerHTML=rand;
        //multiple if else if conditions to change sizing between elements and font of their heights written in between
        if(size<=10){
            line.style.fontSize="20px";
            line.style.width="30px";
            line.style.margin="10px";
            line.style.height=rand+"px";
        }
        else if(size>10&&size<=20){
            line.style.fontSize="15px";
            line.style.width="25px";
            line.style.margin="9px";
            line.style.height=rand+"px";
        }
        else if(size>20&&size<=30){
            line.style.fontSize="10px";
            line.style.width="15px";
            line.style.margin="7px";
            line.style.height=rand+"px";
        }
        else if(size>20&&size<=30){
            line.style.fontSize="5px";
            line.style.width="10px";
            line.style.margin="5px";
            line.style.height=rand+"px";
        }
        else if(size>30&&size<=40){
            line.style.fontSize="5px";
            line.style.width="5px";
            line.style.margin="3px";
            line.style.height=rand+"px";
        }
        else
        {
            line.style.fontSize="1px";
            line.style.width="2px";
            line.style.margin="2px";
            line.style.height=rand+"px";
        }
    }
    //this for loop make sure when the size is decreased array has less elements in it and also extra div tags are removed
    for(var j=size;j<100;j++)
    {
        var line=document.getElementById("array_"+j);
        arr[j]=null;
        line.innerHTML="";
        line.style.fontSize="";
        line.style.width="";
    }
}

//when start button is pressed

function start()
{
    //START TIME
    //console.log(arr.length);
    document.getElementById("button_start").disabled=true;
    //takes nano seconds from when start button is pressed to be used later   
    starttime=window.performance.now();
    //checks which sorting technique is selected
    var sort_tech=document.getElementById("types").value;

    //bubble sort function call

    if(sort_tech==1)
        bubble_sort();
        
    //merge sort function call
    
    else if(sort_tech==2)
    {
        arr=mSort(arr);
        change_div();
    }
    
    //heap sort function call
    
    else if(sort_tech==3)
    {
        heapSort(arr,arr.length);
        change_div();
    }
    
    //quick sort function call
    
    else if(sort_tech==4)
    {
        arr=quick_Sort(arr);
        console.log(arr);
        change_div();
    }
    
    //selection sort function call
    
    else if(sort_tech==5)
        selection_sort();
        
    //insertion sort function call
    
    else if(sort_tech==6)
        insertion_sort();
        
    //if anything goes wrong
    
    else
        alert("some error occured");

    //STOP TIME

    //gets the nano seconds for when sorting is done
    stoptime=window.performance.now();
    //calculates the difference betweeen nano seconds
    interval=stoptime-starttime;
    //prints using inner html amount of nano seconds taken
    var change=document.getElementById("stopwatch");
    change.innerHTML=interval+"<br> nano-seconds";
}

//swapping of elements of array elements

function swap(x,y)
{
    var temp = arr[x] ;
    arr[x] = arr[y] ;
    arr[y] = temp ;
    change_div();    
}

//changing of div heights and values insode them

function change_div()
{
    //document.write("hi");
    var g=0;
    for(var i=0;i<arr.length;i++)
    {
        if(arr[i]!=null)
        {
            var line=document.getElementById("array_"+(g));
            line.style.transition="height 1s linear";
            line.style.height=arr[i]+"px";
            line.innerHTML=arr[i];
            g++;
        }
    }
}

//bubble sort algorithm

function bubble_sort()
{
    var size=document.getElementById("size").value;
    for(var i = 0; i < size; i++)
    { 
        for(var j = 0; j < ( size - i -1 ); j++)
        { 
          if(arr[j] > arr[j+1])
          {
            //swapping
            swap(j,j+1);
          } 
        } 
    } 
}

//selection sort algrithm

function selection_sort() 
{
	var length=arr.length;
	for (var i=0;i<length;i++)
    {
		//Number of passes
		var min = i; //min holds the current minimum number position for each pass; i holds the Initial min number
		for (var j=i+1; j<length;j++) 
        { 
            //Note that j = i + 1 as we only need to go through unsorted array
			if (arr[j] < arr[min]) 
            { //Compare the numbers
				min = j; //Change the current min number position if a smaller num is found
			}
		}
		if (min != i) 
        {//swapping
            swap(i,min);
		}
	}
}

//insertion sort algorithm

function insertion_sort() 
{
    for (var i = 1; i < arr.length; i++) 
    {
    var current = arr[i];
    var j;
    for(j=i-1; j >= 0 && arr[j] > current;j--) 
    {
        arr[j + 1] = arr[j] 
    }
    arr[j + 1] = current;
    }
    change_div();
}
function quick_Sort(array) 
{
    if (array.length <= 1) 
    {
      return array;
    }
    var pivot = array[0];
    var left = []; 
    var right = [];
    for (var i = 1; i < array.length; i++)
    {
      array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
    }
    return quick_Sort(left).concat(pivot, quick_Sort(right));
}

//HEAP SORT ALGORITHM TAKEN FROM ' https://learnersbucket.com/tutorials/algorithms/heap-sort-algorithm-in-javascript/ '

const maxHeapify = (arr, n, i) => {
    let largest = i;
    let l = 2 * i + 1; //left child index
    let r = 2 * i + 2; //right child index
    
    //If left child is smaller than root
     if (l < n && arr[l] > arr[largest]) {
           largest = l; 
     }
    
     // If right child is smaller than smallest so far 
     if (r < n && arr[r] > arr[largest]) {
          largest = r; 
     }
    
     // If smallest is not root 
     if (largest != i) { 
          swap(i,largest); 
    
        // Recursively heapify the affected sub-tree 
        maxHeapify(arr, n, largest); 
      } 
  }
  
   // main function to do heap sort 
   const heapSort = (arr, n) => { 
       // Build heap (rearrange array) 
       for (let i = parseInt(n / 2 - 1); i >= 0; i--) {
           maxHeapify(arr, n, i); 
       }
    
       // One by one extract an element from heap 
       for (let i = n - 1; i >= 0; i--) { 
          // Move current root to end 
          swap(0,i); 
    
          // call max heapify on the reduced heap 
          maxHeapify(arr, i, 0); 
       } 
   }

//MERGE SORT ALGORITHM TAKEN FROM ' https://www.tutorialspoint.com/how-to-implement-merge-sort-in-javascript '

function mSort (array) {
    if (array.length === 1) {
    return array                            // return once we hit an array with a single item
 }
 const middle = Math.floor(array.length / 2) // get the middle item of the array rounded down
 const left = array.slice(0, middle)         // items on the left side
 const right = array.slice(middle)           // items on the right side
 return merge(
    mSort(left),
    mSort(right)
 )
 }
 // compare the arrays item by item and return the concatenated result
 function merge (left, right) {
    let result = []
    let leftIndex = 0
    let rightIndex = 0
    while (leftIndex < left.length && rightIndex < right.length) {
       if (left[leftIndex] < right[rightIndex]) {
       result.push(left[leftIndex])
       leftIndex++;        
       } else {
       result.push(right[rightIndex])
       rightIndex++      
    }
 }
 return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
 }