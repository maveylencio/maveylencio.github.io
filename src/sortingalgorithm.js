

const timer = ms => new Promise(res => setTimeout(res, ms))

export async function bubble_sort(numList,divList,speed){
    let isSorted = false
    let barsToAnimate = []
    let counter = 0

    while(!isSorted){
        isSorted = true

        for(let x=0;x<divList.length-counter-1;x++){
            barsToAnimate.push([divList[x],divList[x+1],'visiting'])
            if(numList[x]>numList[x+1]){
                swap(numList,x,x+1)
                barsToAnimate.push([divList[x],divList[x+1],'wrong-position'])
                barsToAnimate.push([divList[x],divList[x+1],'correct-order'])
                barsToAnimate.push([divList[x+1],divList[x],'correct-position'])
                barsToAnimate.push([divList[x+1],divList[x],'clear-class'])
                swap(divList,x,x+1)
                isSorted = false
            }
            else{
                barsToAnimate.push([divList[x],divList[x+1],'correct-position'])
                barsToAnimate.push([divList[x],divList[x+1],'clear-class'])
            }

            if(x+1==divList.length-counter-1){
                barsToAnimate.push([divList[divList.length-1-counter],null,'correct-position'])
            }
        }
        counter+=1
        
    }


    let ctr = divList.length-counter
    while(ctr>=0){
        barsToAnimate.push([divList[ctr],null,'correct-position'])
        ctr-=1
    }
    await VisualizeSort(barsToAnimate,speed)
    return false
}

export async function selection_sort(numList,divList,speed){
    let barsToAnimate = []

    for(let x=0;x<numList.length;x++){
        let min_idx = x
        barsToAnimate.push([divList[x],null,'correct-position'])
        for(let y=x+1;y<numList.length;y++){
            barsToAnimate.push([divList[y],null,'visiting'])
            if(numList[min_idx] > numList[y]){
                barsToAnimate.push([divList[min_idx],null,'clear-class'])
                min_idx = y
                barsToAnimate.push([divList[min_idx],null,'correct-position'])
                continue
            }
            barsToAnimate.push([divList[y],null,'clear-class'])
        }
        if(min_idx==x){
            continue
        }
        barsToAnimate.push([divList[x],null,'wrong-position'])
        barsToAnimate.push([divList[min_idx],divList[x],'correct-order'])
        barsToAnimate.push([divList[x],null,'clear-class'])
        swap(numList,min_idx,x)
        swap(divList,min_idx,x)
    }


    await VisualizeSort(barsToAnimate,speed)
    return false

}

export async function insertion_sort(numList,divList,speed){
    let barsToAnimate = []

    for(let x=0;x<numList.length;x++){
        barsToAnimate.push([divList[x],null,'visiting'])
        while(numList[x-1]>numList[x] && x>0){
            swap(numList,x-1,x)
            swap(divList,x-1,x)
            barsToAnimate.push([divList[x-1],divList[x],'correct-order'])
            x-=1 
        }
        barsToAnimate.push([divList[x],null,'correct-position'])
    }

    await VisualizeSort(barsToAnimate,speed)
    return false
}

export async function quick_sort(numList,divList,speed){
    let barsToAnimate = []

    quick_helper(0,numList.length-1,numList,divList,barsToAnimate)

    await VisualizeSort(barsToAnimate,speed)
    return false
}

export async function merge_sort(numList,divList,speed){
    let barsToAnimate = []
    let temp_numList = numList.map(num=>null)
    let temp_divList = divList.map(num=>null)
    merge_helper(0,numList.length-1,temp_numList,temp_divList,numList,divList,barsToAnimate)

    for(let x=0;x<divList.length;x++){
        barsToAnimate.push([divList[x],null,'correct-position'])
    }
    await VisualizeSort(barsToAnimate,speed)
    return false
}

export async function heap_sort(numList,divList,speed){
    let barsToAnimate = []
    heap_helper(numList,divList,barsToAnimate)

    await VisualizeSort(barsToAnimate,speed)
    return false
}






/*
 * HELPER FUNCTION
 *
 */

const heap_helper = (numList,divList,barsToAnimate) => {
    let n = numList.length

    for(let x=Math.floor(n/2);x>-1;x--){
        heapify(numList,divList,n,x,barsToAnimate)
    }

    for(let x=n-1;x>0;x--){
        swap(numList,x,0)
        barsToAnimate.push([divList[x],null,'wrong-position'])
        barsToAnimate.push([divList[0],null,'correct-position'])
        barsToAnimate.push([divList[x],divList[0],'correct-order'])
        barsToAnimate.push([divList[x],null,'clear-class'])
        swap(divList,x,0)
        heapify(numList,divList,x,0,barsToAnimate)
    }

    barsToAnimate.push([divList[0],null,'correct-position'])


} 

const heapify = (numList,divList,n,i,barsToAnimate) => {

    let largest = i
    let l = 2 * i + 1
    let r = 2 * i + 2

    if(l<n && numList[i] < numList[l]){
        largest = l
    }

    if(r<n && numList[largest] < numList[r]){
        largest = r
    }

    if(largest!=i) {
        swap(numList,largest,i)
        barsToAnimate.push([divList[largest],divList[i],'visiting'])
        barsToAnimate.push([divList[largest],divList[i],'correct-order'])
        barsToAnimate.push([divList[largest],divList[i],'clear-class'])
        swap(divList,largest,i)
        heapify(numList,divList,n,largest,barsToAnimate)
    }

}


const quick_helper = (startIdx,endIdx,numList,divList,barsToAnimate) => {
    

    if(endIdx<=startIdx){
        if(startIdx==endIdx){
            barsToAnimate.push([divList[startIdx],null,'correct-position']);
        }
        return;
    } 

    let ptr = startIdx
    let pivot  = numList[endIdx]
    barsToAnimate.push([divList[endIdx],null,'visiting'])

    for(let x=startIdx;x<endIdx;x++){
        barsToAnimate.push([divList[x],null,'visiting'])
        if(numList[x]<pivot){
            barsToAnimate.push([divList[ptr],null,'wrong-position'])
            barsToAnimate.push([divList[x],divList[ptr],'correct-order'])
            swap(numList,x,ptr)
            swap(divList,x,ptr)
            ptr+=1
        }
        else{
            barsToAnimate.push([divList[x],null,'wrong-position'])
            barsToAnimate.push([divList[x],null,'clear-class'])
        }
        barsToAnimate.push([divList[x],null,'clear-class'])
    }
    barsToAnimate.push([divList[ptr],divList[endIdx],'correct-order'])
    barsToAnimate.push([divList[endIdx],null,'correct-position'])
    swap(numList,ptr,endIdx)
    swap(divList,ptr,endIdx)

    quick_helper(startIdx,ptr-1,numList,divList,barsToAnimate)
    quick_helper(ptr+1,endIdx,numList,divList,barsToAnimate)
    

}


const merge_helper = (leftStart,rightEnd,temp_numList,temp_divList,numList,divList,barsToAnimate) => {
    if(leftStart>=rightEnd){
        return
    }
    let middle = leftStart + parseInt((rightEnd-leftStart)/2)
    merge_helper(leftStart,middle,temp_numList,temp_divList,numList,divList,barsToAnimate)
    merge_helper(middle+1,rightEnd,temp_numList,temp_divList,numList,divList,barsToAnimate)
    merge(leftStart,rightEnd,temp_numList,temp_divList,numList,divList,barsToAnimate)
}


const merge = (leftStart,rightEnd,temp_numList,temp_divList,numList,divList,barsToAnimate) =>{

    let leftEnd = leftStart + parseInt((rightEnd-leftStart)/2)
    let rightStart = leftEnd + 1

    let left = leftStart
    let right = rightStart
    let temp_idx = leftStart

    while(left<=leftEnd && right<=rightEnd){
        if(numList[left]<=numList[right]){
            temp_numList[temp_idx] = numList[left]
            temp_divList[temp_idx] = divList[left]
            left+=1
        }
        else{
            temp_numList[temp_idx] = numList[right]
            temp_divList[temp_idx] = divList[right]
            right+=1
        }
        temp_idx+=1
    }

    while(left<=leftEnd){
        temp_numList[temp_idx] = numList[left]
        temp_divList[temp_idx] = divList[left]
        temp_idx+=1
        left+=1
    }

    while(right<=rightEnd){
        temp_numList[temp_idx] = numList[right]
        temp_divList[temp_idx] = divList[right]
        temp_idx+=1
        right+=1
    }

    for(let i=leftStart;i<=rightEnd;i++){
        numList[i] = temp_numList[i];
        barsToAnimate.push([temp_divList[i],i,'merge-order']);
        divList[i] = temp_divList[i]
    }

    

}



function swap(list,x,y){
    let temp = list[x]
    list[x] = list[y]
    list[y] = temp
}


async function VisualizeSort(barsToAnimate,speed){

    for(let x=0;x<barsToAnimate.length;x++){
        const [bar1,bar2,task] = barsToAnimate[x]
        switch(task){
            case 'visiting':
                bar1.classList.add('visiting')
                bar2 && bar2.classList.add('visiting')
                break
            case 'wrong-position':
                bar1.classList.add('wrong-position')
                bar2 && bar2.classList.add('wrong-position')
                break
            case 'correct-position':
                bar1.classList.add('correct-position')
                bar2 && bar2.classList.add('correct-position')
                break
            case 'clear-class':
                if(bar1.classList.contains('visiting') || bar2 && bar2.classList.contains('visiting')){
                    bar1.classList.remove('visiting')
                    bar2 && bar2.classList.remove('visiting')
                }
                if(bar1.classList.contains('wrong-position') || bar2 && bar2.classList.contains('wrong-position')){
                    bar1.classList.remove('wrong-position')
                    bar2 && bar2.classList.remove('wrong-position')
                }
                if(bar1.classList.contains('correct-position') ||  bar2 && bar2.classList.contains('correct-position')){
                    bar1.classList.remove('correct-position')
                    bar2 && bar2.classList.remove('correct-position')
                }
                break
            case 'correct-order':
                let tempdiv = bar1.style.order
                bar1.style.order = bar2.style.order
                bar2.style.order = tempdiv 
                break
            case 'merge-order':
                bar1.style.order = bar2 
            default:
                break
        }
        await timer(speed) 
    }
}